function addTask(event) {
  const taskItem = document.querySelector("#task").value;
  if (taskItem) {
    const item = document.createElement("li");
    item.innerHTML =
      "<input type='checkbox' />" +
      taskItem +
      "<button class='delete'></button>";
    document.querySelector("#taskList").append(item);
    localStorage.setItem(
      "tasklist",
      document.querySelector("#taskList").innerHTML
    );
  } else {
    alert("Please type a task!");
  }
}

function deleteAll() {
  localStorage.clear();
  document.querySelector("#taskList").innerHTML = "";
}

document.addEventListener("DOMContentLoaded", function () {
  document.querySelector("#taskList").innerHTML =
    localStorage.getItem("tasklist");
});
