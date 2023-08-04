(function (Scratch) {
    var ext
    const vm = Scratch.vm;
    const url = 'https://extensions.turbowarp.cn';
    //检测运行环境
    const result = vm.securityManager && 'TurboWarp' || 'ClipCC';
    console.log(result);
    // 监听消息
    window.addEventListener('message', function (event) {
        if (event.origin !== url) return;
        if (event.data.type === 'add') {
            addext(event.data.url);
        }
    });

    function addext(url) {
        if (result === 'TurboWarp') {
            vm.securityManager.canLoadExtensionFromProject(url)
                .then(function (canLoad) {
                    if (canLoad) {
                        vm.extensionManager.loadExtensionURL(url);
                    }
                })
                .catch(function (error) {
                    console.error('无法加载扩展', error);
                });
        }

        if (result === 'ClipCC') {
            vm.extensionManager.loadExtensionURL(url, 'scratch', 'unsandboxed');
        }
    }
    
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
            if (ext == undefined || ext.closed) {
                ext = window.open(url + '?loadext=1', '_blank', 'width=900,height=600');
            } else {
                ext.focus();
            }
        }
    }
    Scratch.extensions.register(new loadext());
})(Scratch);