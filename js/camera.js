'use strict';

//headerがカメラ昨日よりも下に行くとリストに変わる
$(window).on('scroll', function(){
  if($(this).scrollTop() > 590) {
     $('#totalBtn').text('合計');
     $('#allDeleteBtn').text('削除');
     $('#pageTitle').text('リスト');
  } else {
    $('#totalBtn').text('');
    $('#allDeleteBtn').text('');
    $('#pageTitle').text('カメラ');
  }
});

//--------------------------------------------------------------------------------

//カメラ機能の実装

//videoの要素を取得
/*const video = document.getElementById('video');

document.addEventListener('DOMContentLoaded', ()=> {
  navigator.mediaDevices.getUserMedia({ video: true, audio: false })
   .then(stream => video.srcObject = stream)
   .catch(err => alert(`${err.name} ${err.message}`));
}, false);*/







//--------------------------------------------------------------------------------

console.log(localStorage);
