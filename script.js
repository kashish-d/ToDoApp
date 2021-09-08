// Dark Mode Toggle
const darkModeToggle = document.querySelector('.dark-mode-icon');
const moonIcon = document.querySelector('.moon-icon');
const sunIcon = document.querySelector('.sun-icon');
darkModeToggle.addEventListener('click',darkModeFunc);
function darkModeFunc(){
    document.documentElement.classList.toggle('dark-mode');
    sunIcon.classList.toggle('displayNone');
    moonIcon.classList.toggle('displayNone');
    if(localStorage.getItem("darkMode") === null){
        localStorage.setItem("darkMode","false")
    }
    if(localStorage.getItem("darkMode") === "false"){
        localStorage.setItem("darkMode","true")
    }else{
        localStorage.setItem("darkMode","false")
    }
};

if(localStorage.getItem("darkMode") == "true"){
    document.documentElement.classList.add('dark-mode');
    sunIcon.classList.toggle('displayNone');
    moonIcon.classList.toggle('displayNone');
}
