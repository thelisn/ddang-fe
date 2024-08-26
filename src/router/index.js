import { createWebHistory, createRouter } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'MainView',
      component: () => import('@/views/MainView.vue'),
    },
    {
      path: '/waiting',
      name: 'WatingRoom',
      component: () => import('@/views/WaitingView.vue'),
    },
    {
      path: '/admin',
      name: 'AdminPage',
      component: () => import('@/views/AdminView.vue'),
    },
    {
      path: '/quiz',
      name: 'QuizPage',
      component: () => import('@/views/QuizView.vue'),
    },
    {
      path: '/result',
      name: 'ResultPage',
      component: () => import('@/views/ResultView.vue'),
    },
    {
      path: '/end',
      name: 'EndPage',
      component: () => import('@/views/EndView.vue'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const isNotRouter = !history.state?.isRouter;
  const nonUserInfo = !localStorage.getItem('userInfo');
  const isNotMain = to.path !== '/';

  if (isNotRouter && nonUserInfo && isNotMain) next('/');
  else next();
});

export default router;
