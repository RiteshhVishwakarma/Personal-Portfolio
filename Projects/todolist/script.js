// Existing functions for task handling
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const themeToggle = document.getElementById("themeToggle");

document.addEventListener("DOMContentLoaded", loadTasks);

// Add dark mode toggle functionality
themeToggle.addEventListener("change", toggleDarkMode);

function toggleDarkMode() {
  const body = document.body;
  const container = document.querySelector('.container');
  const tasks = document.querySelectorAll('li');
  const buttons = document.querySelectorAll('button');

  body.classList.toggle("dark-mode");
  container.classList.toggle("dark-mode");
  tasks.forEach(task => task.classList.toggle("dark-mode"));
  buttons.forEach(btn => btn.classList.toggle("dark-mode"));
}

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const li = createTaskElement(taskText);
  taskList.appendChild(li);
  saveTask(taskText);

  taskInput.value = "";
}

function createTaskElement(text) {
  const li = document.createElement("li");

  li.textContent = text;
  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    updateStorage();
  });

  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    li.remove();
    updateStorage();
  });

  li.appendChild(delBtn);
  return li;
}

function saveTask(taskText) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text: taskText, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateStorage() {
  const allTasks = [];
  taskList.querySelectorAll("li").forEach((li) => {
    allTasks.push({
      text: li.childNodes[0].nodeValue.trim(),
      completed: li.classList.contains("completed"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(allTasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    const li = createTaskElement(task.text);
    if (task.completed) li.classList.add("completed");
    taskList.appendChild(li);
  });

  // Check if dark mode was saved
  if (localStorage.getItem("darkMode") === "true") {
    themeToggle.checked = true;
    toggleDarkMode();
  }
}

// Saving dark mode state
themeToggle.addEventListener("change", () => {
  localStorage.setItem("darkMode", themeToggle.checked);
});
