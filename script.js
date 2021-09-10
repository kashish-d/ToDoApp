// Dark Mode Toggle
const darkModeToggle = document.querySelector('.dark-mode-icon');
const moonIcon = document.querySelector('.moon-icon');
const sunIcon = document.querySelector('.sun-icon');
darkModeToggle.addEventListener('click',darkModeFunc);
function darkModeFunc(){
    document.documentElement.classList.toggle('dark-mode');
    sunIcon.classList.toggle('displayNone');
    moonIcon.classList.toggle('displayNone');

    // Setting up the value if it doesn't exist. f
    if(localStorage.getItem("darkMode") === null){
        localStorage.setItem("darkMode","0")
    }

    // Unary operator because "true" and "false", both are truthy values
    const isDarkMode = +localStorage.getItem("darkMode");
    localStorage.setItem('darkMode', isDarkMode ? 0 : 1);
};

if(+localStorage.getItem("darkMode") == 1){
    document.documentElement.classList.add('dark-mode');
    sunIcon.classList.toggle('displayNone');
    moonIcon.classList.toggle('displayNone');
}
