import './assets/main.css'; // CSS tùy chỉnh của ứng dụng

// Bootstrap CSS và JS
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// FontAwesome (Import tối ưu)
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// Thêm các icon cần dùng vào thư viện
library.add(faUser, faSignOutAlt);

import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon); // Đăng ký component FontAwesome
app.use(createPinia());
app.use(router);
app.mount("#app");