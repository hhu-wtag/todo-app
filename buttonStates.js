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

  btnSearch.remove("disabled")
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
