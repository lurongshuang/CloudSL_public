<template>
	<view>
		<u-navbar title="修改密码"></u-navbar>
		<view class="u-padding-30">
			<view class="u-p-t-30">
				<view class="loginInput"><u-input style="font-size: 30upx;" placeholder="请输入旧密码" type="password"></u-input></view>
				<view class="loginInput"><u-input style="font-size: 30upx;" placeholder="请输入新密码" type="password"></u-input></view>
			</view>
			<view class="u-m-t-50"><u-button style="background-color: #2A96F0; color: #FFFFFF; font-size: 30upx;">保存</u-button></view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {}
};
</script>

<style>
.loginInput {
	background-color: #f1f1f1;
	padding: 5upx 20upx;
	border-radius: 10upx;
	margin-top: 50upx;
}
.color-f9 {
	color: #f95800;
}
</style>
