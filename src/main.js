import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import i18n from './plugins/i18n'
import './assets/styles/main.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import '@fortawesome/fontawesome-free/css/all.min.css';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css'; 

const toastOptions = {
    timeout: 3000,
    position: "top-right",
    closeOnClick: true,
    pauseOnFocusLoss: true,
    draggable: true,
    hideProgressBar: false,
  };
const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(i18n)
app.mount('#app')
app.use(Toast, toastOptions);
app.config.warnHandler = () => {};