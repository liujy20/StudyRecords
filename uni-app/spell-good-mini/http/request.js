export default function request(option={}){
	uni.showLoading({
		mask:false,
		title:"加载中..."
	})
	return new Promise(function(resolve,reject){
		uni.request({
			method:"GET",
			header:{
				Authorization:uni.getStorageSync('token')
			},
			...option,
			success(res){
				resolve(res.data)
			},
			fail: (res) => {
				console.log('fail',res);
				reject(res)
				
			},
			complete() {
				uni.hideLoading()
			}
		})
	})
}