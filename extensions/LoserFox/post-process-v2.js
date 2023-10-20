(function (Scratch) {
  "use strict";
  if (!Scratch.extensions.unsandboxed) {
    throw new Error("PostProcessing must run unsandboxed");
  }
  const vm = Scratch.vm;
  const renderer = vm.renderer;
  const gl = renderer._gl;
  const canvas = renderer.canvas;
  const runtime = vm.runtime;
  const twgl = renderer.exports.twgl;
  let SBG = false;
  Scratch.translate.setup({
    zh: {
      opcodeChangePostProcess: '设置屏幕特效为[Menu]',
      opcodeChangeGlitch: '设置故障幅度为[Amplitude]%',
      opcodeChangeDispersion: '设置色散幅度为[Amplitude]%',
      opcodeChangeGray: '设置单色颜色为[COLOR] %',
      opcodeChangePointillism: '设置点刻对比度为[threshold]%',
      opcodeChangeScreensplit: '设置屏幕切片为 x:[split_x] y:[split_y]',
      opcodeChangeCliping: '设置屏幕裁剪为 X:[x1],Y:[y1] To: X:[x2],Y:[y2] ROT[rot]',
      opcodeRequestReDraw:'重新刷新屏幕',
      opcodeGetPostProcess:'当前屏幕特效',
      PostProcess_glitch: "故障",
      PostProcess_dispersion: "色散",
      PostProcess_gray: "单色",
      PostProcess_reverse: "反色",
      PostProcess_pointillism: "点刻",
      PostProcess_cliping: "裁剪",
      PostProcess_screensplit: "切片",
      PostProcess_helleffectshader: "???",
      PostProcess_none: "无",
    }
  });

  var vertexShaderCode = `
      attribute vec4 a_position;
      attribute vec2 a_texcoord;
      varying vec2 v_texcoord;
      varying vec4 vColor;
      void main() {
      gl_Position = vec4(a_position.x, a_position.y, a_position.z, 1);
      v_texcoord = a_texcoord;
      vColor = vec4(1.0, 1.0, 1.0, 1.0);
      }
    `;
  var noneShaderCode = `
    precision mediump float;
      
    varying vec2 v_texcoord;
    varying vec4 vColor;      
    uniform sampler2D u_texture;
  
    void main() {
      gl_FragColor=texture2D(u_texture,v_texcoord);
    }
    `;
  var clipShaderCode = `
    precision mediump float;
      
    varying vec2 v_texcoord;
    varying vec4 vColor;      
    uniform sampler2D u_texture;
    uniform vec2 u_pos1;
    uniform vec2 u_pos2;
    uniform float rot;
    uniform vec2 texs;
    void main() {
      vec2 pos=v_texcoord;
      vec2 cop=pos;
      float angle=rot;
      pos.x=((cop.x-u_pos1.x)*cos(radians(angle))+(cop.y-u_pos1.y)*cos(radians(angle+90.)));
      pos.y=((cop.x-u_pos1.x)*sin(radians(angle))+(cop.y-u_pos1.y)*sin(radians(angle+90.)));
      if(pos.x>u_pos1.x&&pos.x<u_pos2.x&&pos.y>u_pos1.y&&pos.y<u_pos2.y){
        gl_FragColor=texture2D(u_texture,v_texcoord)*vColor;
      }else{
        gl_FragColor=vec4(0.);
      }
    }
    `;
  var dispersionShaderCode = `
      precision mediump float;
      
      varying vec2 v_texcoord;
      varying vec4 vColor;      
      uniform sampler2D u_texture;
      uniform float _Amplitude ;
      uniform vec2 direction_r ;
      uniform vec2 direction_g ;
      uniform vec2 direction_b ;
      void main() {
        float ColorR = texture2D(u_texture,v_texcoord + normalize( direction_r )*_Amplitude).r ;
        float ColorG = texture2D(u_texture,v_texcoord + normalize( direction_g )*_Amplitude).g;
        float ColorB = texture2D(u_texture,v_texcoord + normalize( direction_b )*_Amplitude).b;
        gl_FragColor=vec4(ColorR,ColorG,ColorB,1.0);
  
      }
    `;

  var GlitchShaderCode = `
      precision mediump float;
      
      varying vec2 v_texcoord;
      varying vec4 vColor;      
      uniform sampler2D u_texture;
      uniform float _Amplitude;
      uniform float _Time;
      uniform vec2 _BlockSize;
      uniform bool _Rgb;
      uniform vec2 u_pos1;
      uniform vec2 u_pos2;
      uniform vec2 u_dir;
      float randomNoise(vec2 seed)
      {
          return fract(sin(dot(seed *_Time , vec2(17.13, 3.71))) * 43758.5453123);
      }
      void main() {
        float block = randomNoise(floor(v_texcoord * _BlockSize));
        float displaceNoise = pow(block, 8.0) * pow(block, 3.0);
        if (_Rgb){
          float ColorR = texture2D(u_texture,v_texcoord).r;
          float ColorG = texture2D(u_texture,v_texcoord + vec2(displaceNoise * _Amplitude * randomNoise(vec2(7)),0.0)).g;
          float ColorB = texture2D(u_texture,v_texcoord - vec2(displaceNoise * _Amplitude * randomNoise(vec2(13)),0.0)).b;
          gl_FragColor=vec4(ColorR,ColorG,ColorB,1.0);
        }else{
          if (v_texcoord.x > u_pos1.x && v_texcoord.x < u_pos2.x && v_texcoord.y > u_pos1.y && v_texcoord.y < u_pos2.y){
          float offset_s = displaceNoise * _Amplitude * randomNoise(vec2(7)) ;
          vec2 offset = vec2(offset_s * u_dir.x,offset_s * u_dir.y);
          vec4 Color = texture2D(u_texture,vec2(fract(v_texcoord.x+offset.x),fract(v_texcoord.y+offset.y)));
          gl_FragColor=Color;
          }else{
            gl_FragColor= texture2D(u_texture,v_texcoord);
          }
        }
        
  
      }
    `;
  var GrayShaderCode = `
      precision mediump float;
      
      varying vec2 v_texcoord;
      varying vec4 vColor;      
      uniform sampler2D u_texture;
      uniform vec3 _color;
      void main() {
  
        vec4 Color = texture2D(u_texture,v_texcoord);
        float gray = (Color.r + Color.g + Color.b) / 3.0;
        
        gl_FragColor=vec4(vec3(gray) * (_color/255.0),1.0);
  
      }
    `;
  var ReverseShaderCode = `
      precision mediump float;
      
      varying vec2 v_texcoord;
      varying vec4 vColor;      
      uniform sampler2D u_texture;
  
      void main() {
  
        vec4 Color = texture2D(u_texture,v_texcoord);
  
        gl_FragColor=vec4(1.0-Color.r,1.0-Color.g,1.0-Color.b,1.0);
  
      }
    `;
  var PointillismShaderCode = `
    precision mediump float;
  
    uniform sampler2D u_texture;
    uniform float u_size; // Point size
    uniform float u_threshold; // Threshold for black and white dots
    uniform vec2 u_resolution; // Resolution of the canvas
    
    varying vec2 v_texcoord;
    
    void main() {
      // Sample the color from the texture
      vec4 texColor = texture2D(u_texture, v_texcoord);
      
      // Convert the color to grayscale
      float gray = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
      
      // Quantize the grayscale value to either black or white
      float threshold = u_threshold * (1.0 + 0.2 * (sin(v_texcoord.y * u_resolution.y * 10.0) + sin(v_texcoord.x * u_resolution.x * 10.0)));
      float quantized = step(threshold, gray);
      
      // Combine the dot pattern with the quantized color
      gl_FragColor = vec4(vec3( quantized), 1.0);
    }
    `;
  var quadPositions = [-1, -1, -1, 1, 1, -1, 1, -1, -1, 1, 1, 1];

  var quadCoords = [0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1];
  var screensplitShaderCode = `
      precision mediump float;
      
      varying vec2 v_texcoord;
      varying vec4 vColor;      
      uniform sampler2D u_texture;
      uniform vec2 split ;
      uniform vec2 offset ;
      vec2 repeatUV(vec2 suv, float min, float max) {
        return mod(suv, max - min) + min;
    }
      void main() {
        vec4 col = texture2D(u_texture,repeatUV(v_texcoord / split + offset,0.0,1.0)) ;
        gl_FragColor=col;
  
      }
      
    `;
  // where are you getting this shader from?
  var HellShaderCode = `
    //
    // Simple passthrough fragment shader
    //
    precision mediump float;
    varying vec2 v_texcoord;
    varying vec4 vColour;
    uniform sampler2D u_texture;
    uniform float timer;
    uniform float eyes_alpha;
    vec2 size = vec2(740.0, 580.0);
    vec2 centre_pos = vec2(370.0, 230.0);
    vec2 eye1_pos = vec2(200.0, 230.0);
    vec2 eye2_pos = vec2(540.0, 230.0);
    vec3 col1 = vec3(1.0, 0.0, 0.0);
    vec3 col3 = vec3(1.0, 0.5, 0.5);
    vec3 col2 = vec3(0.6, 0.0, 0.5);
    vec3 col4 = vec3(0.8, 0.0, 0.6);
    float max_dis = length(size - centre_pos);
    void main() {
      vec2 pos = v_texcoord * size;
      vec2 pos_waved = pos;
      pos_waved.x += sin(3.1415 / 60.0 * (pos.y + timer * 2.0)) * (sin(3.1415 / (60.0 / 140.0 * 120.0) * timer) * 14.0 + 16.0);
      pos_waved.y += sin(3.1415 / 60.0 * (pos.x + timer * 2.0)) * (sin(3.1415 / (60.0 / 140.0 * 120.0) * timer) * 14.0 + 16.0);
      float dis = length(centre_pos - pos_waved);
      dis *= sin(3.1415 / 20.0 * (dis - timer)) * (cos(3.1415 / (60.0 / 140.0 * 360.0) * timer) * 0.2 + 0.2) + 1.0;
      float k = dis / max_dis;
      float ak = k * 0.75 + 0.25;
      float alpha;
      float mod_flag = mod(dis - timer + 120.0, 120.0);
      if(mod_flag < 5.0 + ak * 25.0) {
        alpha = mod_flag / (5.0 + ak * 25.0);
      } else if(mod_flag < 5.0 + ak * 25.0 + ak * 60.0) {
        alpha = 1.0;
      } else if(mod_flag < (5.0 + ak * 25.0) * 2.0 + ak * 60.0) {
        alpha = ((5.0 + ak * 25.0) * 2.0 + ak * 60.0 - mod_flag) / (5.0 + ak * 25.0);
      } else {
        alpha = 0.0;
      }
      float sk = cos(3.1415 / (60.0 / 140.0 * 240.0) * timer) * 0.7 + 0.3;
      vec3 col_fg = mix(col1, col3, sk);
      vec3 col_bg = mix(col2, col4, sk);
      vec4 col = vec4(mix(col_bg, col_fg, k), alpha * (k * 0.6 + 0.4));
      
      float dis_x = centre_pos.x - pos.x;
      float dis_y = centre_pos.y - pos.y;
      float angle;
      if(dis_x == 0.0) {
        angle = 3.1415 / 2.0;
      } else {
        angle = atan(dis_y / dis_x);
      }
      if(dis_x < 0.0) {
        angle += 3.1415;
      }
      angle = mod(angle / 3.1415 * 180.0 + 360.0, 360.0);
      vec4 light_col;
      light_col.rgb = col2 * 0.5;
      float mod_angle_flag = mod(angle + 270.0 - timer + 72.0, 72.0);
      if(mod_angle_flag <= 5.0) {
        light_col.a = mod_angle_flag / 10.0;
      } else if(mod_angle_flag <= 15.0) {
        light_col.a = 0.5;
      } else if(mod_angle_flag <= 20.0) {
        light_col.a = (20.0 - mod_angle_flag) / 10.0;
      } else {
        light_col.a = 0.0;
      }
        gl_FragColor = vec4((col.rgb + light_col.rgb * light_col.a) * (col.a + light_col.a * (0.4 + col.a * 0.6)), 1.0);
      if(eyes_alpha > 0.0) {
        float x_offset = sin(3.1415 / (60.0 / 140.0 * 360.0) * timer) * 10.0;
        vec3 eyes_col = mix(vec3(0.0, 0.0, 0.0), col3, eyes_alpha * max(1.0 - min(length(pos - eye1_pos - vec2(x_offset, 0.0)), length(pos - eye2_pos - vec2(x_offset, 0.0))) / 100.0, 0.0));
        gl_FragColor = vec4(gl_FragColor.rgb * (1.0 - eyes_alpha * 0.8 * max(length(pos - centre_pos) / max_dis, 0.8)) + eyes_col * 1.6, 1.0);
      }
    }
    
    `;
  function strAdd(str, char, string) {
    return `${str.slice(0, char) + string + str.slice(char)}`;
  }
  function getUniformLocation(gl, uname) {
    gl.useProgram(drawprogram);
    if (uniformLocationBuffer[uname] == null) {
      uniformLocationBuffer[uname] = gl.getUniformLocation(drawprogram, uname);
    }
    return uniformLocationBuffer[uname];
  }
  function getClippingBox() {
    return clipping_box;
  }
  function setUniform1f(gl, uname, value) {
    gl.uniform1f(getUniformLocation(gl, uname), value);
  }
  function setUniform1i(gl, uname, value) {
    gl.uniform1i(getUniformLocation(gl, uname), value);
  }
  function setUniform2fv(gl, uname, value1, value2) {
    gl.uniform2fv(getUniformLocation(gl, uname), [value1, value2]);
  }

  var quadPositionBuffer;

  var quadTexCoordBuffer;

  /*
        Since clippingblending duck punching gl.bindFramebuffer will stop
        working when using custom framebuffer,  no reason is known at the
        moment. Use this method to bypass the duck punching it to achieve 
        compatibility.
  
        https://github.com/TurboWarp/extensions/blob/master/extensions/Xeltalliv/clippingblending.js#L48
      */
  function ShaderIsBackGround(able) {
    SBG = able;
  }
  function bindFramebufferInfo(gl, framebufferInfo, target) {
    target = target || gl.FRAMEBUFFER;
    var nativeBindFramebuffer = WebGLRenderingContext.prototype.bindFramebuffer;
    nativeBindFramebuffer.call(
      gl,
      target,
      framebufferInfo ? framebufferInfo.framebuffer : null,
    );
  }
  function createFramebuffer(gl, attachments, width, height, target) {
    target = target || gl.FRAMEBUFFER;
    const framebuffer = gl.createFramebuffer();
    gl.bindFramebuffer(target, framebuffer);
    attachments.forEach(function (attachment) {
      gl.framebufferTexture2D(
        target,
        attachment.attachment,
        attachment.texTarget,
        attachment.texture,
        attachment.level,
      );
    });
    const status = gl.checkFramebufferStatus(target);
    if (status !== gl.FRAMEBUFFER_COMPLETE) {
      return null;
    }
    gl.bindFramebuffer(target, null);
    return {
      framebuffer: framebuffer,
      attachments: attachments,
      width: width,
      height: height,
    };
  }
  function createshader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
      return shader;
    }
    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
  }

  function createProgram(gl, vertexShader, fragmentShader) {
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    const success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
      return program;
    }
    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
  }

  function initShader() {
    var programs = {
      none: null,
      glitch: null,
      dispersion: null,
      gray: null,
      reverse: null,
      pointillism: null,
      cliping: null,
      screensplit: null,
      mask: null,
      helleffectshader: null,
    };
    programs.none = createProgram(
      gl,
      createshader(gl, gl.VERTEX_SHADER, vertexShaderCode),
      createshader(gl, gl.FRAGMENT_SHADER, noneShaderCode),
    );
    programs.glitch = createProgram(
      gl,
      createshader(gl, gl.VERTEX_SHADER, vertexShaderCode),
      createshader(gl, gl.FRAGMENT_SHADER, GlitchShaderCode),
    );
    programs.dispersion = createProgram(
      gl,
      createshader(gl, gl.VERTEX_SHADER, vertexShaderCode),
      createshader(gl, gl.FRAGMENT_SHADER, dispersionShaderCode),
    );
    programs.gray = createProgram(
      gl,
      createshader(gl, gl.VERTEX_SHADER, vertexShaderCode),
      createshader(gl, gl.FRAGMENT_SHADER, GrayShaderCode),
    );
    programs.reverse = createProgram(
      gl,
      createshader(gl, gl.VERTEX_SHADER, vertexShaderCode),
      createshader(gl, gl.FRAGMENT_SHADER, ReverseShaderCode),
    );
    programs.pointillism = createProgram(
      gl,
      createshader(gl, gl.VERTEX_SHADER, vertexShaderCode),
      createshader(gl, gl.FRAGMENT_SHADER, PointillismShaderCode),
    );
    programs.cliping = createProgram(
      gl,
      createshader(gl, gl.VERTEX_SHADER, vertexShaderCode),
      createshader(gl, gl.FRAGMENT_SHADER, clipShaderCode),
    );
    programs.screensplit = createProgram(
      gl,
      createshader(gl, gl.VERTEX_SHADER, vertexShaderCode),
      createshader(gl, gl.FRAGMENT_SHADER, screensplitShaderCode),
    );
    programs.helleffectshader = createProgram(
      gl,
      createshader(gl, gl.VERTEX_SHADER, vertexShaderCode),
      createshader(gl, gl.FRAGMENT_SHADER, HellShaderCode),
    );
    return programs;
  }
  function initShaderUniform(programs) {
    gl.useProgram(programs.glitch);
    gl.uniform2fv(
      gl.getUniformLocation(programs.glitch, "_BlockSize"),
      [16, 16],
    );
    gl.uniform1f(gl.getUniformLocation(programs.glitch, "_Amplitude"), 0.1);
    gl.uniform1f(gl.getUniformLocation(programs.glitch, "_Time"), 0);
    gl.uniform1i(gl.getUniformLocation(programs.glitch, "_Rgb"), 0);
    gl.uniform2fv(gl.getUniformLocation(programs.glitch, "u_pos1"), [0, 0]);
    gl.uniform2fv(gl.getUniformLocation(programs.glitch, "u_pos2"), [1, 1]);
    gl.uniform2fv(gl.getUniformLocation(programs.glitch, "u_dir"), [1, 1]);
    gl.useProgram(programs.pointillism);
    gl.uniform1f(gl.getUniformLocation(programs.pointillism, "u_size"), 0.0001);
    gl.uniform1f(
      gl.getUniformLocation(programs.pointillism, "u_threshold"),
      0.7,
    );
    gl.uniform2fv(gl.getUniformLocation(programs.pointillism, "u_resolution"), [
      gl.canvas.width,
      gl.canvas.height,
    ]);
    gl.useProgram(programs.dispersion);
    gl.uniform2fv(
      gl.getUniformLocation(programs.dispersion, "direction_r"),
      [1.0, 0.0],
    );
    gl.uniform2fv(
      gl.getUniformLocation(programs.dispersion, "direction_g"),
      [0.4, 1.0],
    );
    gl.uniform2fv(
      gl.getUniformLocation(programs.dispersion, "direction_b"),
      [-0.7, -0.3],
    );
    gl.uniform1f(
      gl.getUniformLocation(programs.dispersion, "_Amplitude"),
      0.01,
    );
    gl.useProgram(programs.gray);
    gl.uniform3fv(
      gl.getUniformLocation(programs.gray, "_color"),
      [255, 255, 255],
    );
    gl.useProgram(programs.cliping);
    gl.uniform2fv(gl.getUniformLocation(programs.cliping, "u_pos1"), [0, 0]);
    gl.uniform2fv(gl.getUniformLocation(programs.cliping, "u_pos2"), [1, 1]);
    gl.uniform2fv(gl.getUniformLocation(programs.cliping, "texs"), [
      gl.canvas.width,
      gl.canvas.height,
    ]);
    gl.uniform1f(gl.getUniformLocation(programs.cliping, "rot"), 0);
    gl.useProgram(programs.screensplit);
    gl.uniform2fv(
      gl.getUniformLocation(programs.screensplit, "offset"),
      [0, 0],
    );
    gl.uniform2fv(gl.getUniformLocation(programs.screensplit, "split"), [1, 1]);
    gl.useProgram(programs.helleffectshader);
    gl.uniform1i(
      gl.getUniformLocation(programs.helleffectshader, "eyes_alpha"),
      1,
    );
    gl.uniform1i(gl.getUniformLocation(programs.helleffectshader, "timer"), 0);
    //gl.useProgram(programs.mask);
    //gl.uniform1i(gl.getUniformLocation(programs.mask,"mask"),new Float32Array(16));
  }

  var uniformLocationBuffer = {};

  var drawframebuffer = null;
  var framebuffersize = {
    Width: 0,
    Height: 0,
  };

  var framebuffertexture = null;
  var shaderPrograms = initShader();
  var drawprogram = shaderPrograms.none;
  var drawprogram_mode = "none";
  var bgprogram = shaderPrograms.none;
  var positionLocation = gl.getAttribLocation(drawprogram, "a_position");
  var texcoordLocation = gl.getAttribLocation(drawprogram, "a_texcoord");
  var textureLocation = gl.getUniformLocation(drawprogram, "u_texture");
  initShaderUniform(shaderPrograms);
  gl.useProgram(drawprogram);
  gl.uniform1i(textureLocation, framebuffertexture);

  const GS = renderer._shaderManager.getShader;
  //check framebuffer & buffer status
  const rendererDrawPrefix = function () {
    if (framebuffertexture == null) {
      framebuffertexture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, framebuffertexture);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.canvas.width,
        gl.canvas.height,
        0,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        null,
      );
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.bindTexture(gl.TEXTURE_2D, null);
      framebuffersize.Width = gl.canvas.width;
      framebuffersize.Height = gl.canvas.height;
    }
    if (
      framebuffersize.Height != gl.canvas.height ||
      framebuffersize.Width != gl.canvas.width
    ) {
      updateFrameBuffer(gl.canvas.width, gl.canvas.height);
      framebuffersize.Width = gl.canvas.width;
      framebuffersize.Height = gl.canvas.height;
    }
    if (quadTexCoordBuffer == null) {
      quadTexCoordBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, quadTexCoordBuffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(quadCoords),
        gl.STATIC_DRAW,
      );
    }
    if (quadPositionBuffer == null) {
      quadPositionBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, quadPositionBuffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(quadPositions),
        gl.STATIC_DRAW,
      );
    }
    if (drawframebuffer == null) {
      drawframebuffer = createFramebuffer(
        gl,
        [
          {
            attachment: gl.COLOR_ATTACHMENT0,
            texTarget: gl.TEXTURE_2D,
            texture: framebuffertexture,
            level: 0,
          },
        ],
        canvas.width,
        canvas.height,
      );
    }
  }.bind(renderer);
  //draw framebuffer texture in screen
  const rendererDrawPostfix = function () {
    timeUniform();
    bindFramebufferInfo(gl, null); //modified
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(...this._backgroundColor4f);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.bindTexture(gl.TEXTURE_2D, framebuffertexture);
    positionLocation = gl.getAttribLocation(drawprogram, "a_position");
    texcoordLocation = gl.getAttribLocation(drawprogram, "a_texcoord");
    textureLocation = gl.getUniformLocation(drawprogram, "u_texture");
    gl.useProgram(drawprogram);
    gl.uniform1i(textureLocation, framebuffertexture);

    gl.bindBuffer(gl.ARRAY_BUFFER, quadPositionBuffer);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, quadTexCoordBuffer);
    gl.enableVertexAttribArray(texcoordLocation);
    gl.vertexAttribPointer(texcoordLocation, 2, gl.FLOAT, false, 0, 0);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }.bind(renderer);
  const rendererDrawBGPostfix = function () {
    timeUniform();
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(...this._backgroundColor4f);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.bindTexture(gl.TEXTURE_2D, framebuffertexture);

    gl.useProgram(bgprogram);
    positionLocation = gl.getAttribLocation(bgprogram, "a_position");
    texcoordLocation = gl.getAttribLocation(bgprogram, "a_texcoord");
    textureLocation = gl.getUniformLocation(bgprogram, "u_texture");
    gl.uniform1i(textureLocation, framebuffertexture);

    gl.bindBuffer(gl.ARRAY_BUFFER, quadPositionBuffer);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, quadTexCoordBuffer);
    gl.enableVertexAttribArray(texcoordLocation);
    gl.vertexAttribPointer(texcoordLocation, 2, gl.FLOAT, false, 0, 0);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }.bind(renderer);

  const draw = function () {
    if (!this.dirty) {
      return;
    }
    this.dirty = false;

    bindFramebufferInfo(gl, null);

    rendererDrawPrefix(); //append

    bindFramebufferInfo(gl, drawframebuffer); //modified

    this._doExitDrawRegion();
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    rendererDrawBGPostfix();
    this._drawThese(this._drawList, "default", this._projection, {
      // draw the sprite to framebuffer
      framebufferWidth: gl.canvas.width,
      framebufferHeight: gl.canvas.height,
    });
    if (this._snapshotCallbacks.length > 0) {
      const snapshot = gl.canvas.toDataURL();
      this._snapshotCallbacks.forEach((cb) => cb(snapshot));
      this._snapshotCallbacks = [];
    }
    rendererDrawPostfix(); //append
  }.bind(renderer);

  renderer.draw = draw;
  vm.runtime.on("PROJECT_LOADED", (_) => {
    rendererDrawPrefix();
  });

  //resize framebuffer when stage size changed
  vm.runtime.on("STAGE_SIZE_CHANGED", (_) => updateFrameBuffer());
  function updateFrameBuffer() {
    if (framebuffertexture != null) {
      console.log("STAGE_SIZE_CHANGED. resize the post-process framebuffer.");
      gl.bindTexture(gl.TEXTURE_2D, framebuffertexture);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.canvas.width,
        gl.canvas.height,
        0,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        null,
      );
      if (drawprogram_mode == "pointillism") {
        setUniform2fv(gl, "u_resolution", gl.canvas.width, gl.canvas.height);
      }
    }
  }
  vm.runtime.on("PROJECT_RUN_START", (_) => {
    positionLocation = gl.getAttribLocation(drawprogram, "a_position");
    texcoordLocation = gl.getAttribLocation(drawprogram, "a_texcoord");
    textureLocation = gl.getUniformLocation(drawprogram, "u_texture");
  });
  var timeruniform = true;
  function timeUniform() {
    if (!timeruniform) return;
    switch (drawprogram_mode) {
      case "glitch":
        gl.useProgram(drawprogram);
        setUniform1f(gl, "_Time", Math.random());
    }
  }
  class postprocessing {
    getInfo() {
      return {
        id: "postprocessingv2",
        name: "Post-Processing V2",
        blocks: [
          {
            opcode: "opcodeChangePostProcess",
            text: Scratch.translate({ id: 'opcodeChangePostProcess', default: "change effect to [Menu]"}),
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              Menu: {
                type: Scratch.ArgumentType.STRING,
                menu: "PostProcess",
              },
            },
          },
          {
            opcode: "opcodeChangeGlitch",
            text: Scratch.translate({ id: 'opcodeChangeGlitch', default: "Glitch Amplitude:[Amplitude]%,"}),
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              Amplitude: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
              },
            },
          },
          {
            opcode: "opcodeChangeDispersion",
            text: Scratch.translate({ id: 'opcodeChangeDispersion', default: "Dispersion Amplitude:[Amplitude]%"}),
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              Amplitude: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
              },
            },
          },
          {
            opcode: "opcodeChangeGray",
            text: Scratch.translate({ id: 'opcodeChangeGray', default: "Gray Color:[COLOR]"}),
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              COLOR: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#FFFFFF",
              },
            },
          },
          {
            opcode: "opcodeChangePointillism",
            text: Scratch.translate({ id: 'opcodeChangePointillism', default: "Pointillism Threshold:[threshold]%"}),
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              threshold: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 70,
              },
            },
          },
          {
            opcode: "opcodeChangeScreensplit",
            text: Scratch.translate({ id: 'opcodeChangeScreensplit', default: "Screensplit x:[split_x] y:[split_y]"}),
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              split_x: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
              },
              split_y: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
              },
            },
          },
          {
            opcode: "opcodeChangeCliping",
            text: Scratch.translate({ id: 'opcodeChangeCliping', default: "Clip Start: X:[x1],Y:[y1] To: X:[x2],Y:[y2] ROT[rot]"}),
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              x1: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
              y1: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
              x2: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
              },
              y2: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
              },
              rot: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
            },
          },

          {
            opcode: "opcodeRequestReDraw",
            text: Scratch.translate({ id: 'opcodeRequestReDraw', default: "redraw post-process"}),
            blockType: Scratch.BlockType.COMMAND,
            arguments: {},
          },
          {
            opcode: "opcodeGetPostProcess",
            text: Scratch.translate({ id: 'opcodeGetPostProcess', default: "Post-Process Mode"}),
            blockType: Scratch.BlockType.REPORTER,
            arguments: {},
          },

          {
            opcode: "opcodeUniform2fv",
            text: "uniform2fv Name:[NAME] Value:[X] [Y]",
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                menu: "v2_uniforms",
              },
              X: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 8,
              },
              Y: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 8,
              },
            },
            hideFromPalette: false,
          },
          //THEY BLOCKS WAS VERY DANGEROUS, SHOULDN'T BE USED BY NORMAL USERS. JUST FOR THE PRO.
          {
            opcode: "opcodeUniform1f",
            text: "uniform1f Name:[NAME] Value:[X]",
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                menu: "v1_uniforms",
              },
              X: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
            },
            hideFromPalette: false,
          },
          {
            opcode: "opcodeReplaceShader",
            text: "post-process VS:[VS] FS:[FS]",
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              VS: {
                type: Scratch.ArgumentType.STRING,
                defaultValue:
                  "attribute vec4 a_position;attribute vec2 a_texcoord;varying vec2 v_texcoord;void main() {gl_Position = vec4(a_position.x, a_position.y, a_position.z, 1);v_texcoord = a_texcoord;}",
              },
              FS: {
                type: Scratch.ArgumentType.STRING,
                defaultValue:
                  "varying vec2 v_texcoord;varying vec4 vColor;uniform sampler2D u_texture;void main() {gl_FragColor=texture2D(u_texture,v_texcoord);}",
              },
            },
            hideFromPalette: true,
          },
        ],
        menus: {
          PostProcess: {
            acceptReporters: true,
            items: [
              Scratch.translate({ id: 'PostProcess_glitch', default: "glitch"}),
              Scratch.translate({ id: 'PostProcess_dispersion', default: "dispersion"}),
              Scratch.translate({ id: 'PostProcess_gray', default: "gray"}),
              Scratch.translate({ id: 'PostProcess_reverse', default: "reverse"}),
              Scratch.translate({ id: 'PostProcess_pointillism', default: "pointillism"}),
              Scratch.translate({ id: 'PostProcess_cliping', default: "cliping"}),
              Scratch.translate({ id: 'PostProcess_screensplit', default: "screensplit"}),
              Scratch.translate({ id: 'PostProcess_helleffectshader', default: "helleffectshader"}),
              Scratch.translate({ id: 'PostProcess_none', default: "none"}),
            ],
        },
          v1_uniforms: {
            acceptReporters: true,
            items: [
              "_Amplitude",
              "_Time",
              "u_size",
              "_Rgb",
              "timer",
              "eyes_alpha",
            ],
          },
          v2_uniforms: {
            acceptReporters: true,
            items: [
              "_BlockSize",
              "direction_r",
              "direction_g",
              "direction_b",
              "offset",
              "split",
            ],
          },
        },
      };
    }

    opcodeChangePostProcess({ Menu }) {
      if (Menu == "glitch") {
        drawprogram = shaderPrograms.glitch;
      }
      if (Menu == "none") {
        drawprogram = shaderPrograms.none;
        bgprogram = shaderPrograms.none;
      }
      if (Menu == "gray") {
        drawprogram = shaderPrograms.gray;
      }
      if (Menu == "reverse") {
        drawprogram = shaderPrograms.reverse;
      }

      if (Menu == "dispersion") {
        drawprogram = shaderPrograms.dispersion;
      }
      if (Menu == "pointillism") {
        drawprogram = shaderPrograms.pointillism;
      }
      if (Menu == "cliping") {
        drawprogram = shaderPrograms.cliping;
      }
      if (Menu == "screensplit") {
        drawprogram = shaderPrograms.screensplit;
      }
      if (Menu == "helleffectshader") {
        bgprogram = shaderPrograms.helleffectshader;
      }
      vm.runtime.requestRedraw();
      vm.renderer.dirty = true;
      drawprogram_mode = Menu;
      uniformLocationBuffer = {};
      if (gl.isProgram(drawprogram) == false) {
        console.error("postprocess program not is valid.");
      }
      positionLocation = gl.getAttribLocation(drawprogram, "a_position");
      texcoordLocation = gl.getAttribLocation(drawprogram, "a_texcoord");
      textureLocation = gl.getUniformLocation(drawprogram, "u_texture");
    }
    opcodeChangeDispersion({ Amplitude }) {
      if (drawprogram_mode != "dispersion") {
        console.log("post-process mode not dispersion, change to it.");
        this.opcodeChangePostProcess({ Menu: "dispersion" });
      }
      setUniform1f(gl, "_Amplitude", Amplitude / 100.0);
      vm.renderer.dirty = true;
    }

    opcodeChangeGlitch({ Amplitude }) {
      if (drawprogram_mode != "glitch") {
        console.log("post-process mode not glitch, change to it.");
        this.opcodeChangePostProcess({ Menu: "glitch" });
      }
      setUniform1f(gl, "_Amplitude", Scratch.Cast.toNumber(Amplitude) / 100.0);
      vm.renderer.dirty = true;
    }
    opcodeChangeGray({ COLOR }) {
      if (drawprogram_mode != "gray") {
        console.log("post-process mode not gray, change to it.");
        this.opcodeChangePostProcess({ Menu: "gray" });
      }
      var location = gl.getUniformLocation(shaderPrograms.gray, "_color");
      gl.useProgram(shaderPrograms.gray);
      gl.uniform3fv(location, Scratch.Cast.toRgbColorList(COLOR));
      vm.renderer.dirty = true;
    }
    opcodeChangePointillism({ threshold }) {
      if (drawprogram_mode != "pointillism") {
        console.log("post-process mode not pointillism, change to it.");
        this.opcodeChangePostProcess({ Menu: "pointillism" });
      }
      setUniform1f(gl, "u_threshold", Scratch.Cast.toNumber(threshold) / 100.0);
      vm.renderer.dirty = true;
    }
    opcodeChangeScreensplit({ split_x, split_y }) {
      if (drawprogram_mode != "screensplit") {
        console.log("post-process mode not screensplit, change to it.");
        this.opcodeChangePostProcess({ Menu: "screensplit" });
      }
      setUniform2fv(
        gl,
        "split",
        Scratch.Cast.toNumber(split_x),
        Scratch.Cast.toNumber(split_y),
      );
      vm.renderer.dirty = true;
    }
    opcodeChangeCliping({ x1, y1, x2, y2, rot }, { target }) {
      if (drawprogram_mode != "cliping") {
        console.log("post-process mode not cliping, change to it.");
        this.opcodeChangePostProcess({ Menu: "cliping" }, { target });
      }
      setUniform2fv(gl, "u_pos1", x1, y1);
      setUniform2fv(gl, "u_pos2", x2, y2);
      setUniform1f(gl, "rot", rot);
      setUniform2fv(gl, "texs", framebuffersize);
      spritetarget = target;
      vm.renderer.dirty = true;
    }

    // not must. but it can make sure the post-process effect is correct (?)
    opcodeRequestReDraw() {
      vm.renderer.dirty = true;
      vm.runtime.requestRedraw();
    }
    opcodeGetPostProcess() {
      return drawprogram_mode;
    }
    //VERY DANGEROUS, SHOULDN'T BE USED BY NORMAL USERS. JUST FOR THE PRO.
    opcodeReplaceShader({ VS, FS }) {
      drawprogram = createProgram(gl, VS, FS);
      if (gl.isProgram(drawprogram) == false) {
        console.error("postprocess program not is valid.");
      }
      positionLocation = gl.getAttribLocation(drawprogram, "a_position");
      texcoordLocation = gl.getAttribLocation(drawprogram, "a_texcoord");
      textureLocation = gl.getUniformLocation(drawprogram, "u_texture");
      drawprogram_mode = "custom";
      gl.uniform1i(textureLocation, framebuffertexture);
      vm.renderer.dirty = true;
    }
    opcodeUniform2fv({ NAME, X, Y }) {
      if (NAME == "_Time") {
        timeruniform = false;
      }
      setUniform2fv(gl, NAME, X, Y);
      vm.renderer.dirty = true;
    }
    opcodeUniform1f({ NAME, X }) {
      setUniform1f(gl, NAME, X);
      vm.renderer.dirty = true;
    }
  }
  Scratch.extensions.register(new postprocessing());
})(Scratch);
