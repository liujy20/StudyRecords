import request from '@/http/request.js'
class HttpUser {
	login(data) {
		return request({
			url: 'http://124.70.54.24:3006/payment/wxLogin',
			method: 'POST',
			data
		})
	};
	getUserInfo() {
		return request({
			url: 'http://124.70.54.24:3006/payment/getUserinfo',
			method: 'GET',
		})
	};
	setUserInfo(data){
		return request({
			url: 'http://124.70.54.24:3006/payment/setUserinfo',
			method: 'POST',
			data
		})
	}
}

export default new HttpUser()