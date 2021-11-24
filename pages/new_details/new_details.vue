<template>
	<view>
		<u-navbar :title="title"></u-navbar>
		<state-layout :state="state" errorLoad="errorLoad">
			<view slot="state"><web-view :webview-styles="webviewStyles" :src="webUrl"></web-view></view>
		</state-layout>
	</view>
</template>

<script>
var wv; //计划创建的webview
export default {
	data() {
		return {
			busno: '',
			state: '',
			webUrl: '',
			webviewStyles: {
				progress: {
					color: '#ffffff'
				}
			},
			title: '资讯详情'
		};
	},
	onReady() {
		var that = this;
		// #ifdef APP-PLUS
		var currentWebview = this.$scope.$getAppWebview();
		setTimeout(function() {
			wv = currentWebview.children()[0];
			wv.setStyle({
				top: that.CustomBar,
				bottom: 1
			});
		}, 100);
		// #endif
		// that.state = 'load';
		// setTimeout(function() {
		// 	that.state = '';
		// }, 1000);
	},
	onLoad(e) {
		this.webUrl = decodeURI(e.webUrl);
		if (e && e.title && e.title.length > 0) {
			this.title = e.title;
		}
	},
	methods: {
		errorLoad() {
			wv.reload();
		}
	}
};
</script>

<style></style>
