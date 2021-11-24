<template>
	<view>
		<u-navbar title="账户关联"></u-navbar>
		<view>
			<view class="text-center" style="margin-top: 20%;"><image src="../../static/img/ic_guanlian_ico.png" style="width: 60%;" mode="widthFix"></image></view>
			<view class="text-center u-m-t-30" style="font-size: 50upx;">关联"信用评价"账户</view>
			<view style="width: 50%; margin: 0upx auto;" class="u-m-t-40">
				<u-button style="background-color: #2A96F0; color: #FFFFFF; font-size: 30upx;" @click="gotoRelation">前往关联</u-button>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		gotoRelation() {
			uni.redirectTo({
				url: 'relation-login'
			});
		}
	}
};
</script>

<style></style>
