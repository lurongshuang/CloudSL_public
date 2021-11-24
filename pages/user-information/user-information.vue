<template>
	<view>
		<u-navbar title="个人信息"></u-navbar>
		<view class="u-p-20">
			<u-cell-group :border="false">
				<u-cell-item title="头像" :title-style="imgtyle" :arrow="false">
					<view slot="right-icon" @click="chooseImg">
						<u-image :src="imgPath" shape="circle" height="100upx" width="100upx" :lazy-load="true"></u-image>
					</view>
				</u-cell-item>
				<u-cell-item :arrow="false">
					<view slot="title" class="u-font-28 text-8a8a8a">姓名</view>
					<view slot="label"><u-input :custom-style="labelStyle1" placeholder="请填写姓名"></u-input></view>
				</u-cell-item>
				<u-cell-item @click="sexShow = true" title="性别" :label="sexDef" :title-style="titleStyle" :label-style="labelStyle"></u-cell-item>
				<u-cell-item @click="workShow = true" title="参加工作时间" :label="workDef" :title-style="titleStyle" :label-style="labelStyle"></u-cell-item>
				<u-cell-item :arrow="false">
					<view slot="title" class="u-font-28 text-8a8a8a">微信号</view>
					<view slot="label"><u-input :custom-style="labelStyle1" placeholder="请填写微信号"></u-input></view>
				</u-cell-item>
				<u-cell-item @click="borShow = true" title="出生日期" :label="borDef" :title-style="titleStyle" :label-style="labelStyle"></u-cell-item>
				<u-cell-item :arrow="false">
					<view slot="title" class="u-font-28 text-8a8a8a">邮箱</view>
					<view slot="label"><u-input :custom-style="labelStyle1" placeholder="请填写邮箱"></u-input></view>
				</u-cell-item>
			</u-cell-group>
			<view class="u-m-tb-50"><u-button style="background-color: #2A96F0; color: #FFFFFF; font-size: 30upx;">保存</u-button></view>
		</view>
		<u-select v-model="sexShow" @confirm="sexConfirm" :list="sexList"></u-select>
		<u-picker @confirm="workConfirm" mode="time" v-model="workShow"></u-picker>
		<u-picker @confirm="borConfirm" mode="time" v-model="borShow"></u-picker>
	</view>
</template>

<script>
export default {
	data() {
		return {
			titleStyle: {
				color: '#808080',
				'font-size': '28upx'
			},
			imgtyle: {
				color: '#333333',
				'font-size': '32upx'
			},
			labelStyle: {
				color: '#333333',
				'font-size': '32upx',
				'padding-top': '20upx',
				'padding-bottom': '15upx'
			},
			labelStyle1: {
				'font-size': '32upx'
			},
			sexShow: false,
			sexList: [
				{
					value: '1',
					label: '男'
				},
				{
					value: '2',
					label: '女'
				}
			],
			sexDef: '男',
			workShow: false,
			workDef: '2021-04-26',
			borShow: false,
			borDef: '2021-04-26',
			imgPath:'../../static/img/ic_user-ico.png'
		};
	},
	methods: {
		sexConfirm(e) {
			this.sexDef = e[0].label;
		},
		workConfirm(e) {
			this.workDef = e.year + '-' + e.month + '-' + e.day;
		},
		borConfirm(e) {
			this.borDef = e.year + '-' + e.month + '-' + e.day;
		},
		chooseImg() {
			var that = this;
			try {
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					sourceType: ['album', 'camera'],
					success: res => {
						that.imgPath = res.tempFilePaths[0];
					}
				});
			} catch (e) {}
		}
	}
};
</script>

<style></style>
