import request from '@/http/request.js'
class HttpUser {
	login(code) {
		return request({
			url: 'http://124.70.54.24:3006/payment/wxLogin',
			method: 'POST',
			data: {
				code,
				appId: "wx551e6bcab932667d",
				appSecret: "b5ecc8cd86936a99f4c472a7e6fec48e"
			},
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