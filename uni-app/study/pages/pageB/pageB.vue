<template>
	<view>
		<text>pageB</text>
		<navigator url="../pageA/pageA.vue" open-type="navigate"><button>navigate跳转pageA</button></navigator>
		<navigator url="../index/index" open-type="switchTab"><button>switchTab-跳转index</button></navigator>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			console.log('pageB load');
		},
		onUnload() {
			console.log('pageB unload');
		},
		onShow(){
			console.log('pageB show');
		},
		onHide(){
			console.log('pageB hide');
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
