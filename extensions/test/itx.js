(function (Scratch) {
    const vm = Scratch.vm;
    const projectjson = vm.toJSON()
    console.log(projectjson);
    class itx {
        getInfo() {
            return {
                id: 'itx',
                name: 'itx',
                blocks: [
                    {
                        opcode: 'loadproject',
                        text: '加载作品 [json]',
                        blockType: Scratch.BlockType.COMMAND,
                        arguments: {
                            json: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '{"targets":[],"monitors":[],"extensions":[],"meta":{"semver":"3.0.0","vm":"0.2.0","agent":""}}'
                            }
                        }
                    },
                ],
            }
        }
        loadproject(json) {
            console.log(json);
            vm.loadProject(json.json);
        }
    }
    Scratch.extensions.register(new itx());
})(Scratch);