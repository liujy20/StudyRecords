<template>
	<view class="bg">
		<!-- <u-card :show-head="false">
			<view class="card1-body" slot="body">
				<u-input v-model="value" type="textarea" height="150" />
				<u-button type="error" shape="circle" size="mini">粘贴并识别</u-button>
			</view>
		</u-card> -->
		<u-card :head-border-bottom="false">
			<view class="card2-head" slot="head">
				联系人信息
			</view>
			<view class="card2-body" slot="body">
				<view class="info u-border-bottom">
					<u-input class="name" v-model="name" type="type" :border="border" placeholder="姓名" />
					<u-input class="phone" v-model="phone" type="type" :border="border" placeholder="电话" />-
					<u-input class="tag" v-model="tag" type="type" :border="border" placeholder="分机号" />
				</view>
				<view class="address u-border-bottom" @click="show=true">
					<text>{{address1}}</text>
					<text>&gt;</text>
				</view>
				<view class="address-sub  u-border-bottom">
					<text class="info">{{address2}}</text>
					<view class="icon" @click="chooseAddress">
						<u-icon name="map-fill" color="red"></u-icon>
						<text>定位</text>
					</view>
				</view>
				<view class="company  u-border-bottom">
					<u-input v-model="company" type="type" :border="border" placeholder="公司名称(选填)" />

				</view>
				<view class="def-address">
					<u-checkbox v-model="checked" shape="circle"></u-checkbox>
					<text class="tit">默认寄件地址</text>
					<text class="clear">清空</text>
				</view>
			</view>
		</u-card>
		<map class="map" :latitude="userAddress.latitude" :longitude="userAddress.longitude"
			@click="chooseAddress"></map>
		<u-picker mode="region" v-model="show"></u-picker>
	</view>
</template>

<script>
	import QQMapWX from '@/util/qqmap-wx-jssdk.min.js'
	// 实例化API核心类
	var qqmapsdk = new QQMapWX({
		key: 'LZ5BZ-5JP34-KWJU4-K2WEC-U7ARO-BTBST' // 必填
	});
	export default {
		data() {
			return {
				value: '',
				name: '',
				phone: '',
				tag: '',
				address1: '省市区',
				address2: '详细地址(例如**街**号*)',
				show: false,
				checked: false,
				company: '',
				userAddress: {
					latitude: "30.573687",
					longitude: "104.063919"
				}
			}
		},
		methods: {
			confirm(e) {
				console.log(e);
			},
			chooseAddress(event) {
				// console.log('clickChoose',event);
				uni.chooseLocation({
					latitude: event.detail.latitude || '',
					longitude: event.detail.longitude || '',
					success: (res) => {
						console.log('choose', res)
						this.userAddress.latitude = res.latitude
						this.userAddress.longitude = res.longitude
						let index = res.address.indexOf('市')
						this.address1 = res.address.slice(0, index + 1)
						this.address2 = res.address.slice(index + 1) + res.name
					}
				})
			}
		},
		onLoad() {
			uni.getLocation({
				type: 'gcj-02',
				success: (res) => {
					console.log(res)
				},
				fail: (res) => {
					console.log('fail', res);
				}
			})


		}
	}
</script>

<style lang="scss">
	.map {
		width: 100%;
		height: 300px;
	}

	.bg {
		min-height: 100vh;
		background-color: #f5f5f5;
		overflow: auto;

		// display: none;
		.card1-body {
			text-align: right;
		}

		.card2-head {
			font-weight: bold;

		}

		.card2-body {
			.info {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.name {
					width: 200rpx;
				}

				.phone {
					width: 200rpx;
				}

				.tag {
					width: 100rpx;
				}
			}

			.address {
				display: flex;
				justify-content: space-between;
				color: #999;
				line-height: 100rpx;
			}

			.address-sub {
				display: flex;
				justify-content: space-between;
				color: #999;
				line-height: 100rpx;

				.info {
					width: 500rpx;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}

				.icon {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					line-height: 1;
					font-size: 24rpx;
					color: red;
				}
			}

			.company {
				height: 100rpx;
				display: flex;
				align-items: center;
			}

			.def-address {
				display: flex;
				color: #999;
				line-height: 100rpx;

				.tit {
					flex-grow: 1;
				}
			}
		}
	}
</style>