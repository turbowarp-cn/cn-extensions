(function (Scratch) {
    'use strict';
    var blockdefine = [];
    var dongtai = {};
    dongtai.add = function (block, func, opcode) { blockdefine.push(block); eval('evaal.prototype.' + opcode + '=func'); return }; dongtai.del = function (block) { const blockIndex = blockdefine.findIndex(item => item.opcode === block); if (blockIndex !== -1) { blockdefine.splice(blockIndex, 1) } delete evaal.prototype[block] }
    var start = [
        {
            blockType: Scratch.BlockType.LABEL,
            text: '代码的声明与执行'
        },
        {
            opcode: 'function',
            blockType: Scratch.BlockType.REPORTER,
            text: '声明Function [a]',
            arguments: {
                a: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: "return 1+1;"
                }
            }
        },
        '---',
        {
            opcode: 'dofunctioncm',
            blockType: Scratch.BlockType.COMMAND,
            text: '执行Function [a]',
            arguments: {
                a: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: ""
                }
            }
        },
        {
            opcode: 'dofunction',
            blockType: Scratch.BlockType.REPORTER,
            text: '执行Function [a]',
            arguments: {
                a: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: ""
                }
            }
        },
        '---',
        {
            opcode: 'dofunctionlistcm',
            blockType: Scratch.BlockType.COMMAND,
            text: '执行列表 [a] 中的代码',
            arguments: {
                a: {
                    type: Scratch.ArgumentType.STRING,
                    menu: 'lists'
                }
            }
        },
        {
            opcode: 'dofunctionlist',
            blockType: Scratch.BlockType.REPORTER,
            text: '执行列表 [a] 中的代码',
            arguments: {
                a: {
                    type: Scratch.ArgumentType.STRING,
                    menu: 'lists'
                }
            }
        },
        {
            opcode: 'dofunctiondirectcm',
            blockType: Scratch.BlockType.COMMAND,
            text: '执行代码 [a]',
            arguments: {
                a: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: ""
                }
            }
        },
        {
            opcode: 'dofunctiondirect',
            blockType: Scratch.BlockType.REPORTER,
            text: '执行代码 [a]',
            arguments: {
                a: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: ""
                }
            }
        },
        {
            blockType: Scratch.BlockType.LABEL,
            text: '自定义函数'
        },
        {
            func: 'fx_ruheshiyong',
            blockType: Scratch.BlockType.BUTTON,
            text: '如何使用'
        },
        {
            func: 'fx_shuaxin',
            blockType: Scratch.BlockType.BUTTON,
            text: '刷新'
        }
    ];
    class evaal {
        getInfo() {
            return {
                id: 'function0832',
                name: 'Function&\n‘Function’',
                color1: '#f54242',
                color2: '#f54242',
                color3: '#f54242',
                blocks: blockdefine != [] ? start.concat(blockdefine) : start,
                menus: {
                    lists: {
                        acceptReporters: true,
                        items: '_getListMenu',
                    }
                }
            };
        }
        _getListMenu() {
            const lists = Scratch.vm.runtime.getAllVarNamesOfType('list')
            return lists.length == 0 ? [" "] : lists
        }
        fx_ruheshiyong() {
            window.open('https://0832.ink/Extensions/Function/如何使用', '_blank');
        }
        fx_shuaxin() {
            blockdefine = [];
            const list = Scratch.vm.runtime.getTargetForStage().lookupVariableByNameAndType('Function', 'list');
            if (list) {
                const array = list.value;
                const result = array.join('\n');
                eval(result);
                Scratch.vm.extensionManager.refreshBlocks();
            }
        }
        function({ a }) {
            try {
                const result = new Function(a);
                return result;
            }
            catch (error) {
                if (0) {
                    console.error(error);
                    return "Error: " + error.message;
                }
                else {
                    return "";
                }
            }
        }
        functionlist({ a }) {
            const list = Scratch.vm.runtime.getTargetForStage().lookupVariableByNameAndType(a, 'list');
            const array = list.value;
            const result = array.join('\n');
            return new Function(result);
        }
        dofunction({ a }) {
            try {
                const result = a();
                return result;
            }
            catch (error) {
                if (0) {
                    console.error(error);
                    return "Error: " + error.message;
                }
                else {
                    return "";
                }
            }
        }
        dofunctioncm({ a }) {
            try {
                const result = a();
                return result;
            }
            catch (error) {
                if (0) {
                    console.error(error);
                    return "Error: " + error.message;
                }
                else {
                    return "";
                }
            }
        }
        dofunctionlistcm({ a }) {
            const list = Scratch.vm.runtime.getTargetForStage().lookupVariableByNameAndType(a, 'list');
            const array = list.value;
            const result = array.join('\n');
            new Function(result)();
            return;
        }
        dofunctionlist({ a }) {
            const list = Scratch.vm.runtime.getTargetForStage().lookupVariableByNameAndType(a, 'list');
            const array = list.value;
            const result = array.join('\n');
            return new Function(result)();
        }
        dofunctiondirectcm({ a }) {
            new Function(a)();
        }
        dofunctiondirect({ a }) {
            return new Function(a)();
        }
    }
    Scratch.extensions.register(new evaal());
})(Scratch);