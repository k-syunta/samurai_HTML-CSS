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
    '<input class="hour" type="text" name="hour' + count + '"><span class="form-text form-text1">時間</span><input class="minute" type="text" name="minute' + count + '"><span class="form-text">分</span>';
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

  //達成のアラートを一度だけ表示するために使う変数
  let clicked = false;
  //目標時間まで1時間をきった時にアラートを表示するために使う変数
  let clicked2 = false;

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

    //目標時間まで何時間何分かを表示する
    //目標時間を取得して現在行った時間を引いて、目標時間まで何時間何分かを求める
    //目標時間に入力された数値を取得
    let goalHour = document.getElementById('goalHour');
    let goalMinute = document.getElementById('goalMinute');

    let goalHH = document.getElementById('goalH');
    let goalMM = document.getElementById('goalM');
    let notConfiguration = document.querySelector('#achieve .notConfiguration');
    let processing = document.querySelector('#achieve .processing');
    let completed = document.querySelector('#achieve .completed');

    /*if(goalHour.value === '') {
      goalHH.textContent = '--';
    } else {
      goalHH.textContent = goalHour.value;
    }

    if(goalMinute.value === '') {
      goalMM.textContent = '--';
    } else {
      goalMM.textContent = goalMinute.value;
    }*/

    const dateempty = (goalHour.value === '' && goalMinute.value === '');

    if(dateempty) {
      notConfiguration.classList.remove('hide');
      processing.classList.add('hide');
    } else {
      notConfiguration.classList.add('hide');
      processing.classList.remove('hide');
    }

    //valueを数値型に変換する
    goalHour = Number(goalHour.value);
    goalMinute = Number(goalMinute.value);

    data2.setHours(goalHour);
    data2.setMinutes(goalMinute);

    let goalH = data2.getHours();
    let goalM = data2.getMinutes();

    if(goalHour.value === '') {
      goalHH.textContent = '--';
    } else {
      goalHH.textContent = goalH;
    }

    if(goalMinute.value === '') {
      goalMM.textContent = '--';
    } else {
      goalMM.textContent = goalM;
    }

    //目標時間から行った勉強時間をひく

    let remainingH = (goalH - totalHours)*60*60*1000;
    let remainingM = (goalM - totalMinutes)*60*1000;

    let t = remainingH+remainingM;
    let h = Math.floor(t / 3600000);
    let m = Math.floor((t - h * 3600000) / 60000);

    let hRemaining = document.getElementById('hRemaining');
    let mRemaining = document.getElementById('mRemaining');

    //目標時間を達したら目標時間：達成しました！！になるようにする
    //目標時間のvalueがどちらも空欄の時のクリックは達成しましたを非表示にする

    if(dateempty) {
      if(h <= 0 && m <= 0) {
        processing.classList.add('hide');
        completed.classList.add('hide');
      }
    } else {
      if(h <= 0 && m <= 0) {
        processing.classList.add('hide');
        completed.classList.remove('hide');
        if(clicked === false) {
          window.alert('本日の目標時間を達成しました！\nお疲れ様でした！');
          clicked = true;
        }
      } else if(h < 0) {
        processing.classList.add('hide');
        completed.classList.remove('hide');
        if(clicked === false) {
          window.alert('本日の目標時間を達成しました！\nお疲れ様でした！');
          clicked = true;
        }
      } else {
        //目標時間が達成されていない時の場合
        hRemaining.textContent = h;
        mRemaining.textContent = m;
        //目標時間まで1時間をきったときのアラートの表示
        if(h <= 0 && m <= 59) {
          if(clicked2 === false) {
            window.alert('目標時間まで1時間をきりました！\nラストスパート頑張りましょう！');
            clicked2 = true;
          }
        }
      }
    }
}

  //----------------リセットボタンでページリセット---------------------

  const btn4 = document.getElementById('btn4');

  btn4.addEventListener('click', pageReset, false);

  //ページが再読み込みされてリセットする関数
  function pageReset() {

    window.alert('項目が全てリセットされました。');
    window.location.reload();

  }


}, false);



//-------------------------｜----------------------------
