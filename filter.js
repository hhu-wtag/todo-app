import { updateGlobalState } from "./Helpers/globalState.js"
import { renderUI, renderUIOnFilter } from "./render.js"

export function handleFilterAll() {
  updateGlobalState({
    createCardIsOpened: false,
    activeFilter: "all",
  })

  renderUIOnFilter("all")
}

export function handleFilterInc() {
  updateGlobalState({
    createCardIsOpened: false,
    activeFilter: "inc",
  })

  renderUIOnFilter("inc")
}

export function handleFilterCom() {
  updateGlobalState({
    createCardIsOpened: false,
    activeFilter: "com",
  })

  renderUIOnFilter("com")
}
