<template>
	<view :style="[{ height: height + 'px' }]">
		<scroll-view scroll-y="true" :style="[{ height: height + 'px' }]" @scrolltoupper="scrolltoupper" @scrolltolower="scrolltolower" @scroll="scroll">
			<mescroll-body :height="height" ref="mescrollRef" @init="mescrollInit" :up="$config.upOptionNo" :down="$config.downOption" @down="downCallback" @up="upCallback">
				<state-layout :state="stateLayout" @errorLoad="errorLoad">
					<view class="list-wrap" slot="state">
						<u-cell-group :border="false">
							<u-cell-item v-for="(item, index) in listData" :key="index" style="padding: 20upx;" hover-class="cell-hover-class" :arrow="false">
								<view slot="label">
									<u-row class="">
										<u-col class="u-font-30 text-gray" span="6">姓&emsp;&emsp;名</u-col>
										<u-col class="u-font-30 text-black text-bold" span="6">{{ item.NAME }}</u-col>
									</u-row>
									<u-row class="u-m-t-20">
										<u-col class="u-font-30 text-gray" span="6">职&emsp;&emsp;称</u-col>
										<u-col class="u-font-30 text-black text-bold" span="6">{{ item.TITLE }}</u-col>
									</u-row>
									<u-row class="u-m-t-20">
										<u-col class="u-font-30 text-gray" span="6">职&emsp;&emsp;位</u-col>
										<u-col class="u-font-30 text-black text-bold" span="6">{{ item.JTEXT }}</u-col>
									</u-row>
									<u-row class="u-m-t-20 u-m-b-10">
										<u-col class="u-font-30 text-gray" span="6">身份证号</u-col>
										<u-col class="u-font-30 text-black text-bold" span="6">{{ hideMiddle(item.IDENTITYID) }}</u-col>
									</u-row>
									<u-row class="u-m-t-20 u-m-b-10">
										<u-col class="u-font-30 text-gray" span="6">有效期至</u-col>
										<u-col class="u-font-30 text-black text-bold" span="6">{{ item.VTIME }}</u-col>
									</u-row>
								</view>
							</u-cell-item>
							<view class="u-padding-30"><u-loadmore @loadmore="loadmore" :status="loadType" /></view>
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
			listData: [],
			stateLayout: '',
			page: 1,
			pageSize: 20,
			scrollTop: 0,
			loadType: 'loading'
		};
	},
	mounted() {
		this.getData();
	},
	methods: {
		scroll(e) {
			this.scrollTop = e.detail.scrollTop;
		},
		loadmore() {
			this.page += 1;
			this.getData();
			this.loadType = 'loading';
		},
		scrolltolower() {},
		scrolltoupper() {
			this.scrollTop = 0;
		},
		errorLoad() {
			this.page = 1;
			this.getData();
		},
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
				.getPerInfo(map)
				.then(data => {
					if (data && data.data && data.data.code == 1) {
						if (that.page == 1) {
							that.listData = data.data.data;
						} else {
							that.listData = that.listData.concat(data.data.data);
						}
						that.stateLayout = '';
						that.mescroll.endSuccess();
						if (that.listData.length == 0) {
							that.stateLayout = 'empty';
						}
					} else {
						that.mescroll.endSuccess();
						if (that.page == 1) {
							that.stateLayout = 'empty';
						}
					}
					if (data.data.data.length == 0) {
						that.loadType = 'nomore';
					} else {
						that.loadType = 'loadmore';
					}
				})
				.catch(e => {
					that.stateLayout = 'error';
				});
		},
		hideMiddle(val) {
			return `${val.substring(0, 3)}***********${val.substring(val.length - 4)}`;
		},
		downCallback() {
			if (this.scrollTop > 10) {
				this.mescroll.endSuccess();
				return;
			}
			this.page = 1;
			this.getData();
		},
		upCallback() {
			this.page += 1;
			this.getData();
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
