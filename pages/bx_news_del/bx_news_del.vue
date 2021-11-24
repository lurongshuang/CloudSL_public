<template>
	<view>
		<u-navbar title="标讯详情">
			<view slot="right">
				<u-icon name="star" class="u-m-r-30" size="40"></u-icon>
				<u-icon name="share" class="u-m-r-30" size="40"></u-icon>
			</view>
		</u-navbar>
		<view class="u-padding-20 u-m-t-20">
			<view class="u-font-35 text-black text-bold">竹山县2021年度水利发展资金宝丰镇鲍家沟小流域综 合治理工程(HBZS-202104SL-002001001)招标公告</view>

			<view class="text-8a8a8a u-font-32 u-m-t-30">来源：湖南电子招投标交易平台</view>
			<view class="text-8a8a8a u-font-32 u-m-t-10 u-m-b-30">发布时间：2020-04-12 19：30</view>
			<view :style="[{ height: isVip ? 'auto' : windowHeight + 'px' }]" style="width: 100%; overflow: hidden; position: relative;">
				<view v-for="index in 10" :key="index" style="line-height: 50upx; letter-spacing: 5upx;">
					<view class="text-black u-font-32" style="line-height: 80upx;">{{ index }}、招标条件</view>
					<view class="text-black u-font-32" style="text-indent:2em; ">
						本招标项目竹山县2021年度水利发展资金宝丰镇鲍家沟小流域综合治理 工程已由竹山县发展和改革局以竹发改审批[2021]35号批准建设，项目业主
						为竹山县水土保持局,建设资金来自财政。项目出资比例为政府投资：100.0 %招标人为竹山县水土保持局，招标代理机构为湖北建辉工程项目咨询有限
						公司。项目已具备招标条件，现对该项目进行公开招标。
					</view>
				</view>
				<view v-show="!isVip" style="width: 100%; text-align: center; position: absolute; bottom: 0upx; z-index: 1000;">
					<view style="background-color: #FFFFFF; opacity: 0.1; height: 10upx;"></view>
					<view style="background-color: #FFFFFF; opacity: 0.2; height: 10upx;"></view>
					<view style="background-color: #FFFFFF; opacity: 0.3; height: 10upx;"></view>
					<view style="background-color: #FFFFFF; opacity: 0.4; height: 10upx;"></view>
					<view style="background-color: #FFFFFF; opacity: 0.5; height: 10upx;"></view>
					<view style="background-color: #FFFFFF; opacity: 0.6; height: 10upx;"></view>
					<view style="background-color: #FFFFFF; opacity: 0.7; height: 10upx;"></view>
					<view style="background-color: #FFFFFF; opacity: 0.8; height: 10upx;"></view>
					<view style="background-color: #FFFFFF; opacity: 0.9; height: 10upx;"></view>
					<view class="bg-white u-padding-10  main-color" @click="getMore">展开阅读全文</view>
				</view>
			</view>
		</view>
		<u-mask :show="show" @click="show = false">
			<view class="warp text-center">
				<view style="width: 100%;">
					<image @click="gotoVip" style="width: 700upx; height: 700upx;" src="../../static/img/ic_tanchuang.png" mode="aspectFit"></image>
					<view class="u-m-t-30"><u-icon name="close-circle" size="80" color="#FFFFFF"></u-icon></view>
				</view>
			</view>
		</u-mask>
	</view>
</template>

<script>
export default {
	data() {
		return {
			windowHeight: 0,
			isVip: false,
			show: false
		};
	},
	onLoad() {
		const sys = uni.getSystemInfoSync();
		this.windowHeight = sys.windowHeight - sys.statusBarHeight - this.CustomBar;
	},
	methods: {
		getMore() {
			this.show = true;
		},
		gotoVip() {
			uni.navigateTo({
				url: '../getVip/getVip'
			});
		}
	}
};
</script>

<style>
.warp {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
}
</style>
