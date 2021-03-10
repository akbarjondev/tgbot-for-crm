const fetch = require('node-fetch')

const KEYBOARDS = require('./../modules/callbacks/keyboards/keyboards.js')

const sendProduct = async (cb, CONFIG, identifier) => {
  try {
    
    const selectedProduct = await fetch(`${CONFIG.HOST}/bot/product/${identifier}`)
      
    const { data: [ product ] } = await selectedProduct.json()

    const caption = `Tarkibi: ${product.product_info}\nNarxi: ${product.product_price} so'm` + '\n\n<b>Miqdorni tanlang</b>'

    bot.sendPhoto(
      cb.message.chat.id,
      product.product_image,
      {
        caption: caption,
        reply_markup: KEYBOARDS.replyMarkupOrderQuantity(product.product_id),
        parse_mode: 'html'
      }
    )

  } catch(e) {
    console.log(e)
  }
}

const makeOrder = async (chatId, CONFIG, inputText = '') => {

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

      const text = `${inputText ? inputText : '<b>Taomlardan birni tanlang</b> 👇'} <a href="https://telegra.ph/Xayrli-tong-02-24">​</a>`

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

    const allOrdersForBasket = await fetch(`${CONFIG.HOST}/bot/orders/${ oneClientRes.data.client_id }`)
    
    const { data: allOrders } = await allOrdersForBasket.json()

    let basketText = ''
    let sum = 0
    let product_count = 0

    allOrders.forEach(o => {

      sum += (o.product_price * o.sale_product_count)

      product_count += o.sale_product_count

      basketText += `${o.sale_product_count} ta - ${o.product_name}\n`

    })

    bot.sendMessage(
      cb.from.id,
      `
        <b>🛒 Savatchada:</b>\n\n${basketText}\n<b>Mahsulotlar:</b> ${sum} so'm\n<b>Yetkazib berish:</b> ${product_count >= 5 ? 'bepul' : '10 000 so\'m'}\n<b>Jami:</b> ${product_count >= 5 ? sum : sum + 10000} so'm
      `,
      {
        parse_mode: 'html',
        reply_markup: JSON.stringify({
          inline_keyboard: [
            [{ text: '🚖 Buyurtma qilaman', callback_data: 'lets_order' }],
            [
              { text: '🏃 Yana qo\'shaman', callback_data: 'continue_buying' },
              { text: '🧹 Savatni bo\'shat', callback_data: 'clean_basket' }
            ],
          ]
        })
      }
    )

    /* location so'raymiz */
    // bot.sendMessage(
    //   cb.from.id,
    //   '<b>Joylashuvingizni yuboring</b> 🗺📍',
    //   {
    //     parse_mode: 'html',
    //     reply_markup: JSON.stringify({
    //       keyboard: [
    //         [{ text: 'Joylashuvni yuborish 📍', request_location: true }]
    //       ],
    //       resize_keyboard: true
    //     })
    //   }
    // )


  } catch(e) {
    console.log(e)
  }

}

const deleteOrder = async (chatId, CONFIG) => {
  try {
    
    const oneClient = await fetch(`${CONFIG.HOST}/bot/client/${chatId}`)
    const { data } = await oneClient.json()

    // delete client orders in the basket
    const deleteOrders = await fetch(`${CONFIG.HOST}/bot/order`, {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: data.client_id
      })
    })

    console.log(await deleteOrders.json())

  } catch(e) {
    console.log(e)
  }

}

module.exports = {
  makeOrder,
  addOrder,
  sendProduct,
  deleteOrder,
}