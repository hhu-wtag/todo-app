import { updateGlobalState } from "./Helpers/globalState.js"
import { renderUI, renderUIOnFilter } from "./render.js"

export function handleFilterAll() {
  updateGlobalState({
    createCardIsOpened: false,
  })

  renderUIOnFilter("all")
}

export function handleFilterInc() {
  updateGlobalState({
    createCardIsOpened: false,
  })

  renderUIOnFilter("inc")
}

export function handleFilterCom() {
  updateGlobalState({
    createCardIsOpened: false,
  })

  renderUIOnFilter("com")
}
