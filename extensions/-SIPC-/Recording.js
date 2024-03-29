﻿(function (Scratch) {
  "use strict";
  if (!Scratch.extensions.unsandboxed) {
    throw new Error("录音必须在无沙盒的情况下运行");
  }
  let mediaRecorder;
  let recordedChunks = [];
  let isRecording = false;
  const icon =
    "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjg1MTAzNzAzNDU1IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjMzMjIiIGRhdGEtc3BtLWFuY2hvci1pZD0iYTMxM3guNzc4MTA2OS4wLmkxIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiPjxwYXRoIGQ9Ik04MzMgNDQ1LjVjMTcuNjczIDAgMzIgMTQuMzI3IDMyIDMyIDAgMTgzLjcyMi0xNDAuNTUzIDMzNC42MTYtMzE5Ljk5NyAzNTEuMDIxTDU0NSA4OTVoMTk0YzE3LjY3MyAwIDMyIDE0LjMyNyAzMiAzMiAwIDE3LjY3My0xNC4zMjcgMzItMzIgMzJIMjg3Yy0xNy42NzMgMC0zMi0xNC4zMjctMzItMzIgMC0xNy42NzMgMTQuMzI3LTMyIDMyLTMyaDE5NGwtMC4wMDMtNjYuMzg5QzMwMS4wNzUgODEyLjY3NyAxNjAgNjYxLjU2MyAxNjAgNDc3LjVjMC0xNy42NzMgMTQuMzI3LTMyIDMyLTMyIDE3LjQ5NiAwIDMxLjcxMyAxNC4wNDIgMzEuOTk2IDMxLjQ3bDAuMDA0IDAuNTNDMjI0IDYzNi44MzQgMzUzLjE2NiA3NjYgNTEyLjUgNzY2YzE1Ny43NCAwIDI4NS45MTQtMTI2LjU5NSAyODguNDYxLTI4My43M2wwLjAzOS00Ljc3YzAtMTcuNjczIDE0LjMyNy0zMiAzMi0zMnpNNTEzIDY1YzEyMy4wMjEgMCAyMjIuOTgzIDk4LjczMSAyMjQuOTcgMjIxLjI4TDczOCAyOTB2MTg2YzAgMTI0LjI2NC0xMDAuNzM2IDIyNS0yMjUgMjI1LTEyMy4wMjEgMC0yMjIuOTgzLTk4LjczMS0yMjQuOTctMjIxLjI4TDI4OCA0NzZWMjkwYzAtMTI0LjI2NCAxMDAuNzM2LTIyNSAyMjUtMjI1eiBtMCA2NGMtODguMDI5IDAtMTU5LjU1NyA3MC42NDgtMTYwLjk3OCAxNTguMzM4TDM1MiAyOTB2MTg2YzAgODguOTE4IDcyLjA4MiAxNjEgMTYxIDE2MSA4OC4wMjkgMCAxNTkuNTU3LTcwLjY0OCAxNjAuOTc4LTE1OC4zMzhMNjc0IDQ3NlYyOTBjMC04OC45MTgtNzIuMDgyLTE2MS0xNjEtMTYxeiBtMTI0LjU0MyAyNTguNTkxYzE3LjM4OCA4OS40NTMtNDEuMDMyIDE3Ni4wNjQtMTMwLjQ4NSAxOTMuNDUyLTE3LjM0OCAzLjM3Mi0zNC4xNDYtNy45NTgtMzcuNTE4LTI1LjMwNi0zLjMzOC0xNy4xNzUgNy43MzMtMzMuODEgMjQuNzg4LTM3LjQxM2wwLjUxOC0wLjEwNWM1NC4yMDktMTAuNTM3IDg5LjgtNjIuNjA0IDgwLjE3OC0xMTYuNzc0bC0wLjMwNS0xLjY0MmMtMy4zNzItMTcuMzQ4IDcuOTU4LTM0LjE0NiAyNS4zMDYtMzcuNTE4IDE3LjM0OS0zLjM3MiAzNC4xNDYgNy45NTggMzcuNTE4IDI1LjMwNnoiIGZpbGw9IiNmZmZmZmYiIHAtaWQ9IjMzMjMiPjwvcGF0aD48L3N2Zz4=";
  const icon2 =
    "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjg1MTAzNzAzNDU1IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjMzMjIiIGRhdGEtc3BtLWFuY2hvci1pZD0iYTMxM3guNzc4MTA2OS4wLmkxIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiPjxwYXRoIGQ9Ik04MzMgNDQ1LjVjMTcuNjczIDAgMzIgMTQuMzI3IDMyIDMyIDAgMTgzLjcyMi0xNDAuNTUzIDMzNC42MTYtMzE5Ljk5NyAzNTEuMDIxTDU0NSA4OTVoMTk0YzE3LjY3MyAwIDMyIDE0LjMyNyAzMiAzMiAwIDE3LjY3My0xNC4zMjcgMzItMzIgMzJIMjg3Yy0xNy42NzMgMC0zMi0xNC4zMjctMzItMzIgMC0xNy42NzMgMTQuMzI3LTMyIDMyLTMyaDE5NGwtMC4wMDMtNjYuMzg5QzMwMS4wNzUgODEyLjY3NyAxNjAgNjYxLjU2MyAxNjAgNDc3LjVjMC0xNy42NzMgMTQuMzI3LTMyIDMyLTMyIDE3LjQ5NiAwIDMxLjcxMyAxNC4wNDIgMzEuOTk2IDMxLjQ3bDAuMDA0IDAuNTNDMjI0IDYzNi44MzQgMzUzLjE2NiA3NjYgNTEyLjUgNzY2YzE1Ny43NCAwIDI4NS45MTQtMTI2LjU5NSAyODguNDYxLTI4My43M2wwLjAzOS00Ljc3YzAtMTcuNjczIDE0LjMyNy0zMiAzMi0zMnpNNTEzIDY1YzEyMy4wMjEgMCAyMjIuOTgzIDk4LjczMSAyMjQuOTcgMjIxLjI4TDczOCAyOTB2MTg2YzAgMTI0LjI2NC0xMDAuNzM2IDIyNS0yMjUgMjI1LTEyMy4wMjEgMC0yMjIuOTgzLTk4LjczMS0yMjQuOTctMjIxLjI4TDI4OCA0NzZWMjkwYzAtMTI0LjI2NCAxMDAuNzM2LTIyNSAyMjUtMjI1eiBtMCA2NGMtODguMDI5IDAtMTU5LjU1NyA3MC42NDgtMTYwLjk3OCAxNTguMzM4TDM1MiAyOTB2MTg2YzAgODguOTE4IDcyLjA4MiAxNjEgMTYxIDE2MSA4OC4wMjkgMCAxNTkuNTU3LTcwLjY0OCAxNjAuOTc4LTE1OC4zMzhMNjc0IDQ3NlYyOTBjMC04OC45MTgtNzIuMDgyLTE2MS0xNjEtMTYxeiBtMTI0LjU0MyAyNTguNTkxYzE3LjM4OCA4OS40NTMtNDEuMDMyIDE3Ni4wNjQtMTMwLjQ4NSAxOTMuNDUyLTE3LjM0OCAzLjM3Mi0zNC4xNDYtNy45NTgtMzcuNTE4LTI1LjMwNi0zLjMzOC0xNy4xNzUgNy43MzMtMzMuODEgMjQuNzg4LTM3LjQxM2wwLjUxOC0wLjEwNWM1NC4yMDktMTAuNTM3IDg5LjgtNjIuNjA0IDgwLjE3OC0xMTYuNzc0bC0wLjMwNS0xLjY0MmMtMy4zNzItMTcuMzQ4IDcuOTU4LTM0LjE0NiAyNS4zMDYtMzcuNTE4IDE3LjM0OS0zLjM3MiAzNC4xNDYgNy45NTggMzcuNTE4IDI1LjMwNnoiIGZpbGw9IiNmZmZmZmYiIHAtaWQ9IjMzMjMiPjwvcGF0aD48L3N2Zz4=";
  class Recording {
    getInfo() {
      return {
        id: "Recording",
        name: "录音",
        color1: "#696969",
        menuIconURI: icon,
        blockIconURI: icon2,
        blocks: [
          {
            opcode: "startRecording",
            blockType: Scratch.BlockType.COMMAND,
            text: "开始录音",
            arguments: {},
          },
          {
            opcode: "stopRecording",
            blockType: Scratch.BlockType.COMMAND,
            text: "停止录音",
            arguments: {},
          },
          {
            opcode: "stopRecordingAndDownload",
            blockType: Scratch.BlockType.COMMAND,
            text: "停止录音并用 [name] 作为文件名下载",
            arguments: {
              name: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "recording.wav",
              },
            },
          },
          {
            opcode: "isRecording",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "录音？",
            arguments: {},
          },
          {
            opcode: "Recordingdata",
            blockType: Scratch.BlockType.REPORTER,
            text: "音频数据",
            arguments: {},
          },
        ],
      };
    }
    startRecording() {
      recordedChunks = [];
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.error("浏览器不支持录音功能");
        return;
      }
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(function (stream) {
          mediaRecorder = new MediaRecorder(stream);
          isRecording = true;
          mediaRecorder.addEventListener("dataavailable", function (e) {
            recordedChunks.push(e.data);
          });
          mediaRecorder.start();
          console.log("开始录音");
        })
        .catch(function (err) {
          console.error("无法访问音频设备：", err);
        });
    }
    stopRecording() {
      if (!mediaRecorder) {
        console.error("录音未开始");
        return;
      }
      isRecording = false;
      mediaRecorder.stop();
      console.log("停止录音");
    }
    stopRecordingAndDownload({ name }) {
      if (!mediaRecorder) {
        console.error("录音未开始");
        return;
      }
      isRecording = false;
      mediaRecorder.stop();
      console.log("停止录音");
      mediaRecorder.addEventListener("dataavailable", function (e) {
        recordedChunks.push(e.data);
      });
      mediaRecorder.addEventListener("stop", function () {
        const blob = new Blob(recordedChunks, { type: "audio/wav" });
        const url = URL.createObjectURL(blob);
        const downloadLink = document.createElement("a");
        downloadLink.href = url;
        downloadLink.download = name;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(url);
      });
    }
    isRecording() {
      return isRecording;
    }
    Recordingdata() {
      return new Promise((resolve) => {
        const blob = new Blob(recordedChunks, { type: "audio/wav" });
        const reader = new FileReader();
        reader.onload = function () {
          const dataURL = reader.result;
          resolve(dataURL);
        };
        reader.readAsDataURL(blob);
      });
    }
  }
  Scratch.extensions.register(new Recording());
})(Scratch);
//BY -SIPC- 502415953
