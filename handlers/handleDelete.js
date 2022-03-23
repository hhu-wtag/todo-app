import {
  updateGlobalState,
  removeEditDataById,
  getGlobalState,
} from "../Helpers/globalState.js"

import { deleteDataByID } from "../dbCalls.js"
import { showNoDataIcon, showNoSearchDataIcon } from "../domManipulation.js"
import { showToast } from "../toast.js"
import { hideSpinner, showSpinner } from "../spinner.js"
import { renderUI } from "../render.js"

const cardsDOM = document.querySelector("#cards")

export function handleIntialDeleteTask() {
  let { fetchedDataLength, searchText } = getGlobalState()

  //hide no data
  if (fetchedDataLength === 0) {
    if (searchText === "") {
      showNoDataIcon()
    } else {
      showNoSearchDataIcon()
    }
  }

  cardsDOM.removeChild(cardsDOM.firstElementChild)

  updateGlobalState({
    createCardIsOpened: false,
    title: "",
  })
}

export async function handleDelete() {
  let dataID = this.getAttribute("data-id")

  const divCard = document.querySelector(`div[data-id='${dataID}']`)

  showSpinner(dataID)

  //disable the div
  divCard.setAttribute("disabled", true)

  let { error, data } = await deleteDataByID(dataID)

  if (error) {
    showToast(dataID, false) //show toast for failed api call
    throw new Error("Error Occured when deleting from DB")
  }

  hideSpinner(dataID)

  //enable the div
  divCard.removeAttribute("disabled")

  //show toast for successful api call

  showToast(dataID, true)

  let domToBeDeleted = cardsDOM.querySelector(`div[data-id='${dataID}']`)

  cardsDOM.removeChild(domToBeDeleted)

  removeEditDataById(dataID)

  //check if this was the last item in the list.
  //if it is, show no data icon.
  let { fetchedDataLength } = getGlobalState()

  fetchedDataLength = fetchedDataLength - 1

  updateGlobalState({
    fetchedDataLength: fetchedDataLength,
  })

  if (fetchedDataLength <= 0) {
    renderUI()
  }
}
