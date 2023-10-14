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
  console.log("include/"+file_name)
  include.onreadystatechange = function () {
    if (include.readyState === 4 && include.status === 200) {
      const HTML = include.responseText;
      const contents = document.querySelector("#"+id);
      contents.insertAdjacentHTML("afterbegin", HTML);
    }
  };
  include.send();
  console.log('a')
};

includer("head.html","head");
includer("nav.html","nav");
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


