import {
  updateEditDataById,
  getEditDataById,
  updateGlobalState,
} from "../Helpers/globalState.js"
import { updateDataByID } from "../dbCalls.js"

import { toogleContentEditable } from "./handleEdit.js"

import { completedInDays } from "../Helpers/time.js"

import sanitizer from "../Helpers/santizer.js"

import { updateDone } from "../dbCalls.js"
import { showToast } from "../toast.js"
import { hideSpinner, showSpinner } from "../spinner.js"

async function handleSaveMiddleware(dataID) {
  const pTitle = document.querySelector(
    `div[data-id='${dataID}'] > p.cardTitle`
  )

  const newText = pTitle.textContent

  const sanitizedTitle = sanitizer(newText)

  // update localStorage

  //TODO handle empty string of newText

  //Make DB Calls

  const { data, error } = await updateDataByID(dataID, sanitizedTitle)

  if (error) {
    showToast(dataID, false) // show failed toast

    hideSpinner(dataID)
    throw new Error("Error while updating data")
  }

  // show success toast
  showToast(dataID, true)

  return new Promise(
    (resolve) => {
      resolve(data)
    },
    (reject) => reject(error)
  )
}

export async function handleSave() {
  let dataID = this.getAttribute("data-id")

  const divCard = document.querySelector(`div[data-id='${dataID}']`)

  const pTitle = document.querySelector(
    `div[data-id='${dataID}'] > p.cardTitle`
  )

  pTitle.classList.remove("height_full")

  updateEditDataById(dataID, {
    newState: pTitle.textContent,
  })

  let editData = getEditDataById(dataID)

  let editStateChanged = true

  let response

  editData.newState = sanitizer(editData.newState)

  if (
    editData &&
    (editData.oldState === editData.newState || editData.newState === "")
  ) {
    editStateChanged = false

    response = new Array({
      title: editData.oldState,
    })
  }
  //update data in db if edit state changed
  if (editStateChanged) {
    //start spinner
    showSpinner(dataID)

    //disable the div
    divCard.setAttribute("disabled", true)

    response = await handleSaveMiddleware(dataID)

    //start spinner
    hideSpinner(dataID)

    //enable the div
    divCard.removeAttribute("disabled")
  }

  let state = pTitle.getAttribute("contenteditable")

  pTitle.textContent = response[0].title
  state = state === "true" ? "false" : "true"

  toogleContentEditable(pTitle, state, dataID)
}

export async function handleDone() {
  let dataID = this.getAttribute("data-id")

  const divCard = document.querySelector(`div[data-id='${dataID}']`)

  //get the div with data ID
  const divCardHeader = document.querySelector(
    `div[data-id='${dataID}'] > div.cardHeader`
  )

  const pTitle = divCardHeader.querySelector("#title")
  const pCreatedAt = divCardHeader.querySelector("#createdAt")
  const createdAt = pCreatedAt.textContent

  pTitle.classList.remove("height_full")

  let days = completedInDays(createdAt)
  days = days / 8.64e7

  days = parseInt(days)

  //showSpinner
  showSpinner(dataID)

  //disable the div
  divCard.setAttribute("disabled", true)

  //update DB
  const { data, error } = await updateDone(dataID, days)

  if (error) {
    showToast(dataID, false)
    hideSpinner(dataID)
    throw new Error("Error while updating done state")
  }

  pCreatedAt.removeAttribute("hidden")

  //hideSpinner
  hideSpinner(dataID)

  //show Toast
  showToast(dataID, true)

  //enable the div
  divCard.removeAttribute("disabled")

  //place a strike through class on the title and change color to green
  pTitle.classList.add("done")
  var sel = window.getSelection()

  sel.removeAllRanges()
  pTitle.setAttribute("contenteditable", "false")

  let editData = getEditDataById(dataID)

  if (
    editData &&
    (editData.oldState === editData.newState || editData.newState === null)
  ) {
    pTitle.textContent = editData.oldState
  }

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
  if (btnSave) btnSave.setAttribute("hidden", true)

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
