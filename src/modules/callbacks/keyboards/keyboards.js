const replyMarkupOrderQuantity = {
	inline_keyboard: [
		[
			{ text: '1', callback_data: 'order_quantity:1' }, 
			{ text: '2', callback_data: 'order_quantity:2' }, 
			{ text: '3', callback_data: 'order_quantity:3' }, 
		],
		[
			{ text: '4', callback_data: 'order_quantity:4' }, 
			{ text: '5', callback_data: 'order_quantity:5' }, 
			{ text: '6', callback_data: 'order_quantity:6' }, 
		],
		[
			{ text: '7', callback_data: 'order_quantity:7' }, 
			{ text: '8', callback_data: 'order_quantity:8' }, 
			{ text: '9', callback_data: 'order_quantity:9' }, 
		],
	]
}

module.exports = {
	replyMarkupOrderQuantity,
}