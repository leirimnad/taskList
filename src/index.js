let containerElement = document.querySelector('#container');
let inputElement, addButton, resetButton, ulElement, warningSpan;


function setup() {
    let el;

    el = document.createElement('input');
    inputElement = containerElement.appendChild(el);
    
    el = document.createElement('button');
    el.addEventListener('click', addTask);
    el.textContent = "Add";
    addButton = containerElement.appendChild(el);
    inputElement.addEventListener('keypress', e => {
        if (e.key === "Enter") addButton.click();
    });

    el = document.createElement('button');
    el.textContent = "Reset";
    resetButton = containerElement.appendChild(el);
    resetButton.addEventListener('click', resetTasks);

    el = document.createElement('span');
    el.textContent = "";
    el.style.marginLeft = "10px"
    warningSpan = containerElement.appendChild(el);

    ulElement = containerElement.appendChild(document.createElement('ul'));
    ulElement.style.whiteSpace = "pre";

    refreshFromStorage()
}


function refreshFromStorage(){
    console.log(localStorage.getItem('tasks'));
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks === null) tasks = [];
    console.log(tasks);
    tasks.sort();

    ulElement.innerHTML = ' ';
    tasks.forEach(task => {
        let el = document.createElement('li');
        el.textContent = task;
        ulElement.appendChild(el)
    });

    localStorage.setItem('tasks', JSON.stringify(tasks))
}


function addTask() {
    let task = inputElement.value;

    if(task === ''){
        inputElement.value = "";
        return;
    }

    if (task.trim() !== task) {
        warningSpan.textContent = "Use spaces at the endings of the line at your own risk."
        warningSpan.style.transitionProperty = "color";
        warningSpan.style.transitionDuration = "0s"
        warningSpan.style.color = "black";
        setTimeout(function () {
            warningSpan.style.transitionDuration = "4s"
            warningSpan.style.color = "white"
        }, 100)
    }

    let tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks === null) tasks = [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    inputElement.value = "";
    refreshFromStorage();
}


function resetTasks() {
    localStorage.removeItem('tasks');
    refreshFromStorage()
}


setup();