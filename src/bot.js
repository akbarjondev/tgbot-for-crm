const fetch = require('node-fetch')
const { timeConverter } = require('./lib/lib.js')

// callbacks
const callbackStart = require('./modules/callbacks/start.js')
const callbackOrder = require('./modules/callbacks/order.js')
const callbackContact = require('./modules/callbacks/contact.js')
const callbackQuery = require('./modules/callbacks/callbackQuery.js')

// init bot
const run = (bot) => {
	global.bot = bot

	bot.onText(/\/start/, callbackStart)
	
	bot.on('contact', callbackContact)

	bot.onText(/🛒 Buyurtma qilish/, callbackOrder)

	// callback
	bot.on('callback_query', callbackQuery)
}

module.exports.run = run
