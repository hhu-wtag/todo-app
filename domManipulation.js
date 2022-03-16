import {
  handleInputField,
  handleIntialAddTask,
  handleInitialInputForm,
} from "./handlers/handleInput.js"

import { handleEdit } from "./handlers/handleEdit.js"

import { handleDone } from "./handlers/handleUpdate.js"

import {
  handleDelete,
  handleIntialDeleteTask,
} from "./handlers/handleDelete.js"

import { doneIcon, editIcon, deleteIcon, loaderIcon } from "./Helpers/icons.js"
import { convertTime } from "./Helpers/time.js"
import { disableFilterButtons, hideLoadMoreBtn } from "./buttonStates.js"

export function createCard({ itemId, title, createdAt, done, doneIn }) {
  const card = document.createElement("div")
  card.setAttribute("data-id", itemId)
  card.classList.add("card")

  const spinner = document.createElement("div")
  spinner.classList.add("spinner__container")
  card.setAttribute("data-id", itemId)
  spinner.innerHTML = loaderIcon()
  spinner.setAttribute("hidden", true)

  const cardHeader = document.createElement("div")
  cardHeader.setAttribute("data-id", itemId)
  cardHeader.classList.add("cardHeader")

  const cardFooter = document.createElement("div")
  cardFooter.setAttribute("data-id", itemId)
  cardFooter.classList.add("cardFooter")

  const pTitle = document.createElement("p")
  pTitle.setAttribute("data-id", itemId)
  pTitle.id = "title"
  pTitle.classList.add("cardTitle")
  pTitle.textContent = title
  pTitle.setAttribute("contenteditable", false)

  const pCreatedAt = document.createElement("p")
  pCreatedAt.id = "createdAt"
  pCreatedAt.classList.add("cardCreatedAt")
  pCreatedAt.textContent = `Created At: ${convertTime(String(createdAt))}`

  const doneBtn = document.createElement("span")
  doneBtn.innerHTML = doneIcon()
  doneBtn.classList.add("btn", "doneBtn")
  doneBtn.setAttribute("data-id", itemId)
  doneBtn.addEventListener("click", handleDone)

  const editBtn = document.createElement("span")
  editBtn.innerHTML = editIcon()
  editBtn.classList.add("btn", "editBtn")
  editBtn.setAttribute("data-id", itemId)
  editBtn.addEventListener("click", handleEdit)

  const deleteBtn = document.createElement("span")
  deleteBtn.innerHTML = deleteIcon()
  deleteBtn.classList.add("btn", "deleteBtn")
  deleteBtn.setAttribute("data-id", itemId)
  deleteBtn.addEventListener("click", handleDelete)

  const completedInTag = document.createElement("p")
  completedInTag.setAttribute("hidden", true)

  if (doneIn === 0) {
    completedInTag.textContent = "Completed in less than a day"
  } else {
    completedInTag.textContent = `Completed in ${parseInt(doneIn)} days`
  }

  completedInTag.id = "completedInTag"
  completedInTag.classList.add("completedInTag")

  const cardFooterLeft = document.createElement("div")
  const cardFooterRight = document.createElement("div")

  cardFooterLeft.id = "cardFooterLeft"
  cardFooterRight.id = "cardFooterRight"

  if (done) {
    pTitle.classList.add("done")
    doneBtn.setAttribute("hidden", "true")
    editBtn.setAttribute("hidden", "true")

    completedInTag.removeAttribute("hidden")
  }

  cardFooterLeft.appendChild(doneBtn)
  cardFooterLeft.appendChild(editBtn)
  cardFooterLeft.appendChild(deleteBtn)

  cardFooterRight.appendChild(completedInTag)

  cardFooter.appendChild(cardFooterLeft)
  cardFooter.appendChild(cardFooterRight)

  cardHeader.appendChild(pTitle)
  cardHeader.appendChild(pCreatedAt)

  card.appendChild(spinner)
  card.appendChild(cardHeader)
  card.appendChild(cardFooter)

  return card
}

export function createInitialCard() {
  const card = document.createElement("div")
  card.classList.add("card")

  const form = document.createElement("form")
  form.addEventListener("submit", handleInitialInputForm)
  form.classList.add("initialInputForm")

  const inputField = document.createElement("textarea")
  inputField.id = "initial_input_box"
  inputField.rows = 5
  inputField.cols = 10

  inputField.addEventListener("input", handleInputField)

  const buttonsDiv = document.createElement("div")
  buttonsDiv.id = "initial_button_div"

  const addTaskBtn = document.createElement("button")
  addTaskBtn.type = "submit"
  addTaskBtn.classList.add("btn")
  addTaskBtn.innerText = "Add Task"
  addTaskBtn.id = "addTaskBtn"
  addTaskBtn.addEventListener("click", handleIntialAddTask)

  const deleteTaskBtn = document.createElement("span")
  deleteTaskBtn.id = "deleteTaskBtn"
  deleteTaskBtn.innerHTML = deleteIcon()
  deleteTaskBtn.classList.add("btn")
  deleteTaskBtn.addEventListener("click", handleIntialDeleteTask)

  buttonsDiv.appendChild(addTaskBtn)
  buttonsDiv.appendChild(deleteTaskBtn)

  form.appendChild(inputField)
  form.appendChild(buttonsDiv)

  card.appendChild(form)

  //focus on input field

  setTimeout(() => {
    inputField.focus()
    inputField.select()
  }, 0)

  return card
}

export function showNoDataIcon() {
  const divNoData = document.querySelector(".noData")

  divNoData.removeAttribute("hidden")

  disableFilterButtons()
  hideLoadMoreBtn()
}

export function hideNoDataIcon() {
  const divNoData = document.querySelector(".noData")

  if (divNoData.getAttribute("hidden") === null) {
    divNoData.setAttribute("hidden", true)
  }
}
