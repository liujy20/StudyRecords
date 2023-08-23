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
			<text>共1件商品</text>
		</view>
		<view class="good">
			<image src="../../static/images/首页/1c72a02ad97f695bd85fa04821b72985.jpg" mode=""></image>
			<view class="info">
				<view class="name">
					<text>微星(MSI) GK50Z机械键盘红轴 微星(MSI)GK50Z机械键盘红轴
					</text>
				</view>
				<view class="tag">
					<text>【拼色】GK50Z灰白PBT键帽红轴 [拼色]GK50Z灰白PBT键帽红轴</text>
				</view>
				<view class="price">
					$199
				</view>
			</view>

			<view class="num">
				<text>x1</text>
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
					<text class="num">$100</text>
				</view>
				<view class="item">
					<text class="tit">积分抵扣</text>
					<text class="num">$100</text>
				</view>
			</view>
			
			<view class="all">
				<text class="total">合计</text>
				<text class="price">$10</text>
				<view class="pay" @click="show=true">
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
							$100.00
						</view>
						<view class="type">
							<text class="tag">支付方式</text>
							<text class="bank">中国农业银行&gt;</text>
						</view>
						<view class="inp">
							<u-message-input mode="bottomLine" :maxlength="6"></u-message-input>
						</view>
						<view class="keyboard">
							<u-keyboard :mask="false" ref="uKeyboard" mode="number" v-model="show"></u-keyboard>
						</view>
				</view>
				</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			note:'',
			show:true
			}
		},
		methods: {

		}
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
			.num{
				margin-left: 10rpx;
				font-size: 26rpx;
				color: #999;
			}
		}
	
	
	.com{
		margin-top: 1rpx;
		padding: 0 30rpx;
		display: flex;
		align-items: center;
		font-size: 28rpx;
		height: 90rpx;
		color: #999;
		background-color: white;
		.tag{
			color: #333;
			font-weight: bold;
			flex-grow: 1;
		}
		image{
			margin-left: 20rpx;
			width: 15rpx;
			height: 30rpx;
		}
	}
	.integral{
		.num{
			margin-right: 10rpx;
			color: red;
		}
	}
	.note{
		margin-top: 1rpx;
		padding: 30rpx;
		padding-right: 0;
		background-color: white;
		.tit{
			font-size: 28rpx;
			font-weight: bold;
			margin: 0 0 30rpx;
		}
		textarea{
			height: 150rpx;
			background-color: #f5f5f5;
			padding: 30rpx;
		}
	}
	
	
	.res{
		margin-top: 10rpx;
		background-color: white;
		padding: 0 30rpx;
		overflow: hidden;
		.item{
			margin: 30rpx 0;
			display: flex;
			.tit{
				flex-grow: 1;
				font-weight: bold;
			}
			.num{
				color: #999;
			}
		}
	}
	
	.all{
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
		.price{
			color: red;
			flex-grow: 1;
		}
		.pay{
			width: 240rpx;
			height: 70rpx;
			background-color: #1cb3fb;
			color: white;
			border-radius: 35rpx;
			line-height: 70rpx;
			text-align: center;
		}
	}
	.top{
		position: fixed;
		bottom: 300rpx;
		right: 30rpx;
		background-color: #1cb3fb;
		width: 	80rpx;
		height: 80rpx;
		border-radius: 50%;
	}
	
	.wrap{
		text-align: center;
		height: 1100rpx;
		.title{
			height: 100rpx;
			line-height: 100rpx;
			font-weight: bold;
		}
		.name{
			margin: 40rpx 0 20rpx;
		}
		.price{
			font-weight: bold;
			font-size: 50rpx;
			margin-bottom: 50rpx;
		}
		.type{
			display: flex;
			justify-content: space-between;
			padding: 20rpx;
		}
		.inp{
			margin: 40rpx 0;
		}
	}
	}
</style>