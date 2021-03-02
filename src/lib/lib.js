const fetch = require('node-fetch')

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

const makeOrder = async (chatId, CONFIG) => {

  try {
    const allReservedProducts = await fetch(`${CONFIG.HOST}/bot/products`)

    const { status, data } = await allReservedProducts.json()

    if(status === 200) {

      let inlineKeyboard = []
      let buttonsRow = []

      for (let i = 0; i < data.length; i++) {
        buttonsRow.push({ text: data[i].product_name, callback_data: 'product:' + data[i].product_id })
        
        if(buttonsRow.length === 3) {
          inlineKeyboard.push([...buttonsRow])
          buttonsRow.length = 0
        }

        if((data.length - 1) === i) {
          inlineKeyboard.push([...buttonsRow])
        }
      }

      const text = `Taomlardan birni tanlang <a href="https://telegra.ph/Xayrli-tong-02-24">​</a>`

      bot.sendMessage(
        chatId,
        text,
        {
          parse_mode: 'html',
          reply_markup: JSON.stringify({
            inline_keyboard: inlineKeyboard
          })
        }
      )

    }
  } catch(e) {
    console.log(e)
  }
}

module.exports = {
  timeConverter,
  makeOrder
}