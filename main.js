import Vue from 'vue'
import App from './App'
import store from '@/store';
import uView from "uview-ui";

Vue.use(uView);
Vue.config.productionTip = false

import config from './common/config.js'
Vue.prototype.$config = config;
import api from './api/index.js'
Vue.prototype.$api = api;
import util from './utils/util.js'
Vue.prototype.$utils = util;
import pushUtils from './utils/pushUtils.js'
Vue.prototype.$pushUtils = pushUtils;


import stateLayout from './components/state-layout/state-layout.vue'
Vue.component('state-layout', stateLayout)
import uniLoadm from './components/uni-load-more/uni-load-more.vue'
Vue.component('uni-load-more', uniLoadm)

// vuex
const vuexStore = require("@/store/$u.mixin.js");
Vue.mixin(vuexStore);


import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
Vue.component('mescroll-body', MescrollBody)
Vue.component('mescroll-uni', MescrollUni)

App.mpType = 'app'
const app = new Vue({
	store,
	...App
})
app.$mount()
