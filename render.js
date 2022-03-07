import { getAllDataFromDB } from "./dbCalls.js"
import { createCard } from "./domManipulation.js"

const cardsDOM = document.querySelector("#cards")

export async function renderUI() {
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

  data.forEach((item) => {
    card = createCard({
      itemId: item.id,
      title: item.title,
      createdAt: item.created_at,
    })

    cardsDOM.append(card)
  })
}
