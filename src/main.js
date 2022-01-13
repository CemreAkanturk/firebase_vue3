import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/style.css";
import appHeader from "@/components/Shared/appHeader";
import appBookMarkList from "@/components/Shared/appBookMarkList";
import { appAxios } from "@/utils/appAxios";
import Store from "./store";


import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyDAd41KlD6tOvGuN9hXH0YhzgBKrNnC0NY",
    authDomain: "stoktakip-60df2.firebaseapp.com",
    projectId: "stoktakip-60df2",
    storageBucket: "stoktakip-60df2.appspot.com",
    messagingSenderId: "777782371484",
    appId: "1:777782371484:web:8ffc8503a5cbb7f583f959",
    measurementId: "G-X388E16C2V"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

const app = createApp(App);

app.component("appHeader", appHeader);
app.component("appBookMarkList", appBookMarkList);

app.use(router);
app.use(Store)

app.config.globalProperties.$appAxios = appAxios;

app.mount("#app");