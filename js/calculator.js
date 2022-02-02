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
//--------------------------------------------------------------------------------

//moneyListを非表示にする
const moneyList = document.getElementById('moneyList');
if(moneyList != null) {
  moneyList.classList.add('nolook');
}

//プラスボタンのクリックの動作
const addBtn = document.getElementById('addBtn');
const mainList = document.getElementById('mainList');

//一番最後にあるinput要素を取得
//let lastChild = mainList.firstElementChild;
//let childInput = lastChild.lastElementChild;

addBtn.addEventListener('click', ()=> {

  //一番最後のlistItemの一番最後の要素（input要素）
  const listItem = document.querySelectorAll('.listItem');
  for(let i = 0; i < listItem.length; i++) {
    let childInput = listItem[listItem.length - 1].lastElementChild;

    //最後のinput要素が空欄ならその要素にカーソルをセットする
    if(childInput.value === '') {
      setCursor();
      break;
    //最後のinput要素が空欄ではない場合、新しいinput要素を生成しその要素にカーソルをセットする
    } else {
      makeList();
      break;
    }



  }

  getLastInput();
  console.log(mainList);
  console.log(listItem);

});

function makeList() {
  //input要素を生成
  let newInput = document.createElement('input');
  newInput.id = 'item';
  newInput.className = 'item';
  newInput.type = 'text';
  newInput.name = 'item';
  newInput.placeholder = 'タップして入力';
  //span要素を生成
  let newSpan = document.createElement('span');
  newSpan.id = 'checkmark';
  newSpan.textContent = '○';
  //2つ目のspan要素を生成
  let newSpan2 = document.createElement('span');
  newSpan2.id = 'deleteBtn';
  newSpan2.textContent = '削除';
  //li要素を生成
  let newLi = document.createElement('li');
  newLi.className = 'listItem';
  //生成した要素をそれぞれの要素に入れ込んでいく
  mainList.appendChild(newLi);
  newLi.appendChild(newSpan);
  newLi.appendChild(newSpan2);
  newLi.appendChild(newInput);

  //金額の表示をするli要素の生成
  //input要素の生成(金額：￥の部分)
  let newSpan3 = document.createElement('span');
  newSpan3.id = 'listText';
  newSpan3.textContent = '金額：￥';
  //一つ目のimage要素の生成
  let newImage = document.createElement('img');
  newImage.id = 'parcentImage';
  newImage.src = "images/parcent.png";
  //二つ目のimage要素の生成
  let newImage2 = document.createElement('img');
  newImage2.id = 'cameraImage';
  newImage2.src = "images/camera.png";
  //input要素の生成
  let newInput2 = document.createElement('input');
  newInput2.id = 'money';
  newInput2.className = 'money';
  newInput2.type = 'text';
  newInput2.name = 'money';
  newInput2.placeholder = '半角数字で入力';
  //li要素を生成
  let newLi2 = document.createElement('li');
  newLi2.className = 'moneyList nolook';
  //生成した要素をそれぞれの要素に入れ込んでいく
  mainList.appendChild(newLi2);
  newLi2.appendChild(newSpan3);
  newLi2.appendChild(newImage);
  newLi2.appendChild(newImage2);
  newLi2.appendChild(newInput2);

  //新しく生成したcheckmarkにイベントハンドラを割り当てる
  makeCheckmark();
}

//--------------------------------------------------------------------------------

//clickZoneのクリックで一番最後のinput要素(li要素)にカーソルをセットする
const clickZone = document.getElementById('clickZone');

clickZone.addEventListener('click', ()=> {

  //一番最後のlistItemの一番最後の要素（input要素）
  const listItem = document.querySelectorAll('.listItem');
  for(let i = 0; i < listItem.length; i++) {
    let childInput = listItem[listItem.length - 1].lastElementChild;

    //最後のinput要素が空欄の状態の場合
    if(childInput.value === '') {
      setCursor();
    }
    break;

  }

});

