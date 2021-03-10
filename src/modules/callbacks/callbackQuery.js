const fetch = require('node-fetch')

const CONFIG = require('./../../config/config.js')
const { makeOrder, addOrder, sendProduct, makeStatusOrder } = require('./../../lib/lib.js')

module.exports = async (cb) => {
	const [ key, identifier, , product_id ] = cb.data.split(':')

	// eski tarixni tozalaymiz
	bot.deleteMessage(cb.from.id, cb.message.message_id)

	try {

		if(key === 'product') {

			sendProduct(cb, CONFIG, identifier)
		
		} else if (key === 'order_quantity') {
		
			addOrder(cb, CONFIG, identifier, product_id)
		
		} else if (key === 'prev_menu') {
		
			makeOrder(cb.from.id, CONFIG)
		
		} else if (key === 'clean_basket') {

			makeStatusOrder(cb.from.id, CONFIG, 5, 0)

			makeOrder(cb.from.id, CONFIG, 'Savatcha tozalandi! 🙄\n\n<b>Yana taomnomadan tanlashingiz mumkin</b> 😊')

		} else if (key === 'continue_buying') {

			makeOrder(cb.from.id, CONFIG)
						
		} else if(key === 'lets_order') {

			makeStatusOrder(cb.from.id, CONFIG, 1, 0)

		}

	} catch(e) {
		console.log(e)
	}
}
