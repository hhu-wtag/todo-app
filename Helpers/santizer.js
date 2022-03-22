const sanitizer = (input) => {
  const openingHTMLTagRegex = /(<[a-z]+>)/g
  const closingHTMLTagRegex = /<\/[a-z]+>/g
  const newLineRegex = /(\r|\n)/g

  let withTagsRemoved = input.trim().replaceAll(openingHTMLTagRegex, "")

  withTagsRemoved = withTagsRemoved.replaceAll(closingHTMLTagRegex, "")
  withTagsRemoved = withTagsRemoved.replaceAll(newLineRegex, "")

  return withTagsRemoved
}

export default sanitizer
