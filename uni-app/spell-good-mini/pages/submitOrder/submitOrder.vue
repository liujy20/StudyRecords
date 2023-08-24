<template>
	<view class="bg">
		<view class="address">
			<div class="content">
				<div class="item-left">
					<view class="user">
						<view class="name">
							测试
						</view>
						<view class="phone">
							13312341234
						</view>
					</view>
					<view class="sub">
						<text class="tag">[默认]</text>
						<text>成都市成都市成都市</text>
					</view>
				</div>
				<div class="item-right">
					<image src="../../static/images/more.jpg" mode=""></image>
				</div>
			</div>
		</view>

		<view class="goodsNum">
			<text>共{{allCount}}件商品</text>
		</view>
		<view class="good" v-for="item in payList" :key="item._id">
			<image :src="item.imgSrc" mode=""></image>
			<view class="info">
				<view class="name">
					<text>{{item.name}}
					</text>
				</view>
				<view class="tag">
					<text>{{item.type}}</text>
				</view>
				<view class="price">
					${{item.price*item.count}}
				</view>
			</view>

			<view class="num">
				<text>x{{item.count}}</text>
			</view>
		</view>

		<view class="coupon com">
			<text class="tag">优惠券</text>
			<text>请选择</text>
			<image src="../../static/images/more.jpg" mode=""></image>
		</view>
		<view class="integral com">
			<text class="tag">积分抵扣</text>
			<text>剩余积分</text>
			<text class="num">0</text>
			<label class="radio">
				<radio value="" /><text></text>
			</label>
		</view>
		<view class="invoice com">
			<text class="tag">开具发票</text>
			<text>不开发票</text>
			<image src="../../static/images/more.jpg" mode=""></image>
		</view>

		<view class="note">
			<view class="tit">
				备注说明
			</view>
			<textarea :value="note" placeholder="填写备注信息一百字以内" />
		</view>

		<view class="res">
			<view class="item">
				<text class="tit">商品总价</text>
				<text class="num">${{allPrice}}</text>
			</view>
			<view class="item">
				<text class="tit">积分抵扣</text>
				<text class="num">$0</text>
			</view>
		</view>

		<view class="all">
			<text class="total">合计</text>
			<text class="price">${{allPrice}}</text>
			<view class="pay" @click="pay">
				立即支付
			</view>
		</view>
		<view class="top">

		</view>
		<u-popup v-model="show" mode="bottom" closeable="true" close-icon-pos="top-left">
			<view class="wrap">
				<view class="title">
					<text>请输入支付密码</text>
				</view>
				<view class="name">
					快团团
				</view>
				<view class="price">
					${{allPrice}}
				</view>
				<view class="type">
					<text class="tag">支付方式</text>
					<text class="bank">中国农业银行&gt;</text>
				</view>
				<view class="inp">
					<u-message-input mode="bottomLine" :maxlength="6" v-model="note"></u-message-input>
				</view>
				<view class="keyboard">
					<u-keyboard :mask="false" ref="uKeyboard" mode="number" v-model="show" @change="inpPwd"
						@backspace="backspace" @confirm='submit'></u-keyboard>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				note: '',
				show: false,
				payList: []
			}
		},
		computed: {
			allCount() {
				let all = 0
				this.payList.forEach(item => {
					all += item.count
				})
				return all
			},
			allPrice() {
				let all = 0;
				this.payList.forEach(item => {
					console.log('item', item);
					all += item.count * item.price
				})
				return all
			},
		},
		methods: {
			pay() {
				this.show = true
			},
			inpPwd(val) {
				this.note += val;
			},
			// 退格键被点击
			backspace() {
				// 删除value的最后一个字符
				if (this.note.length) this.note = this.note.slice(0, this.note.length - 1);
			},
			async submit() {
				let id = uni.getStorageSync('prepare_id')
				let res = await this.$http.httpOrder.submitOrder({
					prepare_id: id,
					password:this.note
				})
				console.log('submit',res);
				if(res.code==200){
					uni.showToast({
						title:res.message
					})
					uni.navigateTo({
						url:'/pages/orderList/orderList'
					})
				}
			}
		},
		created() {
			let payList = uni.getStorageSync('payList')
			// console.log(payList);
			this.payList = payList
		},
	}
