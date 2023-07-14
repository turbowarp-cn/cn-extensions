document.addEventListener("DOMContentLoaded", function () {
    const extensionButtons = document.querySelectorAll(".extension button");
  
    extensionButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const extensionName = this.parentElement.querySelector("h2").textContent;
        if (this.id === "open") {
          enableExtension(extensionName);
        }
        if (this.id === "copy") {
          ExtensionURL(extensionName);
        }
      });
    });
  });
  
  function enableExtension(extensionName) {
    url = window.location.origin
    console.log(`使用扩展：${extensionName}`);
    window.open("https://turbowarp.cn/editor.html?extension="+ url + "/extensions/" + `${extensionName}` + '.js' );
  }
  function ExtensionURL(extensionName){
    url = window.location.origin
    copyText(String(url + "/extensions/" + `${extensionName}` + '.js'))
  }
  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text)
      .then(() => {
        alert("复制成功!");
      })
      .catch((error) => {
        alert("无法复制文本到剪贴板:", error);
      });
    } else {
      prompt("复制失败，请手动复制",text)
    }
  }

