class MusicExtension {
    constructor(runtime) {
      this.runtime = runtime;
      this.audioElement = null;
    }

    getInfo() {
      return {
        id: '163music',
        name: '网易云音乐',
        color1: "#4d4d4f",
        blocks: [
          {
            opcode: '搜索音乐',
            blockType: Scratch.BlockType.REPORTER,
            text: '搜索音乐 [name]',
            arguments: {
              name: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Let's live"
              }
            }
          },
          {
            opcode: '获取音乐',
            blockType: Scratch.BlockType.REPORTER,
            text: '获取音乐url [id]',
            arguments: {
              id: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '1952657896'
              }
            }
          },
          {
            opcode: '播放音乐',
            blockType: Scratch.BlockType.COMMAND,
            text: '从 [url] 播放音乐',
            arguments: {
              url: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'https://example.com/music.mp3'
              }
            }
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: '控制'
          },
          {
            opcode: '恢复音乐',
            blockType: Scratch.BlockType.COMMAND,
            text: '▶ 播放音乐'
          },
          {
            opcode: '暂停音乐',
            blockType: Scratch.BlockType.COMMAND,
            text: '⏸ 暂停音乐'
          },
          {
            opcode: '停止音乐',
            blockType: Scratch.BlockType.COMMAND,
            text: '⏹ 停止音乐'
          },
          {
            opcode: '跳转到时间',
            blockType: Scratch.BlockType.COMMAND,
            text: '跳转到时间 [time] 秒',
            arguments: {
              time: {
                type: 'number',
                defaultValue: 0
              }
            }
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: '信息'
          },
          {
            opcode: '是否正在播放音乐',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '是否正在播放音乐?'
          },
          {
            opcode: '获取播放时间',
            blockType: Scratch.BlockType.REPORTER,
            text: '音乐播放时间（秒）'
          },
          {
            opcode: '获取音乐总时长',
            blockType: Scratch.BlockType.REPORTER,
            text: '音乐总时长（秒）'
          }
        ],
      };
    }
    搜索音乐(args) {
      return new Promise((resolve, reject) => {
        const url = `https://163.sipc-api.top/search?keywords=${args.name}`;
        fetch(url)
          .then(response => response.json())
          .then(data => {
            const songs = data.result.songs;
            function extractSongInfo(songs) {
              return songs.map(song => {
                const artists = song.artists;
                const firstArtistName = artists.length > 0 ? artists[0].name : '';
                return { id: song.id, name: song.name, artists: firstArtistName };
              });
            }
            const songInfo = extractSongInfo(songs);
            const songInfoString = JSON.stringify(songInfo);
            resolve(songInfoString);
          })
          .catch(error => {
            reject(error);
          });
      });
    }

    获取音乐(args) {
      return new Promise((resolve, reject) => {
        const url = `https://163.sipc-api.top/song/url?id=${args.id}`;
        fetch(url)
          .then(response => response.json())
          .then(data => {
            function getMusicUrl(data) {
              return new Promise((resolve, reject) => {
                if (data && data.code === 200 && data.data && data.data.length > 0) {
                  resolve(data.data[0].url.replace(/^http:/, 'https:'));
                } else {
                  reject(new Error('无法获取音乐下载链接'));
                }
              });
            }
            const songInfo = getMusicUrl(data);
            resolve(songInfo);
          })
          .catch(error => {
            reject(error);
          });
      });
    }

    播放音乐(args) {
      const url = args.url;
      if (this.audioElement) {
        this.audioElement.pause();
      }

      this.audioElement = new Audio(url);
      this.audioElement.play();
    }

    暂停音乐() {
      if (this.audioElement) {
        this.audioElement.pause();
      }
    }

    恢复音乐() {
      if (this.audioElement) {
        this.audioElement.play();
      }
    }

    停止音乐() {
      if (this.audioElement) {
        this.audioElement.pause();
        this.audioElement = null;
      }
    }

    是否正在播放音乐() {
      return this.audioElement && !this.audioElement.paused;
    }

    获取播放时间() {
      if (this.audioElement) {
        return this.audioElement.currentTime;
      }
      return 0;
    }

    跳转到时间(args) {
      const time = args.time;
      if (this.audioElement) {
        this.audioElement.currentTime = time;
      }
    }

    获取音乐总时长() {
      if (this.audioElement) {
        return this.audioElement.duration;
      }
      return 0;
    }
  }

  Scratch.extensions.register(new MusicExtension());