document.addEventListener("DOMContentLoaded", loadTasks);
document.getElementById("task-form").addEventListener("submit", addTask);
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        displayTask(task);
    });
}

function addTask(event) {
    event.preventDefault();
    
    const title = document.getElementById("task-title").value;
    const description = document.getElementById("task-desc").value;
    const dueDate = document.getElementById("task-due-date").value;
    const priority = document.getElementById("task-priority").value;

    const task = {
        title,
        description,
        dueDate,
        priority,
        completed: false
    };

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    displayTask(task);
    
    // Clear the input fields
    document.getElementById("task-form").reset();
}

function displayTask(task) {
    const taskList = document.getElementById("task-list");
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    li.innerHTML = `
        <span class="task-title">${task.title} (Due: ${task.dueDate})</span>
        <span class="task-priority">${task.priority}</span>
        <button class="edit-button" onclick="editTask(this)">Edit</button>
        <button class="delete-button" onclick="deleteTask(this)">Delete</button>
    `;
    taskList.appendChild(li);
}

function editTask(button) {
    const li = button.parentElement;
    const title = li.querySelector(".task-title").textContent.split(" (Due:")[0];
    const dueDate = li.querySelector(".task-title").textContent.split("(Due: ")[1].replace(')', '');
    const priority = li.querySelector(".task-priority").textContent;

    document.getElementById("task-title").value = title;
    document.getElementById("task-due-date").value = dueDate;
    document.getElementById("task-priority").value = priority;

    deleteTask(button); // Remove the task being edited
}

function deleteTask(button) {
    const li = button.parentElement;
    const taskTitle = li.querySelector(".task-title").textContent;

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task.title !== taskTitle);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    li.remove(); // Remove the task from the UI
}

function toggleCompletion(button) {
    const li = button.parentElement;
    const title = li.querySelector(".task-title").textContent;
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks = tasks.map(task=> {
        if (task.title === title){
            task.completed = !task.completed; // Toggle the completion status
        }
        return task});
}



    