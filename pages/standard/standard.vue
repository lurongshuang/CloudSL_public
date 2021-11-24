<template>
	<view>
		<u-navbar>
			<view class="slot-wrap">
				<view class="search-wrap"><u-search></u-search></view>
			</view>
		</u-navbar>
		<u-sticky :offset-top="getTop()" :h5-nav-height="StatusBar">
			<view class="bg-white">
				<u-tabs-swiper
					activeColor="#2A96F0"
					ref="uTabs"
					:list="tabList"
					:current="current"
					@change="change"
					:is-scroll="true"
					height="70"
					bar-width="120"
					bar-height="5"
					:bar-style="barStyle"
				></u-tabs-swiper>
			</view>
			<u-line color="#dddddd" class="u-line"></u-line>
		</u-sticky>
		<mescroll-body ref="mescrollRef" @init="mescrollInit" :up="$config.upOption" :down="$config.downOption" @down="downCallback" @up="upCallback">
			<view class="list-wrap">
				<u-cell-group :border="false">
					<u-cell-item @click="itemClick" v-for="index in 20" :key="index" style="padding: 20upx;" hover-class="cell-hover-class" :arrow="false">
						<view slot="label">
							<u-row>
								<u-col span="9" class="u-p-0">
									<view class="u-font-30 text-black text-bold u-line-2">政府采购货物类招标文件范文</view>
									<view class="u-m-t-20">
										<u-row>
											<u-col span="6" class="u-p-0 u-font-28 text-gray">大小：0.18MB</u-col>
											<u-col span="6" class="u-p-0 u-font-28 text-gray">下载次数：14次</u-col>
										</u-row>
									</view>
								</u-col>
								<u-col span="3">
									<u-row>
										<u-col span="6"><u-icon name="share" color="#333333" size="45"></u-icon></u-col>
										<u-col span="6"><u-icon name="download" color="#333333" size="45"></u-icon></u-col>
									</u-row>
								</u-col>
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
			tabList: [
				{
					name: '招标文件'
				},
				{
					name: '中标文件'
				}
			],
			current: 0,
			barStyle: {
				position: 'absolute',
				bottom: '0'
			}
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
		},
		change(index) {
			this.current = index;
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
