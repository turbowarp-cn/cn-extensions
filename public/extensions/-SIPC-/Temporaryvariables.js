(function (Scratch) {
    'use strict';
    const icon = 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI4MS44ODU0IiBoZWlnaHQ9IjgwLjYwMzA4IiB2aWV3Qm94PSIwLDAsODEuODg1NCw4MC42MDMwOCI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE5OS4wNTczLC0xMzkuNjk4NDYpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTI4MC45NDI3LDE4MGMwLDIyLjI1NzkyIC0xOC4zMzA2Nyw0MC4zMDE1NCAtNDAuOTQyNyw0MC4zMDE1NGMtMjIuNjEyMDMsMCAtNDAuOTQyNywtMTguMDQzNjEgLTQwLjk0MjcsLTQwLjMwMTU0YzAsLTIyLjI1NzkyIDE4LjMzMDY3LC00MC4zMDE1NCA0MC45NDI3LC00MC4zMDE1NGMyMi42MTIwMywwIDQwLjk0MjcsMTguMDQzNjEgNDAuOTQyNyw0MC4zMDE1NHoiIGZpbGw9IiM1NjYyNzAiIHN0cm9rZS13aWR0aD0iMCIvPjxwYXRoIGQ9Ik0yNzEuNDg2MTEsMTgwLjk2MTQxYzAsMy44NDU2MyAtMi44ODQyMiw2LjcyOTg2IC02LjcyOTg2LDYuNzI5ODZjLTMuODQ1NjMsMCAtNi43Mjk4NiwtMi44ODQyMiAtNi43Mjk4NiwtNi43Mjk4NmMwLC0wLjk2MTQxIDAsLTEuNDQyMTEgMC40ODA3LC0yLjQwMzUybC04LjY1MjY3LC04LjE3MTk3Yy0xLjQ0MjExLDAuOTYxNDEgLTIuODg0MjIsMS40NDIxMSAtNC44MDcwNCwxLjQ0MjExaC0wLjQ4MDdsLTUuNzY4NDUsMTcuMzA1MzRjMi40MDM1MiwxLjkyMjgyIDMuODQ1NjMsNC4zMjYzNCAzLjg0NTYzLDcuNjkxMjZjMCw1LjI4Nzc0IC00LjMyNjM0LDkuMTMzMzggLTkuMTMzMzgsOS4xMzMzOGMtNS4yODc3NCwwIC05LjEzMzM4LC00LjMyNjM0IC05LjEzMzM4LC05LjEzMzM4YzAsLTEuNDQyMTEgMC40ODA3LC0yLjg4NDIyIDAuOTYxNDEsLTMuODQ1NjNsLTYuNzI5ODYsLTUuNzY4NDVjLTAuOTYxNDEsMC40ODA3IC0xLjkyMjgyLDAuOTYxNDEgLTMuMzY0OTMsMC45NjE0MWMtMy44NDU2MywwIC02LjcyOTg2LC0yLjg4NDIyIC02LjcyOTg2LC02LjcyOTg2YzAsLTMuODQ1NjMgMi44ODQyMiwtNi43Mjk4NiA2LjcyOTg2LC02LjcyOTg2YzMuODQ1NjMsMCA2LjcyOTg2LDIuODg0MjIgNi43Mjk4Niw2LjcyOTg2YzAsMC45NjE0MSAwLDEuNDQyMTEgLTAuNDgwNywyLjQwMzUybDYuNzI5ODYsNS43Njg0NWMxLjQ0MjExLC0wLjk2MTQxIDMuMzY0OTMsLTEuNDQyMTEgNS4yODc3NCwtMS40NDIxMWgwLjQ4MDdsNS43Njg0NSwtMTcuMzA1MzRjLTIuNDAzNTIsLTEuOTIyODIgLTMuODQ1NjMsLTQuMzI2MzQgLTMuODQ1NjMsLTcuNjkxMjZjMCwtNS4yODc3NCA0LjMyNjM0LC05LjEzMzM4IDkuMTMzMzgsLTkuMTMzMzhjNS4yODc3NCwwIDkuMTMzMzgsNC4zMjYzNCA5LjEzMzM4LDkuMTMzMzhjMCwxLjQ0MjExIC0wLjQ4MDcsMi44ODQyMiAtMC45NjE0MSw0LjMyNjM0bDguNjUyNjcsOC4xNzE5N2MwLjk2MTQxLC0wLjQ4MDcgMi40MDM1MiwtMC45NjE0MSAzLjM2NDkzLC0wLjk2MTQxYzMuODQ1NjMsMCA2LjI0OTE1LDIuNDAzNTIgNi4yNDkxNSw2LjI0OTE1ek0yMzguNzk4MjQsMTk2LjgyNDY0YzAsLTIuNDAzNTIgLTEuOTIyODIsLTQuMzI2MzQgLTQuMzI2MzQsLTQuMzI2MzRjLTIuNDAzNTIsMCAtNC4zMjYzNCwxLjkyMjgyIC00LjMyNjM0LDQuMzI2MzRjMCwyLjQwMzUyIDEuOTIyODIsNC4zMjYzNCA0LjMyNjM0LDQuMzI2MzRjMi40MDM1MiwwIDQuMzI2MzQsLTEuOTIyODIgNC4zMjYzNCwtNC4zMjYzNHoiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMSIvPjwvZz48L2c+PC9zdmc+PCEtLXJvdGF0aW9uQ2VudGVyOjQwLjk0MjY5NjA1MzgwMTE0OjQwLjMwMTUzNTI2NTQ4NjcwNi0tPg==';
    const icon2 = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjczODM4OTkwMjQ1IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjIzMDEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTgyNS42IDQ2MC44Yy0xMi44IDAtMzIgNi40LTQ0LjggMTIuOGwtMTE1LjItMTA4LjhjNi40LTE5LjIgMTIuOC0zOC40IDEyLjgtNTcuNiAwLTY0LTUxLjItMTIxLjYtMTIxLjYtMTIxLjYtNjQgMC0xMjEuNiA1MS4yLTEyMS42IDEyMS42IDAgNDQuOCAxOS4yIDc2LjggNTEuMiAxMDIuNEw0MDkuNiA2NDBoLTYuNGMtMjUuNiAwLTUxLjIgNi40LTcwLjQgMTkuMkwyNDMuMiA1ODIuNGM2LjQtMTIuOCA2LjQtMTkuMiA2LjQtMzIgMC01MS4yLTM4LjQtODkuNi04OS42LTg5LjYtNTEuMiAwLTg5LjYgMzguNC04OS42IDg5LjYgMCA1MS4yIDM4LjQgODkuNiA4OS42IDg5LjYgMTkuMiAwIDMyLTYuNCA0NC44LTEyLjhMMjk0LjQgNzA0Yy02LjQgMTIuOC0xMi44IDMyLTEyLjggNTEuMiAwIDY0IDUxLjIgMTIxLjYgMTIxLjYgMTIxLjYgNjQgMCAxMjEuNi01MS4yIDEyMS42LTEyMS42IDAtNDQuOC0xOS4yLTc2LjgtNTEuMi0xMDIuNGw3Ni44LTIzMC40aDYuNGMyNS42IDAgNDQuOC02LjQgNjQtMTkuMkw3MzYgNTEyYy02LjQgMTIuOC02LjQgMTkuMi02LjQgMzIgMCA1MS4yIDM4LjQgODkuNiA4OS42IDg5LjYgNTEuMiAwIDg5LjYtMzguNCA4OS42LTg5LjZzLTMyLTgzLjItODMuMi04My4yeiBtLTQwOS42IDM1MmMtMzIgMC01Ny42LTI1LjYtNTcuNi01Ny42czI1LjYtNTcuNiA1Ny42LTU3LjYgNTcuNiAyNS42IDU3LjYgNTcuNi0yNS42IDU3LjYtNTcuNiA1Ny42eiIgZmlsbD0iI2ZmZmZmZiIgcC1pZD0iMjMwMiI+PC9wYXRoPjwvc3ZnPg==';
    var dict = {};
    class Temporaryvariables {
        constructor () {}
        getInfo() {
            return {
                id: 'Temporaryvariables',
                name: '临时变量',
                color1: '#566270',
                color2: '#66717e',
                color3: '#77818c',
                menuIconURI: icon,
				blockIconURI: icon2,
                blocks: [
                    {
                        opcode: 'add',
                        blockType: Scratch.BlockType.COMMAND,
                        text: '将临时变量 [key] 设为 [value]',
                        arguments: {
                            key: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'i'
                            },
                            value: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '1'
                            }
                        }
                    },
                    {
                        opcode: 'delete',
                        blockType: Scratch.BlockType.COMMAND,
                        text: '删除临时变量 [key]',
                        arguments: {
                            key: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'i'
                            }
                        }
                    },
                    {
                        opcode: 'read',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '读取临时变量 [key] 的值',
                        arguments: {
                            key: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'i'
                            }
                        }
                    },
                    {
                        opcode: 'search',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: '临时变量 [key] 是否存在?',
                        arguments: {
                            key: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'i'
                            }
                        }
                    },
                ]
            }
        }
        add ({key,value}) {
            dict[key] = value
        }
        delete ({key}) {
            delete dict[key]
        }
        read ({key}) {
            return dict[key]
        }
        search({key}){
            return dict.hasOwnProperty(key)
        }

    }
    Scratch.extensions.register(new Temporaryvariables());
})(Scratch);
//BY -SIPC- 502415953