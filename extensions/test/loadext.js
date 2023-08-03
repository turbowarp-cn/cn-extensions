(function (Scratch) {
    const vm = Scratch.vm;
    const url = 'https://extensions.turbowarp.cn';
    // 监听消息
    window.addEventListener('message', function (event) {
        if (event.origin !== url) return; 
        if (event.data.type === 'add') {
            vm.securityManager.canLoadExtensionFromProject(event.data.url)
                .then(function (canLoad) {
                    if (canLoad) {
                        vm.extensionManager.loadExtensionURL(event.data.url);
                    }
                })
                .catch(function (error) {
                    console.error('Error loading extension:', error);
                });
        }
    });
    class loadext {
        getInfo() {
            return {
                id: 'loadext',
                name: 'loadext',
                blocks: [
                    {
                        opcode: 'open_cnext',
                        text: '打开扩展商店',
                        blockType: Scratch.BlockType.COMMAND
                    },
                ],
            }
        }
        open_cnext() {
          if (typeof ext === 'undefined' || ext.closed) {
            ext = window.open(url + '?loadext=1', '_blank', 'width=900,height=600');
          } else {
            ext.blur();
            setTimeout(function() {
              ext.focus();
              ext.moveTo(0, 0);
            }, 100);
          }
        }
    }
    Scratch.extensions.register(new loadext());
})(Scratch);