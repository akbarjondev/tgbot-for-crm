const fetch = require('node-fetch')

// callbacks
const callbackStart = require('./modules/callbacks/start.js')
const callbackOrder = require('./modules/callbacks/order.js')
const callbackContact = require('./modules/callbacks/contact.js')

// init bot
const run = (bot) => {
	global.bot = bot

	bot.onText(/\/start/, callbackStart)
	
	bot.on('contact', callbackContact)

	bot.onText(/🛒 Buyurtma qilish/, callbackOrder)

	// test
	bot.on('message', (msg) => {
		console.log(msg)
	})
}

module.exports.run = run
