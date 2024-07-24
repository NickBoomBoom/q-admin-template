import './plugins'
import 'virtual:uno.css'
import './assets/scss/index.scss'
import { createApp } from 'vue'
import { Pinia } from './stores'
import App from './App.vue'
import router from './router'
const app = createApp(App)
app.use(router)
app.use(Pinia)

async function setup() {
  // 在网站完全加载前拉取数据
}

setup().then(() => {
  app.mount('#app')
})
