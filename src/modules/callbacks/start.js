const fetch = require('node-fetch')
const CONFIG = require('./../../config/config.js')

module.exports = async (msg, match) => {
  
	try {
		const body = {
			tg_user_id: msg.chat.id,
			tg_first_name: msg.chat.first_name,
			tg_last_name: msg.chat.last_name,
			tg_username: msg.chat.username
		}

	  const addClient = await fetch(`${CONFIG.HOST}/bot/clients`,
	  {
      method: 'post',
      body:    JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' }
    })

	} catch(e) {
		console.log(e)
	}

  bot.sendMessage(
  	msg.chat.id,
  	`Assalomu alaykum  ${msg.chat.first_name} 😊\n<b>Iltimos telefon raqamingizni tugma orqali yuboring!</b>`, 
  	{ 
  		parse_mode: 'html',
  		reply_markup: {
  			keyboard: [
  				[{ text: 'Telefoningiz ☎️', request_contact: true }]
  			],
  			resize_keyboard: true
  		}
  	}
  )
}
