<template>
	<view>
		<button @click="sanCode">扫描二维码</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			sanCode() {
				uni.scanCode({
					onlyFromCamera: false,
					scanType: ['qrCode', 'barCode'],
					success: ({
						result,
						scanType,
						charSet,
						path
					}) => {
						console.log('扫码结果', result);
						console.log('扫码类型', scanType);
						uni.reLaunch({
							url: result
						})
					},
					fail: (error) => {
						console.log(error);
					}
				})

			}
		}
	}
</script>

<style>

</style>