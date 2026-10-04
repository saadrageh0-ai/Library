// ---------- Saved data ----------
let savedBooks = [];
try {
    savedBooks = JSON.parse(localStorage.getItem("library")) || [];
} catch (error) {
    savedBooks = [];
}
const library = savedBooks;

let finishedCount = 0;

function saveData() {
    localStorage.setItem("library", JSON.stringify(library));
}

// ---------- Page layout ----------
let intro = document.createElement("div");
intro.className = "intro";
document.body.append(intro);

let head = document.createElement("h1");
head.className = "head";
head.textContent = "Books Labrary"
intro.append(head);

let comment = document.createElement("p");
comment.className = "comment";
comment.textContent = ""
intro.append(comment);

let setSection = document.createElement("div");
setSection.className = "set-section";
document.body.append(setSection);

let goalLabel = document.createElement("label");
goalLabel.className = "goal-label";
goalLabel.textContent = "Set yearly books to read:";
setSection.append(goalLabel);

let setGoal = document.createElement("input");
setGoal.className = "set-goal";
setGoal.type = "number";
setGoal.value = ""
setGoal.min = 0;
setSection.append(setGoal);

let setBtn = document.createElement("button");
setBtn.className = "set-btn";
setBtn.textContent = "Set";
setSection.append(setBtn);

let setMsg = document.createElement("p");
setMsg.className = "set-msg";

let restGoal = document.createElement("button");
restGoal.className = "rest-goal";
restGoal.textContent = "Rest Goal";
setSection.append(restGoal)

let barSection = document.createElement("div");
barSection.className = "bar-section";

let progressBar = document.createElement("progress");
progressBar.className = "progress-bar";

let barPercentage = document.createElement("p");
barPercentage.className = "bar-percenatge";

let doneMsg = document.createElement("p");
doneMsg.className = "done-msg";

function updateProgress() {
    progressBar.value = finishedCount;
    barPercentage.textContent = `${Math.round(finishedCount / progressBar.max * 100)} %`;

    if (finishedCount === progressBar.max) {
        doneMsg.textContent = "Congratulations you've finished your goal";
        barSection.append(doneMsg);
    } else {
        doneMsg.remove();
    }
}

function showGoal(numberOfBooks) {
    if (numberOfBooks === 1) {
        setMsg.textContent = `Number of books you want to read ${numberOfBooks} book`
    } else {
        setMsg.textContent = `Number of books you want to read ${numberOfBooks} books`
    }
    setSection.append(setMsg);
    document.body.append(barSection);
    progressBar.max = numberOfBooks;
    setMsg.append(progressBar);
    setMsg.append(barPercentage);
    updateProgress();
}

setBtn.addEventListener("click", function () {
    let numberOfBooks = Number(setGoal.value);
    if (setGoal.value === "") {
        return
    }
    if (numberOfBooks <= 0) {
        return
    }
    if (!Number.isInteger(numberOfBooks)) {
        return
    }
    showGoal(numberOfBooks);
    localStorage.setItem("goal", numberOfBooks);
});

restGoal.addEventListener("click", function () {
    setGoal.value = "";
    setMsg.remove();
    localStorage.removeItem("goal");
})

let nameSection = document.createElement("div");
nameSection.className = "name-section";
document.body.append(nameSection);

let labelOfBook = document.createElement("label");
labelOfBook.className = "label-of-book";
labelOfBook.textContent = "Name Of the Book: "
nameSection.append(labelOfBook);

let nameOfBook = document.createElement("input");
nameOfBook.className = "name-of-book";
nameOfBook.value = "";
nameOfBook.required = true;
nameOfBook.dir = "auto";
nameSection.append(nameOfBook);

let authorSection = document.createElement("div");
authorSection.className = "name-section";
document.body.append(authorSection);

let labelOfAuthor = document.createElement("label");
labelOfAuthor.className = "label-of-book";
labelOfAuthor.textContent = "Name Of the Author: "
authorSection.append(labelOfAuthor);

let nameOfAuthor = document.createElement("input");
nameOfAuthor.className = "name-of-author";
nameOfAuthor.value = "";
nameOfAuthor.required = true;
nameOfAuthor.dir = "auto";
authorSection.append(nameOfAuthor);

let dateSection = document.createElement("div");
dateSection.className = "date-section";
document.body.append(dateSection);

let dateLabel = document.createElement("label");
dateLabel.className = "date-label";
dateLabel.textContent = "Date Of Finishing: "
dateSection.append(dateLabel)

let currentDate = new Date();
let dateInput = document.createElement("input");
dateInput.className = "date-input";
dateInput.type = "date";
dateInput.required = true;
dateSection.append(dateInput);
dateInput.value = currentDate.toISOString().split("T")[0];

let addBtn = document.createElement("button");
addBtn.className = "add-btn";
addBtn.textContent = "Add";
nameSection.append(addBtn);

let listSection = document.createElement("div");
listSection.className = "list-section";
document.body.append(listSection);

let edit = document.createElement("h2");
edit.className = "edit";
edit.textContent = "Click on books to edit.";

