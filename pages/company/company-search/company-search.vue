<template>
	<view>
		<u-navbar>
			<view class="slot-wrap">
				<view class="search-wrap"><u-search @search="search" @custom="custom" v-model="searchTitle"></u-search></view>
			</view>
		</u-navbar>
		<u-sticky :offset-top="getTop()" :h5-nav-height="StatusBar">
			<view class="bg-white">
				<u-dropdown class="u-dropdown" ref="uDropdown" :border-bottom="true">
					<u-dropdown-item height="700" @change="change" v-model="value2" :title="options1[value1].label" :options="options1"></u-dropdown-item>
				</u-dropdown>
			</view>
		</u-sticky>
		<mescroll-body ref="mescrollRef" @init="mescrollInit" :up="$config.upOption" :down="$config.downOption" @down="downCallback" @up="upCallback">
			<state-layout :state="stateLayout" @errorLoad="errorLoad">
				<view slot="state" class="list-wrap">
					<u-cell-group :border="false">
						<u-cell-item @click="itemClick(item)" v-for="(item, index) in listData" :key="index" style="padding: 20upx;" hover-class="cell-hover-class" :arrow="false">
							<view slot="label">
								<u-row class="u-m-t-10">
									<u-col span="1.6">
										<!-- :style="[{ backgroundColor: randomColor() }]" -->
										<u-row style="border-radius: 10upx; background-color: #2A96F0;">
											<u-col span="12" text-align="center" class="u-font-25 text-white u-p-t-5">{{ getTitle(0, 2, item.CHNM) }}</u-col>
											<u-col span="12" text-align="center" class="u-font-25 text-white u-p-tb-5">{{ getTitle(2, 4, item.CHNM) }}</u-col>
										</u-row>
									</u-col>
									<u-col span="10.4">
										<view class="u-font-30 text-black text-bold">{{ item.CHNM }}</view>
										<view style="width: 500upx;" class="u-font-28 colorF7 u-m-t-5 u-line-1">{{ item.JTEXT }}</view>
									</u-col>
								</u-row>
								<u-row align="center" class="u-m-t-20">
									<u-col text-align="center" span="4">
										<view class="u-font-28 colorB6">法定代表人</view>
										<view class="u-font-28 text-main u-m-t-10">{{ item.LR }}</view>
									</u-col>
									<u-col text-align="center" span="4">
										<view class="u-font-28 colorB6">注册资本</view>
										<view class="u-font-28 text-black u-m-t-10">{{ item.REGCAP }}万元</view>
									</u-col>
									<u-col text-align="center" span="4">
										<view class="u-font-28 colorB6">成立时间</view>
										<view class="u-font-28 text-black u-m-t-10">{{ item.SETIME }}</view>
									</u-col>
								</u-row>
								<view class="u-m-t-15 u-p-10 u-m-b-10" style="background-color: #fdeae9;">
									<text class="colorF7 u-font-28 u-p-l-5">统一信用代码:</text>
									<text class="u-font-28 u-p-l-10" style="color: #383838;">{{item.UNSTID}}</text>
								</view>
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
			value1: 0,
			value2: 1,
			searchTitle: '',
			options1: [
				{
					label: '建设单位',
					value: 1
				},
				{
					label: '勘察单位',
					value: 2
				},
				{
					label: '设计单位',
					value: 3
				},
				{
					label: '咨询单位',
					value: 4
				},
				{
					label: '施工单位',
					value: 5
				},
				{
					label: '监理单位',
					value: 6
				},
				{
					label: '质量检测单位',
					value: 7
				},
				{
					label: '招标代理单位',
					value: 8
				},
				{
					label: '供货单位',
					value: 9
				},
				{
					label: '安全评价单位',
					value: 10
				},
				{
					label: '移民监督单位',
					value: 11
				},
				{
					label: '机械制造单位',
					value: 12
				}
			],
			page: 1,
			listData: []
		};
	},
	onLoad() {
		this.getData();
	},
	methods: {
		errorLoad(){
			this.page=1;
			this.getData();
		},
		getData() {
			var that = this;
			var map = {
				TYPE: that.options1[that.value1].value,
				CHNM: that.searchTitle,
				PAGE: that.page,
				PAGESIZE: '20'
			};
			if (that.page == 1) {
				that.stateLayout = 'load';
			}
			that.$api
				.getUnit(map)
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
		randomColor() {
			return 'rgb(' + Math.floor(Math.random() * 130 + 110) + ',' + Math.floor(Math.random() * 130 + 110) + ',' + Math.floor(Math.random() * 130 + 110) + ')';
		},
		itemClick(item) {
			uni.navigateTo({
				url: '../company-del/company-del?unitId='+item.ID
			});
		},
		getTitle(be, en, name) {
			return name.substring(be, en);
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
		},
		change(index) {
			this.value1 = index - 1;
			this.value2 = index;
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
</style>
