<template>
	<view class="bg">
		<u-card :show-head="false">
			<view class="card1-body" slot="body">
				<u-input v-model="value" type="textarea" height="150" />
				<u-button type="error" shape="circle" size="mini">粘贴并识别</u-button>
			</view>
		</u-card>
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
					<text>省市区</text>
					<text>&gt;</text>
				</view>
				<view class="address-sub  u-border-bottom">
					<text>详细地址(例如**街**号*)</text>
					<view class="icon">
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
				<u-picker mode="region" v-model="show"></u-picker>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: '',
				name: '',
				phone: '',
				tag: '',
				show: false,
				list: [{
						value: 1,
						label: '中国',
						children: [{
								value: 2,
								label: '广东',
								children: [{
										value: 3,
										label: '深圳'
									},
									{
										value: 4,
										label: '广州'
									}
								]
							},
							{
								value: 5,
								label: '广西',
								children: [{
										value: 6,
										label: '南宁'
									},
									{
										value: 7,
										label: '桂林'
									}
								]
							}
						]
					},
					{
						value: 8,
						label: '美国',
						children: [{
							value: 9,
							label: '纽约',
							children: [{
								value: 10,
								label: '皇后街区'
							}]
						}]
					}
				],
				checked:false,
				company:'',
			}
		},
		methods: {
			confirm(e) {
				console.log(e);
			}
		}
	}
</script>

<style lang="scss">
	.bg {
		min-height: 100vh;
		background-color: #f5f5f5;
		overflow: auto;

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
				.icon{
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