'use strict';


document.addEventListener('DOMContentLoaded', ()=> {

  //window.alert('数字は全て半角数字で入力してください');

  //------------------------各ボタンで項目の増減機能----------------------------

  const btn1 = document.getElementById('btn1');
  const btn2 = document.getElementById('btn2');

  //btn1を押すとgroupクラスが１つ増える
  btn1.addEventListener('click', addInputArea);
  //btn2を押すとgroupクラスが１つ減る
  btn2.addEventListener('click', deleteInputArea);

  let count = 1;

  //inputを追加する関数
  function addInputArea() {
    //追加する要素を作る
    let divElement = document.createElement('div');

    //変更しながら追加していきたいところにcountを入れて実行した後に数値をプラスする  　　　　
    divElement.innerHTML =
    '<input class="hour" type="text" name="hour' + count + '"><span class="form-text">時間</span><input class="minute" type="text" name="minute' + count + '"><span class="form-text">分</span>';
    count++;

    //inputの消去の時に使うためのクラス
    divElement.className = 'input-wrapper';

    //要素を追加する
    let inputArea = document.getElementById('inputArea');

    inputArea.appendChild(divElement);

  };

  //inputを削除する関数
  function deleteInputArea() {
    let inputDivs = document.getElementsByClassName('input-wrapper');

    // 最後の、div.input-wrapperを削除
    let inputArea = document.getElementById('inputArea');
    inputArea.removeChild(inputDivs[inputDivs.length - 1]);
    count--;
  }

  //-----------------------計算ボタンで入力された時間を足して合計時間に表示----------------------------

  const btn3 = document.getElementById('btn3');
  let total = document.getElementById('total');

  //btn3を押すと合計時間が計算される
  btn3.addEventListener('click', totalTime, false);
  let inputArea = document.getElementById('inputArea');

  let data = new Date();
  let data2 = new Date();
  let data3 = new Date();

  //入力された時間を取得
  function totalTime() {
    let form = document.forms.form;
    //元々のinputのvalue取得
    let hoursValue = form.hour.value;
    let minutesValue = form.minute.value;
    //追加されたinputのvalue取得

    //.querySelectorAllによってクラス属性からvalue値を取得（時間）
    let hoursArray = document.querySelectorAll('.input-wrapper .hour');
    for(let i = 0; i < hoursArray.length; i++) {
      hoursValue = Number(hoursValue) + Number(hoursArray[i].value);
    }
    //.querySelectorAllによってクラス属性からvalue値を取得（分）
    let minutesArray = document.querySelectorAll('.input-wrapper .minute');
    for(let i = 0; i < minutesArray.length; i++) {
      minutesValue = Number(minutesValue) + Number(minutesArray[i].value);
    }

    //取得した数値を時間に換算
    data.setHours(hoursValue);
    data.setMinutes(minutesValue);
    //換算した時間と分を取得
    let totalHours = data.getHours();
    let totalMinutes = data.getMinutes();

    let totalH = document.getElementById('totalH');
    let totalM = document.getElementById('totalM');

　　 //HTML要素のtotalHとtotalMにそれぞれ時間で換算した数値に置き換える
    totalH.textContent = totalHours;
    totalM.textContent = totalMinutes;

    //目標時間を取得して現在行った時間を引いて、目標時間まで何時間何分かを求める
    //目標時間に入力された数値を取得
    let goalHour = document.getElementById('goalHour');
    let goalMinute = document.getElementById('goalMinute');

    //
    goalHour = Number(goalHour.value);
    goalMinute = Number(goalMinute.value);

    data2.setHours(goalHour);
    data2.setMinutes(goalMinute);
    let goalH = data2.getHours();
    let goalM = data2.getMinutes();

    //目標時間から行った勉強時間をひく

    let remainingH = (goalH - totalHours)*60*60*1000;
    let remainingM = (goalM - totalMinutes)*60*1000;

    let t = remainingH+remainingM;
    let h = Math.floor(t / 3600000);
    let m = Math.floor((t - h * 3600000) / 60000);

    let hRemaining = document.getElementById('hRemaining');
    let mRemaining = document.getElementById('mRemaining');

    hRemaining.textContent = h;
    mRemaining.textContent = m;

  }

  //----------------リセットボタンでページリセット---------------------

  let btn4 = document.getElementById('btn4');

  btn4.addEventListener('click', pageReset, false);

  //ページが再読み込みされてリセットする関数
  function pageReset() {

    window.alert('項目が全てリセットされました。');
    window.location.reload();

  }

  //--------------------目標時間まで何時間何分かを表示する----------------------------

  let btn5 = document.getElementById('btn5');

  btn5.addEventListener('click', getGoalTime, false);

  function getGoalTime() {

    //目標時間に入力された数値をそれぞれ取得
    let goalHour = document.getElementById('goalHour');
    let goalMinute = document.getElementById('goalMinute');
    //取得した数値を置き換えるテキストの取得
    let goalH = document.getElementById('goalH');
    let goalM = document.getElementById('goalM');

    goalH.textContent = goalHour.value;
    goalM.textContent = goalMinute.value;

    //どちらかが未記入の場合
    if(goalHour.value === '') {
      goalH.textContent = '00';
    }
    if(goalMinute.value === '') {
      goalM.textContent = '00';
    }

  }


}, false);



//-------------------------｜----------------------------
