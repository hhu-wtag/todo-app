import { hideLoadMoreBtn } from "./buttonStates.js"
import {
  createInitialCard,
  hideNoDataIcon,
  hideNoSearchDataIcon,
} from "./domManipulation.js"
import { handleFilterAll, handleFilterCom, handleFilterInc } from "./filter.js"
import {
  updateGlobalState,
  getGlobalState,
  resetGlobalState,
} from "./Helpers/globalState.js"
import { renderUI, renderUIOnLoadMore } from "./render.js"

import { toogleSearchBar, handleSearch } from "./search.js"

let splashScreenIsOn = true
let domIsLoaded = false

setTimeout(setSplashScreenToOff, 2000)

document.addEventListener("DOMContentLoaded", (event) => {
  domIsLoaded = true

  if (splashScreenIsOn === false) {
    //dom is loaded and splash screen time has ended. No race condition here.
    //We can safely load the main screen
    initialLoad() // show the main screen
  } else {
  }
})

function setSplashScreenToOff() {
  splashScreenIsOn = false

  if (domIsLoaded) {
    initialLoad()
  }
}

function initialLoad() {
  const createBtnDOM = document.querySelector("#createBtn")
  const cardsDOM = document.querySelector("#cards")

  const svgSearchIcon = document.querySelector(".searchIcon")
  const inputSearchBar = document.querySelector(".searchBar")

  const btnFilterAll = document.querySelector(".btnFilterAll")
  const btnFilterInc = document.querySelector(".btnFilterInc")
  const btnFilterCom = document.querySelector(".btnFilterCom")

  const btnLoadMore = document.querySelector(".btnLoadMore")

  const divSplashScreen = document.querySelector(".splashScreen")
  const divMainScreen = document.querySelector(".mainScreen")

  //

  //

  divSplashScreen.style.display = "none"
  divMainScreen.removeAttribute("hidden")
  ;(function mounted() {
    resetGlobalState()

    renderUI()
  })()

  svgSearchIcon.addEventListener("click", () => toogleSearchBar(inputSearchBar))

  inputSearchBar.addEventListener("input", handleSearch)

  btnFilterAll.addEventListener("click", handleFilterAll)
  btnFilterInc.addEventListener("click", handleFilterInc)
  btnFilterCom.addEventListener("click", handleFilterCom)

  btnLoadMore.addEventListener("click", function () {
    let { limitValue, limit } = getGlobalState()
    //showLoadMoreSpinner()

    updateGlobalState({
      limit: limit + limitValue,
    })

    renderUIOnLoadMore()
    //hideLoadMoreSpinner()
  })

  createBtnDOM.addEventListener("click", (e) => {
    let { createCardIsOpened } = getGlobalState()
    let card = null

    let { fetchedDataLength } = getGlobalState()

    if (createCardIsOpened === false) {
      updateGlobalState({ createCardIsOpened: true })

      hideLoadMoreBtn()
      hideNoSearchDataIcon()

      card = createInitialCard()

      cardsDOM.prepend(card)
    } else {
      return
    }
  })
}
