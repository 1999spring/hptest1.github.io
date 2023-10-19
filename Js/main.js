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

test = document.querySelector('.spreadsheets');
console.log(test);

const apiURL = 'https://script.google.com/macros/s/AKfycbwsMtKiI42v2YuCsINNWaMBsm87WS1BdJTGynhjhQxrYktVb4Fc76-P0IWBvUadt9eAqg/exec';





const includer1 = (file_name,id) =>{
  const include = new XMLHttpRequest();
  include.open("GET", "include/"+file_name, true);
  include.onreadystatechange = function () {
      if (include.readyState === 4 && include.status === 200) {
      const HTML = include.responseText;
      const contents = document.querySelector("#"+id);
      contents.insertAdjacentHTML("afterbegin", HTML);
      //DOM操作
      const baseHtml = contents.querySelector('.spreadsheets--item');
      const spreadsheets = contents.querySelector('.spreadsheets');
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
          copy.querySelector('.spreadsheets--name').textContent = 'タイトル：'+entry.title;
          copy.querySelector('.link').href = entry.link;
          copy.querySelector('.spreadsheets--img').src = entry.image;
          spreadsheets.appendChild(copy);
        };
      
      }

      const spreadsheets1 = contents.querySelector('.js-base');
      console.log(spreadsheets1);

      if (spreadsheets1) {
        spreadsheets1.parentNode.removeChild(spreadsheets1);
}
      loadData();
      }
  };
  include.send();
};

includer1("side.html","side");












/* window.addEventListener('load', function() {
  const textContainer = document.getElementById('text-container');
  const text = textContainer.textContent;
  const maxLines = 1; // 1行目の後に"..."を表示する
  const lineHeight = parseFloat(getComputedStyle(textContainer).lineHeight);
  const containerHeight = textContainer.clientHeight;
  const lines = containerHeight / lineHeight;

  if (lines > maxLines) {
    const lineBreakIndex = text.indexOf('\n');
    if (lineBreakIndex >= 0) {
      const newText = text.slice(0, lineBreakIndex) + '...';
      textContainer.textContent = newText;
    }
  }
}); */

/* window.addEventListener('load', function() {
  const textContainer = document.getElementsByClassName('spreadsheets--name');
  const computedStyle = getComputedStyle(textContainer[0]);
  const lineHeight = parseFloat(computedStyle.lineHeight);
  const containerHeight = textContainer[0].clientHeight;
  const lines = containerHeight / lineHeight;
  console.log(lineHeight);
  console.log(containerHeight);
  console.log('行数:', lines);
}); */