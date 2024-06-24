// main.ts
import './assets/scss/index.scss'
import 'virtual:uno.css'
import './plugins'
import { createApp } from 'vue'
import { Pinia } from './stores'

import App from './App.vue'
import router from './router'
const app = createApp(App)

app.use(router)
app.use(Pinia)

app.mount('#app')
