<template>
	<view>
		<button open-type="share">分享给好友</button>
		<button open-type="share">分享到朋友圈</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		},
		onShareAppMessage() {
			return {
				path: "/pages/index/index",
				imageUrl: "/static/logo.png",
				title: "分享的标题"
			}
		},
		onShareAppMessage() {
			return {
				title: "分享到朋友圈",
				query: "?id=1",
				imageUrl: "/static/logo.png"
			}
		}
	}
</script>

<style>

</style>