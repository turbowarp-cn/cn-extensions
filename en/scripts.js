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
    console.log(`Use of extensions:${extensionName}`);
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
        alert("Successfully copied to your clipboard.");
      })
      .catch((error) => {
        alert("Cannot copy text to clipboard.", error);
      });
    } else {
      prompt("Copy failed, please copy manually",text)
    }
  }

