import { updateGlobalState } from "./Helpers/globalState.js"
import { renderUI, renderUIOnFilter } from "./render.js"

export function handleFilterAll() {
  console.log("Filter All pressed")

  updateGlobalState({
    createCardIsOpened: false,
  })

  renderUI()
}

export function handleFilterInc() {
  console.log("Filter Incomplete pressed")

  updateGlobalState({
    createCardIsOpened: false,
  })

  renderUIOnFilter("inc")
}

export function handleFilterCom() {
  console.log("Filter Complete pressed")

  updateGlobalState({
    createCardIsOpened: false,
  })

  renderUIOnFilter("com")
}
