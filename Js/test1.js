/* sessionStorage.setItem("now", 1000); */
const word = sessionStorage.getItem("word");
const now = sessionStorage.getItem("now");
let noww = Number(now);
console.log(noww);
/* const ans = sessionStorage.getItem("ans");
console.log(ans); */
var list = [1, 2];
console.log(list);
console.log(list.length); // 2
console.log(typeof(list));
/* var arr = ans.split(',').map(Number); */
const ans = [0]
//console.log(arr); // [0, 1, 2, 3, 4]
//console.log(arr.length);
let test = 10;


if (noww<1){
    noww=1;
};
console.log(noww);

const includer3 = (file_name,id) =>{
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
            window.location.href = 'all_article.html';
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
            window.location.href = 'all_article.html';
        }
        page[4].addEventListener('click',post);
        page[0].addEventListener('click',prev);
        const title = document.querySelector('.serch-title');
        const baseList = contents.querySelector('.table-link');
        const article_list = contents.querySelector('.article-list');
        async function loadData1() {
            const response = await fetch(apiURL);
            const data1 = await response.json();
            const max = 5;
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
                window.location.href = 'all_article.html';
            };
            const end = () =>{
                sessionStorage.setItem("now", pageNum);
                window.location.href = 'all_article.html';
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
                    copy.querySelector('.list-link').href = entry.link;
                    /* copy.querySelector('.link').href = entry.link; */
                    copy.querySelector('.list-img').src = entry.image;
                    copy.querySelector('.list-content').textContent = entry.content;
                    copy.querySelector('.list-update').textContent = formattedDate;
                    console.log(entry.link);
                    article_list.appendChild(copy);
                    
                }
                
            };
            
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
includer3("all.html","main-content");
