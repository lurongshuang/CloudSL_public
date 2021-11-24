<template>
	<view>
		<u-navbar title="标讯" title-color="#333333">
			<view slot="right"><u-icon @click="goSearch" class="u-p-r-20" name="search" size="35"></u-icon></view>
		</u-navbar>
		<u-sticky :offset-top="getTop()" :h5-nav-height="StatusBar">
			<view class="bg-white">
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
			</view>
			<u-line color="#dddddd" class="u-line"></u-line>
		</u-sticky>
		<view class="list-wrap">
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
			<swiper :style="[{ height: winHeight + 'px' }]" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
				<swiper-item class="swiper-item" v-for="(item, index) in tabList" :key="index">
					<scroll-view scroll-y="true" :style="[{ height: winHeight + 'px' }]" @scrolltolower="onreachBottom">
						<u-cell-group :border="false">
							<u-cell-item @click="itemClick" v-for="index in 20" :key="index" style="padding: 20upx;" hover-class="cell-hover-class" :arrow="false">
								<view class="text-def-size text-black text-bold u-skeleton-rect" slot="title">
									北京市海淀区人民放空办公室2012年1月1日至2月1日政府采购意向书{{ index }}
								</view>
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
					</scroll-view>
				</swiper-item>
			</swiper>
			</mescroll-body>
		</view>
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
			tabList: [
				{
					name: '推荐'
				},
				{
					name: '预告'
				},
				{
					name: '招标'
				},
				{
					name: '中标'
				}
			],
			swiperCurrent: 0,
			current: 0,
			barStyle: {
				position: 'absolute',
				bottom: '0'
			},
			winHeight: 0
		};
	},
	onLoad() {
		var that = this;
		uni.getSystemInfo({
			success: function(res) {
				that.winHeight = res.windowHeight - that.CustomBar - uni.upx2px(70);
			}
		});
	},
	methods: {
		onreachBottom(){},
		closeDropdown() {
			this.$refs.uDropdown.close();
		} /*下拉刷新的回调 */,
		downCallback() {
			this.mescroll.endSuccess();
		},
		/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
		upCallback() {
			this.mescroll.endUpScroll(false);
		},
		getTop() {
			var top = (this.CustomBar / uni.getSystemInfoSync().windowWidth) * 750;
			return top;
		},
		itemClick() {
			uni.navigateTo({
				url: '../company-del/company-del'
			});
		},
		// tab栏切换
		change(index) {
			this.swiperCurrent = index;
		},
		goSearch() {
			uni.navigateTo({
				url: '../messageList/messageList'
			});
		},
		// swiper-item左右移动，通知tabs的滑块跟随移动
		transition(e) {
			let dx = e.detail.dx;
			this.$refs.uTabs.setDx(dx);
		},
		// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
		// swiper滑动结束，分别设置tabs和swiper的状态
		animationfinish(e) {
			let current = e.detail.current;
			this.$refs.uTabs.setFinishCurrent(current);
			this.swiperCurrent = current;
			this.current = current;
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
