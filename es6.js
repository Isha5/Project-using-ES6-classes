class Book {
    constructor(title,author,isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {

    addBookToList(book) {
        const list =  document.getElementById('book-list');
        const row =  document.createElement('tr');
        row.innerHTML = `
        <td> ${book.title} </td>
        <td> ${book.author} </td>
        <td> ${book.isbn} </td>
        <td><a href="#" class="delete"> X </a></td>`;
        list.appendChild(row);
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
    showAlert(message,className) {
            //CREATE ALERT WINDOW
            const warn = document.createElement('div');
            warn.className = `alert ${className}`;
            warn.appendChild(document.createTextNode(message));
            //ADD TO DOCUMENT
            const container = document.querySelector('.container');
            const form = document.getElementById('book-form');
            container.insertBefore(warn,form);
            //TIMEOUT  AFTER 3sec
            setTimeout(function() {
                document.querySelector('.alert').remove();
            }, 2000);
    }
    deleteBook(target) {
        if(target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }
}

//LOCAL STORAGE
class Store {
    static getBooks() {
        let books;
        if(localStorage.getItem('books') === null) { //check if localStorage is empty
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static displayBooks() {
        const books = Store.getBooks();
        books.forEach(function(book) {
        const list =  document.getElementById('book-list');
        const row =  document.createElement('tr');
        row.innerHTML = `
        <td> ${book.title} </td>
        <td> ${book.author} </td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete"> X </a></td>`;
        list.appendChild(row);
        });
    }
    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));
    }
    static removeBook(isbn) {
        
        const books = Store.getBooks();
        
        books.forEach(function(b, index){
            if(b.isbn === isbn) {
             books.splice(index, 1);
            }
        });
        localStorage.setItem('books',JSON.stringify(books)); 
    }
}

//ONLOAD //DISPLAY PERSISTED BOOKS TO UI
document.addEventListener('DOMContentLoaded', Store.displayBooks);

//SUBMIT EVENTLISTENER
document.getElementById('book-form').addEventListener('submit', function(e) {

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    //INSTANTIATE BOOK OBJECT
    const book = new Book(title,author,isbn);

    //INSTANTIATE UI OBJECT
    const ui = new UI();

    //VALIDATE DATA
    if(title === '' || author === '' || isbn === '') {
        ui.showAlert('Please enter all fields', 'error');
    } else {
         //ADD BOOK TO THE TABLE
         ui.addBookToList(book);
         //ADD TO LOCAL STORAGE
         Store.addBook(book);
         //SHOW ADDED SUCCESS MESSAGE
         ui.showAlert('Book added!!', 'success');
    }   
    e.preventDefault();
});
//LISTEN FOR DELETE EVENT
document.getElementById('book-list').addEventListener('click', (e) => {
    
    const ui = new UI();
    ui.deleteBook(e.target);
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    ui.showAlert('Book deleted', 'success');  
    e.preventDefault();
});









 





        