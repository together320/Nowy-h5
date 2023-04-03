import Vue from 'vue'
import vueWatermark from '@/components/watermark/index'
const DEFAULT_CONFIG = {
  zIndex: 1000,
  font: '16px microsoft yahei',
  color: 'rgba(255,255,255,0.1)',
  content: sessionStorage.getItem('mine'),
  rotate: -20,
  width: 180,
  height: 120,
  repeat: true
}

Vue.config.productionTip = false
Vue.use(vueWatermark, DEFAULT_CONFIG)
