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
					<u-dropdown-item v-model="value1" :title="value1 == 0 ? '法律' : options1[value1].label" :options="options1"></u-dropdown-item>
				</u-dropdown>
			</view>
		</u-sticky>
		<mescroll-body ref="mescrollRef" @init="mescrollInit" :up="$config.upOption" :down="$config.downOption" @down="downCallback" @up="upCallback">
			<view class="list-wrap">
				<u-cell-group :border="false">
					<u-cell-item @click="itemClick" v-for="index in 20" :key="index" style="padding: 20upx;" hover-class="cell-hover-class" :arrow="false">
						<view class="text-def-size text-black text-bold u-skeleton-rect" slot="title">招标邀请书{{ index }}</view>
						<view slot="label">
							<view class="u-m-t-10 text-gray u-line-2 u-font-28">
								招标人采用邀请招标方式，应当向三个以上具备承担招标项目的能力，自信良好的特定的法人或者其他组织发出投标邀请出。
							</view>
							<u-row class="u-m-t-10">
								<view class="u-m-r-20 u-font-25 tag text-main u-skeleton-rect" style="background-color: #E4F4FD;">招投标邀请书</view>
								<view class="u-m-r-20 u-font-25 tag text-main u-skeleton-rect" style="background-color: #E4F4FD;">邀请招标</view>
								<view class="u-m-r-20 u-font-25 tag text-main u-skeleton-rect" style="background-color: #E4F4FD;">招标项目</view>
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
					label: '招投标法',
					value: 1
				},
				{
					label: '行政刑法',
					value: 2
				},
				{
					label: '经济与民商法',
					value: 3
				}
			]
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
		},
		randomColor() {
			return 'rgb(' + Math.floor(Math.random() * 130 + 110) + ',' + Math.floor(Math.random() * 130 + 110) + ',' + Math.floor(Math.random() * 130 + 110) + ')';
		},
		itemClick() {
			uni.navigateTo({
				url: '../company-del/company-del'
			});
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
.colorB6 {
	color: #b6b4b5;
}
.colorF7 {
	color: #f75225;
}
</style>
