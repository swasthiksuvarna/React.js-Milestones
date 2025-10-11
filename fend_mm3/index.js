// DOM Elements
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const errorMessage = document.getElementById("error-message");
const tasksContainer = document.getElementById("tasks-container");
const emptyState = document.getElementById("empty-state");
const editForm = document.getElementById("edit-task-form");
const editInput = document.getElementById("edit-input");
const editError = document.getElementById("edit-error");
const saveEdit = document.getElementById("save-edit");

// Task data
let tasks = [];
let currentEditId = null;

function showTaskInput() {
  document.getElementById("add-task-button").classList.add("hidden");
  document.getElementById("task-input-section").classList.remove("hidden");
  document.getElementById("form-input").classList.remove("hidden");
  document.getElementById("to-do-list").classList.add("hidden");
  taskInput.focus();
}

function hideTaskInput() {
  document.getElementById("task-input-section").classList.add("hidden");
  document.getElementById("add-task-button").classList.remove("hidden");
  document.getElementById("form-input").classList.add("hidden");
  document.getElementById("to-do-list").classList.remove("hidden");
  document.getElementById("edit-form").classList.add("hidden");
}
function showEditInput() {
  document.getElementById("add-task-button").classList.add("hidden");
  document.getElementById("task-input-section").classList.remove("hidden");
  document.getElementById("edit-form").classList.remove("hidden");
  document.getElementById("to-do-list").classList.add("hidden");
  editInput.focus();
}

// Load tasks from local storage
function loadTasks() {
  const storedTasks = localStorage.getItem("todos");
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
    renderTasks();
  }
}

// Save tasks to local storage
function saveTasks() {
  localStorage.setItem("todos", JSON.stringify(tasks));
}

// Render all tasks
function renderTasks() {
  // Clear container (except empty state)
  const taskElements = tasksContainer.querySelectorAll(".task-item");
  taskElements.forEach((el) => el.remove());

  // Show or hide empty state
  emptyState.classList.toggle("hidden", tasks.length > 0);

  // Render each task
  tasks.forEach((task) => {
    const taskElement = createTaskElement(task);
    tasksContainer.appendChild(taskElement);

    // Trigger fade-in animation
    setTimeout(() => {
      taskElement.classList.remove("fade-in");
    }, 10);
  });
}

// Create a task element
function createTaskElement(task) {
  const taskElement = document.createElement("div");
  taskElement.classList.add(
    "task-item",
    "fade-in",
    "flex",
    "items-center",
    "justify-between",
    "py-3",
    "px-4",
    "rounded-lg",
    "transition",
    "duration-300",
    "my-[16px]"
  );

  taskElement.style.backgroundColor = "#7F7F7F1A";

  taskElement.dataset.id = task.id;

  const leftSection = document.createElement("div");
  leftSection.classList.add("flex", "items-center", "space-x-3", "flex-grow");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("custom-checkbox", "w-5", "h-5", "shrink-0");
  checkbox.checked = task.completed;
  checkbox.addEventListener("change", () => toggleTaskCompletion(task.id));

  const taskText = document.createElement("span");
  taskText.classList.add(
    "flex-grow",
    "break-words",
    "whitespace-pre-wrap",
    "overflow-hidden"
  );
  taskText.style.wordBreak = "break-word";
  if (task.completed) {
    taskText.classList.add("completed");
  }
  taskText.textContent = task.text;

  leftSection.appendChild(checkbox);
  leftSection.appendChild(taskText);

  const actionsSection = document.createElement("div");
  actionsSection.classList.add("flex", "space-x-2", "shrink-0");

  // Only show action buttons if task is NOT completed
  if (!task.completed) {
    const editButton = document.createElement("button");
    editButton.classList.add(
      "text-gray-500",
      "hover:text-blue-500",
      "transition",
      "duration-300",
      "mr-4"
    );
    editButton.innerHTML = `<img src="images/edit.svg" class="h-6 w-6" alt="Edit" />`;
    editButton.addEventListener("click", () => {
      showEditInput();
      openEditModal(task.id);
    });

    const deleteButton = document.createElement("button");
    deleteButton.classList.add(
      "text-gray-500",
      "hover:text-red-500",
      "transition",
      "duration-300"
    );
    deleteButton.innerHTML = `<img src="images/trash.svg" class="h-6 w-6" alt="Delete" />`;
    deleteButton.addEventListener("click", () => deleteTask(task.id));

    actionsSection.appendChild(editButton);
    actionsSection.appendChild(deleteButton);
  }

  taskElement.appendChild(leftSection);
  taskElement.appendChild(actionsSection);

  return taskElement;
}

