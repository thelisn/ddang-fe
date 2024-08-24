import { createWebHistory, createRouter } from "vue-router";
import MainPage from "@/views/MainView.vue";
import WaitingRoom from "@/views/WaitingView.vue";
import AdminPage from "@/views/AdminView.vue";
import QuizPage from "@/views/QuizView.vue";
import ResultPage from "@/views/ResultView.vue";
import EndPage from "@/views/EndView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "MainView",
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
  ],
});

router.beforeEach((to, from, next) => {
  const isNotRouter = !history.state?.isRouter;
  const nonUserInfo = !localStorage.getItem("userInfo");
  const isNotMain = to.path !== "/";

  if (isNotRouter && nonUserInfo && isNotMain) next("/");
  else next();
});

export default router;
