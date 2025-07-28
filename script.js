let taskList = [];
let counter = 1;

function renderTasks() {
  const list = document.querySelector("#taskList");
  list.innerHTML = "";
  taskList.forEach((task, i) => {
    const taskName = document.createElement("span");
    taskName.className = "task-name";
    taskName.textContent = " " + task.name;
    const taskItem = document.createElement("div");
    taskItem.className = "small-box";
    const checkbox = document.createElement("input");
    checkbox.style.cursor = "pointer";
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete";
    const editButton = document.createElement("button");
    editButton.className = "edit";
    checkbox.type = "checkbox";
    checkbox.checked = task.checked;
    checkbox.addEventListener("change", function () {
      taskList[i].checked = checkbox.checked;
      taskItem.style.backgroundColor = taskList[i].checked
        ? "#adebbcff"
        : "rgb(255, 127, 127)";
      localStorage.setItem("taskArray", JSON.stringify(taskList));
    });
    taskItem.appendChild(checkbox);
    taskItem.style.backgroundColor = taskList[i].checked
      ? "#adebbcff"
      : "rgb(255, 127, 127)";
    taskItem.appendChild(taskName);
    taskItem.appendChild(deleteButton);
    taskItem.appendChild(editButton);
    list.appendChild(taskItem);
    deleteButton.addEventListener("click", function () {
      deleteTask(task.id);
    });
    editButton.addEventListener("click", function () {
      editTask(taskItem, i);
    });
  });
}

function addTask(event) {
  event.preventDefault();
  let taskItem = {
    id: counter,
    name: document.querySelector("#task").value,
    checked: false,
  };
  if (taskItem.name) {
    taskList.push(taskItem);
    counter++;
    localStorage.setItem("taskArray", JSON.stringify(taskList));
    renderTasks();
    document.querySelector("#task").value = "";
  } else {
    alert("Please type a task!");
  }
}

function deleteTask(id) {
  taskList = taskList.filter((task) => task.id !== id);
  localStorage.setItem("taskArray", JSON.stringify(taskList));
  renderTasks();
}

function deleteAll() {
  localStorage.clear();
  taskList = [];
  counter = 1;
  renderTasks();
}

function editTask(taskItem, index) {
  taskItem.innerHTML = "";
  const newTaskName = document.createElement("input");
  newTaskName.type = "text";
  newTaskName.value = taskList[index].name;
  newTaskName.className = "edit-input";
  const saveButton = document.createElement("button");
  saveButton.className = "save";
  const DoNotSaveButton = document.createElement("button");
  DoNotSaveButton.className = "do-not-save";
  //newTaskName.focus();
  taskItem.appendChild(newTaskName);
  taskItem.appendChild(saveButton);
  taskItem.appendChild(DoNotSaveButton);
  saveButton.addEventListener("click", function () {
    if (newTaskName.value) {
      taskList[index].name = newTaskName.value;
    } else {
      alert("Please type a task!");
      return;
    }
    localStorage.setItem("taskArray", JSON.stringify(taskList));
    renderTasks();
  });

  DoNotSaveButton.addEventListener("click", function () {
    renderTasks();
  });
}

document.addEventListener("DOMContentLoaded", function () {
  taskList = JSON.parse(localStorage.getItem("taskArray")) || [];
  renderTasks();
});
