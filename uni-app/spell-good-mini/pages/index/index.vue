<template>
	<view class="content">
		<view class="module-swiper">
			<swiper class="swiper" circular :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
				<swiper-item v-for="item in swiperArr">
					<view class="swiper-item">
						<image :src="item.image_src" mode=""></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="module-nav module">
			<view class="item">
				<image src="../../static/images/首页/1c95120210910110636424.png" mode=""></image>
				<text>领优惠券</text>
			</view>
			<view class="item">
				<image src="../../static/images/首页/06c63d52fc6772917540d47076606680.png" mode=""></image>
				<text>拼团商品</text>
			</view>
			<view class="item">
				<image src="../../static/images/首页/02d9e202109101106364468.png" mode=""></image>
				<text>全部商品</text>
			</view>
			<view class="item">
				<image src="../../static/images/首页/d09d2286f960697ab7e1fb9d2595605f.png" mode=""></image>
				<text>促销商品</text>
			</view>
		</view>

		<view class="module module-spell">
			<view class="title">
				<view class="tit">
					拼团活动
				</view>
				<view class="more">
					更多&gt;
				</view>
			</view>
			<view class="content">
				<view class="item" v-for="item in 3">
					<image src="../../static/images/首页/1c72a02ad97f695bd85fa04821b72985.jpg" mode=""></image>
					<view class="name">
						大疆DJI御Mavic3
					</view>
					<view class="price">
						¥199.00
					</view>
					<view class="join">
						参与拼团
					</view>
				</view>
			</view>
		</view>

		<view class="type">
			<view class="item" :class="item==0?'active':''" v-for="item in 4">
				<view class="l-tit">
					首发新品
				</view>
				<view class="s-tit">
					最新出炉
				</view>
			</view>
		</view>

		<view class="goods">
			<view class="item" v-for="item in goodsArr">
				<image :src="item.mainImg" mode=""></image>
				<div class="name">{{item.intro}}</div>
				<view class="old">${{item.price}}</view>
				<view class="new">$999</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperArr: [],
				goodsArr: []
			}
		},
		onLoad() {

		},
		created() {
			uni.request({
				url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
				method: 'GET',
				success: (res) => {
					console.log('请求成功', res.data.message);
					this.swiperArr = res.data.message
				}
			});
			uni.request({
				url: 'http://localhost:4001/home/groupGoods/get',
				method: 'POST',
				success: (res) => {
					console.log('请求成功', res.data.data);
					this.goodsArr = res.data.data
				}
			});
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.content {
		background-color: #f5f5f5;
		overflow: hidden;

		.module-swiper {
			width: 690rpx;
			width: 100%;

			.swiper {
				height: 300rpx;
				margin: 20rpx;

				.swiper-item {
					display: block;
					height: 300rpx;
					line-height: 300rpx;
					text-align: center;


					image {
						width: 100%;
						height: 100%;
						border-radius: 20rpx;
					}
				}
			}
		}

		.module {
			margin: 20rpx;
			padding: 20rpx;
			display: flex;
			justify-content: space-between;
			background-color: #fff;
			border-radius: 20rpx;

		}

		.module-nav {
			.item {
				display: flex;
				flex-direction: column;
				align-items: center;

				image {
					width: 100rpx;
					height: 100rpx;
				}
			}
		}

		.module-spell {
			flex-direction: column;

			.title {
				width: 100%;
				display: flex;
				justify-content: space-between;

				.tit {
					font-weight: 600;
				}
			}

			.content {
				padding: 10rpx;
				background-color: #fff;
				display: flex;
				justify-content: space-between;

				.item {
					padding-top: 20rpx;
					width: 200rpx;
					box-shadow: 0 0 14rpx #ccc;
					border-radius: 10rpx;
					overflow: hidden;

					image {
						width: 200rpx;
						height: 200rpx;

					}

					.name {
						padding-left: 10rpx;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						font-size: 30rpx
					}

					.price {
						padding-left: 10rpx;
						color: $uni-color-primary;
						font-size: 25rpx;
						margin: 10rpx
					}

					.join {
						text-align: center;
						background-color: $uni-color-primary;
						color: $uni-text-color-inverse;
						font-size: 25rpx;
						height: 60rpx;
						line-height: 60rpx;
					}
				}
			}
		}

		.type {
			display: flex;
			justify-content: space-around;
			margin: 20rpx;
			padding: 20rpx;

			.item {
				.l-tit {
					font-weight: 600;
				}

				.s-tit {
					text-align: center;
					margin: 20rpx;
					font-size: 20rpx;
					line-height: 30rpx;
					padding: 0 10rpx;
					border-radius: 10rpx;
					color: #ccc;
				}
			}

			.active {
				color: #1cb3fb;

				.s-tit {
					color: #fff;
					background-color: #1cb3fb;
				}
			}
		}


		.goods {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			margin: 20rpx;

			.item {
				margin: 10rpx 0;
				padding: 0 0 20rpx;
				background-color: #fff;
				width: 340rpx;
				border-radius: 10rpx;

				image {
					width: 340rpx;
					height: 340rpx;
				}

				.name {
					width: calc(100% - 20rpx);
					margin-top: 20rpx;
					padding-left: 20rpx;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}

				.old {
					color: #ccc;
					font-size: 20rpx;
					text-decoration: line-through;
					margin-top: 20rpx;

					padding-left: 20rpx;
				}

				.new {
					margin-top: 20rpx;
					padding-left: 20rpx;
					color: #f24e14;
				}
			}
		}



	}
</style>