import request from '@/http/request.js'
class HttpOrder{
	getCarList(){
		return request({
			url:'http://124.70.54.24:3006/payment/getAllgoods',
		})
	};
	prepayOrder(data){
		return request({
			url:'http://124.70.54.24:3006/payment/prepare',
			method:'POST',
			data
		})
	};
	submitOrder(data){
		return request({
			url:'http://124.70.54.24:3006/payment/pay',
			method:'POST',
			data
		})
	};
	getOrderList(data){
		return request({
			url:'http://124.70.54.24:3006/payment/getOrders',
			data
		})
	};
}
export default new HttpOrder()