<template>
	<view>
		tabA
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			console.log('tabA load');
		},
		onUnload() {
			console.log('tabA unload');
		},
		onShow(){
			console.log('tabA show');
		},
		onHide(){
			console.log('tabA hide');
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
