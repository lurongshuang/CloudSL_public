<template>
	<view>
		<u-navbar title="在线预览">
			<view slot="right" v-show="!isPurchased"><u-icon class="u-m-r-20" @click="more" name="more-dot-fill"></u-icon></view>
		</u-navbar>
		<web-view style="z-index: 99;" ref="webview" :src="webUrl"></web-view>
		<view class="bottomStyle u-flex">
			<view class="u-flex-4 text-center"><text class="text-white u-font-32" @click="pageTop">上一页</text></view>
			<view class="u-flex-4 text-center">
				<text class="text-white u-font-32">{{ nowPage }} / {{ maxPage }}</text>
			</view>
			<view class="u-flex-4 text-center"><text class="text-white u-font-32" @click="pageNext">下一页</text></view>
		</view>
		<u-popup z-index="1000000" v-model="show" mode="bottom">
			<view>
				<view class="u-flex u-padding-30">
					<view class="u-flex-8 text-left">购买</view>
					<view class="u-flex-4 text-right" @click="finsh"><u-icon name="close"></u-icon></view>
				</view>
				<u-line color="#e0e0e0"></u-line>
				<view class="u-padding-30" style="background-color: #f7f7f7;">
					<view class="u-padding-20" :class="isVipBuy ? 'isSelectFalse' : 'isSelectTrue'" @click="isGoBuy">
						<view class="text-bold text-black u-font-32">直接购买</view>
						<view class="u-m-t-20 u-font-30 text-8a8a8a">手工金属结构焊接通用技术条件</view>
					</view>

					<view class="u-padding-20 u-m-t-20" :class="isVipBuy ? 'isSelectTrue' : 'isSelectFalse'" @click="vipBuy">
						<view class="text-bold text-black u-font-32">开通VIP</view>
						<view class="u-m-t-20 u-font-30 text-8a8a8a">享有全部水利标准</view>
					</view>

					<view class="u-p-tb-20">
						<text class="text-black text-bold u-font-32">价格：</text>
						<text class="u-font-32 text-red">{{ bookPrice }}元</text>
					</view>
					<view class="u-font-28 text-8a8a8a">支付成功后，立即解锁已购内容</view>
				</view>
				<view>
					<view class="u-flex u-padding-25" @click="aliPay">
						<view class="u-flex-8 text-left u-flex">
							<u-image src="../../static/img/ic_alipay.png" width="40upx" height="40upx" mode="widthFix"></u-image>
							<text class="text-bold u-font-30 u-m-l-20">支付宝支付</text>
						</view>
						<view class="u-flex-4 text-right"><radio @click="aliPay" :checked="isAliPay"></radio></view>
					</view>
					<u-line color="#e0e0e0"></u-line>
					<view class="u-flex u-padding-25" @click="wePay">
						<view class="u-flex-8 text-left u-flex">
							<u-image src="../../static/img/ic_wechat_pay.png" width="40upx" height="40upx" mode="widthFix"></u-image>
							<text class="text-bold u-font-30 u-m-l-20">微信支付</text>
						</view>
						<view class="u-flex-4 text-right"><radio @click="wePay" :checked="!isAliPay"></radio></view>
					</view>
				</view>
				<u-line color="#e0e0e0"></u-line>
				<view class="u-padding-30"><u-button @click="getPay" style="background-color: #2A96F0; color: #FFFFFF; font-size: 30upx;">立即购买</u-button></view>
			</view>
		</u-popup>
		<u-action-sheet z-index="10000000" @click="sheetClick" :list="sheetList" v-model="sheetShow" :cancel-btn="true"></u-action-sheet>
	</view>
</template>

