((Scratch) => {
    'use strict';

    const { Cast, ArgumentType, BlockType, TargetType } = Scratch;

    Scratch.translate.setup({
        "zh-tw": {
            "MOTION_EXT_NAME": "動作",
            "MOTION_TEXT": "目前選擇的物件是「舞台」：無可用的動作積木",
            "MOTION_MOVE_EDGE": "貼到邊緣：[EDGE]",
            "MOTION_EDGE.TOP": "上",
            "MOTION_EDGE.BOTTOM": "下",
            "MOTION_EDGE.LEFT": "左",
            "MOTION_EDGE.RIGHT": "右",
            "MOTION_EDGE.TOP_AND_LEFT": "左上",
            "MOTION_EDGE.TOP_AND_RIGHT": "右上",
            "MOTION_EDGE.BOTTOM_AND_LEFT": "左下",
            "MOTION_EDGE.BOTTOM_AND_RIGHT": "右下",
            "MOTION_POINT_IN_DIRECTION": "面朝 x: [X] y: [Y]",
            "MOTION_MOVE_TOWARDS": "朝 x: [X] y: [Y] 移動 [STEPS] 點",
            "MOTION_MOVE_WITH_ANGLE": "朝 [ANGLE] 度移動 [STEPS] 點",
            "MOTION_MOVE_WITH_DIRECTION": "[DIRECTION] 移動 [STEPS] 點",
            "MOTION_EDGE.FORWARD": "向前",
            "MOTION_EDGE.BACK": "向後",
            "MOTION_EDGE.UP": "向上",
            "MOTION_EDGE.DOWN": "向下",
            "MOTION_SET_DISTANCE": "在 [DIRECTION] 度方向，設定與 x: [X] y: [Y] 的距離為 [DISTANCE]",
            "MOTION_TURN_RIGHT_AROUND": "圍繞 x: [X] y: [Y] 右轉 [ICON] [ANGLE] 度",
            "MOTION_TURN_LEFT_AROUND": "圍繞 x: [X] y: [Y] 左轉 [ICON] [ANGLE] 度",
            "MOTION_RESTRICT_EDGE": "限制在邊緣内"
        },
        "zh": {
            "MOTION_EXT_NAME": "运动",
            "MOTION_TEXT": "选中了舞台：不可使用运动类积木",
            "MOTION_MOVE_EDGE": "贴到边缘：[EDGE]",
            "MOTION_EDGE.TOP": "上",
            "MOTION_EDGE.BOTTOM": "下",
            "MOTION_EDGE.LEFT": "左",
            "MOTION_EDGE.RIGHT": "右",
            "MOTION_EDGE.TOP_AND_LEFT": "左上",
            "MOTION_EDGE.TOP_AND_RIGHT": "右上",
            "MOTION_EDGE.BOTTOM_AND_LEFT": "左下",
            "MOTION_EDGE.BOTTOM_AND_RIGHT": "右下",
            "MOTION_POINT_IN_DIRECTION": "面向 x: [X] y: [Y]",
            "MOTION_MOVE_TOWARDS": "向 x: [X] y: [Y] 移动 [STEPS] 步",
            "MOTION_MOVE_WITH_ANGLE": "向 [ANGLE] 度移动 [STEPS] 步",
            "MOTION_MOVE_WITH_DIRECTION": "[DIRECTION] [STEPS] 步",
            "MOTION_EDGE.FORWARD": "前进",
            "MOTION_EDGE.BACK": "后退",
            "MOTION_EDGE.UP": "上升",
            "MOTION_EDGE.DOWN": "下降",
            "MOTION_SET_DISTANCE": "在 [DIRECTION] 度方向，设置与 x: [X] y: [Y] 的距离为 [DISTANCE]",
            "MOTION_TURN_RIGHT_AROUND": "围绕 x: [X] y: [Y] 右转 [ICON] [ANGLE] 度",
            "MOTION_TURN_LEFT_AROUND": "围绕 x: [X] y: [Y] 左转 [ICON] [ANGLE] 度",
            "MOTION_RESTRICT_EDGE": "限制在边缘内"
        }
    });
    const formatMessage = Scratch.translate;

    const turnRightIcon = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgaWQ9InJvdGF0ZS1jb3VudGVyLWNsb2Nrd2lzZSIKICAgdmlld0JveD0iMCAwIDI0IDI0IgogICB2ZXJzaW9uPSIxLjEiCiAgIHNvZGlwb2RpOmRvY25hbWU9InJvdGF0ZS1yaWdodC5zdmciCiAgIGlua3NjYXBlOnZlcnNpb249IjEuMiAoZGMyYWVkYWYwMywgMjAyMi0wNS0xNSkiCiAgIHhtbG5zOmlua3NjYXBlPSJodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy9uYW1lc3BhY2VzL2lua3NjYXBlIgogICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIgogICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIgogICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iPgogIDxzb2RpcG9kaTpuYW1lZHZpZXcKICAgICBpZD0ibmFtZWR2aWV3MzkzNyIKICAgICBwYWdlY29sb3I9IiNmZmZmZmYiCiAgICAgYm9yZGVyY29sb3I9IiMwMDAwMDAiCiAgICAgYm9yZGVyb3BhY2l0eT0iMC4yNSIKICAgICBpbmtzY2FwZTpzaG93cGFnZXNoYWRvdz0iMiIKICAgICBpbmtzY2FwZTpwYWdlb3BhY2l0eT0iMC4wIgogICAgIGlua3NjYXBlOnBhZ2VjaGVja2VyYm9hcmQ9IjAiCiAgICAgaW5rc2NhcGU6ZGVza2NvbG9yPSIjZDFkMWQxIgogICAgIHNob3dncmlkPSJmYWxzZSIKICAgICBpbmtzY2FwZTp6b29tPSIzNC45MTY2NjciCiAgICAgaW5rc2NhcGU6Y3g9IjkuMzA3ODc1OSIKICAgICBpbmtzY2FwZTpjeT0iMTIuMDE0MzIiCiAgICAgaW5rc2NhcGU6d2luZG93LXdpZHRoPSIxOTIwIgogICAgIGlua3NjYXBlOndpbmRvdy1oZWlnaHQ9IjEwMTciCiAgICAgaW5rc2NhcGU6d2luZG93LXg9Ii04IgogICAgIGlua3NjYXBlOndpbmRvdy15PSItOCIKICAgICBpbmtzY2FwZTp3aW5kb3ctbWF4aW1pemVkPSIxIgogICAgIGlua3NjYXBlOmN1cnJlbnQtbGF5ZXI9InJvdGF0ZS1jb3VudGVyLWNsb2Nrd2lzZSIgLz4KICA8ZGVmcwogICAgIGlkPSJkZWZzMzkyOCI+CiAgICA8c3R5bGUKICAgICAgIGlkPSJzdHlsZTM5MjYiPi5jbHMtMXtmaWxsOiMzZDc5Y2M7fS5jbHMtMntmaWxsOiNmZmY7fTwvc3R5bGU+CiAgPC9kZWZzPgogIDx0aXRsZQogICAgIGlkPSJ0aXRsZTM5MzAiPnJvdGF0ZS1jb3VudGVyLWNsb2Nrd2lzZTwvdGl0bGU+CiAgPHBhdGgKICAgICBjbGFzcz0iY2xzLTEiCiAgICAgZD0iTTIyLjY4LDEyLjJhMS42LDEuNiwwLDAsMS0xLjI3LjYzSDEzLjcyYTEuNTksMS41OSwwLDAsMS0xLjE2LTIuNThsMS4xMi0xLjQxYTQuODIsNC44MiwwLDAsMC0zLjE0LS43Nyw0LjMxLDQuMzEsMCwwLDAtMiwuOCw0LjI1LDQuMjUsMCwwLDAtMS4zNCwxLjczLDUuMDYsNS4wNiwwLDAsMCwuNTQsNC42MkE1LjU4LDUuNTgsMCwwLDAsMTIsMTcuNzRoMGEyLjI2LDIuMjYsMCwwLDEtLjE2LDQuNTJBMTAuMjUsMTAuMjUsMCwwLDEsMy43NCwxOCwxMC4xNCwxMC4xNCwwLDAsMSwyLjI1LDguNzgsOS43LDkuNywwLDAsMSw1LjA4LDQuNjQsOS45Miw5LjkyLDAsMCwxLDkuNjYsMi41YTEwLjY2LDEwLjY2LDAsMCwxLDcuNzIsMS42OGwxLjA4LTEuMzVhMS41NywxLjU3LDAsMCwxLDEuMjQtLjYsMS42LDEuNiwwLDAsMSwxLjU0LDEuMjFsMS43LDcuMzdBMS41NywxLjU3LDAsMCwxLDIyLjY4LDEyLjJaIgogICAgIGlkPSJwYXRoMzkzMiIKICAgICBzdHlsZT0iZmlsbDojMDAwMDAwO2ZpbGwtb3BhY2l0eToxO29wYWNpdHk6MC4yIiAvPgogIDxwYXRoCiAgICAgY2xhc3M9ImNscy0yIgogICAgIGQ9Ik0yMS4zOCwxMS44M0gxMy43N2EuNTkuNTksMCwwLDEtLjQzLTFsMS43NS0yLjE5YTUuOSw1LjksMCwwLDAtNC43LTEuNTgsNS4wNyw1LjA3LDAsMCwwLTQuMTEsMy4xN0E2LDYsMCwwLDAsNywxNS43N2E2LjUxLDYuNTEsMCwwLDAsNSwyLjkyLDEuMzEsMS4zMSwwLDAsMS0uMDgsMi42Miw5LjMsOS4zLDAsMCwxLTcuMzUtMy44MkE5LjE2LDkuMTYsMCwwLDEsMy4xNyw5LjEyLDguNTEsOC41MSwwLDAsMSw1LjcxLDUuNCw4Ljc2LDguNzYsMCwwLDEsOS44MiwzLjQ4YTkuNzEsOS43MSwwLDAsMSw3Ljc1LDIuMDdsMS42Ny0yLjFhLjU5LjU5LDAsMCwxLDEsLjIxTDIyLDExLjA4QS41OS41OSwwLDAsMSwyMS4zOCwxMS44M1oiCiAgICAgaWQ9InBhdGgzOTM0IiAvPgogIDxtZXRhZGF0YQogICAgIGlkPSJtZXRhZGF0YTQ0MTkiPgogICAgPHJkZjpSREY+CiAgICAgIDxjYzpXb3JrCiAgICAgICAgIHJkZjphYm91dD0iIj4KICAgICAgICA8ZGM6dGl0bGU+cm90YXRlLWNvdW50ZXItY2xvY2t3aXNlPC9kYzp0aXRsZT4KICAgICAgPC9jYzpXb3JrPgogICAgPC9yZGY6UkRGPgogIDwvbWV0YWRhdGE+Cjwvc3ZnPgo=';
    const turnLeftIcon = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgaWQ9InJvdGF0ZS1jbG9ja3dpc2UiCiAgIHZpZXdCb3g9IjAgMCAyNCAyNCIKICAgdmVyc2lvbj0iMS4xIgogICBzb2RpcG9kaTpkb2NuYW1lPSJyb3RhdGUtbGVmdC5zdmciCiAgIGlua3NjYXBlOnZlcnNpb249IjEuMiAoZGMyYWVkYWYwMywgMjAyMi0wNS0xNSkiCiAgIHhtbG5zOmlua3NjYXBlPSJodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy9uYW1lc3BhY2VzL2lua3NjYXBlIgogICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHNvZGlwb2RpOm5hbWVkdmlldwogICAgIGlkPSJuYW1lZHZpZXc2MjYzIgogICAgIHBhZ2Vjb2xvcj0iI2ZmZmZmZiIKICAgICBib3JkZXJjb2xvcj0iIzAwMDAwMCIKICAgICBib3JkZXJvcGFjaXR5PSIwLjI1IgogICAgIGlua3NjYXBlOnNob3dwYWdlc2hhZG93PSIyIgogICAgIGlua3NjYXBlOnBhZ2VvcGFjaXR5PSIwLjAiCiAgICAgaW5rc2NhcGU6cGFnZWNoZWNrZXJib2FyZD0iMCIKICAgICBpbmtzY2FwZTpkZXNrY29sb3I9IiNkMWQxZDEiCiAgICAgc2hvd2dyaWQ9ImZhbHNlIgogICAgIGlua3NjYXBlOnpvb209IjM0LjkxNjY2NyIKICAgICBpbmtzY2FwZTpjeD0iOS4zMDc4NzU5IgogICAgIGlua3NjYXBlOmN5PSIxMi4wMTQzMiIKICAgICBpbmtzY2FwZTp3aW5kb3ctd2lkdGg9IjE5MjAiCiAgICAgaW5rc2NhcGU6d2luZG93LWhlaWdodD0iMTAxNyIKICAgICBpbmtzY2FwZTp3aW5kb3cteD0iLTgiCiAgICAgaW5rc2NhcGU6d2luZG93LXk9Ii04IgogICAgIGlua3NjYXBlOndpbmRvdy1tYXhpbWl6ZWQ9IjEiCiAgICAgaW5rc2NhcGU6Y3VycmVudC1sYXllcj0icm90YXRlLWNsb2Nrd2lzZSIgLz4KICA8ZGVmcwogICAgIGlkPSJkZWZzNjI1NCI+CiAgICA8c3R5bGUKICAgICAgIGlkPSJzdHlsZTYyNTIiPi5jbHMtMXtmaWxsOiMzZDc5Y2M7fS5jbHMtMntmaWxsOiNmZmY7fTwvc3R5bGU+CiAgPC9kZWZzPgogIDx0aXRsZQogICAgIGlkPSJ0aXRsZTYyNTYiPnJvdGF0ZS1jbG9ja3dpc2U8L3RpdGxlPgogIDxwYXRoCiAgICAgY2xhc3M9ImNscy0xIgogICAgIGQ9Ik0yMC4zNCwxOC4yMWExMC4yNCwxMC4yNCwwLDAsMS04LjEsNC4yMiwyLjI2LDIuMjYsMCwwLDEtLjE2LTQuNTJoMGE1LjU4LDUuNTgsMCwwLDAsNC4yNS0yLjUzLDUuMDYsNS4wNiwwLDAsMCwuNTQtNC42MkE0LjI1LDQuMjUsMCwwLDAsMTUuNTUsOWE0LjMxLDQuMzEsMCwwLDAtMi0uOEE0LjgyLDQuODIsMCwwLDAsMTAuNCw5bDEuMTIsMS40MUExLjU5LDEuNTksMCwwLDEsMTAuMzYsMTNIMi42N2ExLjU2LDEuNTYsMCwwLDEtMS4yNi0uNjNBMS41NCwxLjU0LDAsMCwxLDEuMTMsMTFMMi44NSwzLjU3QTEuNTksMS41OSwwLDAsMSw0LjM4LDIuNCwxLjU3LDEuNTcsMCwwLDEsNS42MiwzTDYuNyw0LjM1YTEwLjY2LDEwLjY2LDAsMCwxLDcuNzItMS42OEE5Ljg4LDkuODgsMCwwLDEsMTksNC44MSw5LjYxLDkuNjEsMCwwLDEsMjEuODMsOSwxMC4wOCwxMC4wOCwwLDAsMSwyMC4zNCwxOC4yMVoiCiAgICAgaWQ9InBhdGg2MjU4IgogICAgIHN0eWxlPSJmaWxsOiMwMDAwMDA7ZmlsbC1vcGFjaXR5OjE7b3BhY2l0eTowLjIiIC8+CiAgPHBhdGgKICAgICBjbGFzcz0iY2xzLTIiCiAgICAgZD0iTTE5LjU2LDE3LjY1YTkuMjksOS4yOSwwLDAsMS03LjM1LDMuODMsMS4zMSwxLjMxLDAsMCwxLS4wOC0yLjYyLDYuNTMsNi41MywwLDAsMCw1LTIuOTIsNi4wNSw2LjA1LDAsMCwwLC42Ny01LjUxLDUuMzIsNS4zMiwwLDAsMC0xLjY0LTIuMTYsNS4yMSw1LjIxLDAsMCwwLTIuNDgtMUE1Ljg2LDUuODYsMCwwLDAsOSw4Ljg0TDEwLjc0LDExYS41OS41OSwwLDAsMS0uNDMsMUgyLjdhLjYuNiwwLDAsMS0uNi0uNzVMMy44MSwzLjgzYS41OS41OSwwLDAsMSwxLS4yMWwxLjY3LDIuMWE5LjcxLDkuNzEsMCwwLDEsNy43NS0yLjA3LDguODQsOC44NCwwLDAsMSw0LjEyLDEuOTIsOC42OCw4LjY4LDAsMCwxLDIuNTQsMy43MkE5LjE0LDkuMTQsMCwwLDEsMTkuNTYsMTcuNjVaIgogICAgIGlkPSJwYXRoNjI2MCIgLz4KPC9zdmc+Cg==';

    class MOTION {
        getInfo() {
            return {
                color1: '#6780f1',
                color2: '#5266C1',
                color3: '#5C73D8',
                id: 'MOTION',
                name: formatMessage({
                    id: 'MOTION_EXT_NAME',
                    default: 'Motion'
                }),
                blocks: [
                    {
                        filter: [TargetType.STAGE],
                        blockType: BlockType.LABEL,
                        text: formatMessage({
                            id: 'MOTION_TEXT',
                            default: 'Stage selected: no motion blocks'
                        })
                    },
                    {
                        opcode: 'moveEdge',
                        filter: [TargetType.SPRITE],
                        blockType: BlockType.COMMAND,
                        text: formatMessage({
                            id: 'MOTION_MOVE_EDGE',
                            default: 'move to Edge: [EDGE]'
                        }),
                        arguments: {
                            EDGE: {
                                type: ArgumentType.STRING,
                                menu: 'EDGE'
                            }
                        }
                    },
                    '---',
                    {
                        opcode: 'pointInDirectionXY',
                        filter: [TargetType.SPRITE],
                        blockType: BlockType.COMMAND,
                        text: formatMessage({
                            id: 'MOTION_POINT_IN_DIRECTION',
                            default: 'point in direction x: [X] y: [Y]'
                        }),
                        arguments: {
                            X: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '0'
                            },
                            Y: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '0'
                            }
                        }
                    },
                    {
                        opcode: 'moveTowards',
                        filter: [TargetType.SPRITE],
                        blockType: BlockType.COMMAND,
                        text: formatMessage({
                            id: 'MOTION_MOVE_TOWARDS',
                            default: 'move [STEPS] steps towards x: [X] y: [Y]'
                        }),
                        arguments: {
                            STEPS: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '10'
                            },
                            X: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '0'
                            },
                            Y: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '0'
                            }
                        }
                    },
                    '---',
                    {
                        opcode: 'moveWithAngle',
                        filter: [TargetType.SPRITE],
                        blockType: BlockType.COMMAND,
                        text: formatMessage({
                            id: 'MOTION_MOVE_WITH_ANGLE',
                            default: 'move [STEPS] steps with angle [ANGLE]'
                        }),
                        arguments: {
                            STEPS: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '10'
                            },
                            ANGLE: {
                                type: ArgumentType.ANGLE,
                                defaultValue: '90'
                            }
                        }
                    },
                    {
                        opcode: 'moveWithDirction',
                        filter: [TargetType.SPRITE],
                        blockType: BlockType.COMMAND,
                        text: formatMessage({
                            id: 'MOTION_MOVE_WITH_DIRECTION',
                            default: 'move [DIRECTION] [STEPS] steps'
                        }),
                        arguments: {
                            STEPS: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '10'
                            },
                            DIRECTION: {
                                type: ArgumentType.ANGLE,
                                menu: 'DIRECTION'
                            }
                        }
                    },
                    '---',
                    {
                        opcode: 'setDistance',
                        filter: [TargetType.SPRITE],
                        blockType: BlockType.COMMAND,
                        text: formatMessage({
                            id: 'MOTION_SET_DISTANCE',
                            default: 'set distance to [DISTANCE] in direction [DIRECTION] from x: [X] y: [Y]'
                        }),
                        arguments: {
                            X: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '0'
                            },
                            Y: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '0'
                            },
                            DISTANCE: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '100'
                            },
                            DIRECTION: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '90'
                            }
                        }
                    },
                    {
                        opcode: 'turnRightAround',
                        filter: [TargetType.SPRITE],
                        blockType: BlockType.COMMAND,
                        text: formatMessage({
                            id: 'MOTION_TURN_RIGHT_AROUND',
                            default: 'turn [ICON] [ANGLE] degrees around x: [X] y: [Y]'
                        }),
                        arguments: {
                            ICON: {
                                type: ArgumentType.IMAGE,
                                dataURI: turnRightIcon
                            },
                            X: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '0'
                            },
                            Y: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '0'
                            },
                            ANGLE: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '15'
                            }
                        }
                    },
                    {
                        opcode: 'turnLeftAround',
                        filter: [TargetType.SPRITE],
                        blockType: BlockType.COMMAND,
                        text: formatMessage({
                            id: 'MOTION_TURN_LEFT_AROUND',
                            default: 'turn [ICON] [ANGLE] degrees around x: [X] y: [Y]'
                        }),
                        arguments: {
                            ICON: {
                                type: ArgumentType.IMAGE,
                                dataURI: turnLeftIcon
                            },
                            X: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '0'
                            },
                            Y: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '0'
                            },
                            ANGLE: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '15'
                            }
                        }
                    },
                    '---',
                    {
                        opcode: 'restrictEdge',
                        filter: [TargetType.SPRITE],
                        blockType: BlockType.COMMAND,
                        text: formatMessage({
                            id: 'MOTION_RESTRICT_EDGE',
                            default: 'restrict in edge'
                        })
                    }
                ],
                menus: {
                    EDGE: {
                        acceptReporters: false,
                        items: [
                            {
                                text: formatMessage({
                                    id: 'MOTION_EDGE.TOP',
                                    default: 'top'
                                }),
                                value: 'Top'
                            },
                            {
                                text: formatMessage({
                                    id: 'MOTION_EDGE.BOTTOM',
                                    default: 'bottom'
                                }),
                                value: 'Bottom'
                            },
                            {
                                text: formatMessage({
                                    id: 'MOTION_EDGE.LEFT',
                                    default: 'left'
                                }),
                                value: 'Left'
                            },
                            {
                                text: formatMessage({
                                    id: 'MOTION_EDGE.RIGHT',
                                    default: 'right'
                                }),
                                value: 'Right'
                            },
                            {
                                text: formatMessage({
                                    id: 'MOTION_EDGE.TOP_AND_LEFT',
                                    default: 'top and left'
                                }),
                                value: 'Top,Left'
                            },
                            {
                                text: formatMessage({
                                    id: 'MOTION_EDGE.TOP_AND_RIGHT',
                                    default: 'top and right'
                                }),
                                value: 'Top,Right'
                            },
                            {
                                text: formatMessage({
                                    id: 'MOTION_EDGE.BOTTOM_AND_LEFT',
                                    default: 'bottom and left'
                                }),
                                value: 'Bottom,Left'
                            },
                            {
                                text: formatMessage({
                                    id: 'MOTION_EDGE.BOTTOM_AND_RIGHT',
                                    default: 'bottom and right'
                                }),
                                value: 'Bottom,Right'
                            }
                        ]
                    },
                    DIRECTION: {
                        acceptReporters: false,
                        items: [
                            {
                                text: formatMessage({
                                    id: 'MOTION_EDGE.FORWARD',
                                    default: 'forward'
                                }),
                                value: 'forward'
                            },
                            {
                                text: formatMessage({
                                    id: 'MOTION_EDGE.BACK',
                                    default: 'back'
                                }),
                                value: 'back'
                            },
                            {
                                text: formatMessage({
                                    id: 'MOTION_EDGE.UP',
                                    default: 'up'
                                }),
                                value: 'up'
                            },
                            {
                                text: formatMessage({
                                    id: 'MOTION_EDGE.DOWN',
                                    default: 'down'
                                }),
                                value: 'down'
                            }
                        ]
                    }
                }
            };
        }

        moveEdge(args, { target }) {
            let X = target.x,
                Y = target.y,
                bounds = target.getBounds(),
                width = vm.runtime.stageWidth,
                height = vm.runtime.stageHeight;
            if (args.EDGE.includes('Top') || args.EDGE.includes('Bottom')) {
                if (args.EDGE.includes('Top')) Y = height / 2 - Math.round(bounds.top - Y);
                if (args.EDGE.includes('Bottom')) Y = -(height / 2) + Math.round(Y - bounds.bottom);
            }
            if (args.EDGE.includes('Left') || args.EDGE.includes('Right')) {
                if (args.EDGE.includes('Left')) X = -(width / 2) + Math.round(X - bounds.left);
                if (args.EDGE.includes('Right')) X = width / 2 - Math.round(bounds.right - X);
            }
            target.setXY(X, Y);
        }

        pointInDirectionXY(args, { target }) {
            target.setDirection(this.calculateLineDirection(target.x, target.y, args.X, args.Y));
        }

        calculateLineDirection(X1, Y1, X2, Y2) {
            X1 = Cast.toNumber(X1);
            Y1 = Cast.toNumber(Y1);
            X2 = Cast.toNumber(X2);
            Y2 = Cast.toNumber(Y2);
            let angleRadians = Math.atan2(Y2 - Y1, X2 - X1);
            let angleDegrees = angleRadians * 180 / Math.PI;
            let scratchAngle = -angleDegrees + 90;
            if (scratchAngle < -180) {
                scratchAngle = 360 + scratchAngle;
            }
            else if (scratchAngle > 180) {
                scratchAngle = scratchAngle - 360;
            }
            return scratchAngle;
        }

        moveTowards(args, { target }) {
            const targetX = Cast.toNumber(args.X);
            const targetY = Cast.toNumber(args.Y);
            const steps = Cast.toNumber(args.STEPS);
            const distanceX = targetX - target.x;
            const distanceY = targetY - target.y;
            const totalDistance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
            if (totalDistance <= 0) return;
            const stepSize = Math.min(1, steps / totalDistance);
            const moveX = distanceX * stepSize;
            const moveY = distanceY * stepSize;
            target.setXY(target.x + moveX, target.y + moveY);
        }

        moveWithAngle(args, util) {
            const angle = this.degreesToRadians(
                -(Cast.toNumber(args.ANGLE) - 90));
            this.changeX({ DX: (Math.cos(angle)) * args.STEPS }, util);
            this.changeY({ DY: (Math.sin(angle)) * args.STEPS }, util);
        }

        moveWithDirction(args, util) {
            const UDLR = {
                up: 0, down: 180, forward: 90, back: -90
            };
            this.moveWithAngle({
                STEPS: args.STEPS,
                ANGLE: UDLR[args.DIRECTION] + util.target.direction - 90
            }, util);
        }

        changeX(args, util) {
            const dx = Cast.toNumber(args.DX);
            util.target.setXY(util.target.x + dx, util.target.y);
        }

        changeY(args, util) {
            const dy = Cast.toNumber(args.DY);
            util.target.setXY(util.target.x, util.target.y + dy);
        }

        setDistance(args, { target }) {
            const radius = Cast.toNumber(args.DISTANCE);
            const direction = Cast.toNumber(args.DIRECTION);
            target.setXY(
                args.X + (radius * Math.sin(this.degreesToRadians(direction))),
                args.Y + (radius * Math.cos(this.degreesToRadians(direction)))
            );
        }

        turnRightAround(args, { target }) {
            args.ANGLE = Cast.toNumber(args.ANGLE);
            const radius = this.calculateLineLength(args.X, args.Y, target.x, target.y);
            const direction = this.calculateLineDirection(args.X, args.Y, target.x, target.y)
            target.setXY(
                args.X + (radius * Math.sin(this.degreesToRadians(direction + args.ANGLE))),
                args.Y + (radius * Math.cos(this.degreesToRadians(direction + args.ANGLE)))
            );
            target.setDirection(target.direction + args.ANGLE);
        }

        turnLeftAround(args, { target }) {
            args.ANGLE = Cast.toNumber(args.ANGLE);
            const radius = this.calculateLineLength(args.X, args.Y, target.x, target.y);
            const direction = this.calculateLineDirection(args.X, args.Y, target.x, target.y)
            target.setXY(
                args.X + (radius * Math.sin(this.degreesToRadians(direction - args.ANGLE))),
                args.Y + (radius * Math.cos(this.degreesToRadians(direction - args.ANGLE)))
            );
            target.setDirection(target.direction - args.ANGLE);
        }

        calculateLineDirection(X1, Y1, X2, Y2) {
            X1 = Cast.toNumber(X1);
            Y1 = Cast.toNumber(Y1);
            X2 = Cast.toNumber(X2);
            Y2 = Cast.toNumber(Y2);
            let angleRadians = Math.atan2(Y2 - Y1, X2 - X1);
            let angleDegrees = angleRadians * 180 / Math.PI;
            let scratchAngle = -angleDegrees + 90;
            if (scratchAngle < -180) {
                scratchAngle = 360 + scratchAngle;
            }
            else if (scratchAngle > 180) {
                scratchAngle = scratchAngle - 360;
            }
            return scratchAngle;
        }

        calculateLineLength(X1, Y1, X2, Y2) {
            X1 = Cast.toNumber(X1);
            Y1 = Cast.toNumber(Y1);
            X2 = Cast.toNumber(X2);
            Y2 = Cast.toNumber(Y2);
            return Math.sqrt(Math.pow(X1 - X2, 2) + Math.pow(Y1 - Y2, 2));
        }

        degreesToRadians(degrees) {
            return degrees * (Math.PI / 180);
        }

        restrictEdge(args, util) {
            let bounds = util.target.getBounds(),
                width = vm.runtime.stageWidth,
                height = vm.runtime.stageHeight,
                edgeDirections = [];
            if (bounds.top > height / 2) edgeDirections.push('Top');
            if (bounds.bottom < -(height / 2)) edgeDirections.push('Bottom');
            if (bounds.left < -(width / 2)) edgeDirections.push('Left');
            if (bounds.right > width / 2) edgeDirections.push('Right');
            this.moveEdge({ EDGE: `${edgeDirections}` }, util)
        }
    }

    Scratch.extensions.register(new MOTION());
})(Scratch);
