(function (Scratch) {
    'use strict';
    const normalHanzi = /^[\u4e00-\u9fff\u3400-\u4dbf\ud840-\ud87f\ud880-\ud8bf\ud8c0-\ud8ff\ud900-\ud93f\ud940-\ud97f\ud980-\ud9bf\ud9c0-\ud9ff\u2e80-\u2eff\u2f00-\u2fdf\u2ff0-\u2fff\u3000-\u303f\u31c0-\u31ef\u3200-\u32ff\u3300-\u33ff\u3400-\u4dbf\u4e00-\u9fff\uac00-\ud7af\uf900-\ufaff]+$/
    function hanziNumber(num, type) {
        let unitsAndNum;
        if (type == 'uppercase') unitsAndNum = {
            nums: ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'],
            intRadice: ['', '拾', '佰', '仟'],
            intUnits: ['', '万', '亿', '兆', '京', '垓', '秭', '穣', '沟', '涧', '正', '载', '极', '恒河沙', '阿僧祇', '那由他', '不可思议', '无量大数'],
            decUnits: '点',
            minus: '负',
            units: true
        };
        else if (type == 'japanese') unitsAndNum = {
            nums: ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'],
            intRadice: ['', '十', '百', '千'],
            intUnits: ['', '万', '億', '兆', '京', '垓', '秭', '穣', '溝', '涧', '正', '載', '極', '恒河沙', '阿僧祇', '那由他', '不可思議', '無量大数'],
            decUnits: '点',
            minus: '負',
            skipOneForUnits: true,
            units: true
        };
        else if (type == 'unitless') unitsAndNum = {
            nums: ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'],
            intRadice: '',
            intUnits: '',
            decUnits: '点',
            minus: '負',
            units: false
        };
        else unitsAndNum = {
            nums: ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'],
            intRadice: ['', '十', '百', '千'],
            intUnits: ['', '万', '亿', '兆', '京', '垓', '秭', '穣', '沟', '涧', '正', '载', '极', '恒河沙', '阿僧祇', '那由他', '不可思议', '无量大数'],
            decUnits: '点',
            minus: '负',
            units: true
        };
        let strNum = String(num);
        let isNegative = strNum[0] == '-';
        if (isNegative) strNum = strNum.substring(1);
        let decimalIndex = strNum.indexOf('.');
        let strInt = strNum;
        let strDec = '';
        if (decimalIndex != -1) {
            strInt = strNum.substring(0, decimalIndex);
            strDec = strNum.substring(decimalIndex + 1);
        }
        let numInt = '';
        let len = strInt.length;
        if (len > 0 && (num >= 1 || num <= -1)) {
            let zeroCount = 0;
            for (let i = 0; i < len; i++) {
                let n = strInt[i];
                let p = len - i - 1;
                let q = p / 4;
                let m = p % 4;
                if (n == '0' && unitsAndNum.units) {
                    zeroCount++;
                } else {
                    if (zeroCount > 0) {
                        numInt += unitsAndNum.nums[0];
                    }
                    zeroCount = 0;
                    if (unitsAndNum.skipOneForUnits && n == '1' && m > 0 && unitsAndNum.units) {
                        numInt += unitsAndNum.intRadice[m];
                    } else {
                        numInt += unitsAndNum.nums[parseInt(n)] + (unitsAndNum.units ? unitsAndNum.intRadice[m] : '');
                    }
                }
                if ((m == 0 && zeroCount < 4) && unitsAndNum.units) {
                    numInt += unitsAndNum.intUnits[q];
                }
            }
        } else {
            numInt = unitsAndNum.nums[0];
        }
        let dec = '';
        if (strDec != '') {
            for (let i = 0; i < strDec.length; i++) {
                dec += unitsAndNum.nums[parseInt(strDec[i])];
            }
        }
        return (isNegative ? unitsAndNum.minus : '') + numInt + (dec == '' ? '' : unitsAndNum.decUnits + dec);
    }

    class hanzi {
        getInfo() {
            return {
                id: 'hanzi',
                name: '漢字',
                color1: '#E62F00',
                color2: '#CF2A00',
                color3: '#B82600',
                blocks: [
                    {
                        opcode: 'hanziNumber',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '[type] 数字 [number]',
                        arguments: {
                            type: {
                                type: Scratch.ArgumentType.NUMBER,
                                menu: 'type'
                            },
                            number: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: ''
                            }
                        }
                    },
                    '---',
                    {
                        opcode: 'normalHanzi',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: '[text] 為漢字？',
                        arguments: {
                            text: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '字'
                            }
                        }
                    },
                ],
                menus: {
                    type: {
                        acceptReporters: true,
                        items: [
                            {
                                text: '中文漢字',
                                value: 'normal'
                            },
                            {
                                text: '中文漢字大寫',
                                value: 'uppercase'
                            },
                            {
                                text: '日本語漢字',
                                value: 'japanese'
                            },
                            {
                                text: '無單位漢字',
                                value: 'unitless'
                            }
                        ]
                    }
                }
            };
        }
        hanziNumber({ type, number }) {
            return hanziNumber(number, type);
        }
        normalHanzi({ text }) {
            return normalHanzi.test(text);
        }
    }
    Scratch.extensions.register(new hanzi());
})(Scratch);
