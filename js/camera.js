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









//--------------------------------------------------------------------------------

console.log(localStorage);
