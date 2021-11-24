<template>
	<view>
		<u-navbar
			:border-bottom="showSti"
			:title="showSti ? '北京恒华伟业科技股份有限公司' : ''"
			:background="showSti ? titleSty1 : titleSty"
			:back-icon-color="showSti ? '#333333' : '#ffffff'"
			:immersive="true"
		></u-navbar>
		<view>
			<view style="height: 400upx; background-image: url(../../../static/img/ic_re_zhuye_bg.png); background-size: cover" class="text-center u-p-t-100">
				<image src="../../../static/img/ic_biaoxun_ico.png" style="width: 120upx; height: 120upx;"></image>
				<view class="u-font-35 u-m-t-10 text-white">北京恒华伟业科技股份有限公司</view>
				<view class="u-font-35 u-m-t-10 text-white">未融资 · 122-499人</view>
			</view>
			<u-sticky @fixed="fixed()" @unfixed="unfixed()" :h5-nav-height="StatusBar" :offset-top="getTop()"></u-sticky>
			<view>
				<view>
					<view class="u-p-tb-30 bg-white">
						<view class="bg-white u-p-lr-20 u-font-35 text-black text-bold">公司介绍</view>
						<view class="u-p-lr-20 u-m-t-20" style="line-height: 50upx; letter-spacing: 3upx;">
							中国电信集团系统集成公司是中国电信专注ToB业务的“集成体系”总部， 坐落西直门内新街口，在全国有32家分公司、10家子公司、4个区域中心， CAGR 30%以上。
							中国电信集团系统集成公司是中国电信专注ToB业务的“集成体系”总部， 坐落西直门内新街口，在全国有32家分公司、10家子公司、4个区域中心， CAGR 30%以上。
						</view>
					</view>
					<u-line></u-line>
				</view>
				<view>
					<view class="u-p-tb-30 bg-white">
						<view class="bg-white u-p-lr-20 u-font-35 text-black text-bold">公司地址</view>
						<view class="u-p-lr-20 u-m-t-20" style="line-height: 50upx; letter-spacing: 3upx;">北京市 丰台区 丰台科技园F区F4</view>
					</view>
					<u-line></u-line>
				</view>
				<view>
					<view class="u-p-tb-30 bg-white">
						<view class="bg-white u-p-lr-20 u-font-35 text-black text-bold">工作时间</view>
						<view class="u-p-lr-20 u-m-t-20" style="line-height: 50upx; letter-spacing: 3upx;">上午09:30-下午06:00 双休 偶尔加班</view>
					</view>
					<u-line></u-line>
				</view>
				<view>
					<view class="u-p-tb-30 bg-white">
						<view class="bg-white u-p-lr-20 u-font-35 text-black text-bold">公司福利</view>
						<view class="u-p-lr-20 u-m-t-20" style="line-height: 50upx; letter-spacing: 3upx;">
							<u-grid col="4" :border="false">
								<u-grid-item v-for="index in 5" :key="index" :custom-style="curStyle">
									<view class="text-8080 u-font-25" style="border: 1upx solid #808080; padding: 5upx 10upx; border-radius: 10upx; margin: 0upx 10upx;">
										五险一金
									</view>
								</u-grid-item>
							</u-grid>
						</view>
					</view>
					<u-line></u-line>
				</view>
				<view>
					<view class="u-p-tb-30 bg-white">
						<view class="bg-white u-p-lr-20 u-font-35 text-black text-bold">公司相册</view>
						<view class="u-p-lr-20 u-m-t-20" style="line-height: 50upx; letter-spacing: 3upx;">
							<scroll-view scroll-x="true">
								<view class="u-flex">
									<view v-for="index in 10" :key="index">
										<image
											style="width: 250upx; height: 150upx; border-radius: 10upx; margin-right: 20upx;"
											mode="aspectFill"
											src="../../../static/img/ic_banner3.png"
										></image>
									</view>
								</view>
							</scroll-view>
						</view>
					</view>
					<u-line></u-line>
				</view>
				<view>
					<view class="u-p-tb-30 bg-white">
						<view class="bg-white u-p-lr-20 u-font-35 text-black text-bold">工商信息</view>
						<view class="u-p-lr-20 u-m-t-20" style="line-height: 50upx; letter-spacing: 3upx;">
							<u-row>
								<u-col span="4"><view class="text-8080 u-font-28 text-left">法定代表</view></u-col>
								<u-col span="4"><view class="text-8080 u-font-28 text-left">注册资本</view></u-col>
								<u-col span="4"><view class="text-8080 u-font-28 text-left">注册时间</view></u-col>
							</u-row>
							<u-row>
								<u-col span="4"><view class="text-black u-font-32 text-left">刘亚卓</view></u-col>
								<u-col span="4"><view class="text-black u-font-32 text-left">10000万</view></u-col>
								<u-col span="4"><view class="text-black u-font-32 text-left">2011-11-22</view></u-col>
							</u-row>
						</view>
					</view>
					<u-line></u-line>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			titleSty: { background: 'transparent' },
			titleSty1: { background: '#FFFFFF' },
			showSti: false,
			curStyle: {
				padding: '15rpx 0upx'
			}
		};
	},
	methods: {
		getTop() {
			var top = (this.CustomBar / uni.getSystemInfoSync().windowWidth) * 750;
			return top;
		},
		fixed() {
			this.showSti = true;
		},
		unfixed() {
			this.showSti = false;
		},
		gotoReDel() {
			uni.navigateTo({
				url: '../recruit-del/recruit-del'
			});
		}
	}
};
</script>

<style>
.colorF82E06 {
	color: #f82e06;
}
</style>
