<template>
	<view>
		<u-navbar title="设置"></u-navbar>
		<view>
			<u-cell-group class="u-p-b-50">
				<u-cell-item title="接收通知" :title-style="titleStyle" :arrow="false">
					<u-switch slot="right-icon" v-model="checked" active-color="#2A96F0"></u-switch>
				</u-cell-item>
				<u-cell-item title="关于软件" :title-style="titleStyle" :arrow="false" @click="gotoAbout"></u-cell-item>
				<u-cell-item title="版本更新" @click="update" :title-style="titleStyle" :arrow="false"></u-cell-item>
				<u-cell-item title="修改密码" :title-style="titleStyle" :arrow="false" @click="updatePWD"></u-cell-item>
				<u-cell-item title="切换身份" @click="changeUser" :title-style="titleStyle" :arrow="false"></u-cell-item>
				<u-cell-item title="退出登录" @click="outLogin" :title-style="titleStyle" :arrow="false"></u-cell-item>
				<u-cell-item title="退出程序" @click="outApp" :title-style="titleStyle" :arrow="false"></u-cell-item>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
import getUpdate from 'uni_modules/uni-upgrade-center-app/utils/check-update';
export default {
	data() {
		return {
			checked: true,
			titleStyle: {
				'font-size': '32upx',
				color: '#FF33333'
			}
		};
	},
	onLoad() {
		var that = this;
		// that.checked = plus.push.state
		// console.log('pushState:' + that.checked);
	},
	methods: {
		outLogin() {
			uni.showModal({
				title: '提示',
				content: '确认要退出登录吗？',
				success: function(res) {
					if (res.confirm) {
						uni.navigateTo({
							url: '../login/login'
						});
					} else if (res.cancel) {
					}
				}
			});
		},
		outApp() {
			uni.showModal({
				title: '提示',
				content: '确认要退出程序吗？',
				success: function(res) {
					if (res.confirm) {
						// plus.runtime.quit();
						plus.os.name == 'Android'
							? plus.runtime.quit()
							: plus.ios
									.import('UIApplication')
									.sharedApplication()
									.performSelector('exit');
					} else if (res.cancel) {
					}
				}
			});
		},
		update() {
			var that = this;
			getUpdate(function() {
				that.$utils.showToast('您已是最新版本');
			});
		},
		gotoAbout() {
			uni.navigateTo({
				url: '../app-adout/app-adout'
			});
		},
		updatePWD() {
			uni.navigateTo({
				url: '../updatePwd/savePwd'
			});
		},
		changeUser() {
			uni.navigateTo({
				url: '../changeIdentity/changeIdentity'
			});
		}
	}
};
</script>

<style></style>
