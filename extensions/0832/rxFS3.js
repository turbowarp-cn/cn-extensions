/*!
 * Made by 0832
 * This file was originally under the rxLI Version 2.1 license:
 * https://0832k12.github.io/rxLi/2.1/
 * 
 * However they have since claimed it to be "directly compatible with MIT license",
 * which is the license we use this file under.
 */

(function (Scratch) {
    'use strict';
    if (Scratch.vm.is_rCodenow == true) {
        Scratch.vm.extensionManager.loadExtensionURL('rxfs');
        return;
    }
    Scratch.translate.setup({
        zh: {
            start: '新建 [STR] ',
            folder: '设置 [STR] 为 [STR2] ',
            folder_default: 'rxFS 3!',
            sync: '将 [STR] 的位置更改为 [STR2] ',
            del: '删除 [STR] ',
            webin: '从网络加载 [STR]',
            open: '打开 [STR]',
            clean: '清空文件系统',
            in: '从 [STR] 导入文件系统',
            out: '导出文件系统',
            list: '列出 [STR] 下的所有文件',
            search: '搜索 [STR]',
            searchin: '搜索文件内容 [STR]'
        },
        ru: {
            start: 'Создать [STR]',
            folder: 'Установить [STR] в [STR2]',
            folder_default: 'Архиепископ Верховный жрец Правитель мира!',
            sync: 'Изменить расположение [STR] на [STR2]',
            del: 'Удалить [STR]',
            webin: 'Загрузить [STR] из Интернета',
            open: 'Открыть [STR]',
            clean: 'Очистить файловую систему',
            in: 'Импортировать файловую систему из [STR]',
            out: 'Экспортировать файловую систему',
            list: 'Список всех файлов в [STR]',
            search: 'Поиск [STR]'
        },
        jp: {
            start: '新規作成 [STR]',
            folder: '[STR] を [STR2] に設定する',
            folder_default: '大主教大祭司世界の支配者！',
            sync: '[STR] の位置を [STR2] に変更する',
            del: '[STR] を削除する',
            webin: '[STR] をウェブから読み込む',
            open: '[STR] を開く',
            clean: 'ファイルシステムをクリアする',
            in: '[STR] からファイルシステムをインポートする',
            out: 'ファイルシステムをエクスポートする',
            list: '[STR] にあるすべてのファイルをリストする',
            search: '[STR] を検索する'
        }
    });

    const folder = 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIyOC40NjI1IiBoZWlnaHQ9IjI3LjciIHZpZXdCb3g9IjAsMCwyOC40NjI1LDI3LjciPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMjYuMDE5NTMsLTE2NC4xMTg3NSkiPjxnIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2lzUGFpbnRpbmdMYXllciZxdW90Ozp0cnVlfSIgZmlsbD0iIzk5NjZmZiIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgZm9udC1mYW1pbHk9IlNhbnMgU2VyaWYiIGZvbnQtd2VpZ2h0PSJub3JtYWwiIGZvbnQtc2l6ZT0iNDAiIHRleHQtYW5jaG9yPSJzdGFydCIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjx0ZXh0IHRyYW5zZm9ybT0idHJhbnNsYXRlKDIyNi4yNjk1MywxODUuNzY4NzUpIHNjYWxlKDAuNSwwLjUpIiBmb250LXNpemU9IjQwIiB4bWw6c3BhY2U9InByZXNlcnZlIiBmaWxsPSIjOTk2NmZmIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBmb250LWZhbWlseT0iU2FucyBTZXJpZiIgZm9udC13ZWlnaHQ9Im5vcm1hbCIgdGV4dC1hbmNob3I9InN0YXJ0IiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHRzcGFuIHg9IjAiIGR5PSIwIj7wn5OBPC90c3Bhbj48L3RleHQ+PC9nPjwvZz48L3N2Zz48IS0tcm90YXRpb25DZW50ZXI6MTMuOTgwNDY4NzU6MTUuODgxMjQ5MjM3MDYwNTMtLT4=';
    const file = 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIyOC40NjI1IiBoZWlnaHQ9IjI3LjciIHZpZXdCb3g9IjAsMCwyOC40NjI1LDI3LjciPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMjYuMDE5NTMsLTE2NC4xMTg3NSkiPjxnIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2lzUGFpbnRpbmdMYXllciZxdW90Ozp0cnVlfSIgZmlsbD0iIzk5NjZmZiIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgZm9udC1mYW1pbHk9IlNhbnMgU2VyaWYiIGZvbnQtd2VpZ2h0PSJub3JtYWwiIGZvbnQtc2l6ZT0iNDAiIHRleHQtYW5jaG9yPSJzdGFydCIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjx0ZXh0IHRyYW5zZm9ybT0idHJhbnNsYXRlKDIyNi4yNjk1MywxODUuNzY4NzUpIHNjYWxlKDAuNSwwLjUpIiBmb250LXNpemU9IjQwIiB4bWw6c3BhY2U9InByZXNlcnZlIiBmaWxsPSIjOTk2NmZmIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBmb250LWZhbWlseT0iU2FucyBTZXJpZiIgZm9udC13ZWlnaHQ9Im5vcm1hbCIgdGV4dC1hbmNob3I9InN0YXJ0IiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHRzcGFuIHg9IjAiIGR5PSIwIj7wn5ODPC90c3Bhbj48L3RleHQ+PC9nPjwvZz48L3N2Zz48IS0tcm90YXRpb25DZW50ZXI6MTMuOTgwNDY4NzU6MTUuODgxMjQ5NjE4NTMwMjYyLS0+';

    class rxFS {
        constructor() {
            this.rxFSfi = [];
            this.rxFSsy = [];
            if (Object.prototype.hasOwnProperty.call(Scratch.vm.runtime.extensionStorage, 'rxfs'))
                this.in({ STR: Scratch.vm.runtime.extensionStorage.rxfs });
            else
                Scratch.vm.runtime.extensionStorage.rxfs = '';
        }
        getInfo() {
            return {
                id: 'rxfs',
                name: 'rxFS',
                color1: '#192d50',
                color2: '#192d50',
                color3: '#192d50',
                blocks: [
                    {
                        func: "save",
                        blockType: Scratch.BlockType.BUTTON,
                        text: '保存文件系统'
                    },
                    {
                        blockIconURI: file,
                        opcode: 'start',
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate({ id: 'start', default: 'Create [STR]' }),
                        arguments: {
                            STR: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '/rxFS/example'
                            }
                        }
                    },
                    {
                        blockIconURI: file,
                        opcode: 'folder',
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate({ id: 'folder', default: 'Set [STR] to [STR2]' }),
                        arguments: {
                            STR: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '/rxFS/example'
                            },
                            STR2: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: Scratch.translate({ id: 'folder_default', default: 'rxFS 3!' }),
                            }
                        }
                    },
                    {
                        blockIconURI: file,
                        opcode: 'sync',
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate({ id: 'sync', default: 'Change the location of [STR] to [STR2]' }),
                        arguments: {
                            STR: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '/rxFS/example'
                            },
                            STR2: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '/rxFS/example'
                            }
                        }
                    },
                    {
                        blockIconURI: file,
                        opcode: 'del',
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate({ id: 'del', default: 'Delete [STR]' }),
                        arguments: {
                            STR: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '/rxFS/example'
                            }
                        }
                    },
                    {
                        blockIconURI: file,
                        opcode: 'webin',
                        blockType: Scratch.BlockType.REPORTER,
                        text: Scratch.translate({ id: 'webin', default: 'Load [STR] from the web' }),
                        arguments: {
                            STR: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'https://0832k12.github.io/rxFS/hello.txt'
                            }
                        }
                    },
                    {
                        blockIconURI: file,
                        opcode: 'open',
                        blockType: Scratch.BlockType.REPORTER,
                        text: Scratch.translate({ id: 'open', default: 'Open [STR]' }),
                        arguments: {
                            STR: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '/rxFS/example'
                            }
                        }
                    },
                    '---',
                    {
                        blockIconURI: folder,
                        opcode: 'clean',
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate({ id: 'clean', default: 'Clear the file system' }),
                        arguments: {}
                    },
                    {
                        blockIconURI: folder,
                        opcode: 'in',
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate({ id: 'in', default: 'Import file system from [STR]' }),
                        arguments: {
                            STR: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '/rxFS/'
                            }
                        }
                    },
                    {
                        blockIconURI: folder,
                        opcode: 'out',
                        blockType: Scratch.BlockType.REPORTER,
                        text: Scratch.translate({ id: 'out', default: 'Export file system' }),
                        arguments: {}
                    },
                    {
                        blockIconURI: folder,
                        opcode: 'list',
                        blockType: Scratch.BlockType.REPORTER,
                        text: Scratch.translate({ id: 'list', default: 'List all files under [STR]' }),
                        arguments: {
                            STR: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '/rxFS/'
                            }
                        }
                    },
                    {
                        blockIconURI: folder,
                        opcode: 'search',
                        blockType: Scratch.BlockType.REPORTER,
                        text: Scratch.translate({ id: 'search', default: 'Search [STR]' }),
                        arguments: {
                            STR: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '/rxFS/example'
                            }
                        }
                    },
                    {
                        blockIconURI: folder,
                        opcode: 'searchin',
                        blockType: Scratch.BlockType.REPORTER,
                        text: Scratch.translate({ id: 'searchin', default: 'Search file contents [STR]' }),
                        arguments: {
                            STR: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: ''
                            }
                        }
                    }
                ]
            };
        }
        save() {
            Scratch.vm.runtime.extensionStorage.rxfs = this.out();
        }

        clean() {
            this.rxFSfi = [];
            this.rxFSsy = [];
        }

        sync({ STR, STR2 }) {
            var str = STR;
            var str2 = STR2;
            if (this.rxFSsy.indexOf(str) + 1 == 0) {
                this.rxFSsy[((this.rxFSsy.indexOf(str) + 1) - 1)] = str2;
            }
        }

        start({ STR }) {
            var str = STR;
            if (!(str.charAt((str.length - 1)) == '/') && this.rxFSsy.indexOf(str) + 1 == 0) {
                this.rxFSfi.splice(((this.rxFSfi.length + 1) - 1), 0, null);
                this.rxFSsy.splice(((this.rxFSsy.length + 1) - 1), 0, str);
            }
        }

        open({ STR }) {
            return this.rxFSfi[((this.rxFSsy.indexOf(STR) + 1) - 1)];
        }

        del({ STR }) {
            var str = STR;
            this.rxFSfi[((this.rxFSsy.indexOf(str) + 1) - 1)] = void 0;
            this.rxFSsy[((this.rxFSsy.indexOf(str) + 1) - 1)] = void 0;
        }

        folder({ STR, STR2 }) {
            this.rxFSfi[((this.rxFSsy.indexOf(STR) + 1) - 1)] = STR2;
        }

        searchin({ STR }) {
            var Search = [];
            var i;
            for (var i_index in this.rxFSfi) {
                i = this.rxFSfi[i_index];
                if (i.indexOf(STR) + 1 != 0) {
                    Search.push(this.rxFSsy[i_index]);
                }
            }
            return JSON.stringify(Search);
        }

        search({ STR }) {
            var Search = [];
            var i;
            for (var i_index in this.rxFSsy) {
                i = this.rxFSsy[i_index];
                if (i.indexOf(STR) + 1 != 0) {
                    Search.push(i);
                }
            }
            return JSON.stringify(Search);
        }

        list({ STR }) {
            var Search = [];
            var i;
            if (STR.slice(-1) == '/') {
                for (var i_index in this.rxFSsy) {
                    i = this.rxFSsy[i_index];
                    if (i.indexOf(STR) + 1 == 1) {
                        Search.push(i);
                    }
                }
            }
            return JSON.stringify(Search);
        }

        async webin({ STR }) {
            try {
                const response = await fetch(STR);
                return await response.text();
            } catch (error) {
                console.error(error);
                return 'error';
            }
        }

        in({ STR }) {
            this.rxFSfi = JSON.parse(decodeURIComponent(STR.slice(0, (STR.indexOf('|') + 1) - 1)));
            this.rxFSsy = JSON.parse(decodeURIComponent(STR.slice(((STR.indexOf('|') + 1 + 1) - 1), STR.length)));
        }

        out() {
            return encodeURIComponent(JSON.stringify(this.rxFSfi)) + '|' + encodeURIComponent(JSON.stringify(this.rxFSsy));
        }
    }

    Scratch.extensions.register(new rxFS());
})(Scratch);