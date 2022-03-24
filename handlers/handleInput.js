import { resetLimit, updateGlobalState } from "../Helpers/globalState.js"

import sanitizer from "../Helpers/santizer.js"

import { createCard } from "../domManipulation.js"

import { getGlobalState } from "../Helpers/globalState.js"

import { insertDataToDB } from "../dbCalls.js"
import { renderUI } from "../render.js"
import {
  disableAddTaskButton,
  disableCreateButton,
  disableFilterButtons,
  enableAddTaskButton,
  enableCreateButton,
  enableFilterButtons,
} from "../buttonStates.js"
import { showToast } from "../toast.js"
import { handleIntialDeleteTask } from "./handleDelete.js"

const cardsDOM = document.querySelector("#cards")

export async function handleIntialAddTask() {
  disableFilterButtons() // disable create button
  disableCreateButton() // disable all three filter buttons
  disableAddTaskButton() // disable add task button to prevent spamming

  let { title } = getGlobalState()

  //sanitize title

  let sanitizedTitle = sanitizer(title)

  if (sanitizedTitle === "") {
    enableFilterButtons()
    enableCreateButton()
    handleIntialDeleteTask()
    showToast(Date.now(), false)
    return
  }

  //add state to db
  let { data, error } = await insertDataToDB({
    title: sanitizedTitle,
  })

  if (error) {
    throw new Error("Error while inserting data in DB")
  }

  let { id } = data[0]

  //remove the intialCard that was added for data adding purpose

  cardsDOM.removeChild(cardsDOM.firstElementChild)

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
    const textAreaInitialInputBox = document.querySelector("#initial_input_box")

    textAreaInitialInputBox.setAttribute("disabled", true)
    handleIntialAddTask()
  }
}

export function handleInitialInputForm(e) {
  e.preventDefault()
}
