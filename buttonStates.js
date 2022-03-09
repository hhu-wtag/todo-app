export function disableFilterButtons(
  all = false,
  inc = false,
  com = false,
  create = false
) {
  const btnFilterAll = document.querySelector(".btnFilterAll")
  const btnFilterInc = document.querySelector(".btnFilterInc")
  const btnFilterCom = document.querySelector(".btnFilterCom")
  const btnCreate = document.querySelector("#createBtn")

  if (create) {
    btnCreate.setAttribute("disabled", true)
  }

  if (all) {
    btnFilterAll.setAttribute("disabled", true)
  }

  if (inc) {
    btnFilterInc.setAttribute("disabled", true)
  }

  if (com) {
    btnFilterCom.setAttribute("disabled", true)
  }
}

export function enableFilterButtons() {
  const btnFilterAll = document.querySelector(".btnFilterAll")
  const btnFilterInc = document.querySelector(".btnFilterInc")
  const btnFilterCom = document.querySelector(".btnFilterCom")
  const btnCreate = document.querySelector("#createBtn")

  btnCreate.removeAttribute("disabled")

  btnFilterAll.removeAttribute("disabled")

  btnFilterInc.removeAttribute("disabled")

  btnFilterCom.removeAttribute("disabled")
}