let finishSection = document.createElement("div");
finishSection.className = "finish-section";
document.body.append(finishSection);

let finishList = document.createElement("ol");
finishList.className = "finish-list";
finishSection.append(finishList);

let finishTitle = document.createElement("h3");
finishTitle.className = "finish-title";
finishTitle.textContent = "Finished Book";

let wantToSection = document.createElement("div");
wantToSection.className = "want-section";
document.body.append(wantToSection);

let wantToList = document.createElement("ol");
wantToList.className = "want-list";
wantToSection.append(wantToList);

let wantTitle = document.createElement("h3");
wantTitle.className = "want-title";
wantTitle.textContent = "Want to Read Books";

let headOfList = document.createElement("ol");
headOfList.className = "head-of-list";
listSection.append(headOfList);

// Show "Click on books to edit." only while the main list has books
function updateEdit() {
    if (headOfList.children.length > 0) {
        listSection.before(edit);
    } else {
        edit.remove();
    }
}

function updateTitles() {
    if (wantToList.children.length === 0) {
        wantTitle.remove();
    }
    if (finishList.children.length === 0) {
        finishTitle.remove();
    }
    updateEdit();
}

// ---------- One book on the page ----------
// Used for new books AND for books loaded from storage.
function createBookItem(book) {
    let listOfBooks = document.createElement("li");
    listOfBooks.className = "list-of-books";

    let bookNameText = document.createElement("span");
    bookNameText.className = "book-name";
    bookNameText.textContent = book.name;
    listOfBooks.append(bookNameText);

    let bookAuthorText = document.createElement("span");
    bookAuthorText.className = "book-author";
    bookAuthorText.textContent = book.authorName;
    listOfBooks.append(bookAuthorText);

    let bookDateText = document.createElement("span");
    bookDateText.className = "book-date";
    bookDateText.textContent = book.date;
    listOfBooks.append(bookDateText);

    let buttonsGroup = document.createElement("div");
    buttonsGroup.className = "button-group";
    buttonsGroup.style.display = "none";
    listOfBooks.append(buttonsGroup);

    let finishReading = document.createElement("button");
    finishReading.className = "finish-reading";
    finishReading.textContent = "Finish Reading";

    let deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";

    let wantToRead = document.createElement("button");
    wantToRead.className = "want-to-read";
    wantToRead.textContent = "Want to Read";

    // Put the book in the list that matches its saved status
    if (book.status === "finished") {
        finishList.append(listOfBooks);
        finishList.before(finishTitle);
    } else if (book.status === "want") {
        wantToList.append(listOfBooks);
        wantToList.before(wantTitle);
    } else {
        headOfList.append(listOfBooks);
    }

    listOfBooks.addEventListener("click", function (e) {
        if (e.target === buttonsGroup) {
            return
        }
        if (book.status === "finished") {
            finishReading.remove();
        } else {
            buttonsGroup.append(finishReading);
        }
        if (book.status === "want" || book.status === "finished") {
            wantToRead.remove();
        } else {
            buttonsGroup.append(wantToRead);
        }
        buttonsGroup.append(deleteBtn);

        if (buttonsGroup.style.display === "none") {
            buttonsGroup.style.display = "block"
        } else {
            buttonsGroup.style.display = "none"
        }
    })

    finishReading.addEventListener("click", function () {
        if (book.status === "finished") {
            return
        }
        book.status = "finished";
        finishedCount = finishedCount + 1;
        updateProgress();

        finishList.append(listOfBooks);
        finishList.before(finishTitle);
        finishReading.remove();
        updateTitles();
        saveData();
    })

    wantToRead.addEventListener("click", function () {
        if (book.status === "want") {
            return
        }
        if (book.status === "finished") {
            finishedCount = finishedCount - 1;
            updateProgress();
        }

        book.status = "want";
        wantToList.append(listOfBooks);
        wantToList.before(wantTitle);
        wantToRead.remove();
        updateTitles();
        saveData();
    })

    deleteBtn.addEventListener("click", function () {
        let position = library.indexOf(book);
        library.splice(position, 1);
        listOfBooks.remove();

        if (book.status === "finished") {
            finishedCount = finishedCount - 1;
            updateProgress();
        }
        updateTitles();
        saveData();
    })
}

// ---------- Add a new book ----------
addBtn.addEventListener("click", function () {
    if (nameOfBook.value === "") {
        return
    }
    if (nameOfAuthor.value === "") {
        return
    }
    if (dateInput.value === "") {
        return
    }

    let book = { name: nameOfBook.value, authorName: nameOfAuthor.value, date: dateInput.value, status: "none" };
    library.push(book);
    createBookItem(book);
    updateEdit();
    saveData();
});

// ---------- Load saved data when the page opens ----------
library.forEach(function (book) {
    if (book.status === "finished") {
        finishedCount = finishedCount + 1;
    }
    createBookItem(book);
});

updateEdit();

let savedGoal = Number(localStorage.getItem("goal"));
if (Number.isInteger(savedGoal) && savedGoal > 0) {
    setGoal.value = savedGoal;
    showGoal(savedGoal);
}