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
