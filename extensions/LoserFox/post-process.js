(function(Scratch) {
  'use strict';
  if (!Scratch.extensions.unsandboxed) {
    throw new Error('PostProcessing must run unsandboxed');
  }
  const vm = Scratch.vm;
  const renderer = vm.renderer;
  const gl = renderer._gl;
  const canvas = renderer.canvas;
  const runtime=vm.runtime;
  const twgl=renderer.exports.twgl;
  let SBG=false;
  renderer._drawThese_=renderer._drawThese;
  class SM{
  }
  SM.EFFECT_INFO={
    /** Color effect */
  color: {
    uniformName: 'u_color',
    mask: 1 << 0,
    converter: x => (x / 200) % 1,
    shapeChanges: false
    },
    /** Fisheye effect */
    fisheye: {
        uniformName: 'u_fisheye',
        mask: 1 << 1,
        converter: x => Math.max(0, (x + 100) / 100),
        shapeChanges: true
    },
    /** Whirl effect */
    whirl: {
        uniformName: 'u_whirl',
        mask: 1 << 2,
        converter: x => -x * Math.PI / 180,
        shapeChanges: true
    },
    /** Pixelate effect */
    pixelate: {
        uniformName: 'u_pixelate',
        mask: 1 << 3,
        converter: x => Math.abs(x) / 10,
        shapeChanges: true
    },
    /** Mosaic effect */
    mosaic: {
        uniformName: 'u_mosaic',
        mask: 1 << 4,
        converter: x => {
            x = Math.round((Math.abs(x) + 10) / 10);
            /** @todo cap by Math.min(srcWidth, srcHeight) */
            return Math.max(1, Math.min(x, 512));
        },
        shapeChanges: true
    },
    /** Brightness effect */
    brightness: {
        uniformName: 'u_brightness',
        mask: 1 << 5,
        converter: x => Math.max(-100, Math.min(x, 100)) / 100,
        shapeChanges: false
    },
    /** Ghost effect */
    ghost: {
        uniformName: 'u_ghost',
        mask: 1 << 6,
        converter: x => 1 - (Math.max(0, Math.min(x, 100)) / 100),
        shapeChanges: false
    } 
  }
  SM.EFFECTS = Object.keys(SM.EFFECT_INFO);
  SM.DRAW_MODE = {
    /**
     * Draw normally. Its output will use premultiplied alpha.
     */
    default: 'default',

    /**
     * Draw with non-premultiplied alpha. Useful for reading pixels from GL into an ImageData object.
     */
    straightAlpha: 'straightAlpha',

    /**
     * Draw a silhouette using a solid color.
     */
    silhouette: 'silhouette',

    /**
     * Draw only the parts of the drawable which match a particular color.
     */
    colorMask: 'colorMask',

    /**
     * Draw a line with caps.
     */
    line: 'line',

    /**
     * Draw the background in a certain color. Must sometimes be used instead of gl.clear.
     */
    background: 'background'
  };
  let spritetarget=null;
  
  //const drawable=renderer._allDrawables[drawableID]
  let clipping_box={
    x1:0,
    y1:0,
    x2:0,
    y2:0,
    rot:0
  }
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
  var dispersionShaderCode =
  `
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
  var frag=`
  precision mediump float;

  uniform float rot;
  uniform vec2 u_pos1;
  uniform vec2 u_pos2;
  uniform vec2 texwh;
  uniform vec2 spriteXY;
  uniform vec2 skinCentrePoint;
  uniform vec2 _pos1;
  uniform vec2 _pos2;
  uniform vec2 Mixingtexs;
  uniform float _rot;
  uniform float MixingAble;
  uniform sampler2D Mixing_tex;
  uniform vec2 p_pos0;
  uniform vec2 p_pos1;
  uniform vec2 p_pos2;
  uniform vec2 _p_pos0;
  uniform vec2 _p_pos1;
  uniform vec2 _p_pos2;
  uniform bool T_clip;
  uniform bool ClipBoxAble;
  uniform bool FTCAble;

  #ifdef DRAW_MODE_silhouette
  uniform vec4 u_silhouetteColor;
  #else // DRAW_MODE_silhouette
  # ifdef ENABLE_color
  uniform float u_color;
  # endif // ENABLE_color
  # ifdef ENABLE_brightness
  uniform float u_brightness;
  # endif // ENABLE_brightness
  #endif // DRAW_MODE_silhouette

  #ifdef DRAW_MODE_colorMask
  uniform vec3 u_colorMask;
  uniform float u_colorMaskTolerance;
  #endif // DRAW_MODE_colorMask

  #ifdef ENABLE_fisheye
  uniform float u_fisheye;
  #endif // ENABLE_fisheye
  #ifdef ENABLE_whirl
  uniform float u_whirl;
  #endif // ENABLE_whirl
  #ifdef ENABLE_pixelate
  uniform float u_pixelate;
  uniform vec2 u_skinSize;
  #endif // ENABLE_pixelate
  #ifdef ENABLE_mosaic
  uniform float u_mosaic;
  #endif // ENABLE_mosaic
  #ifdef ENABLE_ghost
  uniform float u_ghost;
  #endif // ENABLE_ghost

  #ifdef DRAW_MODE_line
  varying vec4 v_lineColor;
  varying float v_lineThickness;
  varying float v_lineLength;
  #endif // DRAW_MODE_line

  #ifdef DRAW_MODE_background
  uniform vec4 u_backgroundColor;
  #endif // DRAW_MODE_background

  uniform sampler2D u_skin;

  #ifndef DRAW_MODE_background
  varying vec2 v_texCoord;
  #endif

  // Add this to divisors to prevent division by 0, which results in NaNs propagating through calculations.
  // Smaller values can cause problems on some mobile devices.
  const float epsilon = 1e-3;

  #if !defined(DRAW_MODE_silhouette) && (defined(ENABLE_color))
  // Branchless color conversions based on code from:
  // http://www.chilliant.com/rgb2hsv.html by Ian Taylor
  // Based in part on work by Sam Hocevar and Emil Persson
  // See also: https://en.wikipedia.org/wiki/HSL_and_HSV#Formal_derivation


  // Convert an RGB color to Hue, Saturation, and Value.
  // All components of input and output are expected to be in the [0,1] range.
  vec3 convertRGB2HSV(vec3 rgb)
  {
    // Hue calculation has 3 cases, depending on which RGB component is largest, and one of those cases involves a "mod"
    // operation. In order to avoid that "mod" we split the M==R case in two: one for G<B and one for B>G. The B>G case
    // will be calculated in the negative and fed through abs() in the hue calculation at the end.
    // See also: https://en.wikipedia.org/wiki/HSL_and_HSV#Hue_and_chroma
    const vec4 hueOffsets = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);

    // temp1.xy = sort B & G (largest first)
    // temp1.z = the hue offset we'll use if it turns out that R is the largest component (M==R)
    // temp1.w = the hue offset we'll use if it turns out that R is not the largest component (M==G or M==B)
    vec4 temp1 = rgb.b > rgb.g ? vec4(rgb.bg, hueOffsets.wz) : vec4(rgb.gb, hueOffsets.xy);

    // temp2.x = the largest component of RGB ("M" / "Max")
    // temp2.yw = the smaller components of RGB, ordered for the hue calculation (not necessarily sorted by magnitude!)
    // temp2.z = the hue offset we'll use in the hue calculation
    vec4 temp2 = rgb.r > temp1.x ? vec4(rgb.r, temp1.yzx) : vec4(temp1.xyw, rgb.r);

    // m = the smallest component of RGB ("min")
    float m = min(temp2.y, temp2.w);

    // Chroma = M - m
    float C = temp2.x - m;

    // Value = M
    float V = temp2.x;

    return vec3(
      abs(temp2.z + (temp2.w - temp2.y) / (6.0 * C + epsilon)), // Hue
      C / (temp2.x + epsilon), // Saturation
      V); // Value
  }
  float sign(int x){
    if(x>0) return 1.;
    if(x<0) return -1.;
    else{return 0.;}
    return 0.;
  }
  vec3 convertHue2RGB(float hue)
  {
    float r = abs(hue * 6.0 - 3.0) - 1.0;
    float g = 2.0 - abs(hue * 6.0 - 2.0);
    float b = 2.0 - abs(hue * 6.0 - 4.0);
    return clamp(vec3(r, g, b), 0.0, 1.0);
  }

  vec3 convertHSV2RGB(vec3 hsv)
  {
    vec3 rgb = convertHue2RGB(hsv.x);
    float c = hsv.z * hsv.y;
    return rgb * c + hsv.z - c;
  }
  #endif // !defined(DRAW_MODE_silhouette) && (defined(ENABLE_color))

  const vec2 kCenter = vec2(0.5, 0.5);

  void main()
  {
    #if !(defined(DRAW_MODE_line) || defined(DRAW_MODE_background))
    vec2 texcoord0 = v_texCoord;

    #ifdef ENABLE_mosaic
    texcoord0 = fract(u_mosaic * texcoord0);
    #endif // ENABLE_mosaic

    #ifdef ENABLE_pixelate
    {
      // TODO: clean up "pixel" edges
      vec2 pixelTexelSize = u_skinSize / u_pixelate;
      texcoord0 = (floor(texcoord0 * pixelTexelSize) + kCenter) / pixelTexelSize;
    }
    #endif // ENABLE_pixelate

    #ifdef ENABLE_whirl
    {
      const float kRadius = 0.5;
      vec2 offset = texcoord0 - kCenter;
      float offsetMagnitude = length(offset);
      float whirlFactor = max(1.0 - (offsetMagnitude / kRadius), 0.0);
      float whirlActual = u_whirl * whirlFactor * whirlFactor;
      float sinWhirl = sin(whirlActual);
      float cosWhirl = cos(whirlActual);
      mat2 rotationMatrix = mat2(
        cosWhirl, -sinWhirl,
        sinWhirl, cosWhirl
      );

      texcoord0 = rotationMatrix * offset + kCenter;
    }
    #endif // ENABLE_whirl

    #ifdef ENABLE_fisheye
    {
      vec2 vec = (texcoord0 - kCenter) / kCenter;
      float vecLength = length(vec);
      float r = pow(min(vecLength, 1.0), u_fisheye) * max(1.0, vecLength);
      vec2 unit = vec / vecLength;

      texcoord0 = kCenter + r * unit * kCenter;
    }
    #endif // ENABLE_fisheye

    gl_FragColor = texture2D(u_skin, texcoord0);
    if(ClipBoxAble){
      vec2 pospix1=u_pos1;
      vec2 pospix2=u_pos2;
      vec2 pos=vec2(spriteXY.x-texwh.x/2.+texcoord0.x*texwh.x,spriteXY.y+texwh.y/2.-texcoord0.y*texwh.y);
      vec2 cop=pos;
      float angle=radians(-rot);
      
      pos.x=pospix1.x+(cop.x-pospix1.x)*cos(angle)-(cop.y-pospix1.y)*sin(angle);
      pos.y=pospix1.y+(cop.x-pospix1.x)*sin(angle)+(cop.y-pospix1.y)*cos(angle);
      if(pos.x>pospix1.x && pospix2.x>pos.x && pos.y>pospix1.y && pospix2.y>pos.y){}
      else{
        gl_FragColor=vec4(0.);
      }

      vec2 _pospix1=_pos1;
      vec2 _pospix2=_pos2;
      vec2 _pos=vec2(spriteXY.x-texwh.x/2.+texcoord0.x*texwh.x,spriteXY.y+texwh.y/2.-texcoord0.y*texwh.y);
      vec2 _cop=pos;
      float fangle=radians(-_rot);
      
      pos.x=_pospix1.x+(cop.x-_pospix1.x)*cos(fangle)-(cop.y-_pospix1.y)*sin(fangle);
      pos.y=_pospix1.y+(cop.x-_pospix1.x)*sin(fangle)+(cop.y-_pospix1.y)*cos(fangle);
      if(pos.x>_pospix1.x && _pospix2.x>pos.x && pos.y>_pospix1.y && _pospix2.y>pos.y){gl_FragColor=vec4(0.);}
    }
    if(MixingAble==1.){
      //vec2 p_posInMixing=pos-Mixingtexs/2.;
      //vec2 u_posInMixing=p_posInMixing/Mixingtexs;
      //vec2 _uv=Mixingtexs/texwh;
      //gl_FragColor.a*=texture2D(Mixing_tex, vec2(u_posInMixing.x+texcoord0.x*_uv.x,1.-(u_posInMixing.y+texcoord0.y*_uv.y))).a;
    }
    if(T_clip){
      vec2 _pos=vec2(spriteXY.x-texwh.x/2.+texcoord0.x*texwh.x,spriteXY.y+texwh.y/2.-texcoord0.y*texwh.y);
      vec2 V_AB=(p_pos0-p_pos1);
      vec2 V_BA=(p_pos1-p_pos0);
      vec2 V_BC=(p_pos1-p_pos2);
      vec2 V_AC=(p_pos0-p_pos2);
      vec2 V_AP=(p_pos0-_pos);
      vec2 V_BP=(p_pos1-_pos);
      if((sign(V_AB.x*V_AC.y-V_AB.y*V_AC.x)==sign(V_AB.x*V_AP.y-V_AB.y*V_AP.x))==false){
        gl_FragColor=vec4(0.);
      }
      if((sign(V_AC.x*V_AB.y-V_AC.y*V_AB.x)==sign(V_AC.x*V_AP.y-V_AC.y*V_AP.x))==false){
        gl_FragColor=vec4(0.);
      }
      if((sign(V_BC.x*V_BA.y-V_BC.y*V_BA.x)==sign(V_BC.x*V_BP.y-V_BC.y*V_BP.x))==false){
        gl_FragColor=vec4(0.);
      }
      //pos=vec2(spriteXY.x-texwh.x/2.+texcoord0.x*texwh.x,spriteXY.y+texwh.y/2.-texcoord0.y*texwh.y);
      if(FTCAble){
        vec2 _V_AB=(_p_pos0-_p_pos1);
        vec2 _V_BA=(_p_pos1-_p_pos0);
        vec2 _V_BC=(_p_pos1-_p_pos2);
        vec2 _V_AC=(_p_pos0-_p_pos2);
        vec2 _V_AP=(_p_pos0-_pos);
        vec2 _V_BP=(_p_pos1-_pos);
        if((sign(_V_AB.x*_V_AC.y-_V_AB.y*_V_AC.x)==sign(_V_AB.x*_V_AP.y-_V_AB.y*_V_AP.x))){
          if((sign(_V_AC.x*_V_AB.y-_V_AC.y*_V_AB.x)==sign(_V_AC.x*_V_AP.y-_V_AC.y*_V_AP.x))){
            if((sign(_V_BC.x*_V_BA.y-_V_BC.y*_V_BA.x)==sign(_V_BC.x*_V_BP.y-_V_BC.y*_V_BP.x))){
            gl_FragColor=vec4(0.);
            }
          }
        }
      }
    }

    #if defined(ENABLE_color) || defined(ENABLE_brightness)
    // Divide premultiplied alpha values for proper color processing
    // Add epsilon to avoid dividing by 0 for fully transparent pixels
    gl_FragColor.rgb = clamp(gl_FragColor.rgb / (gl_FragColor.a + epsilon), 0.0, 1.0);

    #ifdef ENABLE_color
    {
      vec3 hsv = convertRGB2HSV(gl_FragColor.xyz);

      // this code forces grayscale values to be slightly saturated
      // so that some slight change of hue will be visible
      const float minLightness = 0.11 / 2.0;
      const float minSaturation = 0.09;
      if (hsv.z < minLightness) hsv = vec3(0.0, 1.0, minLightness);
      else if (hsv.y < minSaturation) hsv = vec3(0.0, minSaturation, hsv.z);

      hsv.x = mod(hsv.x + u_color, 1.0);
      if (hsv.x < 0.0) hsv.x += 1.0;

      gl_FragColor.rgb = convertHSV2RGB(hsv);
    }
    #endif // ENABLE_color

    #ifdef ENABLE_brightness
    gl_FragColor.rgb = clamp(gl_FragColor.rgb + vec3(u_brightness), vec3(0), vec3(1));
    #endif // ENABLE_brightness

    // Re-multiply color values
    gl_FragColor.rgb *= gl_FragColor.a + epsilon;

    #endif // defined(ENABLE_color) || defined(ENABLE_brightness)

    #ifdef ENABLE_ghost
    gl_FragColor *= u_ghost;
    #endif // ENABLE_ghost

    #ifdef DRAW_MODE_silhouette
    // Discard fully transparent pixels for stencil test
    if (gl_FragColor.a == 0.0) {
      discard;
    }
    // switch to u_silhouetteColor only AFTER the alpha test
    gl_FragColor = u_silhouetteColor;
    #else // DRAW_MODE_silhouette

    #ifdef DRAW_MODE_colorMask
    vec3 maskDistance = abs(gl_FragColor.rgb - u_colorMask);
    vec3 colorMaskTolerance = vec3(u_colorMaskTolerance, u_colorMaskTolerance, u_colorMaskTolerance);
    if (any(greaterThan(maskDistance, colorMaskTolerance)))
    {
      discard;
    }
    #endif // DRAW_MODE_colorMask
    #endif // DRAW_MODE_silhouette

    #ifdef DRAW_MODE_straightAlpha
    // Un-premultiply alpha.
    gl_FragColor.rgb /= gl_FragColor.a + epsilon;
    #endif

    #endif // !(defined(DRAW_MODE_line) || defined(DRAW_MODE_background))

    #ifdef DRAW_MODE_line
    // Maaaaagic antialiased-line-with-round-caps shader.

    // "along-the-lineness". This increases parallel to the line.
    // It goes from negative before the start point, to 0.5 through the start to the end, then ramps up again
    // past the end point.
    float d = ((v_texCoord.x - clamp(v_texCoord.x, 0.0, v_lineLength)) * 0.5) + 0.5;

    // Distance from (0.5, 0.5) to (d, the perpendicular coordinate). When we're in the middle of the line,
    // d will be 0.5, so the distance will be 0 at points close to the line and will grow at points further from it.
    // For the "caps", d will ramp down/up, giving us rounding.
    // See https://www.youtube.com/watch?v=PMltMdi1Wzg for a rough outline of the technique used to round the lines.
    float line = distance(vec2(0.5), vec2(d, v_texCoord.y)) * 2.0;
    // Expand out the line by its thickness.
    line -= ((v_lineThickness - 1.0) * 0.5);
    // Because "distance to the center of the line" decreases the closer we get to the line, but we want more opacity
    // the closer we are to the line, invert it.
    gl_FragColor = v_lineColor * clamp(1.0 - line, 0.0, 1.0);
    #endif // DRAW_MODE_line

    #ifdef DRAW_MODE_background
    gl_FragColor = u_backgroundColor;
    #endif
  }

  `;
  var vert=`
  precision mediump float;

  #ifdef DRAW_MODE_line
  uniform vec2 u_stageSize;
  attribute vec2 a_lineThicknessAndLength;
  attribute vec4 a_penPoints;
  attribute vec4 a_lineColor;
  
  varying vec4 v_lineColor;
  varying float v_lineThickness;
  varying float v_lineLength;
  varying vec4 v_penPoints;
  
  // Add this to divisors to prevent division by 0, which results in NaNs propagating through calculations.
  // Smaller values can cause problems on some mobile devices.
  const float epsilon = 1e-3;
  #endif
  
  #if !(defined(DRAW_MODE_line) || defined(DRAW_MODE_background))
  uniform mat4 u_projectionMatrix;
  uniform mat4 u_modelMatrix;
  attribute vec2 a_texCoord;
  #endif
  
  attribute vec2 a_position;
  
  varying vec2 v_texCoord;
  
  void main() {
    #ifdef DRAW_MODE_line
    // Calculate a rotated ("tight") bounding box around the two pen points.
    // Yes, we're doing this 6 times (once per vertex), but on actual GPU hardware,
    // it's still faster than doing it in JS combined with the cost of uniformMatrix4fv.
  
    // Expand line bounds by sqrt(2) / 2 each side-- this ensures that all antialiased pixels
    // fall within the quad, even at a 45-degree diagonal
    vec2 position = a_position;
    float expandedRadius = (a_lineThicknessAndLength.x * 0.5) + 1.4142135623730951;
  
    // The X coordinate increases along the length of the line. It's 0 at the center of the origin point
    // and is in pixel-space (so at n pixels along the line, its value is n).
    v_texCoord.x = mix(0.0, a_lineThicknessAndLength.y + (expandedRadius * 2.0), a_position.x) - expandedRadius;
    // The Y coordinate is perpendicular to the line. It's also in pixel-space.
    v_texCoord.y = ((a_position.y - 0.5) * expandedRadius) + 0.5;
  
    position.x *= a_lineThicknessAndLength.y + (2.0 * expandedRadius);
    position.y *= 2.0 * expandedRadius;
  
    // 1. Center around first pen point
    position -= expandedRadius;
  
    // 2. Rotate quad to line angle
    vec2 pointDiff = a_penPoints.zw;
    // Ensure line has a nonzero length so it's rendered properly
    // As long as either component is nonzero, the line length will be nonzero
    // If the line is zero-length, give it a bit of horizontal length
    pointDiff.x = (abs(pointDiff.x) < epsilon && abs(pointDiff.y) < epsilon) ? epsilon : pointDiff.x;
    vec2 normalized = pointDiff / max(a_lineThicknessAndLength.y, epsilon);
    position = mat2(normalized.x, normalized.y, -normalized.y, normalized.x) * position;
  
    // 3. Translate quad
    position += a_penPoints.xy;
  
    // 4. Apply view transform
    position *= 2.0 / u_stageSize;
    gl_Position = vec4(position, 0, 1);
  
    v_lineColor = a_lineColor;
    v_lineThickness = a_lineThicknessAndLength.x;
    v_lineLength = a_lineThicknessAndLength.y;
    v_penPoints = a_penPoints;
    #elif defined(DRAW_MODE_background)
    gl_Position = vec4(a_position * 2.0, 0, 1);
    #else
    gl_Position = u_projectionMatrix * u_modelMatrix * vec4(a_position, 0, 1);
    v_texCoord = a_texCoord;
    #endif
  }
  
  `
  var GlitchShaderCode =
  `
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
  var GrayShaderCode =
  `
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
  var ReverseShaderCode =
  `
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
  var quadPositions = [
    -1, -1,
    -1, 1,
    1, -1,
    1, -1,
    -1, 1,
    1, 1,
  ];

  var quadCoords = [
    0, 0,
    0, 1,
    1, 0,
    1, 0,
    0, 1,
    1, 1,
  ];
  var screensplitShaderCode =
  `
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
  var HellShaderCode=`
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
  
  `
  function strAdd(str,char,string){
    return `${str.slice(0,char)+string+str.slice(char)}`;
  }
  function getUniformLocation(gl,uname){
    gl.useProgram(drawprogram);
    if (uniformLocationBuffer[uname] == null){
      uniformLocationBuffer[uname] = gl.getUniformLocation(drawprogram, uname);
    }
    return uniformLocationBuffer[uname];
  }
  function getClippingBox(){
    return clipping_box;
  }
    function setUniform1f(gl,uname,value){
      gl.uniform1f(getUniformLocation(gl,uname),value);

    }
    function setUniform1i(gl,uname,value){
      gl.uniform1i(getUniformLocation(gl,uname),value);

    }
  function setUniform2fv (gl,uname,value1,value2){
      gl.uniform2fv(getUniformLocation(gl,uname),[value1,value2]);
    }
  renderer.updateDrawableClipbox=function(drawableID,clipbox){
    const drawable = this._allDrawables[drawableID];
    this.ClearClip(drawableID,false);
    if(!drawable)return;
    return drawable.clipbox=clipbox;
  }
  renderer.updateFDrawableClipbox=function(drawableID,clipbox){
    const drawable = this._allDrawables[drawableID];
    this.ClearClip(drawableID,false);
    if(!drawable)return;
    return drawable._clipbox=clipbox;
  }
  renderer.updateMixingAble=function(drawableID,able){
    const drawable=this._allDrawables[drawableID];
    this.ClearClip(drawableID,false);
    if(!drawable)return;
    return drawable.MixingAble=able;
  }
  renderer.updateDrawMixingAble=function(drawableID,able){
    const drawable=this._allDrawables[drawableID];
    this.ClearClip(drawableID,false);
    if(!drawable)return;
    return drawable.MixingDrawAble=able;
  }
  renderer.getClipbox=function(drawableID){
    const drawable = this._allDrawables[drawableID];
    this.ClearClip(drawableID,false);
    if(!drawable)return;
    return drawable.clipbox;
  }
  renderer.updateTriangleClip=function(drawableID,clip){
    const drawable=this._allDrawables[drawableID];
    this.ClearClip(drawableID,false);
    if(!drawable)return;
    return drawable.triangleClip=clip;
  }
  renderer.updateFTriangleClip=function(drawableID,clip){
    const drawable=this._allDrawables[drawableID];
    this.ClearClip(drawableID,false);
    if(!drawable)return;
    return drawable._triangleClip=clip;
    
  }
  renderer.ClearClip=function(drawableID,able){
    const drawable=this._allDrawables[drawableID];
    if(!drawable)return;
    return drawable.ClearClip=able;
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
  function ShaderIsBackGround(able){
    SBG=able;
  }
  function bindFramebufferInfo(gl, framebufferInfo, target) {
      target = target || gl.FRAMEBUFFER;
      var nativeBindFramebuffer = WebGLRenderingContext.prototype.bindFramebuffer;
      nativeBindFramebuffer.call(gl, target,  framebufferInfo ? framebufferInfo.framebuffer : null);
  }
  function createFramebuffer(gl, attachments, width, height, target) {
      target = target || gl.FRAMEBUFFER;
      const framebuffer = gl.createFramebuffer();
      gl.bindFramebuffer(target, framebuffer);
      attachments.forEach(function(attachment) {
        gl.framebufferTexture2D(
            target, attachment.attachment, attachment.texTarget, attachment.texture, attachment.level);
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

  function initShader(){
    var programs = {
      none: null,
      glitch: null,
      dispersion: null,
      gray: null,
      reverse: null,
      pointillism: null,
      cliping: null,
      screensplit: null,
      mask:null,
      helleffectshader:null
    };
    programs.none = createProgram(gl,createshader(gl,gl.VERTEX_SHADER,vertexShaderCode),createshader(gl,gl.FRAGMENT_SHADER,noneShaderCode));
    programs.glitch = createProgram(gl,createshader(gl,gl.VERTEX_SHADER,vertexShaderCode),createshader(gl,gl.FRAGMENT_SHADER,GlitchShaderCode));
    programs.dispersion = createProgram(gl,createshader(gl,gl.VERTEX_SHADER,vertexShaderCode),createshader(gl,gl.FRAGMENT_SHADER,dispersionShaderCode));
    programs.gray = createProgram(gl,createshader(gl,gl.VERTEX_SHADER,vertexShaderCode),createshader(gl,gl.FRAGMENT_SHADER,GrayShaderCode));
    programs.reverse = createProgram(gl,createshader(gl,gl.VERTEX_SHADER,vertexShaderCode),createshader(gl,gl.FRAGMENT_SHADER,ReverseShaderCode));
    programs.pointillism = createProgram(gl,createshader(gl,gl.VERTEX_SHADER,vertexShaderCode),createshader(gl,gl.FRAGMENT_SHADER,PointillismShaderCode));
    programs.cliping = createProgram(gl,createshader(gl,gl.VERTEX_SHADER,vertexShaderCode),createshader(gl,gl.FRAGMENT_SHADER,clipShaderCode));
    programs.screensplit = createProgram(gl,createshader(gl,gl.VERTEX_SHADER,vertexShaderCode),createshader(gl,gl.FRAGMENT_SHADER,screensplitShaderCode));
    programs.helleffectshader = createProgram(gl,createshader(gl,gl.VERTEX_SHADER,vertexShaderCode),createshader(gl,gl.FRAGMENT_SHADER,HellShaderCode));
    return programs;
  }
  function initShaderUniform(programs){
    gl.useProgram(programs.glitch);
    gl.uniform2fv( gl.getUniformLocation(programs.glitch,"_BlockSize"),[16,16]);
    gl.uniform1f( gl.getUniformLocation(programs.glitch, "_Amplitude"), 0.1);
    gl.uniform1f( gl.getUniformLocation(programs.glitch, "_Time"), 0);
    gl.uniform1i( gl.getUniformLocation(programs.glitch, "_Rgb"), 0);
    gl.uniform2fv( gl.getUniformLocation(programs.glitch,"u_pos1"),[0,0]);
    gl.uniform2fv( gl.getUniformLocation(programs.glitch,"u_pos2"),[1,1]);
    gl.uniform2fv( gl.getUniformLocation(programs.glitch,"u_dir"),[1,1]);
    gl.useProgram(programs.pointillism);
    gl.uniform1f( gl.getUniformLocation(programs.pointillism, "u_size"), 0.0001);
    gl.uniform1f( gl.getUniformLocation(programs.pointillism, "u_threshold"), 0.7);
    gl.uniform2fv( gl.getUniformLocation(programs.pointillism, "u_resolution"), [gl.canvas.width, gl.canvas.height]);
    gl.useProgram(programs.dispersion);
    gl.uniform2fv( gl.getUniformLocation(programs.dispersion, "direction_r"), [1.0, 0.0]);
    gl.uniform2fv( gl.getUniformLocation(programs.dispersion, "direction_g"), [0.4, 1.0]);
    gl.uniform2fv( gl.getUniformLocation(programs.dispersion, "direction_b"), [-0.7, -0.3]);
    gl.uniform1f( gl.getUniformLocation(programs.dispersion, "_Amplitude"), 0.01);
    gl.useProgram(programs.gray);
    gl.uniform3fv(gl.getUniformLocation(programs.gray,"_color"),[255,255,255]);
    gl.useProgram(programs.cliping);
    gl.uniform2fv( gl.getUniformLocation(programs.cliping, "u_pos1"), [0,0]);
    gl.uniform2fv( gl.getUniformLocation(programs.cliping, "u_pos2"), [1,1]);
    gl.uniform2fv( gl.getUniformLocation(programs.cliping, "texs"), [gl.canvas.width,gl.canvas.height]);
    gl.uniform1f( gl.getUniformLocation(programs.cliping, "rot"), 0);
    gl.useProgram(programs.screensplit);
    gl.uniform2fv( gl.getUniformLocation(programs.screensplit, "offset"), [0,0]);
    gl.uniform2fv( gl.getUniformLocation(programs.screensplit, "split"), [1,1]);
    gl.useProgram(programs.helleffectshader);
    gl.uniform1i(gl.getUniformLocation(programs.helleffectshader,"eyes_alpha"),1);
    gl.uniform1i(gl.getUniformLocation(programs.helleffectshader,"timer"),0);
    //gl.useProgram(programs.mask);
    //gl.uniform1i(gl.getUniformLocation(programs.mask,"mask"),new Float32Array(16));
  }

  var uniformLocationBuffer = {};

    var drawframebuffer = null;
    var mixingdrawframebuffer = null;
    var framebuffersize = {
      Width: 0,
      Height: 0
    };
    var Mixingfbs={
      Width:0,
      Height:0
    }
    var framebuffertexture = null;
    var mixingframebuffertexture = null;
    var shaderPrograms = initShader();
    var drawprogram = shaderPrograms.none;
    var drawprogram_mode = "none";
    var bgprogram=shaderPrograms.none;
    var  positionLocation = gl.getAttribLocation(drawprogram, 'a_position');
    var  texcoordLocation = gl.getAttribLocation(drawprogram, 'a_texcoord');
    var textureLocation = gl.getUniformLocation(drawprogram, 'u_texture');
    initShaderUniform(shaderPrograms);
    gl.useProgram(drawprogram);
    gl.uniform1i(textureLocation, framebuffertexture);

  const GS=renderer._shaderManager.getShader;
  //check framebuffer & buffer status
  const rendererDrawPrefix = (function(){
    if (framebuffertexture == null ){
      framebuffertexture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, framebuffertexture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.canvas.width, gl.canvas.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.bindTexture(gl.TEXTURE_2D, null);
      framebuffersize.Width = gl.canvas.width;
      framebuffersize.Height = gl.canvas.height;
    }
    if (framebuffersize.Height != gl.canvas.height || framebuffersize.Width != gl.canvas.width){
      updateFrameBuffer(gl.canvas.width,gl.canvas.height);
      framebuffersize.Width = gl.canvas.width;
      framebuffersize.Height = gl.canvas.height;
    }
    if (quadTexCoordBuffer == null){
      quadTexCoordBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, quadTexCoordBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(quadCoords), gl.STATIC_DRAW);
    }
    if (quadPositionBuffer == null){
        quadPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, quadPositionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(quadPositions), gl.STATIC_DRAW);
    }
    if (drawframebuffer == null) {
      drawframebuffer = createFramebuffer(gl,
        [
          {
            attachment: gl.COLOR_ATTACHMENT0,
            texTarget: gl.TEXTURE_2D,
            texture: framebuffertexture,
            level: 0
          }
        ],
      canvas.width,
      canvas.height
      );
    }

  }).bind(renderer);
  //draw framebuffer texture in screen
  const rendererDrawPostfix = (function(){
        timeUniform();
        bindFramebufferInfo(gl, null); //modified
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        gl.clearColor(...this._backgroundColor4f);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.bindTexture(gl.TEXTURE_2D, framebuffertexture);
        positionLocation = gl.getAttribLocation(drawprogram, 'a_position');
        texcoordLocation = gl.getAttribLocation(drawprogram, 'a_texcoord');
        textureLocation = gl.getUniformLocation(drawprogram, 'u_texture');
        gl.useProgram(drawprogram);
        gl.uniform1i(textureLocation, framebuffertexture);


        gl.bindBuffer(gl.ARRAY_BUFFER, quadPositionBuffer);
        gl.enableVertexAttribArray(positionLocation);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, quadTexCoordBuffer);
        gl.enableVertexAttribArray(texcoordLocation);
        gl.vertexAttribPointer(texcoordLocation, 2, gl.FLOAT, false, 0, 0);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
  }).bind(renderer);
  const rendererDrawBGPostfix = (function(){
    timeUniform();
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(...this._backgroundColor4f);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.bindTexture(gl.TEXTURE_2D, framebuffertexture);
    positionLocation = gl.getAttribLocation(drawprogram, 'a_position');
    texcoordLocation = gl.getAttribLocation(drawprogram, 'a_texcoord');
    textureLocation = gl.getUniformLocation(drawprogram, 'u_texture');
    gl.useProgram(bgprogram);
    gl.uniform1i(textureLocation, framebuffertexture);

    gl.bindBuffer(gl.ARRAY_BUFFER, quadPositionBuffer);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, quadTexCoordBuffer);
    gl.enableVertexAttribArray(texcoordLocation);
    gl.vertexAttribPointer(texcoordLocation, 2, gl.FLOAT, false, 0, 0);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
}).bind(renderer);
  function GetRuntime(){
    return runtime;
  }   
  //const ShaderManager=renderer._shaderManager
  //console.log(ShaderManager);
  renderer._shaderManager._buildShader=(function (drawMode, effectBits) {
    const ShaderManager=SM;
    const numEffects = ShaderManager.EFFECTS.length;

    const defines = [
        `#define DRAW_MODE_${drawMode}`
    ];
    for (let index = 0; index < numEffects; ++index) {
        if ((effectBits & (1 << index)) !== 0) {
            defines.push(`#define ENABLE_${ShaderManager.EFFECTS[index]}`);
        }
    }

    const definesText = `${defines.join('\n')}\n`;

    const vsFullText = definesText + vert;
    const fsFullText = definesText + frag;

    return twgl.createProgramInfo(this._gl, [vsFullText, fsFullText]);
  });
  const psp=renderer.penStamp;
  renderer.penStamp=function(skinID,stampID){
    return psp.call(this,skinID,stampID);
  }
  renderer._shaderManager._shaderCache['default'][0]=renderer._shaderManager._buildShader('default',0);//重建默认shader
    const _drawThese=(function(drawables, drawMode, projection, opts = {}){
      //const twgl=renderer.exports.twgl;
      
      const gl = this._gl;
      const runtime=GetRuntime();
      let currentShader = null;
      const framebufferSpaceScaleDiffers = (
          'framebufferWidth' in opts && 'framebufferHeight' in opts &&
          opts.framebufferWidth !== this._nativeSize[0] && opts.framebufferHeight !== this._nativeSize[1]
      );
      const numDrawables = drawables.length;
      for (let drawableIndex = 0; drawableIndex < numDrawables; ++drawableIndex) {
          const drawableID = drawables[drawableIndex];
          if (opts.filter && !opts.filter(drawableID)) continue;
          const drawable = this._allDrawables[drawableID];
          if (!drawable.getVisible() && !opts.ignoreVisibility) continue;

          if (opts.skipPrivateSkins && drawable.skin.private) continue;

          const drawableScale = framebufferSpaceScaleDiffers ? [
              drawable.scale[0] * opts.framebufferWidth / this._nativeSize[0],
              drawable.scale[1] * opts.framebufferHeight / this._nativeSize[1]
          ] : drawable.scale;

          if (!drawable.skin || !drawable.skin.getTexture(drawableScale)) continue;

          const uniforms = {};

          let effectBits = drawable.enabledEffects;
          effectBits &= Object.prototype.hasOwnProperty.call(opts, 'effectMask') ? opts.effectMask : effectBits;
          const newShader=this._shaderManager.getShader(drawMode, effectBits);
          // loop.
          if (this._regionId !== newShader) {
              this._doExitDrawRegion();
              this._regionId = newShader;
              currentShader = newShader;
              gl.useProgram(currentShader.program);
              twgl.setBuffersAndAttributes(gl, currentShader, this._bufferInfo);
              Object.assign(uniforms, {
                  u_projectionMatrix: projection
              });
          }

          Object.assign(uniforms,
              drawable.skin.getUniforms(drawableScale),
              drawable.getUniforms());

          if (opts.extraUniforms) {
              Object.assign(uniforms, opts.extraUniforms);
          }

          if (uniforms.u_skin) {
              twgl.setTextureParameters(
                  gl, uniforms.u_skin, {
                      minMag: drawable.skin.useNearest(drawableScale, drawable) ? gl.NEAREST : gl.LINEAR
                  }
              );
          }
          var clipping_box=drawable.clipbox;
          if(clipping_box==undefined){
            drawable.clipbox={
              x1:-gl.canvas.width/2,
              y1:-gl.canvas.height/2,
              x2:gl.canvas.width/2,
              y2:gl.canvas.height/2,
              rot:0
            }
          }
          var clipping_box=drawable.clipbox;
          Object.assign(uniforms,
            {
              u_pos1:[clipping_box.x1,clipping_box.y1],
              u_pos2:[clipping_box.x2,clipping_box.y2],
              rot:clipping_box.rot
            }
          )
          var clipping_box=drawable._clipbox;
          if(clipping_box==undefined){
            drawable._clipbox={
              x1:0,
              y1:0,
              x2:0,
              y2:0,
              rot:0
            }
          }
          var clipping_box=drawable._clipbox;
          Object.assign(uniforms,
            {
              _pos1:[clipping_box.x1,clipping_box.y1],
              _pos2:[clipping_box.x2,clipping_box.y2],
              _rot:clipping_box.rot
            }
          )

          if(drawable.triangleClip){
            Object.assign(uniforms,
              {
                p_pos0:[drawable.triangleClip.x1,drawable.triangleClip.y1],
                p_pos1:[drawable.triangleClip.x2,drawable.triangleClip.y2],
                p_pos2:[drawable.triangleClip.x3,drawable.triangleClip.y3]
              }
            )
          }else{
            Object.assign(uniforms,
              {
                p_pos0:[0,0],
                p_pos1:[0,0],
                p_pos2:[0,0]
              }
            )
          }
          if(drawable._triangleClip){
            Object.assign(uniforms,
              {
                _p_pos0:[drawable._triangleClip.x1,drawable._triangleClip.y1],
                _p_pos1:[drawable._triangleClip.x2,drawable._triangleClip.y2],
                _p_pos2:[drawable._triangleClip.x3,drawable._triangleClip.y3],
                FTCAble:true
              }
            )
          }else{
            Object.assign(uniforms,
              {
                _p_pos0:[0,0],
                _p_pos1:[0,0],
                _p_pos2:[0,0],
                FTCAble:false
              }
            )
          }

          Object.assign(uniforms,
            {
              texwh:[drawable._skinScale[0],drawable._skinScale[1]]
            }
          )
          Object.assign(uniforms,
            {
              spriteXY:[drawable._position[0],drawable._position[1]]
            }  
          )
          Object.assign(uniforms,
            {
              skinCentrePoint:drawable.skin.calculateRotationCenter()
            }  
          )
          if(drawable.MixingAble){
            Object.assign(uniforms,
              {
                MixingAble:1.0
              }
            )
          }else{
            Object.assign(uniforms,
              {
                MixingAble:0.0
              }
            )
          }
          Object.assign(uniforms,
            {
              Mixing_tex:mixingframebuffertexture
            }
          )
          Object.assign(uniforms,
            {
              Mixingtexs:[gl.canvas.width,gl.canvas.height]
            }
          )
          if(!drawable.TriangleClipAble){
            drawable.TriangleClipAble=false;
          }
          if(!drawable.ClipBoxAble){
            drawable.ClipBoxAble=false;
          }
          if(!drawable.ClearClip){
            drawable.ClearClip=false;
          }
          Object.assign(uniforms,
            {
              T_clip:drawable.triangleClip==undefined||drawable.ClearClip ? false : drawable.TriangleClipAble
            }
          )
          Object.assign(uniforms,
            {
              ClipBoxAble:drawable.ClearClip ? false : drawable.ClipBoxAble
            }
          )
          
          Object.assign(uniforms,
            {
              Mixing_tex:mixingframebuffertexture
            }
          )
          if(!drawable.MixingDrawAble){
            drawable.MixingDrawAble=0;
          }
          twgl.setUniforms(currentShader, uniforms);
          twgl.drawBufferInfo(gl, this._bufferInfo, gl.TRIANGLES);
      }
      
      this._regionId = null;

    }).bind(renderer);
  function rendererDrawMixingPreFix(){
    if (mixingframebuffertexture == null ){
      mixingframebuffertexture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, mixingframebuffertexture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.canvas.width, gl.canvas.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.bindTexture(gl.TEXTURE_2D, null);
    }
    if (Mixingfbs.Height != gl.canvas.height || Mixingfbs.Width != gl.canvas.width){
      updateFrameBuffer(gl.canvas.width,gl.canvas.height);
    }
    if (quadTexCoordBuffer == null){
      quadTexCoordBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, quadTexCoordBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(quadCoords), gl.STATIC_DRAW);
    }
    if (quadPositionBuffer == null){
        quadPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, quadPositionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(quadPositions), gl.STATIC_DRAW);
    }
    if (mixingdrawframebuffer == null) {
      mixingdrawframebuffer = createFramebuffer(gl,
        [
          {
            attachment: gl.COLOR_ATTACHMENT0,
            texTarget: gl.TEXTURE_2D,
            texture: mixingframebuffertexture,
            level: 0
          }
        ],
      canvas.width,
      canvas.height
      );
    }
  }
  renderer._drawThese=_drawThese;
  const draw = (function(){
        if (!this.dirty) {
            return;
        }
        this.dirty = false;
        rendererDrawMixingPreFix();

        bindFramebufferInfo(gl,mixingdrawframebuffer);

        this._doExitDrawRegion();
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        gl.clearColor(...this._backgroundColor4f);
        gl.clear(gl.DEPTH_BUFFER_BIT);
        var drawables=this._drawList;
        for(let i=0;i<drawables.length;++i){
          var ID=drawables[i];
          var drawable=this._allDrawables[ID];
          if(drawable.MixingDrawAble){
            renderer._drawThese_([ID], 'default', this._projection, {
              framebufferWidth: gl.canvas.width,
              framebufferHeight: gl.canvas.height
            });
          }
        }
        if (this._snapshotCallbacks.length > 0) {
          const snapshot = gl.canvas.toDataURL();
          this._snapshotCallbacks.forEach(cb => cb(snapshot));
          this._snapshotCallbacks = [];
        }


        bindFramebufferInfo(gl,null);

        rendererDrawPrefix(); //append

        bindFramebufferInfo(gl, drawframebuffer); //modified
        
        this._doExitDrawRegion();
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        rendererDrawBGPostfix();
        this._drawThese(this._drawList, 'default', this._projection, { // draw the sprite to framebuffer
            framebufferWidth: gl.canvas.width,
            framebufferHeight: gl.canvas.height
        });
        if (this._snapshotCallbacks.length > 0) {
            const snapshot = gl.canvas.toDataURL();
            this._snapshotCallbacks.forEach(cb => cb(snapshot));
            this._snapshotCallbacks = [];
        }
        rendererDrawPostfix(); //append

    }).bind(renderer);

  renderer.draw = draw;
  vm.runtime.on("PROJECT_LOADED",_ => {
rendererDrawPrefix();
});
const regTargetStuff = function (args) {
  if (args.editingTarget) {
    vm.removeListener('targetsUpdate', regTargetStuff);
    const proto = vm.runtime.targets[0].__proto__;
    const osa = proto.onStopAll;
    proto.onStopAll = function () {
      this.renderer.updateDrawableClipbox.call(renderer, this.drawableID, null);
      this.renderer.updateFDrawableClipbox.call(renderer, this.drawableID, null);
      this.renderer._allDrawables[this.drawableID].triangleClip=null;
      this.renderer._allDrawables[this.drawableID]._triangleClip=null;
      osa.call(this);
    };
    const mc = proto.makeClone;
    proto.makeClone = function () {
      const newTarget = mc.call(this);
      if (this.clipbox) {
        newTarget.clipbox = Object.assign({}, this.clipbox);
        renderer.updateDrawableClipbox.call(renderer, newTarget.drawableID, this.clipbox);
      }
      if(this._clipbox){
        renderer.updateFDrawableClipbox.call(renderer, newTarget.drawableID, this._clipbox);
        newTarget._clipbox = Object.assign({}, this._clipbox);
      }
      if(this.triangleClip){
        newTarget.triangleClip = Object.assign({}, this.triangleClip);
        renderer.updateDrawableClipbox.call(renderer, newTarget.drawableID, this.triangleClip);
      }
      if(this._triangleClip){
        newTarget._triangleClip = Object.assign({}, this._triangleClip);
        renderer.updateFDrawableClipbox.call(renderer, newTarget.drawableID, this._triangleClip);
      } 
      return newTarget;
    };
  }
};
vm.on('targetsUpdate', regTargetStuff);
  //resize framebuffer when stage size changed
  vm.runtime.on('STAGE_SIZE_CHANGED',_ => updateFrameBuffer());
  function updateFrameBuffer(){
    if (framebuffertexture != null){
      console.log('STAGE_SIZE_CHANGED. resize the post-process framebuffer.');
      gl.bindTexture(gl.TEXTURE_2D, framebuffertexture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.canvas.width, gl.canvas.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
      if (drawprogram_mode ==  "pointillism"){
        setUniform2fv(gl,"u_resolution", gl.canvas.width, gl.canvas.height);
      }
    }
    if(mixingframebuffertexture!=null){
      gl.bindTexture(gl.TEXTURE_2D,mixingframebuffertexture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.canvas.width, gl.canvas.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
      if (drawprogram_mode ==  "pointillism"){
        setUniform2fv(gl,"u_resolution", gl.canvas.width, gl.canvas.height);
      }
    }
  }
  vm.runtime.on('PROJECT_RUN_START',_ => {
    positionLocation = gl.getAttribLocation(drawprogram, 'a_position');
    texcoordLocation = gl.getAttribLocation(drawprogram, 'a_texcoord');
    textureLocation = gl.getUniformLocation(drawprogram, 'u_texture');
  });

  function timeUniform(){

    switch (drawprogram_mode){
      case "glitch":
        gl.useProgram(drawprogram);
        setUniform1f(gl,"_Time", Math.random());
    }
  }
  class postprocessing {
    getInfo() {
      return {
        id: 'postprocessing',
        name: 'Post-Processing',
        blocks: [
          {
            opcode: 'opcodeChangePostProcess',
            text: 'change effect to [Menu]',
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              Menu: {
                type: Scratch.ArgumentType.STRING,
                menu: 'PostProcess'
              },
            },
          },
          {

            opcode: 'opcodeChangeGlitch',
            text: 'Glitch Amplitude:[Amplitude]%,',
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              Amplitude: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1
              }
            },
          },
          {
            opcode: 'opcodeChangeDispersion',
            text: 'Dispersion Amplitude:[Amplitude]%',
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              Amplitude: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1
              }
            },
          },
          {
            opcode: 'opcodeChangeGray',
            text: 'Gray Color:[COLOR]',
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              COLOR: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#FFFFFF"
              }

            },
          },
          {
            opcode: 'opcodeChangePointillism',
            text: 'Pointillism Threshold:[threshold]%',
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              threshold: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 70
              }

            },
          },
          {
            opcode: 'opcodeChangeScreensplit',
            text: 'Screensplit x:[split_x] y:[split_y]',
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              split_x: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1
              },
              split_y: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1
              }

            },
          },
          {
            opcode: 'opcodeChangeCliping',
            text: 'Clip Start: X:[x1],Y:[y1] To: X:[x2],Y:[y2] ROT[rot]',
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              x1: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
              },
              y1: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
              },
              x2: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1
              },
              y2: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1
              },
              rot: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
              }

            },
            filter: [Scratch.TargetType.SPRITE]
          },
          {
            opcode: 'opcodeClippingSelf',
            text: '设置裁剪(非全屏)x1:[X0],y1:[Y0],x2:[X1],y2:[Y1],rot:[ROT]',
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              X0: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
              },
              Y0: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
              },
              X1: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 100
              },
              Y1: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 100
              },
              ROT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
              }
            },
            //filter: [Scratch.TargetType.SPRITE]
            hideFromPalette: false
          },
          {
            opcode: 'opcodeFClippingSelf',
            text: '设置反向裁剪(非全屏)x1:[X0],y1:[Y0],x2:[X1],y2:[Y1],rot:[ROT]',
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              X0: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
              },
              Y0: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
              },
              X1: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 100
              },
              Y1: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 100
              },
              ROT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
              }
            },
            //filter: [Scratch.TargetType.SPRITE]
            hideFromPalette: false
          },
          {
            opcode: 'opcodeTriangleClip',
            text: '设置三角形裁剪x1:[X0],y1:[Y0],x2:[X1],y2:[Y1],x3:[X2],y3:[Y2]',
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              X0: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
              },
              Y0: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
              },
              X1: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 100
              },
              Y1: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
              },
              X2: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
              },
              Y2: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 100
              },
            },
            //filter: [Scratch.TargetType.SPRITE]
            //hideFromPalette: false
          },
          {
            opcode: 'opcodeFTriangleClip',
            text: '设置反向三角形裁剪x1:[X0],y1:[Y0],x2:[X1],y2:[Y1],x3:[X2],y3:[Y2]',
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              X0: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
              },
              Y0: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
              },
              X1: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 100
              },
              Y1: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
              },
              X2: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
              },
              Y2: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 100
              },
            },
            //filter: [Scratch.TargetType.SPRITE]
            //hideFromPalette: false
          },
          {
            opcode: 'opcodeTriangleClipAble',
            text: '启用/关闭 三角形裁剪',
            blockType: Scratch.BlockType.COMMAND,
            //filter: [Scratch.TargetType.SPRITE]
            hideFromPalette: false
          },
          {
            opcode: 'opcodeClipBoxAble',
            text: '启用/关闭 矩形裁剪',
            blockType: Scratch.BlockType.COMMAND,
            //filter: [Scratch.TargetType.SPRITE]
            hideFromPalette: false
          },
          {
            opcode: 'opcodeClearClip',
            text: '清除所有裁剪',
            blockType: Scratch.BlockType.COMMAND,
            //filter: [Scratch.TargetType.SPRITE]
            hideFromPalette: false
          },
          {
            opcode: 'opcodeSetDrawMixingAble',
            text: '此sprite是否参与作为混合贴图绘制:[able]',
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              able: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
              }
            },
            //filter: [Scratch.TargetType.SPRITE]
            hideFromPalette: true
          },
          {
            opcode: 'opcodeSetMixingAble',
            text: '此sprite是否参与混合:[able]',
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              able: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
              }
            },
            //filter: [Scratch.TargetType.SPRITE]
            hideFromPalette: true
          },
          {
            opcode: 'opcodeGetClipBoxAble',
            text: '是否开启了矩形裁剪',
            blockType: Scratch.BlockType.REPORTER,
          },
          {
            opcode: 'opcodeGetTClipAble',
            text: '是否开启了三角形裁剪',
            blockType: Scratch.BlockType.REPORTER,
          },
        {
          opcode: 'opcodeRequestReDraw',
          text: 'redraw post-process',
          blockType: Scratch.BlockType.COMMAND,
          arguments: {}
        },
        {
          opcode: 'opcodeGetPostProcess',
          text: 'Post-Process Mode',
          blockType: Scratch.BlockType.REPORTER,
          arguments: {}
        },
        
        {
          opcode: 'opcodeUniform2fv',
          text: 'uniform2fv Name:[NAME] Value:[X] [Y]',
          blockType: Scratch.BlockType.COMMAND,
          arguments: {
            NAME: {
              type: Scratch.ArgumentType.STRING,
              menu: "v2_uniforms"
            },
            X: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 8
            },
            Y: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 8
          },
        },
        hideFromPalette: false
        },
        //THEY BLOCKS WAS VERY DANGEROUS, SHOULDN'T BE USED BY NORMAL USERS. JUST FOR THE PRO.
        {
          opcode: 'opcodeUniform1f',
          text: 'uniform1f Name:[NAME] Value:[X]',
          blockType: Scratch.BlockType.COMMAND,
          arguments: {
            NAME: {
              type: Scratch.ArgumentType.STRING,
              menu: "v1_uniforms"
            },
            X: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
            }
          },
          hideFromPalette: false
        },
        {
          opcode: 'opcodeReplaceShader',
          text: 'post-process VS:[VS] FS:[FS]',
          blockType: Scratch.BlockType.COMMAND,
          arguments: {
            VS: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: "attribute vec4 a_position;attribute vec2 a_texcoord;varying vec2 v_texcoord;void main() {gl_Position = vec4(a_position.x, a_position.y, a_position.z, 1);v_texcoord = a_texcoord;}"
            },
            FS: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: "varying vec2 v_texcoord;varying vec4 vColor;uniform sampler2D u_texture;void main() {gl_FragColor=texture2D(u_texture,v_texcoord);}"
            }
          },
          hideFromPalette: true
        },
        
        ],
        menus: {
          PostProcess: {
            acceptReporters: true,
            items: [
              "glitch",
              "dispersion",
              "gray",
              "reverse",
              "pointillism",
              "cliping",
              "screensplit",
              "helleffectshader",
              "none",
            ]
          },
          v1_uniforms:{
            acceptReporters:true,
            items:[
              "_Amplitude",
              "_Time",
              "u_size",
              "_Rgb",
              "timer",
              "eyes_alpha"
            ]
          },
          v2_uniforms:{
            acceptReporters:true,
            items:[
              "_BlockSize",
              "direction_r",
              "direction_g",
              "direction_b",
              "offset",
              "split",
            ]
          }
        }
      };
    }
    opcodeGetClipBoxAble(args,{target}){
      return renderer._allDrawables[target.drawableID].ClipBoxAble;
    }
    opcodeGetTClipAble(args,{target}){
      return renderer._allDrawables[target.drawableID].TriangleClipAble;
    }
    opcodeChangePostProcess({Menu}) {
        if (Menu == "glitch"){
          drawprogram = shaderPrograms.glitch;
        }
        if (Menu ==  "none"){
          drawprogram = shaderPrograms.none;
          bgprogram=shaderPrograms.none;
        }
        if (Menu ==  "gray"){
          drawprogram = shaderPrograms.gray;
        }
        if (Menu ==  "reverse"){
          drawprogram = shaderPrograms.reverse;
        }

        if (Menu ==  "dispersion"){
          drawprogram = shaderPrograms.dispersion;
        }
        if (Menu ==  "pointillism"){
          drawprogram = shaderPrograms.pointillism;
        }
        if (Menu == "cliping"){
          drawprogram = shaderPrograms.cliping;
        }
        if (Menu == "screensplit"){
          drawprogram = shaderPrograms.screensplit;
        }
        if (Menu == "helleffectshader"){
          bgprogram = shaderPrograms.helleffectshader;
        }
      vm.runtime.requestRedraw();
      vm.renderer.dirty = true;
      drawprogram_mode = Menu;
      uniformLocationBuffer = {};
      if (gl.isProgram(drawprogram) == false){
        console.error('postprocess program not is valid.');
      }
      positionLocation = gl.getAttribLocation(drawprogram, 'a_position');
      texcoordLocation = gl.getAttribLocation(drawprogram, 'a_texcoord');
      textureLocation = gl.getUniformLocation(drawprogram, 'u_texture');
    }
    opcodeChangeDispersion({Amplitude}){
      if (drawprogram_mode != "dispersion" ){
        console.log("post-process mode not dispersion, change to it.");
        this.opcodeChangePostProcess({Menu: "dispersion"});
      }
      setUniform1f(gl,"_Amplitude", Amplitude / 100.0);
      vm.renderer.dirty = true;
    }
    opcodeClearClip(args,{target}){
      renderer.ClearClip(target.drawableID,true);
      vm.renderer.dirty = true;
      vm.runtime.requestRedraw();
    }
    opcodeTriangleClip({X0,Y0,X1,Y1,X2,Y2},{target}){
      const triangleClip={
        x1:X0,
        y1:Y0,
        x2:X1,
        y2:Y1,
        x3:X2,
        y3:Y2
      }
      renderer.updateTriangleClip(target.drawableID,triangleClip);
      //renderer._allDrawables[target.drawableID].ClipBoxAble=false;
      vm.renderer.dirty = true;
      vm.runtime.requestRedraw();
    }
    opcodeFTriangleClip({X0,Y0,X1,Y1,X2,Y2},{target}){
      const _triangleClip={
        x1:X0,
        y1:Y0,
        x2:X1,
        y2:Y1,
        x3:X2,
        y3:Y2
      }
      renderer.updateFTriangleClip(target.drawableID,_triangleClip);
      //renderer._allDrawables[target.drawableID].ClipBoxAble=false;
      vm.renderer.dirty = true;
      vm.runtime.requestRedraw();
    }
    opcodeTriangleClipAble(args,{target}){
      if(renderer._allDrawables[target.drawableID].TriangleClipAble){
        renderer._allDrawables[target.drawableID].TriangleClipAble=false;
      }else{
        renderer._allDrawables[target.drawableID].TriangleClipAble=true;
      }
      vm.renderer.dirty = true;
      vm.runtime.requestRedraw();
    }
    opcodeChangeGlitch({Amplitude}){
      if (drawprogram_mode != "glitch" ){
        console.log("post-process mode not glitch, change to it.");
        this.opcodeChangePostProcess({Menu: "glitch"});
      }
      setUniform1f(gl,"_Amplitude", Scratch.Cast.toNumber(Amplitude) / 100.0);
      vm.renderer.dirty = true;
    }
    opcodeChangeGray({COLOR}){
      if (drawprogram_mode != "gray" ){
        console.log("post-process mode not gray, change to it.");
        this.opcodeChangePostProcess({Menu: "gray"});
      }
      var location =  gl.getUniformLocation(shaderPrograms.gray, '_color');
      gl.useProgram(shaderPrograms.gray);
      gl.uniform3fv(location, Scratch.Cast.toRgbColorList(COLOR));
      vm.renderer.dirty = true;
    }
    opcodeChangePointillism({threshold}){
      if (drawprogram_mode != "pointillism" ){
        console.log("post-process mode not pointillism, change to it.");
        this.opcodeChangePostProcess({Menu: "pointillism"});
      }
      setUniform1f(gl,"u_threshold", Scratch.Cast.toNumber(threshold) / 100.0);
      vm.renderer.dirty = true;
    }
    opcodeChangeScreensplit({split_x,split_y}){
      if (drawprogram_mode != "screensplit" ){
        console.log("post-process mode not screensplit, change to it.");
        this.opcodeChangePostProcess({Menu: "screensplit"});
      }
      setUniform2fv(gl,"split", Scratch.Cast.toNumber(split_x),Scratch.Cast.toNumber(split_y));
      vm.renderer.dirty = true;
    }
    opcodeChangeCliping({x1,y1,x2,y2,rot},{target}){
      if (drawprogram_mode != "cliping" ){
        console.log("post-process mode not cliping, change to it.");
        this.opcodeChangePostProcess({Menu: "cliping"},{target});
      }
      setUniform2fv(gl,"u_pos1",x1,y1 );
      setUniform2fv(gl,"u_pos2",x2,y2);
      setUniform1f(gl,"rot",rot);
      setUniform2fv(gl,"texs",framebuffersize);
      spritetarget=target;
      vm.renderer.dirty = true;
    }
    opcodeClippingSelf({X0,Y0,X1,Y1,ROT},{target}){
      spritetarget=target;
      vm.renderer.dirty = true;
      const newclipbox={
        x1:X0,
        y1:Y0,
        x2:X1,
        y2:Y1,
        rot:ROT
      }
      renderer.updateDrawableClipbox.call(renderer,target.drawableID,newclipbox);
      //renderer._allDrawables[target.drawableID].TriangleClipAble=false;
      /*if(target.visible){
        target.emitVisualChange();
      }*/
      vm.renderer.dirty = true;
      vm.runtime.requestRedraw();
    }
    opcodeClipBoxAble(args,{target}){
      if(renderer._allDrawables[target.drawableID].ClipBoxAble){
        renderer._allDrawables[target.drawableID].ClipBoxAble=false;
      }else{
        renderer._allDrawables[target.drawableID].ClipBoxAble=true;
      }
      vm.renderer.dirty = true;
      vm.runtime.requestRedraw();
    }
    opcodeSetMixingAble({able},{target}){
      spritetarget=target;
      vm.renderer.dirty=true;
      renderer.updateMixingAble.call(renderer,target.drawableID,Scratch.Cast.toNumber(able));
      vm.renderer.dirty = true;
      vm.runtime.requestRedraw();
    }
    opcodeSetDrawMixingAble({able},{target}){
      spritetarget=target;
      vm.renderer.dirty=true;
      renderer.updateDrawMixingAble.call(renderer,target.drawableID,Scratch.Cast.toNumber(able));
      vm.renderer.dirty = true;
      vm.runtime.requestRedraw();
    }
    opcodeFClippingSelf({X0,Y0,X1,Y1,ROT},{target}){
      spritetarget=target;
      vm.renderer.dirty = true;
      const newclipbox={
        x1:X0,
        y1:Y0,
        x2:X1,
        y2:Y1,
        rot:ROT
      }
      renderer.updateFDrawableClipbox.call(renderer,target.drawableID,newclipbox);
      //renderer._allDrawables[target.drawableID].TriangleClipAble=false;
      /*if(target.visible){
        target.emitVisualChange();
      }*/
      vm.runtime.requestRedraw();
    }
    // not must. but it can make sure the post-process effect is correct (?)
    opcodeRequestReDraw(){
      vm.renderer.dirty = true;
      vm.runtime.requestRedraw();
      
    }
    opcodeGetPostProcess() {
      return drawprogram_mode;
    }
    //VERY DANGEROUS, SHOULDN'T BE USED BY NORMAL USERS. JUST FOR THE PRO.
    opcodeReplaceShader({VS,FS}) {
      drawprogram = createProgram(gl,VS,FS);
      if (gl.isProgram(drawprogram) == false){
        console.error('postprocess program not is valid.');
      }
      positionLocation = gl.getAttribLocation(drawprogram, 'a_position');
      texcoordLocation = gl.getAttribLocation(drawprogram, 'a_texcoord');
      textureLocation = gl.getUniformLocation(drawprogram, 'u_texture');
    drawprogram_mode = "custom";
    gl.uniform1i(textureLocation, framebuffertexture);
    vm.renderer.dirty = true;
  }
    opcodeUniform2fv({NAME,X,Y}) {
      setUniform2fv(gl,NAME,X,Y);
      vm.renderer.dirty = true;
    }
    opcodeUniform1f({NAME,X}) {
      setUniform1f(gl,NAME,X);
      vm.renderer.dirty = true;

    }
  }
  Scratch.extensions.register(new postprocessing());
})(Scratch);
