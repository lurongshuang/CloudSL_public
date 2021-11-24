<template>
	<view>
		<u-navbar title="标准目录"></u-navbar>
		<mescroll-body ref="mescrollRef" @init="mescrollInit" :up="$config.upOptionNo" :down="$config.downOption" @down="downCallback" @up="upCallback">
			<state-layout :state="stateLayout" @errorLoad="errorLoad">
				<view slot="state" class="list-wrap">
					<u-cell-group :border="false" style="background-color: #f5f4f4;">
						<u-cell-item @click="itemClick(item)" v-for="(item, index) in listData" :key="index" style="padding: 0upx;" hover-class="cell-hover-class" :arrow="false">
							<view slot="label">
								<view class=" u-font-32 u-padding-20 " style="line-height: 50upx;">
									<text class="text-main" v-show="isPurchased && item.ENDPAGE <= tryReading">试读-</text>
									<text class="text-black">{{ item.MLNAME }}</text>
								</view>
							</view>
						</u-cell-item>
					</u-cell-group>
				</view>
			</state-layout>
		</mescroll-body>
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
			listData: [],
			bookId: '',
			bookType: '',
			isPurchased: false,
			bookPrice: 0,
			tryReading: 1,
			show: false,
			isAliPay: true,
			isVipBuy: false,
			dowPath: ''
		};
	},
	onLoad(e) {
		this.bookId = e.bookId;
		this.bookType = e.bookType;
		this.isPurchased = e.isPurchased == 'true' ? true : false;
		this.bookPrice = e.bookPrice;
		this.dowPath = e.dowPath;
		this.getData();
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
		errorLoad() {
			this.page = 1;
			this.getData();
		},
		getData() {
			var that = this;
			var map = {
				ID: that.bookId,
				PageIndex: that.page,
				PageSize: '30',
				bookType: that.bookType,
				KEY: that.$utils.getKey00('GetPDFInfo')
			};
			if (that.page == 1) {
				that.stateLayout = 'load';
			}
			that.$api
				.getPdfInfo(map)
				.then(data => {
					if (data && data.data && data.data.errcode == '0') {
						if (that.page == 1) {
							that.listData = data.data.data;
							if (that.listData == 0) {
								that.stateLayout = 'empty';
								that.$utils.showToast('暂无目录，跳转到在线预览');
								setTimeout(function() {
									uni.navigateTo({
										url:
											'../standard-pdf-show/standard-pdf-show?maxPage=20' +
											'&nowPage=1' +
											'&bookId=' +
											that.bookId +
											'&bookType=' +
											that.bookType +
											'&isPurchased=' +
											that.isPurchased +
											'&bookPrice=' +
											that.bookPrice +
											'&dowPath=' +
											that.dowPath
									});
								}, 1000);
								return;
							}
							if (that.isPurchased) {
								that.tryReading = that.$utils.getBookLookSize(that.listData[that.listData.length - 1].ENDPAGE);
							}
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
		itemClick(item) {
			var that = this;
			if (that.isPurchased && item.ENDPAGE > that.tryReading) {
				that.show = true;
				return;
			}
			uni.navigateTo({
				url:
					'../standard-pdf-show/standard-pdf-show?maxPage=' +
					that.listData[that.listData.length - 1].ENDPAGE +
					'&nowPage=' +
					item.STARTPAGE +
					'&bookId=' +
					that.bookId +
					'&bookType=' +
					that.bookType +
					'&isPurchased=' +
					that.isPurchased +
					'&bookPrice=' +
					that.bookPrice +
					'&dowPath=' +
					that.dowPath
			});
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
							fail(e) {
								console.log("微信支付："+JSON.stringify(e))
							}
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
.isSelectTrue {
	border: 2upx solid #2a96f0;
	border-radius: 20upx;
}
.isSelectFalse {
	border: 2upx solid #e0e0e0;
	border-radius: 20upx;
}
</style>
