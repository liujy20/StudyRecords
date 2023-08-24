<template>
	<view class="bg">
		<view class="tags">
			<view class="tag">
				<image src="../../static/images/tag.jpg" mode=""></image>
				<text>100%正品保证</text>
			</view>
			<view class="tag">
				<image src="../../static/images/tag.jpg" mode=""></image>
				<text>所有商品精挑细选</text>
			</view>
			<view class="tag">
				<image src="../../static/images/tag.jpg" mode=""></image>
				<text>售后无忧</text>
			</view>
		</view>
		<view class="tit">
			<view class="sub-left">
				<text class="name">购物数量</text>
				<text class="count">{{selectCount}}</text>
			</view>
			<view class="sub-right">
				<view>管理</view>
			</view>
		</view>

		<view class="car">
			<view class="item" v-for="item in carArr" :key="item._id">
				<label class="radio">
					<radio :checked="item.checked" @click="chooseGood(item)"/>
				</label>
				<image :src="item.imgSrc" mode=""></image>
				<view class="info">
					<view class="name">
						<text>{{item.name}}</text>
					</view>
					<view class="tag">
						<text>属性:{{item.type}}</text>
					</view>
					<view class="content">
						<view class="price">
							<view class="new">${{item.price*item.count}}</view>
						</view>
						<view class="btn">
							<view class="sub" @click="subNum(item)">
								-
							</view>
							<view class="num">
								{{item.count}}
							</view>
							<view class="add" @click="addNum(item)">
								+
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="all">
			<view class="choose-all">
				<label class="radio">
					<radio :checked="allChecked" @click="chooseAll"/>
				</label>
			</view>
			<text class="all-num">全选({{allCount}})</text>
			<text class="all-price">${{allPrice}}</text>
			<view class="to-pay" @click="toPay">
				立即下单
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			carArr:[],
			};
		},
		
		computed:{
			selectCount(){
				let num=0
				this.carArr.forEach(item=>{
					if(item.checked){
						return num+=item.count-0
					}
				})
				return num
			},
			allCount(){
				let num=0
				this.carArr.forEach(item=>{
						return num+=item.count-0
				})
				return num
			},
			allPrice(){
				let num=0
				this.carArr.forEach(item=>{
					if(item.checked){
						return num+=(item.count-0 )*item.price
					}
				})
				return num
			},
			allChecked(){
				return this.carArr.every(item=>item.checked)
			}
		},
		methods:{
			chooseGood(data){
				data.checked=!data.checked
				console.log(data);
			},
			addNum(data){
				data.count++;
			},
			subNum(data){
				if(data.count>1){
					data.count--;
				}
			},
			chooseAll(){
				console.log(this.allChecked);
				let f=this.allChecked
				this.carArr.forEach(item=>item.checked=!f)
			},
			async toPay(){
				let payList=this.carArr.filter(item=>item.checked)
				console.log(payList);
				uni.setStorageSync('payList',payList)
				let arr=payList.map(item=>{
					return {
						_id:item._id,
						count:item.count
					}
				})
				let res=await this.$http.httpOrder.prepayOrder(
					{
					    "car":JSON.stringify(arr)
					}
				)
				console.log('prepare',res);
				uni.setStorageSync('prepare_id',res.data.prepare_id)
				uni.navigateTo({
					url:'/pages/submitOrder/submitOrder'
				})
			}
			
		},
		async created() {
			let carRes=await this.$http.httpOrder.getCarList()
			console.log(carRes.data);
			this.carArr=carRes.data.map(item=>{
				item.checked=false
				item.count=1
				return item
			})
		},
	}
</script>

<style lang="scss">
	.bg {
		background-color: #f5f5f5;
		height: 100vh;
		overflow: auto;
		.tags {
			display: flex;
			justify-content: space-around;
			background-color: #f5f5f5;
			height: 80rpx;
			line-height: 80rpx;

			.tag {
				color: #818181;

				image {
					width: 22rpx;
					height: 22rpx;
				}

				text {
					font-size: 20rpx;
				}
			}
		}

		.tit {
			height: 80rpx;
			display: flex;
			justify-content: space-between;
			padding: 20rpx;
			box-sizing: border-box;
			font-size: 24rpx;
			background-color: white;

			.sub-left {

				.count {
					color: #1cb3fb;
				}

			}

			.sub-right {
				width: 110rpx;
				height: 40rpx;
				line-height: 40rpx;
				border: 1rpx solid #333;
				text-align: center;
			}
		}

		.car {
			margin-bottom: 100rpx;
			
			.item {
				background-color: #fff;
				border-radius: 10rpx;
				padding: 20rpx 30rpx;
				display: flex;
				align-items: center;
				margin: 20rpx 0;

				image {

					width: 200rpx;
					height: 200rpx;
				}

				.info {
					width: 430rpx;
					flex-grow: 1;
					.name {
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
					.tag{
						margin: 20rpx 0;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						color: #999;
					}
					.content {
						display: flex;
						justify-content: space-between;
						align-items: center;

						.price {
							margin: 20rpx;

							.old {
								color: #999;
								text-decoration: line-through;
								font-size: 20rpx
							}

							.new {
								color: #1cb3fb;
								font-size: 30rpx
							}
						}

						.btn {
							display: flex;
							text-align: center;
							line-height: 50rpx;
							.sub{
								width: 60rpx;
								height: 50rpx;
								color: #999;
								border: 1rpx solid #999;
							}
							.num{
								width: 60rpx;
								height: 50rpx;
								border: 1rpx solid #999;
							}
							.add{
								width: 60rpx;
								height: 50rpx;
								color: #999;
								border: 1rpx solid #999;
							}
						}
					}
				}
			}
		}

		.all {
			position: fixed;
			bottom: 0;
			width: 100%;
			height: 100rpx;
			display: flex;
			align-items: center;
			padding: 15rpx 40rpx;
			font-size: 24rpx;
			box-sizing: border-box;
			border-top: 1rpx solid #ccc;
			background-color: #fafafa;
			.choose-all {
				margin-right: 20rpx;
			}

			.all-num {
				flex-grow: 1;
			}

			.all-price {
				margin-right: 20rpx;
				color: lightcoral;
			}

			.to-pay {
				background-color: #1cb3fb;
				border-radius: 30rpx;
				width: 220rpx;
				height: 70rpx;
				line-height: 70rpx;
				color: white;
				text-align: center;
			}
		}

	}
</style>