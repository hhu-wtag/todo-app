import {
  handleIntialAddTask,
  handleIntialDeleteTask,
  handleInputField,
  handleDone,
  handleDelete,
  handleEdit,
} from "./handler.js"

import { doneIcon, editIcon, deleteIcon } from "./Helpers/icons.js"
import { convertTime } from "./Helpers/time.js"

const cardsDOM = document.querySelector("#cards")

export function createCard({ itemId, title, createdAt, done, doneIn }) {
  const card = document.createElement("div")
  card.setAttribute("data-id", itemId)
  card.classList.add("card")

  const cardHeader = document.createElement("div")
  cardHeader.setAttribute("data-id", itemId)
  cardHeader.classList.add("cardHeader")

  const cardFooter = document.createElement("div")
  cardFooter.setAttribute("data-id", itemId)
  cardFooter.classList.add("cardFooter")

  const pTitle = document.createElement("p")
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
    completedInTag.textContent = `Completed in ${doneIn} days`
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

  card.appendChild(cardHeader)
  card.appendChild(cardFooter)

  return card
}

export function createInitialCard() {
  const card = document.createElement("div")
  card.classList.add("card")

  const inputField = document.createElement("textarea")
  inputField.id = "initial_input_box"
  inputField.rows = 5
  inputField.cols = 10

  inputField.addEventListener("change", handleInputField)

  const buttonsDiv = document.createElement("div")
  buttonsDiv.id = "initial_button_div"

  const addTaskBtn = document.createElement("button")
  addTaskBtn.innerText = "Add Task"
  addTaskBtn.id = "addTaskBtn"
  addTaskBtn.addEventListener("click", handleIntialAddTask)

  const deleteTaskBtn = document.createElement("span")
  deleteTaskBtn.id = "deleteTaskBtn"
  deleteTaskBtn.innerHTML = deleteIcon()
  deleteTaskBtn.addEventListener("click", handleIntialDeleteTask)

  buttonsDiv.appendChild(addTaskBtn)
  buttonsDiv.appendChild(deleteTaskBtn)

  card.appendChild(inputField)
  card.appendChild(buttonsDiv)

  return card
}
