<template>
	<view class="bg">
		<view class="module-swiper">
			<swiper class="swiper" circular :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
				<swiper-item v-for="item in swiperArr">
					<view class="swiper-item">
						<image :src="item.image_src" mode=""></image>
					</view>
				</swiper-item>
			</swiper>
		</view>

		<view class="imgs">
			<view class="line-left">

			</view>
			<view class="imgList">
				<view class="item">
					<image src="../../static/images/首页/132 (1).png" mode=""></image>
				</view>
				<view class="item">
					<image src="../../static/images/我的/头像.png" mode=""></image>
				</view>
				<view class="item">
					<image src="../../static/images/我的/头像.png" mode=""></image>
				</view>
			</view>
			<view class="count">
				<text>395人参与</text>
			</view>
			<view class="line-right">

			</view>
		</view>

		<view class="goodsList">
			<view class="item" v-for="item in goodsArr" :key="item._id">
				<image :src="item.mainImg" mode=""></image>
				<view class="info">
					<view class="name">
						<text>{{item.intro}}</text>
					</view>
					<view class="content">
						<view class="price">
							<view class="old">$1000</view>
							<view class="new">${{item.price}}</view>
						</view>
						<view class="btn">
							<image src="../../static/images/首页/btn.jpg" mode=""></image>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperArr:[],
				goodsArr: []
			};
		},
		async created() {
			let swiperRes=await this.$http.httpCommon.getSwiper()
			this.swiperArr = swiperRes.message
			let groupGoods=await this.$http.httpSpellGoods.getGroupGoods()
			this.goodsArr = groupGoods.data
		}
	}
</script>

<style lang="scss">
	.bg {
		background-color: #1cb3fb;
		height: 100vh;
		overflow: auto;

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

		.imgs {
			display: flex;
			align-items: center;
			justify-content: center;

			.line-left {
				height: 2rpx;
				width: 120rpx;
				background: linear-gradient(to right, #1cb3fb, #fff);
			}

			.imgList {
				margin: 0 10rpx 0 40rpx;
				display: flex;

				.item {
					position: relative;
					margin-left: -10rpx;

					image {
						border-radius: 50%;
						width: 45rpx;
						height: 45rpx;
					}
				}
			}

			.count {
				margin: 0 20rpx;
				color: #fff;
				font-size: 20rpx
			}

			.line-right {
				height: 2rpx;
				width: 120rpx;
				background: linear-gradient(to left, #1cb3fb, #fff);
			}
		}

		.goodsList {
			margin: 20rpx;

			.item {
				background-color: #fff;
				border-radius: 10rpx;
				padding: 30rpx 20rpx;
				display: flex;
				margin-bottom: 20rpx;
				image {

					width: 200rpx;
					height: 200rpx;
				}

				.info {
					width: 430rpx;

					.name {
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
						overflow: hidden;
						text-overflow: ellipsis;
					}

					.content {
						display: flex;
						justify-content: space-between;
						align-items: flex-end;

						.price {
							margin: 20rpx;

							.old {
								color: #999;
								text-decoration: line-through;
								font-size: 20rpx
							}

							.new {
								color: #f24e14;
								font-size: 30rpx
							}
						}

						.btn {
							image {
								width: 230rpx;
								height: 60rpx;
							}
						}
					}
				}
			}
		}

	}
</style>