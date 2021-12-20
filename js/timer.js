'use strict';

document.addEventListener('DOMContentLoaded', ()=> {

  //-----------トップページ----------------------------------------------------------


  //ボタンの取得
  let btn1 =  document.getElementById('btn1');
  let btn2 =  document.getElementById('btn2');
  let btn3 =  document.getElementById('btn3');
  let btn11 = document.getElementById('btn11');

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
    //h = ('0' + h).slice(-2);
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

  //何をするかを入力するinput要素を取得
  let todo = document.getElementById('todo');
  let form = document.forms.form;

  //開始ボタンクリック時のイベント
  //何をするか入力していない場合はアラートを表示して開始できなくしている
  if(btn2 != null) {
    btn2.addEventListener('click', ()=> {
      if(form.todo.value === '') {
        window.alert('※何をするか入力してから開始ボタンを押してください');
      } else {
        startTime = Date.now();
        countUp();
        btn2.classList.add('nolook');
        btn3.classList.remove('nolook');

        //if(btn != null)それぞれのbtnが取得できた時だけ addEventListener を行う
        //停止ボタンクリック時のイベント(btn2が押されている状態のみでおせる)
        btn1.addEventListener('click', ()=> {
          //タイマーを止めるにはclearTimeoutを使う
          clearTimeout(timerID);
          timeToadd += Date.now() - startTime;
          btn1.classList.add('nolook');
          btn11.classList.remove('nolook');
        });

      }
    });
  }

  //停止ボタンで停止したタイマーを再開させるためのボタン
  if(btn11 != null) {
    btn11.addEventListener('click', ()=> {
      startTime = Date.now();
      countUp();
      btn1.classList.remove('nolook');
      btn11.classList.add('nolook');
    });
  }

  //記録を格納するための配列を定義
  let record = new Array();

  //達成状況を格納するための配列
  let progress = new Array();

  //終了ボタンクリック時のイベント
  if(btn3 != null) {
    btn3.addEventListener('click', ()=> {

      let jsonRecord = JSON.parse(localStorage.getItem("key_record"));
      let jsonProgress = JSON.parse(localStorage.getItem("key_progress"));
      if(jsonRecord == null && record.length === 0) {

        //外で定義してしまうと秒数がカウントされていない状態になるから中で定義
        let recordText = form.todo.value + '：' + timer.textContent;
        record.push(recordText);
        //要素を格納したrecordをjson形式にする
        localStorage.setItem("key_record", JSON.stringify(record));
        window.alert(form.todo.value + 'を' + timer.textContent + '行いました。\n記録画面に追加します。');
        //リロードをして一度記録画面を開いたことにしたい
        window.location.reload();
        makeprogress();

      } else {

        let recordText = form.todo.value + '：' + timer.textContent;
        record.push(recordText);
        window.alert(form.todo.value + 'を' + timer.textContent + '行いました。\n記録画面に追加します。');
        //リロードをして一度記録画面を開いたことにしたい
        window.location.reload();
        //記録画面に落とし込みたい要素を配列に格納していく
        for(let r = 0; r < jsonRecord.length; r++) {
          record.push(jsonRecord[r]);
        }
        localStorage.setItem("key_record", JSON.stringify(record));
        makeprogress();

      };

      clearTimeout(timerID);
      elapsedTime = 0;
      timeToadd = 0;
      updateTimetText();
      btn3.classList.add('nolook');
      btn2.classList.remove('nolook');

    });
  }

//-----------目標-----------------------------------------------------

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

  //「目標が設定されません」を取得してクラスの追加によって非表示にする
  let objectiveText = document.getElementById('objectiveText');

  let dayList = document.getElementById('dayList');

  //----------------------------------------------------

  //今日、今週、今月それぞれの配列の定義
  var dataDay = new Array();

  //ローカルストレージに保存したそれぞれのデータ（配列）を取得
  //dayListが読み込めないときは実行しない（他のHTMLファイルでのエラー対策）
  if(dayList != null) {
    var jsondataD = JSON.parse(localStorage.getItem("key_day"));
    if (jsondataD != null) {
      for(let d = 0; d < jsondataD.length; d++) {
        let li = document.createElement('li');
        li.textContent = jsondataD[d];
        dayList.appendChild(li);
        dataDay.push(jsondataD[d]);
      }
      objectiveText.classList.add('nolook');
    }
  }

  //----------------------------------------------------

  //設定に入力された目標を objective-list に表示する関数
  function makeObjective() {

    //設定でinputに入力された値を取得
    let form = document.forms.form;
    let what = form.what.value;
    let timeH = form.timeH.value;
    let timeM = form.timeM.value;

    //「目標が設定されません」を取得してクラスの追加によって非表示にする
    let objectiveText = document.getElementById('objectiveText');
    objectiveText.classList.add('nolook');

    //li要素を生成して入力結果を入れ込む
    let li = document.createElement('li');
    let text1 = what + '：' + timeH + '時間' + timeM + '分';

    //----------------------------------------------------

    //条件にあってないものがひとつでもあればアラート表示
    if(what === '' || timeH === '' || timeM === ''
     || timeH < 0 || timeH > 100 || timeM < 0 || timeM > 60) {
      window.alert(allAlert);
      objectiveText.classList.remove('nolook');
      //条件を満たしていないときは配列の一番最後から満たしていない状態で格納された要素を削除
      //texts.pop(text1);
    } else {
      dataDay.push(text1);
      texts.push(text1);
      // 配列をJSON形式に変換してからローカルストレージに保存
      localStorage.setItem("key_day", JSON.stringify(dataDay));
    }

    //----------------------------------------------------

    //配列の中の最後の要素をグローバルスコープの配列に入れる
    let textsLast = texts.slice(-1)[0];
    textsArray.push(textsLast);

    //配列の最後のvalueをテキストとして表示
    li.textContent = textsLast;
    dayList.appendChild(li);

  }

  //btn9でローカルストレージのデータを消去
  let btn9 = document.getElementById('btn9');
  if(btn9 != null) {
    btn9.addEventListener('click', ()=> {
      localStorage.removeItem("key_day");
      window.location.reload();
    });
  };


  //-----------記録----------------------------------------------------

  let recordList = document.getElementById('recordList');

  let textrecord = document.getElementById('textrecord');
  if(textrecord != null) {
    textrecord.classList.remove('nolook');
  }

  if(recordList != null) {
    //json形式で保存しておいたものを配列にもどす？
    let jsonRecord = JSON.parse(localStorage.getItem("key_record"));
    if(jsonRecord != null) {
      for(let r = 0; r < jsonRecord.length; r++) {
        let li = document.createElement('li');
        li.textContent = jsonRecord[r];
        recordList.appendChild(li);
        record.push(jsonRecord[r]);
        localStorage.setItem("key_record", JSON.stringify(record));
        textrecord.classList.add('nolook');
      }
    }
  }

  //btn8でローカルストレージのデータを消去
  let btn8 = document.getElementById('btn8');
  if(btn8 != null) {
    btn8.addEventListener('click', ()=> {
      localStorage.removeItem("key_record");
      window.location.reload();
    });
  };

  //------------達成状況-------------------------------------------------------------

  //達成状況を表示するためテキストの時間、分（数値の部分）を取得する
  let situationList = document.getElementById('situationList');

  let textsituation = document.getElementById('textsituation');

  //目標の項目を取得する
  let targetTime = JSON.parse(localStorage.getItem("key_day"));
  let target_data = targetTime.map(data => data.match(/(?<category>[ぁ-んァ-ヶ\u4E00-\u9FFF]+)(?=：)/));

  //記録の項目を取得する
  let recordTime = JSON.parse(localStorage.getItem("key_record"));
  let record_data = recordTime.map(data => data.match(/(?<category>[ぁ-んァ-ヶ\u4E00-\u9FFF]+)(?=：)/));

  //最後に記録された要素の[0]を指定することによって項目だけを取得している
  let firstRD = (record_data[0]);
  console.log(firstRD[0]);　//最後に記録された項目部分

  let data = new Date();
  let data2 = new Date();

  //最後に記録された項目と目標に表示されている項目が一致すれば目標時間から記録時間を引く関数
  function makeprogress() {

    //変数targetItemに目標に表示されている全ての項目の名前を格納する
    for(let i = 0; i < target_data.length; i++) {
      //目標に表示されている項目の部分と追加された記録の項目部分が一致した場合
      if(firstRD[0] === target_data[i][0]) {
        console.log(firstRD.input);　//最後に記録された文字列部分
        //記録の数値を正規表現によって抽出したテキストから時間と分の部分である[3][6]の部分を使う
        let recordCount = firstRD.input.match(/[0-9]*/g);
        let recordH = recordCount[3];
        let recordM = recordCount[6];
        console.log(recordH);　//記録の文字列の中の時間の数字部分
        console.log(recordM);  //記録の文字列の中の分数の数字部分
        //取得したテキストを時間形式に変えるため一度時間に埋め込む
        data.setHours(recordH);
        data.setMinutes(recordM);
        //埋め込んで時間に換算された数値を取得しなおす
        let recordTimeH = data.getHours();
        let recordTimeM = data.getMinutes();
        console.log(recordTimeH);　//記録の時間部分を時間に換算した数値
        console.log(recordTimeM);　//記録の分数部分を時間に換算した数値

        //一致した目標の項目 target_data[i][0] 正規表現によって抽出したテキストから時間と分の部分を使う
        console.log(target_data[i][0]);
        let targetCount = target_data[i].input.match(/[0-9]*/g);
        let targetH = targetCount[3];
        let targetM = targetCount[6];
        console.log(targetH); //マッチした目標の文字列の中の時間の数字部分
        console.log(targetM); //マッチした目標の文字列の中の分数の数字部分
        //取得したテキストを時間形式に変えるため一度時間に埋め込む
        data2.setHours(targetH);
        data2.setMinutes(targetM);
        //埋め込んで時間に換算された数値を取得しなおす
        let targetTimeH = data2.getHours();
        let targetTimeM = data2.getMinutes();
        console.log(targetTimeH); //目標の時間部分を時間に換算した数値
        console.log(targetTimeM); //目標の分数部分を時間に換算した数値

        //目標の時間から記録された時間をひいて達成状況の時間を求める
        //時間と分の差を出しそれをms（ミリ秒）に換算する
        let remainingH = (targetTimeH - recordTimeH)*60*60*1000;
        let remainingM = (targetTimeM - recordTimeM)*60*1000;
        //msに換算した二つの変数を足して時間に換算していく
        let resultTime = remainingH + remainingM;
        let resultH = Math.floor(resultTime / 3600000);
        let resultM = Math.floor((resultTime - resultH * 3600000) / 60000);

        console.log(resultH); //時間換算された状態での差（時間）
        console.log(resultM); //時間換算された状態での差（分）

        let resultText = firstRD[0] + '：達成まで残り' + resultM + '分';
        let resultText2 = firstRD[0] + '：達成まで残り' + resultH + '時間' + resultM + '分';

        let li = document.createElement('li');

        if(resultH === 0) {
          progress.push(resultText);
          if(situationList != null) {
            li.textContent = resultText;
            situationList.appendChild(li);
            textsituation.classList.add('nolook');
          }
          localStorage.setItem("key_progress", JSON.stringify(progress));
        } else {
          if(situationList != null) {
            li.textContent = resultText2;
            situationList.appendChild(li);
            textsituation.classList.add('nolook');
          }
          localStorage.setItem("key_progress", JSON.stringify(progress));
        }

    }
  }

  }



  makeprogress();

  console.log(targetTime);
  console.log(target_data);
  console.log(recordTime);
  console.log(record_data);
  console.log(progress); //テキストを格納しておく配列

//----------------------------------------------------------------------------

console.log(record);
console.log(localStorage);
}, false);
//true・・・キャプチャーフェーズ時に発火する。（つまり親から先に発火）
//false・・・バブリングフェーズ時に発火する・（つまり子から先に発火）

/*
記録の保存方法（ページが違うとこでのやりとりだからおそらくこれが必要）
1.終了ボタンで記録を配列に格納
2.配列をローカルストレージに格納
3.ローカルストレージから配列を取り出す
4.繰り返しで記録画面に配列のテキストを生成
5.生成されたものを配列に格納し、ローカルストレージに格納
6.２回目以降の終了ボタンを押す際に以前の記録も残すため５で格納したローカルストレージからもう一度配列に戻す
7.配列のテキストを繰り返しで読み込み配列に格納
*/

//自身で行ったことは1度目に表示したものを配列に格納しローカルストレージの形式にし保存したがうまくいかなかった

//----------------------------------------------------------------------------
