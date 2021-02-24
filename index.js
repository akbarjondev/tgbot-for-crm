const TelegramBot = require('node-telegram-bot-api')
const CONFIG = require('./src/config/config.js')
const { run } = require('./src/bot.js')

// @asoschibot's token
const token = CONFIG.TOKEN

const bot = new TelegramBot(token, {polling: true})

run(bot)
