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
import Menubar from 'primevue/menubar'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import ConfirmationService from 'primevue/confirmationservice'
import ConfirmDialog from 'primevue/confirmdialog'
import ToastService from 'primevue/toastservice'
import Toast from 'primevue/toast'

const app = createApp(App)
app
    .use(router)
    .use(PrimeVue)
    .use(ConfirmationService)
    .use(ToastService)
    .mount('#app')

app.component('Button', Button)
app.component('Sidebar', Sidebar)
app.component('Avatar', Avatar)
app.component('MenuBar', Menubar)
app.component('InputText', InputText)
app.component('InputNumber', InputNumber)
app.component('ConfirmDialog', ConfirmDialog)
app.component('Toast', Toast)