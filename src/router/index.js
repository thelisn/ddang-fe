import { createWebHistory, createRouter } from "vue-router";
import MainPage from "@/components/MainPage.vue";
import UserPage from "@/components/UserPage.vue";
import AdminPage from "@/components/AdminPage.vue";

const routes = [
    {
        path: "/",
        name: "MainPage",
        component: MainPage,
    },
    {
        path: "/user", 
        name: "UserPage",  
        component: UserPage,  
    },
    {
      path: "/admin", 
      name: "AdminPage",  
      component: AdminPage,  
  },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;