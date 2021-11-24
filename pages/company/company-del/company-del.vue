<template>
	<view class="bg-white">
		<u-navbar title="单位信息"></u-navbar>
		<state-layout :state="stateLayout" @errorLoad="errLoad">
			<view slot="state">
				<view style="padding: 20upx; padding-bottom: 0upx;">
					<u-row class="u-m-t-10" align="top">
						<u-col span="2">
							<!-- :style="[{ backgroundColor: randomColor() }]" -->
							<u-row style="border-radius: 10upx; width: 100upx; height: 100upx; background-color: #2A96F0;">
								<u-col text-align="center" span="12" class="u-font-32 text-white u-p-t-5">{{ getTitle(0, 2, dataInfo.UNITNAME) }}</u-col>
								<u-col text-align="center" span="12" class="u-font-32 text-white u-p-tb-5">{{ getTitle(2, 4, dataInfo.UNITNAME) }}</u-col>
							</u-row>
						</u-col>
						<u-col span="10">
							<view class="u-font-35 text-black text-bold">{{ dataInfo.UNITNAME }}</view>
							<view class="u-font-30 colorF7 u-m-t-10">{{dataInfo.JTEXT}}</view>
						</u-col>
					</u-row>
					<u-row align="center" class="u-m-t-20">
						<u-col text-align="center" span="4">
							<view class="u-font-30 colorB6">法定代表人</view>
							<view class="u-font-30 text-main u-m-t-10">{{dataInfo.LR}}</view>
						</u-col>
						<u-col text-align="center" span="4">
							<view class="u-font-30 colorB6">注册资本</view>
							<view class="u-font-30 text-black u-m-t-10">{{ dataInfo.REGCAP }}万元</view>
						</u-col>
						<u-col text-align="center" span="4">
							<view class="u-font-30 colorB6">成立时间</view>
							<view class="u-font-30 text-black u-m-t-10">{{ dataInfo.SETIME }}</view>
						</u-col>
					</u-row>
					<view class="u-m-t-15 u-p-10 u-m-b-10" style="background-color: #fdeae9;">
						<text class="colorF7 u-font-30 u-p-l-5">统一信用代码:</text>
						<text class="u-font-30 u-p-l-10" style="color: #383838;">{{ dataInfo.ENRID }}</text>
					</view>
					<view class="u-m-t-30">
						<u-row>
							<u-col span="4"><view class="colorB6 u-font-32">所&ensp;在&ensp;地</view></u-col>
							<u-col span="8">
								<view class=" u-font-32  text-black text-bold">{{ dataInfo.ADDRESS }}</view>
							</u-col>
						</u-row>
						<u-row class="u-m-t-15">
							<u-col span="4"><view class="colorB6 u-font-32">发证机关</view></u-col>
							<u-col span="8">
								<view class="text-black u-font-32 text-black text-bold">{{ dataInfo.ENRJG }}</view>
							</u-col>
						</u-row>
						<u-row class="u-m-t-15">
							<u-col span="12"><view class="colorB6 u-font-32">注册地址</view></u-col>
							<u-col span="12 u-m-t-15">
								<view class="text-black u-font-32 text-black text-bold" style="line-height: 50upx;">{{ dataInfo.REGADD }}</view>
							</u-col>
						</u-row>
						<u-row class="u-m-t-15" align="top">
							<u-col span="12"><view class="colorB6 u-font-32">经营范围</view></u-col>
							<u-col span="12 u-m-t-15">
								<view class="text-black u-font-32 text-black" style="line-height: 50upx;">{{ dataInfo.MANRAG }}</view>
							</u-col>
						</u-row>
					</view>
				</view>
				<view style="height: 220upx;"></view>
				<view style="position: fixed; bottom: 0upx; width: 100%; background-color: #FFFFFF;">
					<view style="height: 1upx; background-color: #e4e7ed;"></view>
					<u-grid :border="false" col="5" class="u-p-lr-20">
						<u-grid-item @click="openZz">
							<image style="width: 80upx;" src="../../../static/img/ic_zzxxico.png" mode="widthFix"></image>
							<view class="u-font-28 u-m-t-10">资质信息</view>
						</u-grid-item>
						<u-grid-item @click="openRy">
							<image style="width: 80upx;" src="../../../static/img/ic_ryxxico.png" mode="widthFix"></image>
							<view class="u-font-28 u-m-t-10">人员信息</view>
						</u-grid-item>
						<u-grid-item @click="openYj">
							<image style="width: 80upx;" src="../../../static/img/ic_yjxxico.png" mode="widthFix"></image>
							<view class="u-font-28 u-m-t-10">业绩信息</view>
						</u-grid-item>
						<u-grid-item @click="openPj">
							<image style="width: 80upx;" src="../../../static/img/ic_pjjlico.png" mode="widthFix"></image>
							<view class="u-font-28 u-m-t-10">评价记录</view>
						</u-grid-item>
						<u-grid-item @click="openLh">
							<image style="width: 80upx;" src="../../../static/img/ic_lhjlico.png" mode="widthFix"></image>
							<view class="u-font-28 u-m-t-10">良好记录</view>
						</u-grid-item>
					</u-grid>
				</view>
			</view>
		</state-layout>
	</view>
</template>

<script>
export default {
	data() {
		return {
			stateLayout: '',
			unitId: '',
			dataInfo: {
				UNITNAME: '',
				ADDRESS: '',
				REGCAP: 0,
				SETIME: '',
				ENRID: '',
				ENRJG: '',
				REGADD: '',
				MANRAG: ''
			}
		};
	},
	onLoad(e) {
		this.unitId = e.unitId;
		this.getData();
	},
	methods: {
		errLoad() {
			this.getData();
		},
		randomColor() {
			return 'rgb(' + Math.floor(Math.random() * 130 + 110) + ',' + Math.floor(Math.random() * 130 + 110) + ',' + Math.floor(Math.random() * 130 + 110) + ')';
		},
		openZz() {
			uni.navigateTo({
				url: 'zzList/zzList?unitId=' + this.unitId
			});
		},
		openRy() {
			uni.navigateTo({
				url: 'ryList/ryList?unitId=' + this.unitId
			});
		},
		openYj() {
			uni.navigateTo({
				url: 'yjList/yjList?unitId=' + this.unitId
			});
		},
		openPj() {
			uni.navigateTo({
				url: 'pjList/pjList?unitId=' + this.unitId
			});
		},
		openLh() {
			uni.navigateTo({
				url: 'lhList/lhList?unitId=' + this.unitId
			});
		},
		getData() {
			var that = this;
			var map = {
				ID: that.unitId
			};
			that.stateLayout = 'load';
			that.$api
				.getBase(map)
				.then(data => {
					if (data && data.data && data.data.code == 1) {
						that.dataInfo = data.data.data;
						that.stateLayout = '';
					} else {
						that.stateLayout = 'error';
					}
				})
				.catch(e => {
					that.stateLayout = 'error';
				});
		},
		getTitle(be, en, name) {
			return name.substring(be, en);
		}
	}
};
</script>

<style>
.colorB6 {
	color: #b6b4b5;
}
.colorF7 {
	color: #f75225;
}
page {
	background-color: #f5f4f4;
}
</style>
