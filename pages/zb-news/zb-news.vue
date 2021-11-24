<template>
	<view>
		<u-navbar title-color="#333333" title="招标资讯"></u-navbar>
		<mescroll-body ref="mescrollRef" @init="mescrollInit" :up="$config.upOption" :down="$config.downOption" @down="downCallback" @up="upCallback">
			<view class="list-wrap">
				<u-cell-group :border="false">
					<u-cell-item v-for="index in 20" :key="index" style="padding: 20upx;" hover-class="cell-hover-class" :arrow="false">
						<view slot="label">
							<view class="uni-media-list">
								<view class="uni-media-list-body">
									<view class="u-font-30 text-black u-col-2 uni-media-list-text-top text-bold" style="line-height: 50upx;">
										资讯名称资讯名称资讯名称资讯名称资讯名称资讯名称资讯名称资讯名称资讯名称资讯名称资讯名称资讯名称资讯名称资讯名称资讯名称
									</view>
									<view class="uni-media-list-text-bottom">
										<text class="u-font-28 text-gray">阅读 12</text>
										<view>
											<u-icon name="clock" class="u-font-30 text-gray u-m-r-5"></u-icon>
											<text class="text-gray u-font-28">2020-02-02</text>
										</view>
									</view>
								</view>
								<image class="uni-media-list-logo" mode="aspectFill" src="../../static/img/ic_mnpjbtn.png"></image>
							</view>
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
		return {};
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
</style>
