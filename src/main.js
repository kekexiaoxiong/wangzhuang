import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

//引入iview
import iView from 'iview';
import 'iview/dist/styles/iview.css';

import request from '@/utils/request'
import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

//引入全局filters
import filters from './filters'

//引入全局样式
import './assets/css/common.css'

//删除提示框全局调用
import del from './utils/del'

//全局接口调用
import * as common from './api/common'


import './utils/rem';

Vue.prototype.$common = common


Vue.use(iView);
Vue.use(del);

Vue.prototype.http = request

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
});

//技巧 同时 use 多个插件 被依赖的插件应放在偏后方
filters(Vue)


/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
    const { mockXHR } = require('../mock')
    mockXHR()
}

// set ElementUI lang to EN
//Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})