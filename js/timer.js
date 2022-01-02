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
        window.alert('※項目(何をするか)を入力してから開始ボタンを押してください');
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
        window.alert(form.todo.value + 'を' + timer.textContent + '行いました。\n記録画面に追加します。\n※合計記録、達成状況に反映する際に秒数は切り捨てられます。');
        //リロードをして一度記録画面を開いたことにしたい
        window.location.reload();

      } else {

        let recordText = form.todo.value + '：' + timer.textContent;
        record.push(recordText);
        window.alert(form.todo.value + 'を' + timer.textContent + '行いました。\n記録画面に追加します。\n※合計記録、達成状況に反映する際に秒数は切り捨てられます。');
        //リロードをして一度記録画面を開いたことにしたい
        window.location.reload();
        //記録画面に落とし込みたい要素を配列に格納していく
        for(let r = 0; r < jsonRecord.length; r++) {
          record.push(jsonRecord[r]);
        }
        localStorage.setItem("key_record", JSON.stringify(record));

      };

      makeRemaining();
      localStorage.setItem("key_progress", JSON.stringify(progress));
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
        //項目の部分の取得
        //itemD[i][0]で項目の部分、itemD[i].inputで文字列全体
        let itemD = jsondataD.map(data => data.match(/(?<category>[亜-熙ぁ-んァ-ヶー\u4E00-\u9FFF]+)(?=：)/));
        let timeD = jsondataD[i].match(/[0-9]*/g);
        //前から数えると項目の文字数の変動でずれが生じるため後ろから数える
        let hourD = (timeD[timeD.length - 6]);　//時間の数字の部分を取得
        let minuteD = (timeD[timeD.length - 3]);　//分数の数字の部分を取得

        //重複したら後続処理は行わずループ先頭に戻る
        let check = itemProgress.indexOf(itemD[i][0]);
        if(check != -1) {
          continue;
        }

        itemProgress.push(itemD[i][0]);

        let resultText = itemD[i][0] + '：' + hourD + '時間' + minuteD + '分';
        let resultText2 = itemD[i][0] + '：' + minuteD + '分';

        //時間の値が 0 の場合は分数のみを表示できるように条件分岐
        if(hourD == 0) {
          let li = document.createElement('li');
          li.textContent = resultText2;
          dayList.appendChild(li);
        } else {
          let li = document.createElement('li');
          li.textContent = resultText;
          dayList.appendChild(li);
        }

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
     || timeH < 0 || timeH > 100 || timeH.match(/[^0-9]/) || timeM < 0 || timeM > 60 || timeM.match(/[^0-9]/)
     || (timeH < 1 && timeM < 1)) {
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
    console.log(textsLast);

    //配列の最後のvalueをテキストとして表示
    li.textContent = textsLast;
    dayList.appendChild(li);

  }


  //btn9でローカルストレージのデータを消去
  let btn9 = document.getElementById('btn9');
  if(btn9 != null) {
    btn9.addEventListener('click', ()=> {
      let res = window.confirm('※OKボタンをクリックすると、目標画面の目標、達成状況が全て削除されます');
      //confirmのOKをクリックするとローカルストレージのデータが削除される
      if(res == true) {
        localStorage.removeItem("key_day");
        localStorage.removeItem("key_progress");
        window.location.reload();
      }
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
  let situationList1 = document.getElementById('situationList1');
  let situationList2 = document.getElementById('situationList2');
  let situationList3 = document.getElementById('situationList3');

  let textsituation = document.getElementById('textsituation');

  let changeBtn = document.getElementById('changeBtn');

  function makeProgress() {
    if(jsondataD != null && jsondataD.length >= 0) {

      //ローカルストレージに保存されている目標時間を取得する
      let jsondataD = JSON.parse(localStorage.getItem("key_day"));
      for(let i = 0; i < jsondataD.length; i++) {
        //項目の部分の取得
        //itemD[i][0]で項目の部分、itemD[i].inputで文字列全体
        let itemD = jsondataD.map(data => data.match(/(?<category>[亜-熙ぁ-んァ-ヶー\u4E00-\u9FFF]+)(?=：)/));
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
        let itemP = progress[i].match(/.+?：/);

        //重複したら後続処理は行わずループ先頭に戻る
        let check = itemProgress2.indexOf(itemP[0])
        if (check != -1) {
          continue;
        }

        itemProgress2.push(itemP[0]);

        //btn＝残り時間の時
        let resultText1 = itemP[0] + '達成まで残り' + hourTimeD + '時間' + minuteTimeD + '分';
        let resultText2 = itemP[0] + '達成まで残り' + minuteTimeD + '分';
        //btn=合計時間の時
        let resultText3 = itemP[0] + '合計\b0分';
        //btn=達成度の時
        let resultText4 = itemP[0] + '現在\n0％';

        //btn=合計時間の時
        if(situationList1 != null) {
          let span = document.createElement('span');
          let li = document.createElement('li');
          span.textContent = resultText3;
          li.appendChild(span);
          situationList1.appendChild(li);
          textsituation.classList.add('nolook');
          localStorage.setItem("key_progress", JSON.stringify(progress));
        }

        //btn＝残り時間の時
        if(situationList2 != null) {
          if(hourTimeD === 0) {
            let span = document.createElement('span');
            let li = document.createElement('li');
            span.textContent = resultText2;
            li.appendChild(span);
            situationList2.appendChild(li);
          } else {
            let span = document.createElement('span');
            let li = document.createElement('li');
            span.textContent = resultText1;
            li.appendChild(span);
            situationList2.appendChild(li);
          }
          textsituation.classList.add('nolook');
          localStorage.setItem("key_progress", JSON.stringify(progress));
        }

        //btn=達成度の時
        if(situationList3 != null) {
          let span = document.createElement('span');
          let li = document.createElement('li');
          span.textContent = resultText4;
          li.appendChild(span);
          situationList3.appendChild(li);
          textsituation.classList.add('nolook');
          localStorage.setItem("key_progress", JSON.stringify(progress));
        }

  //--------------------------------------------------------------------------------

  //選択されているボタンの背景を白にする、文字を黒くする、非表示クラスを外して表示する
        let totalBtn = document.getElementById('totalBtn');
        let percentBtn = document.getElementById('percentBtn');
        let remainingBtn = document.getElementById('remainingBtn');

        //定義しておかないと最初に選択されているため、背景色で文字が見えなくなる
        totalBtn.classList.add('colorblack');

        if(totalBtn != null) {
          totalBtn.addEventListener('click', ()=> {
            totalBtn.classList.add('white');
            percentBtn.classList.remove('white');
            remainingBtn.classList.remove('white');
            totalBtn.classList.add('colorblack');
            percentBtn.classList.remove('colorblack');
            remainingBtn.classList.remove('colorblack');
            situationList1.classList.remove('nolook');
            situationList2.classList.add('nolook');
            situationList3.classList.add('nolook');
          });
        }

        if(remainingBtn != null) {
          remainingBtn.addEventListener('click', ()=> {
            remainingBtn.classList.add('white');
            totalBtn.classList.remove('white');
            percentBtn.classList.remove('white');
            remainingBtn.classList.add('colorblack');
            totalBtn.classList.remove('colorblack');
            percentBtn.classList.remove('colorblack');
            situationList2.classList.remove('nolook');
            situationList1.classList.add('nolook');
            situationList3.classList.add('nolook');
          })
        }

        if(percentBtn != null) {
          percentBtn.addEventListener('click', ()=> {
            percentBtn.classList.add('white');
            totalBtn.classList.remove('white');
            remainingBtn.classList.remove('white');
            percentBtn.classList.add('colorblack');
            totalBtn.classList.remove('colorblack');
            remainingBtn.classList.remove('colorblack');
            situationList3.classList.remove('nolook');
            situationList1.classList.add('nolook');
            situationList2.classList.add('nolook');
          });
        }

      }//for文の括弧

    } else {

      let totalBtn = document.getElementById('totalBtn');
      if(totalBtn != null) {
        totalBtn.classList.add('colorblack');
      }

      if(changeBtn != null) {
        changeBtn.addEventListener('click', ()=> {
          window.alert('※目標設定が行われていない場合、ボタンでの選択はできません');
        })
      }

    }
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
      let res = window.confirm('※OKボタンをクリックすると、記録画面の記録が全て削除されます');
      if(res == true) {
        localStorage.removeItem("key_record");
        localStorage.removeItem("key_total");
        window.location.reload();
      }
    });
  };

//----------------------------------------------------------------------------

//ローカルストレージ保存されている達成状況を取り出し記録された時間をひく関数(トップページ終了ボタンのイベントで定義する)

let data3 = new Date();
let data4 = new Date();
let data5 = new Date();
let data6 = new Date();

//合計時間を配列に格納しておくために定義
let totalbox = new Array();

let timebox = new Array();

function makeRemaining() {

  let jsonProgress = JSON.parse(localStorage.getItem("key_progress"));

  if(jsonProgress != null) {
    for(let i = 0; i < jsonProgress.length; i++) {

      //達成状況に表示されている項目の部分を取得する
      let itemtext = jsonProgress.map(data => data.match(/(?<category>[亜-熙ぁ-んァ-ヶー\u4E00-\u9FFF]+)(?=：)/));

      let jsonRecord = JSON.parse(localStorage.getItem("key_record"));

      //jsonRecordに保存されている最新の記録の項目を取得
      if(jsonRecord != null && jsonRecord.length != 0) {
        //記録の数分繰り返すことで最初の記録のみでの繰り返しの式になることを避けている
        for(let p = 0; p < jsonRecord.length; p++) {

          let recordItem = jsonRecord[p].match(/(?<category>[亜-熙ぁ-んァ-ヶー\u4E00-\u9FFF]+)(?=：)/);

          //達成状況に表示されている項目と記録に表示されている項目の一致しているもので式を進めていく
          if(recordItem[0] == itemtext[i][0]) {

            //一致した項目の数字部分（時間、分数）をそれぞれ取得し時間形式に変更
            //達成状況の一致した項目の数字
            let textItem = itemtext[i].input;

            let pitem = textItem.match(/[0-9]*/g);
            //前から数えると項目の文字数の変動でずれが生じるため後ろから数える
            let phour = (pitem[pitem.length - 6]);　//時間の数字の部分を取得
            let pminute = (pitem[pitem.length - 3]);　//分数の数字の部分を取得
            data3.setHours(phour);
            data3.setMinutes(pminute);
            let hourP = data3.getHours(); //達成状況の時間の数字を時間形式にしたもの
            let minuteP = data3.getMinutes(); //達成状況の分数の数字を時間形式にしたもの

            //最新の記録と一致した記録の時間（最新の記録の時間も含む）を足している
            let sameItemH = 0;
            let sameItemM = 0;


            for(let r = 0; r < jsonRecord.length; r++) {
              let sameItem = jsonRecord[r].match(/(?<category>[亜-熙ぁ-んァ-ヶー\u4E00-\u9FFF]+)(?=：)/);

              //カテゴリーの部分で一致したもののみ配列に格納する
              if(recordItem[0] === sameItem.groups.category) {
                let inputsi = sameItem.input;
                let sametime = inputsi.match(/[0-9]*/g);
                let sihour = (sametime[sametime.length - 8]);　
                let siminute = (sametime[sametime.length - 5]);
                data5.setHours(sihour);
                data5.setMinutes(siminute);
                let hourSI = data5.getHours();
                let minuteSI = data5.getMinutes();

                sameItemH += hourSI;
                sameItemM += minuteSI;

              }

            }


            //合計時間のテキストを条件によって作成
            let totalText;
            if(sameItemH === 0) {
              totalText = recordItem[0] + '：合計\b' + sameItemM + '分';
            } else {
              totalText = recordItem[0] + sameItemH + '：合計\b' + '時間' + sameItemM + '分';
            }

            //取得した時間形式の数値で達成状況から記録された時間をひく
            //時間と分の差を出しそれをms（ミリ秒）に換算する
            let remainingH = (hourP - sameItemH)*60*60*1000;
            let remainingM = (minuteP - sameItemM)*60*1000;
            //ms形式になった数値を時間の形式に戻す
            let resultTime = remainingH + remainingM;
            let resultH = Math.floor(resultTime / 3600000); //時間換算された状態での差（時間）
            let resultM = Math.floor((resultTime - resultH * 3600000) / 60000); //時間換算された状態での差（分）

            //時間の値が０の時は時間の部分を省力して表示する
            //残り時間が０になった場合にテキストを達成しましたに変える
            //ここを条件分岐で合計をテキストに入れ込むのか％をテキストに入れ込むのか

            let resultText;
            if((resultH === 0 && resultM === 0) || resultH < 0 || resultM < 0) {
              resultText = recordItem[0] + '：達成しました！';
            } else if(resultH === 0) {
              resultText = recordItem[0] + '：達成まで残り' + resultM + '分';
            } else {
              resultText = recordItem[0] + '：達成まで残り' + resultH + '時間' + resultM + '分';
            }

            //パーセント形式のテキストを作るのに必要な情報を取得(記録時間 / 目標時間)
            //記録時間の合計を取得
            let sameItemHms = (sameItemH)*60*60*1000;
            let sameItemMms = (sameItemM)*60*1000;
            let sameItemTms = sameItemHms + sameItemMms;

            //その項目の目標時間を取得
            //let jsondataD = JSON.parse(localStorage.getItem("key_day"));

            let dTimems = 0;

            if(jsondataD != null) {
              for(let d = 0; d < jsondataD.length; d++) {

                let itemD = jsondataD[d].match(/(?<category>[亜-熙ぁ-んァ-ヶー\u4E00-\u9FFF]+)(?=：)/);

                if(recordItem[0] == itemD[0]) {
                  let timeD = itemD.input.match(/[0-9]*/g);
                  let hourD = (timeD[timeD.length - 6]);　
                  let minuteD = (timeD[timeD.length - 3]);
                  data5.setHours(hourD);
                  data5.setMinutes(minuteD);
                  let dHour = data5.getHours();
                  let dMinute = data5.getMinutes();
                  let dHourms = (dHour)*60*60*1000;
                  let dMinutems = (dMinute)*60*1000;
                  dTimems = dHourms + dMinutems;
                }
              }
            }


            let timePer = sameItemTms / dTimems * 100;
            let resultPer = timePer.toFixed(1);

            //パーセントのテキストを作成
            let percentText = recordItem[0] + '：現在\n' + resultPer + '％';

            //記録されるたびにその項目の合計時間をリストに書き換える動作
            if(situationList1 != null) {
              let liList = document.querySelectorAll('#situationList1 li span');
              for(let l = 0; l < liList.length; l++) {
                //項目を取得して最新の記録と一致している項目のみ書き換える
                let liItem = liList[l].innerHTML.substr(0, liList[l].innerHTML.indexOf('：'));

                if(liItem === recordItem[0]) {
                  //一致したもののinnerHTMLで書き換えれるように操作
                  liList[l].innerHTML = totalText;
                  progress[l] = totalText;
                }
                localStorage.setItem("key_progress", JSON.stringify(progress));
              }
            }

            //記録されるたびにその項目の残り時間をリストに書き換える動作
            if(situationList2 != null) {
              let liList = document.querySelectorAll('#situationList2 li span');
              for(let l = 0; l < liList.length; l++) {
                //項目を取得して最新の記録と一致している項目のみ書き換える
                let liItem = liList[l].innerHTML.substr(0, liList[l].innerHTML.indexOf('：'));

                if(liItem === recordItem[0]) {
                  //一致したもののinnerHTMLで書き換えれるように操作
                  liList[l].innerHTML = resultText;
                  progress[l] = resultText;
                }
                localStorage.setItem("key_progress", JSON.stringify(progress));
              }
            }

            //記録されるたびにその項目の％をリストに書き換える動作
            if(situationList3 != null) {
              let liList = document.querySelectorAll('#situationList3 li span');
              for(let l = 0; l < liList.length; l++) {
                //項目を取得して最新の記録と一致している項目のみ書き換える
                let liItem = liList[l].innerHTML.substr(0, liList[l].innerHTML.indexOf('：'));

                if(liItem === recordItem[0]) {
                  //一致したもののinnerHTMLで書き換えれるように操作
                  liList[l].innerHTML = percentText;
                  progress[l] = percentText;
                }
                localStorage.setItem("key_progress", JSON.stringify(progress));
              }
            }

          }
        }

      }//if文のカッコ
    }//for文のカッコ
  }//if文のカッコ
}//関数自体のカッコ

makeRemaining();

//達成している項目があればチェックマークをつけるためのクラスの追加
let liList = document.querySelectorAll('#situationList2 li span');
for(let l = 0; l < liList.length; l++) {
  if(liList[l].innerHTML.indexOf('達成しました') != -1) {
    let achieveItem = liList[l].innerHTML.match(/(?<category>[亜-熙ぁ-んァ-ヶー\u4E00-\u9FFF]+)(?=：)/);
    liList[l].classList.add('checkmark');
    //ここで達成のマークがつけられた時間を記録しておきたい

  }
}

//------------------------------------------------------------------------------

//設定するボタンをクリックで設定のフォーム要素の非表示クラスを取る
let createBtn = document.getElementById('create-btn');

if(createBtn != null) {

  createBtn.addEventListener('click', ()=> {
    let result = form.classList.contains('nolook');

    if(result === true) {
      form.classList.remove('nolook');
    } else {
      form.classList.add('nolook');
    }

  });

}

//------------------------------------------------------------------------------

//ボタンをクリックでカレンダーが表示される
//let calendarBtn = document.getElementById('calendarBtn');
//let calendarZone = document.getElementById('calendarZone');
//let noteZone = document.getElementById('noteZone');


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
