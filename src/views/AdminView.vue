<template>
  <div v-if="isLoading">로딩중...</div>
  <div v-else id="admin-page">
    <LisnHeader />

    <QuestionContainer
      v-if="currentQuestion && currentQuestionData"
      :currentQuestionData="currentQuestionData"
    />

    <AnswerContainer
      v-if="currentQuestion"
      :currentUser="currentUser"
      :totalUser="totalUser"
      @showAnswer="showAnswer"
    />

    <QuestionListContainer
      :questionData="questionData"
      @startQuiz="startQuiz"
      @restartQuiz="restartQuiz"
      :questionStatus="questionStatus"
    />

    <TeamContainer :teamData="teamData" @revive="revive" />

    <ButtonContainer @finish="finishBtn" @reset="resetBtn" />
  </div>
</template>

<script setup>
import { state, socket } from '@/socket';
import { onBeforeUnmount, onMounted, ref, getCurrentInstance } from 'vue';
import { getUserInfo, sortTeamMember } from '../utils/index';
import LisnHeader from '@/components/LisnHeader.vue';
import QuestionContainer from '@/components/admin/QuestionContainer.vue';
import AnswerContainer from '@/components/admin/AnswerContainer.vue';
import QuestionListContainer from '@/components/admin/QuestionListContainer.vue';
import TeamContainer from '@/components/admin/TeamContainer.vue';
import ButtonContainer from '@/components/admin/ButtonContainer.vue';
import axios from 'axios';
import router from '@/router';

// 변수
const questionData = ref(null);
const currentQuestionData = ref(null);
const currentQuestion = ref(null);
const userData = ref(null);
const teamData = ref(null);
const isAlive = ref(null);
const isData = ref(false);
const userInfo = ref();
const isLoading = ref(true);
const totalUser = ref(0);
const currentUser = ref(0);
const instance = getCurrentInstance();

// 함수
const showAnswer = async () => {
  // 채점하고자 하는 문제 번호 파라미터로 전송
  socket.emit('show-answer', {
    userInfo: userInfo.value,
    currentQuestion,
  });
  updatePage();
  currentQuestion.value = null;
};

const revive = (data) => {
  if (!data.isAlive) {
    if (confirm('부활시키겠습니까?')) {
      socket.emit('revive', data);
    }
  }
};

const startQuiz = async (question) => {
  currentQuestion.value = question.number;

  // 시작하고자 하는 퀴즈 번호 파라미터로 전송
  socket.emit('start-quiz', {
    userInfo: userInfo.value,
    questionNum: question.number,
  });

  await axios.get('/api/admin').then((res) => {
    questionData.value = res.data.questionData;
    userData.value = res.data.userData;
  });
};

const restartQuiz = () => {
  console.log('restart');
};

const questionStatus = (data) => {
  if (!data.isStarted) {
    return 'before';
  } else {
    if (data.isFinished) {
      return null;
    } else {
      return 'on';
    }
  }
};

const updatePage = async () => {
  await axios.get('/api/admin').then((res) => {
    questionData.value = res.data.questionData;
    userData.value = res.data.userData;
    if (res.data.currentQuestion) {
      currentQuestion.value = res.data.currentQuestion;
    }
    currentUser.value = res.data.currentUser;
    totalUser.value = res.data.totalUser;

    currentQuestionData.value = res.data.questionData.filter(
      (data) => data.number === currentQuestion.value
    )[0];
    isLoading.value = false;
    teamData.value = sortTeamMember(userData.value);
    instance?.proxy?.$forceUpdate();
    console.log(res.data);
  });
};

const finishBtn = () => {
  if (confirm('정말 종료 하시겠습니까?')) {
    socket.emit('show-end-winner');
    router.push('/end');
  }
};

const resetBtn = () => {
  if (confirm('정말 초기화 하시겠습니까?')) {
    updatePage();
  }
};

// Life Cycle
onMounted(() => {
  userInfo.value = getUserInfo();

  // 처음 페이지 진입 시 실행
  socket.on('join-admin-quiz', (data) => {
    if (data.currentQuestion) {
      currentQuestion.value = data.currentQuestion;
    }
    console.log(data, 'mounted');
    currentUser.value = data.currentUser;
    totalUser.value = data.totalUser;
    isLoading.value = false;
    questionData.value = data.questionData;
    currentQuestionData.value = data.questionData.filter(
      (data) => data.number === currentQuestion.value
    )[0];
    userData.value = data.userData;
    isAlive.value = data.userData.isAlive;
    isData.value = true;
    teamData.value = sortTeamMember(userData.value);
  });

  // 부활 요청시 실행
  socket.on('revive', async () => {
    updatePage();
  });

  // 유저 로그인 시 실행
  socket.on('login', async () => {
    updatePage();
  });

  // 유저가 퀴즈에 접속했을 때
  socket.on('join-quiz', () => {
    socket.emit('update-current-user', currentQuestion.value);
  });

  // 유저가 보기 클릭했을 때
  socket.on('select-answer', () => {
    socket.emit('update-current-user', currentQuestion.value);
  });

  // 현재 문제 푼 유저 정보 업데이트
  socket.on('update-current-user', (data) => {
    currentUser.value = data.currentUser;
    totalUser.value = data.totalUser;
    updatePage();
  });

  // 새로고침 시 실행
  setTimeout(async () => {
    if (!isData.value) {
      updatePage();
    }
  }, 500);
});

onBeforeUnmount(() => {
  socket.off('join-admin-quiz');
  socket.off('revive');
  socket.off('login');
  socket.off('select-answer');
  socket.off('update-current-user');
  socket.off('join-quiz');
});
</script>

<style lang="scss" scoped>
#admin-page {
  min-height: 100vh;
  background-color: #111;
  padding: 60px 20px 20px;
  font-family: 'Noto Sans KR';
}
</style>
