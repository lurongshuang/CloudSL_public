<template>
	<view>
		<u-navbar title="人员信息" title-color="#333333"></u-navbar>
		<view class="bg-white u-skeleton-rect">
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
		</view>
		<swiper :style="[{ height: winHeight + 'px' }]" :current="swiperCurrent" :duration="300" @transition="transition" @animationfinish="animationfinish">
			<swiper-item><xzxx :unitId="unitId" :height="winHeight"></xzxx></swiper-item>
			<swiper-item><jsfzr :unitId="unitId" :height="winHeight"></jsfzr></swiper-item>
			<swiper-item><jtry :unitId="unitId" :height="winHeight"></jtry></swiper-item>
			<swiper-item><zzry :unitId="unitId" :height="winHeight"></zzry></swiper-item>
		</swiper>
	</view>
</template>

<script>
import xzxx from './xzxx.vue';
import jsfzr from './jsfzr.vue';
import jtry from './jtry.vue';
import zzry from './zzry.vue';
export default {
	components: { xzxx, jsfzr, jtry ,zzry},
	data() {
		return {
			current: 0,
			swiperCurrent: 0,
			tabList: [
				{
					name: '行政信息'
				},
				{
					name: '技术负责人'
				},
				{
					name: '具体人员'
				},
				{
					name: '在职人员'
				}
			],
			barStyle: {
				position: 'absolute',
				bottom: '0'
			},
			winHeight: 0,
			unitId:''
		};
	},
	onLoad(e) {
		var that = this;
		that.unitId = e.unitId; 
		uni.getSystemInfo({
			success: function(res) {
				that.winHeight = res.windowHeight - that.CustomBar - uni.upx2px(75);
			}
		});
	},
	methods: {
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
		}
	}
};
</script>

<style></style>
