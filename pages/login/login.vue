<template>
	<view>
		<u-navbar title="登录"><view slot="right" class="u-p-r-20 u-font-30 main-color" @click="openRegister">注册</view></u-navbar>
		<view class="u-padding-30">
			<view class="text-center u-m-t-30">
				<u-image src="../../static/img/ic_logo_ico.png" shape="circle" height="150upx" width="150upx" style="margin: 0upx auto;" :lazy-load="true"></u-image>
			</view>

			<view class="u-p-t-30">
				<view class="loginInput"><u-input v-model="userPhone" style="font-size: 30upx;" placeholder="请输入您的手机号"></u-input></view>
				<view v-show="isPass" class="loginInput"><u-input v-model="userPwd" style="font-size: 30upx;" placeholder="请输入密码" type="password"></u-input></view>
				<view class="loginInput" v-show="!isPass">
					<u-row>
						<u-col span="8" class="u-padding-0"><u-input v-model="userCode" style="font-size: 30upx;" placeholder="请输入短信验证码"></u-input></u-col>
						<u-col span="4">
							<view class="text-right u-font-30 color-f9">
								<u-verification-code change-text="X秒" :seconds="seconds" @end="end" @start="start" ref="uCode" @change="codeChange"></u-verification-code>
								<text @click="getCode()">{{tips}}</text>
							</view>
						</u-col>
					</u-row>
				</view>
			</view>
			<view class="u-m-t-50"><u-button @click="btLogin" style="background-color: #2A96F0; color: #FFFFFF; font-size: 30upx;">登录</u-button></view>
			<view class="u-m-t-50">
				<u-row>
					<u-col span="6">
						<view class="text-left text-8a8a8a u-font-30" @click="onChange">{{ isPass ? '短信登录' : '密码登录' }}</view>
					</u-col>
					<u-col span="6"><view class="text-right text-8a8a8a u-font-30" @click="openPwd">忘记密码</view></u-col>
				</u-row>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			isPass: true,
			userPhone: '',
			userPwd: '',
			userCode: '',
			seconds: 60,
			tips: ''
		};
	},
	methods: {
		onChange() {
			this.isPass = !this.isPass;
		},
		openRegister() {
			uni.navigateTo({
				url: '../register/register'
			});
		},
		openPwd() {
			uni.navigateTo({
				url: '../updatePwd/updatePwd'
			});
		},
		btLogin() {
			var that = this;
			if (that.userPhone.trim() == '') {
				that.$utils.showToast('请输入您的手机号码');
				return;
			}
			if (!that.$utils.isPhone(that.userPhone)) {
				that.$utils.showToast('请输入正确手机号码');
				return;
			}
			if (that.isPass) {
				if (that.userPwd.trim() == '') {
					that.$utils.showToast('请输入密码');
					return;
				}
				that.userLogin();
			} else {
				if (that.userCode.trim() == '') {
					that.$utils.showToast('请输入短信验证码');
					return;
				}
				that.phoneLogin()();
			}
		},
		userLogin() {
			var that = this;
			var map = {
				PHONE: that.userPhone,
				PWD: that.$utils.getMd5_16(that.userPwd)
			};
			that.$api
				.appLogin(map)
				.then(data => {
					if (data && data.data && data.data.code == 1) {
						that.$utils.showToast('登录成功');
						uni.setStorageSync('userInfo', JSON.stringify(data.data.data));
						setTimeout(function() {
							uni.switchTab({
								url: '../tabbar/index/index'
							});
						}, 1000);
					} else {
						that.$utils.showToast(data.data.msg ? data.data.msg : '登录失败，请重试');
					}
				})
				.catch(e => {
					that.$utils.showToast('登录失败，请重试');
				});
		},
		phoneLogin() {
			var that = this;
		},
		codeChange(text) {
			this.tips = text;
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
		end() {
		},
		start() {
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
