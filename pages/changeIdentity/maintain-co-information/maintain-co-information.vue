<template>
	<view>
		<u-navbar title="公司信息"></u-navbar>
		<view class="u-p-30">
			<u-cell-group :border="false">
				<u-cell-item :arrow="false" class="nolrpadding">
					<view slot="title" class="u-font-28 text-black">公司全称</view>
					<view slot="label"><u-input :custom-style="labelStyle1" placeholder="请填写公司全称"></u-input></view>
				</u-cell-item>
				<u-cell-item :arrow="false" class="nolrpadding">
					<view slot="title" class="u-font-28 text-black">公司简称</view>
					<view slot="label"><u-input :custom-style="labelStyle1" placeholder="请填写公司简称"></u-input></view>
				</u-cell-item>
				<u-cell-item :arrow="false" class="nolrpadding">
					<view slot="title" class="u-font-28 text-black">社会统一信用代码</view>
					<view slot="label"><u-input :custom-style="labelStyle1" placeholder="社会统一信用代码"></u-input></view>
				</u-cell-item>
				<u-cell-item
					class="nolrpadding"
					@click="rzState = true"
					title="融资阶段"
					:label="rzList[rzDef].label"
					:title-style="titleStyle"
					:label-style="labelStyle"
				></u-cell-item>
				<u-cell-item
					class="nolrpadding"
					@click="ryState = true"
					title="人员规模"
					:label="ryList[ryDef].label"
					:title-style="titleStyle"
					:label-style="labelStyle"
				></u-cell-item>

				<u-cell-item :arrow="false" class="nolrpadding">
					<view slot="title" class="u-font-28 text-black">公司Logo</view>
					<view slot="label">
						<u-grid col="4" :border="false">
							<u-grid-item
								:custom-style="gridItemStyle"
								class="bg-img"
								v-for="(item, index) in imgList1"
								:key="index"
								@tap="viewImage(index)"
								:data-url="imgList1[index]"
							>
								<view class="text-center seleImg">
									<u-image width="150upx" border-radius="10" height="150upx" :src="imgList1[index]" mode="aspectFill"></u-image>
									<view class="seleDel" @tap.stop="DelImg" :data-index="index"><u-icon name="close-circle-fill" color="#808080" size="40"></u-icon></view>
								</view>
							</u-grid-item>
							<u-grid-item :custom-style="gridItemStyle">
								<view @tap="ChooseImage" v-if="imgList1.length < 1" class="seleAdd"><u-icon name="camera" size="50"></u-icon></view>
							</u-grid-item>
						</u-grid>
					</view>
				</u-cell-item>

				<u-cell-item :arrow="false" class="nolrpadding">
					<view slot="title" class="u-font-28 text-black">公司相册</view>
					<view slot="label">
						<u-grid col="4" :border="false">
							<u-grid-item
								:custom-style="gridItemStyle"
								class="bg-img"
								v-for="(item, index) in imgList"
								:key="index"
								@tap="viewImage1(index)"
								:data-url="imgList[index]"
							>
								<view class="text-center seleImg">
									<u-image width="150upx" border-radius="10" height="100upx" :src="imgList[index]" mode="aspectFill"></u-image>
									<view class="seleDel" @tap.stop="DelImg1" :data-index="index"><u-icon name="close-circle-fill" color="#808080" size="40"></u-icon></view>
								</view>
							</u-grid-item>
							<u-grid-item :custom-style="gridItemStyle">
								<view @tap="ChooseImage1" v-if="imgList.length < 20" class="seleAdd1"><u-icon name="camera" size="50"></u-icon></view>
							</u-grid-item>
						</u-grid>
					</view>
				</u-cell-item>
				<u-cell-item :arrow="false" class="nolrpadding">
					<view slot="title" class="u-font-28 text-black">公司介绍</view>
					<view slot="label"><u-input type="textarea" :border="true" :custom-style="labelStyle1" placeholder="请填写公司介绍"></u-input></view>
				</u-cell-item>
				<u-cell-item :arrow="false" class="nolrpadding">
					<view slot="title" class="u-font-28 text-black">公司地址</view>
					<view slot="label"><u-input :custom-style="labelStyle1" placeholder="请填写公司地址"></u-input></view>
				</u-cell-item>
				<u-cell-item :arrow="false" class="nolrpadding">
					<view slot="title" class="u-font-28 text-black">法定代表人</view>
					<view slot="label"><u-input :custom-style="labelStyle1" placeholder="请填写法定代表人"></u-input></view>
				</u-cell-item>
				<u-cell-item :arrow="false" class="nolrpadding">
					<view slot="title" class="u-font-28 text-black">注册资本</view>
					<view slot="label"><u-input :custom-style="labelStyle1" placeholder="请填写注册资本"></u-input></view>
				</u-cell-item>
				<u-cell-item class="nolrpadding">
					<view slot="title" class="u-font-28 text-black">注册时间</view>
					<view slot="label">
						<view @click="zcshow = true" class="u-font-32 text-black u-p-tb-15">{{ zcDef }}</view>
					</view>
				</u-cell-item>
				<u-cell-item :arrow="false" class="nolrpadding">
					<view slot="title" class="u-font-28 text-black">工作时间</view>
					<view slot="label"><u-input :custom-style="labelStyle1" placeholder="上午09:00-下午06:00"></u-input></view>
				</u-cell-item>
				<u-cell-item :arrow="false" class="nolrpadding">
					<view slot="title" class="u-font-28 text-black">休息时间</view>
					<view slot="label"><u-input :custom-style="labelStyle1" placeholder="双休"></u-input></view>
				</u-cell-item>
				<u-cell-item :arrow="false" class="nolrpadding">
					<view slot="title" class="u-font-28 text-black">加班情况</view>
					<view slot="label"><u-input :custom-style="labelStyle1" placeholder="偶尔加班"></u-input></view>
				</u-cell-item>
				<u-cell-item :arrow="false" hover-class="none" class="nolrpadding">
					<view slot="title" class="u-font-28 text-black">公司待遇</view>
					<view slot="label">
						<u-grid col="3" :border="false" hover-class="none">
							<u-grid-item :custom-style="gridCust" v-for="(item, index) in tags" :key="index">
								<view class="tags" @click="deTags(index)">
									{{ item.name }}
									<u-icon size="20" class="u-m-l-10" name="close"></u-icon>
								</view>
							</u-grid-item>

							<u-grid-item :custom-style="gridCust">
								<view class="tagsAdd" @click="tagsShow = true">
									添加标签
									<u-icon size="20" class="u-m-l-10" name="plus"></u-icon>
								</view>
							</u-grid-item>
						</u-grid>
					</view>
				</u-cell-item>
			</u-cell-group>
		</view>
		<view class="u-padding-30"><u-button  @click="finshSub" style="background-color: #2A96F0; color: #FFFFFF; font-size: 30upx;">完成</u-button></view>
		<u-select v-model="rzState" :default-value="[rzDef]" @confirm="rzConfirm" :list="rzList"></u-select>
		<u-select v-model="ryState" :default-value="[ryDef]" @confirm="ryConfirm" :list="ryList"></u-select>
		<u-picker v-model="zcshow" mode="time" @confirm="zcConfirm" :default-time="zcDef" :params="params"></u-picker>

		<u-modal v-model="tagsShow" title="福利" @confirm="addTags">
			<view class="slot-content">
				<view class="u-padding-20"><u-input maxlength="5" v-model="inputTags" :border="true" :focus="true" placeholder="请输入内容"></u-input></view>
			</view>
		</u-modal>
	</view>