</script>

<style lang="scss">
	.bg {
		background-color: #f5f5f5;
		overflow: auto;
		padding-bottom: 200rpx;

		.address {
			height: 170rpx;
			background: linear-gradient(to bottom, #1cb3fb, #f5f5f5);
			overflow: hidden;

			.content {
				margin: 10rpx 20rpx;
				padding: 30rpx 30rpx;
				background-color: white;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.item-left {
					.user {
						display: flex;
						font-weight: bold;
						font-size: 30rpx;
						margin: 10rpx;
					}

					.sub {
						font-size: 24rpx;

						.tag {
							color: #1cb3fb;
						}
					}
				}

				.item-right {
					image {
						width: 15rpx;
						height: 30rpx;
					}
				}
			}
		}

		.goodsNum {
			height: 90rpx;
			line-height: 90rpx;
			padding: 0 30rpx;
			background-color: white;
		}

		.good {
			margin: 1rpx 0 10rpx;
			padding: 20rpx;
			display: flex;
			justify-content: space-between;
			background-color: white;

			image {
				width: 140rpx;
				height: 140rpx;
				margin-right: 10rpx;
			}

			.info {
				flex-grow: 1;
				width: 450rpx;

				.name {
					font-size: 26rpx;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}

				.tag {
					font-size: 16rpx;
					margin: 20rpx 0;
					color: #999;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}

				.price {
					font-size: 20rpx;
					color: red;
				}
			}

			.num {
				margin-left: 10rpx;
				font-size: 26rpx;
				color: #999;
			}
		}


		.com {
			margin-top: 1rpx;
			padding: 0 30rpx;
			display: flex;
			align-items: center;
			font-size: 28rpx;
			height: 90rpx;
			color: #999;
			background-color: white;

			.tag {
				color: #333;
				font-weight: bold;
				flex-grow: 1;
			}

			image {
				margin-left: 20rpx;
				width: 15rpx;
				height: 30rpx;
			}
		}

		.integral {
			.num {
				margin-right: 10rpx;
				color: red;
			}
		}

		.note {
			margin-top: 1rpx;
			padding: 30rpx;
			padding-right: 0;
			background-color: white;

			.tit {
				font-size: 28rpx;
				font-weight: bold;
				margin: 0 0 30rpx;
			}

			textarea {
				height: 150rpx;
				background-color: #f5f5f5;
				padding: 30rpx;
			}
		}


		.res {
			margin-top: 10rpx;
			background-color: white;
			padding: 0 30rpx;
			overflow: hidden;

			.item {
				margin: 30rpx 0;
				display: flex;

				.tit {
					flex-grow: 1;
					font-weight: bold;
				}

				.num {
					color: #999;
				}
			}
		}

		.all {
			position: fixed;
			bottom: 0;
			height: 100rpx;
			width: 100%;
			padding: 0 30rpx;
			background-color: white;
			display: flex;
			align-items: center;
			background-color: white;
			box-sizing: border-box;
			z-index: 9;

			.price {
				color: red;
				flex-grow: 1;
			}

			.pay {
				width: 240rpx;
				height: 70rpx;
				background-color: #1cb3fb;
				color: white;
				border-radius: 35rpx;
				line-height: 70rpx;
				text-align: center;
			}
		}

		.top {
			position: fixed;
			bottom: 300rpx;
			right: 30rpx;
			background-color: #1cb3fb;
			width: 80rpx;
			height: 80rpx;
			border-radius: 50%;
		}

		.wrap {
			text-align: center;
			height: 1100rpx;

			.title {
				height: 100rpx;
				line-height: 100rpx;
				font-weight: bold;
			}

			.name {
				margin: 40rpx 0 20rpx;
			}

			.price {
				font-weight: bold;
				font-size: 50rpx;
				margin-bottom: 50rpx;
			}

			.type {
				display: flex;
				justify-content: space-between;
				padding: 20rpx;
			}

			.inp {
				margin: 40rpx 0;
			}
		}
	}
</style>