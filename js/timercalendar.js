'use script';

document.addEventListener('DOMContentLoaded', ()=> {

  const weeks = ['日', '月', '火', '水', '木', '金', '土'];
  const date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  const config = {
    show : 1,
  };

  function showCalendar(year, month) {

    for(let i = 0; i < config.show; i++) {
      const calendarHTML = createCalendar(year, month);
      const sec = document.createElement('section');
      sec.innerHTML = calendarHTML;
      let calendar = document.getElementById('calendar');
      if(calendar != null) {
        calendar.appendChild(sec);
      }

      month++;
      if(month > 12) {
        year++;
        month = 1;

      }

    }//for文

    let calendarZone = document.getElementById('calendarZone');
    if(calendarZone != null) {
      dataDisplay();
    }

  }//関数自体

  function showNote(year, month) {

    for(let i = 0; i < config.show; i++) {
      const noteHTML = createNote();
      const div = document.createElement('div');
      div.innerHTML = noteHTML;
      document.querySelector('#noteZone').appendChild(div);
    }

  }

  function createCalendar(year, month) {
    const startDate = new Date(year, month - 1, 1); //月の最初の日を取得
    const endDate = new Date(year, month, 0); //月の最後の日を取得
    const endDayCount = endDate.getDate(); //月の末日
    const lastMonthEndDate = new Date(year, month - 1, 0) //前の月の最後の日
    const lastMonthEndDayCount = lastMonthEndDate.getDate(); //前の月の末日
    const startDay = startDate.getDay(); //月の最初の日の曜日を取得
    let dayCount = 1; //日にちのカウント
    let calendarHTML = ''; //HTMLを組み立てる変数

    calendarHTML += `<h1 id="time">` + year + '/' + month + `</h1>`;
    calendarHTML += `<table>`;

    //曜日の行を作成
    for(let i = 0; i < weeks.length; i++) {
      calendarHTML += `<td>` + weeks[i] + `</td>`;
    }

    for(let w = 0; w < 6; w++) {
      calendarHTML += `<tr>`;

      for(let d = 0; d < 7; d++) {
        if(w == 0 && d < startDay) {
          //一行目で１日の曜日の前の場合
          let num = lastMonthEndDayCount - startDay + d + 1;
          calendarHTML += `<td class="is-disabled">` + num + `</td>`;
        } else if(dayCount > endDayCount) {
          //末日の日数を超えた場合
          let num = dayCount - endDayCount;
          calendarHTML += `<td class="is-disabled">` + num + `</td>`;
          dayCount++;
        } else {
          //その月の日にちのカレンダーの中で条件分岐（今日より後の日はクリックできない）
          //今月は今日より前にdayClickを追加して生成
          if(year == date.getFullYear() && month == date.getMonth() + 1 && dayCount == date.getDate()) {
            if(month < 10 && dayCount < 10) {
              calendarHTML += `<td class="dayClick ` + year + '-0' + month + '-0' + dayCount + ' today' + `">` + dayCount + `</td>`;
            } else if(month < 10) {
              calendarHTML += `<td class="dayClick ` + year + '-0' + month + '-' + dayCount + ' today' + `">` + dayCount + `</td>`;
            } else if(dayCount < 10) {
              calendarHTML += `<td class="dayClick ` + year + '-' + month + '-0' + dayCount + ' today' + `">` + dayCount + `</td>`;
            } else {
              calendarHTML += `<td class="dayClick ` + year + '-' + month + '-' + dayCount + ' today' + `">` + dayCount + `</td>`;
            }
            dayCount++;
          } else if(year === date.getFullYear() && month === date.getMonth() + 1 && dayCount <= date.getDate()) {
            if(month < 10 && dayCount < 10) {
              calendarHTML += `<td class="dayClick ` + year + '-0' + month + '-0' + dayCount + `">` + dayCount + `</td>`;
            } else if(month < 10) {
              calendarHTML += `<td class="dayClick ` + year + '-0' + month + '-' + dayCount + `">` + dayCount + `</td>`;
            } else if(dayCount < 10) {
              calendarHTML += `<td class="dayClick ` + year + '-' + month + '-0' + dayCount + `">` + dayCount + `</td>`;
            } else {
              calendarHTML += `<td class="dayClick ` + year + '-' + month + '-' + dayCount + `">` + dayCount + `</td>`;
            }
            dayCount++;
          //今月より前のカレンダーは全てクリックできる
        　} else if(year <= date.getFullYear() && month < date.getMonth() + 1) {
            if(month < 10 && dayCount < 10) {
              calendarHTML += `<td class="dayClick ` + year + '-0' + month + '-0' + dayCount + `">` + dayCount + `</td>`;
            } else if(month < 10) {
              calendarHTML += `<td class="dayClick ` + year + '-0' + month + '-' + dayCount + `">` + dayCount + `</td>`;
            } else if(dayCount < 10) {
              calendarHTML += `<td class="dayClick ` + year + '-' + month + '-0' + dayCount + `">` + dayCount + `</td>`;
            } else {
              calendarHTML += `<td class="dayClick ` + year + '-' + month + '-' + dayCount + `">` + dayCount + `</td>`;
            }
            dayCount++;
          //二つ目の式のみだと現在月が一月の時に予期せぬ挙動を起こしてしまうので前の年は全てクリックできるようにする
          } else if(year < date.getFullYear()) {
            if(month < 10 && dayCount < 10) {
              calendarHTML += `<td class="dayClick ` + year + '-0' + month + '-0' + dayCount + `">` + dayCount + `</td>`;
            } else if(month < 10) {
              calendarHTML += `<td class="dayClick ` + year + '-0' + month + '-' + dayCount + `">` + dayCount + `</td>`;
            } else if(dayCount < 10) {
              calendarHTML += `<td class="dayClick ` + year + '-' + month + '-0' + dayCount + `">` + dayCount + `</td>`;
            } else {
              calendarHTML += `<td class="dayClick ` + year + '-' + month + '-' + dayCount + `">` + dayCount + `</td>`;
            }
            dayCount++;
          } else {
            calendarHTML += `<td>` + dayCount + `</td>`;
            dayCount++;
          }

        }
      }
      calendarHTML += `</tr>`;
    }
    calendarHTML += `</table>`;

    return calendarHTML;
  }

  function moveCalendar(e) {
    document.querySelector('#calendar').innerHTML = '';

    if(e.target.id === 'prev') {
      month--;

      if(month < 1) {
        year--;
        month = 12;
      }
    }

    if(e.target.id === 'next') {
      month++;

      if(month > 12) {
        year++;
        month = 1;
      }
    }
    showCalendar(year, month);
  }

  let prev = document.getElementById('prev');
  if(prev != null) {
    document.querySelector('#prev').addEventListener('click', moveCalendar);
    document.querySelector('#prev').addEventListener('click', dataDisplay);
    document.querySelector('#prev').addEventListener('click', countStamp);
  }

  let next = document.getElementById('next');
  if(next != null) {
    document.querySelector('#next').addEventListener('click', moveCalendar);
    document.querySelector('#next').addEventListener('click', dataDisplay);
    document.querySelector('#next').addEventListener('click', countStamp);
  }


  showCalendar(year, month);

//-----------------メモの表示--------------------------------------------------------------

let noteZone = document.getElementById('noteZone');
let makeBtn = document.getElementById('makeBtn');

//メモ表示用のテキストをクリックでメモを表示する
if(makeBtn != null) {
  makeBtn.addEventListener('click', ()=> {
    let result = noteZone.classList.contains('nolook');

    if(result === true) {
      noteZone.classList.remove('nolook');
    } else {
      noteZone.classList.add('nolook');
    }
  })
}

//------------------メモ内の動作-------------------------------------------------------------

let close = document.getElementById('close');

//バツマークをクリックでメモを閉じる
if(close != null) {
  close.addEventListener('click', ()=> {
    noteZone.classList.add('nolook');
  })
};

//入力欄のvalueを取得する
let keep = document.getElementById('keep');

//入力されたvalueを保存ボタンのkクリックでローカルストレージに保存する
if(keep != null) {
  keep.addEventListener('click', ()=> {
    dataKeep();
  })
};

let dataList = [];

function dataKeep() {

  let noteDate = document.getElementById('date').value;
  let textArea = document.getElementById('textArea').value;
  let radio = document.getElementsByName('achieve');
  let checkValue = '';

  for(let r = 0; r < radio.length; r++) {
    if(radio[r].checked) {
      checkValue = radio[r].value;
    }
  }

  let jsonDataList = JSON.parse(localStorage.getItem("key_dataList"));

  if(jsonDataList != null && jsonDataList.length < 1) {
    let dataGather = [];
    dataGather.push(noteDate);
    dataGather.push(checkValue);
    dataGather.push(textArea);
    dataList.push(dataGather);
    localStorage.setItem("key_dataList", JSON.stringify(dataList));
  } else {
    //先に全てのデータを読み込むことで保存した日が新しい方のデータがつかえる
    if(jsonDataList != null) {
      for(let i = 0; i < jsonDataList.length; i++) {
        dataList.push(jsonDataList[i]);
      }
    }
    let dataGather = [];
    dataGather.push(noteDate);
    dataGather.push(checkValue);
    dataGather.push(textArea);
    dataList.push(dataGather);
    localStorage.setItem("key_dataList", JSON.stringify(dataList));
  }
  window.location.reload();
};

//-----------------メモの表示-----------------------------------------------------------------

function dataDisplay() {

  //カレンダーのtdmタグのクラスにローカルストレージに保存されているダー他の日付の部分と一致するものがあれば表示する
  let blackBack = document.getElementById('blackBack');
  let centerNote = document.getElementById('centerNote');
  let noChangeTop = document.getElementById('noChangeTop');
  let noChangeBottom = document.getElementById('noChangeBottom');

  //初期値の設定をするために　input要素を取得
  let displayNoteDate = document.getElementById('displayDate').value;
  let displayTextArea = document.getElementById('displayTextArea').value;
  let displayRadio = document.getElementsByName('displayAchieve');
  let dayClick = document.getElementsByClassName('dayClick');

  for(let d = 0; d < dayClick.length; d++) {
    //この式でクラスの日付の部分が取得
    let jsonDataList = JSON.parse(localStorage.getItem("key_dataList"));

    if(jsonDataList != null) {
      for(let i = 0; i < jsonDataList.length; i++) {
        //日付のクリックイベント
        dayClick[d].addEventListener('click', ()=> {
          //保存されている日付の部分とクリックした日付が一致した場合
          if(dayClick[d].classList[1] == jsonDataList[i][0]) {
            //背景を黒くし真ん中にメモが表示される
            blackBack.classList.remove('nolook');
            centerNote.classList.remove('nolook');
            noChangeTop.classList.remove('nolook');
            noChangeBottom.classList.remove('nolook');
            //初期値としてローカルストレージのデータを表示する
            document.getElementById('displayDate').value = jsonDataList[i][0];
            document.getElementById('displayTextArea').value = jsonDataList[i][2];
            let displayRadio = document.getElementsByName('displayAchieve');
            displayRadio[jsonDataList[i][1]].checked = true;
          }
        })//イベントのカッコ

        //達成していた場合にスタンプをカレンダー内に表示
        if(dayClick[d].classList[1] == jsonDataList[i][0]) {
          dayClick[d].classList.add('saved');
          if(jsonDataList[i][1] == 0) {
            dayClick[d].classList.add('stamp');
          } else if(jsonDataList[i][1] == 1) {
            dayClick[d].classList.remove('stamp');
          }
        }

      }//for文のカッコ
    }//if文のカッコ
  }//for文カッコ

}//関数自体のカッコ

//真ん中に表示されるメモも×のクリックで非表示クラスを追加する
let displayClose = document.getElementById('displayClose');

if(displayClose != null) {
  displayClose.addEventListener('click', ()=> {
    blackBack.classList.add('nolook');
    centerNote.classList.add('nolook');
    noChangeTop.classList.add('nolook');
    noChangeBottom.classList.add('nolook');
  })
}

//-----------------達成、未達成のカウント------------------------------------------------------



function countStamp() {

  let stampList = document.getElementById('stampList');
  let savedNum = document.getElementById('savedNum');
  let attainNum = document.getElementById('attainNum');
  let noAttainNum = document.getElementById('noAttainNum');

  //それぞれの数をカウントするための変数
  let savedCount = 0;
  let stampCount = 0;

  let dayClick = document.getElementsByClassName('dayClick');
  for(let d = 0; d < dayClick.length; d++) {

    //クラスにsavedが追加されている場合はデータが保存されている
    if(dayClick[d].classList[2] == "saved") {
      savedCount++;
    }
    //クラスにstampが追加されている場合は達成できた日のデータが保存されている
    if(dayClick[d].classList[3] == "stamp") {
      stampCount++;
    }

  }

  //それぞれの数をテキストとして埋め込む
  if(savedNum != null) {
    savedNum.textContent = savedCount;
  }
  if(attainNum != null) {
    attainNum.textContent = stampCount;
  }
  if(noAttainNum != null) {
    noAttainNum.textContent = savedCount - stampCount;
  }

}

countStamp();

//-----------現在時間が24時になったらブラウザのリロードを行う----------------------------------------------------------------------

//24時になったらリロードを行い、今日の装飾を入れ替える（リロードしないと昨日の日付に装飾がついたまま）
//できていなかったから試行錯誤
let hour = date.getHours();
let minute = date.getMinutes();
let second = date.getSeconds();

if(hour == 7 && minute == 38 && second == 40) {
  window.location.reload();
}

//---------------------------------------------------------------------------------






//localStorage.removeItem("key_dataList");

}, false);
