const fetch = require('node-fetch')
const CONFIG = require('./../../config/config.js')

module.exports = async (res) => {

	try {

		/*qaysi mijoz ekanligini bilib olishimiz kerak*/
    const oneClient = await fetch(`${CONFIG.HOST}/bot/client/${res.from.id}`)
    const oneClientRes = await oneClient.json()

		const body = {
			client_id: oneClientRes.data.client_id,
			latitude: res.location.latitude,
			longitude: res.location.longitude
		}

		/*mijoz yuborgan locationni saqlash*/
		const addUserLocation = await fetch(`${CONFIG.HOST}/bot/locations`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })

    console.log(await addUserLocation.json())

	} catch(e) {
		console.log(e)
	}
}