function showToast(message, duration = 3000) {
  const toast = document.getElementById('toast-container');
  const toastMessage = document.getElementById('toast-message');
  
  // Set message
  toastMessage.textContent = message;
  
  // Show toast
  toast.classList.remove('opacity-0', '-translate-y-4');
  toast.classList.add('opacity-100', 'translate-y-0');
  
  // Hide toast after duration
  setTimeout(() => {
    toast.classList.remove('opacity-100', 'translate-y-0');
    toast.classList.add('opacity-0', '-translate-y-4');
  }, duration);
}

// Add a new task
function addTask(text) {
  const newTask = {
    id: Date.now().toString(),
    text: text,
    completed: false,
  };

  tasks.unshift(newTask); // Add to beginning of array
  saveTasks();
  renderTasks();
  // Show success toast
  showToast("Task added successfully");
}

// Delete a task
function deleteTask(id) {
  const taskElement = document.querySelector(`.task-item[data-id="${id}"]`);

  // Add fade-out animation
  taskElement.classList.add("fade-out");

  // Wait for animation to complete, then remove task
  setTimeout(() => {
    tasks = tasks.filter((task) => task.id !== id);
    saveTasks();
    renderTasks();
    // Show deletion toast
    showToast("Task deleted successfully");
  }, 300);
}

// Toggle task completion
function toggleTaskCompletion(id) {
  const taskElement = document.querySelector(`.task-item[data-id="${id}"]`);

  if (taskElement) {
    taskElement.classList.add("fade-out");
  }

  setTimeout(() => {
    const taskIndex = tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) return;

    const updatedTask = {
      ...tasks[taskIndex],
      completed: !tasks[taskIndex].completed,
    };
    tasks.splice(taskIndex, 1); // Remove original

    if (updatedTask.completed) {
      tasks.push(updatedTask); // Move to bottom
    } else {
      tasks.unshift(updatedTask); // Move to top
    }

    saveTasks();
    renderTasks();
  }, 300);
}

// // Open edit modal
function openEditModal(id) {
  const task = tasks.find((task) => task.id === id);
  if (task) {
    currentEditId = id;
    editInput.value = task.text;
    editInput.focus();
  }
}
// Save edited task
function saveEditedTask() {
  const newText = editInput.value.trim();

  if (newText === "") {
    editError.classList.remove("hidden");
    return;
  }

  tasks = tasks.map((task) => {
    if (task.id === currentEditId) {
      return { ...task, text: newText };
    }
    return task;
  });

  saveTasks();
  renderTasks();
  hideTaskInput();
  // Show success toast for edit
  showToast("Task updated successfully");
}
// Event Listeners
editForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const text = taskInput.value.trim();

  if (text === "") {
    errorMessage.classList.remove("hidden");
    return;
  }

  saveEditedTask();
  taskInput.value = "";
  errorMessage.classList.add("hidden");
  hideTaskInput();
});
// Event Listeners
taskForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const text = taskInput.value.trim();

  if (text === "") {
    errorMessage.classList.remove("hidden");
    return;
  }

  addTask(text);
  taskInput.value = "";
  errorMessage.classList.add("hidden");
  hideTaskInput();
});

taskInput.addEventListener("input", function () {
  if (taskInput.value.trim() !== "") {
    errorMessage.classList.add("hidden");
  }
});

saveEdit.addEventListener("click", saveEditedTask);

editInput.addEventListener("input", function () {
  if (editInput.value.trim() !== "") {
    editError.classList.add("hidden");
  }
});

editInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    saveEditedTask();
  }
});

// Show current date in header
const dateEl = document.getElementById("current-date");
if (dateEl) {
  const options = { year: "numeric", month: "short", day: "numeric" };
  dateEl.textContent = new Date().toLocaleDateString(undefined, options);
}

// Initial load
loadTasks();
