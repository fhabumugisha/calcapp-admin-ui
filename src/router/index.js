import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Auth from "@okta/okta-vue";

Vue.use(Auth, {
  issuer: `https://${process.env.VUE_APP_OKTA_ISSUER}/oauth2/default`,
  client_id: `${process.env.VUE_APP_OKTA_CLIENT_ID}`,
  redirect_uri: "http://localhost:8080/implicit/callback",
  scopes: ["openid", "profile", "email"],
  pkce: true
});

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/implicit/callback",
    component: Auth.handleCallback()
  },
  {
    path: "/projects",
    name: "projects",
    component: () =>
      import(/* webpackChunkName: "projects" */ "@/views/Projects.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/projects/:id",
    name: "project-detail",
    component: () =>
      import(/* webpackChunkName: "projects" */ "@/views/ProjectDetail.vue"),
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/users",
    name: "users",
    component: () =>
      import(/* webpackChunkName: "users" */ "@/views/Users.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "@/views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(Vue.prototype.$auth.authRedirectGuard());

export default router;
