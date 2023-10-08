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
};

includer("head.html","head");
includer("nav.html","nav")
includer("side.html","side")
includer("footer.html","footer")

