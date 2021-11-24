<template>
	<view>
		<u-navbar title="我的在线简历"></u-navbar>
		<view class="u-padding-20">
			<view style="padding-bottom: 120upx;">
				<u-row class="u-p-tb-30">
					<u-col span="8">
						<view>
							<view @click="openUserIn">
								<text class="text-black u-font-40 text-bold">张晓倩</text>
								<u-icon name="edit-pen" class="text-black u-font-35 u-m-l-10"></u-icon>
							</view>
							<view class="u-m-t-15"><text class="text-8a8a8a">5年工作经验 · 25岁 · 本科</text></view>
						</view>
					</u-col>
					<u-col span="4">
						<view class="text-right"><u-avatar size="120" :src="headSrc" mode="circle" :showSex="true" sex-icon="man"></u-avatar></view>
					</u-col>
				</u-row>
				<u-line color="#eeeeee"></u-line>
				<view class="u-p-tb-30">
					<u-row>
						<u-col span="6">
							<view class="text-left"><text class="text-black u-font-35 text-bold">个人优势</text></view>
						</u-col>
						<u-col span="6">
							<view class="text-right"><u-icon name="edit-pen" class="text-black u-font-35 u-m-l-10"></u-icon></view>
						</u-col>
					</u-row>
					<view class="u-m-t-20">
						<text class="u-p-lr-10 text-8a8a8a u-font-30 u-line-2">
							能够独立承担工程现场安全监督检查工作、处理现场安全突发事件；在施工中要注意检查、督促和技术交底，不搞
						</text>
					</view>
				</view>
				<u-line color="#eeeeee"></u-line>
				<view class="u-p-tb-30">
					<u-row>
						<u-col span="6">
							<view class="text-left"><text class="text-black u-font-35 text-bold">求职期望</text></view>
						</u-col>
						<u-col span="6">
							<view class="text-right"><u-icon name="plus-circle" class="text-black u-font-35 u-m-l-10"></u-icon></view>
						</u-col>
					</u-row>
					<view class="u-m-t-20">
						<u-cell-group :border="false" class="u-p-0">
							<u-cell-item class="u-p-tb-20" :border-bottom="false" v-for="index in 2" :key="index">
								<view slot="label" class="u-p-lr-10">
									<view>
										<text class="text-black u-font-30 text-bold">水利施工安全员</text>
										<text class="text-black u-m-l-20 u-font-30 text-bold">12-15K</text>
									</view>
									<view class="text-8a8a8a u-font-28 u-m-t-10">北京</view>
								</view>
							</u-cell-item>
						</u-cell-group>
					</view>
				</view>
				<u-line color="#eeeeee"></u-line>
				<view class="u-p-tb-30">
					<u-row>
						<u-col span="6">
							<view class="text-left"><text class="text-black u-font-35 text-bold">工作经历</text></view>
						</u-col>
						<u-col span="6">
							<view class="text-right"><u-icon name="plus-circle" class="text-black u-font-35 u-m-l-10"></u-icon></view>
						</u-col>
					</u-row>
					<view class="u-m-t-20">
						<u-cell-group :border="false">
							<u-cell-item
								:title-style="pomTiStyle"
								:arrow="false"
								title="北京恒华伟业科技股份有限公司"
								class="u-p-tb-20"
								:border-bottom="false"
								v-for="index in 2"
								:key="index"
							>
								<view slot="label">
									<view class="u-m-t-10 text-black u-font-30" style="font-weight: normal;">2016.05.16 - 2020.05.03</view>
									<view class="text-8a8a8a u-font-28 u-m-t-10 " style="font-weight: normal;">水利施工安全员</view>
									<view class="text-8a8a8a u-font-28 u-m-t-10 u-line-1" style="font-weight: normal;">
										1、负责公司项目方案的售前业务支持，配合市场部门挖掘和把握客户需求，协助市场人员与客户沟通，引导客户需求并提...
									</view>
								</view>
							</u-cell-item>
						</u-cell-group>
					</view>
				</view>
				<u-line color="#eeeeee"></u-line>
				<view class="u-p-tb-30">
					<u-row>
						<u-col span="6">
							<view class="text-left"><text class="text-black u-font-35 text-bold">项目经历</text></view>
						</u-col>
						<u-col span="6">
							<view class="text-right"><u-icon name="plus-circle" class="text-black u-font-35 u-m-l-10"></u-icon></view>
						</u-col>
					</u-row>
					<view class="u-m-t-20">
						<u-cell-group :border="false">
							<u-cell-item :title-style="pomTiStyle" :arrow="false" title="某某水利工程项目" class="u-p-tb-20" :border-bottom="false" v-for="index in 2" :key="index">
								<view slot="label">
									<view class="u-m-t-10 text-black u-font-30" style="font-weight: normal;">2016.05.16 - 2020.05.03</view>
									<view class="text-8a8a8a u-font-28 u-m-t-10 " style="font-weight: normal;">水利施工安全员</view>
									<view class="text-8a8a8a u-font-28 u-m-t-10 u-line-1" style="font-weight: normal;">
										项目描述：负责公司项目方案的售前业务支持，配合市场部门 挖掘和把握客户需求，协助市场人员与客户沟通，引导客户...
									</view>
								</view>
							</u-cell-item>
						</u-cell-group>
					</view>
				</view>
				<u-line color="#eeeeee"></u-line>
				<view class="u-p-tb-30">
					<u-row>
						<u-col span="6">
							<view class="text-left"><text class="text-black u-font-35 text-bold">教育经历</text></view>
						</u-col>
						<u-col span="6">
							<view class="text-right"><u-icon name="plus-circle" class="text-black u-font-35 u-m-l-10"></u-icon></view>
						</u-col>
					</u-row>
					<view class="u-m-t-20">
						<u-cell-group :border="false">
							<u-cell-item class="u-p-tb-20" :border-bottom="false" v-for="index in 2" :key="index">
								<view slot="label" class="u-p-lr-10">
									<view>
										<u-row>
											<u-col span="6" class="u-p-lr-0">
												<view class="text-left"><text class="text-black u-font-30 text-bold">湖北工业大学</text></view>
											</u-col>
											<u-col span="6">
												<view class="text-right"><text class="text-8a8a8a u-m-l-20 u-font-28">2013 - 2016</text></view>
											</u-col>
										</u-row>
									</view>
									<view class="u-m-t-10">
										<text class="text-8a8a8a u-font-28 u-m-r-10 ">本科</text>
										<text class="text-8a8a8a u-font-28 u-m-r-10 ">工程设计</text>
									</view>
								</view>
							</u-cell-item>
						</u-cell-group>
					</view>
				</view>
			</view>
		</view>
		<view style="position: fixed; bottom: 0upx;  z-index: 9999; left: 0upx; width: 100%; height: 120upx; border-top: 1upx solid #eeeeee;" class="u-padding-20 bg-white">
			<u-button style="background-color: #2A96F0; color: #FFFFFF;">发布</u-button>
			</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			headSrc: '../../../static/img/ic_user-ico.png',
			pomTiStyle: {
				'font-size': '30upx',
				color: '#333333',
				'font-weight': 'bold',
				'padding-left': '10upx',
				'padding-right': '10upx'
			}
		};
	},
	methods: {
		openUserIn(){
			uni.navigateTo({
				url:'../user-information/user-information'
			})
		}
	}
};
</script>

<style></style>
