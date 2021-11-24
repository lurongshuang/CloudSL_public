<template>
	<view>
		<u-navbar title="行业数据"></u-navbar>
		<state-layout :state="stateLayout">
			<view slot="state" class="u-m-tb-20">
				<view class="u-padding-20 u-flex">
					<u-image width="40upx" height="40upx" mode="widthFix" src="../../static/img/ic_info_count.png"></u-image>
					<text class="text-bold text-black u-m-l-10 u-font-32">信息统计</text>
				</view>
				<view style="height:  700rpx; position: relative;" class="u-m-t-10">
					<l-f2 ref="chart"></l-f2>
					<view style="position: absolute;top: 50%; left: 50%; transform: translate3d(-50%, -50%, 0);text-align:center">
						<view style="font-size: 12px;color: #999;margin: 0">共收录</view>
						<view style="font-size: 15px;color: #343434;margin: 0;font-weight: bold;">{{ tNum }}</view>
						<view style="font-size: 12px;color: #999;margin: 0;font-weight: bold;">条信用记录</view>
					</view>
				</view>
				<view class="text-8a8a8a u-font-28 u-padding-20">备注：信用数据来源于企业自主申报</view>
				<view class="u-padding-20 u-flex">
					<u-image width="40upx" height="40upx" mode="widthFix" src="../../static/img/ic_shujufenxi.png"></u-image>
					<text class="text-bold text-black u-m-l-10 u-font-32">数据分析（平台信用信息各省数量）</text>
				</view>
				<view style="height:  1300rpx;"><l-f2 ref="chart2"></l-f2></view>
				<view class="u-padding-20 u-flex">
					<!-- <u-image width="40upx" height="40upx" mode="widthFix" src="../../static/img/ic_shujufenxi.png"></u-image>
					<text class="text-bold text-black u-m-l-10 u-font-32">历年评价数据情况</text> -->
				</view>
			</view>
		</state-layout>
	</view>
</template>

<script>
import F2 from '@/uni_modules/lime-f2/components/lime-f2/f2-all.min.js';
import lF2 from '@/uni_modules/lime-f2/components/lime-f2/';
export default {
	components: { lF2 },
	data() {
		return {
			stateLayout: '',
			tNum: '0',
			dataRy: [
				{
					const: 'const',
					com: '条',
					type: '不良行为',
					money: 20
				},
				{
					const: 'const',
					com: '人',
					type: '从业人员',
					money: 20
				},
				{
					const: 'const',
					com: '家',
					type: '从业单位',
					money: 20
				},
				{
					const: 'const',
					com: '条',
					type: '工程业绩',
					money: 20
				},
				{
					const: 'const',
					com: '条',
					type: '良好行为',
					money: 20
				}
			],
			dataList: []
		};
	},
	onLoad() {
		var that = this;
		that.stateLayout = 'load';
		that.getData();
		that.getListData();
	},
	methods: {
		getData() {
			var that = this;
			var map = {};
			that.$api
				.getStatis(map)
				.then(data => {
					if (data && data.data && data.data.code == 1) {
						that.tNum = data.data.data.TNUM;
						that.dataRy[0].money = data.data.data.NUM5;
						that.dataRy[1].money = data.data.data.NUM2;
						that.dataRy[2].money = data.data.data.NUM1;
						that.dataRy[3].money = data.data.data.NUM3;
						that.dataRy[4].money = data.data.data.NUM4;
						that.stateLayout = '';
						setTimeout(function() {
							that.initMg();
							that.initList();
						}, 500);
					}
				})
				.catch(e => {});
		},
		initMg() {
			this.$refs.chart.init(config => {
				const chart = new F2.Chart(config);
				chart.source(this.dataRy);
				chart.coord('polar', {
					transposed: true,
					radius: 0.9,
					innerRadius: 0.5
				});
				chart.axis(false);
				chart.legend(false);
				chart.tooltip(false);
				chart
					.interval()
					.position('const*money')
					.adjust('stack')
					.color('type', ['#f81d22', '#1890FF', '#13C2C2', '#F05096', '#2FC25B']);

				chart.pieLabel({
					sidePadding: 30,
					activeShape: true,
					label1: function label1(data) {
						return {
							text: data.money + data.com,
							fill: '#343434',
							fontWeight: 'bold'
						};
					},
					label2: function label2(data) {
						return {
							text: data.type,
							fill: '#999'
						};
					},
					onClick: ev => {
						const data = ev.data;
						if (data) {
							this.type = data.type;
							this.money = data.money;
						}
					}
				});
				chart.render();
				return chart;
			});
		},
		getListData() {
			var that = this;
			var map = {};
			that.$api
				.getStatisPname(map)
				.then(data => {
					if (data && data.data && data.data.code == 1) {
						that.dataList = [];
						var nameList = [];
						for (var i = 0; i < data.data.data.length; i++) {
							that.dataList.push({
								year: data.data.data[i].PNAME + '(' + data.data.data[i].TNUM + ')',
								sales: data.data.data[i].TNUM
							});
							nameList.push(data.data.data[i].TNUM)
						}
						nameList.reverse();
						that.dataList.reverse();
					}
				})
				.catch(e => {});
		},
		initList() {
			var that = this;
			this.$refs.chart2.init(config => {
				const chart = new F2.Chart(config);
				chart.source(this.dataList, {
					sales: {
						tickCount: 6
					}
				});
				chart.coord({
					transposed: true
				});
				chart.tooltip({
					showItemMarker: false,
					onShow: function onShow(ev) {
						const items = ev.items;
						items[0].name = null;
						items[0].name = items[0].title;
						items[0].value = '';
					}
				});
				// chart.tooltip({
				// 	custom: true,
				// 	showCrosshairs: false,
				// 	onChange: function onChange(ev) {
				// 		that.$utils.showToast(ev.items[0].title + ':' + ev.items[0].value);
				// 	}
				// });
				chart.interval().position('year*sales');
				chart.render();
				return chart;
			});
		}
	}
};
</script>

<style></style>
