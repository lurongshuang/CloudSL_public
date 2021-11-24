<template>
	<view>
		<u-navbar :is-back="false" title="信用信息" title-color="#333333"></u-navbar>
		<mescroll-body
			:height="winHeight"
			:bottombar="false"
			ref="mescrollRef"
			@init="mescrollInit"
			:up="$config.upOptionNo"
			:down="$config.downOption"
			@down="downCallback"
			@up="upCallback"
		>
			<view class="u-skeleton">
				<view class="text-white u-p-20">
					<swiper style="height: 280upx;" class="u-skeleton-rect" indicator-dots="true" autoplay="true">
						<swiper-item><image src="../../../static/img/ic_xyxx_banner.png" mode="aspectFill" style="height: 280upx; width: 100%;"></image></swiper-item>
						<swiper-item><image src="../../../static/img/ic_xyxx_banner.png" mode="aspectFill" style="height: 280upx; width: 100%;"></image></swiper-item>
					</swiper>
				</view>
				<view style="padding: 0upx 20upx;">
					<view @click="groudClick(1)" style="padding: 10upx 30upx; border-radius: 10upx; background-color: #F1F3F2;" class="u-flex u-skeleton-rect" id="searInput">
						<u-icon name="search" class="text-gray u-font-40"></u-icon>
						<view class="u-size-mini text-gray u-m-15">请输入关键字搜索</view>
					</view>
				</view>
				<view style="-webkit-box-shadow:0px 5px 5upx #d0efff; -moz-box-shadow:0px 5px 5px #d0efff; box-shadow:0px 5px 5px #d0efff;">
					<u-row justify="center" align="center" class="u-p-20">
						<u-col text-align="center" span="4" class="u-m-tb-15" @click="groudClick(1)">
							<view><image class="u-skeleton-circle" src="../../../static/img/ic_dwcx_ico.png" mode="widthFix" style="width: 100upx; height: 100upx;"></image></view>
							<view class="u-font-30 text-black u-skeleton-rect">单位查询</view>
						</u-col>
						<u-col text-align="center" span="4" class="u-m-tb-15" @click="groudClick(2)">
							<view><image class="u-skeleton-circle" src="../../../static/img/ic_rycx_ico.png" mode="widthFix" style="width: 100upx; height: 100upx;"></image></view>
							<view class="u-font-30 text-black u-skeleton-rect">人员查询</view>
						</u-col>
						<u-col text-align="center" span="4" class="u-m-tb-15" @click="groudClick(3)">
							<view><image class="u-skeleton-circle" src="../../../static/img/ic_xmcx_ico.png" mode="widthFix" style="width: 100upx; height: 100upx;"></image></view>
							<view class="u-font-30 text-black u-skeleton-rect">项目查询</view>
						</u-col>
						<u-col text-align="center" span="4" class="u-m-tb-15" @click="groudClick(4)">
							<view><image class="u-skeleton-circle" src="../../../static/img/ic_slbz_ico.png" mode="widthFix" style="width: 100upx; height: 100upx;"></image></view>
							<view class="u-font-30 text-black u-skeleton-rect">水利标准</view>
						</u-col>
						<u-col text-align="center" span="4" class="u-m-tb-15" @click="groudClick(5)">
							<view><image class="u-skeleton-circle" src="../../../static/img/ic_xycn_ico.png" mode="widthFix" style="width: 100upx; height: 100upx;"></image></view>
							<view class="u-font-30 text-black u-skeleton-rect">信用承诺</view>
						</u-col>
						<u-col text-align="center" span="4" class="u-m-tb-15">
							<view><image class="u-skeleton-circle" src="../../../static/img/ic_hysj_ico.png" mode="widthFix" style="width: 100upx; height: 100upx;"></image></view>
							<view class="u-font-30 text-black u-skeleton-rect">行业数据</view>
						</u-col>
						<!-- <u-col text-align="center" span="3" class="u-m-tb-15">
							<view><image class="u-skeleton-circle" src="../../../static/img/ic_xypj_ico.png" mode="widthFix" style="width: 100upx; height: 100upx;"></image></view>
							<view class="u-font-30 text-black u-skeleton-rect">信用评价</view>
						</u-col> -->
					</u-row>
				</view>
				<view class="u-m-t-15 bg-white u-skeleton-rect">
					<u-sticky :h5-nav-height="StatusBar" :offset-top="getTop()" index="1" @fixed="fixed()" @unfixed="unfixed()">
						<!-- <view v-show="showSti" class="bg-main" :style="[{ height: CustomBar + 'px' }]"></view> -->
						<u-tabs-swiper
							activeColor="#2A96F0"
							ref="uTabs"
							:list="tabList"
							:current="current"
							@change="change"
							:is-scroll="false"
							height="70"
							bar-width="120"
							bar-height="5"
							:bar-style="barStyle"
						></u-tabs-swiper>
						<u-line color="#dddddd" class="u-line"></u-line>
					</u-sticky>
				</view>
				<view class="list-wrap uni-swiper-page">
					<u-cell-group :border="false">
						<u-cell-item @click="itemClick" v-for="index in 20" :key="index" style="padding: 20upx;" hover-class="cell-hover-class" :arrow="false">
							<view class="text-def-size text-black text-bold u-skeleton-rect" slot="title">
								北京市海淀区人民放空办公室2012年1月1日至2月1日政府采购意向书{{ index }}
							</view>
							<view slot="label">
								<u-row class="u-m-t-10">
									<u-col span="8" style="padding: 0upx;">
										<u-row><view class="u-m-r-20 u-font-25 tag text-main u-skeleton-rect" style="background-color: #E4F4FD;">中国政府网</view></u-row>
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
			</view>
			<u-skeleton :hasTop="hasTop" :loading="loading" :animation="true" bgColor="#FFF"></u-skeleton>
		</mescroll-body>
	</view>
