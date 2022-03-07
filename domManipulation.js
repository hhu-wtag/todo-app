import { deleteDataByID, insertDataToDB } from "./dbCalls.js"
import { getGlobalState, updateGlobalState } from "./Helpers/globalState.js"
import { doneIcon, editIcon, deleteIcon } from "./Helpers/icons.js"
import { renderUI } from "./render.js"

const cardsDOM = document.querySelector("#cards")

export function createCard({ itemId, title, createdAt }) {
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
  pTitle.innerHTML = title

  const pCreatedAt = document.createElement("p")
  pCreatedAt.id = "createdAt"
  pCreatedAt.classList.add("cardCreatedAt")
  pCreatedAt.innerHTML = createdAt

  const doneBtn = document.createElement("span")
  doneBtn.innerHTML = doneIcon()
  doneBtn.classList.add("btn", "doneBtn")
  doneBtn.setAttribute("data-id", itemId)

  const editBtn = document.createElement("span")
  editBtn.innerHTML = editIcon()
  editBtn.classList.add("btn", "editBtn")
  editBtn.setAttribute("data-id", itemId)

  const deleteBtn = document.createElement("span")
  deleteBtn.innerHTML = deleteIcon()
  deleteBtn.classList.add("btn", "deleteBtn")
  deleteBtn.setAttribute("data-id", itemId)
  deleteBtn.addEventListener("click", handleDelete)

  cardFooter.appendChild(doneBtn)
  cardFooter.appendChild(editBtn)
  cardFooter.appendChild(deleteBtn)

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

async function handleIntialAddTask(event) {
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
    created_at,
  })

  //remove the intialCard that was added for data adding purpose

  cardsDOM.removeChild(cardsDOM.firstElementChild)

  cardsDOM.prepend(card)

  renderUI()
}

function handleIntialDeleteTask(event) {
  console.log("Initial Delete Task Button Pressed !")

  cardsDOM.removeChild(cardsDOM.firstElementChild)

  updateGlobalState({
    createCardIsOpened: false,
  })
}

function handleInputField(e) {
  const value = e.target.value

  updateGlobalState({
    title: value,
  })
}

async function handleDelete() {
  let dataID = this.getAttribute("data-id")

  let { error, data } = await deleteDataByID(dataID)

  if (error) {
    throw new Error("Error Occured when deleting from DB")
  }

  renderUI()
}
