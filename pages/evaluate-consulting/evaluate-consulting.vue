<template>
	<view>
		<u-navbar :background="bgcolor" title-color="#FFFFFF" title="评价咨询" back-icon-color="#ffffff" :border-bottom="false"></u-navbar>
		<view>
			<image style="width: 100%;" src="../../static/img/ic_pjzxPage.png" mode="widthFix"></image>
			<view class="text-center u-m-tb-30 u-p-lr-30"><u-button class="button" hover-class="default-button" @click="addEv">立即咨询</u-button></view>
			<view style="height: 50upx;"></view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			bgcolor: { background: '#ff8495' }
		};
	},
	methods: {
		addEv() {
			uni.navigateTo({
				url: 'add-evaluate'
			});
		}
	}
};
</script>

<style>
page {
	background-color: #fd6878;
}
.button {
	background-color: #fcb47a !important;
	border-color: #fcb47a !important;
	color: #ffffff !important;
}
.default-button {
	color: #fcb47a !important;
	border-color: #fcb47a !important;
	background-color: #ffffff !important;
}
</style>
