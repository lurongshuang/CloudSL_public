<template>
	<view>
		<u-navbar title="水利标准">
			<view slot="right"><u-icon class="u-p-r-20" size="35" @click="search" name="search"></u-icon></view>
		</u-navbar>
		<view class="bg-white u-skeleton-rect">
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
			<swiper :style="[{ height: getSwiperHe() + 'px' }]" :current="swiperCurrent" :duration="300" @transition="transition" @animationfinish="animationfinish">
				<swiper-item><gj-standard :viewHeight="getSwiperHe()"></gj-standard></swiper-item>
				<swiper-item><hy-standard :viewHeight="getSwiperHe()"></hy-standard></swiper-item>
				<swiper-item><ty-standard :viewHeight="getSwiperHe()"></ty-standard></swiper-item>
				<swiper-item><aq-standard :viewHeight="getSwiperHe()"></aq-standard></swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
import gjStandard from './item/gj-standard.vue';
import hyStandard from './item/hy-standard.vue';
import tyStandard from './item/ty-standard.vue';
import aqStandard from './item/aq-standard.vue';

export default {
	components: {
		gjStandard,
		hyStandard,
		tyStandard,
		aqStandard
	},
	data() {
		return {
			tabList: [
				{
					name: '国家标准'
				},
				{
					name: '行业标准'
				},
				{
					name: '团体标准'
				},
				{
					name: '安全标准'
				}
			],
			current: 0,
			barStyle: {
				position: 'absolute',
				bottom: '0'
			},
			winHeight: 0,
			swiperCurrent: 0
		};
	},
	onLoad() {
		var that = this;
		uni.getSystemInfo({
			success: function(res) {
				that.winHeight = res.windowHeight - that.CustomBar;
			}
		});
	},
	methods: {
		search() {
			uni.navigateTo({
				url: '../standard-search/standard-search'
			});
		},
		// tab栏切换
		change(index) {
			this.swiperCurrent = index;
		},
		getSwiperHe() {
			return this.winHeight - uni.upx2px(70);
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
		}
	}
};
</script>

<style></style>
