<template>
  <div v-if="isLoading">로딩중...</div>
  <div v-else id="admin-page">
    <LisnHeader />
    
    <div v-if="currentQuestion && currentQuestionData" class="question-container">
      <p class="number">Q{{ currentQuestionData.number }}.</p>
      <p class="text">{{ currentQuestionData.question }}</p>
    </div>

    <div v-if="currentQuestion" class="answer-container">
      <p class="status">{{ currentUser }} 명/{{ totalUser }} 명 ({{ Math.ceil(currentUser/totalUser) * 100 }}%) 완료</p>
      <div class="status-view"></div>
      <button class="show-answer" @click="showAnswer">정답 공개</button>
    </div>

    <div class="question-list-container">
      <ul>
        <li class="list-wrap" v-for="(question, idx) in questionData" :key="idx" :class="questionStatus(question)">
          <p class="number">Q{{ idx + 1 }}</p>
          <p class="result">{{ question.isFinished ? question.question : question.isStarted ? '진행중' : question.question }}</p>
          <button class="question-btn" @click="question.isStarted ? restartQuiz : startQuiz(question)">{{ question.isStarted ? '재진행' : '시작' }}</button>
        </li>
      </ul>
    </div>
    <div class="team-container">
      <div class="team-wrap yangjae">
        <p class="team-title">양재</p>
        <ul class="user-wrap">
          <li class="user-data" v-for="(user, idx) in teamData['양재']" :key="idx" :class="!user.isAlive ? 'dead' : null"  @click="revive(user)">
            <div class="user-status yangjae"></div>
            <p class="user-name">{{ user.name }}</p>
          </li>
        </ul>
      </div>

      <div class="team-wrap spoke">
        <p class="team-title">스포크</p>
        <ul class="user-wrap">
          <li class="user-data" v-for="(user, idx) in teamData['스포크']" :key="idx" :class="!user.isAlive ? 'dead' : null"  @click="revive(user)">
            <div class="user-status spoke"></div>
            <p class="user-name">{{ user.name }}</p>
          </li>
        </ul>
      </div>

      <div class="team-wrap dichae">
        <p class="team-title">디채</p>
        <ul class="user-wrap">
          <li class="user-data" v-for="(user, idx) in teamData['디채']" :key="idx" :class="!user.isAlive ? 'dead' : null" @click="revive(user)">
            <div class="user-status dichae"></div>
            <p class="user-name">{{ user.name }}</p>
          </li>
        </ul>
      </div>

      <div class="team-wrap monimo">
        <p class="team-title">모니모</p>
        <ul class="user-wrap">
          <li class="user-data" v-for="(user, idx) in teamData['모니모']" :key="idx" :class="!user.isAlive ? 'dead' : null"  @click="revive(user)">
            <div class="user-status monimo"></div>
            <p class="user-name">{{ user.name }}</p>
          </li>
        </ul>
      </div>
    </div>

    <div class="btn-container">
      <button class="finish-btn" @click="finishBtn">종료</button>
      <button class="reset-btn">초기화</button>
    </div>
  </div>
</template>

<script>
import { state, socket } from "@/socket";
import { onBeforeUnmount, onMounted, reactive, ref, getCurrentInstance } from "vue";
import { getUserInfo, sortTeamMember } from '../utils/index';
import LisnHeader from "./LisnHeader.vue";
import axios from 'axios';
import router from "@/router";



export default {
  name: "AdminPage",
  components: {
    LisnHeader
  },
  setup() {
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
        currentQuestion
      });
      updatePage();
      currentQuestion.value = null;
    }

    const revive = (data) => {
      if (!data.isAlive) {
        if(confirm('부활시키겠습니까?')) {
          socket.emit('revive', data);
        }
      }
    }

    const startQuiz = async (question) => {
      currentQuestion.value = question.number;

      // 시작하고자 하는 퀴즈 번호 파라미터로 전송
      socket.emit('start-quiz', {
        userInfo: userInfo.value,
        questionNum: question.number
      });

      await axios.get('/api/admin').then(res => {
        questionData.value = res.data.questionData;
        userData.value = res.data.userData;
      });
    }

    const restartQuiz = () => {
      console.log('restart')
    }

    const questionStatus = (data) => {
      if (!data.isStarted) {
        return 'before'
      } else {
        if (data.isFinished) {
          return null
        } else {
          return 'on'
        }
      }
    }

    const updatePage = async () => {
      await axios.get('/api/admin').then(res => {
        questionData.value = res.data.questionData;
        userData.value = res.data.userData;
        if (res.data.currentQuestion) {
          currentQuestion.value = res.data.currentQuestion;
        }
        currentUser.value = res.data.currentUser;
        totalUser.value = res.data.totalUser;

        currentQuestionData.value = res.data.questionData.filter((data) => data.number === currentQuestion.value)[0];
        isLoading.value = false;
        teamData.value = sortTeamMember(userData.value);
        instance?.proxy?.$forceUpdate();
        console.log(res.data)
      });
    }

    const finishBtn = () => {
      if (confirm('정말 종료 하시겠습니까?')) {
        socket.emit('show-end-winner');
        router.push('/end');
      }
    }

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
        currentQuestionData.value = data.questionData.filter((data) => data.number === currentQuestion.value)[0];
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
      })

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

    return {
      showAnswer,
      revive,
      startQuiz,
      isAlive,
      questionData,
      userData,
      questionStatus,
      restartQuiz,
      currentQuestion,
      currentQuestionData,
      isLoading,
      teamData,
      currentUser,
      totalUser,
      finishBtn
    }
  }
}
</script>

<style lang="scss" scoped src="@/assets/scss/component/pages/AdminPage.scss"></style>