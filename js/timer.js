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

  //終了ボタンクリック時のイベント
  if(btn3 != null) {
    btn3.addEventListener('click', ()=> {

      let jsonRecord = JSON.parse(localStorage.getItem("key_record"));
      let jsonProgress = JSON.parse(localStorage.getItem("key_progress"));
      let li = document.createElement('li');
      if(jsonRecord == null && record.length === 0) {

        //外で定義してしまうと秒数がカウントされていない状態になるから中で定義
        let recordText = form.todo.value + '：' + timer.textContent;
        record.push(recordText);
        //要素を格納したrecordをjson形式にする
        localStorage.setItem("key_record", JSON.stringify(record));
        window.alert(form.todo.value + 'を' + timer.textContent + '行いました。\n記録画面に追加します。');
        //リロードをして一度記録画面を開いたことにしたい
        window.location.reload();

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
        //progressの配列にあるものを表示する

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
      makeProgress();
      window.location.reload();
    });
  }

  //アラートに表示する文を格納して置くための配列
  let alert = new Array();

  var dataDay = new Array();

  //itemPを一時的に格納するための配列
  let itemProgress = new Array();

  //アラートに表示する文を変数に格納
  let allAlert = '※全ての項目を記入の上、正しい形式で入力してください';

  //「目標が設定されません」を取得してクラスの追加によって非表示にする
  let objectiveText = document.getElementById('objectiveText');

  let dayList = document.getElementById('dayList');

  //----------------------------------------------------

  //ローカルストレージに保存したそれぞれのデータ（配列）を取得
  //dayListが読み込めないときは実行しない（他のHTMLファイルでのエラー対策）
  if(dayList != null) {
    var jsondataD = JSON.parse(localStorage.getItem("key_day"));
    if (jsondataD != null) {
      for(let i = 0; i < jsondataD.length; i++) {
        dataDay.push(jsondataD[i]);
        console.log(dataDay[i]);
        //項目の部分の取得
        //itemD[i][0]で項目の部分、itemD[i].inputで文字列全体
        let itemD = jsondataD.map(data => data.match(/(?<category>[ぁ-んァ-ヶ\u4E00-\u9FFF]+)(?=：)/));
        let timeD = jsondataD[i].match(/[0-9]*/g);
        //前から数えると項目の文字数の変動でずれが生じるため後ろから数える
        let hourD = (timeD[timeD.length - 6]);　//時間の数字の部分を取得
        let minuteD = (timeD[timeD.length - 3]);　//分数の数字の部分を取得
        console.log(itemD[i][0]);
        itemProgress.push(itemD[i][0]);
        console.log(itemProgress);
        //変数resultに重複しているものを消去した形で格納
        let result = itemProgress.filter(function(x, i, self) {
          return self.indexOf(x) === i;
        });
        let resultText = result[i] + '：' + hourD + '時間' + minuteD + '分';
        console.log(resultText);
        //被ったもののresult[i]はundefinedを表すのでそれ以外の場合に表示する
        if(result[i] !== undefined) {
          let li = document.createElement('li');
          li.textContent = resultText;
          dayList.appendChild(li);
        }//if文のカッコ
      }//for文のカッコ
      objectiveText.classList.add('nolook');
    }
  }


  //----------------------------------------------------


  //設定に入力された目標を objective-list に表示する関数
  function makeObjective() {

    //設定でinputに入力された値を取得
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
     || timeH < 0 || timeH > 100 || timeH.match(/[^0-9]/) || timeM < 0 || timeM > 60 || timeM.match(/[^0-9]/)) {
      window.alert(allAlert);
      objectiveText.classList.remove('nolook');
    } else {
      texts.push(text1);
      dataDay.push(text1);
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
      localStorage.removeItem("key_progress");
      window.location.reload();
    });
  };


  //------------達成状況-------------------------------------------------------------

  //btn6をクリックした時に適宜するための関数を作る（目標と項目を合わせて記録がない段階で残り時間を表示する

  let data = new Date();
  let data2 = new Date();

  //達成状況を保存しておくための配列を定義
  let progress = new Array();

  let itemProgress2 = new Array();

  //達成状況を表示するためテキストの時間、分（数値の部分）を取得する
  let situationList = document.getElementById('situationList');

  let textsituation = document.getElementById('textsituation');

  function makeProgress() {
    if(jsondataD != null　&& jsondataD.length >= 0) {

      //ローカルストレージに保存されている目標時間を取得する
      let jsondataD = JSON.parse(localStorage.getItem("key_day"));
      for(let i = 0; i < jsondataD.length; i++) {
        //項目の部分の取得
        //itemD[i][0]で項目の部分、itemD[i].inputで文字列全体
        let itemD = jsondataD.map(data => data.match(/(?<category>[ぁ-んァ-ヶ\u4E00-\u9FFF]+)(?=：)/));
        let timeD = jsondataD[i].match(/[0-9]*/g);
        //前から数えると項目の文字数の変動でずれが生じるため後ろから数える
        let hourD = (timeD[timeD.length - 6]);　//時間の数字の部分を取得
        let minuteD = (timeD[timeD.length - 3]);　//分数の数字の部分を取得
        //上で取得した数字部分を時間換算する
        data.setHours(hourD);
        data.setMinutes(minuteD);
        let hourTimeD = data.getHours();　//時間換算された目標の時間の部分
        let minuteTimeD = data.getMinutes();　//時間換算された目標の分数の部分
        let textD = itemD[i][0] + '：達成まで残り' + hourTimeD + '時間' + minuteTimeD + '分';
        //textDを表示するための動作
        progress.push(textD);
        console.log(progress);
        let itemP = progress[i].match(/.+?：/);
        itemProgress2.push(itemP[0]);
        console.log(itemProgress2);
        //変数resultに重複しているものを消去した形で格納
        let result = itemProgress2.filter(function(x, i, self) {
          return self.indexOf(x) === i;
        });
        let resultText = result[i] + '達成まで残り' + hourTimeD + '時間' + minuteTimeD + '分';
        console.log(resultText);
        if(result[i] !== undefined) {
          let li = document.createElement('li');
          li.textContent = resultText;
          situationList.appendChild(li);
          textsituation.classList.add('nolook');
          localStorage.setItem("key_progress", JSON.stringify(progress));
        }//if文の括弧
      }//for文の括弧

    }//if分の括弧
  }//関数自体の括弧

  makeProgress();

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

//----------------------------------------------------------------------------




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

//jsonProgressを取り出すしき
/*let jsonProgress = JSON.parse(localStorage.getItem("key_progress"));
if(jsonProgress != null && progress.length >= 1) {
  for(let i = 0; i < jsonProgress.length; i++) {
    console.log(jsonProgress[i]);
    let li = document.createElement('li');
    li.textContent = jsonProgress[i];
    situationList.appendChild(li);
    console.log(situationList);
    progress.push(jsonProgress[i]);
    localStorage.setItem("key_progress", JSON.stringify(progress));
  }//for文の括弧
}//if文の括弧*/
