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
			<view class="container">
				<view>
					<view class="text-white u-p-20">
						<swiper style="height: 280upx;" class="u-skeleton-rect" indicator-dots="true" autoplay="true">
							<swiper-item>
								<image
									@click="bannerClick(1)"
									src="../../../static/img/ic_banner2.png"
									mode="aspectFill"
									style="height: 280upx; width: 100%; border-radius: 20upx;"
								></image>
							</swiper-item>
							<swiper-item>
								<image
									@click="bannerClick(2)"
									src="../../../static/img/ic_banner3.png"
									mode="aspectFill"
									style="height: 280upx; width: 100%; border-radius: 20upx;"
								></image>
							</swiper-item>
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
								<view>
									<image class="u-skeleton-circle" src="../../../static/img/ic_dwcx_ico.png" mode="widthFix" style="width: 100upx; height: 100upx;"></image>
								</view>
								<view class="u-font-30 text-black u-skeleton-rect">单位查询</view>
							</u-col>
							<u-col text-align="center" span="4" class="u-m-tb-15" @click="groudClick(2)">
								<view>
									<image class="u-skeleton-circle" src="../../../static/img/ic_rycx_ico.png" mode="widthFix" style="width: 100upx; height: 100upx;"></image>
								</view>
								<view class="u-font-30 text-black u-skeleton-rect">人员查询</view>
							</u-col>
							<u-col text-align="center" span="4" class="u-m-tb-15" @click="groudClick(3)">
								<view>
									<image class="u-skeleton-circle" src="../../../static/img/ic_xmcx_ico.png" mode="widthFix" style="width: 100upx; height: 100upx;"></image>
								</view>
								<view class="u-font-30 text-black u-skeleton-rect">项目查询</view>
							</u-col>
							<u-col text-align="center" span="4" class="u-m-tb-15" @click="groudClick(4)">
								<view>
									<image class="u-skeleton-circle" src="../../../static/img/ic_slbz_ico.png" mode="widthFix" style="width: 100upx; height: 100upx;"></image>
								</view>
								<view class="u-font-30 text-black u-skeleton-rect">水利标准</view>
							</u-col>
							<u-col text-align="center" span="4" class="u-m-tb-15" @click="groudClick(5)">
								<view>
									<image class="u-skeleton-circle" src="../../../static/img/ic_xycn_ico.png" mode="widthFix" style="width: 100upx; height: 100upx;"></image>
								</view>
								<view class="u-font-30 text-black u-skeleton-rect">信用承诺</view>
							</u-col>
							<u-col text-align="center" span="4" class="u-m-tb-15" @click="groudClick(6)">
								<view>
									<image class="u-skeleton-circle" src="../../../static/img/ic_hysj_ico.png" mode="widthFix" style="width: 100upx; height: 100upx;"></image>
								</view>
								<view class="u-font-30 text-black u-skeleton-rect">行业数据</view>
							</u-col>
							<!-- <u-col text-align="center" span="3" class="u-m-tb-15">
							<view><image class="u-skeleton-circle" src="../../../static/img/ic_xypj_ico.png" mode="widthFix" style="width: 100upx; height: 100upx;"></image></view>
							<view class="u-font-30 text-black u-skeleton-rect">信用评价</view>
						</u-col> -->
						</u-row>
					</view>
				</view>
				<view class="u-m-t-15 bg-white u-skeleton-rect">
					<u-sticky :h5-nav-height="StatusBar" :offset-top="getTop()" index="1" @fixed="fixed()" @unfixed="unfixed()">
						<u-tabs-swiper
							activeColor="#2A96F0"
							ref="uTabs"
							:list="tabList"
							:current="current"
							:is-scroll="false"
							height="70"
							@change="change"
							bar-width="120"
							bar-height="5"
							:bar-style="barStyle"
						></u-tabs-swiper>
						<u-line color="#dddddd" class="u-line"></u-line>
					</u-sticky>
				</view>
				<view>
					<swiper :style="[{ height: getSwiperHe() + 'px' }]" :current="swiperCurrent" :duration="300" @transition="transition" @animationfinish="animationfinish">
						<swiper-item class="u-skeleton-rect"><item ref="child" typeId="1" :isScroll="showSti" :viewHeight="getSwiperHe()"></item></swiper-item>
						<swiper-item class="u-skeleton-rect"><item ref="child1" typeId="3" :isScroll="showSti" :viewHeight="getSwiperHe()"></item></swiper-item>
						<swiper-item class="u-skeleton-rect"><item ref="child2" typeId="6" :isScroll="showSti" :viewHeight="getSwiperHe()"></item></swiper-item>
					</swiper>
				</view>
			</view>
			<u-skeleton :hasTop="hasTop" :loading="loading" :animation="true" bgColor="#FFF"></u-skeleton>
		</mescroll-body>
	</view>
</template>

<script>
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
import item from './item/item.vue';
export default {
	mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
	components: {
		item
	},
	data() {
		return {
			loading: true,
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
			barStyle: {
				position: 'absolute',
				bottom: '0'
			},
			swiperCurrent: 0,
			winHeight: 0,
			showSti: false,
			hasTop: 44
		};
	},
	onLoad() {
		var that = this;
		uni.getSystemInfo({
			success: function(res) {
				that.winHeight = res.windowHeight - that.CustomBar;
			}
		});
		that.hasTop = that.CustomBar;
		setTimeout(function() {
			that.loading = false;
		}, 1500);
	},
	methods: {
		getSwiperHe() {
			return this.winHeight - uni.upx2px(70);
		},
		fixed() {
			this.showSti = true;
		},
		unfixed() {
			this.showSti = false;
		},
		// tab栏切换
		change(index) {
			this.swiperCurrent = index;
		},
		getTop() {
			var top = (this.CustomBar / uni.getSystemInfoSync().windowWidth) * 750;
			return top;
		},
		animationfinish(e) {
			let current = e.detail.current;
			this.$refs.uTabs.setFinishCurrent(current);
			this.swiperCurrent = current;
			this.current = current;
		},
		transition(e) {
			let dx = e.detail.dx;
			this.$refs.uTabs.setDx(dx);
		},
		/*下拉刷新的回调 */
		downCallback() {
			this.mescroll.endSuccess();
			this.$refs.child.downCallback();
			this.$refs.child1.downCallback();
			this.$refs.child2.downCallback();
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
						url: '../../standard-list/standard-list'
					});
					break;
				case 5:
					//信用承诺
					uni.navigateTo({
						url: '../../credit-commitment/credit-commitment'
					});
					break;
				case 6:
					//行业数据
					uni.navigateTo({
						url: '../../statistics/statistics'
					});
					break;
			}
		},
		bannerClick(index) {
			if (index == 1) {
				uni.navigateTo({
					url: '../../evaluate-consulting/evaluate-consulting'
				});
			} else if (index == 2) {
				uni.navigateTo({
					url: '../../more-news/more-news'
				});
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