</template>

<script>
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
import listItem from './list-item.vue';
export default {
	components: {
		listItem
	},
	mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
	data() {
		return {
			mainBg: {
				background: '#2A96F0',
				titleStyle: {
					fontSize: '32upx'
				}
			},
			loading: true,
			showSti: false,
			appear: false,
			winHeight: 0,
			tabList: [
				{
					name: '信用动态'
				},
				{
					name: '政策法规'
				},
				{
					name: '行政处罚'
				}
			],
			current: 0,
			swiperCurrent: 0,
			barStyle: {
				position: 'absolute',
				bottom: '0'
			},
			hasTop: 44
		};
	},
	onPullDownRefresh() {
		setTimeout(function() {
			uni.stopPullDownRefresh();
		}, 1000);
	},
	// 在对应的show和hide页面生命周期中打开或关闭监听
	onShow() {
		this.showSti = false;
	},
	onHide() {
		this.showSti = false;
	},
	onLoad() {
		var that = this;
		uni.getSystemInfo({
			success: function(res) {
				that.winHeight = res.windowHeight - that.CustomBar - uni.upx2px(70);
			}
		});
		setTimeout(function() {
			that.loading = false;
		}, 500);
		that.hasTop = that.CustomBar;
	},
	methods: {
		fixed() {
			this.showSti = true;
		},
		unfixed() {
			this.showSti = false;
		},
		// tab栏切换
		change(index) {
			this.current = index;
		},
		getTop() {
			var top = (this.CustomBar / uni.getSystemInfoSync().windowWidth) * 750;
			return top;
		},
		itemClick() {},
		/*下拉刷新的回调 */
		downCallback() {
			this.mescroll.endSuccess();
		},
		/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
		upCallback() {
			this.mescroll.endUpScroll(false);
		},
		groudClick(index) {
			switch (index) {
				case 0:
					break;
				case 1:
					//单位查询
					uni.navigateTo({
						url: '../../company/company-search/company-search'
					});
					break;
				case 2:
					//人员查询
					uni.navigateTo({
						url: '../../personnel/personnel'
					});
					break;

				case 3:
					//项目查询
					uni.navigateTo({
						url: '../../project/project'
					});
					break;
				case 4:
					//水利标准
					uni.navigateTo({
						url: '../../nvue_list/nvue_list'
					});
					break;
				case 5:
					//信用承诺
					uni.navigateTo({
						url: '../../credit-commitment/credit-commitment'
					});
					break;
			}
		}
	}
};
</script>

<style lang="scss">
.titleStyle {
	font-size: 38upx;
}
.tag {
	border-radius: 10upx;
	padding: 5upx 15upx;
}
.bg-tran {
	background-color: transparent;
}
</style>
