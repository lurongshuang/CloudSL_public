<template>
	<mescroll-body
		:height="viewHeight"
		:bottombar="false"
		ref="mescrollRef"
		@init="mescrollInit"
		:up="$config.upOptionNo"
		:down="$config.downOption"
		@down="downCallback"
		@up="upCallback"
	>
		<scroll-view @scrolltolower="lower" show-scrollbar="false" :scroll-y="isScroll" :style="[{ height: getHe() + 'px' }]">
			<state-layout :state="stateLayout" @errorLoad="errorLoad">
				<view slot="state">
					<u-cell-group :border="false">
						<u-cell-item @click="itemClick(item)" v-for="(item, index) in listData" :key="index" style="padding: 0upx;" hover-class="cell-hover-class" :arrow="false">
							<view slot="label">
								<view class=" u-font-30 u-padding-20 text-bold text-black">{{ item.BZNAME }}</view>
								<u-line></u-line>
								<view style="padding: 25upx 15upx;">
									<u-row>
										<u-col span="3">
											<view
												style="position: relative; width: 164upx;height: 214upx; border: 2upx solid #EEEEEE; background-color:#808080; text-align: center;"
											>
												<u-image
													:src="$config.url3_config + item.BZIMGURL"
													width="160upx"
													height="210upx"
													style="opacity: 0.9;"
													mode="aspectFill"
												></u-image>
												<text style="position: absolute; bottom: 0upx; right: 0upx;" class="u-font-30 text-main">
													{{ item.isPurchased != 0 ? '已购' : '' }}
												</text>
											</view>
										</u-col>
										<u-col class="u-font-28 text-gray" span="9">
											<u-row>
												<u-col class="u-font-28 text-gray" span="4">标准编号</u-col>
												<u-col class="u-font-28 text-black text-bold" span="8">{{ item.BZNUMBER }}</u-col>
											</u-row>
											<u-row class="u-m-t-40">
												<u-col class="u-font-28 text-gray" span="4">专业分类</u-col>
												<u-col class="u-font-28 text-black text-bold" span="8">{{ item.ZYML }}</u-col>
											</u-row>
											<u-row class="u-m-t-40">
												<u-col class="u-font-28 text-gray" span="4">发布时间</u-col>
												<u-col class="u-font-28 text-black text-bold" span="8">{{ $utils.dateFormat(item.BZCREATETIME, 'yyyy-MM-dd') }}</u-col>
											</u-row>
										</u-col>
									</u-row>
								</view>
								<view style="height: 20upx; background-color: #f5f4f4;"></view>
							</view>
						</u-cell-item>
						<view class="u-padding-30"><u-loadmore @loadmore="loadmore" :status="loadType" /></view>
					</u-cell-group>
				</view>
			</state-layout>
		</scroll-view>
	</mescroll-body>
</template>

<script>
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
export default {
	mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
	data() {
		return {
			stateLayout: '',
			listData: [],
			customStyle: {
				'border-radius': '10upx',
				height: '50upx',
				'font-size': '20upx',
				padding: '0upx'
			},
			type: 'select',
			border: true,
			page: 1,
			pageSize: 30,
			loadType: 'loading'
		};
	},
	props: {
		isScroll: {
			type: Boolean,
			default: true
		},
		viewHeight: {
			type: Number,
			default: 0
		}
	},
	mounted() {
		this.getData();
		var that = this;
		uni.$on(this.$config.standardSuccess, function(e) {
			for (var i = 0; i < that.listData.length; i++) {
				if (that.listData[i].ID == e) {
					that.listData[i].isPurchased = 1;
				}
			}
		});
	},
	beforeDestroy() {
		uni.$off(this.$config.standardSuccess)
	},
	methods: {
		errorLoad() {
			this.downCallback();
		},
		getData() {
			var that = this;
			var map = {
				namev: '',
				PageIndex: that.page,
				PageSize: that.pageSize,
				UserId: that.$utils.getUserId(),
				KEY: that.$utils.getKey00('GetSAFESCBASEInfoByBZ')
			};
			if (that.page == 1) {
				that.stateLayout = 'load';
			}
			that.$api
				.getSafescbAsSeInfoByBZ(map)
				.then(data => {
					if (data && data.data && data.data.errcode == '0') {
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
					if (data.data.data.length == 0) {
						that.loadType = 'nomore';
					} else {
						that.loadType = 'loadmore';
					}
				})
				.catch(e => {
					that.mescroll.endSuccess();
					that.stateLayout = 'error';
				});
		},
		getHe() {
			return this.viewHeight;
		},
		lower() {},
		/*下拉刷新的回调 */
		downCallback() {
			this.page = 1;
			this.getData();
		},
		/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
		upCallback() {
			this.mescroll.endUpScroll(false);
		},
		itemClick(item) {
			uni.navigateTo({
				url:
					'../standard-catalog/standard-catalog?bookId=' +
					item.ID +
					'&bookType=' +
					item.isSLBZORAQBZ +
					'&isPurchased=' +
					(item.isPurchased == 0 ? true : false) +
					'&bookPrice=' +
					item.MONEY +
					'&dowPath=' +
					encodeURI(item.BZURL)
			});
		},
		loadmore() {
			this.page += 1;
			this.getData();
			this.loadType = 'loading';
		}
	}
};
</script>

<style>
.textSelt {
	border-radius: 25upx;
	border: 1upx solid #e0e0e0;
	padding: 5upx 10upx;
	max-width: 50upx;
	color: #333333;
}
.textSeltFalse {
	border-radius: 25upx;
	border: 1upx solid #2a96f0;
	padding: 5upx 10upx;
	max-width: 50upx;
	color: #2a96f0;
}
.borderTrue {
	color: #2a96f0;
}
.borderFalse {
	color: #bcbcbc;
}
</style>
