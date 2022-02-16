'use strict';

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
      //一つの時にお気に入り機能入らないからaddBtnが押されてからお気に入り機能の動作を加える
      changeColor();
      break;
    }

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
  //img要素を生成
  let newImg = document.createElement('img');
  newImg.src = 'images/nostar.png';
  newImg.id = 'starImg';
  //li要素を生成
  let newLi = document.createElement('li');
  newLi.className = 'listItem';
  //生成した要素をそれぞれの要素に入れ込んでいく
  mainList.appendChild(newLi);
  newLi.appendChild(newSpan);
  newLi.appendChild(newSpan2);
  newLi.appendChild(newImg);
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
  //三つ目のimage要素の生成
  let newImage3 = document.createElement('img');
  newImage3.id = 'quantityImage';
  newImage3.src = "images/quantity.png";
  //input要素の生成
  let newInput2 = document.createElement('input');
  newInput2.id = 'money';
  newInput2.className = 'money';
  newInput2.type = 'text';
  newInput2.name = 'money';
  newInput2.placeholder = '半角入力';
  //li要素を生成
  let newLi2 = document.createElement('li');
  newLi2.className = 'moneyList nolook';
  //生成した要素をそれぞれの要素に入れ込んでいく
  mainList.appendChild(newLi2);
  newLi2.appendChild(newSpan3);
  newLi2.appendChild(newImage);
  newLi2.appendChild(newImage2);
  newLi2.appendChild(newInput2);
  newLi2.appendChild(newImage3);

  //新しく生成したcheckmarkにイベントハンドラを割り当てる
  makeCheckmark();
  setSwipe();
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

//一つ目のリストが入力された時にも記録する
let firstList = document.getElementById('listItem');
/*firstList.addEventListener('change', ()=> {
  keepList();
})*/

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
    //img要素を生成
    let newImg = document.createElement('img');
    newImg.src = 'images/nostar.png';
    newImg.id = 'starImg';
    //li要素を生成
    let newLi = document.createElement('li');
    newLi.className = 'listItem';
    //生成した要素をそれぞれの要素に入れ込んでいく
    if(newInput.value !== '') {
      mainList.appendChild(newLi);
      newLi.appendChild(newSpan);
      newLi.appendChild(newSpan2);
      newLi.appendChild(newImg);
      newLi.appendChild(newInput);
    }

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
    //三つ目のimage要素の生成
    let newImage3 = document.createElement('img');
    newImage3.id = 'quantityImage';
    newImage3.src = "images/quantity.png";
    //input要素の生成
    let newInput2 = document.createElement('input');
    newInput2.id = 'money';
    newInput2.className = 'money';
    newInput2.type = 'text';
    newInput2.name = 'money';
    newInput2.placeholder = '半角入力';
    //li要素を生成
    let newLi2 = document.createElement('li');
    newLi2.className = 'moneyList nolook';
    //生成した要素をそれぞれの要素に入れ込んでいく
    mainList.appendChild(newLi2);
    newLi2.appendChild(newSpan3);
    newLi2.appendChild(newImage);
    newLi2.appendChild(newImage2);
    newLi2.appendChild(newInput2);
    newLi2.appendChild(newImage3);
    //繰り返しの中でjsonCheckにyesが格納されている時はcheckmarkクラスを追加する
    if(jsonCheck[i] === 'yes') {
      newSpan.className = 'checkmark';
    }

  }
　　
  organizeList();
}

//--------------------------------------------------------------------------------

//開始ボタンを押したときにリストの整理を行う関数
function organizeList() {
  //要素が生成されてから動作を行うことで状況によって動作の振れ幅をなくす
  let item = document.querySelectorAll('#item');
  //一番最初の項目リストを取得
  let firstList = document.querySelector('.firstInput');
  //一番最初のマネーリストを取得
  let secondList = document.querySelector('.moneyList');

  //secondList の前の要素が firstList でない場合は secondListは消さない
  if(firstList != null) {
    if(secondList.previousElementSibling != firstList) {
      firstList.classList.add('nolook');
    //item.lengthが 1 以上であればどちらの要素も見えなくする
    } else if(item.length > 1) {
      firstList.classList.add('nolook');
      secondList.classList.add('nolook');
    }
  }


}