<script>
var wv; //计划创建的webview
export default {
	data() {
		return {
			webUrl: '',
			host: this.$config.url3_config + '/Home/ShowPdfPage?KEY=',
			maxPage: '',
			nowPage: 1,
			bookId: '',
			bookType: '',
			key: '',
			show: false,
			isAliPay: true,
			isVipBuy: false,
			isPurchased: false,
			bookPrice: 0,
			tryReading: 1,
			sheetList: [
				{
					text: '下载标准'
				}
			],
			sheetShow: false,
			dowPath: ''
		};
	},
	watch: {
		show(e) {
			if (e) {
				wv.hide();
			} else {
				wv.show();
			}
		},
		sheetShow(e) {
			if (e) {
				wv.hide();
			} else {
				wv.show();
			}
		}
	},
	onReady() {
		var that = this;
		// #ifdef APP-PLUS
		var currentWebview = this.$scope.$getAppWebview();
		setTimeout(function() {
			wv = currentWebview.children()[0];
			wv.setStyle({
				top: that.CustomBar,
				bottom: 50,
				scalable: true,
				zindex: 99
			});
		}, 100);
		// #endif
	},
	onLoad(e) {
		this.maxPage = parseInt(e.maxPage);
		this.nowPage = parseInt(e.nowPage);
		this.bookId = e.bookId;
		this.bookType = e.bookType;
		this.dowPath = e.dowPath;
		this.isPurchased = e.isPurchased == 'true' ? true : false;
		this.bookPrice = e.bookPrice;
		this.key = this.$utils.getKeyBook('ShowPdfPage', this.bookId, this.bookType, this.nowPage, this.nowPage);
		this.webUrl = this.host + this.key;
		if (this.isPurchased) {
			this.tryReading = this.$utils.getBookLookSize(this.maxPage);
		}
		var that = this;
		uni.$on(this.$config.standardSuccess, function(e) {
			if (that.bookId == e) {
				that.isPurchased = false;
			}
		});
	},
	onUnload() {
		uni.$off(this.$config.standardSuccess);
	},
	methods: {
		pageNext() {
			if (this.nowPage >= this.maxPage) {
				return;
			}
			if (this.isPurchased && this.nowPage >= this.tryReading) {
				this.show = true;
				return;
			}
			this.nowPage += 1;
			this.key = this.$utils.getKeyBook('ShowPdfPage', this.bookId, this.bookType, this.nowPage, this.nowPage);
			wv.evalJS('javascript:topage(' + this.nowPage + ')');
		},
		pageTop() {
			if (this.nowPage <= 1) {
				return;
			}
			this.nowPage -= 1;
			this.key = this.$utils.getKeyBook('ShowPdfPage', this.bookId, this.bookType, this.nowPage, this.nowPage);
			wv.evalJS('javascript:topage(' + this.nowPage + ')');
		},
		aliPay() {
			this.isAliPay = true;
		},
		wePay() {
			this.isAliPay = false;
		},
		isGoBuy() {
			this.isVipBuy = false;
		},
		vipBuy() {
			// this.isVipBuy = true;
			uni.navigateTo({
				url: '../getVip/getVip'
			});
		},
		finsh() {
			this.show = false;
		},
		more() {
			this.sheetShow = true;
		},
		sheetClick(index) {
			uni.showLoading({
				title: '下载中,请稍后...'
			});
			var that = this;
			uni.getFileInfo({
				filePath: '_downloads/' + that.dowPath.substring(that.dowPath.lastIndexOf('/') + 1),
				success(res) {
					if (res.size > 0) {
						that.$utils.showToast('标准已下载');
					} else {
						that.dowFile();
					}
				},
				fail(e) {
					that.dowFile();
				}
			});
		},
		dowFile() {
			var that = this;
			var dtask = plus.downloader.createDownload(
				that.$config.url3_config + that.dowPath,
				{
					filename: that.dowPath.substring(that.dowPath.lastIndexOf('/') + 1)
				},
				function(d, status) {
					if (status == 200) {
						uni.hideLoading();
						that.$utils.showToast('标准下载完成');
						console.log(JSON.stringify(d));
					}
				}
			);
			dtask.start();
		},
		getPay() {
			if (this.isAliPay) {
				this.getAliPay();
			} else {
				this.getWeChatPay();
			}
		},
		paySuccess() {
			uni.$emit(this.$config.standardSuccess, this.bookId);
		},
		getAliPay() {
			var that = this;
			var map = {
				userID: that.$utils.getUserId(),
				PAYtype: 0,
				type: that.bookType,
				ID: that.bookId,
				KEY: that.$utils.getKey00('GetPAYresult')
			};
			uni.showLoading({
				title: '请稍后...'
			});
			this.$api
				.getPayResult(map)
				.then(data => {
					uni.hideLoading();
					if (data && data.data && data.data.errcode == '0') {
						uni.requestPayment({
							provider: 'alipay',
							orderInfo: data.data.data,
							success() {
								that.$utils.showToast('支付成功');
								setTimeout(function() {
									that.paySuccess();
								}, 500);
							},
							fail() {}
						});
					} else {
						that.$utils.showToast('获取订单信息失败');
					}
				})
				.catch(e => {
					uni.hideLoading();
					that.$utils.showToast('获取订单信息失败');
				});
		},
		getWeChatPay() {
			var that = this;
			var map = {
				userID: that.$utils.getUserId(),
				PAYtype: 1,
				type: that.bookType,
				ID: that.bookId,
				KEY: that.$utils.getKey00('GetPAYresult')
			};
			uni.showLoading({
				title: '请稍后...'
			});
			this.$api
				.getPayResult(map)
				.then(data => {
					uni.hideLoading();
					if (data && data.data && data.data.errcode == '0' && data.data.data) {
						uni.requestPayment({
							provider: 'wxpay',
							orderInfo: data.data.data,
							success() {
								that.$utils.showToast('支付成功');
								setTimeout(function() {
									that.paySuccess();
								}, 500);
							},
							fail() {}
						});
					} else {
						that.$utils.showToast('获取订单信息失败');
					}
				})
				.catch(e => {
					uni.hideLoading();
					that.$utils.showToast('获取订单信息失败');
				});
		}
	}
};
</script>

<style>
.bottomStyle {
	position: fixed;
	bottom: 0upx;
	left: 0upx;
	padding: 20upx;
	background-color: #333333;
	width: 100%;
	z-index: 100000;
}
.isSelectTrue {
	border: 2upx solid #2a96f0;
	border-radius: 20upx;
}
.isSelectFalse {
	border: 2upx solid #e0e0e0;
	border-radius: 20upx;
}
</style>
