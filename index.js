import { createInitialCard } from "./domManipulation.js"
import { handleFilterAll, handleFilterCom, handleFilterInc } from "./filter.js"
import { updateGlobalState, getGlobalState } from "./Helpers/globalState.js"
import { renderUI } from "./render.js"

import { toogleSearchBar, handleSearch } from "./search.js"

document.addEventListener("DOMContentLoaded", (event) => {
  const createBtnDOM = document.querySelector("#createBtn")
  const cardsDOM = document.querySelector("#cards")

  const svgSearchIcon = document.querySelector(".searchIcon")
  const inputSearchBar = document.querySelector(".searchBar")

  const btnFilterAll = document.querySelector(".btnFilterAll")
  const btnFilterInc = document.querySelector(".btnFilterInc")
  const btnFilterCom = document.querySelector(".btnFilterCom")

  ;(function mounted() {
    updateGlobalState({
      createCardIsOpened: false,
      title: "",
      contentEditable: false,
      editModeOn: false,
      fetchingData: false,
    })

    renderUI()
  })()

  svgSearchIcon.addEventListener("click", () => toogleSearchBar(inputSearchBar))

  inputSearchBar.addEventListener("input", handleSearch)

  btnFilterAll.addEventListener("click", handleFilterAll)
  btnFilterInc.addEventListener("click", handleFilterInc)
  btnFilterCom.addEventListener("click", handleFilterCom)

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
