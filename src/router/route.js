import { createWebHistory, createRouter } from "vue-router";
const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/jobs",
    name: "Jobs",
    component: () => import("../views/Jobs.vue"),
  },
  {
    path: "/job/:id",
    name: "Job",
    component: () => import("../views/Job.vue"),
  },
  {
    path: "/add-job",
    name: "AddJob",
    component: () => import("../views/AddJob.vue"),
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: () => import("../components/NotFound.vue"),
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
