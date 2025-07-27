let taskList = [];
let counter = 1;

function renderTasks() {
  const list = document.querySelector("#taskList");
  list.innerHTML = "";
  taskList.forEach((task, i) => {
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    const button = document.createElement("button");
    button.className = "delete";
    checkbox.type = "checkbox";
    checkbox.checked = task.checked;
    checkbox.addEventListener("change", function () {
      taskList[i].checked = checkbox.checked;
      localStorage.setItem("taskArray", JSON.stringify(taskList));
    });
    li.appendChild(checkbox);
    li.appendChild(document.createTextNode(" " + task.name));
    li.appendChild(button);
    list.appendChild(li);
    button.addEventListener("click", function () {
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
