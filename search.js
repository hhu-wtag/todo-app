import { searchDB } from "./dbCalls.js"
import { renderUI, renderUIOnSearch } from "./render.js"

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

      func.call(this, ...args)
    }

    clearTimeout(timer)
    timer = setTimeout(later, delay)
  }
}

async function getSearchData() {
  let searchText = this.value

  if (searchText === "") {
    renderUI()
    return
  }

  let { data, error } = await searchDB(searchText)

  if (error) throw new Error("Error while getting searchd data from DB")

  renderUIOnSearch(data)
}
