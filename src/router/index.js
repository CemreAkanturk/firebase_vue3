import { createRouter, createWebHashHistory } from "vue-router";
import store from "../store";

const routes = [
  {
    name: "HomePage",
    path: "/",
    component: () => import("../views/Home"),
  },
  {
    name: "LoginPage",
    path: "/login",
    component: () => import("../views/Login"),
  },
  {
    name: "RegisterPage",
    path: "/register",
    component: () => import("../views/Register"),
  },
  {
    name: "NewBookMarkPage",
    path: "/new",
    component: () => import("../views/NewBookMark"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

router.beforeEach((to, _, next) => {
  const authRequiredRoutes = ["HomePage", "NewBookMarkPage"];
  const authNotRequiredRoutes = ["LoginPage", "RegisterPage"];

  if (authNotRequiredRoutes.indexOf(to.name) > -1) {
    if (store.getters._isAuthenticated) next(false);
  }

  if (authRequiredRoutes.indexOf(to.name) > -1) {
    if (store.getters._isAuthenticated) next();
    else next({ name: "LoginPage" });
  } else {
    next();
  }
});
export default router;
