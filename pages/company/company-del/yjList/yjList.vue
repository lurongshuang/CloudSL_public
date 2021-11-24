<template>
	<view>
		<u-navbar title="业绩信息"></u-navbar>
		<mescroll-body ref="mescrollRef" @init="mescrollInit" :up="$config.upOption" :down="$config.downOption" @down="downCallback" @up="upCallback">
			<state-layout :state="stateLayout">
				<view class="list-wrap" slot="state">
					<u-cell-group :border="false">
						<u-cell-item @click="itemClick(item)" v-for="(item, index) in listData" :key="index" style="padding: 20upx;" hover-class="cell-hover-class" :arrow="false">
							<view slot="label">
								<u-row class="u-m-t-10">
									<u-col span="12">
										<view class="u-line-1 u-font-32 text-black text-bold">{{ item.PRJNM }}</view>
									</u-col>
								</u-row>
								<u-row class="u-m-t-20">
									<u-col class="u-font-32 text-gray" span="9">{{ item.STEXT }}</u-col>
								</u-row>
							</view>
						</u-cell-item>
					</u-cell-group>
				</view>
			</state-layout>
		</mescroll-body>
	</view>
</template>

<script>
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
export default {
	mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
	data() {
		return {
			unitId: '',
			listData: [],
			stateLayout: '',
			page: 1,
			pageSize: 20
		};
	},
	onLoad(e) {
		this.unitId = e.unitId;
		this.getData();
	},
	methods: {
		getData() {
			var that = this;
			var map = {
				ID: that.unitId,
				PAGE: that.page,
				PAGESIZE: that.pageSize
			};
			if (that.page == 1) {
				that.stateLayout = 'load';
			}
			that.$api
				.getPerOrj(map)
				.then(data => {
					if (data && data.data && data.data.code == 1) {
						if (that.page == 1) {
							that.listData = data.data.data;
						} else {
							that.listData = that.listData.concat(data.data.data);
						}
						that.stateLayout = '';
						if (data.data.data.length == 0) {
							that.mescroll.endSuccess(that.listData.length, false);
						} else {
							that.mescroll.endSuccess(that.listData.length, true);
						}
						if (that.listData.length == 0) {
							that.stateLayout = 'empty';
						}
					} else {
						that.mescroll.endSuccess();
						if (that.page == 1) {
							that.stateLayout = 'empty';
						}
					}
				})
				.catch(e => {
					that.stateLayout = 'error';
				});
		},
		closeDropdown() {
			this.$refs.uDropdown.close();
		} /*下拉刷新的回调 */,
		downCallback() {
			this.page = 1;
			this.getData();
		},
		/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
		upCallback() {
			this.page += 1;
			this.getData();
		},
		getTop() {
			var top = (this.CustomBar / uni.getSystemInfoSync().windowWidth) * 750;
			return top;
		},
		itemClick(item) {
			uni.navigateTo({
				url: 'yjListDel?yjId=' + item.ID+'&jinDex='+item.JINDEX
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
