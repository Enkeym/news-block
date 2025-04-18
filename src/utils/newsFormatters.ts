// utils/newsFormatters.ts
export const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  return {
    day: date.toLocaleString("en-GB", { day: "2-digit" }),
    month: date.toLocaleString("en-GB", { month: "short" }),
    year: date.toLocaleString("en-GB", { year: "numeric" })
  }
}

export const formatCompactNumber = (num: number): string => {
  if (num >= 1_000_000)
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M"
  if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K"
  return num.toString()
}

export const renderAuthors = (authors: string[]) => {
  const shortName = (full: string) => {
    const [first, last] = full.trim().split(" ")
    return `${first}${last ? ` ${last[0]}.` : ""}`
  }

  const formatted = authors.map(shortName)

  if (formatted.length === 1) return formatted[0]
  if (formatted.length === 2) return `${formatted[0]}, ${formatted[1]}`
  return `${formatted[0]}, ${formatted[1]}, et al.`
}

export const getFlagImage = (countryCode: string, size: number = 20) =>
  `https://flagcdn.com/w${size}/${countryCode.toLowerCase()}.png`

export type HighlightPart = {
  text: string
  isKeyword: boolean
}

export const parseHighlightParts = (highlight: string): HighlightPart[] => {
  const parts = highlight.split(/(<kw>.*?<\/kw>)/g)

  return parts
    .filter((part) => part.length > 0)
    .map((part) => {
      const isKeyword = part.startsWith("<kw>") && part.endsWith("</kw>")
      const text = isKeyword ? part.replace(/<\/?kw>/g, "") : part
      return { text, isKeyword }
    })
}

export const truncateHighlightParts = (
  parts: HighlightPart[],
  maxLength: number
): HighlightPart[] => {
  const result: HighlightPart[] = []
  let totalLength = 0

  for (const part of parts) {
    if (totalLength >= maxLength) break

    const remaining = maxLength - totalLength
    const cutText =
      part.text.length > remaining ? part.text.slice(0, remaining) : part.text

    result.push({
      ...part,
      text: cutText
    })

    totalLength += cutText.length
  }

  return result
}
