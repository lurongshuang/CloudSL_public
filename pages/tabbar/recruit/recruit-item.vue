<template>
	<mescroll-body ref="mescrollRef" @init="mescrollInit" :up="$config.upOption" :down="$config.downOption" @down="downCallback" @up="upCallback">
		<scroll-view @scrolltolower="upCallback" :style="[{ height: winHeight + 'px' }]" scroll-y="true" style="width: 100%;">
			<view class="list-wrap">
				<u-cell-group :border="false">
					<u-cell-item @click="itemClick" v-for="index in 20" :key="index" style="padding: 20upx;" hover-class="cell-hover-class" :arrow="false">
						<view slot="label">
							<u-row>
								<u-col class="u-p-0" span="9" text-align="left">
									<view class="text-def-size text-black text-bold">水利施工员{{ index }}</view>
								</u-col>
								<u-col class="u-p-0" span="3" text-align="right"><view>12-15K</view></u-col>
							</u-row>
							<u-row class="u-m-t-20">
								<view class="u-m-r-20 u-font-25 tag  u-skeleton-rect">1-3年</view>
								<view class="u-m-r-20  u-font-25 tag u-skeleton-rect">招标</view>
							</u-row>
							<u-row class="u-m-t-20">
								<view class="u-font-25 text-black u-m-r-10">北京恒华伟业科技股份有限公司</view>
								<view class="u-font-25 text-8080">500-999人</view>
							</u-row>
							<u-row class="u-m-t-20">
								<u-col class="u-p-0" span="9" text-align="left">
									<u-row>
										<image src="../../../static/img/ic_dwcx_ico.png" mode="aspectFill" class="imgHead"></image>
										<view class="u-font-25 text-black u-m-l-20">李晓坤 · 人力资源</view>
									</u-row>
								</u-col>
								<u-col class="u-p-0" span="3" text-align="right"><view class="u-font-25 text-8080 u-m-l-20">北京 昌平</view></u-col>
							</u-row>
						</view>
					</u-cell-item>
				</u-cell-group>
			</view>
		</scroll-view>
	</mescroll-body>
</template>

<script>
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
export default {
	mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
	data() {
		return {};
	},
	props: {
		winHeight: {
			type: Number,
			default: 0
		}
	},
	methods: {
		itemClick() {
			uni.navigateTo({
				url:'../../recruit-personal/recruit-del/recruit-del'
			})
		},
		/*下拉刷新的回调 */
		downCallback() {
			this.mescroll.endSuccess();
		},
		/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
		upCallback() {
			// this.mescroll.endUpScroll(true);
			this.mescroll.showEmpty();
		}
	}
};
</script>

<style>
.tag {
	border-radius: 10upx;
	color: #808080;
	background-color: #eeeeee;
	border-radius: 10upx;
	padding: 5upx 15upx;
}
.text-8080 {
	color: #808080;
}
.imgHead {
	width: 50upx;
	height: 50upx;
}
</style>
