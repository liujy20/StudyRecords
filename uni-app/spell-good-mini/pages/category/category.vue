<template>
	<view class="page">
		<view class="nav">
			<scroll-view scroll-y="true" class="scroll-view">

				<view class="scroll-view-item" :class="index==curIndex?'active':''" v-for="(item,index) in categories"
					:key="item._id" @click="changeCur(index)">
					{{item.title}}
				</view>
			</scroll-view>
		</view>

		<view class="list-box">
			<scroll-view @scroll="scrollChange" class="scroll-right" :scroll-y="true" :scroll-into-view="scrollItemId"
				scroll-with-animation="true">
				<view class="category-item-list" v-for="(item,index) in categories" :key="item._id" :id="'item-'+index">
					<view class="list-title">
						{{item.title}}
					</view>
					<view>
						<view class="list" v-for="val in item.children" :key="val._id">
							<image width="30" class="item-img" :src="val.img"></image>
							<view>{{val.item}}</view>
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
			let categories = await this.$http.httpCategory.getCategory()
			console.log(categories)
			this.categories = categories.data
		},
		methods: {
			changeCur(index) {
				this.curIndex = index;
				this.scrollItemId = 'item-' + index
			},
			scrollChange({detail}) {
				console.log('scroll',detail);
				let query = uni.createSelectorQuery().in(this)
				query.selectAll('.category-item-list').boundingClientRect(data => {
					console.log(data);
					let allTop=0
					for(let i in data){
						allTop+=data[i].height
						if(allTop>detail.scrollTop){
							this.curIndex=i
							break
						}
					}
				}).exec()
			}
		}
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
					background-color: #1cb3fb;
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