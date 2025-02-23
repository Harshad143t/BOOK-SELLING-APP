document.addEventListener("DOMContentLoaded", function () {
    let storedBooks = JSON.parse(localStorage.getItem("books")) || [];
    storedBooks.forEach(book => displayBook(book));

    let loggedUser = localStorage.getItem("loggedUser"); // Retrieve UID
    let profileBtn = document.getElementById("profile");

    if (loggedUser) {
        document.getElementById("loggeduser").innerText = `User Id: ${loggedUser}`;
        profileBtn.innerText = "Log out";
        profileBtn.onclick = function() {
            if (confirm("Are you sure you want to log out?")) {
                logOut();
            }
        };
    } else {
        profileBtn.innerText = "Log in";
        profileBtn.onclick = logInbtn;
    }
    
});

// Function to log in (already in your code)
function logInbtn() {
    window.location.href = "index.html";
}

// Function to log out
function logOut() {
    localStorage.removeItem("loggedUser"); // Clear session
    alert("Logged out successfully!");
    window.location.href = "index.html"; // Redirect to login page
}


const enterId = document.getElementById("number");
const enterPass = document.getElementById("passwd");
function login(event) {
    event.preventDefault();
    let users = JSON.parse(localStorage.getItem("users")) || {};
    let id = enterId.value.trim();
    let pass = enterPass.value.trim();
    if (!enterId.value || !enterPass.value) {
        alert("Empty fields not allowed");
        return;
    }
    if (users.hasOwnProperty(id) && users[id] === pass) {
        localStorage.setItem("loggedUser", id);
        window.location.href = "home.html";
        alert("logged in succesfully.");
        return;
    } if (users.hasOwnProperty(id) && users[id] !== pass) {
        alert("incorrect id or password.");
        return;
    } else {
        alert("No id found with such information!");
    }
}

//create account//
const userId = document.getElementById("number")
const userPass = document.getElementById("Pass")
const userConfPass = document.getElementById("passs")
let createId = document.getElementById("newidbtn");
let users = JSON.parse(localStorage.getItem("users")) || {};

 function creatId () {
    password = userPass.value.trim();
    confermPass = userConfPass.value.trim();
    let id = userId.value.trim();
    if (!userId.value || !userConfPass.value || !userPass.value) {
        alert("empty feilds not allowed");
        return;
    }
    if (id.length < 10) {
        alert("ID must be at least 10 characters long.");
        return;
    }
    if (password.length < 5) {
        alert("Password must be at least 5 characters long.");
        return;
    }
    if (users.hasOwnProperty(id)) {
        alert("this id is already in use ");
        return;
    } if (password !== confermPass) {
        alert("enter correct password");
        return;
    }
    else {
        users[id] = password;
        localStorage.setItem("users", JSON.stringify(users));
        window.location.href = "home.html"
        alert("ACCOUNT SUCCESFULLY CREATERD!")
    }
}

function postBook() {
    let loggedUser = localStorage.getItem("loggedUser");
    if (!loggedUser) {
        alert("You need to log in to post a book.");
        return;
    }

    let divElement = document.getElementById("createBooksss");
    if (divElement) {
        divElement.style.display = (divElement.style.display === "none") ? "flex" : "none";
    }
}

function cancel() {
    let divElement = document.getElementById("createBooksss");
    if (divElement.style.display === "none") {
        divElement.style.display = "flex";
    } else {
        divElement.style.display = "none";
    }
}


function addNewBook() {
    let bookPrice = document.getElementById("enterPrice").value;
    let bookName = document.getElementById("enterbookname").value;
    let bookimg = document.getElementById("addphoto").value;

    let bookArr = JSON.parse(localStorage.getItem("books")) || [];

    if (!bookPrice || !bookName) {
        alert("Please enter book name and price. Image is optional.");
        return;
    }
    if (!/^[A-Za-z\s]+$/.test(bookName)) {
        alert("Book name should contain only letters and spaces.");
        return;
    }
    if (bookPrice > 100) {
        alert("Book price is too high.");
        return;
    }
    if (bookName.length > 30) {
        alert("Book name is too long.");
        return;
    }

    let loggedUser = localStorage.getItem("loggedUser"); 
    let book = {
        id: Date.now().toString(), 
        name: bookName,
        price: bookPrice,
        img: bookimg,
        owner: loggedUser
    };
    bookArr.push(book);
    let divElement = document.getElementById("createBooksss");
    localStorage.setItem("books", JSON.stringify(bookArr));
    divElement.style.display = "none";
    displayBook(book);
    clearInputs();
}


function displayBook(book) {
    let newBook = document.createElement("div");
    newBook.className = "books";
    newBook.setAttribute("data-id", book.id); 
    newBook.innerHTML = `
        <div class="bookImg">
            <img src="${book.img}" alt="book image">
            <button class="bookDelBtn">Remove</button>
        </div>
        <div class="bookInfo">
            <p class="bookname">Book name: ${book.name}</p>
            <hr id="bookname">
            <p class="price">Price :<span class="Price">${book.price}</span> RS</p>
            <hr id="prc">
            <button class="buyBtn">Buy now</button>
        </div>`;

    document.getElementById("container").prepend(newBook);

    let loggedUser = localStorage.getItem("loggedUser");
    if (book.owner === loggedUser) {
        newBook.querySelector(".bookDelBtn").style.display = "flex"; // Show button if owner is logged in
    }

    newBook.querySelector(".buyBtn").addEventListener("click", function () {
        buyBook(book.owner,book.name,book.price,book.img);// feature to be changed for buying boook
    });

    newBook.querySelector(".bookDelBtn").addEventListener("click", function () {
        removeBook(book.id, this); 
    });
}


function clearInputs() {
    document.getElementById("enterbookname").value = "";
    document.getElementById("enterPrice").value = "";
    document.getElementById("addphoto").value = "";
}
function logInbtn() {
    window.location.href = "index.html"
}
function buyBook(owner,name,price,img) {
    let bImg = document.getElementById("buyPageImg")
    bImg.src = img

    let bName = document.getElementById("bookPageName")
    bName.innerText = `Book Name : ${name}`

    let bPrice = document.getElementById("bookPagePrice")
    bPrice.innerText = `Book Price : ${price} Rs`

    let contact = document.getElementById("ContactNumber")
    contact.innerText = `Contsact : ${owner}` 

    let BuyPage = document.getElementById("buyPage")
    BuyPage.style.display = (BuyPage.style.display === "none" || BuyPage.style.display === "") ? "flex" : "none";
    
}
function removeBook(bookId, buttonElement) {
    let confirmation = confirm(`Are you sure you want to delete this book?`);

    if (!confirmation) return; 

    let bookArr = JSON.parse(localStorage.getItem("books")) || [];

    bookArr = bookArr.filter(book => book.id !== bookId);

    localStorage.setItem("books", JSON.stringify(bookArr));

    let bookDiv = buttonElement.closest(".books");
    if (bookDiv) {
        bookDiv.remove();
    }

    alert("Book has been deleted.");
}
function Done(){
    let BuyPage = document.getElementById("buyPage")
    BuyPage.style.display = (BuyPage.style.display === "none" || BuyPage.style.display === "") ? "flex" : "none";

}