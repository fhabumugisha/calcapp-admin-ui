import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/projects",
    name: "projects",
    component: () =>
      import(/* webpackChunkName: "projects" */ "@/views/Projects.vue")
  },
  {
    path: "/projects/:id",
    name: "project-detail",
    component: () =>
      import(/* webpackChunkName: "projects" */ "@/views/ProjectDetail.vue"),
    props: true
  },
  {
    path: "/users",
    name: "users",
    component: () => import(/* webpackChunkName: "users" */ "@/views/Users.vue")
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

export default router;