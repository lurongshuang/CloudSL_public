<template>
	<mescroll-body ref="mescrollRef" @init="mescrollInit" :up="$config.upOptionNo" :down="downOption" @down="downCallback" @up="upCallback">
		<view>
			<view class="headBg" style="position: relative;">
				<view style="position: absolute; right: 30upx; top: 60upx;" @click="openMessage">
					<u-badge :is-dot="true" :offset="[0, 0]" type="error"></u-badge>
					<u-icon name="chat" color="#ffffff" size="50"></u-icon>
				</view>
				<u-row justify="center">
					<u-col span="6" align="center">
						<view class="text-center">
							<u-image
								@click="openUserInfo"
								style="margin: 0upx auto;"
								height="150upx"
								width="150upx"
								src="../../../static/img/ic_user-ico.png"
								shape="circle"
								:lazy-load="true"
							></u-image>
						</view>
					</u-col>
					<u-col span="6">
						<view class="text-left u-m-l-20">
							<view class="text-white u-font-40" @click="openUserInfo">张燕青</view>
							<view class="u-m-t-20 text-left" @click="openResume">
								<u-icon name="integral" class="text-white" size="35" />
								<text class="text-white u-font-32 u-m-l-10">普通用户</text>
							</view>
						</view>
					</u-col>
				</u-row>
				<!-- <view class="u-m-t-20 text-white" >
					<u-row class="u-p-lr-30">
						<u-col span="4">
							<view class="text-center">
								<view class="u-font-30">4</view>
								<view class="u-font-32 u-m-t-10">沟通过</view>
							</view>
						</u-col>
						<u-col span="4">
							<view class="text-center">
								<view class="u-font-30">2</view>
								<view class="u-font-32 u-m-t-10">面试</view>
							</view>
						</u-col>
						<u-col span="4">
							<view class="text-center">
								<view class="u-font-30">2</view>
								<view class="u-font-32 u-m-t-10">已投递简历</view>
							</view>
						</u-col>
					</u-row>
				</view> -->
				<view class="bg-white vipView">
					<view class="u-flex">
						<view style="width: 110upx; height: 35upx; background-image: url(../../../static/img/ic_vip_ico.png); background-size: cover;"></view>
						<text style="color: #FCC12D; " class="u-font-35 u-m-l-10">会员</text>
					</view>
					<view class="u-p-tb-20">
						<u-row>
							<u-col span="6"><view class="text-left text-black u-font-30">开通VIP获取更多权益</view></u-col>
							<u-col span="6">
								<view class="text-right"><u-button @click="gotoVip" class="vipButton" hover-class="default-button">立即开通</u-button></view>
							</u-col>
						</u-row>
					</view>
				</view>
			</view>
			<view>
				<u-cell-group class="u-p-b-50">
					<u-cell-item title="我的收藏" :title-style="titleStyle" @click="openMyCollection">
						<image src="../../../static/img/ic_wdxx_ico.png" class="u-m-r-20" style="width: 40upx;" mode="widthFix" slot="icon" />
					</u-cell-item>
					<u-cell-item title="我的订单" :title-style="titleStyle" @click="openOrder">
						<image src="../../../static/img/ic_wddd_ico.png" class="u-m-r-20" style="width: 40upx;" mode="widthFix" slot="icon" />
					</u-cell-item>
					<u-cell-item title="我的下载" :title-style="titleStyle" @click="myDows">
						<image src="../../../static/img/ic_wdxz_ico.png" class="u-m-r-20" style="width: 40upx;" mode="widthFix" slot="icon" />
					</u-cell-item>
					<!-- <u-cell-item title="我的求职" :title-style="titleStyle">
						<image src="../../../static/img/ic_wdqz_ico.png" class="u-m-r-20" style="width: 40upx;" mode="widthFix" slot="icon" />
					</u-cell-item> -->
					<view style="height: 10upx;background-color: #f5f2f0;"></view>
					<u-cell-item title="意见反馈" :title-style="titleStyle" @click="back">
						<image src="../../../static/img/ic_yjfk_ico.png" class="u-m-r-20" style="width: 40upx;" mode="widthFix" slot="icon" />
					</u-cell-item>
					<u-cell-item title="推荐APP" :title-style="titleStyle" @click="share">
						<image src="../../../static/img/ic_tjapp_ico.png" class="u-m-r-20" style="width: 40upx;" mode="widthFix" slot="icon" />
					</u-cell-item>
					<view style="height: 10upx;background-color: #f5f2f0;"></view>
					<view style="height: 10upx;background-color: #f5f2f0;"></view>
					<u-cell-item title="设置" :title-style="titleStyle" @click="openSet">
						<image src="../../../static/img/ic_sz_ico.png" class="u-m-r-20" style="width: 40upx;" mode="widthFix" slot="icon" />
					</u-cell-item>
				</u-cell-group>
			</view>
		</view>
	</mescroll-body>
</template>
<script>
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
export default {
	mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
	data() {
		return {
			titleStyle: {
				'font-size': '32upx',
				color: '#FF33333'
			},
			downOption: {
				use: true,
				auto: false,
				bgColor: '#2bc7ff',
				textColor: '#FFFFFF',
				autoShowLoading: false,
				isLock: false
			}
		};
	},
	onLoad() {},
	methods: {
		openUserInfo() {
			uni.navigateTo({
				url: '../../user-information/user-information'
			});
		},
		openResume() {
			// uni.navigateTo({
			// 	url: '../../my-resume/my-resume'
			// });
			uni.navigateTo({
				url: '../../getVip/getVip'
			});
		},
		openSet() {
			uni.navigateTo({
				url: '../../seting/seting'
			});
		},
		/*下拉刷新的回调 */
		downCallback() {
			this.mescroll.endSuccess();
		},
		/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
		upCallback() {
			this.mescroll.endUpScroll(false);
		},
		gotoVip() {
			uni.navigateTo({
				url: '../../getVip/getVip'
			});
		},
		myDows() {
			uni.navigateTo({
				url: '../../my_downloads/my_downloads'
			});
		},
		openMyCollection() {
			uni.navigateTo({
				url: '../../my-collection/my-collection'
			});
		},
		back() {
			uni.navigateTo({
				url: '../../feed-back/feed-back'
			});
		},
		share() {
			uni.shareWithSystem({
				summary: '我正在使用云水利，分享给你',
				href: 'http://www.hyrc99.com',
				success() {
					// 分享完成，请注意此时不一定是成功分享
				},
				fail() {
					// 分享失败
				}
			});
		},
		openOrder() {
			uni.navigateTo({
				url: '../../my-order/my-order'
			});
		},
		openMessage() {
			uni.navigateTo({
				url: '../../news-list/news-list'
			});
		}
	}
};
</script>

<style lang="scss">
.headBg {
	height: 480upx; //400upx 590
	background-image: url(../../../static/img/ic_mebg-982.png);
	background-size: cover;
	padding-top: 100upx;
}
page {
	background-color: #f5f2f0;
}
.vipView {
	margin: 0upx 20upx;
	padding: 20upx;
	margin-top: 40upx;
	border-top-left-radius: 15upx;
	border-top-right-radius: 15upx;
	padding-bottom: 50upx;
}
.vipButton {
	height: 65upx !important;
	width: 60%;
	margin-left: 40%;
	background-color: #fd9546 !important;
	border-color: #fd9546 !important;
	color: #ffffff !important;
}
.default-button {
	color: #fd9546 !important;
	border-color: #fd9546 !important;
	background-color: #ffffff !important;
}
</style>
