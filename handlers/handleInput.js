import { resetLimit, updateGlobalState } from "../Helpers/globalState.js"

import sanitizer from "../Helpers/santizer.js"

import { createCard, hideNoDataIcon } from "../domManipulation.js"

import { getGlobalState } from "../Helpers/globalState.js"

import { insertDataToDB } from "../dbCalls.js"
import { renderUI } from "../render.js"
import {
  disableCreateButton,
  disableFilterButtons,
  enableCreateButton,
} from "../buttonStates.js"
import { showToast } from "../toast.js"

const cardsDOM = document.querySelector("#cards")

export async function handleIntialAddTask() {
  console.log("Initial Add Task Button Pressed !")
  disableFilterButtons() // disable create button
  disableCreateButton() // disable all three filter buttons

  let { title } = getGlobalState()

  //sanitize title

  let sanitizedTitle = sanitizer(title)

  if (sanitizedTitle === "") return

  //add state to db
  let { data, error } = await insertDataToDB({
    title: sanitizedTitle,
  })

  if (error) {
    throw new Error("Error while inserting data in DB")
  }

  let { created_at, id, title: titleFromDB } = data[0]

  //create a card to append it to the cardsDOM
  let card = createCard({
    itemId: id,
    title: titleFromDB,
    createdAt: created_at,
  })

  //remove the intialCard that was added for data adding purpose

  cardsDOM.removeChild(cardsDOM.firstElementChild)

  //append the newly created card
  //cardsDOM.prepend(card)

  //clear the search bar on new data add
  const inputSearchBar = document.querySelector(".searchBar")

  inputSearchBar.value = ""

  updateGlobalState({
    createCardIsOpened: false,
    title: "",
    searchText: "",
  })
  resetLimit()

  renderUI()
  showToast(id, true)
}

export function handleInputField(e) {
  const value = e.target.value

  updateGlobalState({
    title: value,
  })

  if (value && value[value.length - 1] === "\n") {
    console.log("Enter pressed")
    handleIntialAddTask()
  }
}

export function handleInitialInputForm(e) {
  e.preventDefault()
}
