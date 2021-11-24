<template>
	<view>
		<u-navbar title="招标政策"></u-navbar>
		<mescroll-body ref="mescrollRef" @init="mescrollInit" :up="$config.upOption" :down="$config.downOption" @down="downCallback" @up="upCallback">
			<view class="list-wrap">
				<u-cell-group :border="false">
					<u-cell-item  v-for="(item, index) in listData" :key="index" style="padding: 20upx;" hover-class="cell-hover-class" :arrow="false">
						<view class="text-def-size text-black text-bold u-skeleton-rect u-line-2" slot="title">{{ item.title }}</view>
						<view slot="label">
							<u-row class="u-m-t-10">
								<u-col span="8" style="padding: 0upx;">
									<u-row>
										<view class="u-m-r-20 u-font-25 tag text-main u-skeleton-rect" style="background-color: #E4F4FD;">{{ item.tag }}</view>
									</u-row>
								</u-col>
								<u-col span="4" class="text-right" style="padding: 0upx; text-align: right;">
									<u-icon name="clock" class="u-font-30 text-gray"></u-icon>
									<text class="u-font-28 u-m-l-10 text-gray u-skeleton-rect">2021-03-08</text>
								</u-col>
							</u-row>
						</view>
					</u-cell-item>
				</u-cell-group>
			</view>
		</mescroll-body>
	</view>
</template>

<script>
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
export default {
	mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
	data() {
		return {
			listData: [
				{ title: '取消现场投标报名，推进电子投标。', tag: '北京' },
				{ title: '2019年8月30日前，取消招标报名环节，全面实现使用电子标书，实现招标文件网上下载。', tag: '广西' },
				{ title: '取消投标报名环节，推行网上无记名方式购买标书、图纸；', tag: '江西' },
				{ title: '取消政府采购项目在市公共资源交易平台网上报名环节，即取消项目开标前设置供应商信息登记和网上报名要求。', tag: '南宁' },
				{ title: '自2019年8月15日起，深圳市政府采购中心停止收取投标保证金和履约保证金，市政府采购中心同时为所有注册供应商开放投标权限。', tag: '深圳' },
				{ title: '自2019年6月1日起，全省政府采购货物和服务招标投标活动不得向供应商收取投标保证金，非招标采购方式采购货物、工程和服务亦同。', tag: '浙江' },
				{ title: '在政府采购活动中，采购人、采购代理机构不得收取投标保证金。', tag: '湖北' },
				
				
			]
		};
	},
	methods: {
		/*下拉刷新的回调 */
		downCallback() {
			this.mescroll.endSuccess();
		},
		/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
		upCallback() {
			this.mescroll.endUpScroll(true);
		}
	}
};
</script>

<style>
/* 图文列表 */
.uni-media-list {
	box-sizing: border-box;
	display: flex;
	width: 100%;
	flex-direction: row;
}

.uni-navigate-right.uni-media-list {
	padding-right: 74upx;
}

.uni-pull-right {
	flex-direction: row-reverse;
}

.uni-pull-right > .uni-media-list-logo {
	margin-right: 0upx;
	margin-left: 20upx;
}

.uni-media-list-logo image {
	height: 100%;
	width: 100%;
}

.uni-media-list-text-bottom {
	width: 100%;
	line-height: 30upx;
	font-size: 26upx;
	color: #8f8f94;
}

.uni-media-list-logo {
	width: 200upx;
	height: 140upx;
	margin-left: 20upx;
}

.uni-media-list-body {
	display: flex;
	flex: 1;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
	overflow: hidden;
	height: auto;
}

.uni-media-list-text-top {
	width: 100%;
	font-size: 32upx;
	display: -webkit-box;
	overflow: hidden;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	line-height: 40upx;
}

.uni-media-list-text-bottom {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}

.tag {
	border-radius: 10upx;
	padding: 5upx 15upx;
}
</style>
