<template>
	<view>
		<u-navbar title="评价咨询"></u-navbar>

		<view class="u-padding-20">
			<u-cell-group :border="false">
				<u-cell-item :arrow="false" hover-class="none">
					<view slot="title" class="u-font-35 text-black">企业名称</view>
					<view slot="label"><u-input s placeholder="请填写企业名称"></u-input></view>
				</u-cell-item>
				<u-cell-item :arrow="false" hover-class="none">
					<view slot="title" class="u-font-35 text-black">联系人</view>
					<view slot="label"><u-input s placeholder="请填写联系人"></u-input></view>
				</u-cell-item>
				<u-cell-item :arrow="false" hover-class="none">
					<view slot="title" class="u-font-35 text-black">联系电话</view>
					<view slot="label"><u-input s placeholder="请填写联系电话"></u-input></view>
				</u-cell-item>
				<u-cell-item :arrow="false" hover-class="none">
					<view slot="title" class="u-font-35 text-black">咨询内容</view>
					<view slot="label" class="u-p-t-20"><u-input type="textarea" placeholder="请填写咨询内容" :border="true"></u-input></view>
				</u-cell-item>
			</u-cell-group>

			<view class="u-m-t-50"><u-button @click="sub" style="background-color: #2A96F0; color: #FFFFFF; font-size: 30upx;">提交</u-button></view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		sub() {
			uni.showModal({
				content: '已收到您的评价咨询，我们将安排工作人员与您取得联系，请耐心等待。',
				showCancel:false,
				complete() {
					uni.navigateBack({
						delta: 2
					});
				}
			});
		}
	}
};
</script>

<style></style>
