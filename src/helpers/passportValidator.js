export default (passportId, country) => {
  passportId = passportId.toUpperCase()
  const UNAMBIGUOUS_LETTERS = [
    "C",
    "F",
    "G",
    "H",
    "J",
    "K",
    "L",
    "M",
    "N",
    "P",
    "R",
    "T",
    "V",
    "W",
    "X",
    "Y",
    "Z"
  ]

  let passportChars = passportId.split("")

  if (country === "brazil" && passportId.length === 8) {
    if (
      !UNAMBIGUOUS_LETTERS.includes(passportChars[0]) ||
      !UNAMBIGUOUS_LETTERS.includes(passportChars[1])
    )
      return "the first two digits should be unambiguous letters"
    if (isNaN(passportId.substr(2, 8)))
      return "everything after the first two digits must be numbers"
  } else if (country === "france" && passportId.length === 9) {
    for (let passportChar of passportChars) {
      if (isAlpha(passportChar) && !UNAMBIGUOUS_LETTERS.includes(passportChar))
        return "contains ambiguous letter(s)."
      if (isNaN(passportChar) && !isAlpha(passportChar))
        return "contains non alpha-numeric digit(s)."
    }
  } else {
    return country === "brazil" && passportId.length < 8
      ? "too short."
      : country === "france" && passportId.length < 9
      ? "too short"
      : "too long"
  }
  return
}

function isAlpha(str) {
  return str.length === 1 && str.match(/[a-z]/i)
}
