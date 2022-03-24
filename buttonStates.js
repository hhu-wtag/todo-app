export function disableFilterButtons() {
  const btnFilterAll = document.querySelector(".btnFilterAll")
  const btnFilterInc = document.querySelector(".btnFilterInc")
  const btnFilterCom = document.querySelector(".btnFilterCom")

  btnFilterAll.setAttribute("disabled", true)

  btnFilterInc.setAttribute("disabled", true)

  btnFilterCom.setAttribute("disabled", true)
}

export function enableFilterButtons() {
  const btnFilterAll = document.querySelector(".btnFilterAll")
  const btnFilterInc = document.querySelector(".btnFilterInc")
  const btnFilterCom = document.querySelector(".btnFilterCom")

  btnFilterAll.removeAttribute("disabled")

  btnFilterInc.removeAttribute("disabled")

  btnFilterCom.removeAttribute("disabled")
}

export function disableSearchButton() {
  const btnSearch = document.querySelector("#searchIcon")

  btnSearch.setAttribute("disabled", true)
}

export function enableSearchButton() {
  const btnSearch = document.querySelector("#searchIcon")

  btnSearch.removeAttribute("disabled")
}

export function disableCreateButton() {
  const btnCreate = document.querySelector("#createBtn")

  btnCreate.setAttribute("disabled", true)
}

export function enableCreateButton() {
  const btnCreate = document.querySelector("#createBtn")

  btnCreate.removeAttribute("disabled")
}

export function showLoadMoreBtn() {
  const btnLoadMore = document.querySelector(".btnLoadMore")

  if (btnLoadMore.getAttribute("hidden")) {
    btnLoadMore.removeAttribute("hidden")
  }
}

export function hideLoadMoreBtn() {
  const btnLoadMore = document.querySelector(".btnLoadMore")

  btnLoadMore.setAttribute("hidden", true)
}

export function showShowLessBtn() {
  const btnShowLess = document.querySelector(".btnShowLess")

  if (btnShowLess.getAttribute("hidden")) {
    btnShowLess.removeAttribute("hidden")
  }
}

export function hideShowLessBtn() {
  const btnShowLess = document.querySelector(".btnShowLess")

  btnShowLess.setAttribute("hidden", true)
}

export function disableMainBody() {
  const divMainBody = document.querySelector(".main__body")

  divMainBody.setAttribute("disabled", true)
}

export function enableMainBody() {
  const divMainBody = document.querySelector(".main__body")

  divMainBody.removeAttribute("disabled")
}

export function disableAddTaskButton() {
  const buttonAddTask = document.querySelector("#addTaskBtn")

  buttonAddTask.setAttribute("disabled", true)
}

export function enableAddTaskButton() {
  const buttonAddTask = document.getElementById("addTaskBtn")

  console.log(buttonAddTask)

  if (buttonAddTask.getAttribute("disabled"))
    buttonAddTask.removeAttribute("disabled")
}

export function activeFilterButtonUI(state) {
  const btnFilterAll = document.querySelector(".btnFilterAll")
  const btnFilterInc = document.querySelector(".btnFilterInc")
  const btnFilterCom = document.querySelector(".btnFilterCom")

  btnFilterAll.classList.remove("filterActive")
  btnFilterInc.classList.remove("filterActive")
  btnFilterCom.classList.remove("filterActive")

  if (state === "all") {
    btnFilterAll.classList.add("filterActive")
  } else if (state === "com") {
    btnFilterCom.classList.add("filterActive")
  } else {
    btnFilterInc.classList.add("filterActive")
  }
}
