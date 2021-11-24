<template>
	<view>
		<u-navbar :border-bottom="false" :background="titleBg" back-icon-color="#ffffff" title="开通会员" title-color="#ffffff"></u-navbar>
		<view class="text-center"><image src="../../static/img/ic_vip_bg.png" style="width: 100%;" mode="widthFix"></image></view>

		<view style="background-color: #cd956c;" class="u-padding-20">
			<!-- <view class="bg-white u-padding-20">
				<view style="border: 1upx solid #cd956c;" class="u-padding-20">
					<u-row>
						<u-col span="4">
							<view class="text-right"><image mode="widthFix" style="width: 100upx;" src="../../static/img/yuan01.png"></image></view>
						</u-col>
						<u-col span="4"><view class="u-font-40 text-center" style="color: #583D23;">活动详情</view></u-col>
						<u-col span="4">
							<view class="text-left"><image mode="widthFix" style="width: 100upx;" src="../../static/img/yuan02.png"></image></view>
						</u-col>
					</u-row>
					<view class="u-font-32 u-p-t-30 text-center" style="color: #583D23;">即日起开通 “云水利”VIP升级成为会员 仅需3999元即可购买升级VIP会员卡</view>
				</view>
			</view> -->

			<view class="bg-white u-padding-20">
				<view style="border: 1upx solid #cd956c;" class="u-padding-20">
					<u-row>
						<u-col span="3.5">
							<view class="text-right"><image mode="widthFix" style="width: 100upx;" src="../../static/img/yuan01.png"></image></view>
						</u-col>
						<u-col span="5"><view class="u-font-40 text-center" style="color: #583D23;">VIP专属特权</view></u-col>
						<u-col span="3.5">
							<view class="text-left"><image mode="widthFix" style="width: 100upx;" src="../../static/img/yuan02.png"></image></view>
						</u-col>
					</u-row>
					<view class="u-font-32 u-p-t-30 text-center">
						<view class="u-flex u-m-t-20" style="border: 1upx solid #cd956c;">
							<view style="height: 100upx; padding: 15upx; background-color: #c69169;">
								<image mode="heightFix" style="height: 100%; width: auto;" src="../../static/img/ic_zuanshi.png"></image>
							</view>
							<view class="u-m-l-20 u-font-32" style="color: #583D23;">享受评价咨询、模拟评价</view>
						</view>
						<view class="u-flex u-m-t-20" style="border: 1upx solid #cd956c;">
							<view style="height: 100upx; padding: 15upx; background-color: #c69169;">
								<image mode="heightFix" style="height: 100%; width: auto;" src="../../static/img/ic_zuanshi.png"></image>
							</view>
							<view class="u-m-l-20 u-font-32" style="color: #583D23;">招投标信息推送</view>
						</view>
						<view class="u-flex u-m-t-20" style="border: 1upx solid #cd956c;">
							<view style="height: 100upx; padding: 15upx; background-color: #c69169;">
								<image mode="heightFix" style="height: 100%; width: auto;" src="../../static/img/ic_zuanshi.png"></image>
							</view>
							<view class="u-m-l-20 u-font-32" style="color: #583D23;">多维度检索标讯数据</view>
						</view>
						<view class="u-flex u-m-t-20" style="border: 1upx solid #cd956c;">
							<view style="height: 100upx; padding: 15upx; background-color: #c69169;">
								<image mode="heightFix" style="height: 100%; width: auto;" src="../../static/img/ic_zuanshi.png"></image>
							</view>
							<view class="u-m-l-20 u-font-32" style="color: #583D23;">招投标信息查看详细内容</view>
						</view>
						<view class="u-flex u-m-t-20" style="border: 1upx solid #cd956c;">
							<view style="height: 100upx; padding: 15upx; background-color: #c69169;">
								<image mode="heightFix" style="height: 100%; width: auto;" src="../../static/img/ic_zuanshi.png"></image>
							</view>
							<view class="u-m-l-20 u-font-32" style="color: #583D23;">下载《水利标准》文件</view>
						</view>
					</view>
				</view>
			</view>
			<view style="height: 300upx;"></view>
		</view>
		<view>
			<view class="u-flex " style="position: fixed; bottom: 0upx; background-color: #2a282b; width: 100%; height: 100upx;">
				<view class="u-flex-8">
					<u-row>
						<u-col span="5">
							<view style="color: #FBB788;">
								<text class="u-font-30">￥</text>
								<text class="u-font-40">3999</text>
								<text class="u-font-30">/年</text>
							</view>
						</u-col>
						<u-col span="7"><view style="color: #FBB788;" class="u-font-35 text-left">VIP用户专享</view></u-col>
					</u-row>
				</view>
				<view class="u-flex-5" style="height: 100%;" @click="getVip">
					<view
						class="text-center u-font-35 text-bold"
						style=" color: #5d372a; line-height: 100upx; background-image: url(../../static/img/ic_hqtq_btn.png); height: 100%; width: 100%; background-size: cover;"
					>
						获取特权
					</view>
				</view>
			</view>
		</view>
		<u-popup v-model="show" mode="bottom" border-radius="20" z-index="1000">
			<view style="background-color: #fafafa;">
				<view class="text-black text-bold u-font-32 text-center u-padding-20 u-m-t-40">开通VIP会员包年服务</view>
				<view class="text-black text-bold text-center u-padding-10" style="font-size: 50upx;">￥3999</view>
				<view class="u-padding-30">
					<view class="u-p-t-30">
						<u-row style=" border: 1upx solid #e9e9e9; border-radius: 10upx; box-shadow:5px 5px 10px #e4e4e4; padding: 30upx 20upx;">
							<u-col span="1.5"><u-image src="../../static/img/ic_alipay.png" mode="widthFix" width="60upx" height="60upx"></u-image></u-col>
							<u-col span="9"><view class="u-font-32 text-black">支付宝支付</view></u-col>
							<u-col span="1.5" style="text-align: right;"><u-icon name="arrow-right"></u-icon></u-col>
						</u-row>

						<u-row style=" border: 1upx solid #e9e9e9; border-radius: 10upx; box-shadow:5px 5px 10px #e4e4e4; padding: 30upx 20upx;" class="u-m-t-40">
							<u-col span="1.5"><u-image src="../../static/img/ic_wechat_pay.png" mode="widthFix" width="60upx" height="60upx"></u-image></u-col>
							<u-col span="9"><view class="u-font-32 text-black">微信支付</view></u-col>
							<u-col span="1.5" style="text-align: right;"><u-icon name="arrow-right"></u-icon></u-col>
						</u-row>
					</view>
				</view>
				<u-line class="u-m-t-40"></u-line>
				<view class="u-font-32 text-black u-padding-30 text-center" @click="show = false">取消支付</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
export default {
	data() {
		return {
			show: false,
			titleBg: {
				background: '#a16d47'
			}
		};
	},
	methods: {
		getVip() {
			this.show = true;
		}
	}
};
</script>

<style>
page {
	background-color: #cd956c;
}
</style>
