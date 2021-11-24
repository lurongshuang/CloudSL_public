<template>
	<view>
		<u-navbar
			:border-bottom="showSti"
			:title="showSti ? '李女士' : ''"
			:background="showSti ? titleSty1 : titleSty"
			:back-icon-color="showSti ? '#333333' : '#ffffff'"
			:immersive="true"
		></u-navbar>
		<view>
			<view style="height: 400upx; background-image: url(../../../static/img/ic_re_zhuye_bg.png); background-size: cover" class="text-center u-p-t-100">
				<image src="../../../static/img/ic_biaoxun_ico.png" style="width: 120upx; height: 120upx;"></image>
				<view class="u-font-35 u-m-t-10 text-white">李女士</view>
				<view class="u-font-35 u-m-t-10 text-white">恒华伟业 · 人力资源</view>
			</view>
			<u-sticky @fixed="fixed()" @unfixed="unfixed()" :h5-nav-height="StatusBar" :offset-top="getTop()">
				<view class="u-p-tb-30 bg-white"><view class="bg-white u-p-lr-20 u-font-30 text-8080">发布的职位</view></view>
				<u-line></u-line>
			</u-sticky>
			<view>
				<u-cell-group>
					<u-cell-item @click="gotoReDel" v-for="index in 30" :key="index" style="padding: 20upx 10upx;" :arrow="false">
						<view slot="label">
							<u-row>
								<u-col span="9">
									<view class="text-black u-font-32 u-p-tb-10">水利施工安全员</view>
									<view class="text-black u-font-28 u-p-tb-10">北京 · 昌平 | 本科 | 3-5年</view>
								</u-col>
								<u-col span="3"><view class="u-font-30 colorF82E06 text-right">12-15K</view></u-col>
							</u-row>
						</view>
					</u-cell-item>
				</u-cell-group>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			titleSty: { background: 'transparent' },
			titleSty1: { background: '#FFFFFF' },
			showSti: false
		};
	},
	methods: {
		getTop() {
			var top = (this.CustomBar / uni.getSystemInfoSync().windowWidth) * 750;
			return top;
		},
		fixed() {
			this.showSti = true;
		},
		unfixed() {
			this.showSti = false;
		},
		gotoReDel() {
			uni.navigateTo({
				url: '../recruit-del/recruit-del'
			});
		}
	}
};
</script>

<style>
.colorF82E06 {
	color: #f82e06;
}
</style>