//カーソルを合わせるためのメソッド
function setCursor() {

  //一番最後のlistItemの一番最後の要素（input要素）
  const listItem = document.querySelectorAll('.listItem');
  for(let i = 0; i < listItem.length; i++) {
    let childInput = listItem[listItem.length - 1].lastElementChild;

    if(childInput.value === '') {
      childInput.focus();
      //input要素の0文字目にカーソルを合わせる
      childInput.setSelectionRange(0, 0);
      break;
    }

  }

}

//--------------------------------------------------------------------------------

//追加されたものから順にローカルストレージに保存していく
//買い物リストに表示されているものを格納する配列
//let valueList = new Array();

function keepList() {

  //買い物リストに表示されているものを格納する配列
  //(その都度書き換えられるように関数内で定義)
  let valueList = new Array();

  const mainList = document.getElementById('mainList');

  let item = document.querySelectorAll('.item');

  for(let i = 0; i < item.length; i++) {
    valueList.push(item[i].value);
  }

  localStorage.setItem("key_valueList", JSON.stringify(valueList));

}

function keepCheck() {

  //買い物リストのチャック機能の判定を行うための材料を格納する配列
  //(その都度書き換えられるように関数内で定義)
  let checkYesNo = new Array();

  const mainList = document.getElementById('mainList');

  const checkmark = document.querySelectorAll('#checkmark');

  //どのリストにチェックマークがついているのかを判定
  for(let c = 0; c < checkmark.length; c++) {
    if(checkmark[c].className === 'checkmark') {
      checkYesNo.push('yes');
    } else {
      checkYesNo.push('no');
    }
  }

  localStorage.setItem("key_checkYesNo", JSON.stringify(checkYesNo));

}

//--------------------------------------------------------------------------------

//保存した買い物リストの内容をリストを開くたびに元の状態に表示するための関数
function displayList() {

  let jsonValue = JSON.parse(localStorage.getItem("key_valueList"));
  let jsonCheck = JSON.parse(localStorage.getItem("key_checkYesNo"));

  for(let i = 0; i < jsonValue.length; i++) {
    //input要素を生成
    let newInput = document.createElement('input');
    newInput.id = 'item';
    newInput.className = 'item';
    newInput.type = 'text';
    newInput.name = 'item';
    newInput.value = jsonValue[i];
    //span要素を生成
    let newSpan = document.createElement('span');
    newSpan.id = 'checkmark';
    newSpan.textContent = '○';
    //2つ目のspan要素を生成
    let newSpan2 = document.createElement('span');
    newSpan2.id = 'deleteBtn';
    newSpan2.textContent = '削除';
    //li要素を生成
    let newLi = document.createElement('li');
    newLi.className = 'listItem';
    //生成した要素をそれぞれの要素に入れ込んでいく
    if(newInput.value !== '') {
      mainList.appendChild(newLi);
      newLi.appendChild(newSpan);
      newLi.appendChild(newSpan2);
      newLi.appendChild(newInput);
    }

    //もしfirstitemにnolookがついていたら最初の要素には追加しない
    let firstItem = document.getElementById('listItem');
    console.log(firstItem);
    let result = firstItem.classList.contains('nolook');
    console.log(result);

    if(i >= 0 && result !== true) {
      //金額の表示をするli要素の生成
      //input要素の生成(金額：￥の部分)
      let newSpan3 = document.createElement('span');
      newSpan3.id = 'listText';
      newSpan3.textContent = '金額：￥';
      //一つ目のimage要素の生成
      let newImage = document.createElement('img');　
      newImage.id = 'parcentImage';
      newImage.src = 'images/parcent.png';
      //二つ目のimage要素の生成
      let newImage2 = document.createElement('img');
      newImage2.id = 'cameraImage';
      newImage2.src = 'images/camera.png';
      //input要素の生成
      let newInput2 = document.createElement('input');
      newInput2.id = 'money';
      newInput2.className = 'money';
      newInput2.type = 'text';
      newInput2.name = 'money';
      newInput2.placeholder = '半角数字で入力';
      //li要素を生成
      let newLi2 = document.createElement('li');
      newLi2.className = 'moneyList nolook';
      //生成した要素をそれぞれの要素に入れ込んでいく
      mainList.appendChild(newLi2);
      newLi2.appendChild(newSpan3);
      newLi2.appendChild(newImage);
      newLi2.appendChild(newImage2);
      newLi2.appendChild(newInput2);
    }

    //繰り返しの中でjsonCheckにyesが格納されている時はcheckmarkクラスを追加する
    if(jsonCheck[i] === 'yes') {
      newSpan.className = 'checkmark';
    }

    //ここでもう一度セットすることによってリロードによってリストが消えてしまっている
    //もう一度ローカルストレージに保存することによってリストボタンが連続で押されてもリストには追加されない
    //localStorage.setItem("key_valueList", JSON.stringify(valueList));
  }

  //要素が生成されてから動作を行うことで状況によって動作の振れ幅をなくす
  let item = document.querySelectorAll('#item');
  let firstInput = document.querySelector('.firstInput');

  //リストの数が１より多いならもともと表示されている一つ目のリストを非表示にする
  if(item.length > 1) {
    firstInput.classList.add('nolook');
  }

}

