import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Lara from '@primevue/themes/lara'

import './styles.css'
import 'primeicons/primeicons.css'

import App from './App.vue'
import router from './router'
import { GoogleMap, InfoWindow, Marker, MarkerCluster } from 'vue3-google-map'
import Button from 'primevue/button'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import Menubar from 'primevue/menubar'
import Avatar from 'primevue/avatar'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Lara,
    options: {
      darkModeSelector: false || 'none',
    },
  },
})

app.component('GoogleMap', GoogleMap)
app.component('GoogleInfoWindow', InfoWindow)
app.component('GoogleMarker', Marker)
app.component('GoogleMarkerCluster', MarkerCluster)

app.component('PButton', Button)
app.component('PCard', Card)
app.component('PInputText', InputText)
app.component('PMenubar', Menubar)
app.component('PAvatar', Avatar)

app.mount('#app')
