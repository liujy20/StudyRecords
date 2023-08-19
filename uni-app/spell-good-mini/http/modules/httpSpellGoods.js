import request from '@/http/request.js'
class HttpSpellGoods {
	getGroupGoods() {
		return request({
			url: 'http://localhost:4001/home/groupGoods/get',
			method: 'POST',
		})
	}
}

export default new HttpSpellGoods()