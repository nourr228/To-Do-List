let taskList = [];
let counter = 1;

function renderTasks() {
  const list = document.querySelector("#taskList");
  list.innerHTML = "";
  taskList.forEach((task, i) => {
    const taskItem = document.createElement("div");
    taskItem.className = "small-box";
    const checkbox = document.createElement("input");
    const deleteButton = document.createElement("button");
     deleteButton.className = "delete";
    const editButton = document.createElement("button");
    editButton.className = "edit";
    checkbox.type = "checkbox";
    checkbox.checked = task.checked;
    checkbox.addEventListener("change", function () {
      taskList[i].checked = checkbox.checked;
      taskItem.style.backgroundColor = taskList[i].checked ? "#adebbcff" : "rgb(255, 127, 127)";
      localStorage.setItem("taskArray", JSON.stringify(taskList));
    });
    taskItem.appendChild(checkbox);
    taskItem.style.backgroundColor = taskList[i].checked ? "#adebbcff" : "rgb(255, 127, 127)";
    taskItem.appendChild(document.createTextNode(" " + task.name));
    taskItem.appendChild(deleteButton);
    taskItem.appendChild(editButton);
    list.appendChild(taskItem);
    deleteButton.addEventListener("click", function () {
      deleteTask(task.id);
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

document.addEventListener("DOMContentLoaded", function () {
  taskList = JSON.parse(localStorage.getItem("taskArray")) || [];
  renderTasks();
});
