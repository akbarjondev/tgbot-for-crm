const fetch = require('node-fetch')

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

const addOrder = async (cb, CONFIG, identifier, product_id) => {

  try {
    /*qaysi mijoz ekanligini bilib olishimiz kerak*/
    const oneClient = await fetch(`${CONFIG.HOST}/bot/client/${cb.from.id}`)
    const oneClientRes = await oneClient.json()

    const body = {
      sale_product_count: Number(identifier), 
      product_id: product_id, 
      client_id: oneClientRes.data.client_id, 
      location_id: 0 //-- keyinchalik yuboriladi, qachonki user location yuborsa
    }

    /*buyurtmani qo'shish*/
    const addNewOrder = await fetch(`${CONFIG.HOST}/bot/order`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })

    /* location so'raymiz */
    bot.sendMessage(
      cb.from.id,
      '<b>Joylashuvingizni yuboring</b> 🗺📍',
      {
        parse_mode: 'html',
        reply_markup: JSON.stringify({
          keyboard: [
            [{ text: 'Joylashuvni yuborish 📍', request_location: true }]
          ],
          resize_keyboard: true
        })
      }
    )


  } catch(e) {
    console.log(e)
  }

}

module.exports = {
  makeOrder,
  addOrder
}