const fetch = require('node-fetch')
const { timeConverter } = require('./lib/lib.js')
const clinetIO = require("socket.io-client")

// web socket
const socket = clinetIO('http://localhost:4002', { transports: ['websocket'] })

// callbacks
const callbackStart = require('./modules/callbacks/start.js')
const callbackOrder = require('./modules/callbacks/order.js')
const callbackContact = require('./modules/callbacks/contact.js')
const callbackQuery = require('./modules/callbacks/callbackQuery.js')
const locationCallbackQuery = require('./modules/callbacks/locationCallbackQuery.js')

// init bot
const run = (bot) => {
	global.bot = bot

	bot.onText(/\/start/, callbackStart)
	
	bot.on('contact', callbackContact)

	bot.onText(/🛒 Buyurtma qilish/, callbackOrder)

	// callback
	bot.on('callback_query', callbackQuery)

	//location
	bot.on('location', locationCallbackQuery)
}

socket.on('order_edited_bot', ({ client, status }) => {
	

	let bot_status

	switch (Number(status)) {
		case 1:
			// basket
			bot_status = 'Buyurtmangiz qabul qilindi 🌟'
			break;
		case 2:
			// coocking
			bot_status = 'Buyurtmangiz tayyorlanmoqda...♻️'
			break;
		case 3:
			// onway
			bot_status = 'Buyurtmangiz yo\'lda 🚕⚡️'
			break;
		case 4:
			// completed
			bot_status = 'Yoqimli ishtaha 🍲😋'
			break;
		case 5:
			// cancelled
			bot_status = 'Buyurtma bekor qilindi 🚫😕'
			break;	
	}

	bot.sendMessage(client.tg_user_id, bot_status)
})

module.exports.run = run
