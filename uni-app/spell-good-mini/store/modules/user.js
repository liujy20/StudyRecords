export default {
	namespaced:true,
	state:{
		userInfo:{}
	},
	getters:{
		getUserInfo(state){
			return state.userInfo
		}
	},
	mutations:{
		setUserInfo(state,payload){
			state.userInfo=payload
		}
	},
	actions:{
		
	},
	modules:{
		
	}
}