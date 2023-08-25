<template>
	<view class="bg">
		<view class="user-bg">
			<view class="content">
				<view class="top">
					<template v-if="isLogin">
						<image class="avatar" :src="userInfo.avatarUrl" mode="" @click="changeImg"></image>
						<view class="info">
							<view class="name">{{userInfo.nickName}}</view>
							<view class="phone">123****321</view>
						</view>
					</template>
					<view class="btn" v-else>
						<button @click="loginUser">登录/注册</button>
					</view>
					<image class="sign-out" src="../../static/images/我的/退款.png" mode=""></image>
				</view>
				<view class="bottom">
					<view class="item">
						<view class="count">0</view>
						<view class="tit">余额</view>
					</view>
					<view class="item">
						<view class="count">1</view>
						<view class="tit">优惠券</view>
					</view>
					<view class="item">
						<view class="count">22</view>
						<view class="tit">积分</view>
					</view>
				</view>
			</view>
		</view>
		<view class="order">
			<div class="tit">
				<div class="main">订单中心</div>
				<div class="more">查看全部</div>
			</div>
			<div class="content">
				<view class="item">
					<view class="icon">
						<text>2</text>
					</view>
					<image src="../../static/images/我的/待付款.png" mode=""></image>
					<view class="name">
						<text>待付款</text>
					</view>
				</view>
				<view class="item">
					<view class="icon">
						<text>12</text>
					</view>
					<image src="../../static/images/我的/待发货.png" mode=""></image>
					<view class="name">
						<text>待发货</text>
					</view>
				</view>
				<view class="item">
					<image src="../../static/images/我的/待收货.png" mode=""></image>
					<view class="name">
						<text>待收货</text>
					</view>
				</view>
				<view class="item">
					<image src="../../static/images/我的/待评价.png" mode=""></image>
					<view class="name">
						<text>待评价</text>
					</view>
				</view>
				<view class="item">
					<image src="../../static/images/我的/退款.png" mode=""></image>
					<view class="name">
						<text>退款</text>
					</view>
				</view>
			</div>
		</view>
		<view class="charts-box">
			<qiun-data-charts type="column" :chartData="chartData1" />
		</view>
		  <view class="charts-box">
		    <qiun-data-charts 
		      type="pie"
		      :opts="opts"
		      :chartData="chartData2"
		    />
		  </view>
	</view>
</template>

