import { updateGlobalState } from "../Helpers/globalState.js"

import sanitizer from "../Helpers/santizer.js"

import { createCard } from "../domManipulation.js"

import { getGlobalState } from "../Helpers/globalState.js"

import { insertDataToDB } from "../dbCalls.js"

const cardsDOM = document.querySelector("#cards")

export async function handleIntialAddTask(event) {
  console.log("Initial Add Task Button Pressed !")

  let { title } = getGlobalState()

  //sanitize title

  let sanitizedTitle = sanitizer(title)

  if (sanitizedTitle === "") return

  //add state to db
  let { error, data } = await insertDataToDB({
    title: sanitizedTitle,
  })

  if (error) {
    console.error(error)
    return
  }

  let { created_at, id, title: titleFromDB } = data[0]

  //create a card to append it to the cardsDOM
  let card = createCard({
    itemId: id,
    title: titleFromDB,
    createdAt: created_at,
  })

  //remove the intialCard that was added for data adding purpose

  cardsDOM.removeChild(cardsDOM.firstElementChild)

  //append the newly created card
  cardsDOM.prepend(card)

  updateGlobalState({
    createCardIsOpened: false,
    title: "",
  })
}

export function handleInputField(e) {
  const value = e.target.value

  updateGlobalState({
    title: value,
  })
}
