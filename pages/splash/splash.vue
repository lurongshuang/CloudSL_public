<template>
	<view class="content">
		<image class="sp-img" :src="imgSrc" mode="aspectFill"></image>
		<view class="sp-text" @click="openView">跳过 {{ index }}</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			index: 5,
			interval: null,
			imgSrc: '../../static/img/splash/imag_splash.png'
		};
	},
	methods: {
		openView() {
			if (this.interval) {
				clearInterval(this.interval);
			}
			uni.switchTab({
				url: '../tabbar/index/index'
			});
		},
		getImg() {
			// var that = this;
			// var info = {
			// 	tp: '3',
			// };
			// info['token'] = that.$utils.getMd5Token(info);
			// that.$api.getBANNER(info).then(data => {
			// 	if (data && data.data && data.data.length > 0) {
			// 		that.imgSrc = that.$config.imageHost + data.data[data.data.length - 1].BIMG
			// 	}
			// }).catch(function(e) {
			// })
		}
	},
	onLoad() {
		this.getImg();
		this.interval = setInterval(() => {
			this.index--;
			if (this.index <= 1) {
				this.openView();
			}
		}, 1000);
	}
};
</script>

<style>
.sp-img {
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
}

.sp-text {
	position: absolute;
	z-index: 100;
	right: 30upx;
	top: 90upx;
	border: 1upx solid rgba(90, 90, 90, 0.3);
	padding: 3upx 30upx;
	border-radius: 50upx;
	color: #ffffff;
	background: rgba(90, 90, 90, 0.3);
	filter: alpha(opacity=30);
}
</style>
