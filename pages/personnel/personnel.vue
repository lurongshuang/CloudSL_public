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
					<u-cell-group :border="false" style="background-color: #f5f4f4;">
						<u-cell-item @click="itemClick()" v-for="(item, index) in listData" :key="index" style="padding: 0upx;" hover-class="cell-hover-class" :arrow="false">
							<view slot="label">
								<u-collapse event-type="close">
									<u-collapse-item>
										<view slot="title" style="padding-bottom: 6upx;">
											<u-row>
												<u-col span="12">
													<view class="text-black u-font-35 text-bold u-p-lr-10">{{ item.NAME }}</view>
												</u-col>
												<u-col v-show="item.TITLE" style="position: absolute; left: 200upx;" span="12">
													<view class="main-color u-font-28 viewTitie u-line-1">{{ item.TITLE }}</view>
												</u-col>
											</u-row>
										</view>
										<u-line></u-line>
										<view class="collapse-item" style="padding: 10upx 15upx;">
											<u-row class="u-m-t-20" align="top">
												<u-col class="u-font-30 text-gray" span="3">职&emsp;&emsp;称</u-col>
												<u-col class="u-font-30  text-black text-bold" span="9">{{ item.TITLE }}</u-col>
											</u-row>
											<u-row class="u-m-t-20" align="top">
												<u-col class="u-font-30 " span="3">专&emsp;&emsp;业</u-col>
												<u-col class="u-font-30 text-black text-bold" span="9">{{ item.SPECTY }}</u-col>
											</u-row>
											<u-row class="u-m-t-20" align="top">
												<u-col class="u-font-30 text-gray" span="3">身份证号</u-col>
												<u-col class="u-font-30 text-black text-bold" span="9">{{ hideMiddle(item.IDENTITYID) }}</u-col>
											</u-row>
											<u-row class="u-m-t-20" align="top">
												<u-col class="u-font-30 text-gray" span="3">所在单位</u-col>
												<u-col class="u-font-30 text-black text-bold" span="9">{{ item.UNITNAME }}</u-col>
											</u-row>
											<u-row class="u-m-t-20" align="top">
												<u-col class="u-font-30 text-gray" span="3">资格证号</u-col>
												<u-col class="u-font-30 text-black text-bold" span="9">{{ item.CERTID }}</u-col>
											</u-row>
											<u-row class="u-m-t-20" align="top">
												<u-col class="u-font-30 text-gray" span="3">执业证号</u-col>
												<u-col class="u-font-30 text-black text-bold" span="9">{{ item.REGID }}</u-col>
											</u-row>
											<u-row class="u-m-t-20 u-m-b-10" align="top">
												<u-col class="u-font-30 text-gray" span="3">有效期至</u-col>
												<u-col class="u-font-30  text-black text-bold" span="9">{{ item.VTIME }}</u-col>
											</u-row>
										</view>
									</u-collapse-item>
								</u-collapse>
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
			value1: 0,
			value2: 1,
			searchTitle: '',
			options1: [
				{
					label: '总监',
					value: 1
				},
				{
					label: '监理工程师',
					value: 2
				},
				{
					label: '监理员',
					value: 3
				},
				{
					label: '造价工程师',
					value: 4
				},
				{
					label: '质量检测员',
					value: 5
				},
				{
					label: '建造师',
					value: 6
				},
				{
					label: '安全工程师',
					value: 7
				},
				{
					label: '造价员',
					value: 8
				},
				{
					label: '五大员',
					value: 9
				},
				{
					label: '三类人员',
					value: 10
				},
				{
					label: '其他执业人员',
					value: 11
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
		hideMiddle(val) {
			return `${val.substring(0, 3)}***********${val.substring(val.length - 4)}`;
		},
		errorLoad() {
			this.page = 1;
			this.getData();
		},
		getData() {
			var that = this;
			var map = {
				JINDEX: that.options1[that.value1].value,
				eNAME: that.searchTitle,
				UNITNAME: '',
				PAGE: that.page,
				PAGESIZE: '30'
			};
			if (that.page == 1) {
				that.stateLayout = 'load';
			}
			that.$api
				.getPerByJinDex(map)
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
		itemClick(item) {},
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
.viewTitie {
	border-radius: 10upx;
	background-color: #e4f4fd;
	width: 200upx;
	padding: 10upx 10upx;
	text-align: center;
}
</style>
