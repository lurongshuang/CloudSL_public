<template>
	<view>
		<u-navbar title="忘记密码"></u-navbar>
		<view class="u-padding-30">
			<view class="u-p-t-30">
				<view class="loginInput"><u-input style="font-size: 30upx;" placeholder="请输入您的手机号" v-model="userPhone"></u-input></view>
				<view class="loginInput">
					<u-row>
						<u-col span="8" class="u-padding-0"><u-input v-model="userCode" style="font-size: 30upx;" placeholder="请输入短信验证码"></u-input></u-col>
						<u-col span="4">
							<view class="text-right u-font-30 color-f9">
								<u-verification-code change-text="X秒" :seconds="seconds" @end="end" @start="start" ref="uCode" @change="codeChange"></u-verification-code>
								<text @click="getPhone()">{{ tips }}</text>
							</view>
						</u-col>
					</u-row>
				</view>
				<view class="loginInput"><u-input v-model="userPwd" style="font-size: 30upx;" placeholder="请输入密码" type="password"></u-input></view>
			</view>
			<view class="u-m-t-50"><u-button @click="savePwd" style="background-color: #2A96F0; color: #FFFFFF; font-size: 30upx;">保存</u-button></view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			userPhone: '',
			userCode: '',
			userPwd: '',
			seconds: 60,
			tips: ''
		};
	},
	methods: {
		savePwd() {
			var that = this;
			if (that.userPhone.trim() == '') {
				that.$utils.showToast('请输入您的手机号码');
				return;
			}
			if (that.userCode.trim() == '') {
				that.$utils.showToast('请输入短信验证码');
				return;
			}
			if (that.userPwd.trim() == '') {
				that.$utils.showToast('请输入密码');
				return;
			}
			var map = {
				PHONE: this.userPhone,
				PWD: that.$utils.getMd5_16(that.userPwd),
				KEY:that.$utils.getKey21('UPDATEPWD')
			};
			this.$api
				.updatePwd(map)
				.then(data => {
					if (data && data.data && data.data.code == 1) {
						that.$utils.showToast('修改成功');
						setTimeout(function() {
							uni.navigateBack({});
						}, 1000);
					} else {
						that.$utils.showToast(data.data.msg ? data.data.msg : '修改失败，请重试');
					}
				})
				.catch(e => {
					that.$utils.showToast('修改失败，请重试');
				});
		},
		codeChange(text) {
			this.tips = text;
		},
		getPhone() {
			var that = this;
			if (that.userPhone.trim() == '') {
				that.$utils.showToast('请输入您的手机号码');
				return;
			}
			var map = {
				PHONE: that.userPhone
			};
			this.$api
				.getuserByPhone(map)
				.then(data => {
					if (data && data.data && data.data.code == 1) {
						if (data.data.data == 1) {
							that.getCode();
						} else {
							that.$utils.showToast('手机号码未注册');
						}
					} else {
						that.$utils.showToast('手机号码未注册');
					}
				})
				.catch(e => {
					that.$utils.showToast('请求失败，请重试');
				});
		},
		getCode() {
			if (this.$refs.uCode.canGetCode) {
				uni.showLoading({
					title: '正在获取验证码'
				});
				setTimeout(() => {
					uni.hideLoading();
					this.$u.toast('验证码已发送');
					this.$refs.uCode.start();
				}, 2000);
			} else {
				this.$u.toast('倒计时结束后再发送');
			}
		},
		end() {},
		start() {}
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
