(function (Scratch) {
    'use strict';

    class evaal {
        getInfo() {
            return {
                id: '0832eval',
                name: 'Eval',
                color1: '#f54242',
                color2: '#f54242',
                color3: '#f54242',
                blocks: [
                    {
                        opcode: 'eval',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '执行Javascript [a]',
                        arguments: {
                            a: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "1+1"
                            }
                        }
                    },
                ]
            };
        }
        eval({ a }) {
            const regex = /[^0-9+\-*/().]/g;
            const sanitizedText = a.replace(regex, '');
            try {
                const result = eval(sanitizedText);
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
    }

    Scratch.extensions.register(new evaal());
})(Scratch);