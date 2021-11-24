<template>
	<view>
		<u-navbar title="良好记录" title-color="#333333"></u-navbar>
		<mescroll-body ref="mescrollRef" @init="mescrollInit" :up="$config.upOptionNo" :down="$config.downOption" @down="downCallback" @up="upCallback">
			<state-layout :state="stateLayout" @errorLoad="errorLoad">
				<view class="list-wrap" slot="state">
					<u-cell-group :border="false">
						<u-cell-item v-for="(item,index) in listData" :key="index" style="padding: 20upx;" hover-class="cell-hover-class" :arrow="false">
							<view slot="title" class="text-black u-font-30 text-bold u-p-lr-10">{{item.NAME}}</view>
							<view slot="label">
								<u-row class="u-m-t-10" align="top">
									<u-col class="u-font-30 text-gray" span="3">颁发机构</u-col>
									<u-col class="u-font-30 text-black text-bold" span="9">{{item.ORGAN}}</u-col>
								</u-row>
								<u-row class="u-m-t-20 u-m-b-10">
									<u-col class="u-font-30 text-gray" span="3">颁奖日期</u-col>
									<u-col class="u-font-30 text-black text-bold" span="9">{{item.RTIME}}</u-col>
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
			stateLayout: '',
			listData: [],
			unitId: ''
		};
	},
	onLoad(e) {
		this.unitId = e.unitId;
		this.getData();
	},
	methods: {
		errorLoad() {
			this.getData();
		},
		getData() {
			var that = this;
			var map = {
				'ID':that.unitId
			};
			that.stateLayout ='load';
			that.$api
				.getUnRw(map)
				.then(data => {
					if (data && data.data && data.data.code == 1) {
						that.listData = data.data.data;
						that.stateLayout = '';
						if (that.listData.length == 0) {
							that.stateLayout = 'empty';
						}
					} else {
						that.stateLayout = 'empty';
					}
					this.mescroll.endSuccess();
				})
				.catch(e => {
					this.mescroll.endSuccess();
					that.stateLayout = 'empty';
				});
		},
		downCallback() {
			this.getData();
		},
		/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
		upCallback() {
			this.mescroll.endUpScroll(true);
		},
		getTop() {
			var top = (this.CustomBar / uni.getSystemInfoSync().windowWidth) * 750;
			return top;
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
