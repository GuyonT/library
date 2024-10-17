class Book {
    constructor(name, author, pages) {
        this.name = name;
        this.author = author;
        this.pages = pages;
    }

    isRead = false;
    index = n;

    info() {
        return this.name + " by " + this.author + ", " + this.pages + "pages."
    }
}

//variables 

const bookName = document.getElementById("book-name");
const bookAuthor = document.getElementById("book-author");
const bookPages = document.getElementById("book-pages");
const readStatus = document.getElementById("read-status");

const form = document.getElementById("form")
const showDialog = document.getElementById("dialog-button");
const dialog = document.getElementById("dialog");
const submitBtn = document.getElementById("submit");
const closeBtn = document.getElementById("close-button");

const grid = document.getElementById("book-grid");

const myLibrary = [];
let n = 0;


//dialog events

showDialog.addEventListener("click", () => {
    dialog.showModal();
})

closeBtn.addEventListener("click", () => {
    dialog.close();
})

submitBtn.addEventListener("click", () => {
    if (form.checkValidity()) {
        let userBook = new Book(bookName.value, bookAuthor.value, bookPages.value);
        n++;
        if (readStatus.checked) {userBook.isRead = true} else {userBook.isRead = false}
        myLibrary.push(userBook);

        displayBookGrid();
        setTimeout(function () {
            form.reset();
        }, 10)
    }
})


//display functions

const jsBtn = document.getElementById("js-btn")
jsBtn.addEventListener("click", () => {
    console.log(myLibrary);
})


function displayBookGrid () {
    grid.innerHTML = "";

    myLibrary.forEach((book) => {
        let card = document.createElement("article");
        card.classList.add("book-card");
        grid.appendChild(card)

        let displayName = document.createElement("p");
        displayName.classList.add("display-name")
        displayName.textContent = book.name;
        card.appendChild(displayName);

        let displayAuthor = document.createElement("p");
        displayAuthor.textContent = book.author;
        card.appendChild(displayAuthor);

        let displayPages = document.createElement("p");
        displayPages.textContent = book.pages + " pages";
        card.appendChild(displayPages);

        let readButton = document.createElement("button");
        if (!book.isRead) {
            readButton.classList.add("button", "red-button");
            readButton.textContent = "Not read";
        } else {
            readButton.classList.add("button", "green-button");
            readButton.textContent = "Read";
        }
        card.appendChild(readButton);

        let rmvButton = document.createElement("button");
        rmvButton.textContent = "Remove";
        rmvButton.classList.add("button");
        card.appendChild(rmvButton)
    })
}


