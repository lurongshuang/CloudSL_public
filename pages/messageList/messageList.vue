<template>
	<view>
		<u-navbar>
			<view class="slot-wrap">
				<view class="search-wrap"><u-search></u-search></view>
			</view>
		</u-navbar>
		<u-sticky :offset-top="getTop()" :h5-nav-height="StatusBar">
			<view class="bg-white">
				<u-dropdown class="u-dropdown" ref="uDropdown" :border-bottom="true">
					<u-dropdown-item title="北京">
						<view class="slot-content" style="height: 800upx;">
							<u-row class="bg-white">
								<u-col span="6" class="u-p-lr-0">
									<view class="text-center">
										<scroll-view scroll-y="true" style="height: 800upx;">
											<u-cell-group :border="false"><u-cell-item :arrow="false" v-for="index in 20" title="北京"></u-cell-item></u-cell-group>
										</scroll-view>
									</view>
								</u-col>
								<u-col span="6" class="u-p-lr-0">
									<view class="text-center">
										<scroll-view scroll-y="true" style="height: 800upx;">
											<u-cell-group :border="false">
												<u-cell-item style="background-color: #EEEEEE; color: #333333;" :arrow="false" v-for="index in 20" title="北京"></u-cell-item>
											</u-cell-group>
										</scroll-view>
									</view>
								</u-col>
							</u-row>
						</view>
					</u-dropdown-item>
					<u-dropdown-item v-model="value1" :title="value1 == 0 ? '招标类型' : options1[value1].label" :options="options1"></u-dropdown-item>
					<u-dropdown-item title="更多筛选">
						<view class="slot-content bg-white">
							<view class="u-padding-20 text-black u-font-30 text-bold">检索内容</view>
							<u-grid col="3" :border="false">
								<u-grid-item :customStyle="customStyle"><u-button :custom-style="btCustomStyle" size="medium" class="buttonStyle">全部</u-button></u-grid-item>
								<u-grid-item :customStyle="customStyle"><u-button :custom-style="btCustomStyle" size="medium" class="buttonStyle">标题</u-button></u-grid-item>
								<u-grid-item :customStyle="customStyle"><u-button :custom-style="btCustomStyle" size="medium" class="buttonStyle">内容</u-button></u-grid-item>
							</u-grid>
							<view class="u-padding-20 text-black u-font-30 text-bold">匹配方式</view>
							<u-grid col="3" :border="false">
								<u-grid-item :customStyle="customStyle"><u-button :custom-style="btCustomStyle" size="medium" class="buttonStyle">模糊</u-button></u-grid-item>
								<u-grid-item :customStyle="customStyle"><u-button :custom-style="btCustomStyle" size="medium" class="buttonStyle">精准</u-button></u-grid-item>
							</u-grid>
							<view class="u-padding-20 text-black u-font-30 text-bold">时间</view>
							<u-grid col="3" :border="false">
								<u-grid-item :customStyle="customStyle"><u-button :custom-style="btCustomStyle" size="medium" class="buttonStyle">不限</u-button></u-grid-item>
								<u-grid-item :customStyle="customStyle"><u-button :custom-style="btCustomStyle" size="medium" class="buttonStyle">近七天</u-button></u-grid-item>
								<u-grid-item :customStyle="customStyle"><u-button :custom-style="btCustomStyle" size="medium" class="buttonStyle">近15天</u-button></u-grid-item>
								<u-grid-item :customStyle="customStyle"><u-button :custom-style="btCustomStyle" size="medium" class="buttonStyle">近30天</u-button></u-grid-item>
								<u-grid-item :customStyle="customStyle"><u-button :custom-style="btCustomStyle" size="medium" class="buttonStyle">近半年</u-button></u-grid-item>
								<u-grid-item :customStyle="customStyle"><u-button :custom-style="btCustomStyle" size="medium" class="buttonStyle">近1年</u-button></u-grid-item>
							</u-grid>
						</view>
					</u-dropdown-item>
				</u-dropdown>
			</view>
		</u-sticky>
		<mescroll-body ref="mescrollRef" @init="mescrollInit" :up="$config.upOption" :down="$config.downOption" @down="downCallback" @up="upCallback">
			<view class="list-wrap">
				<u-cell-group :border="false">
					<u-cell-item v-for="index in 20" :key="index" style="padding: 20upx;" hover-class="cell-hover-class" :arrow="false">
						<view class="text-def-size text-black text-bold u-skeleton-rect" slot="title">北京市海淀区人民放空办公室2012年1月1日至2月1日政府采购意向书{{ index }}</view>
						<view slot="label">
							<u-row class="u-m-t-10">
								<u-col span="8" style="padding: 0upx;">
									<u-row>
										<view class="u-m-r-20 u-font-25 tag text-main u-skeleton-rect" style="background-color: #E4F4FD;">海淀</view>
										<view class="u-m-r-20 text-main-yellow u-font-25 tag u-skeleton-rect" style="background-color: #FDF0E9;">招标</view>
									</u-row>
								</u-col>
								<u-col span="4" class="text-right" style="padding: 0upx; text-align: right;">
									<u-icon name="clock" class="u-font-30 text-gray"></u-icon>
									<text class="u-font-28 u-m-l-10 text-gray u-skeleton-rect">2021-03-08</text>
								</u-col>
							</u-row>
						</view>
					</u-cell-item>
				</u-cell-group>
			</view>
		</mescroll-body>
	</view>
</template>

<script>
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
export default {
	mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
	data() {
		return {
			value1: 0,
			value2: 2,
			options1: [
				{
					label: '全部',
					value: 0
				},
				{
					label: '招标',
					value: 1
				},
				{
					label: '中标',
					value: 2
				},
				{
					label: '公示',
					value: 3
				}
			],
			customStyle: {
				padding: '0rpx 20upx',
				'padding-bottom': '20upx'
			},
			btCustomStyle:{
				color: '#ffffff',
				'background-color': '#007aff',
				width: '100%'
			}
		};
	},
	methods: {
		closeDropdown() {
			this.$refs.uDropdown.close();
		} /*下拉刷新的回调 */,
		downCallback() {
			this.mescroll.endSuccess();
		},
		/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
		upCallback() {
			this.mescroll.endUpScroll(true);
		},
		getTop() {
			var top = (this.CustomBar / uni.getSystemInfoSync().windowWidth) * 750;
			return top;
		}
	}
};
</script>

<style>
.search-wrap {
	margin: 0 20rpx;
	flex: 1;
}
.slot-wrap {
	display: flex;
	align-items: center;
	flex: 1;
}
.tag {
	border-radius: 10upx;
	padding: 5upx 15upx;
}
.buttonStyle {
	background-color: #007aff;
	color: #ffffff;
	width: 100%;
}
</style>
