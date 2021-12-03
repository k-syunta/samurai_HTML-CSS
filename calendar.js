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
  })

  //カレンダーの表示
  const week = ['日','月','火','水','木','金','土'];
  let calendar = document.getElementById('calendar');
  let year = data.getFullYear();
  let month = data.getMonth();
  //HTML要素を組み立てる
  let calendarHTML = '';

  //どの月のカレンダーを作るためのメソッド
  function makeCalendar(year, month) {
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
          calendarHTML += '<td>' + dayCount + '</td>';
          dayCount++;
        }
      }
      calendarHTML += '<tr>';
    }
    calendarHTML += '</table>';
    calendar.innerHTML = calendarHTML;
  }
  //その時の月のカレンダーを表示するために実行
  makeCalendar(year, month);

//prevボタンで前の月のカレンダーに変更
prevBtn.addEventListener('click', ()=> {
  month--;
  makeCalendar(year, month);
})


//nextボタンで次の月のカレンダーに変更





}, false);
