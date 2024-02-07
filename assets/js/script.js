function load(title){
  let url = `${window.location.origin}/extensions/${title}.js`
  window.opener.postMessage({
    type: 'add',
    url: url
  }, '*');
}

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
      .catch(() => {
        prompt("复制失败，请手动复制", text);
      })
  } else {
    prompt("复制失败，请手动复制", text)
  }
}

function view(title) {
  window.open(`https://turbowarp.cn/editor.html?extension=${window.location.origin}/extensions/${title}.js`);
}

window.onload = function () {
  var urlParams = new URLSearchParams(window.location.search);
  var loadExtParam = urlParams.get('loadext');
  var loadExtButtons = document.querySelectorAll('.loadext');
  var copyButtons = document.querySelectorAll('.copy-link');
  var viewButtons = document.querySelectorAll('.view');
  if (loadExtParam === '1') {
    document.documentElement.style.zoom = '0.6';
    for (var i = 0; i < loadExtButtons.length; i++) {
      loadExtButtons[i].style.display = 'block';
    }
    for (var i = 0; i < copyButtons.length; i++) {
      copyButtons[i].style.display = 'none';
    }
    for (var i = 0; i < viewButtons.length; i++) {
      viewButtons[i].style.display = 'none';
    }
  } else {
    document.documentElement.style.zoom = '0.8';
    for (var i = 0; i < loadExtButtons.length; i++) {
      loadExtButtons[i].style.display = 'none';
    }
    for (var i = 0; i < copyButtons.length; i++) {
      copyButtons[i].style.display = 'block';
    }
    for (var i = 0; i < viewButtons.length; i++) {
      viewButtons[i].style.display = 'block';
    }
  }
}
