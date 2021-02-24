const fetch = require('node-fetch')
const CONFIG = require('./../../config/config.js')

module.exports = async (msg) => {
	
	try {
		// statements
	} catch(e) {
		// statements
		console.log(e);
	}

	const text = `Taomlardan birni tanlang <a href="https://telegra.ph/Xayrli-tong-02-24">​</a>`

	bot.sendMessage(
		msg.chat.id,
		text,
		{
  		parse_mode: 'html',
  		reply_markup: JSON.stringify({
  			inline_keyboard: [
  				[
  					{ text: 'Sudak', callback_data: 'su' },
  					{ text: 'KFC', callback_data: 'kfc' },
  					{ text: 'Teftel', callback_data: 'tef' }
  				],
  				[
  					{ text: "Go'shtsay", callback_data: 'gosh' },
  					{ text: "Qo'ziqorinli tovuq", callback_data: 'qt' },
  					{ text: 'Kiyev kotleti', callback_data: 'kk' }
  				],
  				[
  					{ text: "Pishloq go'shtli kotlet", callback_data: 'pgk' },
  				],
  			]
  		})
		}
	)

}
