import { getGlobalState, updateGlobalState } from "./Helpers/globalState.js"
import {
  deleteDataByID,
  updateDone,
  insertDataToDB,
  updateDataByID,
} from "./dbCalls.js"

import { completedInDays, convertTime } from "./Helpers/time.js"

import { renderUI } from "./render.js"

import { createCard } from "./domManipulation.js"

const cardsDOM = document.querySelector("#cards")

export async function handleIntialAddTask(event) {
  console.log("Initial Add Task Button Pressed !")

  let { title } = getGlobalState()

  if (title === "") return

  //add state to db
  let { error, data } = await insertDataToDB({
    title,
  })

  if (error) {
    console.error(error)
    return
  }

  let { created_at, id, title: titleFromDB } = data[0]

  let card = createCard({
    itemId: id,
    title: titleFromDB,
    createdAt: created_at,
  })

  //remove the intialCard that was added for data adding purpose

  cardsDOM.removeChild(cardsDOM.firstElementChild)

  cardsDOM.prepend(card)

  updateGlobalState({
    createCardIsOpened: false,
  })

  renderUI()
}

export function handleIntialDeleteTask(event) {
  console.log("Initial Delete Task Button Pressed !")

  cardsDOM.removeChild(cardsDOM.firstElementChild)

  updateGlobalState({
    createCardIsOpened: false,
  })
}

export function handleInputField(e) {
  const value = e.target.value

  updateGlobalState({
    title: value,
  })
}

export async function handleDone() {
  let dataID = this.getAttribute("data-id")

  //get the div with data ID
  const divCardHeader = document.querySelector(
    `div[data-id='${dataID}'] > div.cardHeader`
  )

  const pTitle = divCardHeader.querySelector("#title")
  const createdAt = divCardHeader.querySelector("#createdAt").textContent

  const days = completedInDays(createdAt)

  //update DB
  const { data, error } = await updateDone(dataID, days)

  if (error) throw new Error("Error while updating done state")

  //place a strike through class on the title and change color to green
  pTitle.classList.add("done")

  const divCardFooter = document.querySelector(
    `div[data-id='${dataID}'] > div.cardFooter`
  )

  const divCardFooterLeft = divCardFooter.querySelector("div#cardFooterLeft")
  const divCardFooterRight = divCardFooter.querySelector("div#cardFooterRight")

  updateGlobalState({
    editModeOn: false,
  })

  const btnSave = divCardFooterLeft.querySelector(".btnSave")
  const btnDone = divCardFooterLeft.querySelector(".doneBtn")
  const btnEdit = divCardFooterLeft.querySelector(".editBtn")

  //hide save button
  btnSave.setAttribute("hidden", true)

  //hide done button
  btnDone.setAttribute("hidden", "true")

  //hide edit button
  btnEdit.setAttribute("hidden", "true")

  const pCompletedTag = divCardFooterRight.querySelector(".completedInTag")
  //show completed in tag
  pCompletedTag.removeAttribute("hidden")

  if (days === 0) {
    pCompletedTag.textContent = "Completed in less than a day"
  } else {
    pCompletedTag.textContent = `Completed in ${days} days`
  }
}

export async function handleDelete() {
  let dataID = this.getAttribute("data-id")

  let { error, data } = await deleteDataByID(dataID)

  if (error) {
    throw new Error("Error Occured when deleting from DB")
  }

  renderUI()
}

async function handleSaveMiddleware(dataID) {
  const pTitle = document.querySelector(
    `div[data-id='${dataID}'] > p.cardTitle`
  )

  const newText = pTitle.textContent

  // update localStorage

  //TODO handle empty string of newText

  //Make DB Calls

  const { data, error } = await updateDataByID(dataID, newText)

  //if (error) throw new Error("Error while updating DB")

  return new Promise(
    (resolve) => {
      resolve(data)
    },
    (reject) => reject(error)
  )
}

export async function handleSave() {
  let dataID = this.getAttribute("data-id")

  const pTitle = document.querySelector(
    `div[data-id='${dataID}'] > p.cardTitle`
  )

  //update data in db
  let response = await handleSaveMiddleware(dataID)

  if (response) {
    let state = pTitle.getAttribute("contenteditable")

    state = state === "true" ? "false" : "true"

    toogleContentEditable(pTitle, state, dataID)
  }
}

export async function handleEdit() {
  let dataID = this.getAttribute("data-id")

  updateGlobalState({
    editModeOn: true,
  })

  const pTitle = document.querySelector(
    `div[data-id='${dataID}'] > p.cardTitle`
  )

  const oldText = pTitle.textContent

  let state =
    pTitle.getAttribute("contenteditable") === "true" ? "false" : "true"

  toogleContentEditable(pTitle, state, dataID)
}

export function toogleContentEditable(el, contentEditableIsOn, dataID) {
  var sel = window.getSelection()

  if (contentEditableIsOn === "true") {
    el.setAttribute("contenteditable", "true")
    const range = document.createRange()

    range.setStart(el.childNodes[0], el.childNodes[0].length)

    sel.removeAllRanges()
    sel.addRange(range)
  } else {
    el.setAttribute("contenteditable", "false")
    sel.removeAllRanges()
  }

  toogleEditModeUI(dataID)
}

function toogleEditModeUI(dataID) {
  const pTitle = document.querySelector(
    `div[data-id='${dataID}'] > p.cardTitle`
  )

  const divCardHeader = document.querySelector(
    `div[data-id='${dataID}'] > div.cardHeader`
  )

  const divCardFooter = document.querySelector(
    `div[data-id='${dataID}'] > div.cardFooter`
  )

  const divCardFooterLeft = divCardFooter.querySelector("div#cardFooterLeft")

  const state = pTitle.getAttribute("contenteditable")

  const pCreatedAt = divCardHeader.querySelector("#createdAt")

  const btnEdit = divCardFooterLeft.querySelector(".editBtn")

  if (state === "true") {
    pCreatedAt.setAttribute("hidden", true) // hide createdAt element

    btnEdit.setAttribute("hidden", true) // hide edit button

    const btnSave = document.createElement("button")
    btnSave.classList.add("btnSave")
    btnSave.textContent = "save"
    btnSave.addEventListener("click", handleSave)
    btnSave.setAttribute("data-id", dataID)

    divCardFooterLeft.prepend(btnSave)
  } else {
    pCreatedAt.removeAttribute("hidden")
    btnEdit.removeAttribute("hidden")

    divCardFooterLeft.removeChild(divCardFooterLeft.firstElementChild)
  }
}
