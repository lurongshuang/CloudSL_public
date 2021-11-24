<template>
	<view>
		<u-navbar>
			<view class="slot-wrap">
				<view class="search-wrap"><u-search :focus="true" @search="search" @custom="custom" v-model="searchTitle"></u-search></view>
			</view>
		</u-navbar>
		<mescroll-body ref="mescrollRef" @init="mescrollInit" :up="$config.upOption" :down="$config.downOption" @down="downCallback" @up="upCallback">
			<state-layout :state="stateLayout" @errorLoad="errorLoad">
				<view slot="state" class="list-wrap">
					<u-cell-group :border="false">
						<u-cell-item @click="itemClick(item)" v-for="(item, index) in listData" :key="index" style="padding: 0upx;" hover-class="cell-hover-class" :arrow="false">
							<view slot="label">
								<view class=" u-font-30 u-padding-20 text-bold text-black">{{ item.BZNAME }}</view>
								<u-line></u-line>
								<view style="padding: 25upx 15upx;">
									<u-row>
										<u-col span="3">
											<view style="width: 164upx;height: 214upx; border: 2upx solid #EEEEEE; background-color:#808080; text-align: center;">
												<u-image
													:src="$config.url3_config + item.BZIMGURL"
													width="160upx"
													height="210upx"
													style="opacity: 0.9;"
													mode="aspectFill"
												></u-image>
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
					</u-cell-group>
				</view>
			</state-layout>
		</mescroll-body>
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
			pageSize: 30,
			listData: []
		};
	},
	onLoad() {
		this.getData();
	},
	methods: {
		errorLoad() {
			this.page = 1;
			this.getData();
		},
		getData() {
			var that = this;
			var map = {
				BZNAME: that.searchTitle,
				PageIndex: that.page,
				PageSize: that.pageSize,
				UserId: that.$utils.getUserId(),
				KEY: that.$utils.getKey00('GetSLBZInfoByBZName')
			};
			if (that.page == 1) {
				that.stateLayout = 'load';
			}
			that.$api
				.getSlbzInfoByZbName(map)
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
				})
				.catch(e => {
					that.stateLayout = 'error';
				});
		},
		closeDropdown() {
			this.$refs.uDropdown.close();
		} /*下拉刷新的回调 */,
		downCallback() {
			this.page = 1;
			this.getData();
		},
		/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
		upCallback() {
			this.page += 1;
			this.getData();
		},
		getTop() {
			var top = (this.CustomBar / uni.getSystemInfoSync().windowWidth) * 750;
			return top;
		},
		randomColor() {
			return 'rgb(' + Math.floor(Math.random() * 130 + 110) + ',' + Math.floor(Math.random() * 130 + 110) + ',' + Math.floor(Math.random() * 130 + 110) + ')';
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
		getTitle(be, en, name) {
			return name.substring(be, en);
		},
		search() {
			if (this.searchTitle.trim().length == 0) {
				this.$utils.showToast('请输入关键字');
				return;
			}
			this.page = 1;
			this.mescroll.scrollTo(0);
			this.getData();
		},
		custom() {
			if (this.searchTitle.trim().length == 0) {
				this.$utils.showToast('请输入关键字');
				return;
			}
			this.page = 1;
			this.mescroll.scrollTo(0);
			this.getData();
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
