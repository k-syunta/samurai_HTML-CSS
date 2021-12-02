'use string';


  const btn = document.getElementById('btn');
  const form = document.forms.myForm;

  if (btn != null) {
  btn.addEventListener('click', ()=> {

    //名前空白で記入制限
    if(form.name.value ===　'') {
      $('.menu1').addClass('red');
      alert('※名前は必ず記入してください');
    } else {
        $('.menu1').removeClass('red');
    }

    //メールアフドレス
    if(form.mail.value.match( /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/)) {
      $('.menu2').removeClass('red');
    } else if(form.mail.value === '') {
      alert('※メールアドレスは必ず記入してください');
      $('.menu2').addClass('red');
    } else {
      $('.menu2').addClass('red');
      alert('メールアドレスを正しい形式で入力してください');
    }

    //電話番号数字のみ１１桁でtrue
    if(form.tell.value.match(/[0-9]{11}/g)) {
      $('.menu3').removeClass('red');
    } else if(form.tell.value === '') {
      alert('※電話番号は必ず記入してください');
      $('.menu3').addClass('red');
    } else {
      $('.menu3').addClass('red');
      alert('電話番号は11桁の数字で入力してください');
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
