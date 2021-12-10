'use string';


  const btn = document.getElementById('btn');
  const form = document.forms.myForm;

  //!=(二つの値が等しくないことを確認する)
  //nullチェック
  if (btn != null) {
  btn.addEventListener('click', ()=> {

    //名前の記入欄は名字、名前がどちらか空欄でredクラスの追加で送信できない状態になる
    if(form.name1.value === '' || form.name2.value === '') {
      $('.menu1').addClass('red');
      //alert('※名前は名字、名前ともに必ず記入してください');
    } else {
        $('.menu1').removeClass('red');
    }

    //メールアドレス
    if(form.mail.value.match( /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/)) {
      $('.menu2').removeClass('red');
    } else if(form.mail.value === '') {
      //alert('※メールアドレスは必ず記入してください');
      $('.menu2').addClass('red');
    } else {
      $('.menu2').addClass('red');
      alert('メールアドレスを正しい形式で入力してください');
    }

    //電話番号数字のみ１１桁でtrue
    if(form.tell.value.match(/[0-9]{11}/g)) {
      $('.menu3').removeClass('red');
    } else if(form.tell.value === '') {
      //alert('※電話番号は必ず記入してください');
      $('.menu3').addClass('red');
    } else {
      $('.menu3').addClass('red');
      alert('電話番号は11桁の数字で入力してください');
    }

    //車の大きさの未記入でのアラート表示
    answer = false;

    for(let i = 0; i < form.car.length; i++) {
      if(form.car[i].checked) {
        answer = true;
        $('.menu4').removeClass('red');
      }
    }
    //(!answer)の場合をfor文内に入れてしまうとアラートも繰り返されてしまったからfor文の外で実行
    if(!answer) {
      $('.menu4').addClass('red');
      //alert('車の大きさは必ずチェックしてください');
    }

    //4つずべての記入ができていない時のアラートを一枚で教示する
    if(form.name1.value === '' && form.name2.value === '' &&
     form.mail.value === '' && form.tell.value === '' &&
     !answer) {
       window.alert('項目は全て必ず記入してください');
     } else {
       if(form.name1.value === '' && form.name2.value === '') {
         alert('※名前は名字、名前ともに必ず記入してください');
       }
       if(form.mail.value === '') {
         alert('※メールアドレスは必ず記入してください');
       }
       if(form.tell.value === '') {
         alert('※電話番号は必ず記入してください');
       }
       if(!answer) {
         alert('※車の大きさは必ずチェックしてください');
       }
     }
    //送信ボタン、redクラスがない状態でsend.htmlに飛べる
    const target = document.getElementById('botan');
    if($('.menu').hasClass('red')) {
    } else {
      target.href = "send.html";
    }

  });

}



/*
・全角・半角指定（全角指定の項目に、半角文字が混ざっていた場合にアラート出力　例：住所などに利用されている）
*/

//試したこと  if (!priceGet){ return false;}を入れた
