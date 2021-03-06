const fetch = require('node-fetch')
const CONFIG = require('./../../config/config.js')
const KEYBOARDS = require('./keyboards/keyboards.js')

module.exports = async (msg) => {
	if(msg.contact.user_id === msg.chat.id) {

		try {
			const body = {
				tg_user_id: msg.chat.id,
				tg_phone: msg.contact.phone_number
			}

		  const addClient = await fetch(`${CONFIG.HOST}/bot/clients`,
		  {
	      method: 'put',
	      body:    JSON.stringify(body),
	      headers: { 'Content-Type': 'application/json' }
	    })
		} catch(e) {
			console.log(e)
		}
	  
	  bot.sendMessage(
	  	msg.chat.id, 
	  	'Bulardan birini tanlang:',
	  	{
	  		reply_markup: KEYBOARDS.mainMenu
	  	}
	  )

	} else {
	  bot.sendMessage(msg.chat.id, 'Bu sizning raqamingiz emas!')
	}
}
