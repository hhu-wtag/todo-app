export default function sanitizer(input) {
  const firstRegEx = /(<[a-z]+>)/g
  const secondRegEx = /<\/[a-z]+>/g

  let withTagsRemoved = input.replaceAll(firstRegEx, "")
  withTagsRemoved = withTagsRemoved.replaceAll(secondRegEx, "")

  return withTagsRemoved
}
