export function showTooltip() {
  this.childNodes[1].classList.remove("hideTooltip")
}

export function hideTooltip() {
  this.childNodes[1].classList.add("hideTooltip")
}
