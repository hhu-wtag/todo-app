import {
  updateGlobalState,
  updateEditDataById,
} from "../Helpers/globalState.js"

import { handleSave } from "./handleUpdate.js"

export async function handleEdit() {
  let dataID = this.getAttribute("data-id")

  updateGlobalState({
    editModeOn: true,
  })

  const pTitle = document.querySelector(
    `div[data-id='${dataID}'] > p.cardTitle`
  )

  updateEditDataById(dataID, {
    oldState: pTitle.textContent,
    newState: null,
  })

  let state =
    pTitle.getAttribute("contenteditable") === "true" ? "false" : "true"

  toogleContentEditable(pTitle, state, dataID)
}

function handleEditBox(e) {
  if (e.keyCode === 13) {
    this.removeEventListener("keypress", handleEditBox)
    handleSave.call(this)
  }
}

export function toogleContentEditable(el, contentEditableIsOn, dataID) {
  var sel = window.getSelection()

  if (contentEditableIsOn === "true") {
    el.setAttribute("contenteditable", "true")
    el.addEventListener("keypress", handleEditBox)
    el.classList.add("height_full")
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
    btnSave.textContent = "Save"
    btnSave.addEventListener("click", handleSave)
    btnSave.setAttribute("data-id", dataID)

    divCardFooterLeft.prepend(btnSave)
  } else {
    pCreatedAt.removeAttribute("hidden")
    btnEdit.removeAttribute("hidden")

    divCardFooterLeft.removeChild(divCardFooterLeft.firstElementChild)
  }
}
