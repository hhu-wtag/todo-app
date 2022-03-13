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
