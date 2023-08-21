<template>
	<view class="content">
		<navigator url="../pageA/pageA" open-type="navigate"><button>navigate-跳转pageA</button></navigator>
		<navigator url="../pageA/pageA" open-type="switchTab"><button>switchTab-跳转pageA</button></navigator>
		<navigator url="../tabBar/tabA/tabA" open-type="navigate"><button>navigate-跳转tabA</button></navigator>
		<navigator url="../tabBar/tabA/tabA" open-type="switchTab"><button>switchTab-跳转tabA</button></navigator>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
