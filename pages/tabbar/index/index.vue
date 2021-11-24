	<template>
	<mescroll-body :bottombar="false" ref="mescrollRef" @init="mescrollInit" :up="$config.upOption" :down="downOption" @down="downCallback" @up="upCallback">
		<view class="u-skeleton">
			<view class="headBg text-white u-skeleton-fillet">
				<view class="titleStyle text-writ text-center text-bold">水利行业招标信息实时推送</view>
				<view class="text-center text-def-size u-m-30">今日新增：19724条信息</view>
				<u-sticky :h5-nav-height="StatusBar" z-index="1000" index="1" :bg-color="showSti ? 'bg-main' : 'bg-tran'" @fixed="fixed()" @unfixed="unfixed()">
					<view v-show="showSti" class="bg-main" :style="[{ height: StatusBar + 'px' }]"></view>
					<view @click="search" style="padding: 20upx; height: 130upx;" :class="showSti ? 'bg-main' : 'bg-tran'">
						<view style="padding: 10upx 20upx; border-radius: 10upx;" class="bg-white u-flex" id="searInput">
							<u-icon name="search" class="text-gray u-font-40"></u-icon>
							<view class="u-size-mini text-gray u-m-15">请输入产品，行业或者项目名称</view>
						</view>
					</view>
				</u-sticky>
				<view class="u-p-lr-20">
					<view class="text-def-size">热搜：
					<text class="u-m-r-40" v-for="index in 2" :key="index">招标</text>
					</view>
				</view>
			</view>

			<view>
				<u-row justify="center" align="center" class="u-p-20">
					<u-col text-align="center" span="3" @click="openZbNews">
						<view><image class="u-skeleton-circle" src="../../../static/img/ic_zbzxico.png" mode="widthFix" style="width: 100upx; height: 100upx;"></image></view>
						<view class="u-font-30 text-black u-skeleton-rect">招标资讯</view>
					</u-col>
					<u-col text-align="center" span="3" @click="openLaw">
						<view><image class="u-skeleton-circle" src="../../../static/img/ic_zbflico.png" mode="widthFix" style="width: 100upx; height: 100upx;"></image></view>
						<view class="u-font-30 text-black u-skeleton-rect">招标法律</view>
					</u-col>
					<u-col text-align="center" span="3" @click="openPolicy">
						<view><image class="u-skeleton-circle" src="../../../static/img/ic_zbzcico.png" mode="widthFix" style="width: 100upx; height: 100upx;"></image></view>
						<view class="u-font-30 text-black u-skeleton-rect">招标政策</view>
					</u-col>
					<u-col text-align="center" span="3" @click="openStand">
						<view><image class="u-skeleton-circle" src="../../../static/img/ic_zbgfico.png" mode="widthFix" style="width: 100upx; height: 100upx;"></image></view>
						<view class="u-font-30 text-black u-skeleton-rect">招标规范</view>
					</u-col>
				</u-row>
			</view>
			<!-- <swiper class="u-skeleton-rect" style="height: 120upx;" indicator-dots="true" autoplay="true">
				<swiper-item><image src="../../../static/img/ic_zbbanner.png" mode="aspectFill" style="height: 120upx; width: 100%;"></image></swiper-item>
				<swiper-item><image src="../../../static/img/ic_zbzcico.png" mode="aspectFill" style="height: 120upx; width: 100%;"></image></swiper-item>
			</swiper> -->
			<u-line></u-line>
			<u-sticky class="u-skeleton-rect" :h5-nav-height="StatusBar" z-index="900" index="2" :offsetTop="getTop()">
				<view @click="goMore" class="u-p-20 bg-white"><u-section title="最新标讯" sub-title="更多" :showLine="false"></u-section></view>
				<u-line color="#dddddd" class="u-line"></u-line>
			</u-sticky>
			<view class="list-wrap">
				<u-cell-group :border="false">
					<u-cell-item @click="itemClick" v-for="index in 20" :key="index" style="padding: 20upx;" hover-class="cell-hover-class" :arrow="false">
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
			<u-skeleton :loading="loading" :animation="true" bgColor="#FFF"></u-skeleton>
		</view>
	</mescroll-body>
</template>

<script>
import update from 'uni_modules/uni-upgrade-center-app/utils/check-update';
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
export default {
	mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
	data() {
		return {
			mainBg: {
				background: '#2A96F0',
				titleStyle: {
					fontSize: '32upx'
				}
			},
			showSti: false,
			appear: false,
			winHeight: 0,
			loading: true,
			downOption: {
				use: true,
				auto: false,
				bgColor: '#00a8fe',
				textColor: '#FFFFFF',
				autoShowLoading: false,
				isLock: false
			}
		};
	},
	onPullDownRefresh() {
		setTimeout(function() {
			uni.stopPullDownRefresh();
		}, 1000);
	},
	onLoad() {
		var that = this;
		uni.getSystemInfo({
			success: function(res) {
				that.winHeight = res.windowHeight - that.CustomBar;
			}
		});
		setTimeout(function() {
			that.loading = false;
		}, 1000);
		this.$pushUtils.pushListener();
		this.$pushUtils.cancelPushClear();
	},
	methods: {
		getTop() {
			var top = (this.StatusBar / uni.getSystemInfoSync().windowWidth) * 750;
			return top + 130;
		},
		itemClick() {
			uni.navigateTo({
				url:'../../bx_news_del/bx_news_del'
			})
		},
		fixed() {
			this.showSti = true;
		},
		unfixed() {
			this.showSti = false;
		},
		/*下拉刷新的回调 */
		downCallback() {
			this.mescroll.endSuccess();
			update();
		},
		/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
		upCallback() {
			this.mescroll.endUpScroll(true);
		},
		search() {
			uni.navigateTo({
				url: '../../messageList/messageList'
			});
		},
		openZbNews() {
			uni.navigateTo({
				url: '../../zb-news/zb-news'
			});
		},
		openLaw() {
			uni.navigateTo({
				url: '../../law/law'
			});
		},
		openPolicy() {
			uni.navigateTo({
				url: '../../policy/policy'
			});
		},
		openStand() {
			uni.navigateTo({
				url: '../../standard/standard'
			});
		},
		goMore() {
			uni.navigateTo({
				url: '../../more-news/more-news'
			});
		}
	}
};
</script>

<style lang="scss">
.headBg {
	height: 410upx;
	background-image: url(../../../static/img/ic_zbbanner.png);
	background-size: cover;
	padding-top: 60upx;
}
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
