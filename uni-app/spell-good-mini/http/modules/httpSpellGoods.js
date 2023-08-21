import request from '@/http/request.js'
class HttpSpellGoods {
	getGroupGoods() {
		return request({
			url: 'http://localhost:4001/home/groupGoods/get',
			method: 'POST',
		})
	}
	getGoodLIst(data) {
		return request({
			url: 'http://localhost:4001/home/goods/getGoods',
			method: 'POST',
			data: {
				goodsCategoryId: data.id
			}
		})
	}
}

export default new HttpSpellGoods()