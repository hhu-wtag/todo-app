export default function sanitizer(input) {
  const firstRegEx = /(<[a-z]+>)/g
  const secondRegEx = /<\/[a-z]+>/g
  const newLineRegEx = /(\r|\n)/g

  let withTagsRemoved = input.trim().replaceAll(firstRegEx, "")

  withTagsRemoved = withTagsRemoved.replaceAll(secondRegEx, "")
  withTagsRemoved = withTagsRemoved.replaceAll(newLineRegEx, "")

  return withTagsRemoved
}
