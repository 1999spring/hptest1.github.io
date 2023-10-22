let time = 1700;

window.onload = function(){
  setTimeout(()=>{
      const loader = document.querySelector('.loader');
      loader.classList.add("loaded")
      const content = document.querySelector('.footerFixed');
      content.style.display = 'block';
      const cover = document.querySelector('.cover');
      cover.style.display = 'none';
      
  },time)
  
}


// 画面の大きさがmin以下になったらサイドバーを消す関数
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



const apiURL = 'https://script.google.com/macros/s/AKfycbwr2_yBunIZqw2theL2eHCCs65-DvJ3QmNEoT0na5gHALdjlq3JE_RuC2ZLlVulLTqlTg/exec';


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
          copy.querySelector('.spreadsheets--name').textContent = 'タイトル：'+entry.title;
          copy.querySelector('.link').href = entry.link;
          copy.querySelector('.spreadsheets--img').src = entry.image;
          spreadsheets.appendChild(copy);
        };

        
        
        let button = contents.querySelector('#getWordButton');
        // ボタンがクリックされたときに実行する関数を定義
        function serchWord() {
            // 入力フィールドから値を取得
            let word = document.querySelector("#wordInput").value;
            const ans = [];
            data.forEach((ele,index) => {
              const sentence = ele.content;
              const regex = new RegExp(word, "g");
              const match = sentence.match(regex);
              if (match) {
                ans.push(index);
              };
              
            });
            sessionStorage.setItem("word", word);
            sessionStorage.setItem("ans", ans);

            

            
            
        }
      
        // ボタンにクリックイベントリスナーを追加
        button.addEventListener("click", serchWord);
        button.addEventListener('click', function() {
          // ページ遷移を行う
          window.location.href = 'article_list.html'; // この行を実際のURLに置き換えてください
        
      });

        
        

        

      }

      const spreadsheets1 = contents.querySelector('.js-base');

      if (spreadsheets1) {
        spreadsheets1.parentNode.removeChild(spreadsheets1);
      };

      
    
      

      loadData();
      }
  };
  include.send();
};

/* includer1("side.html","side"); */




includer1("side.html","side")








