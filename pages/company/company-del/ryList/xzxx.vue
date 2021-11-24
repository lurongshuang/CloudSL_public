<template>
	<view :style="[{ height: height + 'px' }]">
		<scroll-view scroll-y="true" :style="[{ height: height + 'px' }]">
			<mescroll-body ref="mescrollRef" @init="mescrollInit" :up="$config.upOptionNo" :down="$config.downOption" @down="downCallback" @up="upCallback">
				<state-layout :state="stateLayout" @errorLoat="errorLoad">
					<view class="list-wrap" slot="state">
						<u-cell-group :border="false">
							<u-cell-item v-for="index in 1" :key="index" style="padding: 20upx;" hover-class="cell-hover-class" :arrow="false">
								<view slot="label">
									<u-row class="">
										<u-col class="u-font-30 text-gray" span="6">法人姓名</u-col>
										<u-col class="u-font-30 text-black text-bold" span="6">{{ listData.LR }}</u-col>
									</u-row>
									<u-row class="u-m-t-20">
										<u-col class="u-font-30 text-gray" span="6">法人身份证号</u-col>
										<u-col class="u-font-30 text-black text-bold" span="6">{{ hideMiddle(listData.LIDENTITYID) }}</u-col>
									</u-row>
									<u-row class="u-m-t-20">
										<u-col class="u-font-30 text-gray" span="6">法人昵称</u-col>
										<u-col class="u-font-30 text-black text-bold" span="6">{{ listData.LTITLE }}</u-col>
									</u-row>
									<u-row class="u-m-t-20">
										<u-col class="u-font-30 text-gray" span="6">法人从事本行业工作年份</u-col>
										<u-col class="u-font-30 text-black text-bold" span="6">{{ listData.LNX }}</u-col>
									</u-row>
									<u-row class="u-m-t-20">
										<u-col class="u-font-30 text-gray" span="6">负责人姓名</u-col>
										<u-col class="u-font-30 text-black text-bold" span="6">{{ listData.CHNM }}</u-col>
									</u-row>
									<u-row class="u-m-t-20">
										<u-col class="u-font-30 text-gray" span="6">负责人身份证号</u-col>
										<u-col class="u-font-30 text-black text-bold" span="6">{{ hideMiddle(listData.CHIDENTITYID) }}</u-col>
									</u-row>
									<u-row class="u-m-t-20">
										<u-col class="u-font-30 text-gray" span="6">负责人职称</u-col>
										<u-col class="u-font-30 text-black text-bold" span="6">{{ listData.CHTITLE }}</u-col>
									</u-row>
									<u-row class="u-m-t-20 u-m-b-10">
										<u-col class="u-font-30 text-gray" span="6">法人从事本行业工作年份</u-col>
										<u-col class="u-font-30 text-black text-bold" span="6">{{ listData.CHNX }}</u-col>
									</u-row>
								</view>
							</u-cell-item>
						</u-cell-group>
					</view>
				</state-layout>
			</mescroll-body>
			<!-- <view class="u-padding-30"><u-loadmore status="loading" /></view> -->
		</scroll-view>
	</view>
</template>

<script>
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
export default {
	mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
	props: {
		height: {
			type: Number,
			default: 0
		},
		unitId: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			listData: {
				LR: '',
				LIDENTITYID: '',
				LTITLE: '',
				LNX: '',
				CHNM: '',
				CHIDENTITYID: '',
				CHTITLE: '',
				CHNX: ''
			},
			stateLayout: ''
		};
	},
	mounted() {
		this.getData();
	},
	methods: {
		errorLoad() {
			this.getData();
		},
		getData() {
			var that = this;
			var map = {
				ID: that.unitId
			};
			that.stateLayout = 'load';
			that.$api
				.getPerBase(map)
				.then(data => {
					if (data && data.data && data.data.code == 1) {
						that.listData = data.data.data;
						that.stateLayout = '';
						if (that.listData.LR == '') {
							that.stateLayout = 'empty';
						}
					} else {
						that.stateLayout = 'empty';
					}
					this.mescroll.endSuccess();
				})
				.catch(e => {
					that.stateLayout = 'error';
				});
		},
		hideMiddle(val) {
			return `${val.substring(0, 3)}***********${val.substring(val.length - 4)}`;
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
