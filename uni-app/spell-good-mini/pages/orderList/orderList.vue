<template>
	<view class="bg">
		<view class="tit-bg">
			<view class="con">
				<view class="tit">
					<text>订单信息</text>
				</view>
				<view class="info">
					<text>消费订单: 2 总消费: $0</text>
				</view>
			</view>
			<image src="../../static/images/order.jpg" mode=""></image>
		</view>

		<view class="wrap">
			<view class="tits">
				<view class="item" v-for="i in 5">
					<view class="tit">
						代付款
					</view>

					<view class="num">
						1
					</view>
				</view>
			</view>
			<view class="con">
				<view class="top">
					<text class="time">2023-1-01 09:20:10</text>
					<text class="status">待发货</text>
				</view>
				<view class="bottom">
					<view class="item">
						<view class="main">
							<image src="../../static/images/首页/6c2338ffd2dd6def7b72ba8fceb2bf6f.jpg" mode=""></image>
							<view class="info">
								<text>
									机械键盘机械键盘机械键盘机械键盘机械键盘机械键盘机械键盘机械键盘机械键盘机械键盘机械键盘机械键盘机械键盘机械键盘
								</text>
							</view>
							<view class="num">
								<view class="price">
									$100
								</view>
								<view class="count">
									x10
								</view>
							</view>
						</view>
						<view class="all">
							<text>共1件商品, 总金额</text><text class="all-price">$100</text>
						</view>
						<div class="more">
							<view class="btn">
								<text>查看详情</text>
							</view>
						</div>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		methods: {}
	}
</script>

<style lang="scss">
	.bg {
		background-color: #f5f5f5;
		height: 100vh;

		.tit-bg {
			background-color: #1cb3fb;
			padding: 40rpx 30rpx 110rpx;
			display: flex;
			justify-content: space-between;

			.con {
				color: white;

				.tit {
					font-size: 34rpx;
				}

				.info {
					font-size: 26rpx
				}

			}

			image {
				width: 110rpx;
				height: 110rpx;
			}
		}

		.wrap {
			position: relative;
			margin-top: -100rpx;
			.tits {
				margin: 30rpx;
				margin-bottom: 0;
				padding: 30rpx;
				background-color: white;
				display: flex;
				justify-content: space-between;
				text-align: center;

				.tit {
					padding-bottom: 20rpx;
				}
			}

			.con {
				margin: 30rpx;
				margin-top: 0;
				padding: 20rpx 0;

				.top {
					background-color: white;
					padding: 20rpx;
					display: flex;
					justify-content: space-between;
					margin-bottom: 1rpx;

					.status {
						color: red;
					}
				}

				.bottom {
					.item {
						.main {
							display: flex;
							padding: 20rpx;
							background-color: white;

							image {
								width: 120rpx;
								height: 120rpx;
							}

							.info {
								
								flex-grow: 1;
								text{
									display: -webkit-box;
								-webkit-line-clamp: 2;
								-webkit-box-orient: vertical;
								overflow: hidden;
								text-overflow: ellipsis;
								width: 380rpx;
								}
								
							}

							.num {
								color: #ccc;
								text-align: right;
							}
						}

						.all {
							margin-bottom: 1rpx;

							padding: 0 20rpx 30rpx 0;
							text-align: right;
							background-color: white;

							.all-price {
								color: red;
							}
						}

						.more {
							padding: 20rpx;
							display: flex;
							justify-content: flex-end;
							background-color: white;

							.btn {
								width: 175rpx;
								height: 55rpx;
								background-color: #1cb3fb;
								line-height: 55rpx;
								border-radius: 27rpx;
								color: white;
								text-align: center;
							}
						}
					}
				}
			}
		}

	}
</style>