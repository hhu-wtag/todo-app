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
  } else {
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
