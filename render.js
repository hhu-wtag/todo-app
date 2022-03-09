import {
  disableFilterButtons,
  enableFilterButtons,
  hideLoadMoreBtn,
} from "./buttonStates.js"
import {
  getAllDataFromDB,
  getAllFilterdData,
  getDataOnLoadMore,
  getFilterdData,
} from "./dbCalls.js"
import { createCard } from "./domManipulation.js"
import { getGlobalState, updateGlobalState } from "./Helpers/globalState.js"

const cardsDOM = document.querySelector("#cards")

function displayCards(data) {
  let card = null

  data.forEach((item) => {
    card = createCard({
      itemId: item.id,
      title: item.title,
      createdAt: item.created_at,
      done: item.done,
      doneIn: item.doneIn,
    })

    cardsDOM.append(card)
  })
}

export async function renderUI() {
  disableFilterButtons() // disable all three filter buttons

  //remove everything from the list
  while (cardsDOM.firstChild) {
    cardsDOM.removeChild(cardsDOM.firstChild)
  }

  // get fresh batch of data from db
  const { error, data } = await getAllDataFromDB()

  if (error) {
    throw new Error("Error while fetching data from supabase")
    return
  }

  console.log(data)

  displayCards(data)

  enableFilterButtons()
}

export async function renderUIOnSearch(data) {
  disableFilterButtons()
  //remove everything from the list
  while (cardsDOM.firstChild) {
    cardsDOM.removeChild(cardsDOM.firstChild)
  }

  displayCards(data)
  enableFilterButtons()
}

export async function renderUIOnLoadMore() {
  let { searchText, limit } = getGlobalState()

  let { data, error } = await getDataOnLoadMore(searchText)

  let range

  if (data.length >= limit) {
    range = limit
  } else {
    range = data.length

    //all the data has been fetched
    //hide the load more button

    hideLoadMoreBtn()
  }

  let card = null

  while (cardsDOM.firstChild) {
    cardsDOM.removeChild(cardsDOM.firstChild)
  }

  for (let index = 0; index < range; index++) {
    let item = data[index]

    card = createCard({
      itemId: item.id,
      title: item.title,
      createdAt: item.created_at,
      done: item.done,
      doneIn: item.doneIn,
    })

    cardsDOM.append(card)
  }
}

export async function renderUIOnFilter(mode) {
  disableFilterButtons()
  //remove everything from the list
  while (cardsDOM.firstChild) {
    cardsDOM.removeChild(cardsDOM.firstChild)
  }

  let data = null

  let { searchText } = getGlobalState()

  if (mode === "inc") {
    //show only the incomplete data

    let response = await getFilterdData(false, searchText)

    if (response.error)
      throw new Error("Error while fetching incomplete filtered data")

    data = response.data
  } else if (mode === "all") {
    let response = await getAllFilterdData(searchText)

    if (response.error)
      throw new Error("Error while fetching incomplete filtered data")

    data = response.data
  } else {
    let response = await getFilterdData(true, searchText)

    if (response.error)
      throw new Error("Error while fetching complete filtered data")

    data = response.data
  }

  displayCards(data)
  enableFilterButtons()
}
