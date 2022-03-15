import {
  disableCreateButton,
  disableFilterButtons,
  disableMainBody,
  enableCreateButton,
  enableFilterButtons,
  enableMainBody,
} from "./buttonStates.js"
import { searchDB } from "./dbCalls.js"
import { updateGlobalState } from "./Helpers/globalState.js"
import { renderUI, renderUIOnSearch } from "./render.js"
import { hideMainBodySpinner, showMainBodySpinner } from "./spinner.js"

export function toogleSearchBar(inputSearchBar) {
  if (inputSearchBar.getAttribute("hidden") === null) {
    inputSearchBar.setAttribute("hidden", true)

    const divHeaderLeft = document.querySelector(".headerLeft")
    const divHeaderRight = document.querySelector(".headerRight")

    divHeaderLeft.removeAttribute("hidden")
    //divHeaderLeft.style.visibility = "visible"

    divHeaderRight.style = `
        display: flex;
        align-items: center;
      `
  } else {
    //show Search bar

    //check if we are in mobile view. If we are then remove the logo

    if (window.screen.width <= 680) {
      const divHeaderLeft = document.querySelector(".headerLeft")
      const divHeaderRight = document.querySelector(".headerRight")
      const inputSearchBar = divHeaderRight.querySelector(".searchBar")

      divHeaderLeft.setAttribute("hidden", true)
      //divHeaderLeft.style.visibility = "hidden"
      divHeaderRight.style = `
        flex: 1;
        justify-content: space-between;
      `
      inputSearchBar.style = `
        flex: 1;
      `
    }

    inputSearchBar.removeAttribute("hidden")
  }
}

export const handleSearch = debounce(getSearchData)

function debounce(func, delay = 250) {
  let timer

  return function (...args) {
    const context = this

    const later = () => {
      timer = null

      showMainBodySpinner()
      disableMainBody()
      func.call(this, ...args)
    }

    clearTimeout(timer)
    timer = setTimeout(later, delay)
  }
}

async function getSearchData() {
  let searchText = this.value

  updateGlobalState({
    searchText,
  })

  // if (searchText === "") {
  //   renderUI()
  //   return
  // }

  let { data, error } = await searchDB(searchText)

  if (error) throw new Error("Error while getting searchd data from DB")
  hideMainBodySpinner()
  enableMainBody()

  renderUIOnSearch(data)
}
