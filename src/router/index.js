import { createWebHistory, createRouter } from "vue-router"

import LoginPage from "@/pages/LoginPage.vue"

import WaitingRoom from "@/pages/WaitingRoom.vue";
import AdminPage from "@/pages/AdminPage.vue";
import QuizPage from "@/components/QuizPage.vue";
import ResultPage from "@/components/ResultPage.vue";

const routes = [
    {
        path: "/",
        name: "Login",
        component: LoginPage,
    },
    {
        path: "/waiting", 
        name: "WatingRoom",  
        component: WaitingRoom,  
    },
    {
        path: "/admin", 
        name: "AdminPage",  
        component: AdminPage,  
    },
    {
        path: "/quiz", 
        name: "QuizPage",  
        component: QuizPage,  
    },
    {
        path: "/result", 
        name: "ResultPage",  
        component: ResultPage,  
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;