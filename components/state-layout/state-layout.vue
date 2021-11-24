<template>
	<view>
		<view class="stateView text-center" v-if="state == 'load'" :style="[{ paddingTop: paddingTop }, { height: winHeight + 'px' }]">
			<uni-load-more iconType="circle" status="loading" color="#01d9c2" :iconSize="textSize" :contentText="contentText" />
			<view style="margin-top: 20upx;" class="stateTip">{{ loadData }}</view>
		</view>
		<view v-if="state == 'error'">
			<view class="stateView text-center" :style="[{ paddingTop: paddingTop }, { height: winHeight + 'px' }]">
				<image class="stateImg" style="width: 300upx;" src="../../static/img/state/ic_def_error.png" mode="widthFix"></image>
				<view class="stateTip">{{ errorData }}</view>

				<button @click="errorLoad" class="errorbt text-white">重试</button>
			</view>
		</view>
		<view class="stateView  text-center" v-if="state == 'empty'" :style="[{ paddingTop: paddingTop }, { height: winHeight + 'px' }]">
			<view>
				<image class="stateImg" style="width: 300upx;" src="../../static/img/state/ic_def_empty.png" mode="widthFix"></image>
				<view class="stateTip">{{ noData }}</view>
			</view>
		</view>
		<slot v-if="state == 'content' || state == ''" name="state"></slot>
	</view>
</template>

<script>
export default {
	data() {
		return {
			contentText: {
				contentdown: ' ',
				contentrefresh: '',
				contentnomore: ' '
			},
			textSize: 50,
			winHeight: 0
		};
	},
	props: {
		paddingTop: {
			type: String,
			default: '50%'
		},
		state: {
			type: String,
			default: 'content'
		},
		noData: {
			type: String,
			default: '暂无数据'
		},
		errorData: {
			type: String,
			default: '出错了,请稍后再试'
		},
		loadData: {
			type: String,
			default: '加载中'
		}
	},
	mounted(e) {
		var that = this;
		uni.getSystemInfo({
			success: function(res) {
				that.winHeight = res.windowHeight- res.statusBarHeight - 44;
			}
		});
	},
	methods: {
		errorLoad() {
			this.$emit('errorLoad');
		}
	}
};
</script>

<style>
.stateView {
	background-color: #ffffff;
	/* height: 100vh!important; */
	padding-top: 50%;
}
.stateImg {
	width: 300upx;
}
.stateTip {
	font-size: 30upx;
	color: #6e757d;
}
.errorbt {
	background-color: #01d9c2;
	width: 150upx;
	font-size: 20upx;
	border: 0rpx;
	margin-top: 10upx;
	border-color: #01d9c2;
}
.cu-load.load-cuIcon::before {
	font-size: 100upx !important;
	color: #01d9c2;
}
</style>
