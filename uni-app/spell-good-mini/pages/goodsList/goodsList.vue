<template>
	<view class="bg">
		<view class="goods">
			<view class="item" v-for="item in renderList" :key="item._id">
				<image :src="item.slider_image" mode=""></image>
				<div class="name">{{item.title}}</div>
				<view class="old">${{item.stockes[0].original||1999}}</view>
				<view class="new">${{item.stockes[0].price||999}}</view>
			</view>
		</view>
		<view class="end" v-if="isEnd">
			<text>没有更多</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodsArr: [],
				pagin: {
					pageNum: 1,
					pageSize: 3
				},
				options: {},
				isEnd:false
			};
		},
		async created() {
			// let groupGoods=await this.$http.httpSpellGoods.getGroupGoods()
			// this.goodsArr = groupGoods.data
		},
		onLoad(options) {
			this.getInfo(options)
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.getInfo(this.options)
		},
		// 滚动到底部
		onReachBottom() {
			console.log(this.pagin.pageNum);
			if (this.pagin.pageNum < this.totalPage) {
				this.pagin.pageNum++
			} else {
				this.isEnd = true
			}
		},
		computed: {
			totalPage() {
				// console.log('totalPage', Math.ceil(this.goodsArr.length / this.pagin.pageSize));
				return Math.ceil(this.goodsArr.length / this.pagin.pageSize)
			},
			renderList() {
				return this.goodsArr.slice(0, this.pagin.pageNum*this.pagin.pageSize)
			}
		},
		methods: {
			async getInfo(data) {
				let goodsArr = await this.$http.httpSpellGoods.getGoodLIst(data)
				this.goodsArr = goodsArr.data
				this.pagin.pageNum = 1
				this.options = data
				console.log('获取商品列表', goodsArr.data);
			}
		}
	}
</script>

<style lang="scss">
	.bg {
		background-color: #f5f5f5;
		height: 100%;
		overflow: auto;
	}

	.goods {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		margin: 20rpx;

		.item {
			margin: 10rpx 0;
			margin-right: 100rpx;
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