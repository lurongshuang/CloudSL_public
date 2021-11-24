<template>
	<view>
		<u-navbar title="求职期望"></u-navbar>
		<view>
			<view class="u-m-tb-20">
				<view class="u-padding-20">
					<u-row>
						<u-col span="12" style="padding: 0upx;"><view class="text-black u-font-40 text-bold">添加求职期望</view></u-col>
					</u-row>
					<view class="text-8a8a8a u-font-28 u-m-t-20">求职期望不同，推荐的职位也会不同</view>
				</view>
			</view>
			<view><u-cell-item  title="城市" :label="addressDef" :title-style="titleStyle" :label-style="labelStyle"></u-cell-item></view>
			<view><u-cell-item  title="期望职位" :label="recruitDef" :title-style="titleStyle" :label-style="labelStyle"></u-cell-item></view>
			<view><u-cell-item  title="薪资要求" :label="xinziDef" :title-style="titleStyle" :label-style="labelStyle"></u-cell-item></view>
			<view class="u-padding-50 u-m-t-40">
				<u-button style="background-color: #2A96F0; color: #FFFFFF; font-size: 30upx;">完成</u-button>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			addressDef: '北京',
			recruitDef:'安全员',
			xinziDef:'1000-5000K',
			titleStyle: {
				color: '#808080',
				'font-size': '28upx'
			},
			labelStyle: {
				color: '#333333',
				'font-size': '32upx',
				'padding-top': '20upx',
				'padding-bottom': '15upx'
			}
		};
	},
	methods: {}
};
</script>

<style></style>
