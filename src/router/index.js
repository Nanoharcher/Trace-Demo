import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import MLSearch from '@/components/MLSearch'
import RoughSort from '@/components/RoughSort'
import GRClickShow from '@/components/GRClickShow'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {path: '/', name: 'HomePage', component: HomePage, meta: {title: 'Trace平台'}},
    {path: '/mlSearch', name: 'MLSearch', component: MLSearch, meta: {title: 'Trace平台-精排日志检索'}},
    {path: '/roughsort', name: 'RoughSort', component: RoughSort, meta: {title: 'Trace平台-粗排日志检索'}},
    {path: '/grClickShow', name: 'GRClickShow', component: GRClickShow, meta: {title: 'Trace平台-下发点展日志'}}
  ]
})
