<template>
	<view>
		<u-navbar title="关于软件"></u-navbar>
		<view class="u-p-t-30">
			<view class="text-center" style="text-align: center;"><image src="../../static/img/ic_logo_ico.png" mode="widthFix" style="width: 200upx;  height: 200upx;"></image></view>
			<view>
				<view class="text-center text-black u-font-35 u-m-t-30">{{ title }}</view>
				<view class="text-center text-black u-font-35 u-m-t-30">Version {{ version }}</view>
				<view class=" text-black u-font-35 u-m-t-30 u-padding-30" style="line-height: 50upx; letter-spacing: 5upx;">
					集信用动态、信息查询、业务办理、教育于一体的资讯办公类APP，方便政府与企业人员随时随地查询信用信息，查询水利行业标准，在线办理业务，包括监理工程师、造价工程师、质量检测员、执业资质等信息报送，提高业务办理效率。
				</view>
			</view>
			<view class="text-center bg-white">
				<view style="position: absolute; bottom: 0rpx; padding: 30upx; width: 100%;" class="text-center">
					<view class="text-center text-main" style="text-align: center; font-size: 30upx;">
						<text @click="userXy">《用户协议》</text>
						&ensp;
						<text class="text-gray">|</text>
						&ensp;
						<text @click="userZc">《隐私政策》</text>
					</view>
					<view class="text-gray" style="text-align: 30upx;">copyright © 北京宏宇睿晨信息技术有限公司</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			version: '2.0.0',
			title: '云水利'
		};
	},
	onLoad() {
		var that = this;
		// #ifdef APP-PLUS
		plus.runtime.getProperty(plus.runtime.appid, function(wgtinfo) {
			that.title = wgtinfo.name;
			that.version = wgtinfo.version;
		});
		// #endif
	},
	methods: {
		userXy() {
			this.$config.noticeUrl = this.$config.url_config + '/UserAgreement.html';
			uni.navigateTo({
				url: '../new_details/new_details?title=用户协议'
			});
		},
		userZc() {
			this.$config.noticeUrl = this.$config.url_config + '/AppAgreement.html';
			uni.navigateTo({
				url: '../new_details/new_details?title=隐私政策'
			});
		}
	}
};
</script>

<style></style>
