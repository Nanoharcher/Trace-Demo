// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'jquery'
import 'element-ui/lib/theme-chalk/index.css'
import MagnificPopup from 'magnific-popup'
import axios from 'axios'
import Qs from 'qs'

Vue.use(ElementUI)
Vue.use(MagnificPopup)
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.qs = Qs

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
    next()
  }
})
