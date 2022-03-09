import { disableFilterButtons, enableFilterButtons } from "./buttonStates.js"
import { getAllDataFromDB, getFilterdData } from "./dbCalls.js"
import { createCard } from "./domManipulation.js"
import { updateGlobalState } from "./Helpers/globalState.js"

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
  disableFilterButtons(true, true, true, true) // disable all three filter buttons

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

  let card = null

  displayCards(data)

  enableFilterButtons()
}

export async function renderUIOnSearch(data) {
  disableFilterButtons(true, true, true, true)
  //remove everything from the list
  while (cardsDOM.firstChild) {
    cardsDOM.removeChild(cardsDOM.firstChild)
  }

  displayCards(data)
  enableFilterButtons()
}

export async function renderUIOnFilter(mode) {
  disableFilterButtons(true, true, true, true)
  //remove everything from the list
  while (cardsDOM.firstChild) {
    cardsDOM.removeChild(cardsDOM.firstChild)
  }

  let data = null

  if (mode === "inc") {
    //show only the incomplete data

    let response = await getFilterdData(false)

    if (response.error)
      throw new Error("Error while fetching incomplete filtered data")

    data = response.data
  } else {
    let response = await getFilterdData(true)

    if (response.error)
      throw new Error("Error while fetching complete filtered data")

    data = response.data
  }

  displayCards(data)
  enableFilterButtons()
}
