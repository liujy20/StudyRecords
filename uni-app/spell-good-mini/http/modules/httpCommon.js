import request from '@/http/request.js'
class HttpCommon{
	getSwiper(){
		return request({url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata'})
	}
}

export default new HttpCommon()