<template>
	<view :style="[{ height: height + 'px' }]">
		<scroll-view scroll-y="true" :style="[{ height: height + 'px' }]">
			<mescroll-body ref="mescrollRef" @init="mescrollInit" :up="$config.upOptionNo" :down="$config.downOption" @down="downCallback" @up="upCallback">
				<state-layout :state="stateLayout" @errorLoad="errorLoad">
					<view class="list-wrap" slot="state">
						<u-cell-group :border="false">
							<u-cell-item v-for="index in 1" :key="index" style="padding: 20upx;" hover-class="cell-hover-class" :arrow="false">
								<view slot="label">
									<u-row class="">
										<u-col class="u-font-30 text-gray" span="7">年度</u-col>
										<u-col class="u-font-30 text-black text-bold" span="5">{{ listData.TYEAR }}</u-col>
									</u-row>
									<u-row class="u-m-t-20">
										<u-col class="u-font-30 text-gray" span="7">总数</u-col>
										<u-col class="u-font-30 text-black text-bold" span="5">{{ listData.TNUM }}</u-col>
									</u-row>
									<u-row class="u-m-t-20">
										<u-col class="u-font-30 text-gray" span="7">高级职称数</u-col>
										<u-col class="u-font-30 text-black text-bold" span="5">{{ listData.GNUM }}</u-col>
									</u-row>
									<u-row class="u-m-t-20">
										<u-col class="u-font-30 text-gray" span="7">中级职称数</u-col>
										<u-col class="u-font-30 text-black text-bold" span="5">{{ listData.ZNUM }}</u-col>
									</u-row>
									<u-row class="u-m-t-20">
										<u-col class="u-font-30 text-gray" span="7">初级职称数</u-col>
										<u-col class="u-font-30 text-black text-bold" span="5">{{ listData.CNUM }}</u-col>
									</u-row>
									<u-row class="u-m-t-20">
										<u-col class="u-font-30 text-gray" span="7">博士数</u-col>
										<u-col class="u-font-30 text-black text-bold" span="5">{{ listData.BSNUM }}</u-col>
									</u-row>
									<u-row class="u-m-t-20 u-m-b-10">
										<u-col class="u-font-30 text-gray" span="7">硕士数</u-col>
										<u-col class="u-font-30 text-black text-bold" span="5">{{ listData.SSNUM }}</u-col>
									</u-row>
									<u-row class="u-m-t-20 u-m-b-10">
										<u-col class="u-font-30 text-gray" span="7">本科数</u-col>
										<u-col class="u-font-30 text-black text-bold" span="5">{{ listData.BKNUM }}</u-col>
									</u-row>
									<u-row class="u-m-t-20 u-m-b-10">
										<u-col class="u-font-30 text-gray" span="7">专科数</u-col>
										<u-col class="u-font-30 text-black text-bold" span="5">{{ listData.ZKNUM }}</u-col>
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
			stateLayout: '',
			listData: {
				TYEAR: '',
				TNUM: 0,
				GNUM: 0,
				ZNUM: 0,
				CNUM: 0,
				BSNUM: 0,
				SSNUM: 0,
				BKNUM: 0,
				ZKNUM: 0
			}
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
			that.stateLayout='load';
			that.$api
				.getPerEmp(map)
				.then(data => {
					if (data && data.data && data.data.code == 1) {
						that.listData = data.data.data;
						that.stateLayout = '';
					} else {
						that.stateLayout = 'empty';
					}
					that.mescroll.endSuccess();
				})
				.catch(e => {
					that.stateLayout = 'error';
				});
		},
		closeDropdown() {
			this.$refs.uDropdown.close();
		} /*下拉刷新的回调 */,
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
