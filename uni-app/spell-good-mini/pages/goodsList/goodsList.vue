<template>
	<view class="bg">
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
import { create } from 'domain';
	export default {
		data() {
			return {
			goodsArr:[]
			};
		},
		async created(){
			let groupGoods=await this.$http.httpSpellGoods.getGroupGoods()
			this.goodsArr = groupGoods.data
		}
	}
</script>

<style lang="scss">
	.bg{
		background-color: #f5f5f5;
		height: 100vh;
		overflow: hidden;
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
</style>