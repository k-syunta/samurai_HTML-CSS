'use strict';

//変数の定義
let answer = "";

let clearflag = false;  //数字の有無
let enzan = "";  //演算記号の初期は空
let dot = false;  //小数点の有無
let errorflag = false;  //エラーフラグ
let cflag = false;  //AC,Cの切り替え

//ACを押すと値がクリアされる
$(function (){
  $('#clear').click(function (){
    //cflag = true　ACがCになっていた時の場合
    if(cflag == true) {
      $('#answer').val("");
      cflag = false;
      $('#clear').val('AC');
      $('.btn').prop('disabled', false);
      console.log(answer);
    //cflag == false　ACの場合
    } else if(cflag == false) {
      $('#answer').val("");
      answer = "";
      $('#clear').val('AC');
      //演算記号もクリアに
      enzan = "";
      $('#dot').prop('disabled', false);
      $('.btn').prop('disabled', false);
      dot = false;
      clearflag = false;
      errorflag = false;
      console.log(answer);
    }
  });
});

//数字ボタンのクリックでの数値の表示
$(function (){
  $('.btn').click(function (){
    //数値の桁数が１０桁以上の場合
    if($('#answer').val().length >= 10) {
      $('.btn').prop('disabled', true);
      $('#answer').val('error!');
    } else {
      //cleaflag = trueの場合表示中の数値をクリアする
      if(clearflag === true) {
        $('#answer').val("");
        //数字を押したときに表示がクリアされるようにクリアフラグを定義
        clearflag = false;
        //小数点を押せるようにする
        $('#dot').prop('disabled', false);
      }
    }

    //AC表示をCに切り替える
    $('#clear').val('C');
    Number($('#answer').val($('#answer').val() + $(this).val()));
    cflag = true;
  });
});

//小数点が一度押されたら表示中に2度は押せなくする
$(function (){
  $('#dot').on('click', function (){
    $('#dot').prop('disabled', true);
    Number($('#answer').val($('#answer').val() + $(this).val()));
  });
});

//足し算記号のクリックでenzanClickに記号を渡す
$(function (){
  $('#addition').click(function (){
    enzanClick('+');
  });
});

//引き算記号のクリックでenzanClickに記号を渡す
$(function (){
  $('#substraction').click(function (){
    enzanClick('-');
  });
});

//掛け算記号のクリックでenzanClickに記号を渡す
$(function (){
  $('#multiplication').click(function (){
    enzanClick('×');
  });
});

//割り算記号のクリックでenzanClickに記号を渡す
$(function (){
  $('#devision').click(function (){
    enzanClick('÷');
  });
});

//%を押したら表示中の数字に0.01をかける
$(function (){
  $('#percent').click(function (){
    $('#answer').val(Number($('#answer').val()) * 0.01);
  });
});

//+/-を押したら表示中の数字に(-1)かける
$(function (){
  $('#plusminus').click(function (){
    $('#answer').val(Number($('#answer').val()) * (-1));
  });
});

//enzanClickは前の演算記号を覚えてなければ今の表示している値をanswerに保存
function enzanClick(kigou) {
  if(enzan === '') {
    answer = Number($('#answer').val());
  } else {
    enzanClick1()
  }
  //表示桁数を10までにする
  digit();

  clearflag = true;
  enzan = kigou;
}

//演算記号に何か覚えていれば、answerに保存した値と表示中の値と記憶した演算記号で計算
function enzanClick1() {
  if(enzan === '+') {
    answer += Number($('#answer').val());
  } else if(enzan === '-') {
    answer -= Number($('#answer').val());
  } else if(enzan === '×') {
    answer *= Number($('#answer').val());
  } else if(enzan === '÷') {
    answer /= Number($('#answer').val());
  }
}

//=を押したとき
$(function (){
  $('#equal').click(function (){
    enzanClick1();
    digit();

    clearflag = false;
    cflag = false;
    $('#clear').val('AC');
  });
});

//表示できる桁数を10桁以内にする
function digit() {
  //小数点で切り分ける
  let num1 = String(answer).split('.');

  //整数部分で11桁以上の場合、エラーを表示
  if(num1[0].length > 10) {
    $('#answer').val('error!');
    errorflag = true;
    //整数部が10桁までの場合、整数部はそのまま表示、少数部は値を丸めて全部で10桁以内にする
    //10から整数部の桁を引いた数だけ小数部を表示できる
  } else if(String(answer).length >= 10 && num1[0].length <= 10) {
    let n = 10 - num1[0].length;
    answer = Number(answer).toFixed(n);
    $('#answer').val(answer);
  } else {
    $('#answer').val(answer);
  }
}

//-------------------------------------------------------------------------------
