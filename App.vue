<script>
import Vue from 'vue';
import update from 'uni_modules/uni-upgrade-center-app/utils/check-update';
var jpushModule = null;
// #ifdef APP-PLUS
// 	jpushModule = uni.requireNativePlugin('JG-JPush');
//监听系统通知栏消息点击事件

var clientInfo = plus.push.getClientInfo();
console.log('push:id=' + clientInfo.id);
console.log('push:token=' + clientInfo.token);
console.log('push:clientid=' + clientInfo.clientid);
console.log('push:appid=' + clientInfo.appid);
console.log('push:appkey=' + clientInfo.appkey);
// #endif
export default {
	onLaunch: function() {
		uni.getSystemInfo({
			success: function(e) {
				// #ifndef MP
				Vue.prototype.StatusBar = e.statusBarHeight;
				if (e.platform == 'android') {
					Vue.prototype.CustomBar = e.statusBarHeight + 44;
				} else {
					Vue.prototype.CustomBar = e.statusBarHeight + 44;
				}
				// #endif
				// #ifdef MP-WEIXIN
				Vue.prototype.StatusBar = e.statusBarHeight;
				let custom = wx.getMenuButtonBoundingClientRect();
				Vue.prototype.Custom = custom;
				Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
				// #endif
				// #ifdef MP-ALIPAY
				Vue.prototype.StatusBar = e.statusBarHeight;
				Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
				// #endif
				// #ifdef H5
				Vue.prototype.StatusBar = 0;
				Vue.prototype.CustomBar = 44;
				// #endif
			}
		});
		//版本更新
		update();
		/* 推送 */
		// if (uni.getSystemInfoSync().platform == 'ios') {
		// 	if (jpushModule) {
		// 		// 请求定位权限
		// 		let locationServicesEnabled = jpushModule.locationServicesEnabled();
		// 		let locationAuthorizationStatus = jpushModule.getLocationAuthorizationStatus();
		// 		// console.log('locationAuthorizationStatus', locationAuthorizationStatus)
		// 		if (locationServicesEnabled == true && locationAuthorizationStatus < 3) {
		// 			jpushModule.requestLocationAuthorization(result => {
		// 				// console.log('定位权限', result.status)
		// 			});
		// 		}
		// 		jpushModule.requestNotificationAuthorization(result => {
		// 			let status = result.status;
		// 			if (status < 2) {
		// 				// uni.showToast({
		// 				// 	icon: 'none',
		// 				// 	title: '您还没有打开通知权限',
		// 				// 	duration: 3000
		// 				// })
		// 			}
		// 		});
		// 	}
		// }
		// if (jpushModule) {
		// 	/* 初始化函数 */
		// 	jpushModule.initJPushService();
		// 	/* 设置 debug 模式 */
		// 	jpushModule.setLoggerEnable(false);
		// 	/* 连接状态回调 */
		// 	jpushModule.addConnectEventListener(result => {
		// 		let connectEnable = result.connectEnable;
		// 		if (connectEnable == true) {
		// 			jpushModule.getRegistrationID(result => {
		// 				let registerID = result.registerID;
		// 				uni.setStorageSync('registerID', registerID);
		// 				// console.log("registerID:" + registerID)
		// 			});
		// 		}
		// 	});
		// 	// jpushModule.clearLocalNotifications()
		// 	var that = this;
		// 	/* 通知事件回调 */
		// 	jpushModule.addNotificationListener(result => {
		// 		if (result && result.notificationEventType && result.notificationEventType == 'notificationOpened' && result.extras && result.extras.dataid) {
		// 			var urls = that.$config.url_config + '/api/Home/NewInfo?tid=' + result.extras.dataid + '&uid=' + that.$utils.getUserId();
		// 			that.$config.noticeUrl = urls;
		// 			uni.$emit('pushIntent', result.title);
		// 			// var GeTuiSdk = plus.ios.importClass('GeTuiSdk');
		// 			// plus.runtime.setBadgeNumber(0);
		// 		}
		// 	});
		// 	/* 自定义消息事件回调 */
		// 	jpushModule.addCustomMessageListener(result => {
		// 		let type = result.type;
		// 		let messageType = result.messageType;
		// 		let content = result.content;
		// 		uni.showToast({
		// 			icon: 'none',
		// 			title: JSON.stringify(result),
		// 			duration: 3000
		// 		});
		// 	});
		// 	/* 监听崩溃 */
		// 	jpushModule.initCrashHandler();
		// }
	},
	onShow: function() {},
	onHide: function() {}
};
</script>

<style lang="scss">
@import 'uview-ui/index.scss';
/*每个页面公共css */
@import '@/common/common.style.scss';
/*toast字体图标*/
@import '@/components/iconfont.css';
.cell-hover-class {
	background-color: #f7f8f9 !important;
}
::-webkit-scrollbar {
	display: none;
	width: 0 !important;
	height: 0 !important;
	-webkit-appearance: none;
	background: transparent;
}
</style>
