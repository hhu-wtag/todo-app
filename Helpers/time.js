export default function time(state) {
  let newTime = state.replace(/T.*/, "")

  newTime = newTime.slice(2, newTime.length).split("-").reverse().join("-")

  return newTime
}
