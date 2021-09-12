// let orderArray = ["1","5","3","2","4"]
// let notesObj = {
//     "1":{
//         noteText : "Item 1",
//         noteCompletedStatus: false
//     },
//     "2":{
//         noteText : "Item 2",
//         noteCompletedStatus: true
//     },
//     "3":{
//         noteText : "Item 3",
//         noteCompletedStatus: false
//     },
//     "4":{
//         noteText : "Item 4",
//         noteCompletedStatus: true
//     },
//     "5":{
//         noteText : "Item 5",
//         noteCompletedStatus: false
//     },
// }

let orderArray = []
let notesObj = {};
function counter(){
    let count = 0;
    if(localStorage.getItem("count") !== null){
        count = +localStorage.getItem("count")
    }
    function currentValue(){
        return count;
    }
    function increaseCounter(){
        count++;
        localStorage.setItem("count",String(count));
        return count;
    }
    function decreaseCounter(){
        count--;
        localStorage.setItem("count",String(count));
    }
    function resetCounter(){
        count = 0;
        localStorage.setItem("count",String(count));
    }
    return {increaseCounter,decreaseCounter,currentValue,resetCounter}
}

let counter1 = counter();

// let notesObj = {};
const allListSection = document.querySelector(".all-list-box");
const activeListSection = document.querySelector(".active-list-box");
const completedListSection = document.querySelector(".completed-list-box");

if(localStorage.getItem('ToDo') != null){
    notesObj = JSON.parse(localStorage.getItem("ToDo"));
    orderArray = JSON.parse(localStorage.getItem("Order"))
}

window.addEventListener("load",()=>{
    if(isEmpty(notesObj) === false){
        updatingNotes();
    }else{
        counter1.resetCounter();
    }
});

// use this with new , i could have made a class but oh well
function NewNote(string){
        this.noteText = string;
        this.noteCompletedStatus = false;
}

// Adding new Notes
const newNoteInput = document.querySelector(".current-note input");
newNoteInput.addEventListener("keydown", (e) => {
    if (e.keyCode === 13) {
        if(newNoteInput.value.startsWith('<')){return}
        counter1.increaseCounter()
        notesObj[counter1.currentValue()] = new NewNote(newNoteInput.value);
        orderArray.push(String(counter1.currentValue()))
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
        html = `<div class="note ">
                    <div class="complete-tick pointerCancel">
                        <div class="inner">
                            <img src="images/icon-check.svg" alt="">
                        </div>
                    </div>
                    <div class="note-content">
                        <p>Your note goes here</p>
                    </div>
                </div>` 
        counter1.resetCounter();  
    }else{
        orderArray.forEach((order)=>{
            if(filteredObject[order]){
                let tempObj = filteredObject[order];
                if (tempObj.noteCompletedStatus) {
                    statusEach = "completed";
                } else {
                    statusEach = "";
                }
                // This way is inefficienet and creating elemenet and appending is performant. 
                // Use that if you feel the app getting sloppy!
                html += `<div class="note ${statusEach}" data-order="${order}">
                            <div class="complete-tick">
                                <div class="inner">
                                    <img src="images/icon-check.svg" alt="">
                                </div>
                            </div>
                            <div class="note-content">
                                <p class="note-text" >${tempObj.noteText}</p>
                            </div>
                            <div class="delete-option">
                                <img class="delete-note-icon" src="images/icon-cross.svg" alt="">
                            </div>
                        </div>`;
            }
        }
    )}
    box.innerHTML = html;
}

// Calling other functions to updates all the tabs
function updatingNotes() {;
    let activeObj = {};
    let completedObj = {};
    for (let key in notesObj) {
        if (notesObj[key].noteCompletedStatus) {
            completedObj[key] = {};
            completedObj[key].noteText = notesObj[key].noteText
            completedObj[key].noteCompletedStatus = true;
        } else {
            activeObj[key] = {};
            activeObj[key].noteText = notesObj[key].noteText;
            activeObj[key].noteCompletedStatus = false;
        }
    }
    fillingNotesToDom(allListSection, notesObj);
    fillingNotesToDom(activeListSection, activeObj);
    fillingNotesToDom(completedListSection, completedObj);
    counting(activeObj);
    localStore("ToDo",notesObj);
    localStore("Order",orderArray)
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


// Removing notes from Dom and from notesObj
// Supplying dummy note if no note is there
const toDoBox = document.querySelector(".to-do-box");
toDoBox.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-option")) {
        if(!confirm('Are you sure?\nThis action cannot be undone.')){return}
        let element = e.target.parentElement;
        let dataAttribute = element.getAttribute('data-order');
        // let textOfNote = element.children[1].children[0].textContent;
        element.remove();
        delete notesObj[dataAttribute];
        orderArray.splice(orderArray.indexOf(dataAttribute),1);
        updatingNotes();
    }
    else if(e.target.classList.contains('complete-tick') || e.target.classList.contains('note-text')){
        let parentEle = e.target.parentElement;
        if(e.target.classList.contains('note-text')){
            parentEle = parentEle.parentElement;
        }
        // let textOfNote = parentEle.children[1].children[0].textContent;
        let dataAttribute = parentEle.getAttribute('data-order');
        if(dataAttribute === null){return}
        if(notesObj[dataAttribute].noteCompletedStatus === true){
            notesObj[dataAttribute].noteCompletedStatus = false;
        }else{
            notesObj[dataAttribute].noteCompletedStatus = true;
        }
        parentEle.classList.toggle('completed')
        updatingNotes()
    }
    // console.table(notesObj[dataAttribute]);

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

// To remove previous local data
if(localStorage.getItem("Kashish") != null){
    localStorage.removeItem("Kashish");
}


const allListBox = document.querySelector('.all-list-box');
Sortable.create(allListBox, {
    handle: '.note-content',
    animation: 200,
    delay: 400,
    delayOnTouchOnly: true,
    removeCloneOnHide: true,
    onEnd: function(evt){
        let attribute;
        let notes = document.querySelectorAll('.note');
        let tempArr = [];

        // dividing by 2, because at that time, clone made by sortable js library are still there. 
        for(let i = 0; i < notes.length / 2; i++){
            attribute = notes[i].getAttribute('data-order');
            tempArr.push(attribute);
        }
        orderArray = tempArr;
        localStore("Order",orderArray);
    }
});