//--------------------------------------------------------------------------------

//画面の切り替えをするボタンをクリックするときは買い物リストの内容をローカルストレージに保存するようにする
const cameraBtn = document.getElementById('cameraBtn');

cameraBtn.addEventListener('click', ()=> {
  keepList();
  keepCheck();
})

//買い物リストを表示するボタンをクリックするときは元の状態に戻せるように関数を定義する
const shoppingListBtn = document.getElementById('shoppingListBtn');

//nowURLでは、URLを取得し、/ごとに区切り、その最後の要素を取得している
let nowURL = window.location.href.split('/').pop();

//ファイルによっての条件分岐を作り結果によってファンクションを定義する
if(nowURL != 'shoppingList.html') {
  shoppingListBtn.addEventListener('click', ()=> {
    displayList();
  })
}

//--------------------------------------------------------------------------------

// checkmarkが押された時のイベントハンドラ
const onCheckmarkClicked = (e) => {
  //イベントが起こる元となるもの
  const targetCheckmark = e.currentTarget;
  //span要素の次の次にinput要素があるから
  const targetdeleteBtn = targetCheckmark.nextElementSibling;
  const targetInputBox = targetdeleteBtn.nextElementSibling;
  let result = targetCheckmark.classList.contains("checkmark");
  //input要素をが空欄の場合はチェックマークはつけられなくする
  if (targetInputBox.value !== "") {
    if (result === true) {
      targetCheckmark.classList.remove("checkmark");
      targetInputBox.disabled = "";
    } else {
      targetCheckmark.classList.add("checkmark");
      targetInputBox.disabled = "disabled";
    }
  }
  //最後にチェックマークをつけた時にもローカルストレージへの保存を行う
  keepCheck();
};

//クリックされたリストにクラスを追加しチェックマークを追加する
function makeCheckmark() {
  const checkmark = document.querySelectorAll("#checkmark");

  for (let c = 0; c < checkmark.length; c++) {
    // イベントハンドラを一旦解除
    checkmark[c].removeEventListener("click", onCheckmarkClicked);
    //checkmark[c].removeEventListener("touchend", onCheckmarkClicked);
    // して登録
    checkmark[c].addEventListener("click", onCheckmarkClicked);
    //checkmark[c].addEventListener("touchend", onCheckmarkClicked);
  }
}

//--------------------------------------------------------------------------------

//追加されたinput要素に文字が打たれカーソルが離れたらローカルストレージに保存されるようにする
function getLastInput() {

  //一番最後のlistItemの一番最後の要素（input要素）
  const listItem = document.querySelectorAll('.listItem');
  for(let i = 0; i < listItem.length; i++) {
    let lastInput = listItem[listItem.length - 1].lastElementChild;

    lastInput.addEventListener('change', ()=> {
      keepList();
      setSwipe();
    })

    break;

  }

}

