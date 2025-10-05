// Select elements
const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

// Create "Clear All" button dynamically
const clearAllBtn = document.createElement("button");
clearAllBtn.textContent = "Clear All";
clearAllBtn.id = "clear-all-btn";
clearAllBtn.style.marginTop = "10px";
clearAllBtn.style.padding = "10px 15px";
clearAllBtn.style.border = "none";
clearAllBtn.style.borderRadius = "6px";
clearAllBtn.style.background = "#dc3545";
clearAllBtn.style.color = "#fff";
clearAllBtn.style.cursor = "pointer";
clearAllBtn.style.width = "100%";
clearAllBtn.style.fontSize = "14px";
clearAllBtn.style.transition = "background 0.3s";
clearAllBtn.addEventListener("mouseover", () => (clearAllBtn.style.background = "#a71d2a"));
clearAllBtn.addEventListener("mouseout", () => (clearAllBtn.style.background = "#dc3545"));

document.querySelector(".app-container").appendChild(clearAllBtn);

// Load tasks from local storage or start empty
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Render tasks to the UI
function renderTasks() {
  taskList.innerHTML = ""; // clear list first

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    // Task text
    const taskText = document.createElement("span");
    taskText.textContent = task.text;
    if (task.completed) {
      taskText.classList.add("completed");
    }

    // Action buttons
    const buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("task-buttons");

    const completeBtn = document.createElement("button");
    completeBtn.textContent = task.completed ? "Undo" : "Complete";
    completeBtn.onclick = () => toggleComplete(index);

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = () => editTask(index);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => deleteTask(index);

    buttonsDiv.appendChild(completeBtn);
    buttonsDiv.appendChild(editBtn);
    buttonsDiv.appendChild(deleteBtn);

    li.appendChild(taskText);
    li.appendChild(buttonsDiv);
    taskList.appendChild(li);
  });

  // Save to localStorage
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add new task
function addTask() {
  const text = taskInput.value.trim();
  if (text === "") {
    alert("Please enter a task!");
    return;
  }

  tasks.push({ text, completed: false });
  taskInput.value = "";
  renderTasks();
}

// Toggle complete
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

// Edit task
function editTask(index) {
  const newText = prompt("Edit task:", tasks[index].text);
  if (newText && newText.trim() !== "") {
    tasks[index].text = newText.trim();
    renderTasks();
  }
}

// Delete task (with confirmation)
function deleteTask(index) {
  const confirmDelete = confirm("Are you sure you want to delete this task?");
  if (confirmDelete) {
    tasks.splice(index, 1);
    renderTasks();
  }
}

// Clear all tasks (with confirmation)
clearAllBtn.addEventListener("click", () => {
  if (tasks.length === 0) {
    alert("No tasks to clear!");
    return;
  }

  const confirmClear = confirm("Are you sure you want to clear all tasks?");
  if (confirmClear) {
    tasks = [];
    renderTasks();
  }
});

// Event listeners
addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

// Initial render
renderTasks();
