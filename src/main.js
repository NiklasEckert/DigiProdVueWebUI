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
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faPuzzlePiece } from "@fortawesome/free-solid-svg-icons";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faScissors } from "@fortawesome/free-solid-svg-icons";
import { faSkull } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faAnglesLeft } from "@fortawesome/free-solid-svg-icons";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

library.add(faLineChart)
library.add(faMicrochip)
library.add(faHardDrive)
library.add(faComputer)
library.add(faUserLarge)
library.add(faPlus)
library.add(faFloppyDisk)
library.add(faTrash)
library.add(faPuzzlePiece)
library.add(faScissors)
library.add(faSkull)
library.add(faXmark)
library.add(faAngleRight)
library.add(faAngleLeft)
library.add(faAngleDown)
library.add(faCheck)
library.add(faAnglesLeft)
library.add(faAnglesRight)
library.add(faCaretDown)

createApp(App)
    .use(router)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
