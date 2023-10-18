/* const includeHeader = new XMLHttpRequest();
includeHeader.open("GET", "include/head.html", true);
includeHeader.onreadystatechange = function () {
  if (includeHeader.readyState === 4 && includeHeader.status === 200) {
    const headerHTML = includeHeader.responseText;
    const header = document.querySelector("#header");
    header.insertAdjacentHTML("afterbegin", headerHTML);
  }
};
includeHeader.send(); */

/* const include = new XMLHttpRequest();
include.open("GET", "include/"+"head.html", true);
include.onreadystatechange = function () {
  if (include.readyState === 4 && include.status === 200) {
    const HTML = include.responseText;
    const contents = document.querySelector("#header");
    contents.insertAdjacentHTML("afterbegin", HTML);
  }
};
include.send(); */

const includer = (file_name,id) =>{
  const include = new XMLHttpRequest();
  include.open("GET", "include/"+file_name, true);
  include.onreadystatechange = function () {
    if (include.readyState === 4 && include.status === 200) {
      const HTML = include.responseText;
      const contents = document.querySelector("#"+id);
      contents.insertAdjacentHTML("afterbegin", HTML);
    }
  };
  include.send();
};

includer("head.html","head");
includer("nav.html","nav");
includer("article1.html","main-content");
includer("side.html","side");
includer("footer.html","footer")

/* const includer1 = (file_name,id) =>{
  const include = new XMLHttpRequest();
  include.open("GET", "include/"+file_name, true);
  console.log("include/"+file_name)
  include.onreadystatechange = function () {
    if (include.readyState === 4 && include.status === 200) {
      const HTML = include.responseText;
      const contents = document.querySelector("#"+id);
      contents.insertAdjacentHTML("afterbegin", HTML);
    }
  };
  include.send();
 
};
includer1("footer.html","footer")
window.addEventListener('load', function() {
  // ページの読み込みが完了したらコンテンツを表示
  this.setTimeout(()=>{
    const test = document.querySelector(".footerFixed");
  test.style.display = "block";
  console.log(test.classList);
  },1300)
}); */
/* window.onload = function (){
  const test = document.querySelector(".footerFixed");
  test.style.visibility = "visible";
  console.log(test.classList);
}; */
/* const test = document.querySelector(".footerFixed");
console.log(test.classList);
test.style.visibility = "hidden" */

/* window.onload = function (){
  const test = document.querySelector(".footerFixed");
  console.log(test.classList);
  test.style.removeProperty("visibility")
}; */


// 画面の大きさがmin以下になったら要素にスタイルを設定する関数
function checkViewportSize() {
  const min = 800; // 最小の幅（ピクセル単位）を設定

  const viewWidth = window.innerWidth;//画面の大きさを取得
  const articleElement = document.getElementById("article");//article要素を取得
  const sideElement = document.getElementById("side");//side要素を取得

  if (viewWidth <= min) {
    sideElement.style.display = "None";//小さかったら画面から消す。
    
  } else {
    sideElement.style.removeProperty("display")//大きかったら、戻す。

  }
}

// ページ読み込み時に初回実行
checkViewportSize();

// ウィンドウのリサイズ時にも実行
window.addEventListener("resize", checkViewportSize);

/* // クラス名が "toc-005" の要素を取得
const element = document.getElementsByClassName("toc-005");

const elements = element[0].getElementsByTagName("a");


elements[0].onmouseover = function () {
  elements[0].style.color = "red";
};

elements[0].onmouseout = function () {
  elements[0].style.color = "#333";
};
 */


const baseHtml = document.querySelector('.spreadsheets--item');
const spreadsheets = document.querySelector('.spreadsheets');
const apiURL = 'https://script.google.com/macros/s/AKfycby3qsRFhIGIOWKSV6SXI7l4gkfUBco8of0DBUAtGfbo58DhzjoqAa4OBqJ_0uW5zodbXg/exec';

async function loadData() {
  const response = await fetch(apiURL);
  const data = await response.json();
  for (let i = 0; i <= 4 ; i++){
    const entry = data[i];
    const copy = baseHtml.cloneNode(true);
    copy.classList.remove('js-base');
    const date = new Date(entry.day);
    // 年、月、日、曜日を取得
    let year = date.getFullYear();
    let month = date.getMonth() + 1; // 月は0から始まるため+1する
    let day = date.getDate();
    // フォーマットされた日付文字列を作成
    let formattedDate = year + '.' + month + '.' + day;
    //console.log(formattedDate); // "2023/10/2(月)"
    copy.querySelector('.spreadsheets--name').textContent = entry.title;
    copy.querySelector('.spreadsheets--name').href = entry.link;
    copy.querySelector('.spreadsheets--age').textContent = "更新日："+formattedDate;
    copy.querySelector('.spreadsheets--content').innerHTML = "内容："+entry.content;
    copy.querySelector('.spreadsheets--img').src = entry.image;
    spreadsheets.appendChild(copy);
  };

}

loadData();

const button = document.getElementById("myButton");

// ボタンがクリックされたときの処理を設定
button.addEventListener("click", function() {
  window.location.reload()
});