</template>

<script>
export default {
	data() {
		return {
			labelStyle1: {
				'font-size': '32upx'
			},
			titleStyle: {
				color: '#808080',
				'font-size': '28upx'
			},
			labelStyle: {
				color: '#333333',
				'font-size': '32upx',
				'padding-top': '20upx',
				'padding-bottom': '15upx'
			},
			rzState: false,
			rzDef: 0,
			rzList: [
				{
					value: 0,
					label: '未融资'
				},
				{
					value: 1,
					label: '天使轮'
				},
				{
					value: 2,
					label: 'A轮'
				},
				{
					value: 3,
					label: 'B轮'
				}
			],
			ryState: false,
			ryDef: 0,
			ryList: [
				{
					value: 0,
					label: '0-20人'
				},
				{
					value: 1,
					label: '20-99人'
				},
				{
					value: 2,
					label: '100-499人'
				},
				{
					value: 3,
					label: '500-999人'
				}
			],
			gridItemStyle: {
				padding: '10rpx 0'
			},
			imgList1: [],
			index: 0,
			imgList: [],
			index1: 0,
			zcshow: false,
			params: {
				year: true,
				month: true,
				day: true
			},
			zcDef: '2020-12-12',
			tags: [
				{
					name: '五险一金'
				}
			],
			gridCust: {
				padding: '10rpx 0'
			},
			tagsShow: false,
			inputTags: ''
		};
	},
	methods: {
		rzConfirm(e) {
			this.rzDef = e[0].value;
		},
		ryConfirm(e) {
			this.ryDef = e[0].value;
		},
		viewImage(index) {
			uni.previewImage({
				urls: this.imgList1,
				current: index
			});
		},
		viewImage1(index) {
			uni.previewImage({
				urls: this.imgList,
				current: index
			});
		},
		DelImg1(e) {
			var that = this;
			uni.showModal({
				title: '删除图片',
				content: '确定要删除图片吗？',
				cancelText: '取消',
				confirmText: '确认',
				success: res => {
					if (res.confirm) {
						that.imgList.splice(e.currentTarget.dataset.index, 1);
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
		ChooseImage1() {
			var that = this;
			try {
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
					success: res => {
						if (that.imgList.length != 0) {
							that.imgList = that.imgList.concat(res.tempFilePaths);
						} else {
							that.imgList = res.tempFilePaths;
						}
					}
				});
			} catch (e) {}
		},
		zcConfirm(e) {
			this.zcDef = e.year + '-' + e.month + '-' + e.day;
		},
		addTags(e) {
			this.tags.push({ name: this.inputTags });
			this.inputTags = '';
		},
		deTags(index){
			this.tags.splice(index,1);
		},
		finshSub(){
			uni.navigateBack({
				delta:2
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
	line-height: 160upx;
	border-radius: 10upx;
}

.seleAdd1 {
	width: 150upx;
	height: 100upx;
	border: 1upx solid #808080;
	text-align: center;
	line-height: 110upx;
	border-radius: 10upx;
}
.nolrpadding {
	padding-left: 0upx !important;
	padding-right: 0upx !important;
}

.tags {
	font-size: 30upx;
	border: 1upx solid #007aff;
	padding: 10upx 20upx;
	border-radius: 5upx;
	color: #007aff;
}

.tagsAdd {
	font-size: 30upx;
	padding: 10upx 20upx;
	border-radius: 5upx;
	background-color: #dbf1e1;
	color: #19be6b;
	border: 1px solid #71d5a1;
}
</style>