//--------------------------------------------------------------------------------

//画面の切り替えをするボタンをクリックするときは買い物リストの内容をローカルストレージに保存するようにする
/*const cameraBtn = document.getElementById('cameraBtn');

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
}*/

//--------------------------------------------------------------------------------

// checkmarkが押された時のイベントハンドラ
const onCheckmarkClicked = (e) => {
  //イベントが起こる元となるもの
  const targetCheckmark = e.currentTarget;
  //span要素の次の次にinput要素があるから
  const targetdeleteBtn = targetCheckmark.nextElementSibling;
  const targetImg = targetdeleteBtn.nextElementSibling;
  const targetInputBox = targetImg.nextElementSibling;
  let result = targetCheckmark.classList.contains("checkmark");
  //input要素をが空欄の場合はチェックマークはつけられなくする
  if (targetInputBox.value !== "") {
    if (result === true) {
      targetCheckmark.classList.remove("checkmark");
      targetInputBox.disabled = "";
      //もし開始ボタンクリック時なら書き換えられないままにしたい(buyクラスの有無で判定)
      let body = document.body;
      let result2 = body.classList.contains('buy');
      if(result2 === true) {
        targetInputBox.disabled = "disabled";
      }
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

    //チャックマークがついている場合そのリストのinput要素を書き換えられないようにする
    let next = checkmark[c].nextElementSibling;
    let next2 = next.nextElementSibling;
    let next3 = next2.nextElementSibling; //input要素
    let result = checkmark[c].classList.contains('checkmark');
    if(result === true) {
      next3.disabled = "disabled";
    } else {
      let body = document.body;
      let result2 = body.classList.contains('buy');
      if(result2 === true) {
        next3.disabled = "disabled";
      } else {
        next3.disabled = "";
      }
    }
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

  //changeColor();

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
  let firstItem = document.getElementById('.listItem');

  deleteBtn[index].addEventListener('click', ()=> {

    keepList();

    let firstItem = document.querySelector('.listItem');
    let result = firstItem.classList.contains('nolook');
    let input = haveShow[0].lastElementChild;
    let targetImg = input.previousElementSibling;

    //一番最初のinput要素が非表示の場合
    if(result === true) {
      if(index <= 1 && elements.length <= 2) {
        //お気に入り機能の星を白色に変えて見えなくする
        targetImg.src = 'images/nostar.png';
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
        targetImg.src = 'images/nostar.png';
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

  })

}

//--------------------------------------------------------------------------------

//削除ボタンクリック時の動作（リスト全体の削除ボタン）

function deleteAll() {

  const allDeleteBtn = document.getElementById('allDeleteBtn');

  allDeleteBtn.addEventListener('click', ()=> {

    //ボタンのテキストが削除だった場合
    if(allDeleteBtn.textContent === '削除') {
      //アラート表示で削除の確認
      let result = window.confirm('OKをクリックすると、リストの項目が全て削除されます。');

      //確認ダイアログでOKボタンがクリックされた場合のみ削除
      if(result === true) {
        const mainList = document.getElementById('mainList');
        const listItem = document.querySelectorAll('.listItem');
        const moneyList = document.querySelectorAll('.moneyList');

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
    }

  });

}

//--------------------------------------------------------------------------------

//合計ボタンがクリックされた時のイベントハンドラ
const allDeleteBtnClicked = () => {
  //この変数に金額を足していく
  let moneyCount = 0;
  let itemCheck = [];

  //ボタンのテキストが合計の場合
  if(allDeleteBtn.textContent === '合計') {

    //金額の合計を求める
    let money = document.querySelectorAll('#money');
    for(let i = 0; i < money.length; i++) {
      moneyCount += Number(money[i].value);
    }
    //チェックマークのついていない商品を取得
    let checkmark = document.querySelectorAll('#checkmark');
    for(let c = 0; c < checkmark.length; c++) {
      let result = checkmark[c].classList.contains('checkmark');
      let next = checkmark[c].nextElementSibling;
      let next2 = next.nextElementSibling;
      let targetInput = next2.nextElementSibling;
      //チェックマークがついていなくて、項目が記入されている場合
      if(result === false && targetInput.value !== '') {
        itemCheck.push(targetInput.value);
      }
    }
    if(itemCheck.length === 0) {
      window.alert('現在の合計金額は' + moneyCount + '円です\n全ての商品にチェックマークがついています！');
    } else {
      //アラートで合計金額と、チャックマークのついていない要素を格納した配列を表示
      window.alert('現在の合計金額は' + moneyCount + '円です\nチェックマークのついていない商品は ' + itemCheck + ' です');
    }
  }
}

//最初に入力された金額を把握しておくための配列（一つあたりの金額）
let firstAmount = [];

//個数計算済みの場合に判定できるようにフラグの配列を定義する
let flagArray = [];

//開始ボタンのクリックでプラスボタンを非表示にしテキストを終了（会計）などにかえる

const startBtn = document.getElementById('startBtn');
const allDeleteBtn = document.getElementById('allDeleteBtn');

startBtn.addEventListener('click', ()=> {

  let jsonValue = JSON.parse(localStorage.getItem("key_valueList"));

  //全てが空欄かどうかを確認するための配列
  let checkEmpty = [];

  //リストに項目が記入されていない場合クリックできない
  let item = document.querySelectorAll('#item');
  for(let i = 0; i < item.length; i++) {
    if(item[i].value !== '') {
      checkEmpty.push('no');
    }
  }
  let check = checkEmpty.indexOf('no');

  //checkEmptyに'no'が存在したらアラート表示、しなかったら動作を実行
  if(check === -1) {
    window.alert('リストの項目が登録されていません');
  } else {
    //テキストが終了だった場合（終了ボタンを押したときの動作）
    if(startBtn.textContent === '戻る') {
      //終了ボタンのクリックでリストを増やすボタンを表示する
      addBtn.classList.remove('nolook');
      //終了ボタンのテキストを開始に戻す
      startBtn.textContent = '金額';
      allDeleteBtn.textContent = '削除';
      //金額の表示される要素を非表示モードにする
      const moneyList = document.querySelectorAll('.moneyList');
      for(let ml = 0; ml < moneyList.length; ml++) {
        moneyList[ml].classList.add('nolook');
      }
      let item = document.querySelectorAll('.item');
      for(let it = 0; it < item.length; it++) {
        //開始ボタンのクリック時に買い物リストの書き換えを向こうにする
        item[it].disabled = "";
      }
      //買い物終了でbodyに追加したクラスを外す
      let body = document.body;
      body.classList.remove('buy');
    } else {
      //開始ボタンのクリックでリストを増やすボタンを一旦非表示にする(無駄遣い防止)
      addBtn.classList.add('nolook');
      //開始ボタンのテキストを終了にかえる
      startBtn.textContent = '戻る';
      allDeleteBtn.textContent = '合計';
      //金額の表示される要素を表示モードにする
      const moneyList = document.querySelectorAll('.moneyList');
      for(let i = 0; i < moneyList.length; i++) {
        moneyList[i].classList.remove('nolook');
      }

      //ぞれぞれのリストの金額の入力によって関数を定義する
      let moneyInput = document.querySelectorAll('#money');
      for(let m = 0; m < moneyInput.length; m++) {

        //最初の金額把握のための空欄を格納しておく
        if(firstAmount.length !== moneyInput.length) {
          firstAmount.push(moneyInput[m].value);
          flagArray.push(false);
        }

        moneyInput[m].addEventListener('change', (e)=> {

          let target = e.currentTarget;

          firstAmount.splice(m, 1, target.value);

          let parent = moneyInput[m].parentElement;
          let parentPrevious = parent.previousElementSibling;
          let checkmark = parentPrevious.firstElementChild;

          let result = checkmark.classList.contains('nolook');

          if(result === false && moneyInput[m].value != '') {
            checkmark.classList.add('checkmark');
          }
        })
      }
      calculationParcent();
      loadCamera();
      calculationQuantity();
      organizeList();

      //買い物中の目標にbodyにクラスを追加する
      let body = document.body;
      body.classList.add('buy');

      //開始ボタンのクリック時に未記入のinput要素（リスト）の削除
      let item = document.querySelectorAll('.item');
      for(let itt = 0; itt < item.length; itt++) {
        //開始ボタンのクリック時に買い物リストの書き換えを向こうにする
        item[itt].disabled = "disabled";
        let parent2 = item[itt].parentElement;
        let parentNext = parent2.nextElementSibling;
        //nolookのついているリストを取得
        let classCheck = parent2.classList.contains('nolook');
        //非表示の部分が空白により、一つ目のリストが消されないように(it != 0)もいれる
        //削除する条件（nolookクラスがついていなくて、リストが設定されていない時、一番最初のリストが消されないように）
        if(classCheck === false && item[itt].value === '') {
          parent2.remove();
          parentNext.remove();
        }
      }

    }

    //合計ボタンをクリックした時の動作
    allDeleteBtn.addEventListener('click', allDeleteBtnClicked);
  }

  keepList();
})


//--------------------------------------------------------------------------------

//％ボタンのクリックでparcentPageの表示

//配列に何番目のリストの動作なのかを格納しておく
let listCount = [];

//％ボタンをクリックした時のイベントハンドラ
const parcentClicked = (e) => {
  //イベントが起こる下となるもの
  const targetParcent = e.currentTarget;
  const targetCamera = targetParcent.nextElementSibling;
  const targetInput = targetCamera.nextElementSibling;
  const money = document.querySelectorAll('#money');

  //イベントが何番目の要素で起きているのかを取得
  for(let m = 0; m < money.length; m++) {
    if(targetInput === money[m]) {
      listCount.push(m);
    }
  }

  //input要素が空欄ではない場合にparcentPageを表示
  if(targetInput.value !== '') {
    parcentPage.classList.remove('nolook');
    bb.classList.remove('nolook');
    cb.classList.remove('nolook');
  }

}

//計算ボタンがクリックされた時のイベントハンドラ
//イベントハンドラで実行することにより一つの要素に限定して実行できている
const calculationClicked = () => {

  const calculationBtn = document.getElementById('calculationBtn');
  const parcentChoice = document.getElementById('parcentChoice');
  let num = parcentChoice.value;
  let countNum = listCount[listCount.length-1];
  //全体のinput要素から配列の数値の場所にあるものを取得する
  const money = document.querySelectorAll('#money');
  let discountAmount = Math.floor(money[countNum].value * ((100 - num) * 0.01));
  money[countNum].value = discountAmount;
  //もし個数選択が行われていない場合（その要素のlengthがtrueではない場合）
  if(flagArray[countNum] !== true) {
    firstAmount.splice(countNum, 1, discountAmount);
  }
  parcentPage.classList.add('nolook');
  bb.classList.add('nolook');
  cb.classList.add('nolook');
}

function calculationParcent() {

  const parcentBtn = document.querySelectorAll('#parcentImage');
  const money = document.querySelectorAll('#money');
  const parcentPage = document.getElementById('parcentPage');
  const bb = document.getElementById('bb');

  const calculationBtn = document.getElementById('calculationBtn');
  const parcentChoice = document.getElementById('parcentChoice');

  for(let p = 0; p < parcentBtn.length; p++) {
    parcentBtn[p].addEventListener('click', parcentClicked);
  }

  //計算ボタンの動作は繰り返す必要がないためforの外で
  calculationBtn.addEventListener('click', calculationClicked);

}

//閉じるボタンがクリックされたらparcentPageを閉じる
const closeBtn = document.getElementById('closeBtn');

closeBtn.addEventListener('click', ()=> {
  parcentPage.classList.add('nolook');
  bb.classList.add('nolook');
  cb.classList.add('nolook');
})

//--------------------------------------------------------------------------------

//最後に押されたカメラボタンの位置を把握するための配列
let inputCount = [];

//最後に押されたカメラボタンのindex番号を把握するための配列
let indexCount = [];

//カメラボタンクリックでcameraPageの表示

const cameraClicked = (e) => {
  //イベントが起こる下となるもの
  const targetCamera = e.currentTarget;
  const targetInput = targetCamera.nextElementSibling;

  //リストのインデックス番号を取得して、indexCountに格納しておく
  let elements = document.querySelectorAll('#money');
  elements = [].slice.call(elements);

  let index = elements.indexOf(targetInput);
  indexCount.push(index);

  //input要素自体を格納しておく
  inputCount.push(targetInput);

  //input要素が空欄ではない場合にparcentPageを表示
  if(targetInput.value === '') {
    cameraPage.classList.remove('nolook');
    bb.classList.remove('nolook');
    cb.classList.remove('nolook');
  }

}

//撮影ボタンがクリックされたとき
const shootClicked = (e) => {
  shootBtn.classList.add('nolook');
  loadBtn.classList.remove('nolook');
}

//読み込みボタンをクリックされたとき
const loadClicked = (e) => {
  loadBtn.classList.add('nolook');
  shootBtn.classList.remove('nolook');
}

function loadCamera() {

  const cameraPage = document.getElementById('cameraPage');
  const cameraBtn = document.querySelectorAll('#cameraImage');
  const loadBtn = document.getElementById('loadBtn');
  const shootBtn = document.getElementById('shootBtn');


  for(let i = 0; i < cameraBtn.length; i++) {
    cameraBtn[i].addEventListener('click', cameraClicked);
  }

  shootBtn.addEventListener('click', shootClicked);
  loadBtn.addEventListener('click', loadClicked);

}

//カメラを起動してocr機能を作動する
Vue.createApp({
    data() {
      return {
        video: null,
        canvas: null,
        context: null,
        dataUrl: '',
        status: 'none'
      }
    },
    methods: {
        // ① カメラとキャンバスの準備
        initialize() {

            this.status = 'initialize';

            navigator.mediaDevices.getUserMedia({
              video: {
                facingMode: {
                  ideal: 'environment'
                }
              }
            })
            .then(stream => {

              //this.canvas = this.$refs.canvas;
              this.canvas = document.getElementById('canvas');
              this.canvas2 = document.getElementById('canvas2');
              this.context = this.canvas.getContext('2d');
              this.context2 = this.canvas2.getContext('2d');

              this.video = document.createElement('video');
              this.video.addEventListener('loadedmetadata', () => { // メタデータが取得できるようになったら実行

                  const canvasContainer = document.getElementById('canvasContainer');
                  this.canvas.width = 300;
                  this.canvas.height = 160;
                  this.canvas2.width = 130;
                  this.canvas2.height = 50;
                  this.render();

                });
                // iOSのために以下３つの設定が必要
              this.video.setAttribute('autoplay', '');
              this.video.setAttribute('muted', '');
              this.video.setAttribute('playsinline', '');
              this.video.srcObject = stream;
              this.playVideo();
            })
          .catch(error => console.log(error));
        },

        render() {
          if(this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
            //大元の画像にはキャンパス１の画像を表示
            this.context.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
            //フォーカス部分にはキャンパス１の - を使って左上に引き上げた部分を表示するとちょうど合う
            this.context2.drawImage(this.video, -84, -49, this.canvas.width, this.canvas.height);
          }
          requestAnimationFrame(this.render);
        },
        runOcr() { // ③ スナップショットからテキストを抽出
          this.status = 'reading';
          loadBtn.classList.add('nolook');
          shootBtn.classList.remove('nolook');

          Tesseract.recognize(this.dataUrl, 'eng', {
            logger: log => {
              //console.log(log);
            }
          })
            .then(result => {
              let text = result.data.text;
              //結果をアラートに表示している
              let ans = text.replace(/[^0-9]/g, '');
              let confirmAns = confirm(ans + '円\nOKボタンクリックで商品の値段が記録されます。');
              //console.log(confirmAns);
              //inputCountに格納されている最後のinput要素の数値をocrで読み取ったものに変える
              if(confirmAns == true) {
                let targetInput = inputCount[inputCount.length - 1];
                //targetInputの位置からそのリストのチェックマークを取得する
                let moneyParent = targetInput.parentNode;
                let moneyParentPre = moneyParent.previousElementSibling;
                let checkmark = moneyParentPre.firstChild;
                //input要素に数値を表示する
                targetInput.value = ans;
                //書き換えられた際にチェックマークをつける(ついていなければ)
                let res = checkmark.classList.contains('checkmark');
                if(res == false) {
                  checkmark.classList.add('checkmark');
                }
                //firstAmountに保存して個数計算をできるようにする
                let index = indexCount[indexCount.length - 1];
                firstAmount.splice(index, 1, targetInput.value);
              }
            })
            .catch(error => console.log(error))
            .finally(() => {
                this.playVideo();
            });

        },
        playVideo() {
          this.video.play();
          this.status = 'play';
        },
        pauseVideo() {
          this.video.pause();
          this.status = 'pause';
          shootBtn.classList.add('nolook');
          loadBtn.classList.remove('nolook');
        },
        takeSnapshot() { // ② スナップショットを取る（カメラは一時停止）
          this.pauseVideo();
          this.dataUrl = this.canvas2.toDataURL();
          //this.dataUrl = this.canvas.toDataURL();
          console.log(this.dataUrl);
          console.log(this.video);
        },
        closePage() { //閉じるボタンを押した時の動作
          cameraPage.classList.add('nolook');
          bb.classList.add('nolook');
          cb.classList.add('nolook');
        },
    },
    mounted() {
      this.initialize();
    }
}).mount('#cameraPage');


//--------------------------------------------------------------------------------

//配列に何番目のリストの動作なのかを格納しておく
let listCount2 = [];

//個数選択ボタンをクリックした時のイベントハンドラ
const quantityClicked = (e) => {

  //開いた時にinputのvalueを空欄にする
  const quantity = document.getElementById('quantity');
  quantity.value = '';

  const targetQuantity = e.currentTarget;
  const targetInput = targetQuantity.previousElementSibling;
  const money = document.querySelectorAll('#money');

  //イベントが何番目の要素で起きているのかを取得
  for(let m = 0; m < money.length; m++) {
    if(targetInput === money[m]) {
      listCount2.push(m);
    }
  }

  if(targetInput.value !== '') {
    quantityPage.classList.remove('nolook');
    bb.classList.remove('nolook');
    cb.classList.remove('nolook');
  }
}

//計算ボタンをクリックした時のイベントハンドラ
const calculationBtn2Clicked = () => {
  const quantity = document.getElementById('quantity');
  let num = quantity.value;
  let countNum = listCount2[listCount2.length-1];
  //全体のinput要素から配列の数値の場所にあるものを取得する
  const money = document.querySelectorAll('#money');
  money[countNum].value = firstAmount[countNum] * num;
  flagArray.splice(countNum, 1, true);
  quantityPage.classList.add('nolook');
  bb.classList.add('nolook');
  cb.classList.add('nolook');
}

//個数の選択ボタンを押した時の動作
function calculationQuantity() {

  const quantityPage = document.getElementById('quantityPage');
  const quantityBtn = document.querySelectorAll('#quantityImage');
  const calculationBtn2 = document.getElementById('calculationBtn2');

  for(let i = 0; i < quantityBtn.length; i++) {
    quantityBtn[i].addEventListener('click', quantityClicked);
  }

  //計算ボタンのクリックは繰り返す必要がないためforの外で定義する
  calculationBtn2.addEventListener('click', calculationBtn2Clicked);

}

//bbもしくわ閉じるボタンがクリックされたらquantityPageを閉じる
const closeBtn3 = document.getElementById('closeBtn3');

closeBtn3.addEventListener('click', ()=> {
  quantityPage.classList.add('nolook');
  bb.classList.add('nolook');
  cb.classList.add('nolook');
})

const bb = document.getElementById('bb');

bb.addEventListener('click', ()=> {
  parcentPage.classList.add('nolook');
  cameraPage.classList.add('nolook');
  quantityPage.classList.add('nolook');
  bb.classList.add('nolook');
  cb.classList.add('nolook');
});

const cb = document.getElementById('cb');

cb.addEventListener('click', ()=> {
  parcentPage.classList.add('nolook');
  cameraPage.classList.add('nolook');
  quantityPage.classList.add('nolook');
  bb.classList.add('nolook');
  cb.classList.add('nolook');
});


//--------------------------------------------------------------------------------

const starImgClicked = (e)=> {

  let target = e.currentTarget;
  //targetからお気に入りマークを取得して条件分で色を変えていけるようにする動作
  let lastChild = target.lastElementChild;　//img要素の前のinput要素
  console.log(lastChild);
  let targetImg = lastChild.previousElementSibling; //img要素
  console.log(targetImg);
  let nowURL = targetImg.src.split('/').pop();
  console.log(nowURL);
  //それぞれ順番に色が変わっていく動作(input要素が空白の時は NG )
  if(lastChild.value != '') {
    if(nowURL === 'nostar.png') {
      targetImg.src = 'images/star1.png';
    } else if(nowURL === 'star1.png') {
      targetImg.src = 'images/star2.png';
    } else if(nowURL === 'star2.png') {
      targetImg.src = 'images/star3.png';
    } else if(nowURL === 'star3.png') {
      targetImg.src = 'images/star4.png';
    } else if(nowURL === 'star4.png') {
      targetImg.src = 'images/star5.png';
    }  else if(nowURL === 'star5.png') {
      targetImg.src = 'images/nostar.png';
    }
  }

}


//リストのダブルクリックでお気に入り・グループ分け機能の実行動作
function changeColor() {

  const list = document.querySelectorAll('.listItem');

  //let tapCount = 0 ;

  /*for(let i = 0; i < list.length; i++) {
    list[i].addEventListener('touchstart', (e)=> {
      if(!tapCount) {
		  ++tapCount ;

		  setTimeout(function() {
			  tapCount = 0;
		  }, 350) ;

	   // ダブルタップ判定
	    } else {
        let target = e.currentTarget;
        //targetからお気に入りマークを取得して条件分で色を変えていけるようにする動作
        let lastChild = target.lastElementChild;　//img要素の前のinput要素
        console.log(lastChild);
        let targetImg = lastChild.previousElementSibling; //img要素
        console.log(targetImg);
        let nowURL = targetImg.src.split('/').pop();
        console.log(nowURL);
        //それぞれ順番に色が変わっていく動作(input要素が空白の時は NG )
        if(lastChild.value != '') {
          if(nowURL === 'nostar.png') {
            targetImg.src = 'images/star1.png';
          } else if(nowURL === 'star1.png') {
            targetImg.src = 'images/star2.png';
          } else if(nowURL === 'star2.png') {
            targetImg.src = 'images/star3.png';
          } else if(nowURL === 'star3.png') {
            targetImg.src = 'images/star4.png';
          } else if(nowURL === 'star4.png') {
            targetImg.src = 'images/star5.png';
          }  else if(nowURL === 'star5.png') {
            targetImg.src = 'images/nostar.png';
          }
        }
		    tapCount = 0 ;
	    }

    })
    //break;
  }*/

  //スマホでダブルクリックイベントが発火するならこの方法でいきたい
  for(let i = 0; i < list.length; i++) {
    list[i].addEventListener('dblclick', starImgClicked);
  }

}

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
//お気に入り機能の動作
changeColor();
console.log(localStorage);

/*
加えたい機能
・買い物の金額をカレンダー機能に保存することができる機能
・開始ボタンを押したらタスクを切らないように促す
・撮影しなくても読み込めるようにしたい（写っている画像の段階で）
・リストを空欄にした時（消した時）にチェックマークを外す
・空白でもチェックマークついてしまう
◎既存のアプリのように共有機能をつけたい

*/
