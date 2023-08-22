<template>
	<view>
		<text>pageA</text>
		<navigator url="../index/index" open-type="switchTab"><button>switchTab-跳转index</button></navigator>
		<navigator url="../pageB/pageB" open-type="navigate"><button>navigate-跳转pageB</button></navigator>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			console.log('pageA load');
		},
		onUnload() {
			console.log('pageA unload');
		},
		onShow(){
			console.log('pageA show');
		},
		onHide(){
			console.log('pageA hide');
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
