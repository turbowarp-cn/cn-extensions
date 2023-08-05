(function (Scratch) {
  'use strict';
  console.log("ShovelUtils v1.3");
  const vm = Scratch.vm;

  // Based on from https://www.growingwiththeweb.com/2017/12/fast-simple-js-fps-counter.html
  const times = [];
  let fps = vm.runtime.frameLoop.framerate;
  const oldStep = vm.runtime._step;
  vm.runtime._step = function () {
    oldStep.call(this);
    const now = performance.now();
    while (times.length > 0 && times[0] <= now - 1000) {
      times.shift();
    }
    times.push(now);
    fps = times.length;
  };

  class ShovelUtils {
    getInfo() {
      return {
        id: 'ShovelUtils',
        name: 'ShovelUtils',
        color1: '#f54242',
        color2: '#f54242',
        color3: '#f54242',
        blocks: [
          {
            opcode: 'getlist',
            blockType: Scratch.BlockType.REPORTER,
            text: '获取列表 [TEXT]',
            arguments: {
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'MyList',
              }
            }
          },
          {
            opcode: 'setlist',
            blockType: Scratch.BlockType.COMMAND,
            text: '设置列表 [NAME] 为 [TEXT]',
            arguments: {
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '[1,2]',
              },
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'MyList',
              }
            }
          },
          {
            opcode: 'importImage',
            blockType: Scratch.BlockType.COMMAND,
            text: '从 [TEXT] 导入图像 命名为 [NAME]',
            arguments: {
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'https://extensions.turbowarp.org/dango.png',
              },
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Dango',
              }
            }
          },
          {
            opcode: 'importSprite',
            blockType: Scratch.BlockType.COMMAND,
            text: '从 [TEXT] 导入角色',
            arguments: {
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Link or data uri here',
              }
            }
          },
          {
            opcode: 'importSound',
            blockType: Scratch.BlockType.COMMAND,
            text: '从 [TEXT] 导入声音 命名为 [NAME]',
            arguments: {
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'https://extensions.turbowarp.org/meow.mp3',
              },
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Meow',
              }
            }
          },
          {
            opcode: 'importProject',
            blockType: Scratch.BlockType.COMMAND,
            text: '从 [TEXT] 导入项目',
            arguments: {
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'https://theshovel.github.io/Bullet-Hell/Bullet%20Hell',
              }
            }
          },
          {
            opcode: 'loadExtension',
            blockType: Scratch.BlockType.COMMAND,
            text: '从 [TEXT] 中加载扩展',
            arguments: {
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'https://extensions.turbowarp.org/utilities.js',
              }
            }
          },

          {
            opcode: 'restartProject',
            blockType: Scratch.BlockType.COMMAND,
            text: '重新启动项目',
            arguments: {
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '0',
              }
            }
          },
          {
            opcode: 'deleteSprite',
            blockType: Scratch.BlockType.COMMAND,
            text: '删除角色 [SPRITE]',
            arguments: {
              SPRITE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Sprite1',
              }
            }
          },
          {
            opcode: 'getfps',
            blockType: Scratch.BlockType.REPORTER,
            text: 'Fps'
          },
        ]
      };
    }

    importImage({ TEXT, NAME }) {
      Scratch.fetch(TEXT)
        .then((r) => r.arrayBuffer())
        .then((arrayBuffer) => {
          const storage = vm.runtime.storage;
          vm.addCostume(NAME + '.PNG', {
            name: NAME + '',
            asset: new storage.Asset(
              storage.AssetType.ImageBitmap,
              null, // asset id, doesn't need to be set here because of `true` at the end will make Scratch generate it for you
              storage.DataFormat.PNG,
              new Uint8Array(arrayBuffer),
              true
            )
          });
        });
    }

    importSprite({ TEXT }) {
      Scratch.fetch(TEXT)
        .then(r => r.arrayBuffer())
        .then(buffer => vm.addSprite(buffer))
        .then(() => {
          console.log("Done");
        })
        .catch((error) => {
          console.log("Error", error);
        });
    }

    deleteSprite({ SPRITE }) {
      const target = vm.runtime.getSpriteTargetByName(SPRITE);
      if (!target || target.isStage) {
        return;
      }
      // @ts-expect-error
      if (typeof ScratchBlocks !== 'undefined') {
        if (!confirm(`Do you want to delete the sprite "${SPRITE}"? This cannot be undone.`)) {
          return;
        }
      }
      vm.deleteSprite(target.id);
    }

    importSound({ TEXT, NAME }) {
      Scratch.fetch(TEXT)
        .then((r) => r.arrayBuffer())
        .then((arrayBuffer) => {
          const storage = vm.runtime.storage;
          const asset = new storage.Asset(
            storage.AssetType.Sound,
            null,
            storage.DataFormat.MP3,
            new Uint8Array(arrayBuffer),
            true
          );
          vm.addSound({
            md5: asset.assetId + '.' + asset.dataFormat,
            asset: asset,
            name: NAME + ''
          });
        });
    }

    importProject({ TEXT }) {
      // @ts-ignore
      if (typeof ScratchBlocks !== 'undefined') {
        // We are in the editor. Ask before loading a new project to avoid unrecoverable data loss.
        if (!confirm(`Do you want to import a project from "${TEXT}"? Everything in the current project will be permanently deleted.`)) {
          return;
        }
      }
      Scratch.fetch(TEXT)
        .then(r => r.arrayBuffer())
        .then(buffer => vm.loadProject(buffer))
        .then(() => {
          console.log("Done");
          vm.greenFlag();
        })
        .catch((error) => {
          console.log("Error", error);
        });
    }

    restartProject() {
      vm.greenFlag();
    }

    async loadExtension({ TEXT }) {
      if (await vm.securityManager.canLoadExtensionFromProject(TEXT)) {
        vm.extensionManager.loadExtensionURL(TEXT);
      }
    }

    getlist({ TEXT }) {
      const list = vm.runtime.getTargetForStage().lookupVariableByNameAndType(TEXT, 'list');
      if (list) {
        return JSON.stringify(list.value);
      } else {
        return "";
      }
    }
    setlist({ TEXT, NAME }) {
      let parsed;
      try {
        parsed = JSON.parse(TEXT);
      } catch (e) {
        return; // JSON was invalid
      }

      if (!Array.isArray(parsed)) {
        return; // it's not an array
      }

      for (const element of parsed) {
        const type = typeof element;
        if (type !== "string" && type !== "number" && type !== "boolean") {
          return; // One of the elements has a disallowed type
        }
      }

      const list = vm.runtime.getTargetForStage().lookupVariableByNameAndType(NAME, 'list');
      if (!list) {
        return; // List was not found
      }

      list.value = parsed;
    }

    getfps(){
      return fps;
    }
  }

  Scratch.extensions.register(new ShovelUtils());
// @ts-ignore
})(Scratch);
