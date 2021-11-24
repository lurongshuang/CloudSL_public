<template>
	<view>
		<u-navbar title="我的求职"></u-navbar>
		<view>
			<view class="u-m-tb-20">
				<view class="u-padding-20">
					<u-row>
						<u-col span="10" style="padding: 0upx;"><view class="text-black u-font-40 text-bold">想找什么工作？</view></u-col>
						<u-col span="2">
							<view class="text-right">
								<text class="u-font-28 text-main u-font-32 text-bold">2</text>
								<text class="u-font-28 text-black u-font-32 text-bold">/3</text>
							</view>
						</u-col>
					</u-row>
					<view class="text-8a8a8a u-font-28 u-m-t-20">添加多个求职期望，可获得更多精准高薪工作机会</view>
				</view>
			</view>
			<u-cell-group>
				<u-cell-item v-for="index in 2" :key="index">
					<view slot="label">
						<view class="u-font-32 text-black text-bold">水利施工安全员</view>
						<view class="u-font-28 u-p-t-20">
							<text>[北京 昌平]</text>
							<text class="u-m-l-20 colorF82E06">12-15K</text>
						</view>
					</view>
				</u-cell-item>
			</u-cell-group>
			<view class="u-m-t-50 u-padding-30" @click="addExpect">
				<view class="text-center u-padding-30" style="border: 1upx dashed  #007AFF;">
					<u-icon name="plus-circle" class="text-main" size="35"></u-icon>
					<text class="u-m-l-10 u-font-32 text-main">添加求职期望</text>
				</view>
			</view>

			<u-cell-group class="u-m-t-40">
				<u-cell-item>
					<view slot="label">
						<u-row>
							<u-col span="6"><view class="u-font-32 text-black text-bold">求职状态</view></u-col>
							<u-col span="6">
								<view class="u-font-32 text-8080 text-right" @click="showState = true">
									<u-picker mode="selector" @confirm="confirm" v-model="showState" :default-selector="[selectIndex]" :range="selector"></u-picker>
									{{ selector[selectIndex] }}
								</view>
							</u-col>
						</u-row>
					</view>
				</u-cell-item>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			showState: false,
			selector: ['离职-随时到岗', '在职-月内到岗', '在职-考虑机会', '在职-暂不考虑'],
			selectIndex: 0
		};
	},
	methods: {
		confirm(e) {
			this.selectIndex = e[0];
		},
		addExpect() {
			uni.navigateTo({
				url: '../add-expect/add-expect'
			});
		}
	}
};
</script>

<style>
.colorF82E06 {
	color: #f82e06;
}
</style>
