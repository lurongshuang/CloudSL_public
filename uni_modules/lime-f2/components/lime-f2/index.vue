<template>
	<view class="l-f2" :style="customStyle">
		<!-- #ifndef APP-NVUE -->
		<canvas 
			class="l-f2__canvas" 
			v-if="use2dCanvas" 
			type="2d" 
			:ref="canvasId" 
			:id="canvasId" 
			:style="'width:'+ width + 'px;height:'+ height + 'px'"
			@touchstart="touchStart" 
			@touchmove="touchMove" 
			@touchend="touchEnd" 
		/>
		<canvas
			class="l-f2__canvas"
			v-else
			:ref="canvasId"
			:width="width"
			:height="height"
			:style="'width:'+ width + 'px;height:'+ height + 'px'"
			:canvas-id="canvasId"
			:id="canvasId"
			@touchstart="touchStart"
			@touchmove="touchMove"
			@touchend="touchEnd"
		/>
		<!-- #endif -->
		<!-- #ifdef APP-NVUE -->
		<web-view
			class="l-f2__canvas"
			:id="canvasId"
			ref="webview"
			src="http://liangei.gitee.io/limeui/hybrid/html/lime-ui/lime-f2/index.html"
			@pagefinish="onFinish"
			@onPostMessage="onMessage"
		></web-view>
		<!-- #endif -->
	</view>
</template>
<script>
// #ifndef APP-NVUE
import extendContext from './canvas';
import { compareVersion, wrapEvent, pixelRatio } from './utils';
// #endif
export default {
	// version: '0.4.5.1'
	name: 'l-f2',
	props: {
		// #ifdef MP-WEIXIN
		type: {
			type: String,
			default: '2d'
		},
		// #endif
		// #ifdef APP-NVUE
		params: {
			type: Object,
			default: () => {}
		},
		// #endif
		customStyle: String,
		source: {
			type: Array,
			default: () => []
		},
		isAutoPlay: Boolean,
		onInit: {
			type: [Function, Object],
			default: () => {}
		}
	},
	data() {
		return {
			// #ifndef MP-WEIXIN || MP-QQ
			canvasId: `l-f2${this._uid}`,
			// #endif
			// #ifdef MP-WEIXIN || MP-QQ
			canvasId: `l-f2`,
			// #endif
			// #ifdef MP-WEIXIN
			use2dCanvas: true,
			// #endif
			// #ifndef MP-WEIXIN
			use2dCanvas: false,
			// #endif
			// #ifndef APP-NVUE
			width: null,
			height: null,
			config: {},
			// #endif
			// #ifdef APP-NVUE
			isFinish: false
			// #endif
		};
	},
	watch: {
		isAutoPlay(val) {
			if (val) {
				this.changeData(this.source);
			}
		},
		source: {
			handler: function(data) {
				if (this.isAutoPlay) {
					this.changeData(data);
				}
			},
			deep: true
		}
	},
	// #ifdef MP-WEIXIN
	created() {
		const { SDKVersion, version, platform, environment } = wx.getSystemInfoSync();
		this.use2dCanvas = this.type === '2d' && compareVersion(SDKVersion, '2.9.2') >= 0 && !((/ios/i.test(platform) && /7.0.20/.test(version)) || /wxwork/i.test(environment));
	},
	// #endif
	async mounted() {
		if(this.onInit) {this.init(this.onInit)}
	},
	methods: {
		// #ifdef APP-NVUE
		onFinish() {
			this.isFinish = true;
		},
		onMessage(e) {
			const res = e?.detail?.data[0] || null
			if(res?.event) {
				this.$emit(res.event, JSON.parse(res.data))
			} else {
				console.error(res)
			}
		},
		// #endif
		async init(func, params = null) {
			// #ifdef APP-NVUE
			this.$watch(
				'isFinish',
				(n, o) => {
					(n || o) && this.$refs.webview.evalJs(`init(${JSON.stringify(func.toString())}, ${JSON.stringify(params || this.params)})`);
				},
				{
					immediate: true
				}
			);
			// #endif
			// #ifndef APP-NVUE
			const config = await this.getContext();
			const chart = func(config);
			if (chart) {
				// #ifdef H5 || APP-PLUS
				chart.repaint()
				// #endif
				this.chart = chart;
				this.canvasEl = chart.get('el');
			}
			// #endif
		},
		changeData(data) {
			// #ifndef APP-NVUE
			if (this.chart) {
				this.chart.changeData(data || this.source);
			}
			// #endif
			// #ifdef APP-NVUE
			this.$refs.webview.evalJs(`changeData(${JSON.stringify(data || this.source)})`);
			// #endif
		},
		clear() {
			// #ifndef APP-NVUE
			if (this.chart) {
				this.chart.clear();
			}
			// #endif
			// #ifdef APP-NVUE
			this.$refs.webview.evalJs(`clear()`);
			// #endif
		},
		repaint() {
			this.changeData(this.source);
		},
		reset(func, params = null) {
			// #ifndef APP-NVUE
			func(this.chart);
			// #endif
			// #ifdef APP-NVUE
			this.$refs.webview.evalJs(`reset(${JSON.stringify(func.toString())}, ${JSON.stringify(params || this.params)})`);
			// #endif
		},
		// #ifndef APP-NVUE
		getContext() {
			const { use2dCanvas, type = '2d', config } = this;
			if (config.context) {
				return Promise.resolve(config);
			}
			if (use2dCanvas) {
				return new Promise(resolve => {
					uni.createSelectorQuery()
						.in(this)
						.select(`#${this.canvasId}`)
						.fields({
							node: true,
							size: true
						})
						.exec(res => {
							let { node, width, height} = res[0];
							width = (width || 300)
							height = (height || 300)
							const context = node.getContext(type);
							this.width = width
							this.height = height
							node.width = width  * pixelRatio;
							node.height = height  * pixelRatio;
							this.config = {context: extendContext(context), width, height, pixelRatio };
							resolve(this.config);
						});
				});
			}
			return new Promise(resolve => {
				uni.createSelectorQuery()
					.in(this)
					.select(`#${this.canvasId}`)
					.boundingClientRect()
					.exec(res => {
						if (res) {
							let { width, height } = res[0];
							width = (width || 300)
							height = (height || 300)
							const context = uni.createCanvasContext(this.canvasId, this);
							this.width = width
							this.height = height
							this.config = {context: extendContext(context), width, height, pixelRatio};
							resolve(this.config);
						}
					});
			});
		},
		touchStart(e) {
			if (this.canvasEl) {
				this.canvasEl.dispatchEvent('touchstart', wrapEvent(e));
			}
		},
		touchMove(e) {
			if (this.canvasEl) {
				this.canvasEl.dispatchEvent('touchmove', wrapEvent(e));
			}
		},
		touchEnd(e) {
			if (this.canvasEl) {
				this.canvasEl.dispatchEvent('touchend', wrapEvent(e));
			}
		}
		// #endif
	}
};
</script>
<style scoped lang="stylus">
full()
	// #ifndef APP-NVUE
	width 100%
	height 100%
	// #endif
	// #ifdef APP-NVUE
	flex 1
	// #endif
.l-f2
	full()
	position relative
	&__canvas
		full()
</style>
