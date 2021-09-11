// Dark Mode Toggle

// Setting up the value if it doesn't exist. 
// Defaulting dark mode so if opened for first time, dark mode will open.
if(localStorage.getItem("darkMode") === null){
    localStorage.setItem("darkMode","1")
}

// This sees over the change toggled by the button
const darkModeToggle = document.querySelector('.dark-mode-icon');
const moonIcon = document.querySelector('.moon-icon');
const sunIcon = document.querySelector('.sun-icon');
darkModeToggle.addEventListener('click',darkModeFunc);
function darkModeFunc(){
    document.documentElement.classList.toggle('dark-mode');
    sunIcon.classList.toggle('displayNone');
    moonIcon.classList.toggle('displayNone');

    // Unary operator(+) because "true" and "false", both are truthy values
    const isDarkMode = +localStorage.getItem("darkMode");
    localStorage.setItem('darkMode', isDarkMode ? 0 : 1);
};


// If the value inside the local storage is dark mode true, this applies dark mode. 
// Helpful when you refresh the page, so it knows what to load after checking
if(+localStorage.getItem("darkMode") == 1){
    document.documentElement.classList.add('dark-mode');
    sunIcon.classList.toggle('displayNone');
    moonIcon.classList.toggle('displayNone');
}
