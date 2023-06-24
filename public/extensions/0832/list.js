(function (Scratch) {
    'use strict';
    class List {
        getInfo() {
            return {
                id: '0832list',
                name: '列表',
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
                                defaultValue: 'rx',
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
                                defaultValue: 'rx',
                            }
                        }
                    },
                ]
            };
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
                return;
            }

            if (!Array.isArray(parsed)) {
                return;
            }

            for (const element of parsed) {
                const type = typeof element;
                if (type !== "string" && type !== "number" && type !== "boolean") {
                    return;
                }
            }

            const list = vm.runtime.getTargetForStage().lookupVariableByNameAndType(NAME, 'list');
            if (!list) {
                return;
            }

            list.value = parsed;
        }
    }

    Scratch.extensions.register(new List());
})(Scratch);