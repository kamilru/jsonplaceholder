fetch('https://jsonplaceholder.typicode.com/photos')
  .then(response => response.json())
  .then(json => {
	
    
let current_page = 1;
let records_per_page = 12;
let btn_next = document.querySelector("#btn_next");
let btn_prev = document.querySelector("#btn_prev");

function prevPage()
{
    if (current_page > 1) {
        current_page--;
        changePage(current_page);
    }
    showImage();
}

function nextPage()
{
    if (current_page < numPages()) {
        current_page++;
        changePage(current_page);
    }
    showImage();
}

function changePage(page)
{
    let page_span = document.querySelector("#page");
    let result = document.querySelector('#result');

    if (page < 1) {
        page = 1;
    }
    if (page > numPages()) {
        page = numPages();
    }

    result.innerHTML = "";

    for (let i = (page-1) * records_per_page; i < (page * records_per_page); i++) {
        result.innerHTML += "<a class='title' href='"+json[i].thumbnailUrl+"'>"+ json[i].title+ "</a><br>";
    }
    page_span.innerHTML = page;

    if (page == 1) {
        btn_prev.style.display = "none";
    } else {
        btn_prev.style.display = "inline-block";
    }

    if (page == numPages()) {
        btn_next.style.display = "none";
    } else {
        btn_next.style.display = "inline-block";
    }
}

function numPages()
{
    return Math.ceil(json.length / records_per_page);
}
    
changePage(1);
    
btn_prev.addEventListener("click", prevPage);
btn_next.addEventListener("click", nextPage);

function showImage() {
    let link = document.querySelectorAll(".title");
    let image = document.querySelector("#image");
    image.innerHTML = "";
    
    link.forEach(function(elem){
    
        elem.addEventListener("click", function(e) {
            e.preventDefault();
            let href = this.getAttribute("href");
            image.innerHTML = "<img src='"+href+"'>";
        }) 
    })
}
    
    showImage();


})

