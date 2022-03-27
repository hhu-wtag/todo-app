export function showSpinner(id) {
  const divCard = document.querySelector(`div[data-id="${id}"]`)
  const divSpinner = document.querySelector(
    `div[data-id="${id}"] > .spinner__container`
  )

  divCard.classList.add("lower__opacity")
  divSpinner.removeAttribute("hidden")
}

export function hideSpinner(id) {
  const divCard = document.querySelector(`div[data-id="${id}"]`)
  const divSpinner = document.querySelector(
    `div[data-id="${id}"] > .spinner__container`
  )

  divCard.classList.remove("lower__opacity")
  divSpinner.setAttribute("hidden", true)
}

export function showMainBodySpinner() {
  const divMainBody = document.querySelector(".main__body")
  const divSpinner = document.querySelector(".main_spinner__container")

  //TODO: when loading set different styles

  divSpinner.removeAttribute("hidden")
}

export function hideMainBodySpinner() {
  const divMainBody = document.querySelector(".main__body")
  const divSpinner = document.querySelector(".main_spinner__container")

  //TODO: when loading set different styles
  divSpinner.setAttribute("hidden", true)
}

export function showLoadMoreSpinner() {
  const spanLoadMore = document.querySelector(".loadMoreSpinner")

  spanLoadMore.removeAttribute("hidden")
}

export function hideLoadMoreSpinner() {
  const spanLoadMore = document.querySelector(".loadMoreSpinner")

  spanLoadMore.setAttribute("hidden", true)
}
