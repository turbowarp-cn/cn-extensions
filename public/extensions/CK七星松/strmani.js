class str_mani {
    getInfo() {
        return {
            id: 'strmani',
            name: '字符串处理',
            color1: '#53aae7',
            color2: '#53aae7',
            blockIconURI: 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxMzQuMzYwNjgiIGhlaWdodD0iMTM0LjAzOTMyIiB2aWV3Qm94PSIwLDAsMTM0LjM2MDY4LDEzNC4wMzkzMiI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE3Mi44MTk2NiwtMTEyLjk4MDM0KSI+PGcgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aXNQYWludGluZ0xheWVyJnF1b3Q7OnRydWV9IiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PGcgc3Ryb2tlPSIjYjBkNWVlIiBzdHJva2Utd2lkdGg9IjEwIj48cGF0aCBkPSJNMjA4LjQ0Mjg2LDExNy45ODAzNGMwLDAgLTMyLjYxNjkyLDcuODE4MDggLTMwLjUyNjg4LDIzLjM0NDA5YzIuMDkwMDQsMTUuNTI2IDM0LjY5ODQ2LDUuNjY4NjQgMzYuODExODMsMjMuMzQ0MDhjMi4wNTk1MiwxNy4yMjUwNCAtMzAuODA2ODYsMTguNTM2MDMgLTMwLjgwNjg2LDE4LjUzNjAzYzAsMCAtMC43MTUxOCwtMC4zNzU1MSAtMS4wNjY3OSwtMC41NzkwNCIvPjxnPjxwYXRoIGQ9Ik0yMTYuNzgyNzYsMTUyLjExMDUyYzEzLjQwNjgsLTkuMjc3NTMgMzQuMTA2MDEsLTguMDQ1OCA0MS4xMDExNCw3LjQ4MTcxIiBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtvcmlnUm90JnF1b3Q7OjB9Ii8+PHBhdGggZD0iTTI1MS4xODQ3NywxOTIuODkyMzljMCwwIC0xNC4xNzQ5MywzNi45NjM0NSAtMTUuNDE4NjUsOS4yMjYxNWMtMS4yNDM3MSwtMjcuNzM3MzEgMTIuODMzMDcsLTY2Ljg4OTUzIDEyLjgzMzA3LC02Ni44ODk1MyIgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7b3JpZ1JvdCZxdW90OzowfSIvPjwvZz48Zz48cGF0aCBkPSJNMjY2Ljg0NzAxLDI0Mi4wMTk2NmMwLDAgLTYuNTU1MTQsLTM2LjIzNDM5IC0zLC00OC4zMzMzM2MzLjU1NTE0LC0xMi4wOTg5NCAyMy42NjY2NywtMjIgMjMuNjY2NjcsLTIyIi8+PHBhdGggZD0iTTMwMi4xODAzNCwxOTUuMzUyOTljMCwwIC0xMS41MDQ2MiwxMC4zMjU2MyAtMTcuNjcwOTYsMTAuMTU3NDZjLTYuMDUzODEsLTAuMTY1MTEgLTE5Ljc5NTcsLTExLjc1NzQ2IC0xOS43OTU3LC0xMS43NTc0NiIvPjwvZz48L2c+PGcgc3Ryb2tlPSIjNTNhYWU3IiBzdHJva2Utd2lkdGg9IjMiPjxwYXRoIGQ9Ik0yMDguNDQyODYsMTE3Ljk4MDM0YzAsMCAtMzIuNjE2OTIsNy44MTgwOCAtMzAuNTI2ODgsMjMuMzQ0MDljMi4wOTAwNCwxNS41MjYgMzQuNjk4NDYsNS42Njg2NCAzNi44MTE4MywyMy4zNDQwOGMyLjA1OTUyLDE3LjIyNTA0IC0zMC44MDY4NiwxOC41MzYwMyAtMzAuODA2ODYsMTguNTM2MDNjMCwwIC0wLjcxNTE4LC0wLjM3NTUxIC0xLjA2Njc5LC0wLjU3OTA0Ii8+PGc+PHBhdGggZD0iTTIxNi43ODI3NiwxNTIuMTEwNTJjMTMuNDA2OCwtOS4yNzc1MyAzNC4xMDYwMSwtOC4wNDU4IDQxLjEwMTE0LDcuNDgxNzEiIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O29yaWdSb3QmcXVvdDs6MH0iLz48cGF0aCBkPSJNMjUxLjE4NDc3LDE5Mi44OTIzOWMwLDAgLTE0LjE3NDkzLDM2Ljk2MzQ1IC0xNS40MTg2NSw5LjIyNjE1Yy0xLjI0MzcxLC0yNy43MzczMSAxMi44MzMwNywtNjYuODg5NTMgMTIuODMzMDcsLTY2Ljg4OTUzIiBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtvcmlnUm90JnF1b3Q7OjB9Ii8+PC9nPjxnPjxwYXRoIGQ9Ik0yNjYuODQ3MDEsMjQyLjAxOTY2YzAsMCAtNi41NTUxNCwtMzYuMjM0MzkgLTMsLTQ4LjMzMzMzYzMuNTU1MTQsLTEyLjA5ODk0IDIzLjY2NjY3LC0yMiAyMy42NjY2NywtMjIiLz48cGF0aCBkPSJNMzAyLjE4MDM0LDE5NS4zNTI5OWMwLDAgLTExLjUwNDYyLDEwLjMyNTYzIC0xNy42NzA5NiwxMC4xNTc0NmMtNi4wNTM4MSwtMC4xNjUxMSAtMTkuNzk1NywtMTEuNzU3NDYgLTE5Ljc5NTcsLTExLjc1NzQ2Ii8+PC9nPjwvZz48L2c+PC9nPjwvc3ZnPjwhLS1yb3RhdGlvbkNlbnRlcjo2Ny4xODAzMzg0ODU3NDI6NjcuMDE5NjYtLT4=',
            menuIconURI: 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxMzQuMzYwNjgiIGhlaWdodD0iMTM0LjAzOTMyIiB2aWV3Qm94PSIwLDAsMTM0LjM2MDY4LDEzNC4wMzkzMiI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE3Mi44MTk2NiwtMTEyLjk4MDM0KSI+PGcgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aXNQYWludGluZ0xheWVyJnF1b3Q7OnRydWV9IiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PGcgc3Ryb2tlPSIjYjBkNWVlIiBzdHJva2Utd2lkdGg9IjEwIj48cGF0aCBkPSJNMjA4LjQ0Mjg2LDExNy45ODAzNGMwLDAgLTMyLjYxNjkyLDcuODE4MDggLTMwLjUyNjg4LDIzLjM0NDA5YzIuMDkwMDQsMTUuNTI2IDM0LjY5ODQ2LDUuNjY4NjQgMzYuODExODMsMjMuMzQ0MDhjMi4wNTk1MiwxNy4yMjUwNCAtMzAuODA2ODYsMTguNTM2MDMgLTMwLjgwNjg2LDE4LjUzNjAzYzAsMCAtMC43MTUxOCwtMC4zNzU1MSAtMS4wNjY3OSwtMC41NzkwNCIvPjxnPjxwYXRoIGQ9Ik0yMTYuNzgyNzYsMTUyLjExMDUyYzEzLjQwNjgsLTkuMjc3NTMgMzQuMTA2MDEsLTguMDQ1OCA0MS4xMDExNCw3LjQ4MTcxIiBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtvcmlnUm90JnF1b3Q7OjB9Ii8+PHBhdGggZD0iTTI1MS4xODQ3NywxOTIuODkyMzljMCwwIC0xNC4xNzQ5MywzNi45NjM0NSAtMTUuNDE4NjUsOS4yMjYxNWMtMS4yNDM3MSwtMjcuNzM3MzEgMTIuODMzMDcsLTY2Ljg4OTUzIDEyLjgzMzA3LC02Ni44ODk1MyIgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7b3JpZ1JvdCZxdW90OzowfSIvPjwvZz48Zz48cGF0aCBkPSJNMjY2Ljg0NzAxLDI0Mi4wMTk2NmMwLDAgLTYuNTU1MTQsLTM2LjIzNDM5IC0zLC00OC4zMzMzM2MzLjU1NTE0LC0xMi4wOTg5NCAyMy42NjY2NywtMjIgMjMuNjY2NjcsLTIyIi8+PHBhdGggZD0iTTMwMi4xODAzNCwxOTUuMzUyOTljMCwwIC0xMS41MDQ2MiwxMC4zMjU2MyAtMTcuNjcwOTYsMTAuMTU3NDZjLTYuMDUzODEsLTAuMTY1MTEgLTE5Ljc5NTcsLTExLjc1NzQ2IC0xOS43OTU3LC0xMS43NTc0NiIvPjwvZz48L2c+PGcgc3Ryb2tlPSIjNTNhYWU3IiBzdHJva2Utd2lkdGg9IjMiPjxwYXRoIGQ9Ik0yMDguNDQyODYsMTE3Ljk4MDM0YzAsMCAtMzIuNjE2OTIsNy44MTgwOCAtMzAuNTI2ODgsMjMuMzQ0MDljMi4wOTAwNCwxNS41MjYgMzQuNjk4NDYsNS42Njg2NCAzNi44MTE4MywyMy4zNDQwOGMyLjA1OTUyLDE3LjIyNTA0IC0zMC44MDY4NiwxOC41MzYwMyAtMzAuODA2ODYsMTguNTM2MDNjMCwwIC0wLjcxNTE4LC0wLjM3NTUxIC0xLjA2Njc5LC0wLjU3OTA0Ii8+PGc+PHBhdGggZD0iTTIxNi43ODI3NiwxNTIuMTEwNTJjMTMuNDA2OCwtOS4yNzc1MyAzNC4xMDYwMSwtOC4wNDU4IDQxLjEwMTE0LDcuNDgxNzEiIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O29yaWdSb3QmcXVvdDs6MH0iLz48cGF0aCBkPSJNMjUxLjE4NDc3LDE5Mi44OTIzOWMwLDAgLTE0LjE3NDkzLDM2Ljk2MzQ1IC0xNS40MTg2NSw5LjIyNjE1Yy0xLjI0MzcxLC0yNy43MzczMSAxMi44MzMwNywtNjYuODg5NTMgMTIuODMzMDcsLTY2Ljg4OTUzIiBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtvcmlnUm90JnF1b3Q7OjB9Ii8+PC9nPjxnPjxwYXRoIGQ9Ik0yNjYuODQ3MDEsMjQyLjAxOTY2YzAsMCAtNi41NTUxNCwtMzYuMjM0MzkgLTMsLTQ4LjMzMzMzYzMuNTU1MTQsLTEyLjA5ODk0IDIzLjY2NjY3LC0yMiAyMy42NjY2NywtMjIiLz48cGF0aCBkPSJNMzAyLjE4MDM0LDE5NS4zNTI5OWMwLDAgLTExLjUwNDYyLDEwLjMyNTYzIC0xNy42NzA5NiwxMC4xNTc0NmMtNi4wNTM4MSwtMC4xNjUxMSAtMTkuNzk1NywtMTEuNzU3NDYgLTE5Ljc5NTcsLTExLjc1NzQ2Ii8+PC9nPjwvZz48L2c+PC9nPjwvc3ZnPjwhLS1yb3RhdGlvbkNlbnRlcjo2Ny4xODAzMzg0ODU3NDI6NjcuMDE5NjYtLT4=',
            blocks: [
                {
                    opcode: 'length',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[STR] 的长度',
                    arguments: {
                        STR: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'string'
                        }
                    }
                },
                {
                    opcode: 'reversal',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '反转 [STR]',
                    arguments: {
                        STR: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'string'
                        }
                    }
                },
                {
                    opcode: 'strPalindrome',
                    blockType: Scratch.BlockType.BOOLEAN,
                    text: '[STR] 是回文字符串吗？',
                    arguments: {
                        STR: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'strrts'
                        }
                    }
                },
                {
                    opcode: 'indexOf',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '从 [STR] 的第 [NUM] 个字符开始找到第一个 [STR2] 出现的位置',
                    arguments: {
                        STR: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'string'
                        },
                        STR2: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'str'
                        },
                        NUM: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '1'
                        }
                    }
                },
                {
                    opcode: 'lastIndexOf',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '从 [STR] 的第 [NUM] 个字符开始找到最后一个 [STR2] 出现的位置',
                    arguments: {
                        STR: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'string'
                        },
                        STR2: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'str'
                        },
                        NUM: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '3'
                        }
                    }
                },
                {
                    opcode: 'slicetwo',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '截取 [STR] 第 [NUM1] 到 [NUM2] 个字符',
                    arguments: {
                        STR: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'string'
                        },
                        NUM1: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '1'
                        },
                        NUM2: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '2'
                        }
                    }
                },
                {
                    opcode: 'sliceone',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '截取 [STR] 从 [NUM] 开始的内容',
                    arguments: {
                        STR: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'string'
                        },
                        NUM: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '1'
                        }
                    }
                },
                {
                    opcode: 'substr',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '截取从 [STR] 的第 [NUM1] 个字符开始长度为 [NUM2] 的子字符串',
                    arguments: {
                        STR: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'string'
                        },
                        NUM1: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '1'
                        },
                        NUM2: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '3'
                        }
                    }
                },
                {
                    opcode: 'replace',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '把 [STR] 中的第一个 [STR2] 替换成 [STR3]',
                    arguments: {
                        STR: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'str in string'
                        },
                        STR2: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'str'
                        },
                        STR3: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'num'
                        }
                    }
                },
                {
                    opcode: 'replaceAll',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '把 [STR] 中的 [STR2] 都替换成 [STR3]',
                    arguments: {
                        STR: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'str in string'
                        },
                        STR2: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'str'
                        },
                        STR3: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'num'
                        }
                    }
                },
                {
                    opcode: 'toUpperCase',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '将 [STR] 里的小写字母转为大写',
                    arguments: {
                        STR: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'string'
                        }
                    }
                },
                {
                    opcode: 'toLowerCase',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '将 [STR] 里的小写字母转为小写',
                    arguments: {
                        STR: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'STRING'
                        }
                    }
                },
                {
                    opcode: 'padStart',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '在 [STR] 的开头填充 [STR2] 直到长度为 [NUM]',
                    arguments: {
                        STR: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'str'
                        },
                        STR2: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 's'
                        },
                        NUM: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '5'
                        }
                    }
                },
                {
                    opcode: 'padEnd',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '在 [STR] 的结尾填充 [STR2] 直到长度为[NUM]',
                    arguments: {
                        STR: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'str'
                        },
                        STR2: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'r'
                        },
                        NUM: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '5'
                        }
                    }
                },
                {
                    opcode: 'titleCase',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '将 [STR] 每个单词的首字母大写',
                    arguments: {
                        STR: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'string is good'
                        }
                    }
                },
                {
                    opcode: 'charAt',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[STR] 的第 [NUM] 个字符',
                    arguments: {
                        STR: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'string'
                        },
                        NUM: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '1'
                        }
                    }
                },
                {
                    opcode: 'includes',
                    blockType: Scratch.BlockType.BOOLEAN,
                    text: '[STR] 包括 [STR2] ？',
                    arguments: {
                        STR: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'string'
                        },
                        STR2: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'str'
                        }
                    }
                },
                {
                    opcode: 'includesNum',
                    blockType: Scratch.BlockType.BOOLEAN,
                    text: '从 [STR] 的第 [NUM] 个字符开始包括 [STR2] ？',
                    arguments: {
                        STR: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'string'
                        },
                        STR2: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'str'
                        },
                        NUM: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '2'
                        }
                    }
                },
                {
                    opcode: 'startsWith',
                    blockType: Scratch.BlockType.BOOLEAN,
                    text: '[STR] 以 [STR2] 开头？',
                    arguments: {
                        STR: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'string'
                        },
                        STR2: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'str'
                        }
                    }
                },
                {
                    opcode: 'endsWith',
                    blockType: Scratch.BlockType.BOOLEAN,
                    text: '[STR] 以 [STR2] 结尾？',
                    arguments: {
                        STR: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'string'
                        },
                        STR2: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'str'
                        }
                    }
                },
                {
                    opcode: 'strictlyequal',
                    blockType: Scratch.BlockType.BOOLEAN,
                    text: '[STR] === [STR2]',
                    arguments: {
                        STR: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'Str'
                        },
                        STR2: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'str'
                        }
                    }
                },
                {
                    opcode: 'splittojson',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '用 [STR2] 分割 [STR]，并返回json',
                    arguments: {
                        STR: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'str.ing'
                        },
                        STR2: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: '.'
                        }
                    }
                },
                {
                    opcode: 'getStrNumInStr',
                    blockType: Scratch.BlockType.REPORTER,
                    text: ' [STR2] 在 [STR] 里的次数',
                    arguments: {
                        STR: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'str in string'
                        },
                        STR2: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'str'
                        }
                    }
                },
            ]
        };
    }

   length(args){
        return args.STR.length;
    }
   reversal(args){
        var arr=args.STR.split('');
        arr=arr.reverse().join("");
        return arr;
    }
   strPalindrome(args){
        var arr=args.STR.split('');
        arr=arr.reverse().join("");
        return arr===args.STR;
    }
   indexOf(args){
        if(args.STR.indexOf(args.STR2,Number(args.NUM)-1)!=-1) return args.STR.indexOf(args.STR2,Number(args.NUM)-1)+1;
        else return -1;
    }
   lastIndexOf(args) {
        if(args.STR.lastIndexOf(args.STR2,Number(args.NUM)-1)!=-1) return args.STR.lastIndexOf(args.STR2,Number(args.NUM)-1)+1;
        else return -1;
    }
   slicetwo(args){
        return args.STR.slice(Number(args.NUM1)-1,Number(args.NUM2));
    }
   sliceone(args){
        return args.STR.slice(Number(args.NUM)-1);
    }
   substr(args){
        return args.STR.substr(Number(args.NUM1)-1,Number(args.NUM2));
    }
   replace(args){
        return args.STR.replace(args.STR2,args.STR3);
    }
   replaceAll(args){
        return args.STR.replaceAll(args.STR2,args.STR3);
    }
   toUpperCase(args){
        return args.STR.toUpperCase();
    }
   toLowerCase(args){
        return args.STR.toLowerCase();
    }
   padStart(args){
        return args.STR.padStart(Number(args.NUM),args.STR2);
    }
   padEnd(args){
        return args.STR.padEnd(Number(args.NUM),args.STR2);
    }
   titleCase(args){
        var newStr=args.STR.split(" ");
        for(var i=0;i<newStr.length;i++){
            newStr[i]=newStr[i].slice(0,1).toUpperCase() + newStr[i].slice(1).toLowerCase();
        }
        return newStr.join(" ");
   }
   charAt(args){
        return args.STR.charAt(Number(args.NUM)-1);
    }
   includes(args){
        return args.STR.includes(args.STR2);
    }
   includesNum(args) {
        return args.STR.includes(args.STR2,Number(args.NUM));
    }
   startsWith(args) {
        return args.STR.startsWith(args.STR2);
    }
   endsWith(args) {
        return args.STR.endsWith(args.STR2);
    }
   strictlyequal(args) {
        return args.STR === args.STR2;
    }
   splittojson(args) {
        var str_ = args.STR.split(args.STR2);
        return JSON.stringify(str_);
    }
   getStrNumInStr(args){
      if(typeof(args.STR)!=="string" || typeof(args.STR2)!=="string") return 0;
      if(args.STR.length<args.STR2.length) return 0;
      let Nums=0;
      for(let i=0;i<args.STR.length;i++){
         let flag=true;
         let k=i;
         for(let n=0;n<args.STR2.length;k++,n++){
            i++;
            if(args.STR[k]!==args.STR2[n]) {
               flag=false;
               break;
            }
         }
         if(flag) Nums++;
         i--;
      }
      return Nums;
   }
}

Scratch.extensions.register(new str_mani());