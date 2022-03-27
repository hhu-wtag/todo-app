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

  todoAddTime = `20${todoAddTime}`

  const todoFinishTime = new Date().toISOString().replace(/T.*/, "")

  const date1 = new Date(todoAddTime)
  const date2 = new Date(todoFinishTime)

  return date2 - date1
}
