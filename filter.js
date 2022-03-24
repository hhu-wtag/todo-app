import { activeFilterButtonUI } from "./buttonStates.js"
import { updateGlobalState } from "./Helpers/globalState.js"
import { renderUIOnFilter } from "./render.js"

export const handleFilterAll = () => {
  updateGlobalState({
    createCardIsOpened: false,
    activeFilter: "all",
  })

  activeFilterButtonUI("all")

  renderUIOnFilter("all")
}

export const handleFilterInc = () => {
  updateGlobalState({
    createCardIsOpened: false,
    activeFilter: "inc",
  })

  activeFilterButtonUI("inc")

  renderUIOnFilter("inc")
}

export const handleFilterCom = () => {
  updateGlobalState({
    createCardIsOpened: false,
    activeFilter: "com",
  })

  activeFilterButtonUI("com")

  renderUIOnFilter("com")
}