<script>
	import {
		createNamespacedHelpers
	} from 'vuex';
	const {
		mapState,
		mapMutations
	} = createNamespacedHelpers("user");
	export default {
		data() {
			return {
				title: '用户界面',
				isLogin: false,
				chartData1: {},
				chartData2: {},
				opts: {
					color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4",
						"#ea7ccc"
					],
					padding: [5, 5, 5, 5],
					enableScroll: false,
					extra: {
						pie: {
							activeOpacity: 0.5,
							activeRadius: 10,
							offsetAngle: 0,
							labelWidth: 15,
							border: false,
							borderWidth: 3,
							borderColor: "#FFFFFF"
						}
					}
				}
			};
		},
		computed: {
			...mapState(['userInfo'])
		},
		async onLoad() {
			let token = uni.getStorageSync('token');
			if (token) {
				// this.loginUser()
				let userInfo = await this.$http.httpUser.getUserInfo()
				if (userInfo.user == undefined) {
					uni.showToast({
						title: "401"
					})
				} else {
					this.isLogin = true
					console.log('userInfo', userInfo.user);
					let obj = {
						nickName: userInfo.user.nickName,
						avatarUrl: userInfo.user.avatarUrl
					}
					this.setUserInfo(obj)
				}
			}

			this.getServerData1()
			this.getServerData2()
		},

		methods: {
			...mapMutations(['setUserInfo']),
			changeName() {

			},
			changeImg() {
				uni.chooseImage({
					success: ({
						tempFilePaths
					}) => {
						uni.uploadFile({
							url: 'http://124.70.54.24:3001/upload',
							filePath: tempFilePaths[0],
							name: 'file',
							success: async (uploadFileRes) => {
								let uploadRes = JSON.parse(uploadFileRes.data)
								console.log(uploadRes.data);
								this.userInfo.avatarUrl = uploadRes.data;
								let setRes = await this.$http.httpUser.setUserInfo(this.userInfo);
								console.log(setRes);
							}
						})
					}
				})
			},
			loginUser() {
				uni.login({
					success: async (res) => {
						console.log(res);
						let appInfo=JSON.parse(uni.getStorageSync('APPInfo'));
						let data={
							code:res.code,
							...appInfo,
						}
						let resToken = await this.$http.httpUser.login(data)
						uni.setStorageSync('token', resToken.token)
						let userInfo = await this.$http.httpUser.getUserInfo()
						console.log('userInfo', userInfo.user);

						if (!userInfo.user.nickName) {
							let obj = {
								nickName: 'xwg',
								avatarUrl: '../../static/logo.png'
							}
							this.setUserInfo(obj)
						} else {
							let obj = {
								nickName: userInfo.user.nickName,
								avatarUrl: userInfo.user.avatarUrl
							}
							this.setUserInfo(obj)
						}
						this.isLogin = true
					},
				})
			},

			getServerData1() {
				//模拟从服务器获取数据时的延时
				setTimeout(() => {
					let res = {
						categories: ["2016", "2017", "2018", "2019", "2020", "2021"],
						series: [{
								name: "目标值",
								data: [35, 36, 31, 33, 13, 34]
							},
							{
								name: "完成量",
								data: [18, 27, 21, 24, 6, 28]
							}
						]
					};
					this.chartData1 = JSON.parse(JSON.stringify(res));
				}, 500);
			},

			async getServerData2() {
				let orderListRes = await this.$http.httpOrder.getOrderList({})
				console.log(orderListRes.data);
				let data=orderListRes.data.reduce((arr,order)=>{
					let currentOrder=arr.find(item=>item.order_type==order.order_type)
					if(!currentOrder){
						arr.push({
							name:order.order_type?'已付款':'未付款',
							order_type:order.order_type,
							value:1
						})
					}else{
						currentOrder.value++
					}
					return arr
				},[])
				console.log(data);
				let res = {
					series: [{
						// 数据格式
						/*data: [{
							"name": "一班",
							"value": 50
						}, {
							"name": "二班",
							"value": 30
						}, {
							"name": "三班",
							"value": 20
						}, {
							"name": "四班",
							"value": 18
						}, {
							"name": "五班",
							"value": 8
						}],*/
						data
					}]
				};
				this.chartData2 = JSON.parse(JSON.stringify(res));
			}
		}
	}
</script>

<style lang="scss">
	.bg {
		height: 100vh;
		background-color: #f5f5f5;
	}

	.user-bg {
		background-color: #1cb3fb;
		height: 380rpx;
		overflow: hidden;

		.content {
			margin: 20rpx;
			overflow: hidden;

			.top {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 20rpx;
				margin-bottom: 30rpx;

				.avatar {
					width: 120rpx;
					height: 120rpx;
					border-radius: 50%;
				}

				.info {
					margin-left: 40rpx;
					color: white;
					flex-grow: 1;
				}

				.sign-out {
					margin-right: 80rpx;
					width: 30rpx;
					height: 30rpx;
				}
			}

			.bottom {
				display: flex;
				justify-content: space-around;
				color: white;

				.item {
					text-align: center;

					.count {
						font-weight: bold;
						font-size: 30rpx;
					}

					.tit {
						font-size: 24rpx;
						font-weight: 100;
					}
				}
			}
		}


	}

	.order {
		position: relative;
		background-color: white;
		margin: 20rpx;
		margin-top: -80rpx;
		padding: 40rpx 40rpx 25rpx;
		border-radius: 10rpx;

		.tit {
			display: flex;
			justify-content: space-between;
			margin-bottom: 50rpx;

			.main {
				font-size: 34rpx;
				font-weight: bold;
			}

			.more {
				font-size: 22rpx;
				color: #ccc;
			}
		}

		.content {
			display: flex;
			justify-content: space-around;

			.item {
				position: relative;
				text-align: center;

				.icon {
					position: absolute;
					top: -10rpx;
					right: -10rpx;
					width: 30rpx;
					height: 30rpx;
					background-color: red;
					color: white;
					font-size: 20rpx;
					text-align: center;
					line-height: 30rpx;
					border-radius: 50%;
				}

				image {
					width: 45rpx;
					height: 45rpx;
				}

				.name {

					font-size: 20rpx;
				}
			}
		}
	}

	.charts-box {
		width: 100%;
		height: 300px;
	}
</style>