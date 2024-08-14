import { createWebHistory, createRouter } from "vue-router";
import MainPage from "@/components/MainPage.vue";
import WaitingRoom from "@/components/WaitingRoom.vue";
import AdminPage from "@/components/AdminPage.vue";
import QuizPage from "@/components/QuizPage.vue";
import ResultPage from "@/components/ResultPage.vue";
import EndPage from "@/components/EndPage.vue";

const routes = [
  {
    path: "/",
    name: "MainPage",
    component: MainPage,
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
  {
    path: "/end",
    name: "EndPage",
    component: EndPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isNotRouter = !history.state?.isRouter;
  const nonUserInfo = !localStorage.getItem("userInfo");
  const isNotMain = to.path !== "/";

  if (isNotRouter && nonUserInfo && isNotMain) next("/");
  else next();
});

export default router;
