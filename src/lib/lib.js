function timeConverter(UNIX_timestamp){
  let a = new Date(UNIX_timestamp * 1000)
  a.toLocaleString('uz-UZ', { timeZone: 'Asia/Tashkent' })
  let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  let year = a.getFullYear()
  let monthLetter = months[a.getMonth()]
  let month = a.getMonth()
  let date = a.getDate()
  let hour = a.getHours()
  let min = a.getMinutes()
  let sec = a.getSeconds()
  let time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec 

  let customTime = `${year}-${(String(month + 1)).padStart(2, 0)}-${date} ${hour}-${min}-${sec}`

  return a
}

module.exports = {
  timeConverter,
}