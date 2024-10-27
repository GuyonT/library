class Book {
    constructor(title, author, pages, isRead = false) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
        this.id = Date.now().toString();
    }

    toggleRead() {
        this.isRead = !this.isRead;
    }
}

class Library {
    constructor() {
        this.books = [];
    }

    addBook(book) {
        this.books.push(book);
        this.display();
    }

    removeBook(bookId) {
        this.books = this.books.filter(book => book.id !== bookId);
        this.display();
    }

    toggleReadStatus(bookId) {
        const book = this.books.find(book => book.id === bookId);
        if (book) {
            book.toggleRead();
            this.display();
        }
    }

    display() {
        const libraryDisplay = document.getElementById('libraryDisplay');
        libraryDisplay.innerHTML = '';

        this.books.forEach(book => {
            const bookCard = document.createElement('div');
            bookCard.className = 'book-card';
            bookCard.innerHTML = `
                <div class="book-info">
                    <h3>${book.title}</h3>
                    <p>By: ${book.author}</p>
                    <p>Pages: ${book.pages}</p>
                </div>
                <div class="actions">
                    <span 
                        class="read-status ${book.isRead ? 'read' : 'unread'}"
                        onclick="library.toggleReadStatus('${book.id}')">
                        ${book.isRead ? 'Read' : 'Not Read'}
                    </span>
                    <button class="delete-btn" onclick="library.removeBook('${book.id}')">
                        Delete Book
                    </button>
                </div>
            `;
            libraryDisplay.appendChild(bookCard);
        });
    }
}

const library = new Library();

// Character counter setup
function setupCharCounter(inputId, counterId, maxLength) {
    const input = document.getElementById(inputId);
    const counter = document.getElementById(counterId);
    
    input.addEventListener('input', () => {
        counter.textContent = input.value.length;
    });
}

setupCharCounter('title', 'titleCounter', 50);
setupCharCounter('author', 'authorCounter', 30);

// Modal handling
const modal = document.getElementById('bookModal');
const addBookBtn = document.getElementById('addBookBtn');
const closeBtn = document.getElementsByClassName('close')[0];

addBookBtn.onclick = function() {
    modal.style.display = 'block';
}

closeBtn.onclick = function() {
    modal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Form submission
document.getElementById('bookForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = parseInt(document.getElementById('pages').value);
    const isRead = document.getElementById('readStatus').checked;
    
    const newBook = new Book(title, author, pages, isRead);
    library.addBook(newBook);
    
    // Reset form and counters
    e.target.reset();
    document.getElementById('titleCounter').textContent = '0';
    document.getElementById('authorCounter').textContent = '0';
    modal.style.display = 'none';
});