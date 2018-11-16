
export default (passportId, country) => {
    const UNAMBIGUOUS_LETTERS = ['C', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'R', 'T', 'V', 'W', 'X', 'Y', 'Z']
    
    if(country === 'brazil' && passportId.length === 8) {
      let passportChars = passportId.split('')
      if(
        UNAMBIGUOUS_LETTERS.includes(passportChars[0]) 
        && UNAMBIGUOUS_LETTERS.includes(passportChars[1])
        && !isNaN(passportId.substr(2, 8))) {
          return true
        } 
    } else if(country === 'france' && passportId.length === 9) {
      let passportChars = passportId.split('')
      let i = 0

      for(; i < passportChars.length && (UNAMBIGUOUS_LETTERS.includes(passportChars[i]) || !isNaN(passportChars[i])); i++);
      if(i === passportChars.length) return true
    }

    return false
  }
