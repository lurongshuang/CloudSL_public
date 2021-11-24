<template>
		<view>
			<u-navbar z-index="1000" :is-back="false" :background="background">
				<view style="width: 100%; ">
					<u-row class="bg-main">
						<u-col span="9">
							<u-tabs-swiper
								bgColor="#2A96F0"
								activeColor="#ffffff"
								inactive-color="#95d6fe"
								ref="uTabs"
								:list="tabList"
								:current="current"
								@change="change"
								:is-scroll="true"
								:show-bar="showBar"
								:active-item-style="activeStyle"
							></u-tabs-swiper>
						</u-col>
						<u-col span="3">
							<u-row>
								<u-col span="6" text-align="center"><u-icon size="40" name="plus" @click="openAdd"></u-icon></u-col>
								<u-col span="6" text-align="center"><u-icon size="40" name="search"></u-icon></u-col>
							</u-row>
						</u-col>
					</u-row>
				</view>
			</u-navbar>
			<u-sticky :offset-top="getTop()" z-index="1000" :h5-nav-height="StatusBar">
				<u-row style="background-color: #FFFFFF; height: 90upx;">
					<u-col span="6">
						<u-tabs-swiper
							activeColor="#333333"
							inactive-color="#808080"
							ref="uTabs2"
							:list="tabList2"
							:current="current1"
							@change="change1"
							:is-scroll="true"
							:show-bar="showBar"
						></u-tabs-swiper>
					</u-col>
					<u-col span="6" style="background-color: #FFFFFF;">
						<u-row>
							<u-col span="6" text-align="center">
								<view class="u-font-25" style="background-color: #F2F2F2; padding: 10upx 13upx; border-radius: 10upx; position: relative;">
									北京
									<u-col style="position: absolute; right: 5upx; bottom: 0upx; transform: rotate(305deg);" span="3" text-align="center">
										<u-icon size="15" color="#808080" name="arrow-down-fill"></u-icon>
									</u-col>
								</view>
							</u-col>
							<u-col span="6" text-align="center">
								<view class="u-font-25" style="background-color: #F2F2F2; padding: 10upx 13upx; border-radius: 10upx; position: relative;">
									筛选
									<u-col style="position: absolute; right: 5upx; bottom: 0upx; transform: rotate(305deg);" span="3" text-align="center">
										<u-icon size="15" color="#808080" name="arrow-down-fill"></u-icon>
									</u-col>
								</view>
							</u-col>
						</u-row>
					</u-col>
				</u-row>
				<u-line color="#dddddd" class="u-line"></u-line>
			</u-sticky>
			<swiper :style="[{ height: winHeight + 'px' }]" :current="swiperCurrent" :duration="300" @transition="transition" @animationfinish="animationfinish">
				<swiper-item><recruit-item :winHeight="winHeight"></recruit-item></swiper-item>
				<swiper-item><recruit-item :winHeight="winHeight"></recruit-item></swiper-item>
			</swiper>
		</view>
</template>

<script>
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
import recruitItem from './recruit-item.vue';
export default {
	mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
	components: {
		recruitItem
	},
	onLoad() {
		var that = this;
		uni.getSystemInfo({
			success: function(res) {
				that.winHeight = res.windowHeight - that.CustomBar - uni.upx2px(90);
			}
		});
	},
	data() {
		return {
			winHeight: 0,
			background: {
				background: '#2A96F0'
			},
			current: 0,
			current1: 0,
			swiperCurrent: 0,
			showBar: false,
			activeStyle: {
				'font-size': '35upx'
			},
			tabList: [
				{
					name: '施工员'
				},
				{
					name: '安全员'
				}
			],
			tabList2: [
				{
					name: '推荐'
				},
				{
					name: '最新'
				}
			]
		};
	},
	methods: {
		getTop() {
			var top = (this.CustomBar / uni.getSystemInfoSync().windowWidth) * 750;
			return top;
		},
		// tab栏切换
		change(index) {
			this.swiperCurrent = index;
		},
		change1(index) {
			this.current1 = index;
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
		},
		/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
		upCallback() {
			this.mescroll.endUpScroll(true);
		},
		openAdd(){
			uni.navigateTo({
				url:'../../recruit-personal/add-recruit/add-recruit'
			})
		}
	}
};
</script>

<style>
.slot-wrap {
	display: flex;
	align-items: center;
	flex: 1;
	/* 如果您想让slot内容与导航栏左右有空隙 */
	/* padding: 0 30rpx; */
}
</style>
