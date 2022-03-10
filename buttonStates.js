export function disableFilterButtons() {
  const btnFilterAll = document.querySelector(".btnFilterAll")
  const btnFilterInc = document.querySelector(".btnFilterInc")
  const btnFilterCom = document.querySelector(".btnFilterCom")
  const btnCreate = document.querySelector("#createBtn")
  const btnLoadMore = document.querySelector(".btnLoadMore")

  btnCreate.setAttribute("disabled", true)

  btnFilterAll.setAttribute("disabled", true)

  btnFilterInc.setAttribute("disabled", true)

  btnFilterCom.setAttribute("disabled", true)

  btnLoadMore.setAttribute("disabled", true)
}

export function enableFilterButtons() {
  const btnFilterAll = document.querySelector(".btnFilterAll")
  const btnFilterInc = document.querySelector(".btnFilterInc")
  const btnFilterCom = document.querySelector(".btnFilterCom")
  const btnCreate = document.querySelector("#createBtn")
  const btnLoadMore = document.querySelector(".btnLoadMore")

  btnCreate.removeAttribute("disabled")

  btnFilterAll.removeAttribute("disabled")

  btnFilterInc.removeAttribute("disabled")

  btnFilterCom.removeAttribute("disabled")
  btnLoadMore.removeAttribute("disabled")
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

export function hideEditBtn() {
  const btnEdit = document.querySelector(".editBtn")

  btnEdit.setAttribute("hidden", true)
}

export function showEditBtn() {
  const btnEdit = document.querySelector(".editBtn")

  if (btnEdit.getAttribute("hidden")) {
    btnEdit.removeAttribute("hidden")
  }
}

export function hideDoneBtn() {
  const btnDone = document.querySelector(".doneBtn")

  btnDone.setAttribute("hidden", true)
}

export function showDoneBtn() {
  const btnDone = document.querySelector(".doneBtn")

  if (btnDone.getAttribute("hidden")) {
    btnDone.removeAttribute("hidden")
  }
}
