export const updateGlobalState = (state) => {
  let oldState = JSON.parse(localStorage.getItem("state"))

  let newState = {
    ...oldState,
    ...state,
  }

  localStorage.setItem("state", JSON.stringify(newState))
}

export const updateEditDataById = (id, state) => {
  let editData = {}

  if (localStorage.getItem(id) === null) {
    editData = {
      ...state,
    }

    localStorage.setItem(id, JSON.stringify(editData))
  } else {
    let currentState = JSON.parse(localStorage.getItem(id))

    let newState = {
      ...currentState,
      ...state,
    }

    localStorage.setItem(id, JSON.stringify(newState))
  }
}

export const getEditDataById = (id) => {
  let data = localStorage.getItem(id)

  if (data) {
    return JSON.parse(data)
  } else {
    return data
  }
}

export const getGlobalState = () => {
  let globalState = null

  if (localStorage.getItem("state") === null) {
    globalState = {
      createCardIsOpened: false,
      limit: 10,
      limitValue: 10,
      searchText: "",
      title: "",
      activeFilter: "all",
    }
    localStorage.setItem("state", JSON.stringify(globalState))
  } else {
    globalState = localStorage.getItem("state")
  }
  return JSON.parse(globalState)
}

export const removeEditDataById = (id) => {
  if (localStorage.getItem(id) === null) return

  localStorage.removeItem(id)
}

export const resetGlobalState = () => {
  let state = JSON.stringify({
    createCardIsOpened: false,
    title: "",
    searchText: "",
    contentEditable: false,
    editModeOn: false,
    fetchingData: false,
    limit: 12,
    limitValue: 12,
    activeFilter: "all",
  })

  localStorage.setItem("state", state)
}

export const resetLimit = () => {
  let { limit, limitValue } = getGlobalState()

  //reset limit
  updateGlobalState({
    limit: limitValue,
  })
}
