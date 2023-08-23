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
	</view>
</template>

<script>
	import {
		createNamespacedHelpers
	} from 'vuex';
	const {mapState,mapMutations} = createNamespacedHelpers("user"); 
	export default {
		data() {
			return {
				title: '用户界面',
				
				isLogin: false
			};
		},
		computed:{
			...mapState(['userInfo'])
		},
		onLoad() {
			let token = uni.getStorageSync('token');
			if (token) {
				this.loginUser()
			}

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
						let resToken = await this.$http.httpUser.login(res.code)
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
</style>