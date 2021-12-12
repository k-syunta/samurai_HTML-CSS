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
    } else {
        $('.menu1').removeClass('red');
    }

    //メールアドレス
    if(form.mail.value.match( /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/)) {
      $('.menu2').removeClass('red');
    } else if(form.mail.value === '') {
      $('.menu2').addClass('red');
    } else {
      $('.menu2').addClass('red');
    }

    //電話番号数字のみ１１桁でtrue
    if(form.tell.value.match(/[0-9]{11}/g)) {
      $('.menu3').removeClass('red');
    } else if(form.tell.value === '') {
      $('.menu3').addClass('red');
    } else {
      $('.menu3').addClass('red');
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
    }

    let alertName = '※名前は名字、名前ともに必ず記入してください';
    let alertMail = '※メールアドレスは必ず記入してください';
    let alertMail2 = '※メールアドレスを正しい形式で入力してください';
    let alertTell = '※電話番号は必ず記入してください';
    let alertTell2 = '※電話番号は11桁の数字で入力してください';
    let alertCar = '※車の大きさは必ずチェックしてください';
    let alertAll = '※項目は全て必ず記入してください';

    //アラートに表示するメッセージを格納するための配列
    let alert = new Array();

    function makeAlert() {
      if(form.name1.value === '' && form.name2.value === '' &&
       form.mail.value === '' && form.tell.value === '' &&
       !answer) {
         alert.push(alertAll);
       } else {
         if(form.name1.value === '' && form.name2.value === '') {
           alert.push(alertName);
         }
         if(form.mail.value === '') {
           alert.push(alertMail);
         } else {
           //空白ではないが条件に合わなかった場合
           if(form.mail.value.match( /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/)) {
           } else {
             alert.push(alertMail2);
           }
         }
         if(form.tell.value === '') {
           alert.push(alertTell);
         } else {
           //空白ではないが条件に合わなかった場合
           if(form.tell.value.match(/[0-9]{11}/g)) {
           } else {
             alert.push(alertTell2);
           }
         }
         if(!answer) {
           alert.push(alertCar);
         }
       }

       //let joinAlert = alert.join('\n');

       //console.log(joinAlert);

       let alertValue = alert.map(function(value, index, array) {
         return value;
       });

       let alertValueArray = new Array();

       if(alertValue.length === 1) {
         alertValueArray.push(alertValue[0]);
       } else if(alertValue.length === 2) {
         alertValueArray.push(alertValue[0], alertValue[1]);
       } else if(alertValue.length === 3) {
         alertValueArray.push(alertValue[0], alertValue[1], alertValue[2]);
       } else if(alertValue.length === 4) {
         alertValueArray.push(alertValue[0], alertValue[1], alertValue[2], alertValue[3]);
       }

       let alertValueArrayjoin = alertValueArray.join('\n');
       window.alert(alertValueArrayjoin);

    }
    makeAlert();

    //送信ボタン、redクラスがない状態でsend.htmlに飛べる
    const target = document.getElementById('botan');
    if($('.menu').hasClass('red')) {
    } else {
      target.href = "send.html";
    }

  });

}
