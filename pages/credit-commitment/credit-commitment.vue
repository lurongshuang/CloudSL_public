<template>
	<view>
		<u-navbar>
			<view class="slot-wrap">
				<view class="search-wrap"><u-search @search="search" @custom="custom" v-model="searchTitle"></u-search></view>
			</view>
		</u-navbar>
		<mescroll-body ref="mescrollRef" @init="mescrollInit" :up="$config.upOption" :down="$config.downOption" @down="downCallback" @up="upCallback">
			<state-layout :state="stateLayout" @errorLoad="errorLoad">
				<view slot="state" class="list-wrap">
					<u-cell-group :border="false" style="background-color: #f5f4f4; padding: 20upx;">
						<u-cell-item v-for="(item, index) in listData" :key="index" style="padding: 0upx;" hover-class="cell-hover-class" :arrow="false">
							<view slot="label">
								<view class=" u-font-30 u-padding-20 text-bold text-black">{{ item.CHNM }}</view>
								<u-line></u-line>
								<view style="padding: 25upx 15upx;">
									<u-row>
										<u-col span="4" text-align="center">
											<u-image @click="openImg(item.PATH)"  width="210upx" height="150upx" :src="item.PATH" mode="aspectFill"></u-image>
										</u-col>
										<u-col span="8" text-align="center">
											<u-row>
												<u-col class="u-font-30  text-gray" span="4">法定代表</u-col>
												<u-col class="u-font-30 text-black  text-bold" span="8">{{ item.LR }}</u-col>
											</u-row>
											<u-row class="u-m-t-10">
												<u-col class="u-font-30 text-gray" span="4">信息来源</u-col>
												<u-col class="u-font-30  text-black text-bold" span="8">中国水利工程协会</u-col>
											</u-row>
											<u-row class="u-m-t-10">
												<u-col class="u-font-30 text-gray" span="4">发布时间</u-col>
												<u-col class="u-font-30  text-black text-bold" span="8">{{ item.RTIME }}</u-col>
											</u-row>
										</u-col>
									</u-row>
									<view class="u-m-t-20 u-font-30 text-black u-p-lr-10 " style="line-height: 50upx;">
										为促进中小企业信用体系建设，{{ item.CHNM }} 自愿签署《信用承诺书》，树立企业信用意识，保证诚信经营。
									</view>
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
			listData: []
		};
	},
	onLoad() {
		this.getData();
	},
	methods: {
		openImg(path){
			uni.previewImage({
				urls:[path]
			})
		},
		errorLoad() {
			this.page = 1;
			this.getData();
		},
		getData() {
			var that = this;
			var map = {
				CHNM: that.searchTitle,
				PAGE: that.page,
				PAGESIZE: '30'
			};
			if (that.page == 1) {
				that.stateLayout = 'load';
			}
			that.$api
				.getBook(map)
				.then(data => {
					if (data && data.data && data.data.code == 1) {
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
		downCallback() {
			this.page = 1;
			this.getData();
		},
		/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
		upCallback() {
			this.page += 1;
			this.getData();
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
.viewTitie {
	border-radius: 10upx;
	background-color: #e4f4fd;
	width: 200upx;
	padding: 10upx 10upx;
	text-align: center;
}
</style>
