export function updateGlobalState(state) {
  let oldState = localStorage.getItem("state")

  oldState = JSON.parse(oldState)

  let newState = {
    ...oldState,
    ...state,
  }

  localStorage.setItem("state", JSON.stringify(newState))
}

export function updateEditDataById(id, state) {
  let editData = {}

  if (localStorage.getItem(id) === null) {
    editData = {
      ...state,
    }

    localStorage.setItem(id, JSON.stringify(editData))
  } else {
    let currentState = localStorage.getItem(id)

    currentState = JSON.parse(currentState)

    let newState = {}

    newState = {
      ...currentState,
      ...state,
    }

    localStorage.setItem(id, JSON.stringify(newState))
  }
}

export function getEditDataById(id) {
  let data = localStorage.getItem(id)

  if (data) {
    return JSON.parse(data)
  } else {
    return data
  }
}

export function getGlobalState() {
  let globalState = null

  if (localStorage.getItem("state") === null) {
    console.log("here")
    globalState = {
      createCardIsOpened: false,
      limit: 10,
      limitValue: 10,
      searchText: "",
      title: "",
    }
    localStorage.setItem("state", JSON.stringify(globalState))
  } else {
    globalState = localStorage.getItem("state")
  }
  return JSON.parse(globalState)
}

export function removeEditDataById(id) {
  if (localStorage.getItem(id) === null) return

  localStorage.removeItem(id)
}

export function resetGlobalState() {
  let state = {
    createCardIsOpened: false,
    title: "",
    searchText: "",
    contentEditable: false,
    editModeOn: false,
    fetchingData: false,
    limit: 10,
    limitValue: 10,
  }

  state = JSON.stringify(state)

  localStorage.setItem("state", state)
}

export function resetLimit() {
  let { limit, limitValue } = getGlobalState()

  //reset limit
  updateGlobalState({
    limit: limitValue,
  })
}
