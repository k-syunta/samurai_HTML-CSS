'use strict';

document.addEventListener('DOMContentLoaded', ()=> {

  //-----------timer.html----------------------------------------------------------


  //ボタンの取得
  let btn1 =  document.getElementById('btn1');
  let btn2 =  document.getElementById('btn2');
  let btn3 =  document.getElementById('btn3');

  //時間を表示するHTML要素の取得
  let timer = document.getElementById('timer');

  //クリック時の時間を保持するための変数を定義
  let startTime;
  //経過時刻を更新するための変数を定義
  let elapsedTime = 0;
  //clearTimeoutの引数に渡すためのタイマーのidの定義
  let timerID;
  let timerID2;
  //タイマーをストップ -> 再開させたら0になってしまうのを避けるための変数定義
  let timeToadd = 0;

  //時間、分、秒にそれぞれ直す関数
  function updateTimetText() {
    let s = Math.floor(elapsedTime / 1000) % 60;
    let m = Math.floor(elapsedTime / 1000 / 60) % 60;
    let h = Math.floor(elapsedTime / 1000 / 60 / 60) % 24;

    //HTML上で表示の桁数を固定する
    m = ('0' + m).slice(-2);
    s = ('0' + s).slice(-2);

    timer.textContent = h + '時間' + m + '分' + s + '秒';

  };

  //再帰的に使える用の関数
  function countUp() {

    //timerId変数はsetTimeoutの返り値になるので代入する
    timerID = setTimeout(function(){
      //経過時刻は現在時刻をミリ秒で示すDate.now()からstartを押した時の時刻(startTime)を引く
      elapsedTime = Date.now() - startTime + timeToadd;
      updateTimetText();
      //countUp関数自身を呼ぶことで1秒毎に以下の計算を始める
      countUp();
    }, 1000);

  }
  //if(btn != null)それぞれのbtnが取得できた時だけ addEventListener を行う
  //停止ボタンクリック時のイベント
  if(btn1 != null) {
    btn1.addEventListener('click', ()=> {
      //タイマーを止めるにはclearTimeoutを使う
      clearTimeout(timerID);
      timeToadd += Date.now() - startTime;
    });

  }

  //開始ボタンクリック時のイベント
  if(btn2 != null) {
    btn2.addEventListener('click', ()=> {
      startTime = Date.now();
      countUp();
      btn2.classList.add('nolook');
      btn3.classList.remove('nolook');
    });
  }

  //終了ボタンクリック時のイベント
  if(btn3 != null) {
    btn3.addEventListener('click', ()=> {
      clearTimeout(timerID);
      elapsedTime = 0;
      timeToadd = 0;
      updateTimetText();
      btn3.classList.add('nolook');
      btn2.classList.remove('nolook');
    });
  }

//-----------timerTarget.html-----------------------------------------------------

let btn6 = document.getElementById('btn6');

  //ページの移動によって目標が消えないように格納するための配列
  let textsArray =  new Array();

  //ページの移動によって目標が消えないように格納するための配列
  let texts =  new Array();

  //設定ボタンクリック時のイベント
  if(btn6 != null) {
    btn6.addEventListener('click', ()=> {
      makeObjective();
    });
  }

  //アラートに表示する文を格納して置くための配列
  let alert = new Array();

  //アラートに表示する文を変数に格納
  let allAlert = '※全ての項目を記入の上、正しい形式で入力してください';

  let form = document.forms.form;

  //「目標が設定されません」を取得してクラスの追加によって非表示にする
  let objectiveText = document.getElementById('objectiveText');

  //----------------------------------------------------

  // 今日、今週、今月それぞれの配列の定義
  var dataDay = new Array();
  var dataWeek = new Array();
  var dataMonth = new Array();

  // ローカルストレージに保存したデータ（配列）を取得
  var jsondataD = JSON.parse(localStorage.getItem("key_day"));
  let dayList = document.getElementById('dayList');
  if (jsondataD != null) {
    for(let d = 0; d < jsondataD.length; d++) {
      let li = document.createElement('li');
      li.textContent = jsondataD[d];
      dayList.appendChild(li);
    }
    objectiveText.classList.add('nolook');
  }

  var jsondataW = JSON.parse(localStorage.getItem("key_week"));
  let weekList = document.getElementById('weekList');
  if (jsondataW != null) {
    for(let w = 0; w < jsondataW.length; w++) {
      let li = document.createElement('li');
      li.textContent = jsondataW[w];
      weekList.appendChild(li);
    }
    objectiveText.classList.add('nolook');
  }

  var jsondataM = JSON.parse(localStorage.getItem("key_month"));
  let monthList = document.getElementById('monthList');
  if (jsondataM != null) {
    for(let m = 0; m < jsondataM.length; m++) {
      let li = document.createElement('li');
      li.textContent = jsondataM[m];
      monthList.appendChild(li);
    }
    objectiveText.classList.add('nolook');
  }

  //----------------------------------------------------

  //設定に入力された目標を objective-list に表示する関数
  function makeObjective() {

    //設定でinputに入力された値を取得
    let form = document.forms.form;
    let period = form.period.value;
    let what = form.what.value;
    let timeH = form.timeH.value;
    let timeM = form.timeM.value;

    //HTML要素の表示する場所を取得(今日、今週、今月を分けれるように)
    let list;
    let dayList = document.getElementById('dayList');
    let weekList = document.getElementById('weekList');
    let monthList = document.getElementById('monthList');
    //「目標が設定されません」を取得してクラスの追加によって非表示にする
    let objectiveText = document.getElementById('objectiveText');
    objectiveText.classList.add('nolook');

    //li要素を生成して入力結果を入れ込む
    let li = document.createElement('li');
    let text1 = period + '：' + what + 'を' + timeH + '時間' + timeM + '分取り組む';

    //----------------------------------------------------

    if(form.period.value === '今日') {
      dataDay.push(text1);
      list = dayList;
      texts.push(text1);
    } else if(form.period.value === '今週') {
      dataWeek.push(text1);
      list = weekList;
      texts.push(text1);
    } else if(form.period.value === '今月') {
      dataMonth.push(text1);
      list = monthList;
      texts.push(text1);
    };

    // 配列をJSON形式に変換してからローカルストレージに保存
    localStorage.setItem("key_day", JSON.stringify(dataDay));
    localStorage.setItem("key_week", JSON.stringify(dataWeek));
    localStorage.setItem("key_month", JSON.stringify(dataMonth));


    //----------------------------------------------------

    //丹生路y区条件にあってないものがあればアラート表示
    if(period === '' || what === '' || timeH === '' || timeM === ''
     || timeH < 0 || timeH > 100 || timeM < 0 || timeM > 60) {
      window.alert(allAlert);
    };

    //配列の中の最後の要素をグローバルスコープの配列に入れる
    let textsLast = texts.slice(-1)[0];
    textsArray.push(textsLast);

    //配列の最後のvalueをテキストとして表示
    li.textContent = textsLast;
    list.appendChild(li);

  }

  //btn9でローカルストレージの全データを消去
  let btn9 = document.getElementById('btn9');

  btn9.addEventListener('click', ()=> {
    localStorage.clear();
    console.log(localStorage);
  });

  console.log(localStorage);


}, false);
//true・・・キャプチャーフェーズ時に発火する。（つまり親から先に発火）
//false・・・バブリングフェーズ時に発火する・（つまり子から先に発火）


//----------------------------------------------------------------------------
