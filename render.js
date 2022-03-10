import {
  disableCreateButton,
  disableFilterButtons,
  enableFilterButtons,
  hideLoadMoreBtn,
  showLoadMoreBtn,
  enableCreateButton,
} from "./buttonStates.js"
import {
  getAllDataFromDB,
  getAllFilterdData,
  getDataOnLoadMore,
  getFilterdData,
} from "./dbCalls.js"
import { createCard, showNoDataIcon } from "./domManipulation.js"
import {
  getGlobalState,
  resetLimit,
  updateGlobalState,
} from "./Helpers/globalState.js"

const cardsDOM = document.querySelector("#cards")

function displayCards(data, range) {
  let card = null

  console.log({ len: data.length })

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

export async function renderUI() {
  disableFilterButtons() // disable all three filter buttons
  disableCreateButton() // disable create button
  hideLoadMoreBtn() // hideLoadMoreBtn()

  // get fresh batch of data from db
  let { error, data } = await getAllDataFromDB()

  if (error) {
    throw new Error("Error while fetching data from supabase")
  }

  if (data.length === 0) {
    // no data to show.
    showNoDataIcon()
    updateGlobalState({
      fetchedDataLength: 0,
    })
  } else {
    updateGlobalState({
      fetchedDataLength: data.length,
    })

    //remove everything from the list
    while (cardsDOM.firstChild) {
      cardsDOM.removeChild(cardsDOM.firstChild)
    }

    let { limit } = getGlobalState()

    limit = parseInt(limit)

    let range

    if (data.length >= limit) {
      range = limit
      showLoadMoreBtn()
    } else {
      range = data.length
      console.log("here")

      //all the data has been fetched
      //hide the load more button

      hideLoadMoreBtn()
    }

    displayCards(data, range)
    enableFilterButtons()
    enableCreateButton()
  }
}

export async function renderUIOnSearch(data) {
  disableFilterButtons()

  resetLimit()

  //remove everything from the list
  while (cardsDOM.firstChild) {
    cardsDOM.removeChild(cardsDOM.firstChild)
  }

  let { limit } = getGlobalState()

  limit = parseInt(limit)

  let range

  if (data.length >= limit) {
    range = limit
    showLoadMoreBtn()
  } else {
    range = data.length

    //all the data has been fetched
    //hide the load more button

    hideLoadMoreBtn()
  }

  displayCards(data, range)
  enableFilterButtons()
}

export async function renderUIOnLoadMore() {
  let { searchText, limit } = getGlobalState()

  let { data, error } = await getDataOnLoadMore(searchText)

  if (error) throw new Error("Error while getting data on load more event")

  let range

  if (data.length >= limit) {
    range = limit
  } else {
    range = data.length

    //all the data has been fetched
    //hide the load more button

    hideLoadMoreBtn()
  }

  while (cardsDOM.firstChild) {
    cardsDOM.removeChild(cardsDOM.firstChild)
  }

  displayCards(data, range)
}

export async function renderUIOnFilter(mode) {
  disableFilterButtons()

  //reset limit
  resetLimit()

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

  //remove everything from the list
  while (cardsDOM.firstChild) {
    cardsDOM.removeChild(cardsDOM.firstChild)
  }

  displayCards(data, data.length)
  enableFilterButtons()
}
