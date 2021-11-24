<template>
	<view>
		<u-navbar :border-bottom="false" title="信用评价" :background="titleBackground" title-color="#FFFFFF" backIconColor="#FFFFFF"></u-navbar>
		<view style="margin-bottom: -30%; z-index: 100;">
			<view><image src="../../static/img/ic_bg_xy.png" style="width: 100%;" mode="widthFix"></image></view>
		</view>
		<view>
			<view style="position: relative; padding: 10upx 20upx;">
				<u-row>
					<u-col span="9" style="width: 10%;">
						<view class="text-white text-bold u-font-32 u-line-1" style="width: 100%;">安徽恒创咨询工程有限公司</view>
						<view><text class="text-black u-font-25">6546545456456456151W</text></view>
					</u-col>
					<u-col span="3"><view class="text-white u-font-28 canBt">取消关联</view></u-col>
				</u-row>
			</view>
			<view class="u-m-t-20">
				<u-row style="padding: 0upx 20upx;">
					<u-col span="6" style="padding-right: 20upx;">
						<view class="creEva">
							<view class="creImg"><image class="evaImg" src="../../static/img/ic_wxts.png" mode="widthFix"></image></view>
							<view class="u-padding-20 text-center text-black text-bold u-font-32">温馨提示</view>
						</view>
					</u-col>
					<u-col span="6" style="padding-left: 20upx;">
						<view class="creEva">
							<view class="creImg"><image class="evaImg" src="../../static/img/ic_zxtz.png" mode="widthFix"></image></view>
							<view class="u-padding-20 text-center text-black text-bold u-font-32">最新通知</view>
						</view>
					</u-col>
				</u-row>
				<u-row style="padding: 40upx 20upx;">
					<u-col span="6" style="padding-right: 20upx;">
						<view class="creEva" @click="openProgress">
							<view class="creImg"><image class="evaImg" src="../../static/img/ic_sblc.png" mode="widthFix"></image></view>
							<view class="u-padding-20 text-center text-black text-bold u-font-32">申报流程</view>
						</view>
					</u-col>
					<u-col span="6" style="padding-left: 20upx;">
						<view class="creEva">
							<view class="creImg"><image class="evaImg" src="../../static/img/ic_pjsq.png" mode="widthFix"></image></view>
							<view class="u-padding-20 text-center text-black text-bold u-font-32">评价申请</view>
						</view>
					</u-col>
				</u-row>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			titleBackground: {
				background: '#01a7fd'
			},
			customStyle: {
				padding: '0upx',
				borderRadius: '20upx'
			}
		};
	},
	onLoad() {
		setTimeout(function() {
			uni.navigateTo({
				url: 'relation-id'
			});
		}, 500);
	},
	methods: {
		openProgress() {
			uni.navigateTo({
				url: 'credit-process'
			});
		}
	}
};
</script>

<style>
page {
	background-color: #f4f4f4;
}
.creEva {
	width: 100%;
	border-radius: 10upx;
	background-color: #ffffff;
	-webkit-box-shadow: 0px 2px 2px #c3c3c3;
	-moz-box-shadow: 0px 2px 2px #c3c3c3;
	box-shadow: 0px 2px 2px #c3c3c3;
}
.creImg {
	border-radius: 10upx;
}
.evaImg {
	width: 100%;
	border-radius: 10upx;
}
.canBt {
	background-color: transparent;
	border: 1upx solid #ffffff;
	padding: 8upx 10upx;
	text-align: center;
	border-radius: 10upx;
}
</style>
