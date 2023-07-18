export const formatDate = (date) => {
  if (date) {
    const number = date.toString()
    const year = number.slice(0, 4)
    const month = (parseInt(number.slice(4, 6))+1)
    const day = number.slice(6)
  
    const newDate = new Date(`${year}-${month}-${day}`)
    
    const formatter =  Intl.DateTimeFormat('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).formatToParts(newDate)
  
    const formattedDate = `${formatter[4].value}-${formatter[0].value}-${formatter[2].value}`;
  
    return formattedDate
  }
}