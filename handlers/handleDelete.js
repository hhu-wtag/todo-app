import {
  updateGlobalState,
  removeEditDataById,
} from "../Helpers/globalState.js"

import {
  deleteDataByID,
  updateDone,
  insertDataToDB,
  updateDataByID,
} from "../dbCalls.js"

const cardsDOM = document.querySelector("#cards")

export function handleIntialDeleteTask(event) {
  console.log("Initial Delete Task Button Pressed !")

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
}
