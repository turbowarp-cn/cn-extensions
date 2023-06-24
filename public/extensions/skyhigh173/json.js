(function(Scratch) {
  'use strict';
  /*
  * JSON extension v2.5 by skyhigh173 (Chinese Version)
  * Do not remove this comment
  */

  const vm = Scratch.vm;
  const hasOwn = (obj, property) => Object.prototype.hasOwnProperty.call(obj, property);

  const makeLabel = (text) => ({
    blockType: 'label',
    text: text
  });

  class JSONS {
    getInfo() {
      return {
        id: 'skyhigh173JSON',
        name: 'JSON',
        color1: '#3271D0',
        blocks: [
          makeLabel('通用'),
          {
            opcode: 'json_is_valid',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'JSON [json] 是否有效',
            arguments: {
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '{"key":"value"}'
              }
            }
          },
          {
            opcode: 'json_is',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '[json] 是否为 [types]',
            arguments: {
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '{"key":"value"}'
              },
              types: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'JSON',
                menu: 'types'
              },
            }
          },
          '---',
          {
            opcode: 'json_get_all',
            blockType: Scratch.BlockType.REPORTER,
            text: '在 [json] 中获取所有的 [Stype]',
            arguments: {
              Stype: {
                type: Scratch.ArgumentType.STRING,
                menu: 'get_all'
              },
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '{"key":"value","key2":"value2"}'
              }
            }
          },
          {
            opcode: 'json_new',
            blockType: Scratch.BlockType.REPORTER,
            text: '空白 [json]',
            arguments: {
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'JSON',
                menu: 'types'
              }
            }
          },
          '---',
          {
            opcode: 'json_has_key',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '[json] 含有键值 [key]?',
            arguments: {
              key: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'key2'
              },
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '{"key":"value"}'
              }
            }
          },
          {
            opcode: 'json_has_value',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '[json] 含有数据 [value]?',
            arguments: {
              value: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'scratch'
              },
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '["TurboWarp","scratch"]'
              }
            }
          },
          '---',
          {
            opcode: 'json_equal',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '[json1] = [json2]',
            arguments: {
              json1: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '{"a":0,"b":1}'
              },
              json2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '{"b":1,"a":0}'
              }
            }
          },
          {
            opcode: 'json_nequal',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '[json1] ≠ [json2]',
            arguments: {
              json1: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '{"a":0,"b":1}'
              },
              json2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '{"b":1,"a":0}'
              }
            }
          },
          makeLabel('JSON 数据'),
          {
            opcode: 'json_jlength',
            blockType: Scratch.BlockType.REPORTER,
            text: 'JSON [json] 的长度',
            arguments: {
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '{"key":"value","key2":"value2"}'
              }
            }
          },
          {
            opcode: 'json_get',
            blockType: Scratch.BlockType.REPORTER,
            text: 'JSON [json] 获取 [item]',
            arguments: {
              item: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'key'
              },
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '{"key":"value"}'
              }
            }
          },
          {
            opcode: 'json_set',
            blockType: Scratch.BlockType.REPORTER,
            text: 'JSON [json] 设置 [item] 的数据为 [value]',
            arguments: {
              item: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'key'
              },
              value: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'new value'
              },
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '{"key":"value"}'
              }
            }
          },
          {
            opcode: 'json_delete',
            blockType: Scratch.BlockType.REPORTER,
            text: 'JSON [json] 删除 [item]',
            arguments: {
              item: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'key2'
              },
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '{"key":"value","key2":"value2"}'
              }
            }
          },
          makeLabel('数组'),
          {
            opcode: 'json_length',
            blockType: Scratch.BlockType.REPORTER,
            text: '数组 [json] 的长度',
            arguments: {
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '[1,2,3]'
              }
            }
          },
          {
            opcode: 'json_array_get',
            blockType: Scratch.BlockType.REPORTER,
            text: '数组 [json] 的第 [item] 项',
            arguments: {
              item: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1
              },
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '["scratch","TurboWarp"]'
              }
            }
          },
          {
            opcode: 'json_array_push',
            blockType: Scratch.BlockType.REPORTER,
            text: '在数组 [json] 添加 [item]',
            arguments: {
              item: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'TurboWarp'
              },
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '["scratch"]'
              }
            }
          },
          {
            opcode: 'json_array_set',
            blockType: Scratch.BlockType.REPORTER,
            text: '替换数组 [json] 的第 [pos] 项为 [item]',
            arguments: {
              item: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'fav'
              },
              pos: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 2
              },
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '["love","heart","follow"]'
              }
            }
          },
          {
            opcode: 'json_array_insert',
            blockType: Scratch.BlockType.REPORTER,
            text: '数组 [json] 插入 [item] 到第 [pos] 项',
            arguments: {
              item: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'fav'
              },
              pos: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 2
              },
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '["love","follow"]'
              }
            }
          },
          '---',
          {
            opcode: 'json_array_delete',
            blockType: Scratch.BlockType.REPORTER,
            text: '在数组 [json] 中删除第 [item] 项',
            arguments: {
              item: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 2
              },
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '["scratch","a","TurboWarp"]'
              }
            }
          },
          {
            opcode: 'json_array_remove_all',
            blockType: Scratch.BlockType.REPORTER,
            text: '在数组 [json] 中删除所有的 [item]',
            arguments: {
              item: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'a'
              },
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '["scratch","a","TurboWarp","a","a"]'
              }
            }
          },
          '---',
          {
            opcode: 'json_array_itemH',
            blockType: Scratch.BlockType.REPORTER,
            text: '数组 [json] 中第一个 [item] 的编号',
            arguments: {
              item: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'scratch'
              },
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '["scratch","TurboWarp"]'
              }
            }
          },
          makeLabel('进阶'),
          {
            opcode: 'json_array_from',
            blockType: Scratch.BlockType.REPORTER,
            text: '使用 [json] 构造数组',
            arguments: {
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'abcd'
              }
            }
          },
          {
            opcode: 'json_array_fromto',
            blockType: Scratch.BlockType.REPORTER,
            text: '在数组 [json] 中从第 [item] 项到第 [item2] 项',
            arguments: {
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '[1,2,3,4]'
              },
              item: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 2
              },
              item2: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 3
              }
            }
          },
          {
            opcode: 'json_array_reverse',
            blockType: Scratch.BlockType.REPORTER,
            text: '反转数组 [json]',
            arguments: {
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '["a","b","c","d","e","f"]'
              }
            }
          },
          {
            opcode: 'json_array_flat',
            blockType: Scratch.BlockType.REPORTER,
            text: '展平数组 [json] 到第 [depth] 层',
            arguments: {
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '[[1],2,[3,4],[5,[6]]]'
              },
              depth: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 2
              }
            }
          },
          {
            opcode: 'json_array_concat',
            blockType: Scratch.BlockType.REPORTER,
            text: '连接数组 [json] 和 [json2]',
            arguments: {
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '["a","b"]'
              },
              json2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '["c","d"]'
              }
            }
          },
          {
            opcode: 'json_array_filter',
            blockType: Scratch.BlockType.REPORTER,
            text: '在数组 [json] 中获取所有键 [key] 的值',
            arguments: {
              key: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'id'
              },
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '[{"id":12},{"id":24}]'
              }
            }
          },
          {
            opcode: 'json_array_setlen',
            blockType: Scratch.BlockType.REPORTER,
            text: '数组 [json] 设置长度为 [len]',
            arguments: {
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '["a","b","c"]'
              },
              len: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 2
              }
            }
          },
          '---',
          {
            opcode: 'json_array_create',
            blockType: Scratch.BlockType.REPORTER,
            text: '使用分隔符 [d] 和文字 [text] 创建数组',
            arguments: {
              text: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'a,b,c'
              },
              d: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: ','
              }
            }
          },
          {
            opcode: 'json_array_join',
            blockType: Scratch.BlockType.REPORTER,
            text: '使用分隔符 [d] 连接数组 [json]',
            arguments: {
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '["a","b","c"]'
              },
              d: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: ','
              }
            }
          },
          makeLabel('列表'),
          {
            opcode: 'json_vm_getlist',
            blockType: Scratch.BlockType.REPORTER,
            text: '转换列表 [list] 到数组',
            arguments: {
              list: {
                type: Scratch.ArgumentType.STRING,
                menu: 'get_list'
              },
            }
          },
          {
            opcode: 'json_vm_setlist',
            blockType: Scratch.BlockType.COMMAND,
            text: '设置列表 [list] 为数组 [json]',
            arguments: {
              list: {
                type: Scratch.ArgumentType.STRING,
                menu: 'get_list'
              },
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '["apple","banana"]'
              },
            }
          },
        ],
        menus: {
          get_all: {
            items: ['键','值','键值']
          },
          get_list: {
            acceptReporters: true,
            items: 'getLists'
          },
          types: {
            acceptReporters: true,
            items: ['JSON','数组']
          }
        }
      };
    }

    getLists () {
      const globalLists = Object.values(vm.runtime.getTargetForStage().variables).filter(x => x.type == 'list');
      const localLists = Object.values(vm.editingTarget.variables).filter(x => x.type == 'list');
      const uniqueLists = [...new Set([...globalLists, ...localLists])];
      if (uniqueLists.length === 0) {
        return [
          {
            text: '选择一个列表',
            value: '选择一个列表'
          }
        ];
      }
      return uniqueLists.map(i => ({
        text: i.name,
        value: i.id
      }));
    }

    getListsID(util) {
      // vm set list and get list bug (fixes here):
      // when you use get list [join(list)(name)] or similar
      // it won't work properly
      const globalLists = Object.values(vm.runtime.getTargetForStage().variables).filter(x => x.type == 'list');
      const localLists = Object.values(util.target.variables).filter(x => x.type == 'list');
      const uniqueLists = [...new Set([...globalLists, ...localLists])];
      return uniqueLists.map(i => ({
        text: i.name,
        value: i.id
      }));
    }

    json_is_valid({ json }) {
      if (typeof json != 'string') {
        return false;
      } else if ((json.slice(0,1) != '[' || json.slice(-1) != ']') && (json.slice(0,1) != '{' || json.slice(-1) != '}')) {
        return false;
      } else {
        try {
          JSON.parse(json);
          return true;
        } catch {
          return false;
        }
      }
    }

    // return object if its json else string
    json_valid_return(json){
      if (typeof json != 'string') {
        return json;
      } else if ((json.slice(0,1) != '[' || json.slice(-1) != ']') && (json.slice(0,1) != '{' || json.slice(-1) != '}')) {
        return json;
      } else {
        try {
          return JSON.parse(json);
        } catch {
          return json;
        }
      }
    }

    json_is({ json, types }) {
      if (!this.json_is_valid({json: json})) return false;
      try {
        json = JSON.parse(json);
        switch (types) {
        case 'JSON': return !Array.isArray(json);
        case 'Array': return Array.isArray(json);
        case '数组': return Array.isArray(json);
        default: return false;
        }
      } catch {
        return false;
      }
    }

    json_length({ json }) {
      try {
        json = JSON.parse(json);
        return Object.keys(json).length;
      } catch {
        return ' ';
      }
    }

    json_new({ json }) {
      switch (json) {
      case 'JSON': return '{}';
      case 'Array': return '[]';
      case '数组': return '[]';
      default: return '';
      }
    }

    json_has_key({ json, key }) {
      try {
        return this._fixInvalidJSONValues(this.json_valid_return(key)) in JSON.parse(json);
      } catch {
        return false;
      }
    }

    json_has_value({ json, value }) {
      try {
        json = JSON.parse(json);
        value = this.json_valid_return(value);
        return json.includes(value);
      } catch {
        return false;
      }
    }

    json_equal({ json1, json2 }) {
      try {
        json1 = JSON.parse(json1);
        json2 = JSON.parse(json2);

        const keys1 = Object.keys(json1);
        const keys2 = Object.keys(json2);

        return keys1.length === keys2.length && Object.keys(json1).every(key=>json1[key] === json2[key]);
      } catch {
        return false;
      }
    }

    json_nequal({ json1, json2 }) {
      return !this.json_equal({json1: json1, json2: json2});
    }

    json_get_all({ Stype,json }) {
      try {
        json = JSON.parse(json);
        switch (Stype) {
        case 'keys':
          return JSON.stringify(Object.keys(json).map(key => key));
        case 'values':
          return JSON.stringify(Object.keys(json).map(key => json[key]));
        case 'datas':
          return JSON.stringify(Object.keys(json).map(key => [key, json[key]]));
        case '键':
          return JSON.stringify(Object.keys(json).map(key => key));
        case '值':
          return JSON.stringify(Object.keys(json).map(key => json[key]));
        case '键值':
          return JSON.stringify(Object.keys(json).map(key => [key, json[key]]));
        default: return '';
        }
      } catch {
        return '';
      }
    }

    json_get({ item, json }) {
      try {
        json = JSON.parse(json);
        if (hasOwn(json, item)) {
          const result = json[item];
          if (typeof result === 'object') {
            return JSON.stringify(result);
          } else {
            return result;
          }
        }
      } catch {
        // ignore
      }
      return '';
    }

    _fixInvalidJSONValues(value) {
      // JSON does not support these values, so convert to string.
      if (Number.isNaN(value)) return 'NaN';
      if (value === Infinity) return 'Infinity';
      if (value === -Infinity) return '-Infinity';
      return value;
    }

    json_set({ item, value, json }) {
      try {
        json = JSON.parse(json);
        value = this.json_valid_return(value);
        value = this._fixInvalidJSONValues(value);
        json[item] = value;
        return JSON.stringify(json);
      } catch {
        return '';
      }
    }

    json_delete({ item, json }) {
      try {
        json = JSON.parse(json);
        delete json[item];
        return JSON.stringify(json);
      } catch {
        return '';
      }
    }

    json_jlength({ json }) {
      // same function
      return this.json_length({ json: json });
    }

    json_array_get({ item, json }) {
      // 1...length : array content, -1...-length : reverse array content, 0 : ERROR
      try {
        item = Scratch.Cast.toNumber(item);
        if (item == 0) return '';
        if (item > 0) {
          item--;
        }
        json = JSON.parse(json);
        let result;
        if (item >= 0) {
          result = json[item];
        } else {
          result = json[json.length + item];
        }
        if (typeof result == 'object') {
          return JSON.stringify(result);
        } else {
          return result;
        }
      } catch {
        return '';
      }
    }

    json_array_itemH({ item, json }) {
      try {
        json = JSON.parse(json);
        item = this._fixInvalidJSONValues(this.json_valid_return(item));
        let result = JSON.stringify(json.indexOf(item) + 1);
        return result;
      } catch {
        return '';
      }
    }

    json_array_from({ json }) {
      try {
        return JSON.stringify(Array.from(String(json)));
      } catch {
        return '';
      }
    }

    json_array_concat({ json, json2 }) {
      try {
        json = JSON.parse(json);
        json2 = JSON.parse(json2);
        return JSON.stringify(json.concat(json2));
      } catch {
        return '';
      }
    }

    json_array_push({ item, json }) {
      try {
        json = JSON.parse(json);
        item = this._fixInvalidJSONValues(this.json_valid_return(item));
        json.push(item);
        return JSON.stringify(json);
      } catch {
        return '';
      }
    }

    json_array_insert({ item, pos, json }) {
      try {
        json = JSON.parse(json);
        item = this._fixInvalidJSONValues(this.json_valid_return(item));
        json.splice(pos - 1, 0, item);
        return JSON.stringify(json);
      } catch {
        return '';
      }
    }

    json_array_set({ item, pos, json }) {
      try {
        json = JSON.parse(json);
        json[pos - 1] = this._fixInvalidJSONValues(this.json_valid_return(item));
        return JSON.stringify(json);
      } catch {
        return '';
      }
    }

    json_array_delete({ item, json }) {
      try {
        json = JSON.parse(json);
        json.splice(item - 1, 1);
        return JSON.stringify(json);
      } catch {
        return '';
      }
    }

    json_array_remove_all({ item, json }) {
      try {
        json = JSON.parse(json);
        item = this._fixInvalidJSONValues(this.json_valid_return(item));
        let i = 0;
        while (i < json.length) {
          if (json[i] === item) {
            json.splice(i, 1);
          } else {
            ++i;
          }
        }
        return JSON.stringify(json);
      } catch {
        return '';
      }
    }

    json_array_fromto({ json, item, item2 }) {
      try {
        return JSON.stringify(JSON.parse(json).slice(item - 1,item2));
      } catch {
        return '';
      }
    }

    json_array_reverse({ json }) {
      try {
        return JSON.stringify(JSON.parse(json).reverse());
      } catch {
        return '';
      }
    }

    json_array_flat({ json, depth }) {
      try {
        return JSON.stringify(JSON.parse(json).flat(depth));
      } catch {
        return '';
      }
    }

    json_array_create({ text, d }) {
      return JSON.stringify(String(text).split(d));
    }

    json_array_join({ json, d }) {
      try {
        return JSON.parse(json).join(d);
      } catch {
        return '';
      }
    }

    json_array_filter({ key, json }) {
      try {
        json = JSON.parse(json);
        return JSON.stringify(json.map(x => {
          if (hasOwn(x, key)) {
            return x[key];
          }
          return null;
        }));
      } catch (e) {
        return '';
      }
    }

    json_array_setlen({ json, len }) {
      try {
        json = JSON.parse(json);
        json.length = len;
        return JSON.stringify(json);
      } catch {
        return '';
      }
    }

    json_vm_getlist({ list }, util) {
      try {
        let listVariable = util.target.lookupVariableById(list);

        if (listVariable == undefined) {
          listVariable = this.getListsID(util).filter(x => x.text === list)[0].value;
          listVariable = util.target.lookupVariableById(listVariable);
        }

        if (listVariable && listVariable.type === 'list') {
          return JSON.stringify(listVariable.value);
        }
      } catch (e) {
        // ignore
      }
      return '';
    }
    json_vm_setlist({ list, json }, util) {
      try {
        let listVariable = util.target.lookupVariableById(list);

        if (listVariable == undefined) {
          listVariable = this.getListsID(util).filter(x => x.text === list)[0].value;
          listVariable = util.target.lookupVariableById(listVariable);
        }

        if (listVariable && listVariable.type === 'list') {
          const array = JSON.parse(json);
          if (Array.isArray(array)) {
            const safeArray = array.map(i => {
              if (typeof i === 'object') return JSON.stringify(i);
              return i;
            });
            listVariable.value = safeArray;
          }
        }
      } catch (e) {
        // ignore
      }
      return '';
    }
  }
  Scratch.extensions.register(new JSONS());
  // eslint-disable-next-line no-undef
})(Scratch);