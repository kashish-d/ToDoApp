let notesObj = {};
const allListSection = document.querySelector(".all-list-box");
const activeListSection = document.querySelector(".active-list-box");
const completedListSection = document.querySelector(".completed-list-box");

if(localStorage.getItem('Kashish') != null){
    notesObj = JSON.parse(localStorage.getItem("Kashish"));
}

window.addEventListener("load",()=>{
    if(isEmpty(notesObj) === false){
        updatingNotes();
    }
});

// Adding new Notes
const newNoteInput = document.querySelector(".current-note input");
newNoteInput.addEventListener("keydown", (e) => {
    if (e.keyCode === 13) {
        if(newNoteInput.value.startsWith('<')){return}
        notesObj[newNoteInput.value] = false;
        updatingNotes();
        newNoteInput.value = "";

        // Scrolling to the last added.
        document.querySelector(".all-list-box .note:last-child").scrollIntoView({ behavior: "smooth" });
        document.querySelector(".active-list-box .note:last-child").scrollIntoView({ behavior: "smooth" });
        
    }
});


// This function takes the parent element to append and the object to iterate through. 
// Being used to populate all,active and completed part of the list
function fillingNotesToDom(box, filteredObject) {
    let html = ""; //Adding nothing as keeping it undefined and adding more to it will include undefined
    let statusEach = "";
    if(isEmpty(notesObj) === true){
        html = `<div class="note">
                    <div class="complete-tick">
                        <div class="inner">
                            <img src="images/icon-check.svg" alt="">
                        </div>
                    </div>
                    <div class="note-content">
                        <p>Your note goes here</p>
                    </div>
                </div>`   
    }
    else{
        for (let key in filteredObject) {
            if (filteredObject[key]) {
                statusEach = "completed";
            } else {
                statusEach = "";
            }
            // This way is inefficienet and creating elemenet and appending is performant. 
            // Use that if you feel the app getting sloppy!
            html += `<div class="note ${statusEach}">
                        <div class="complete-tick">
                            <div class="inner">
                                <img src="images/icon-check.svg" alt="">
                            </div>
                        </div>
                        <div class="note-content">
                            <p class="note-text" >${key}</p>
                        </div>
                        <div class="delete-option">
                            <img class="delete-note-icon" src="images/icon-cross.svg" alt="">
                        </div>
                    </div>`;
        }
    }
    box.innerHTML = html;
}

const allNotesTab = document.querySelector(".all-list");
const activeNotesTab = document.querySelector(".active-list");
const completedNotesTab = document.querySelector(".completed-list");

const allNotesTabMobile = document.querySelector(".all-list-mobile");
const activeNotesTabMobile = document.querySelector(".active-list-mobile");
const completedNotesTabMobile = document.querySelector(".completed-list-mobile");

//  For desktop nav merged in footer
allNotesTab.addEventListener("click", () => {
    allNotesTab.classList.add("active");
    activeNotesTab.classList.remove("active");
    completedNotesTab.classList.remove("active");

    allListSection.style.display = "block";
    activeListSection.style.display = "none";
    completedListSection.style.display = "none";
    updatingNotes()
});
activeNotesTab.addEventListener("click", () => {
    allNotesTab.classList.remove("active");
    activeNotesTab.classList.add("active");
    completedNotesTab.classList.remove("active");

    allListSection.style.display = "none";
    activeListSection.style.display = "block";
    completedListSection.style.display = "none";
    updatingNotes()
});
completedNotesTab.addEventListener("click", () => {
    allNotesTab.classList.remove("active");
    activeNotesTab.classList.remove("active");
    completedNotesTab.classList.add("active");

    allListSection.style.display = "none";
    activeListSection.style.display = "none";
    completedListSection.style.display = "block";
    updatingNotes()
});

// for mobile in navbar
// Probably need to find a better way to do this. This is violating DRY hardcore
allNotesTabMobile.addEventListener("click", () => {
    allNotesTabMobile.classList.add("active");
    activeNotesTabMobile.classList.remove("active");
    completedNotesTabMobile.classList.remove("active");

    allListSection.style.display = "block";
    activeListSection.style.display = "none";
    completedListSection.style.display = "none";
    updatingNotes()
});
activeNotesTabMobile.addEventListener("click", () => {
    allNotesTabMobile.classList.remove("active");
    activeNotesTabMobile.classList.add("active");
    completedNotesTabMobile.classList.remove("active");

    allListSection.style.display = "none";
    activeListSection.style.display = "block";
    completedListSection.style.display = "none";
    updatingNotes()
});
completedNotesTabMobile.addEventListener("click", () => {
    allNotesTabMobile.classList.remove("active");
    activeNotesTabMobile.classList.remove("active");
    completedNotesTabMobile.classList.add("active");

    allListSection.style.display = "none";
    activeListSection.style.display = "none";
    completedListSection.style.display = "block";
    updatingNotes()
});

// Clearing the completed ones
const clearAllCompleted = document.querySelector(".clear-all");
clearAllCompleted.addEventListener("click", () => {
    for (let key in notesObj){
        if(notesObj[key]){
            delete notesObj[key];
        }
    }
    updatingNotes();
});

// Calling other functions to updates all the tabs
function updatingNotes() {

    let activeObj = {};
    let completedObj = {};
    for (let key in notesObj) {
        if (notesObj[key]) {
            completedObj[key] = true;
        } else {
            activeObj[key] = false;
        }
    }

    fillingNotesToDom(allListSection, notesObj);
    fillingNotesToDom(activeListSection, activeObj);
    fillingNotesToDom(completedListSection, completedObj);
    counting(activeObj);
    localStore("Kashish",notesObj);
}

// Removing notes from Dom and from notesObj
// Supplying dummy note if no note is there
const toDoBox = document.querySelector(".to-do-box");
toDoBox.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-option")) {
        if(!confirm('Are you sure?\nThis action cannot be undone.')){return}
        let element = e.target.parentElement;
        let textOfNote = element.children[1].children[0].textContent;
        element.remove();
        delete notesObj[textOfNote];
        updatingNotes();
    }
    else if(e.target.classList.contains('complete-tick') || e.target.classList.contains('note-text')){
        let parentEle = e.target.parentElement;
        if(e.target.classList.contains('note-text')){
            parentEle = parentEle.parentElement;
        }
        let textOfNote = parentEle.children[1].children[0].textContent;
        if(notesObj[textOfNote] === true){
            notesObj[textOfNote] = false;
        }else{
            notesObj[textOfNote] = true;
        }
        parentEle.classList.toggle('completed')
        updatingNotes()
    }

});

// Counting the tasks left and giving it to Dom
function counting(activeObj){
    let count = Object.keys(activeObj).length;
    document.querySelector('.count-number').textContent = `${count} items left`
}


function localStore(key,object){
    if(localStorage.getItem(key) !== null){
        localStorage.removeItem(key)
    }
    let data = JSON.stringify(object);
    localStorage.setItem(key,data);
}

function isEmpty(object){
    return(JSON.stringify(object) === "{}")
}