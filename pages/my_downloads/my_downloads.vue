<template>
	<view>
		<u-navbar title="我的下载"></u-navbar>
		<scroll-view scroll-y="true">
			<mescroll-body ref="mescrollRef" @init="mescrollInit" :up="$config.upOptionNo" :down="$config.downOption" @down="downCallback" @up="upCallback">
				<state-layout :state="stateLayout" @errorLoad="errorLoad">
					<view class="list-wrap" slot="state">
						<u-cell-group :border="false">
							<u-cell-item v-for="(item, index) in listData" :key="index" hover-class="cell-hover-class" :arrow="false">
								<view slot="label">
									<view @click="itemClick(item)" class="u-font-32 text-black">{{ item.name }}</view>
								</view>
							</u-cell-item>
						</u-cell-group>
					</view>
				</state-layout>
			</mescroll-body>
		</scroll-view>
	</view>
</template>

<script>
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
export default {
	mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
	data() {
		return {
			listData: [],
			stateLayout: ''
		};
	},
	onLoad() {
		this.getData();
	},
	methods: {
		errorLoad() {
			this.getData();
		},
		getData() {
			var that = this;
			that.stateLayout = 'load';
			// #ifdef APP-PLUS
			plus.io.resolveLocalFileSystemURL(
				'_downloads',
				function(entry) {
					entry.createReader().readEntries(
						function(entries) {
							that.mescroll.endSuccess();
							that.listData = entries;
							// for(var i=0;i<entries.length;i++){
							//  that.listData = that.listData.concat(entries[i]);
							// }
							if (that.listData.length > 0) {
								that.stateLayout = '';
							} else {
								that.stateLayout = 'empty';
							}
						},
						function(e) {
							that.mescroll.endSuccess();
							that.stateLayout = 'error';
						}
					);
				},
				function(e) {
					that.mescroll.endSuccess();
					that.stateLayout = 'error';
				}
			);
			// #endif
			// #ifdef H5
			that.stateLayout = 'empty';
			if (that.mescroll) {
				that.mescroll.endSuccess();
			}
			// #endif
		},
		downCallback() {
			this.getData();
		},
		/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
		upCallback() {
			this.mescroll.endUpScroll(true);
		},
		itemClick(item) {
			uni.openDocument({
				filePath: '_downloads/' + item.name
			});
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
</style>
