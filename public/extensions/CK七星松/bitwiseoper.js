class bitwise_oper {
    getInfo() {
        return {
            id: 'bitwiseoper',
            name: '位运算',
            blocks: [
                {
                    opcode: 'and',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[A] & [B]',
                    arguments: {
                        A: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '1'
                        },
                        B: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '1'
                        }
                    }
                },
                {
                    opcode: 'or',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[A] | [B]',
                    arguments: {
                        A: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '1'
                        },
                        B: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '0'
                        }
                    }
                },
                {
                    opcode: 'xor',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[A] ^ [B]',
                    arguments: {
                        A: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '1'
                        },
                        B: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '0'
                        }
                    }
                },
                {
                    opcode: 'not',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '~ [A]',
                    arguments: {
                        A: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '0'
                        }
                    }
                },
                {
                    opcode: 'shl',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[A] << [B]',
                    arguments: {
                        A: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '2'
                        },
                        B: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '1'
                        }
                    }
                },
                {
                    opcode: 'shr',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[A] >> [B]',
                    arguments: {
                        A: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '4'
                        },
                        B: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '1'
                        }
                    }
                }
            ]
        };
    }

   and(args) {
        return Number(args.A) & Number(args.B);
    }
   or(args) {
        return Number(args.A) | Number(args.B);
    }
   xor(args) {
        return Number(args.A) ^ Number(args.B);
    }
  not(args) {
        return ~ Number(args.A);
    }
   shl(args) {
        return Number(args.A) << Number(args.B);
    }
   shr(args) {
        return Number(args.A) >> Number(args.B);
    }
}

Scratch.extensions.register(new bitwise_oper());