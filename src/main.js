import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import router from "@/router";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faLineChart } from "@fortawesome/free-solid-svg-icons";
import { faMicrochip } from "@fortawesome/free-solid-svg-icons";
import { faHardDrive } from "@fortawesome/free-solid-svg-icons";
import { faComputer } from "@fortawesome/free-solid-svg-icons";
import { faUserLarge } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faLineChart)
library.add(faMicrochip)
library.add(faHardDrive)
library.add(faComputer)
library.add(faUserLarge)

createApp(App)
    .use(router)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
