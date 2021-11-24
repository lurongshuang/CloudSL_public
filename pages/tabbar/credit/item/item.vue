<template>
	<scroll-view show-scrollbar="false" :scroll-y="isScroll" :style="[{ height: viewHeight + 'px' }]">
		<state-layout :state="stateLayout">
			<view slot="state">
				<u-cell-group :border="false">
					<u-cell-item @click="itemClick(item)" v-for="(item, index) in listData" :key="index" style="padding: 20upx;" hover-class="cell-hover-class" :arrow="false">
						<view class="text-def-size text-black text-bold u-skeleton-rect u-line-2" slot="title">{{ item.TITLE }}</view>
						<view slot="label">
							<u-row class="u-m-t-10">
								<u-col span="8" style="padding: 0upx;">
									<u-row v-show="item.SFROM">
										<view
											class="u-m-r-20 u-font-25 tag text-main u-skeleton-rect u-line-1 u-skeleton-rect"
											style="background-color: #E4F4FD; padding: 5upx 15upx; border-radius: 10upx;">{{ item.SFROM }}</view>
									</u-row>
								</u-col>
								<u-col span="4" class="text-right u-skeleton-rect u-skeleton-rect" style="padding: 0upx; text-align: right;">
									<u-icon name="clock" class="u-font-30 text-gray"></u-icon>
									<text class="u-font-28 u-m-l-10 text-gray u-skeleton-rect">{{ item.PTIME }}</text>
								</u-col>
							</u-row>
						</view>
					</u-cell-item>
					<view class="u-padding-30"><u-loadmore @loadmore="loadmore" :status="loadType" /></view>
				</u-cell-group>
			</view>
		</state-layout>
	</scroll-view>
</template>

<script>
export default {
	data() {
		return {
			page: 1,
			pageSize: 20,
			listData: [],
			stateLayout: '',
			loadType: 'loading'
		};
	},
	props: {
		isScroll: {
			type: Boolean,
			default: false
		},
		viewHeight: {
			type: Number,
			default: 0
		},
		typeId: {
			type: String,
			default: '1'
		}
	},
	mounted() {
		this.getData();
	},
	methods: {
		loadmore() {
			this.page += 1;
			this.getData();
			this.loadType = 'loading';
		},
		errorLoad() {
			this.page = 1;
			this.getData();
		},
		getData() {
			var that = this;
			var map = {
				TYPE: that.typeId,
				PAGE: that.page,
				PAGESIZE: that.pageSize
			};
			if (that.page == 1) {
				that.stateLayout = 'load';
			}
			that.$api
				.getAllNews(map)
				.then(data => {
					if (data && data.data && data.data.code == 1) {
						if (that.page == 1) {
							that.listData = data.data.data;
						} else {
							that.listData = that.listData.concat(data.data.data);
						}
						that.stateLayout = '';
						if (that.listData.length == 0) {
							that.stateLayout = 'empty';
						}
					} else {
						if (that.page == 1) {
							that.stateLayout = 'empty';
						}
						if (that.page > 1 && that.listData.length > 0) {
							that.loadType = 'nomore';
						}
					}
					if (data.data.data.length == 0) {
						that.loadType = 'nomore';
					} else {
						that.loadType = 'loadmore';
					}
				})
				.catch(e => {});
		},
		downCallback() {
			this.page = 1;
			this.getData();
		},
		upCallback() {
			this.page += 1;
			this.getData();
		},
		itemClick(item) {
			var key = this.$utils.getKey21('AppView');
			var url = this.$config.url_config + '/APIIXH/APP/AppView?ID=' + item.ID + '&KEY=' + key;
			uni.navigateTo({
				url: '../../new_details/new_details?title=资讯详情&webUrl=' +  encodeURI(url)
			});
		}
	}
};
</script>

<style></style>
