import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/lara-dark-teal/theme.css'
import 'primeicons/primeicons.css';
import Button from 'primevue/button'
import Sidebar from 'primevue/sidebar'
import Avatar from 'primevue/avatar'

const app = createApp(App)
app
    .use(router)
    .use(PrimeVue)
    .mount('#app')

app.component('Button', Button)
app.component('Sidebar', Sidebar)
app.component('Avatar', Avatar)
