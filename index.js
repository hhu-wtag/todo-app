import { createInitialCard } from "./domManipulation.js"
import { updateGlobalState, getGlobalState } from "./Helpers/globalState.js"
import { renderUI } from "./render.js"

document.addEventListener("DOMContentLoaded", (event) => {
  const createBtnDOM = document.querySelector("#createBtn")
  const cardsDOM = document.querySelector("#cards")

  //globalState

  let inputState = ""

  ;(function mounted() {
    updateGlobalState({
      createCardIsOpened: false,
      title: "",
      contentEditable: false,
      editModeOn: false,
    })

    renderUI()
  })()

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
})
