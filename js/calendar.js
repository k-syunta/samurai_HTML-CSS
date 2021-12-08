'use strict';

document.addEventListener('DOMContentLoaded', ()=> {

  //現在の年と月を求める
  let data = new Date();
  let nowMonth = data.getFullYear() + '年' + (data.getMonth() + 1) + '月';

  //headerに現在の年と月を入れる
  let header = document.getElementById('header');
  header.textContent = nowMonth;

  //prev(前),next(次)を取得
  let btn = document.getElementById('btn');
  let prevBtn = document.getElementById('prev');
  let nextBtn = document.getElementById('next');
  let todayBtn = document.getElementById('today');

  //prevボタンで前の月へ
  prevBtn.addEventListener('click', ()=> {
    function getPrev() {
      let getPrevMonth = data.setMonth(data.getMonth() - 1);
      let getYear = new Date(getPrevMonth).getFullYear() +　'年';
      //自己メモ：-1したままでは先月の月が存在しなくなってしまうのでここで+1する
      let getMonth = new Date(getPrevMonth).getMonth() + 1 + '月';
      return getYear + getMonth;
    }
    header.textContent = getPrev();
    //prevボタンで前の月のカレンダーに変更
    month--;
    makeCalendar(year, month);
  });

  //nextボタンで次の月へ
  nextBtn.addEventListener('click', ()=> {
    function getNext() {
      let getNextMonth = data.setMonth(data.getMonth() + 1);
      let getYear = new Date(getNextMonth).getFullYear() +　'年';
      let getMonth = new Date(getNextMonth).getMonth() + 1 + '月';
      return getYear + getMonth;
    }
    header.textContent = getNext();
    //nextボタンで次の月のカレンダーに変更
    month++;
    makeCalendar(year, month);
  })

  //todayボタンでheaderの月も現在の月のを示すようにする
  todayBtn.addEventListener('click', ()=> {
    //dataを初期化してtodayボタンを押した後は11月、1月につながるようにしている
    data = new Date();
    function getNow() {
      let getNowMonth = today.setMonth(data.getMonth());
      let getNowYear = new Date(getNowMonth).getFullYear() +　'年';
      let getMonthNow = new Date(getNowMonth).getMonth() + 1 + '月';
      return getNowYear + getMonthNow;
    }
    header.textContent = getNow();
  })


  //カレンダーの表示
  const week = ['日','月','火','水','木','金','土'];
  let calendar = document.getElementById('calendar');
  let year = data.getFullYear();
  let month = data.getMonth();
  let date = data.getDate();

  //その月のカレンダーを作るためのメソッド
  function makeCalendar(year, month) {

    //HTML要素を組み立てる
    //makeCalendarメソッドの中で初期化しないとカレンダーが追加されて表示してしまう
    let calendarHTML = '';
    //weekの配列の中のものをth要素に入れていく
    calendarHTML += '<table>';
    calendarHTML += '<tr>';
    for(let i = 0; i < week.length; i++) {
      calendarHTML += '<th>' + week[i] + '</th>';
    }
    calendarHTML += '</tr>';

    //日付の部分を取得してtd要素に入れていく
    //月の初めの日、終わりの日を取得する
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0);
    const endDateCount = endDate.getDate();
    //前の月の終わりの日を取得
    const prevEndDate = new Date(year, month, 0);
    const prevEndDateCount = prevEndDate.getDate();
    //月の初めの日の曜日を取得
    const startDay = startDate.getDay();
    //日にちのカウント
    let dayCount = 1;

    for(let h = 0; h < 6; h++) {
      calendarHTML += '<tr>';

      for(let w = 0; w < 7; w++) {
        if(h == 0 && w < startDay) {
          //一行目(h == 0)でwの値がstartDay(曜日のインデックス番号)よりも少ない場合
          //前の月の終わりの日を取得 - 月の初めの日の曜日を取得(数値)に変数wを足して
          //1マスずつ埋めていき、1(index番号だから)を足して最初のあまりを前の月の数で埋める
          let num = prevEndDateCount - startDay + w + 1;
          calendarHTML += '<td class="nolook">' + num + '</td>';
        } else if(dayCount > endDateCount) {
          //最後の日の日数を超えた場合
          let num = dayCount - endDateCount;
          calendarHTML += '<td class="nolook">' + num + '</td>';
          dayCount++;
        } else {
          //1~その月の最終日までの日付内の場合
          //'<a href="#" class="click">''</a>'を使えば日付クリック設定行えそう
          calendarHTML += '<td>' + dayCount + '</td>';
          dayCount++;
        }
      }
      calendarHTML += '<tr>';
    }
    calendarHTML += '</table>';

    //今月と今日の日にちの取得をする
    let y = new Date().getFullYear();
    let m = new Date().getMonth();
    let d = new Date().getDate();
    //monthが現在の月（今月）である場合、yearが現在の年（今年）である場合に
    if(month == m && year == y) {
      //replaceで「>今日の日にち<」（第一引数）という文字列を第二引数の形に置き換える
      calendarHTML = calendarHTML.replace('>' + d + '<', ' class="today">' + d + '<')
    }
    calendar.innerHTML = calendarHTML;
  }
  //その時の月のカレンダーを表示するために実行
  makeCalendar(year, month);

//todayボタンで今日のカレンダーにとびその日の背景色を変える
let today = new Date();
//todayボタンで今月のカレンダーに書き換わる
todayBtn.addEventListener('click', ()=> {
  //monthが今月を示していない場合、今月を示すようにしてカレンダーを今月のものに書き換える
  if(year !== today.getFullYear()){
    year = today.getFullYear();
  }
  if(month !== today.getMonth()) {
    month = today.getMonth();
  }
  makeCalendar(year, month);
});

//日付指定の選択で選択したカレンダーの表示
//それぞれのselect要素の取得
let mSpecify = document.getElementById('month');
let ySpecify = document.getElementById('year');

//月を選択するためのselect要素の作成
let monthHTML = '';
for(let m = 1; m < 13; m++) {
  monthHTML += '<option value="' + m + '">' + m +　'月' + '</option>';

　//もし現在の月の場合selected属性を追加して初期値にする
  if(m === month + 1) {
    monthHTML = monthHTML.replace('>' + (month + 1) + '月' +'<', ' selected>' + (month + 1) + '月' +'<');
  }
}
mSpecify.innerHTML = monthHTML;

//年を選択するためのselect要素の作成
let yearHTML = '';
for(let y = year + 10; y > 1969; y--) {
  yearHTML += '<option value="' + y + '">' + y +'年' + '</option>';

　//もし現在の年の場合selected属性を追加して初期値にする
  if(y === year) {
    yearHTML = yearHTML.replace('>' + year + '年' +'<', ' selected>' + year + '年' +'<');
  }
}
ySpecify.innerHTML = yearHTML;

//option.valueを求めて、headerの月表示を変更するための関数を作成
function checkValueM() {
  const month = document.form.month;
  let numM = month.selectedIndex;
  let valueM = month.options[numM].value;
  const year = document.form.year;
  let numY = year.selectedIndex;
  let valueY = year.options[numY].value;
  let header = document.getElementById('header');
  let spesifyM = valueY + '年' + valueM + '月';
  header.textContent = spesifyM;
  //valueは1～12が入っているから -1して、0～11が入るようにする
  //0~11にするのは月が０から始まるため
  makeCalendar(valueY, valueM -1);
}
//mSpecifyの選択が変わった時のイベント操作
mSpecify.addEventListener('change', ()=> {
  //headerの数字を変更
  checkValueM();

  let numM = document.form.month.selectedIndex;
  let valueM = document.form.month.options[numM].value;
  let numY = document.form.year.selectedIndex;
  let valueY = document.form.year.options[numY].value;

  //data を基準に前次のカレンダーを作ってるから data に選択した月(value)を再設定しないといけない
  data.setYear(valueY);
  data.setMonth(valueM -1);
  //yaer month の更新
  year = valueY;
  month = (valueM - 1);

});


//option.valueを求めて、headerの年表示を変更するための関数を作成
function checkValueY() {
  const month = document.form.month;
  let numM = month.selectedIndex;
  let valueM = month.options[numM].value;
  const year = document.form.year;
  let numY = year.selectedIndex;
  let valueY = year.options[numY].value;
  let header = document.getElementById('header');
  let spesifyY = valueY + '年' + valueM + '月';
  header.textContent = spesifyY;
  //カレンダーの表示を合わせる
  makeCalendar(valueY, valueM -1);
}
//ySpecifyの選択が変わった時のイベント操作
ySpecify.addEventListener('change', ()=> {
  //headerの数字を変更
  checkValueY();

  let numM = document.form.month.selectedIndex;
  let valueM = document.form.month.options[numM].value;
  let numY = document.form.year.selectedIndex;
  let valueY = document.form.year.options[numY].value;

  data.setYear(valueY);
  data.setMonth(valueM　- 1);
  year = valueY;
  month = (valueM - 1);

});



}, false);
