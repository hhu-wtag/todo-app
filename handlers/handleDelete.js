import {
  updateGlobalState,
  removeEditDataById,
  getGlobalState,
} from "../Helpers/globalState.js"

import {
  deleteDataByID,
  updateDone,
  insertDataToDB,
  updateDataByID,
} from "../dbCalls.js"
import { showNoDataIcon } from "../domManipulation.js"

const cardsDOM = document.querySelector("#cards")

export function handleIntialDeleteTask(event) {
  console.log("Initial Delete Task Button Pressed !")

  let { fetchedDataLength } = getGlobalState()

  //hide no data
  if (fetchedDataLength === 0) {
    showNoDataIcon()
  }

  cardsDOM.removeChild(cardsDOM.firstElementChild)

  updateGlobalState({
    createCardIsOpened: false,
    title: "",
  })
}

export async function handleDelete() {
  let dataID = this.getAttribute("data-id")

  let { error, data } = await deleteDataByID(dataID)

  if (error) {
    throw new Error("Error Occured when deleting from DB")
  }

  let domToBeDeleted = cardsDOM.querySelector(`div[data-id='${dataID}']`)

  cardsDOM.removeChild(domToBeDeleted)

  removeEditDataById(dataID)

  //check if this was the last item in the list.
  //if it is, show no data icon.
  let { fetchedDataLength, limit } = getGlobalState()

  fetchedDataLength = fetchedDataLength - 1

  updateGlobalState({
    fetchedDataLength: fetchedDataLength,
  })

  if (fetchedDataLength <= 0) {
    showNoDataIcon()
  }
}
