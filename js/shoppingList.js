'use strict';

//--------------------------------------------------------------------------------

//プラスボタンのクリックの動作
const addBtn = document.getElementById('addBtn');
const mainList = document.getElementById('mainList');

//一番最後にあるinput要素を取得
let lastChild = mainList.lastElementChild;
let childInput = lastChild.lastElementChild;

addBtn.addEventListener('click', ()=> {

  //ここでもう一度新しい最後の子要素を定義したらいける
  let lastChild = mainList.lastElementChild;
  let childInput = lastChild.lastElementChild;

  //最後のinput要素が空欄ならその要素にカーソルをセットする
  if(childInput.value === '') {
    setCursor();
  //最後のinput要素が空欄ではない場合、新しいinput要素を生成しその要素にカーソルをセットする
  } else {
    makeList();
  }

  getLastInput();

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
  newLi.appendChild(newSpan2);
  newLi.appendChild(newSpan);
  newLi.appendChild(newInput);

  //新しく生成したcheckmarkにイベントハンドラを割り当てる
  makeCheckmark();
}

//--------------------------------------------------------------------------------



//--------------------------------------------------------------------------------

//clickZoneのクリックで一番最後のinput要素(li要素)にカーソルをセットする
const clickZone = document.getElementById('clickZone');

clickZone.addEventListener('click', ()=> {
  //input要素が空欄の状態の場合
  if(childInput.value === '') {
    setCursor();
  }

});

//カーソルを合わせるためのメソッド
function setCursor() {

  let lastChild = mainList.lastElementChild;
  let childInput = lastChild.lastElementChild;

  if(childInput.value === '') {
    childInput.focus();
    //input要素の0文字目にカーソルを合わせる
    childInput.setSelectionRange(0, 0);
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
      newLi.appendChild(newSpan2);
      newLi.appendChild(newSpan);
      newLi.appendChild(newInput);
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
const calculatorBtn = document.getElementById('calculatorBtn');

calculatorBtn.addEventListener('click', ()=> {
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
  //span要素の次にinput要素があるから
  const targetInputBox = targetCheckmark.nextElementSibling;
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

  //最後のinput要素を取得する
  let lastChild = mainList.lastElementChild;
  let lastInput = lastChild.lastElementChild;

  lastInput.addEventListener('change', ()=> {
    keepList();
  })

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

    //タッチ開始時の座標を取得
    swipeZone[i].addEventListener('touchstart', (e)=> {
      e.preventDefault();
      startX = e.touches[0].pageX;
      startY = e.touches[0].pageY;
    })

    //スワイプ中の座標を取得
    swipeZone[i].addEventListener('touchmove', (e)=> {
      e.preventDefault();
      moveX = e.changedTouches[0].pageX;
      moveY = e.changedTouches[0].pageY;
    })

    //タッチ終了時にスワイプの距離から左右どちらにスワイプしていたのかを判定
    swipeZone[i].addEventListener('touchend', (e)=> {
      if(startX > moveX && startX > moveX + dist) {
        //右から左にスワイプ
        swipeZone[i].classList.add('show');
      } else if(startX < moveX && startX + dist < moveX) {
        //左から右にスワイプ
        swipeZone[i].classList.remove('show');
      }
    })



  }

}


//--------------------------------------------------------------------------------

//ローカルストレージに保存されている内容をリストとして表示
displayList();
//表示されている内容をクリックするとチェックマークが追加される
makeCheckmark();
//最後に表示されているinput要素に文字を記入しカーソルが離れた段階でローカルストレージ部保存される
getLastInput();
//スワイプされた時に削除ボタンの表示したり、非表示にしたりする
setSwipe();
console.log(localStorage);
