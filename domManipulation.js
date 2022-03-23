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

import IconMapper from "./Helpers/icons.js"
import { convertTime } from "./Helpers/time.js"
import { disableFilterButtons, hideLoadMoreBtn } from "./buttonStates.js"

export function createCard({ itemId, title, createdAt, done, doneIn }) {
  const card = document.createElement("div")
  card.setAttribute("data-id", itemId)
  card.classList.add("card")

  const spinner = document.createElement("div")
  spinner.classList.add("spinner__container")
  card.setAttribute("data-id", itemId)
  spinner.innerHTML = IconMapper["loader"]
  spinner.setAttribute("hidden", true)

  const cardHeader = document.createElement("div")
  cardHeader.setAttribute("data-id", itemId)
  cardHeader.classList.add("cardHeader")

  const cardFooter = document.createElement("div")
  cardFooter.setAttribute("data-id", itemId)
  cardFooter.classList.add("cardFooter")

  const cardParagraphTitle = document.createElement("p")
  cardParagraphTitle.setAttribute("data-id", itemId)
  cardParagraphTitle.id = "title"
  cardParagraphTitle.classList.add("cardTitle")
  cardParagraphTitle.textContent = title
  cardParagraphTitle.setAttribute("contenteditable", false)

  const cardParagraphCreatedAt = document.createElement("p")
  cardParagraphCreatedAt.id = "createdAt"
  cardParagraphCreatedAt.classList.add("cardCreatedAt")
  cardParagraphCreatedAt.textContent = `Created At: ${convertTime(
    String(createdAt)
  )}`

  const doneButton = document.createElement("span")
  doneButton.innerHTML = IconMapper["done"]
  doneButton.classList.add("btn", "doneBtn")
  doneButton.setAttribute("data-id", itemId)
  doneButton.addEventListener("click", handleDone)

  const editButton = document.createElement("span")
  editButton.innerHTML = IconMapper["edit"]
  editButton.classList.add("btn", "editBtn")
  editButton.setAttribute("data-id", itemId)
  editButton.addEventListener("click", handleEdit)

  const deleteButton = document.createElement("span")
  deleteButton.innerHTML = IconMapper["delete"]
  deleteButton.classList.add("btn", "deleteBtn")
  deleteButton.setAttribute("data-id", itemId)
  deleteButton.addEventListener("click", handleDelete)

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
    cardParagraphTitle.classList.add("done")
    doneButton.setAttribute("hidden", "true")
    editButton.setAttribute("hidden", "true")

    completedInTag.removeAttribute("hidden")
  }

  cardFooterLeft.appendChild(doneButton)
  cardFooterLeft.appendChild(editButton)
  cardFooterLeft.appendChild(deleteButton)

  cardFooterRight.appendChild(completedInTag)

  cardFooter.appendChild(cardFooterLeft)
  cardFooter.appendChild(cardFooterRight)

  cardHeader.appendChild(cardParagraphTitle)
  cardHeader.appendChild(cardParagraphCreatedAt)

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
  deleteTaskBtn.innerHTML = IconMapper["delete"]
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

export function showNoDataIcon(message = undefined) {
  const divNoData = document.querySelector(".noData")
  const paragraphNoData = divNoData.querySelector("p")

  if (message !== undefined) {
    paragraphNoData.textContent = message
  }

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

export function showNoSearchDataIcon() {
  const divNoSearchData = document.querySelector(".noSearchData")

  divNoSearchData.removeAttribute("hidden")
}

export function hideNoSearchDataIcon() {
  const divNoSearchData = document.querySelector(".noSearchData")

  if (divNoSearchData.getAttribute("hidden") === null) {
    divNoSearchData.setAttribute("hidden", true)
  }
}
