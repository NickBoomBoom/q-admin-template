import "virtual:uno.css";
import "./plugins";
import "./assets/scss/index.scss";
import { createApp } from "vue";
import { Pinia } from "./plugins";
import App from "./App.vue";
import router from "./router";
import Directives from "./directives";
const app = createApp(App);
app.use(router).use(Pinia).use(Directives);

async function setup() {
  // 在网站完全加载前拉取数据
}

setup().then(() => {
  app.mount("#app");
});
