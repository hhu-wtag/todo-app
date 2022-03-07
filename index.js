import { getAllDataFromDB, insertDataToDB } from "./dbCalls.js"
import { createInitialCard } from "./domManipulation.js"
import { updateGlobalState, getGlobalState } from "./Helpers/globalState.js"
import { renderUI } from "./render.js"

document.addEventListener("DOMContentLoaded", (event) => {
  const submitBtnDOM = document.querySelector("#submitBtn")
  const ulDOM = document.querySelector("#ulList")
  const inputDOM = document.querySelector("#inputBox")
  const createBtnDOM = document.querySelector("#createBtn")
  const cardsDOM = document.querySelector("#cards")

  //globalState

  let state = {}
  let inputState = ""
  let updateState = ""
  let stateFromDB = null

  ;(function mounted() {
    updateGlobalState({
      createCardIsOpened: false,
      title: "",
    })

    renderUI()
  })()

  //supabase calls

  //insertDataToDB()

  //localStorage manipulation

  function updateLocalStorageFromState() {
    let strState = JSON.stringify(state)

    localStorage.setItem("todos", strState)

    renderUL()
  }

  function updateStateFromLocalStorage() {
    let local = localStorage.getItem("todos")

    if (local === null) return

    state = local

    state = JSON.parse(state)

    renderUL()
  }

  //initially update state from local storage
  updateStateFromLocalStorage()

  //event listeners
  inputDOM.addEventListener("change", (e) => {
    inputState = e.target.value
  })

  createBtnDOM.addEventListener("click", (e) => {
    let { createCardIsOpened } = getGlobalState()
    let card = null

    if (createCardIsOpened === false) {
      updateGlobalState({ createCardIsOpened: true })

      card = createInitialCard()

      cardsDOM.prepend(card)
    } else {
      return
    }
  })

  submitBtnDOM.addEventListener("click", (e) => {
    e.preventDefault()

    if (inputState === "") return

    state[Date.now()] = {
      itemId: Date.now(),
      title: inputState,
      done: false,
    }
    inputState = ""
    inputDOM.value = ""

    //update localStorage
    updateLocalStorageFromState()

    renderUL()
  })

  //create a dom list item from JS
  function createListItem({ itemId, title, done }) {
    const div = document.createElement("div")

    div.id = itemId

    div.innerHTML = `
    
      <p contenteditable="false">${title}</p>


      <button data-id=${itemId} class="deleteBtn">Delete</button>
      <button data-id=${itemId} class="editBtn">Edit</button>
      <input type="checkbox" data-id=${itemId} />
  `

    return div
  }

  //handle checkbox state. might have to refactor later when there is design change
  function handleListCheckbox() {
    let dataID = this.getAttribute("data-id")
    state[dataID].done = !state[dataID].done
    updateLocalStorageFromState()

    renderUL()
  }

  //handle delete button
  function handleDelete() {
    let dataID = this.getAttribute("data-id")

    delete state[dataID]
    updateLocalStorageFromState()

    renderUL()
  }

  function handleUpdate(updatedText, dataID) {
    let entries = Object.keys(state)

    for (let index = 0; index < entries.length; index++) {
      if (entries[index] === dataID) {
        state[entries[index]] = {
          ...state[entries[index]],
          title: updatedText,
        }
        break
      }
    }
    updateLocalStorageFromState()
    renderUL()
  }

  function handleEditBox(e) {
    updateState = e.target.value
  }

  //handle edit button
  function handleEdit() {
    let dataID = this.getAttribute("data-id")

    let domToBeEdited = null
    let updatedText = null

    let listItems = ulDOM.children
    for (let index = 0; index < listItems.length; index++) {
      if (listItems[index].id === dataID) {
        domToBeEdited = listItems[index]
        break
      }
    }

    const textBox = domToBeEdited.firstElementChild

    const range = document.createRange()

    if (textBox.getAttribute("contenteditable") === "false") {
      textBox.setAttribute("contenteditable", "true")
      domToBeEdited.children[2].innerHTML = "Save" // edit button
    } else {
      textBox.setAttribute("contenteditable", "false")
      domToBeEdited.children[2].innerHTML = "Edit" // edit button
      updatedText = textBox.innerHTML
      handleUpdate(updatedText, dataID)
    }

    range.setStart(textBox.childNodes[0], textBox.childNodes[0].length)

    var sel = window.getSelection()
    sel.removeAllRanges()
    sel.addRange(range)
  }

  //main rendering function.
  function renderUL() {
    // clear out the unordered list
    while (ulDOM.firstChild) {
      ulDOM.removeChild(ulDOM.firstChild)
    }

    Object.values(state).forEach((listItem) => {
      let liDOM = createListItem(listItem)

      ulDOM.appendChild(liDOM)

      liDOM.children[1].addEventListener("click", handleDelete)
      liDOM.children[2].addEventListener("click", handleEdit)

      liDOM.lastElementChild.addEventListener("change", handleListCheckbox)
    })

    let listItems = ulDOM.children

    for (let index = 0; index < listItems.length; index++) {
      let id = listItems[index].id
      if (state[id].done === true) {
        listItems[index].children[0].classList.toggle("done")
        listItems[index].children[3].checked = true
      }
    }
  }
})
