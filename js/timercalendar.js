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
      document.querySelector('#calendar').appendChild(sec);

      month++;
      if(month > 12) {
        year++;
        month = 1;
      }

    }//for文

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
          if(year === date.getFullYear() && month === date.getMonth() + 1 && dayCount <= date.getDate()) {
            calendarHTML += `<td class="dayClick">` + dayCount + `</td>`;
            dayCount++;
          //今月より前のカレンダーは全てクリックできる
        　} else if(year <= date.getFullYear() && month < date.getMonth() + 1) {
            calendarHTML += `<td class="dayClick">` + dayCount + `</td>`;
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
        year++
        month = 1;
      }
    }
    showCalendar(year, month);
  }

  document.querySelector('#prev').addEventListener('click', moveCalendar);
  document.querySelector('#next').addEventListener('click', moveCalendar);

  showCalendar(year, month);

//-----------------メモの表示--------------------------------------------------------------

let dayClick = document.querySelectorAll('.dayClick');
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
    let noteDate = document.getElementById('date').value;
    let textArea = document.getElementById('textArea').value;
    let radio = document.getElementsByName('achieve');
    let checkValue = '';

    for(let r = 0; r < radio.length; r++) {
      if(radio[r].checked) {
        checkValue = radio[r].value;
      }
    }

    //取得するところまでできている
    console.log(noteDate);
    console.log(checkValue);
    console.log(textArea);
  })
};























}, false);
