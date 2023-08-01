function copy(title) {
  url = window.location.origin
  text = url + "/extensions/" + `${title}` + '.js' 
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text)
      .then(() => {
        var copySuccess = document.getElementById("copy-success");
        copySuccess.style.display = "block";
        setTimeout(function() {
          copySuccess.style.display = "none";
        }, 3000);
      })
      .catch((error) => {
        prompt("复制失败，请手动复制",text)
      });
  } else {
    prompt("复制失败，请手动复制",text)
  }
}
  
  function view(title) {
    url = window.location.origin
    window.open("https://turbowarp.cn/editor.html?extension="+ url + "/extensions/" + `${title}` + '.js' );
  }