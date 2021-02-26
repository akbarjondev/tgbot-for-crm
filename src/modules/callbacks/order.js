const fetch = require('node-fetch')
const CONFIG = require('./../../config/config.js')

module.exports = async (msg) => {
	
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
    		msg.chat.id,
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
