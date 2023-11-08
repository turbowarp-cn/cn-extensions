class SplitTextExtension {
  getInfo() {
    return {
      id: 'LKFile',
      name: 'Kuel Files',
      color1: '#ff8000',
      menuIconURI: 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI4MS4zMzU1OSIgaGVpZ2h0PSI4MS4xNjAyMyIgdmlld0JveD0iMCwwLDgxLjMzNTU5LDgxLjE2MDIzIj48ZGVmcz48bGluZWFyR3JhZGllbnQgeDE9IjIxMy41MTY0NCIgeTE9IjE0OS42MjE3OSIgeDI9IjI2Ni40ODM1NiIgeTI9IjIxMC4zNzgyIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgaWQ9ImNvbG9yLTEiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2ZmOTEzMyIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2ZmYjQwMCIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xOTkuMzMyMjEsLTEzOS40MTk4OSkiPjxnIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2lzUGFpbnRpbmdMYXllciZxdW90Ozp0cnVlfSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMjcwLjg2MTQ5LDE1My4wOTUxMWMxNC42MjY0NiwxNi43Nzc0MSAxMi42NjY0LDQyLjQyMzkzIC00LjM3NzkzLDU3LjI4MzA5Yy0xNy4wNDQzMywxNC44NTkxNiAtNDIuNzE4NTgsMTMuMzA0MTEgLTU3LjM0NTA1LC0zLjQ3MzMxYy0xNC42MjY0NiwtMTYuNzc3NDEgLTEyLjY2NjQsLTQyLjQyMzkzIDQuMzc3OTMsLTU3LjI4MzA5YzE3LjA0NDMzLC0xNC44NTkxNiA0Mi43MTg1OCwtMTMuMzA0MTEgNTcuMzQ1MDUsMy40NzMzMXoiIGZpbGw9InVybCgjY29sb3ItMSkiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIwIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIvPjxwYXRoIGQ9Ik0yMzcuOTM3NSwyMDAuNjI1aC0xMi4zNzVjLTEuMTM5MDksMCAtMi4wNjI1LC0wLjkyMzM4IC0yLjA2MjUsLTIuMDYyNXYtMzcuMTI1YzAsLTEuMTM5MDkgMC45MjM0MSwtMi4wNjI1IDIuMDYyNSwtMi4wNjI1aDIxLjY1NjI1bDkuMjgxMjUsMTAuMzEyNXY5LjI4MTI1IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iNC41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0iYmV2ZWwiLz48cGF0aCBkPSJNMjU2LjUsMTY5LjY4NzVoLTEwLjMxMjV2LTEwLjMxMjUiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSI0LjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJiZXZlbCIvPjx0ZXh0IHRyYW5zZm9ybT0idHJhbnNsYXRlKDI0MS4zMDc5OSwyMDEuMDY2MzUpIHNjYWxlKDAuNjA2NjUsMC42MDY2NSkiIGZvbnQtc2l6ZT0iNDAiIHhtbDpzcGFjZT0icHJlc2VydmUiIGZpbGw9IiNmZmZmZmYiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSImcXVvdDtDb29wZXImcXVvdDssIFNhbnMgU2VyaWYiIGZvbnQtd2VpZ2h0PSJub3JtYWwiIHRleHQtYW5jaG9yPSJzdGFydCIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjx0c3BhbiB4PSIwIiBkeT0iMCI+SzwvdHNwYW4+PC90ZXh0PjwvZz48L2c+PC9zdmc+PCEtLXJvdGF0aW9uQ2VudGVyOjQwLjY2Nzc5MzAwMDE5MTQxOjQwLjU4MDExNDIyNTk0NDMzLS0+',
      blockIconURI: 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI2MC4xMjQyMSIgaGVpZ2h0PSI3MS4yMzIyNCIgdmlld0JveD0iMCwwLDYwLjEyNDIxLDcxLjIzMjI0Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjE1LjU2MDIxLC0xNTUuMTU2ODgpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PGc+PHBhdGggZD0iTTIzNy44MzM3LDIxNC4xNTI1N2gtMTYuOTQ4NzFjLTEuNTYwMDksMCAtMi44MjQ3OCwtMS4yNjQ2NSAtMi44MjQ3OCwtMi44MjQ3OHYtNTAuODQ2MTJjMCwtMS41NjAwOSAxLjI2NDcsLTIuODI0NzggMi44MjQ3OCwtMi44MjQ3OGgyOS42NjAyM2wxMi43MTE1MywxNC4xMjM5MnYxMi43MTE1MyIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJiZXZlbCIvPjxwYXRoIGQ9Ik0yNjMuMjU2NzYsMTcxLjc4MDhoLTE0LjEyMzkydi0xNC4xMjM5MiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJiZXZlbCIvPjx0ZXh0IHRyYW5zZm9ybT0idHJhbnNsYXRlKDI0Mi40NDk5LDIxNC43NTcwMykgc2NhbGUoMC44MzA4NiwwLjgzMDg2KSIgZm9udC1zaXplPSI0MCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgZmlsbD0iI2ZmZmZmZiIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMTAiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSImcXVvdDtDb29wZXImcXVvdDssIFNhbnMgU2VyaWYiIGZvbnQtd2VpZ2h0PSJub3JtYWwiIHRleHQtYW5jaG9yPSJzdGFydCIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjx0c3BhbiB4PSIwIiBkeT0iMCI+SzwvdHNwYW4+PC90ZXh0PjwvZz48L2c+PC9nPjwvc3ZnPjwhLS1yb3RhdGlvbkNlbnRlcjoyNC40Mzk3ODY5OTIxODc0OTM6MjQuODQzMTE4NTk4MzE3NjMtLT4=',
      blocks: [
        {
          opcode: 'splitAndDownload',
          blockType: Scratch.BlockType.COMMAND,
          text: '将文本 [TEXT] 按 [DELIMITER] 分割并下载为 [FILENAME]',
          arguments: {
            TEXT: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: '你好/世界'
            },
            DELIMITER: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: '/'
            },
            FILENAME: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: '文本.txt'
            }
          }
        },
        {
          opcode: 'downloadText',
          blockType: Scratch.BlockType.COMMAND,
          text: '将内容 [TEXT] 命名为 [FILENAME] 并下载',
          arguments: {
            TEXT: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: '你好，世界！'
            },
            FILENAME: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: '文本.txt'
            }
          }
        },
        {
          opcode: 'openFileAndReadText',
          blockType: Scratch.BlockType.REPORTER,
          text: '打开txt文件并读取内容',
        }
      ]
    };
  }

  splitAndDownload(args) {
    const text = args.TEXT;
    const delimiter = args.DELIMITER;
    const fileName = args.FILENAME;

    const lines = text.split(delimiter);

    const content = lines.join('\n');
    const element = document.createElement('a');
    const file = new Blob([content], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = fileName;
    element.click();
  }

  downloadText(args) {
    const text = args.TEXT;
    const fileName = args.FILENAME;

    const element = document.createElement('a');
    const file = new Blob([text], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = fileName;
    element.click();
  }

  async openFileAndReadText() {
    return new Promise((resolve, reject) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.txt';

      input.addEventListener('change', (event) => {
        const file = event.target.files[0];

        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const content = e.target.result;
            resolve(content);
          };
          reader.onerror = (e) => {
            reject(e.target.error.message);
          };
          reader.readAsText(file, 'UTF-8');
        }
      });

      input.click();
    });
  }
}

Scratch.extensions.register(new SplitTextExtension());
