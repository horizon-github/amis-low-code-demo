import { createApp } from 'vue'

// 重置css
import 'normalize.css/normalize.css' 

// ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElIcons from '@element-plus/icons-vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

// AMIS
import 'amis/lib/themes/default.css';
import 'amis/lib/helper.css';
import "amis/sdk/iconfont.css";

// 全局css
import '@/styles/index.scss'

import App from './App.vue'
import router from './router'
import store from './store'

// 全局拦截
import "@/permission"

const app = createApp(App)
for (const name in ElIcons){
	app.component(name, ElIcons[name])
}

app.use(ElementPlus, {locale: zhCn}).use(store).use(router).mount('#app')
