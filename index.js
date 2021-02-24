const TelegramBot = require('node-telegram-bot-api')
const { run } = require('./src/bot.js')

// @asoschibot's token
const token = '873941534:AAElt0ZalpjrDe1XhVCjhZa2f8NmarKtqas'

const bot = new TelegramBot(token, {polling: true})

run(bot)
