const fetch = require('node-fetch')
const CONFIG = require('./../../config/config.js')
const { makeOrder } = require('./../../lib/lib.js')

module.exports = async (msg) => {
	
  makeOrder(msg.chat.id, CONFIG)
	
}
