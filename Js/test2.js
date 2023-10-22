/* sessionStorage.setItem("now", 1000); */
const word = sessionStorage.getItem("word");
const now = sessionStorage.getItem("now");

let category = sessionStorage.getItem("category");
const categoryList = {set:'集合と位相',lebesgue:'ルベーグ積分',prob:'確率論',quantum:'量子力学'};
console.log(category);
if (category===null){
    category = 'set'
}else if(category === undefined){
    let category = 'set'; 
};
console.log(category);
let categoryName = categoryList[category];
console.log(categoryName);

let noww = Number(now);





if (noww<1){
    noww=1;
};
console.log(noww);

const includer3 = (file_name,id,categorySet) =>{
    console.log(categorySet);
    const include = new XMLHttpRequest();
    include.open("GET", "include/"+file_name, true);
    include.onreadystatechange = function () {
        if (include.readyState === 4 && include.status === 200) {
        const HTML = include.responseText;
        const contents = document.querySelector("#"+id);
        contents.insertAdjacentHTML("afterbegin", HTML);
        const page1 = document.querySelector('.pagenation');
        const page = page1.querySelectorAll('span'); 
        const prev = () =>{
            let now1 = noww-1;
            sessionStorage.setItem("now", now1);
            console.log('あい！')
            window.location.href = 'set.html';
        };
        const post = () =>{
            if(noww === 0 || noww ===1 ){
                let now1 = 2;
                sessionStorage.setItem("now", now1);
            }else{
                let now1 = noww+1;
                sessionStorage.setItem("now", now1);
            };
            console.log('こん')
            window.location.href = 'set.html';
        }
        page[4].addEventListener('click',post);
        page[0].addEventListener('click',prev);
        const title = document.querySelector('.serch-title');
        const baseList = contents.querySelector('.table-link');
        const article_list = contents.querySelector('.article-list');
        async function loadData1() {
            const response = await fetch(apiURL);
            const data2 = await response.json();
            const data1 = data2.filter(element => {
                return !(element.category1 !== categorySet & element.category2 !== categorySet);
            });
            /* console.log(data1[0].) */
            data1.forEach(element => {
                console.log(element.title);
                
            });
            /* data1.forEach(element => {
                if (element.category1 === categorySet || element.category2 === categorySet)
                console.log('テストだよ～'+element.title);
            }); */
            const max = 3;
            const pageNum = Math.ceil(data1.length/max);
            if (noww>pageNum){
                noww = pageNum;
                console.log(noww);
            };
            page[3].textContent = pageNum;
            if (noww === pageNum ){
                if(pageNum !==2){
                    page[2].textContent = '・・・';
                    page[4].parentNode.removeChild(page[4]);
                }else{
                    page[2].parentNode.removeChild(page[2]);
                    page[4].parentNode.removeChild(page[4]);
                };
                
            };
            if (noww === 0 || noww ===1){
                if(pageNum !==2){
                    page[2].textContent = '・・・';
                    page[0].parentNode.removeChild(page[0]);
                }else{
                    page[2].parentNode.removeChild(page[2]);
                    page[0].parentNode.removeChild(page[0]);
                };
                
                /* page[0].parentNode.removeChild(page[0]); */
                
            };
            if (noww !== 0 & noww !== 1){
                if(noww !==pageNum){
                    page[2].textContent = noww;
                };
                
            };
            if (pageNum === 1){
                page[2].parentNode.removeChild(page[2]);
                page[3].parentNode.removeChild(page[3]);
            };

            const first = () =>{
                sessionStorage.setItem("now", 1);
                window.location.href = 'set.html';
            };
            const end = () =>{
                sessionStorage.setItem("now", pageNum);
                window.scrollTo(0, 0); 
                window.location.href = 'set.html';
            };
            page[1].addEventListener('click',first);
            page[3].addEventListener('click',end);
            console.log(noww);

            for (let i = max*(noww-1); i <= max*(noww)-1 ; i++){
                if(i <=data1.length-1){
                    entry = data1[i];
                    const date = new Date(entry.day);
                    // 年、月、日を取得
                    const year = date.getFullYear();
                    const month = date.getMonth() + 1; // 月は0から11の値で表されるため、+1する
                    const day = date.getDate();
                    // 年、月、日を指定のフォーマットに変換
                    const formattedDate = `${year}/${month}/${day}`;
                    const copy = baseList.cloneNode(true);
                    copy.querySelector('.list-title').textContent = entry.title;
                    /* copy.querySelector('.list-link').href = entry.link; */
                    copy.setAttribute('onclick', "window.location.href="+"'"+entry.link+"'");
                    /* copy.querySelector('.link').href = entry.link; */
                    copy.querySelector('.list-img').src = entry.image;
                    copy.querySelector('.list-content').textContent = entry.content;
                    copy.querySelector('.list-update').textContent = formattedDate;
                    console.log(entry.link);
                    article_list.appendChild(copy);
                    
                }
                
            };
            console.log(categorySet)
            const categoryNow = document.getElementById(category);
            categoryNow.style.display = 'block'; 
            // クリックされた要素にスタイルを適用する関数
            function handleClick(event) {
                // 全ての要素を取得
                var elements = document.getElementsByClassName('category-link');

                var allElementsAreBlock = true;
                for (var i = 0; i < elements.length; i++) {
                    var element = elements[i];
                    var style = window.getComputedStyle(element);
                    if (style.display !== 'block') {
                        allElementsAreBlock = false;
                        break; // 1つでも "display: block;" でない要素が見つかったらループを終了
                    };
                };
                
                // すべての要素が "display: block;" の場合の処理
                if (allElementsAreBlock) {
                    window.location.href='set.html';
                }

                // 全ての要素に対してループ
                for (var i = 0; i < elements.length; i++) {
                    var element = elements[i];
                    
                    // クリックされた要素と現在の要素が一致するか確認
                    if (element === event.currentTarget) {
                        element.style.display = 'block'; // クリックされた要素には表示
                        let category = element.id;
                        console.log(category);
                        sessionStorage.setItem('category', category);
                        sessionStorage.setItem('now', 1);
                        
                    } else if(element.style.display === 'block'){
                        element.style.display = 'none'; // それ以外の要素には非表示
                    }else{
                        element.style.display = 'block';
                    }
                }

                
            }

            // クリックイベントを設定
            var links = document.getElementsByClassName('category-link');
            for (var i = 0; i < links.length; i++) {
                links[i].addEventListener('click', handleClick);
            }
            
            const hand = () =>{
                console.log('変わったよ～')
            }
            window.addEventListener('hashchange', hand);
            
        };
        loadData1();
        
        
        /* if(ans.length===0 || word===null){
            title.textContent = '検索結果はありませんでした。'
            title.style.textDecoration = 'underline';
            const spreadsheets2 = contents.querySelector('.js-base');

        if (spreadsheets2) {
            spreadsheets2.parentNode.removeChild(spreadsheets2);
        };
        }else{
            console.log(word);
            title.textContent = '検索結果:'+word;
            console.log(apiURL);
            loadData1();
            
        }; */

        const spreadsheets2 = contents.querySelector('.js-base');

        if (spreadsheets2) {
            spreadsheets2.parentNode.removeChild(spreadsheets2);
        };
        

    }
    };
    include.send();
};

includer3("set1.html","main-content",categoryName);
/* document.addEventListener('hashchange', includer3("set1.html","main-content")); */

