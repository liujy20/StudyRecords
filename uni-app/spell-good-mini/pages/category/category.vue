<template>
	<view class="page">
		<view class="nav">
			<scroll-view scroll-y="true" class="scroll-view">

				<view class="scroll-view-item">
					家电2
				</view>
				<view class="scroll-view-item">
					家电3
				</view>
				<view class="scroll-view-item">
					家电4
				</view>
			</scroll-view>
		</view>

		<view class="list-box">
			<scroll-view class="scroll-right" :scroll-y="true" :scroll-into-view="scrollItemId"
				scroll-with-animation="true">
				<view class="category-item-list">
					<view class="list-title">
						数码
					</view>
					<view>

						<view class="list">
							<image width="30" class="item-img" src="../../static/logo.png"></image>
							<view>冰箱2</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				categories: [],
				curIndex: 0,
				scrollItemId: "item-0"
			}
		},
		async created() {

		},
		methods: {}
	}
</script>

<style lang="scss">
	.page {
		display: flex;
		flex-wrap: nowrap;
		height: 100vh;
		overflow: hidden;

		.nav {
			width: 200rpx;
			height: 100%;
			background-color: #fafafa;

			.scroll-view-item {
				font-size: 28rpx;
				text-align: center;
				line-height: 100rpx;
				font-weight: 500;

				&.active {
					background-color: red;
				}
			}

		}

		.list-box {
			flex-grow: 1;
			height: 100%;

			.scroll-right {
				height: 100%;
			}

			.category-item-list {
				padding-bottom: 1000rpx;

				.list-title {
					text-align: center;
					height: 60rpx;
					line-height: 60rpx;
					margin: 15rpx 0;
					color: #1296db;
					font-weight: bold;
				}

				.list {
					text-align: center;
					display: inline-flex;
					flex-direction: column;
					font-weight: 500;
					align-items: center;
					width: 200rpx;

					.item-img {
						width: 80rpx;
						height: 80rpx;
						margin-bottom: 20rpx;
					}
				}
			}
		}
	}
</style>