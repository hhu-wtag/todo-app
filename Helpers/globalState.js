export function updateGlobalState(state) {
  let oldState = localStorage.getItem("state")

  oldState = JSON.parse(oldState)

  let newState = {
    ...oldState,
    ...state,
  }

  localStorage.setItem("state", JSON.stringify(newState))
}

export function getGlobalState() {
  let globalState = null

  if (localStorage.getItem("state") === null) {
    globalState = {
      createCardIsOpened: false,
    }
    localStorage.setItem("state", JSON.stringify(globalState))
  } else {
    globalState = localStorage.getItem("state")
  }
  return JSON.parse(globalState)
}
