const bookContainer = document.querySelector(".book-container");
const form = document.querySelector("#form");

const myLibrary = [];

/*Book constructor */
// function Book(title, author, page, hasRead){
//     this.uuid = crypto.randomUUID();
//     this.title = title;
//     this.author = author;
//     this.page = page;
//     this.hasRead = hasRead;
// }

// Book.prototype.toggle = function(){
//     this.hasRead = !this.hasRead;
// }

/* Book class */
class Book{
    constructor(title, author, page, hasRead){
        this.uuid = crypto.randomUUID();
        this.title = title;
        this.author = author;
        this.page = page;
        this.hasRead = hasRead;
    }
    toggle(){
        this.hasRead = !this.hasRead;
    }
}



/* Add books to list */
function addBookToLibrary(title, author, page, hasRead){
    myLibrary.push( new Book(title, author, page, hasRead));
}

/* render books in the array on the page */
function addBookToDisplay(){
    bookContainer.innerHTML = "";

    myLibrary.forEach(book => {
        const bookDiv = document.createElement("div");
        const bookImg = document.createElement("img");
        const titleP = document.createElement("p");
        const authorP = document.createElement("p");
        const pageP = document.createElement("p");
        const statusP = document.createElement("p");
        const buttonDiv = document.createElement("div");
        const removeBtn = document.createElement("button");
        const readBtn = document.createElement("button");

        bookDiv.classList.add("book");
        bookImg.src = "book-open-page-variant.svg";
        bookImg.alt = "book";

        titleP.classList.add("book-info");
        authorP.classList.add("book-info");
        pageP.classList.add("book-info");
        statusP.classList.add("book-info");
        buttonDiv.classList.add("book-btn");

        titleP.textContent = `Title ${book.title}`;
        authorP.textContent = `Author: ${book.author}`;
        pageP.textContent = `Pages: ${book.page}`;
        statusP.textContent = `Status: ${book.hasRead ? "Read" : "Not Read"}`;

        readBtn.textContent = `${book.hasRead ? "Not Read" : "Read"}`;
        removeBtn.textContent = "Remove";

        removeBtn.addEventListener("click", ()=>{
            const index = myLibrary.findIndex(b => b.uuid === book.uuid);
            if (index !== -1) {
                myLibrary.splice(index, 1);
                addBookToDisplay();
            }
        });
        readBtn.addEventListener("click", ()=>{
            book.toggle();
            addBookToDisplay();
        });

        buttonDiv.appendChild(removeBtn);
        buttonDiv.appendChild(readBtn);

        bookDiv.appendChild(bookImg);
        bookDiv.appendChild(titleP);
        bookDiv.appendChild(authorP);
        bookDiv.appendChild(pageP);
        bookDiv.appendChild(statusP);
        bookDiv.appendChild(buttonDiv);

        bookContainer.appendChild(bookDiv);

    });
}

form.addEventListener("submit", e=>{
    e.preventDefault();

    /* Value from the form */
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const page = document.querySelector("#page").value;
    const hasRead = document.querySelector("#status").checked;

    addBookToLibrary(title, author, page, hasRead);

    addBookToDisplay();

    form.reset();
});

addBookToDisplay();






// function addBookToDisplay(books){

//     function createBook(book){
//         const div = document.createElement("div");
//         div.classList.add("book");
//         createBookContent(book, div);
//         addButtonToBook(div);
//         bookContainer.appendChild(div);
//     }

//     for(const book of books){
//         createBook(book);
//     }
// }

// form.addEventListener("submit", e =>{
//     e.preventDefault();
//     addBookToLibrary(title.value, author.value, page.value, hasRead.checked);
// });

