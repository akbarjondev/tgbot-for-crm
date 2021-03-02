const replyMarkupOrderQuantity = (product_id = 0) => ({
	inline_keyboard: [
		[
			{ text: `1`, callback_data: `order_quantity:1:product_id:${product_id}` }, 
			{ text: `2`, callback_data: `order_quantity:2:product_id:${product_id}` }, 
			{ text: `3`, callback_data: `order_quantity:3:product_id:${product_id}` }, 
		],
		[
			{ text: `4`, callback_data: `order_quantity:4:product_id:${product_id}` }, 
			{ text: `5`, callback_data: `order_quantity:5:product_id:${product_id}` }, 
			{ text: `6`, callback_data: `order_quantity:6:product_id:${product_id}` }, 
		],
		[
			{ text: `7`, callback_data: `order_quantity:7:product_id:${product_id}` }, 
			{ text: `8`, callback_data: `order_quantity:8:product_id:${product_id}` }, 
			{ text: `9`, callback_data: `order_quantity:9:product_id:${product_id}` }, 
		],
		[
			{ text: `🏠 Bosh menyu`, callback_data: `prev_menu:0` }, 
		]
	]
})

module.exports = {
	replyMarkupOrderQuantity,
}