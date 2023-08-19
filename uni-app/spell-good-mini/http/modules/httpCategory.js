import request from '@/http/request.js'
class HttpCategory{
	getCategory(){
		return request({
			url:'http://localhost:4001/home/goodsCategory/getAll'
		})
	}
}

export default new HttpCategory()