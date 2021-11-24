<template>
	<view>
		<u-navbar title="业绩详情"></u-navbar>
		<state-layout :state="stateLayout" @errorLoad="errorLoad">
			<view class="u-padding-20" slot="state">
				<u-row class="u-m-t-10"><u-col class="u-font-35 text-black text-bold" span="12">{{dataInfo.PRJNM}}</u-col></u-row>
				<u-row class="u-m-t-30">
					<u-col class="u-font-32 text-gray" span="4">项目状态</u-col>
					<u-col class="u-font-32 text-black text-bold" span="8">{{dataInfo.STEXT}}</u-col>
				</u-row>
				<u-row class="u-m-t-30">
					<u-col class="u-font-32 text-gray" span="4">项目负责人</u-col>
					<u-col class="u-font-32 text-black text-bold" span="8">{{dataInfo.PRJMGR}}</u-col>
				</u-row>
				<u-row class="u-m-t-30">
					<u-col class="u-font-32 text-gray" span="4">技术负责人</u-col>
					<u-col class="u-font-32 text-black text-bold" span="8">{{dataInfo.TECH}}</u-col>
				</u-row>
				<u-row class="u-m-t-30">
					<u-col class="u-font-32 text-gray" span="4">所在地</u-col>
					<u-col class="u-font-32 text-black text-bold" span="8">{{dataInfo.ADDRESS}}</u-col>
				</u-row>
				<u-row class="u-m-t-30">
					<u-col class="u-font-32 text-gray" span="4">合同金额</u-col>
					<u-col class="u-font-32 text-black text-bold" span="8">{{dataInfo.CTRMNY}}</u-col>
				</u-row>
				<u-row class="u-m-t-30">
					<u-col class="u-font-32 text-gray" span="4">开始日期</u-col>
					<u-col class="u-font-32 text-black text-bold" span="8">{{dataInfo.STIME}}</u-col>
				</u-row>
				<u-row class="u-m-t-30 u-m-b-10">
					<u-col class="u-font-32 text-gray" span="4">结束日期</u-col>
					<u-col class="u-font-32 text-black text-bold" span="8">{{dataInfo.ETIME}}</u-col>
				</u-row>
			</view>
		</state-layout>
	</view>
</template>

<script>
export default {
	data() {
		return {
			yjId: '',
			jinDex: -1,
			stateLayout: '',
			dataInfo: {}
		};
	},
	onLoad(e) {
		this.yjId = e.yjId;
		this.jinDex = e.jinDex;
		this.getData();
	},
	methods: {
		errorLoad() {
			this.getData();
		},
		getData() {
			var that = this;
			var map = {
				ID: that.yjId,
				JINDEX: that.jinDex
			};
			that.stateLayout = 'load';
			that.$api
				.getProJdt(map)
				.then(data => {
					if (data && data.data && data.data.code == 1) {
						that.dataInfo = data.data.data;
						that.stateLayout = '';
					} else {
						that.stateLayout = 'empty';
					}
				})
				.catch(e => {
					that.stateLayout = 'error';
				});
		}
	}
};
</script>

<style></style>
