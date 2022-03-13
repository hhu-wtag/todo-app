const divToasts = document.querySelector(".toasts")

export function showToast(id, success) {
  const liToast = document.createElement("li")
  liToast.id = id
  liToast.classList.add("toast")
  liToast.textContent = success
    ? "Changes are saved successfully"
    : "We couldn't save your changes"

  divToasts.appendChild(liToast)

  removeToast(id, 2000)
}

function removeToast(id, delay) {
  setTimeout(function () {
    const liToast = document.getElementById(id)
    divToasts.removeChild(liToast)
  }, delay)
}