//--------------------------------------------------------------------------------

//スワイプによって削除ボタンを出し入れをする
function setSwipe() {

  let swipeZone = document.querySelectorAll('.listItem');

  let startX; //タッチ開始の座標
  let startY;
  let moveX;　//スワイプ中の座標
  let moveY;
  let dist = 60; //スワイプを感知する最低距離(px)

  //全てのswipeZoneを取得
  for(let i = 0; i < swipeZone.length; i ++) {

    //もし空欄の場合スワイプできなくする
    //if(swipeZone[i].lastElementChild.value !== '') {
      //タッチ開始時の座標を取得
      swipeZone[i].addEventListener('touchstart', (e)=> {
        const dom = e.target;
        //e.preventDefault();
        startX = e.touches[0].pageX;
        startY = e.touches[0].pageY;
      })

      //スワイプ中の座標を取得
      swipeZone[i].addEventListener('touchmove', (e)=> {
        //e.preventDefault();
        moveX = e.changedTouches[0].pageX;
        moveY = e.changedTouches[0].pageY;
      })

      //タッチ終了時にスワイプの距離から左右どちらにスワイプしていたのかを判定
      swipeZone[i].addEventListener('touchend', (e)=> {
        if(startX > moveX && startX > moveX + dist) {

          //関数が定義されている段階でshowクラスが追加されている要素を取得
          let haveShow = document.querySelectorAll('.show');
          //もともとshowクラスが追加されている要素からはshowクラスを削除する（削除ボタンは一つしか表示しない状態にする）
          for(let s = 0; s < haveShow.length; s++) {
            haveShow[s].classList.remove('show');
          }

          //右から左にスワイプ
          //もともとのshowクラスを削除した後で新しい要素にshowクラスを追加する
          swipeZone[i].classList.add('show');
          deleteSingle();

        } else if(startX < moveX && startX + dist < moveX) {
          //左から右にスワイプ
          swipeZone[i].classList.remove('show');
        }
      })
    //}

  }

}

//--------------------------------------------------------------------------------

//削除ボタンクリック時の動作（リストごとの削除ボタン）

function deleteSingle() {

  //showクラスのついている要素のindex番号を取得
  let elements = document.querySelectorAll('.listItem');
  let element = document.querySelector('.show');
  elements = [].slice.call(elements);
  let index = elements.indexOf(element);
  //showクラスのついている要素の削除ボタンを取得
  let haveShow = document.querySelectorAll('.show');
  let deleteBtn = document.querySelectorAll('#deleteBtn');
  let firstItem = document.getElementById('listItem');

  console.log(firstItem);
  console.log(index);
  console.log(elements.length);
  console.log(mainList);
  console.log(elements[0]);

  deleteBtn[index].addEventListener('click', ()=> {

    let firstItem = document.getElementById('listItem');
    let result = firstItem.classList.contains('nolook');

    //一番最初のinput要素が非表示の場合
    if(result === true) {
      if(index <= 1 && elements.length <= 2) {
        //value値を空欄にし元の状態に戻す（リストがなくならないようにするため空欄にするだけ）
        haveShow[0].lastElementChild.value = '';
        haveShow[0].lastElementChild.placeholder = "タップして入力";
        //showクラスを削除して削除ボタンを非表示にする
        haveShow[0].classList.remove('show');
        //チェックマークがついている場合、取り外す
        if(haveShow[0].firstElementChild.className === "checkmark") {
          haveShow[0].firstElementChild.classList.remove('checkmark');
        }
      } else {
        //moneyListも削除する（最後の一つは残したい）
        let moneyList = haveShow[0].nextElementSibling;
        if(moneyList != null) {
          moneyList.classList.remove('nolook');
          moneyList.remove();
        }
        //最後に削除しないと、moneyListの時に読み込めなくなり予期せぬ挙動につながる
        haveShow[0].remove();
      }
      //一番最初のinput要素が表示されている場合
    } else {
      if(index <= 0 && elements.length <= 1) {
        //value値を空欄にし元の状態に戻す（リストがなくならないようにするため空欄にするだけ）
        haveShow[0].lastElementChild.value = '';
        haveShow[0].lastElementChild.placeholder = "タップして入力";
        //showクラスを削除して削除ボタンを非表示にする
        haveShow[0].classList.remove('show');
        //チェックマークがついている場合、取り外す
        if(haveShow[0].firstElementChild.className === "checkmark") {
          haveShow[0].firstElementChild.classList.remove('checkmark');
        }
      } else {
        //moneyListも削除する（最後の一つは残したい）
        let moneyList = haveShow[0].nextElementSibling;
        if(moneyList != null) {
          moneyList.classList.remove('nolook');
          moneyList.remove();
        }
        //最後に削除しないと、moneyListの時に読み込めなくなり予期せぬ挙動につながる
        haveShow[0].remove();
      }
    }

    keepList();

  })

}

