const divToasts = document.querySelector(".toasts")

export function showToast(id, success) {
  const liToast = document.createElement("li")
  const spanToast = document.createElement("span")

  spanToast.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
<path d="M10.1425 0L4.5 5.7835L1.857 3.278L0 5.136L4.5 9.5L12 1.8575L10.1425 0Z" fill="white"/>
</svg>
  `
  liToast.id = id
  liToast.classList.add("toast", "animateToast")

  if (success) {
    liToast.classList.add("toast__success")
  } else {
    liToast.classList.add("toast__danger")
  }

  liToast.textContent = success
    ? "Changes are saved successfully"
    : "We couldn't save your changes"

  liToast.prepend(spanToast)

  divToasts.appendChild(liToast)

  removeToast(id, 2000)
}

function removeToast(id, delay) {
  setTimeout(function () {
    const liToast = document.getElementById(id)
    divToasts.removeChild(liToast)
  }, delay)
}
