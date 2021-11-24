<template>
	<view>
		<u-navbar>
			<view class="slot-wrap">
				<view class="search-wrap"><u-search @search="search" @custom="custom" v-model="searchTitle"></u-search></view>
			</view>
		</u-navbar>
		<mescroll-body ref="mescrollRef" @init="mescrollInit" :up="$config.upOption" :down="$config.downOption" @down="downCallback" @up="upCallback">
			<state-layout :state="stateLayout" @errorLoad="errorLoad">
				<view slot="state" class="list-wrap">
					<u-cell-group :border="false" style="background-color: #f5f4f4;">
						<u-cell-item v-for="(item,index) in listData" :key="index" style="padding: 0upx;" hover-class="cell-hover-class" :arrow="false">
							<view slot="label">
								<view class=" u-font-30 u-padding-20 text-bold text-black">{{item.UNITNAME}}</view>
								<u-line></u-line>
								<view style="padding: 25upx 15upx;">
									<u-row>
										<u-col class="u-font-28 text-gray" span="3">评价年度</u-col>
										<u-col class="u-font-28 text-black text-bold" span="9">{{item.YEAR}}</u-col>
									</u-row>
									<u-row class="u-m-t-10">
										<u-col class="u-font-28 text-gray" span="3">类&emsp;&emsp;别</u-col>
										<u-col class="u-font-28 text-black text-bold" span="9">{{item.JTEXT}}</u-col>
									</u-row>
									<u-row class="u-m-t-10">
										<u-col class="u-font-28 text-gray" span="3">结&emsp;&emsp;果</u-col>
										<u-col class="u-font-28 text-black text-bold" span="9">{{item.RESULT}}</u-col>
									</u-row>
									<u-row class="u-m-t-10">
										<u-col class="u-font-28 text-gray" span="3">有效期至</u-col>
										<u-col class="u-font-28 text-black text-bold" span="9">{{item.VTIME}}</u-col>
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
</template>

<script>
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
export default {
	mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
	data() {
		return {
			stateLayout: '',
			searchTitle: '',
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
				that.stateLayout = 'load';
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
		search() {
			if (this.searchTitle.trim().length == 0) {
				this.$utils.showToast('请输入关键字');
				return;
			}
			this.page = 1;
			this.mescroll.scrollTo(0);
			this.getData();
		},
		custom() {
			if (this.searchTitle.trim().length == 0) {
				this.$utils.showToast('请输入关键字');
				return;
			}
			this.page = 1;
			this.mescroll.scrollTo(0);
			this.getData();
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
.viewTitie {
	border-radius: 10upx;
	background-color: #e4f4fd;
	width: 200upx;
	padding: 10upx 10upx;
	text-align: center;
}
</style>
