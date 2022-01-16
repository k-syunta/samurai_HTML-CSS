'use strict';

//リスト内容をローカルストレージに保存する
let item = document.getElementById('item');

//--------------------------------------------------------------------------------

//プラスボタンのクリックの動作
const addBtn = document.getElementById('addBtn');
const mainList = document.getElementById('mainList');

//一番最後にあるinput要素を取得
let lastChild = mainList.lastElementChild;
let childInput = lastChild.lastElementChild;

//買い物リストに表示されているものを格納する配列
//let valueList = [];

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

});

function makeList() {
  //input要素を生成
  let newInput = document.createElement('input');
  newInput.id = 'item';
  newInput.className = 'item';
  newInput.type = 'text';
  newInput.name = 'item';
  newInput.placeholder = 'タップして入力';
  //li要素を生成
  let newLi = document.createElement('li');
  newLi.className = 'listItem';
  //生成した要素をそれぞれの要素に入れ込んでいく
  mainList.appendChild(newLi);
  newLi.appendChild(newInput);
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

  childInput.focus();
  //input要素の0文字目にカーソルを合わせる
  childInput.setSelectionRange(0, 0);
}

//--------------------------------------------------------------------------------

//追加されたものから順にローカルストレージに保存していく

//買い物リストに表示されているものを格納する配列
let valueList = [];

function keepList() {

  const mainList = document.getElementById('mainList');

  //関数内でもう一度定義する
  //let lastChild = mainList.lastElementChild;
  //let childInput = lastChild.lastElementChild;

  let item = document.querySelectorAll('.item');

  for(let i = 0; i < item.length; i++) {
    console.log(item[i].value);
    valueList.push(item[i].value);
  }

  localStorage.setItem("key_valueList", JSON.stringify(valueList));

}

//--------------------------------------------------------------------------------

//保存した買い物リストの内容をリストを開くたびに元の状態に表示するための関数
function displayList() {

  //もともと表示されている一つ目のリストを非表示にする
  let listItem = document.getElementById('listItem');
  listItem.classList.add('nolook');

  let jsonValue = JSON.parse(localStorage.getItem("key_valueList"));

  for(let i = 0; i < jsonValue.length; i++) {
    let newInput = document.createElement('input');
    newInput.id = 'item';
    newInput.className = 'item';
    newInput.type = 'text';
    newInput.name = 'item';
    newInput.value = jsonValue[i];
    //li要素を生成
    let newLi = document.createElement('li');
    newLi.className = 'listItem';
    //生成した要素をそれぞれの要素に入れ込んでいく
    if(newInput.value !== '') {
      mainList.appendChild(newLi);
      newLi.appendChild(newInput);
    }

    //もう一度ローカルストレージに保存することによってリストボタンが連続で押されてもリストには追加されない
    localStorage.setItem("key_valueList", JSON.stringify(valueList));
  }
}

//--------------------------------------------------------------------------------

//画面の切り替えをするボタンをクリックするときは買い物リストの内容をローカルストレージに保存するようにする
const calculatorBtn = document.getElementById('calculatorBtn');

calculatorBtn.addEventListener('click', ()=> {
  keepList();
})

//買い物リストを表示するボタンをクリックするときは元の状態に戻せるように関数を定義する
const shoppingListBtn = document.getElementById('shoppingListBtn');

shoppingListBtn.addEventListener('click', ()=> {
  displayList();
})

//--------------------------------------------------------------------------------

//--------------------------------------------------------------------------------

console.log(localStorage);
