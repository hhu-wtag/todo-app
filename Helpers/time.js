export function convertTime(state) {
  let newTime = state.replace(/T.*/, "")

  return newTime.slice(2, newTime.length).split("-").reverse().join(".")
}

export function completedInDays(createdAt) {
  let todoAddTime = createdAt
    .replace(/Created At: /, "")
    .split(".")
    .reverse()
    .join("-")

  let todoFinishTime = new Date().toISOString().replace(/T.*/, "")

  todoAddTime = `20${todoAddTime}`

  let date1 = new Date(todoAddTime)
  let date2 = new Date(todoFinishTime)

  let days = date2 - date1

  return days
}
