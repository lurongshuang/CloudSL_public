<template>
	<view>
		<u-navbar title="消息中心"></u-navbar>
		<mescroll-body ref="mescrollRef" @init="mescrollInit" :up="$config.upOption" :down="$config.downOption" @down="downCallback" @up="upCallback">
			<state-layout :state="stateLayout" @errorLoad="errorLoad">
				<view slot="state" class="list-wrap">
					<u-cell-group :border="false" style="background-color: #f5f4f4;">
						<u-cell-item
							:border-bottom="false"
							@click="itemClick()"
							v-for="(item, index) in listData"
							:key="index"
							style="padding: 0upx;"
							hover-class="cell-hover-class"
							:arrow="false"
						>
							<view slot="label">
								<u-row>
									<u-col span="2" text-align="center">
										<view style="position: relative;">
											<image src="../../static/img/ic_biaoxun_ico.png" mode="widthFix" style="width: 100upx;">
											</image>
											<u-badge :offset="[5,5]"  :is-dot="true" type="error"></u-badge>
										</view>
									</u-col>
									<u-col span="10">
										<view class="u-p-t-20 text-bold text-black u-font-32">标讯</view>
										<view style="width: 100%;" class="u-font-30 u-p-tb-20 text-8a8a8a u-line-1 u-font-30">
											北京市海淀区人民防空办公室2012年1月1日至2月1日政府采购意向书
										</view>
										<u-line></u-line>
									</u-col>
								</u-row>
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
		errorLoad() {
			this.page = 1;
			this.getData();
		},
		getData() {
			var that = this;
			var map = {
				NAME: that.searchTitle,
				PAGE: that.page,
				PAGESIZE: '30'
			};
			if (that.page == 1) {
				that.stateLayout = 'load';
			}
			that.$api
				.getJudGeslb(map)
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
		itemClick(){
			
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
