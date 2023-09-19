// Name: ScratchGL
// ID: scratchopengl
// Description: Impliments OpenGL into scratch
// By: AnthMP4

(function(Scratch) {
  'use strict';

  const vm = Scratch.vm;
  const runtime = vm.runtime;
  const canvas = runtime.renderer.canvas;
  const gl = runtime.renderer._gl
  gl.cullFace(gl.BACK)
  const glShaderPrograms = {}
  const glBuffers = {}

  const textures = {}

  const compileShader = (code, type) => {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, code);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error(gl.getShaderInfoLog(shader));
      throw new Error("Error compiling shader");
    }
    return shader;
  };

  const createProgram = (vertexShader, fragmentShader) => {
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      throw new Error("Error linking program");
    }
    gl.validateProgram(program);
    if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      throw new Error("Error validating program");
    }
    return program;
  };

  const makeLabel = (text) => ({
    blockType: "label",
    text: text,
  });

  function loadImageAndCreateTextureInfo(url, clamp, MIN_FILTER, MAG_FILTER) {
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);

    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      1,
      1,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      new Uint8Array([0, 0, 255, 255])
    );

    if (clamp) {
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    } else {
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    }
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, MIN_FILTER);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, MAG_FILTER);

    const textureInfo = {
      width: 1,
      height: 1,
      texture,
      MIN_FILTER : MIN_FILTER,
      MAG_FILTER : MAG_FILTER
    };

    Scratch.canFetch(url).then((allowed) => {
      if (!allowed) {
        return;
      }
      const image = new Image();
      image.onload = function () {
        textureInfo.width = image.width;
        textureInfo.height = image.height;

        gl.bindTexture(gl.TEXTURE_2D, textureInfo.texture);
        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          gl.RGBA,
          gl.RGBA,
          gl.UNSIGNED_BYTE,
          image
        );
      };
      image.crossOrigin = "anonymous";
      image.src = url;
    });

    return textureInfo;
  }

  function multiplyMatrix(a, b) {
    const dst = [];
    var b00 = b[0 * 4 + 0];
    var b01 = b[0 * 4 + 1];
    var b02 = b[0 * 4 + 2];
    var b03 = b[0 * 4 + 3];
    var b10 = b[1 * 4 + 0];
    var b11 = b[1 * 4 + 1];
    var b12 = b[1 * 4 + 2];
    var b13 = b[1 * 4 + 3];
    var b20 = b[2 * 4 + 0];
    var b21 = b[2 * 4 + 1];
    var b22 = b[2 * 4 + 2];
    var b23 = b[2 * 4 + 3];
    var b30 = b[3 * 4 + 0];
    var b31 = b[3 * 4 + 1];
    var b32 = b[3 * 4 + 2];
    var b33 = b[3 * 4 + 3];
    var a00 = a[0 * 4 + 0];
    var a01 = a[0 * 4 + 1];
    var a02 = a[0 * 4 + 2];
    var a03 = a[0 * 4 + 3];
    var a10 = a[1 * 4 + 0];
    var a11 = a[1 * 4 + 1];
    var a12 = a[1 * 4 + 2];
    var a13 = a[1 * 4 + 3];
    var a20 = a[2 * 4 + 0];
    var a21 = a[2 * 4 + 1];
    var a22 = a[2 * 4 + 2];
    var a23 = a[2 * 4 + 3];
    var a30 = a[3 * 4 + 0];
    var a31 = a[3 * 4 + 1];
    var a32 = a[3 * 4 + 2];
    var a33 = a[3 * 4 + 3];
    dst[0] = b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30;
    dst[1] = b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31;
    dst[2] = b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32;
    dst[3] = b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33;
    dst[4] = b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30;
    dst[5] = b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31;
    dst[6] = b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32;
    dst[7] = b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33;
    dst[8] = b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30;
    dst[9] = b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31;
    dst[10] = b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32;
    dst[11] = b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33;
    dst[12] = b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30;
    dst[13] = b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31;
    dst[14] = b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32;
    dst[15] = b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33;
    return dst;
  }

  function getspritecostume(util, c) {
    let target = util.target;
    let dataURI = target.sprite.costumes[c - 1].asset.encodeDataURI();
    return dataURI;
  }
  
  class ScratchOpenGL {
    getInfo () {
      return {
        id: 'scratchopengl',

        name: 'OpenGL',
  
        blocks: [
          makeLabel("Shader Blocks"),
          {
            opcode: 'createshaderprogram',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Create Shader Program and assign to: [Programname] | Vertex src: [Vertex] Fragment src: [Fragment]',
            arguments: {
              Programname: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'GLProgram'
              },
              Fragment: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: [
                  "precision mediump float;",
                  "void main() {",
                  "gl_FragColor = vec4(1,1,1,1);",
                  "}"
                ].join("\n")
              },
              Vertex: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: [
                  "precision mediump float;",
                  "void main() {",
                  "gl_Position = vec4(0,0,0,1);",
                  "}"
                ].join("\n")
              }
            }
          },
          {
            opcode: 'useshaderprogram',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Use shader program: [Programname]',
            arguments: {
              Programname: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'GLProgram'
              }
            }
          },
          "---",
          {
            opcode: 'getattriblocation',
            blockType: Scratch.BlockType.REPORTER,
            text: 'Get Attrib Location | Shader program name: [Programname] Attrib: [Attribname]',
            arguments: {
              Programname: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'GLProgram'
              },
              Attribname: {
                type: Scratch.ArgumentType.STRING
              }
            }
          },
          {
            opcode: 'enabledisablevertexattribarray',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Enable/Diable vertex attrib array | Location: [Location] Bool: [Bool]',
            arguments: {
              Location: {
                type: Scratch.ArgumentType.NUMBER
              },
              Bool: {
                type: Scratch.ArgumentType.BOOLEAN
              }
            }
          },
          {
            opcode: 'vertexattribpointer',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Vertex attrib pointer | Location: [Location] Size: [Size] Type: [Type] Normalized: [Normalized] Stride: [Stride] Offset: [Offset]',
            arguments: {
              Location: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
              },
              Size: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1
              },
              Type: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'FLOAT',
                menu: 'GLDataTypeArray'
              },
              Normalized: {
                type: Scratch.ArgumentType.BOOLEAN,
              },
              Stride: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
              },
              Offset: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
              }
            }
          },
          "---",
          {
            opcode: 'senduniformtoshader',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Send Uniform | Shader program name: [Programname] Uniform type: [Uniformtype] Uniform: [Uniformname] Value: [Value]',
            arguments: {
              Programname: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'GLProgram'
              },
              Uniformtype: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'uniform1f',
                menu: 'UniformType'
              },
              Uniformname: {
                type: Scratch.ArgumentType.STRING
              },
              Value: {
                type: Scratch.ArgumentType.STRING
              }
            }
          },
          {
            opcode: 'sendtexturetoshader',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Send texture to shader | Shader program name: [Programname] Texture type: [Texturetype] Uniform: [Uniformname] Unit: [Unit] Value: [Value] Min Filter: [MinFilter] Mag Filter: [MagFilter]',
            arguments: {
              Programname: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'GLProgram'
              },
              Texturetype: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'uniformTexture2D',
                menu: 'TextureType'
              },
              Uniformname: {
                type: Scratch.ArgumentType.STRING
              },
              Unit: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
              },
              Value: {
                type: Scratch.ArgumentType.STRING
              },
              MinFilter: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'NEAREST',
                menu: 'FilterType'
              },
              MagFilter: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'LINEAR',
                menu: 'FilterType'
              }
            }
          },
          makeLabel("Buffer Blocks"),
          {
            opcode: 'createbuffer',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Create buffer and assign to | Buffer name: [Buffername]',
            arguments: {
              Buffername: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'GLBuffer'
              }
            }
          },
          {
            opcode: 'bufferdata',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Buffer data: [Buffername] | Buffer target [Buffertarget] Buffer data [Bufferdata] Buffer usage [Bufferusage]',
            arguments: {
              Buffername: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'GLBuffer'
              },
              Buffertarget: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'ARRAY_BUFFER',
                menu: 'BufferTarget'
              },
              Bufferdata: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '0,0,0,0'
              },
              Bufferusage: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'STATIC_DRAW',
                menu: 'BufferUsage'
              }
            }
          },
          {
            opcode: 'bindbuffer',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Bind buffer | Buffer name: [Buffername] Buffer target: [Buffertarget]',
            arguments: {
              Buffername: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'GLBuffer'
              },
              Buffertarget: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'ARRAY_BUFFER',
                menu: 'BufferTarget'
              }
            }
          },
          makeLabel("Drawing Blocks"),
          {
            opcode: 'drawarrays',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Draw arrays | Mode: [Mode] First: [First] Count: [Count]',
            arguments: {
              Mode: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'TRIANGLES',
                menu: 'DrawMode'
              },
              First: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '0'
              },
              Count: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '0'
              }
            }
          },
          "---",
          {
            opcode: 'clearscreen',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Clear screen | New Colour: [ColorR] [ColorG] [ColorB] [ColorA]',
            arguments: {
              ColorR: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
              ColorG: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
              ColorB: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
              },
              ColorA: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
              }
            }
          },
          "---",
          {
            opcode: 'enabledisabledepthbuffer',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Enable/Disable depth buffer | Depth Mode: [Mode] Bool: [Bool]',
            arguments: {
              Mode: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'NEVER',
                menu: 'DepthMode'
              },
              Bool: {
                type: Scratch.ArgumentType.BOOLEAN
              }
            }
          },
          makeLabel("Matrix Blocks"),
          {
            opcode: 'makeperspective',
            blockType: Scratch.BlockType.REPORTER,
            text: 'Make Perspective matrix | FOV (Deg): [Fov] Aspect (W/H): [Aspect] NearPlane: [Near] FarPlane: [Far]',
            arguments: {
              Fov: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 45
              },
              Aspect: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1
              },
              Near: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0.1
              },
              Far: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 100
              }
            }
          },
          {
            opcode: 'makecamera',
            blockType: Scratch.BlockType.REPORTER,
            text: 'Make camera matrix | Camera Position: [Px] [Py] [Pz] Camera Rotation: [Rx] [Ry] [Rz]',
            arguments: {
              Px: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
              },
              Py: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
              },
              Pz: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
              },
              Rx: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
              },
              Ry: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
              },
              Rz: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
              }
            }
          },
          {
            opcode: 'makemodel',
            blockType: Scratch.BlockType.REPORTER,
            text: 'Make model matrix | Position: [Tx] [Ty] [Tz] Rotation: [Rx] [Ry] [Rz] Size: [Sx] [Sy] [Sz]',
            arguments: {
              Tx: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
              },
              Ty: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
              },
              Tz: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
              },
              Rx: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
              },
              Ry: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
              },
              Rz: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
              },
              Sx: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1
              },
              Sy: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1
              },
              Sz: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1
              },
            }
          },
          makeLabel("Cleanup Blocks"),
          {
            opcode: 'deleteshaderprograms',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Delete all shader programs'
          },
          {
            opcode: 'deletebuffers',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Delete all buffers'
          },
          makeLabel("Extra BLocks"),
          {
            opcode: 'newline',
            blockType: Scratch.BlockType.REPORTER,
            text: 'Newline',
            disableMonitor: true
          },
          {
            opcode: 'booleanblock',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '[Bool]',
            arguments: {
              Bool: {
                type: Scratch.ArgumentType.STRING,
                menu: 'Boolean',
                defaultValue: 'True'
              }
            }
          },
          {
            opcode: 'getcostumedata',
            blockType: Scratch.BlockType.REPORTER,
            text: 'Get costume uri | Costume: [Costume]',
            arguments: {
              Costume: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1
              }
            }
          }
        ],

        menus: {
          BufferTarget: {
            acceptReporters: false,
            items: ['ARRAY_BUFFER', 'ELEMENT_ARRAY_BUFFER']
          },
          BufferUsage: {
            acceptReporters: false,
            items: [
              'STATIC_DRAW',
              'DYNAMIC_DRAW',
              'STREAM_DRAW'
            ]
          },
          GLDataTypeArray: {
            acceptReporters: false,
            items: ['BYTE', 'SHORT', 'UNSIGNED_BYTE', 'UNSIGNED_SHORT', 'FLOAT']
          },
          Boolean: {
            acceptReporters: false,
            items: ['True', 'False']
          },
          UniformType: {
            acceptReporters: false,
            items: [
              'uniform1f',
              'uniform1fv',
              'uniform2f',
              'uniform2fv',
              'uniform3f',
              'uniform3fv',
              'uniform4f',
              'uniform4fv',

              'uniformMatrix2fv',
              'uniformMatrix3fv',
              'uniformMatrix4fv',

              'uniform1i',
              'uniform1iv',
              'uniform2i',
              'uniform2iv',
              'uniform3i',
              'uniform3iv',
              'uniform4i',
              'uniform4iv'
            ]
          },
          TextureType: {
            acceptReporters: false,
            items: [
              'uniformTexture2D'
            ]
          },
          DrawMode: {
            acceptReporters: false,
            items: ['POINTS', 'LINE_STRIP', 'LINE_LOOP', 'LINES', 'TRIANGLE_STRIP', 'TRIANGLE_FAN', 'TRIANGLES']
          },
          DepthMode: {
            acceptReporters: false,
            items: ['NEVER', 'LESS', 'EQUAL', 'LEQUAL', 'GREATER', 'NOTEQUAL', 'GEQUAL', 'ALWAYS']
          },
          FilterType: {
            acceptReporters: false,
            items: [
              'LINEAR',
              'NEAREST'
            ]
          }
        }

      };
    }

    // Shader Blocks
    createshaderprogram({Programname, Vertex, Fragment}) {
      const vertexShader = compileShader(Vertex, gl.VERTEX_SHADER);
      const fragmentShader = compileShader(Fragment, gl.FRAGMENT_SHADER);
      const program = createProgram(vertexShader, fragmentShader);
      glShaderPrograms[Programname] = program;
    }
    useshaderprogram({Programname}) {
      gl.useProgram(glShaderPrograms[Programname]);
    }
    getattriblocation({Programname, Attribname}) {
      return gl.getAttribLocation(glShaderPrograms[Programname], Attribname);
    }
    enabledisablevertexattribarray({Location, Bool}) {
      if(Bool) {
        gl.enableVertexAttribArray(Location);
      }
      else {
        gl.disableVertexAttribArray(Location)
      }
    }
    vertexattribpointer({Location, Size, Type, Normalized, Stride, Offset}) {
      gl.vertexAttribPointer(Location, Size, gl[Type], Normalized, Stride, Offset);
    }
    senduniformtoshader({Programname, Uniformtype, Uniformname, Value}) {
      const uniform = gl.getUniformLocation(glShaderPrograms[Programname], Uniformname);
      const split = Value.toString().split(",");
      if (Uniformtype == 'uniform1f' || Uniformtype == 'uniform1i') {
        gl[Uniformtype](uniform, Value);
        return;
      }
      if (Uniformtype.includes("Matrix")) {
        gl[Uniformtype](uniform, false, split);
        return;
      }
      gl[Uniformtype](uniform, split);
    }
    sendtexturetoshader({Programname, Texturetype, Uniformname, Unit, Value, MinFilter, MagFilter}) {
      const uniform = gl.getUniformLocation(glShaderPrograms[Programname], Uniformname);
      if (Texturetype == 'uniformTexture2D') {
        if (!textures.hasOwnProperty(Value)) {
          textures[Value] = loadImageAndCreateTextureInfo(Value, true, gl[MinFilter], gl[MagFilter]);
        }
        if (textures[Value].MIN_FILTER != gl[MinFilter] || textures[Value].MAG_FILTER != gl[MagFilter]) {
          textures[Value] = loadImageAndCreateTextureInfo(Value, true, gl[MinFilter], gl[MagFilter]);
        }
        gl.activeTexture(gl['TEXTURE'+Unit]);
        gl.bindTexture(gl.TEXTURE_2D, textures[Value].texture);
        gl.uniform1i(uniform, Unit);
      }
      if (Texturetype == 'uniformTexture3D') {

      }
    }

    // Buffer Blocks
    createbuffer({Buffername}) {
      glBuffers[Buffername] = gl.createBuffer();
    }
    bufferdata({Buffername, Buffertarget, Bufferdata, Bufferusage}) {
      const buffer = glBuffers[Buffername];
      gl.bindBuffer(gl[Buffertarget], buffer);
      gl.bufferData(
        gl[Buffertarget],
        new Float32Array(Bufferdata.split(",")),
        gl[Bufferusage]
      )
    }
    bindbuffer({Buffername, Buffertarget}) {
      gl.bindBuffer(gl[Buffertarget], glBuffers[Buffername]);
    }

    // Drawing Blocks
    clearscreen({ColorR, ColorG, ColorB, ColorA}) {
      gl.clearColor(ColorR, ColorG, ColorB, ColorA);
      gl.clearDepth(1.0);

      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    }
    drawarrays({Mode, First, Count}) {
      gl.drawArrays(gl[Mode], First, Count);
    }
    enabledisabledepthbuffer({Mode, Bool}) {  
      if (Bool) {
        gl.enable(gl.DEPTH_TEST);
      } else {
        gl.disable(gl.DEPTH_TEST);
      }
      gl.depthFunc(gl[Mode]);
    }

    // Matrix Blocks
    makeperspective({Fov, Aspect, Near, Far}) {
      var f = Math.tan(Math.PI * 0.5 - 0.5 * (Fov * (Math.PI / 180)));
      var rangeInv = 1.0 / (Near - Far);

      const dst = [
        f / Aspect, 0.0, 0.0, 0.0,
        0.0, f, 0.0, 0.0,
        0.0, 0.0, (Near + Far) * rangeInv, -1.0,
        0.0, 0.0, Near * Far * rangeInv * 2.0, 0.0
      ]

      return JSON.stringify(dst);
    };
    makecamera({Px,Py,Pz, Rx,Ry,Rz}) {
      const RRx = Rx * (Math.PI / 180);
      const RRy = Ry * (Math.PI / 180);
      const RRz = Rz * (Math.PI / 180);
      const translationMatrix = [
        1.0, 0.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        -Px, -Py, -Pz, 1.0
      ];
      const rotationMatrix = [
        Math.cos(RRy) * Math.cos(RRz), 
        Math.cos(RRx) * Math.sin(RRz) + Math.sin(RRx) * Math.sin(RRy) * Math.cos(RRz), 
        Math.sin(RRx) * Math.sin(RRz) - Math.cos(RRx) * Math.sin(RRy) * Math.cos(RRz), 
        0.0,
        
        -Math.cos(RRy) * Math.sin(RRz), 
        Math.cos(RRx) * Math.cos(RRz) - Math.sin(RRx) * Math.sin(RRy) * Math.sin(RRz), 
        Math.sin(RRx) * Math.cos(RRz) + Math.cos(RRx) * Math.sin(RRy) * Math.sin(RRz), 
        0.0,
        
        Math.sin(RRy), 
        -Math.sin(RRx) * Math.cos(RRy), 
        Math.cos(RRx) * Math.cos(RRy), 
        0.0,
        
        0.0, 0.0, 0.0, 1.0
      ];

      const dst = multiplyMatrix(rotationMatrix, translationMatrix);

      return JSON.stringify(dst);
    };
    makemodel({Tx,Ty,Tz, Rx,Ry,Rz, Sx,Sy,Sz}) {
      const RRx = Rx * (Math.PI / 180);
      const RRy = Ry * (Math.PI / 180);
      const RRz = Rz * (Math.PI / 180);
      const translationMatrix = [
        1.0, 0.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        Tx, Ty, Tz, 1.0
      ];
      var s = Math.sin(RRx);
      var c = Math.cos(RRx);
      const xRotationMatrix = [
        1.0, 0.0, 0.0, 0.0,
        0.0, c, s, 0.0,
        0.0, -s, c, 0.0,
        0.0, 0.0, 0.0, 1.0
      ];
      s = Math.sin(RRy);
      c = Math.cos(RRy);
      const yRotationMatrix = [
        c, 0.0, -s, 0.0,
        0.0, 1.0, 0.0, 0.0,
        s, 0.0, c, 0.0,
        0.0, 0.0, 0.0, 1.0
      ];
      s = Math.sin(RRz);
      c = Math.cos(RRz);
      const zRotationMatrix = [
        c, s, 0.0, 0.0,
        -s, c, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0
      ];
      const sizeMatrix = [
        Sx, 0.0, 0.0, 0.0,
        0.0, Sy, 0.0, 0.0,
        0.0, 0.0, Sz, 0.0,
        0.0, 0.0, 0.0, 1.0
      ]

      const xyRotationMatrix = multiplyMatrix(xRotationMatrix, yRotationMatrix);
      const xyzRotationMatrix = multiplyMatrix(xyRotationMatrix, zRotationMatrix);
      const trMatrix = multiplyMatrix(translationMatrix, xyzRotationMatrix);
      const dst = multiplyMatrix(trMatrix, sizeMatrix);
      return JSON.stringify(dst);
    }

    // Cleanup Blocks
    deleteshaderprograms() {
      for (var item in glShaderPrograms) {
        if (glShaderPrograms.hasOwnProperty(item)) {
            delete glShaderPrograms[item];
        }
      }
    }
    deletebuffers() {
      for (var item in glBuffers) {
        if (glBuffers.hasOwnProperty(item)) {
            delete glBuffers[item];
        }
      }
    }

    // Extra Blocks
    newline() {
      return '\n';
    }
    booleanblock({Bool}) {
      return Bool == "True"
    }
    getcostumedata({ Costume }, util) {
      let fileData = getspritecostume(util, Costume);
      return fileData;
    }

  }

  Scratch.extensions.register(new ScratchOpenGL());
})(Scratch);
