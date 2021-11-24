<template>
	<view>
		<u-navbar title="账户关联"></u-navbar>
		<view>
			<view class="u-padding-30">
				<view class="u-p-t-30">
					<view class="loginInput"><u-input v-model="userPhone" style="font-size: 30upx;" placeholder="请输入用户名"></u-input></view>
					<view class="loginInput"><u-input v-model="userPwd" style="font-size: 30upx;" placeholder="请输入密码" type="password"></u-input></view>
				</view>
				<view class="u-m-t-50"><u-button @click="btLogin" style="background-color: #2A96F0; color: #FFFFFF; font-size: 30upx;">确认关联</u-button></view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			userPhone: '',
			userPwd: ''
		};
	},
	methods: {
		btLogin() {
			uni.navigateBack({});
		}
	}
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
