<template>
	<view>
		<u-navbar title="切换身份"></u-navbar>
		<view class="u-m-t-100">
			<view class="text-center u-padding-100">
				<image v-show="isPer" src="../../static/img/ic_person_img.png" mode="widthFix" style="width: 100%; height: auto;"></image>
				<image v-show="!isPer" src="../../static/img/ic_company_img.png" mode="widthFix" style="width: 100%; height: auto;"></image>
			</view>
			<view class="text-center text-bold text-main u-font-50">您当前的身份是 {{ isPer ? '"个人"' : '"企业"' }}</view>
			<view class="u-p-lr-50 u-m-t-50">
				<u-button @click="changeId" style="background-color: #2A96F0; color: #FFFFFF; font-size: 30upx;">切换 {{ !isPer ? '"个人"' : '"企业"' }} 身份</u-button>
			</view>
			<view class="u-p-lr-50 u-m-t-50"><u-button @click="pageBack" style="background-color: #FFFFFF; color: #2A96F0; font-size: 30upx;">返回</u-button></view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			isPer: false
		};
	},
	methods: {
		pageBack(){
			uni.navigateBack({})
		},
		changeId(){
			uni.navigateTo({
				url:'maintain-co-information/maintain-co-information'
			})
		}
	}
};
</script>

<style></style>
