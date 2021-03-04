const fetch = require('node-fetch')
const CONFIG = require('./../../config/config.js')
const KEYBOARDS = require('./keyboards/keyboards.js')
const { makeOrder, addOrder } = require('./../../lib/lib.js')

module.exports = async (cb) => {

	const [ key, identifier, , product_id ] = cb.data.split(':')

	try {
		const selectedProduct = await fetch(`${CONFIG.HOST}/bot/product/${identifier}`)

		const { data: [ product ] } = await selectedProduct.json()

		if(key === 'product') {

			const caption = `Tarkibi: ${product.product_info}\nNarxi: ${product.product_price} so'm` + '\n\n<b>Miqdorni tanlang</b>'

			bot.sendPhoto(
				cb.message.chat.id,
				product.product_image,
				{
					caption: caption,
					reply_markup: KEYBOARDS.replyMarkupOrderQuantity(product.product_id),
					parse_mode: 'html'
				}
			)

		} else if (key === 'order_quantity') {
			addOrder(cb, CONFIG, identifier, product_id)
		} else if (key === 'prev_menu') {
			makeOrder(cb.message.chat.id, CONFIG)
		}
	} catch(e) {
		console.log(e)
	}
}