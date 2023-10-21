const word = sessionStorage.getItem("word");
const ans = sessionStorage.getItem("ans");
console.log(ans);
var list = [1, 2];
console.log(list);
console.log(list.length); // 2
console.log(typeof(list));
var arr = ans.split(',').map(Number);
console.log(arr); // [0, 1, 2, 3, 4]
console.log(arr.length);

const includer2 = (file_name,id) =>{
    const include = new XMLHttpRequest();
    include.open("GET", "include/"+file_name, true);
    include.onreadystatechange = function () {
        if (include.readyState === 4 && include.status === 200) {
        const HTML = include.responseText;
        const contents = document.querySelector("#"+id);
        contents.insertAdjacentHTML("afterbegin", HTML);
        const title = document.querySelector('.serch-title');
        const baseList = contents.querySelector('.table-link');
        console.log(baseList);
        const article_list = contents.querySelector('.article-list');
        console.log(article_list);
        async function loadData1() {
            console.log('a');
            const response = await fetch(apiURL);
            const data1 = await response.json();
            arr.forEach(num => {
                entry = data1[num];
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
            });
        };
        if(ans.length===0 || word===null){
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
            
        };

        const spreadsheets2 = contents.querySelector('.js-base');

        if (spreadsheets2) {
            spreadsheets2.parentNode.removeChild(spreadsheets2);
        };
        

    }
    };
    include.send();
};
includer2("list1.html","main-content");
