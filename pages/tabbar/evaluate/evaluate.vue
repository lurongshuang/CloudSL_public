<template>
	<view>
		<u-navbar :is-back="false" title="评价" title-color="#333333"></u-navbar>
		<view>
			<mescroll-body :bottombar="false" ref="mescrollRef" @init="mescrollInit" :up="$config.upOptionNo" :down="$config.downOption" @down="downCallback" @up="upCallback">
				<state-layout :state="stateLayout" @errorLoad="errorLoad">
					<view slot="state" class="list-wrap">
						<view class="u-p-t-40"></view>
						<u-row class="u-p-lr-20">
							<u-col span="6" class="u-p-10">
								<view style="position: relative;" @click="openEva">
									<image src="../../../static/img/ic_pjzxbtn.png" mode="widthFix" style="width: 100%;"></image>
									<view class="u-font-38 text-bold text-white evtitle">评价咨询</view>
								</view>
							</u-col>
							<u-col span="6" class="u-p-10" @click="openPj">
								<view style="position: relative;">
									<image src="../../../static/img/ic_pjcxbtn.png" mode="widthFix" style="width: 100%;"></image>
									<view class="u-font-38 text-bold text-white evtitle">评价查询</view>
								</view>
							</u-col>
						</u-row>
						<u-row class="u-p-lr-20">
							<u-col span="6" class="u-p-10" @click="openProEva">
								<view style="position: relative;">
									<image src="../../../static/img/ic_xypjbtn.png" mode="widthFix" style="width: 100%;"></image>
									<view class="u-font-38 text-bold text-white evtitle">信用评价</view>
									<view class="loading">功能开发中，敬请期待</view>
								</view>
							</u-col>
							<u-col span="6" class="u-p-10" @click="openTestEva">
								<view style="position: relative;">
									<image src="../../../static/img/ic_mnpjbtn.png" mode="widthFix" style="width: 100%;"></image>
									<view class="u-font-38 text-bold text-white evtitle">模拟评价</view>
									<view class="loading">功能开发中，敬请期待</view>
								</view>
							</u-col>
						</u-row>
						<u-line class="u-m-t-20"></u-line>
						<u-cell-group :border="false" style="background-color: #f5f4f4;">
							<u-cell-item v-for="(item, index) in listData" :key="index" style="padding: 0upx;" hover-class="cell-hover-class" :arrow="false">
								<view slot="label">
									<view class="u-font-30 u-padding-20 text-bold text-black">
										<view class="u-m-l-10">{{ item.UNITNAME }}</view>
									</view>
									<u-line></u-line>
									<view style="padding: 25upx 15upx;">
										<u-row>
											<u-col class="u-font-28 text-gray" span="3"><view class="text-center">评价年度</view></u-col>
											<u-col class="u-font-28 text-gray" span="3"><view class="text-center">类别</view></u-col>
											<u-col class="u-font-28 text-gray" span="2"><view class="text-center">结果</view></u-col>
											<u-col class="u-font-28 text-gray" span="4"><view class="text-center">有效期至</view></u-col>
										</u-row>
										<u-row class="u-m-t-20">
											<u-col class="u-font-28 text-black text-bold" span="3">
												<view class="text-center">{{ item.YEAR }}</view>
											</u-col>
											<u-col class="u-font-28 text-black text-bold" span="3">
												<view class="text-center">{{ item.JTEXT }}</view>
											</u-col>
											<u-col class="u-font-28 text-black text-bold" span="2">
												<view class="text-center">{{ item.RESULT }}</view>
											</u-col>
											<u-col class="u-font-28 text-black text-bold" span="4">
												<view class="text-center">{{ item.VTIME }}</view>
											</u-col>
										</u-row>
									</view>
									<view style="height: 20upx; background-color: #f5f4f4;"></view>
								</view>
							</u-cell-item>
						</u-cell-group>
					</view>
				</state-layout>
			</mescroll-body>
		</view>
	</view>
</template>

<script>
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
export default {
	mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
	data() {
		return {
			stateLayout: '',
			page: 1,
			listData: []
		};
	},
	onLoad() {
		this.getData();
	},
	methods: {
		errorLoad() {
			this.page = 1;
			this.getData();
		},
		getData() {
			var that = this;
			var map = {
				NAME: that.searchTitle,
				PAGE: that.page,
				PAGESIZE: '30'
			};
			if (that.page == 1) {
				// that.stateLayout = 'load';
			}
			that.$api
				.getJudGeslb(map)
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
		downCallback() {
			this.page = 1;
			this.getData();
		},
		/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
		upCallback() {
			this.page += 1;
			this.getData();
		},
		openPj() {
			uni.navigateTo({
				url: '../../evaluate/evaluate'
			});
		},
		openEva() {
			uni.navigateTo({
				url: '../../evaluate-consulting/evaluate-consulting'
			});
		},
		openTestEva() {
			this.$utils.showToast('功能开发中，敬请期待');
		},
		openProEva() {
			// this.$utils.showToast('功能开发中，敬请期待');
			uni.navigateTo({
				url: '../../credit-evaluation/credit-evaluation'
			});
		}
	}
};
</script>

<style>
.evtitle {
	text-align: center;
	position: absolute;
	top: 50%;
	right: 10%;
	margin-top: -30upx;
	height: 50upx;
}
.loading {
	padding-left: 10upx;
	width: 100%;
	position: absolute;
	text-align: center;
	bottom: 25upx;
	color: #ffffff;
	background-color: rgba(0, 0, 0, 0.5);
}

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
.viewTitie {
	border-radius: 10upx;
	background-color: #e4f4fd;
	width: 200upx;
	padding: 10upx 10upx;
	text-align: center;
}
</style>
