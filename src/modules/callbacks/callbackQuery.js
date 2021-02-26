const fetch = require('node-fetch')
const CONFIG = require('./../../config/config.js')
const KEYBOARDS = require('./keyboards/keyboards.js')

module.exports = async (cb) => {

	const [ key, id ] = cb.data.split(':')

	try {
		const selectedProduct = await fetch(`${CONFIG.HOST}/bot/product/${id}`)

		const { data: [ product ] } = await selectedProduct.json()

		if(key === 'product') {

			bot.sendPhoto(
				cb.message.chat.id,
				product.product_image,
				{
					caption: product.product_info,
					reply_markup: KEYBOARDS.replyMarkupOrderQuantity
				}
			)
			
		} else if (key === 'order_quantity') {
			
		}
	} catch(e) {
		console.log(e)
	}
}