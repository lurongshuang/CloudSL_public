<template>
	<view>
		<u-navbar title="招聘信息"></u-navbar>
		<view class="u-padding-20">
			<view class="u-m-t-20" style="padding-bottom: 150upx;">
				<u-row>
					<u-col span="9"><view class="u-font-50 text-black text-bold">水利施工安全员</view></u-col>
					<u-col span="3"><view class="colorF82E06 u-font-35 text-right">12-15K</view></u-col>
				</u-row>
				<view class="u-p-tb-20 u-flex">
					<u-icon name="map" size="40" color="#808080"></u-icon>
					<view class="text-8a8a8a u-font-30 u-m-l-5">北京 丰台区</view>
					<u-icon name="map" size="40" color="#808080" class="u-m-l-40"></u-icon>
					<view class="text-8a8a8a u-font-30 u-m-l-5">3-5年</view>
					<u-icon name="map" size="40" color="#808080" class="u-m-l-40"></u-icon>
					<view class="text-8a8a8a u-font-30 u-m-l-5">本科</view>
				</view>
				<view class="u-m-t-10">
					<u-cell-group>
						<u-cell-item style="padding: 25upx 0upx;" :border-bottom="false" :border-top="false" @click="gotoHr">
							<view class="u-flex" slot="label">
								<image style="width: 100upx; height: 100upx;" src="../../../static/img/ic_biaoxun_ico.png" mode="widthFix"></image>
								<view class="u-m-lr-20">
									<view class="u-p-tb-10 u-font-30 text-black">李女士</view>
									<view class="u-p-tb-10 u-font-30 text-black">恒华伟业 · 人力资源</view>
								</view>
							</view>
						</u-cell-item>
					</u-cell-group>
				</view>
				<view class="u-m-tb-30 u-flex">
					<view style="width: 10upx; height: 10upx; border-radius: 10upx;" class="bg-main u-m-r-20"></view>
					<text class="text-black u-font-32 text-bold">职位详情</text>
				</view>
				<view class="u-p-b-30">
					<text class="text-8a8a8a u-font-30" style="line-height: 50upx; letter-spacing: 3upx;">
						工作职责： 1、负责公司工作职责： 1、负责公司项目方案的售前业务支持，配合市场部门挖掘和 把握客户需求，协助市场人员与客户沟通，引导客户需求并
						提出咨询建议方案。 职位要求：工作职责： 1、负责公司项目方案的售前业务支持，配合市场部门挖掘和 把握客户需求，协助市场人员与客户沟通，引导客户需求并
						提出咨询建议方案。 职位要求：工作职责： 1、负责公司项目方案的售前业务支持，配合市场部门挖掘和 把握客户需求，协助市场人员与客户沟通，引导客户需求并
						提出咨询建议方案。 职位要求：项目方案的售前业务支持，配合市场部门挖掘和 把握客户需求，协助市场人员与客户沟通，引导客户需求并 提出咨询建议方案。 职位要求：
						1、负责公司项目方案的售前业务支持，配合市场部门挖掘和 把握客户需求，协助市场人员与客户沟通，引导客户需求并 提出咨询建议方案。
					</text>
				</view>
				<view>
					<u-cell-group>
						<u-cell-item style="padding: 25upx 0upx;" :border-bottom="false" :border-top="false" @click="gotoCom">
							<view class="u-flex" slot="label">
								<image style="width: 100upx; height: 100upx;" src="../../../static/img/ic_biaoxun_ico.png" mode="widthFix"></image>
								<view class="u-m-lr-20">
									<view class="u-p-tb-10 u-font-30 text-black">北京恒华伟业科技有限公司</view>
									<view class="u-p-tb-10 u-font-30 text-black">未融资 · 100-499人</view>
								</view>
							</view>
						</u-cell-item>
					</u-cell-group>
				</view>
			</view>
		</view>
		<view style="position: fixed; bottom: 0upx; width: 100%; z-index: 1000; background-color: #FFFFFF;">
			<u-line></u-line>
			<u-row class="u-padding-30">
				<u-col span="4">
					<view><u-button style="background-color: #FC6002; color: #FFFFFF; font-size: 30upx;">发送简历</u-button></view>
				</u-col>
				<u-col span="8">
					<view><u-button style="background-color: #2A96F0; color: #FFFFFF; font-size: 30upx;">立即沟通</u-button></view>
				</u-col>
			</u-row>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		gotoHr(){
			uni.navigateTo({
				url:'../hr-del/hr-del'
			})
		},
		gotoCom(){
			uni.navigateTo({
				url:'../company-del/company-del'
			})
		}
	}
};
</script>

<style>
.colorF82E06 {
	color: #f82e06;
}
</style>