//--------------------------------------------------------------------------------

//削除ボタンクリック時の動作（リスト全体の削除ボタン）

function deleteAll() {

  const allDeleteBtn = document.getElementById('allDeleteBtn');

  allDeleteBtn.addEventListener('click', ()=> {

    //アラート表示で削除の確認
    let result = window.confirm('OKをクリックすると、リストの項目が全て削除されます。');
    console.log(result);



    //確認ダイアログでOKボタンがクリックされた場合のみ削除
    if(result === true) {
      const mainList = document.getElementById('mainList');
      const listItem = document.querySelectorAll('.listItem');
      const moneyList = document.querySelectorAll('.moneyList');
      console.log(listItem);
      console.log(moneyList);

      for(let i = 0; i < listItem.length; i++) {
        listItem[i].remove();
      }

      for(let m = 0; m < moneyList.length; m++) {
        moneyList[m].remove();
      }
      //リストが全て消去されてしまうので、makeListによって最初のリストを生成する
      makeList();
      //リストの状況をその都度保存する
      keepList();
    }

  });

}

//--------------------------------------------------------------------------------

//開始ボタンのクリックでプラスボタンを非表示にしテキストを終了（会計）などにかえる

const startBtn = document.getElementById('startBtn');

startBtn.addEventListener('click', ()=> {

  //テキストが終了だった場合（終了ボタンを押したときの動作）
  if(startBtn.textContent === '終了') {
    //終了ボタンのクリックでリストを増やすボタンを表示する
    addBtn.classList.remove('nolook');
    //終了ボタンのテキストを開始に戻す
    startBtn.textContent = '開始';
    //金額の表示される要素を非表示モードにする
    const moneyList = document.querySelectorAll('.moneyList');
    for(let i = 0; i < moneyList.length; i++) {
      moneyList[i].classList.add('nolook');
    }
  } else {
    //開始ボタンのクリックでリストを増やすボタンを一旦非表示にする(無駄遣い防止)
    addBtn.classList.add('nolook');
    //開始ボタンのテキストを終了にかえる
    startBtn.textContent = '終了';
    //金額の表示される要素を表示モードにする
    const moneyList = document.querySelectorAll('.moneyList');
    for(let i = 0; i < moneyList.length; i++) {
      moneyList[i].classList.remove('nolook');
    }
  }

})

//--------------------------------------------------------------------------------














//--------------------------------------------------------------------------------

//ローカルストレージに保存されている内容をリストとして表示
displayList();
//表示されている内容をクリックするとチェックマークが追加される
makeCheckmark();
//最後に表示されているinput要素に文字を記入しカーソルが離れた段階でローカルストレージに保存される
getLastInput();
//スワイプされた時に削除ボタンの表示したり、非表示にしたりする
setSwipe();
//削除ボタンでリスト内容を全て消去する
deleteAll();
console.log(localStorage);

/*
加えたい機能
・金額が入力されたら自動的にチェックマークがつく
・
・
・
・
・
・
・
・
*/
