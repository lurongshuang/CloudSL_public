<template>
	<view>
		<u-navbar title="意见反馈"></u-navbar>
		<view>
			<view class="u-padding-30 bg-gray text-8a8a8a">问题和意见</view>
			<view class="u-p-lr-30 u-m-tb-10"><u-input v-model="value" type="textarea" :height="height" :auto-height="autoHeight" /></view>
			<view class="u-padding-30 bg-gray text-8a8a8a">图片（选填，提交问题截图）</view>
			<view class="u-p-lr-30 u-m-tb-10">
				<u-grid col="4" :border="false">
					<u-grid-item :custom-style="gridItemStyle" class="bg-img" v-for="(item, index) in imgList1" :key="index" @tap="viewImage(index)" :data-url="imgList1[index]">
						<view class="text-center seleImg">
							<u-image width="150upx" border-radius="10" height="150upx" :src="imgList1[index]" mode="aspectFill"></u-image>
							<view class="seleDel" @tap.stop="DelImg" :data-index="index"><u-icon name="close-circle-fill" color="#808080" size="40"></u-icon></view>
						</view>
					</u-grid-item>
					<u-grid-item>
						<view @tap="ChooseImage" v-if="imgList1.length < 8" class="seleAdd"><u-icon name="camera" size="50"></u-icon></view>
					</u-grid-item>
				</u-grid>
			</view>
			<view class="u-padding-30 bg-gray text-8a8a8a">联系方式</view>
			<view class="u-p-lr-20 u-m-tb-10"><u-input v-model="phone" type="text" placeholder="微信/QQ/邮箱" /></view>
			<u-line></u-line>
			
			<view class="u-m-t-50 u-padding-30"><u-button @click="btSub" style="background-color: #2A96F0; color: #FFFFFF; font-size: 30upx;">提交反馈</u-button></view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			value: '',
			height: 200,
			autoHeight: true,
			imgList1: [],
			index: 0,
			gridItemStyle: {
				padding: '10upx 0'
			},
			phone: ''
		};
	},
	methods: {
		viewImage(index) {
			uni.previewImage({
				urls: this.imgList1,
				current: index
			});
		},
		DelImg(e) {
			var that = this;
			uni.showModal({
				title: '删除图片',
				content: '确定要删除图片吗？',
				cancelText: '取消',
				confirmText: '确认',
				success: res => {
					if (res.confirm) {
						that.imgList1.splice(e.currentTarget.dataset.index, 1);
						if (that.type == 1 && that.forum.Imgs.length > 0) {
							var arr = that.forum.Imgs.split(',');
							if (e.currentTarget.dataset.index < arr.length) {
								arr.splice(e.currentTarget.dataset.index, 1);
								that.forum.Imgs = arr.toString();
							}
						}
					}
				}
			});
		},
		ChooseImage() {
			var that = this;
			try {
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
					success: res => {
						if (that.imgList1.length != 0) {
							that.imgList1 = that.imgList1.concat(res.tempFilePaths);
						} else {
							that.imgList1 = res.tempFilePaths;
						}
					}
				});
			} catch (e) {}
		},
		btSub(){
			uni.navigateBack({
				
			})
		}
	}
};
</script>

<style>
.seleImg {
	border: 1upx solid #808080;
	border-radius: 10upx;
	position: relative;
}
.seleDel {
	position: absolute;
	right: -10upx;
	top: -10upx;
}
.seleAdd {
	width: 150upx;
	height: 150upx;
	border: 1upx solid #808080;
	text-align: center;
	line-height: 150upx;
	border-radius: 10upx;
}
</style>
