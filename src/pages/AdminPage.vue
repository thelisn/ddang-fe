<template>
  <div id="admin-page">
    <LisnHeader />

    {{currentQuestion}}
    <div v-if="currentQuestionData" :key="currentQuestion">
      <div class="question-container">
        <p class="number">Q{{ currentQuestionData.number }}.</p>
        <p class="text">{{ currentQuestionData.question }}</p>
      </div>

      <div class="answer-container">
  <!--      <p class="status">{{ currentUser }} 명/{{ totalUser }} 명 ({{ Math.ceil(currentUser/totalUser) * 100 }}%) 완료</p>-->
  <!--      <div class="status-view"></div>-->
        <button class="show-answer" @click="showAnswer">정답 공개</button>
      </div>
    </div>

    <div v-if="questionList" class="question-list-container">
      <ul>
        <li class="list-wrap" v-for="question in questionList" :key="`question${question.id}`" :class="{ on: question.QuestionStatus && question.QuestionStatus.isCurrent }">
          <p class="number">Q{{ question.number }}</p>
          <p v-if="question.QuestionStatus">
            {{ question.QuestionStatus.isCurrent ? '진행 중' : `${question.QuestionStatus.correctUserCount}/${question.QuestionStatus.totalUserCount}명 정답` }}
          </p>
          <p class="result" v-else>
            {{ question.question }}
          </p>
          <template v-if="!currentQuestion">
            <button v-if="!question.QuestionStatus" class="question-btn" @click="startQuiz(question)">시작</button>
<!--            <button v-else class="question-btn" @click="restartQuiz">재진행</button>-->
          </template>
        </li>
      </ul>
    </div>

    <ul class="team-container">
      <li class="team-wrap" v-for="team in teamList" :key="`team${team.id}`">
        <p class="team-title">{{ team.name }}</p>
        <ul class="user-wrap">
          <span class="line" :style="{ backgroundColor: team.color }"></span>
          <li class="user-data" v-for="user in team.Users" :key="`user${user.id}`"
              :class="!user.isAlive ? 'dead' : null"  @click="revive(user)">
            <div class="user-status" :style="{ borderColor: team.color }"></div>
            <p class="user-name">{{ user.name }}</p>
          </li>
        </ul>
      </li>
    </ul>

    <div class="btn-container">
      <UserButton>종료</UserButton>
<!--      <button class="reset-btn">초기화</button>-->
    </div>
  </div>
</template>

<script>
import { SOCKET_EVENT, socket } from '@/socket'
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

import LisnHeader from '../components/LisnHeader'
import UserButton from '@/components/UserButton'
import httpClient from "@/utils/http-client";

export default {
  name: 'AdminPage',
  components: {
    LisnHeader,
    UserButton
  },

  setup() {
    const store = useStore()
    const router = useRouter()

    /*
      변수 정의
     */

    const userInfo = computed(() => store.state.userInfo)
    const teamList = computed(() => store.state.teamList)
    const currentQuestion = computed(() => store.state.currentQuestion)

    const questionList = ref(null)


    // const questionData = ref(null)
    // const currentQuestionData = ref(null)
    // const userData = ref(null)
    // const teamData = ref(null)
    // const isAlive = ref(null)
    // const isData = ref(false)
    // const userInfo = ref()
    // const isLoading = ref(true)
    // const totalUser = ref(0)
    // const currentUser = ref(0)
    // const instance = getCurrentInstance()

    const currentQuestionData = computed(() => {
      if (!questionList.value || !currentQuestion.value) {
        return null
      }

      return questionList.value.find(question => question.id === currentQuestion.value.questionId)
    })

    // const restartQuiz = () => {
    //   console.log('restart')
    // }
    //
    // const questionStatus = (data) => {
    //   if (!data.isStarted) {
    //     return 'before'
    //   } else {
    //     if (data.isFinished) {
    //       return null
    //     } else {
    //       return 'on'
    //     }
    //   }
    // }
    //
    // const updatePage = async () => {
    //   await axios.get('/api/admin').then(res => {
    //     questionData.value = res.data.questionData
    //     userData.value = res.data.userData
    //     if (res.data.currentQuestion) {
    //       currentQuestion.value = res.data.currentQuestion
    //     }
    //     currentUser.value = res.data.currentUser
    //     totalUser.value = res.data.totalUser
    //
    //     currentQuestionData.value = res.data.questionData.filter((data) => data.number === currentQuestion.value)[0]
    //     isLoading.value = false
    //     teamData.value = sortTeamMember(userData.value)
    //     instance?.proxy?.$forceUpdate()
    //   })
    // }

    /*
      Life Cycle
     */

    onMounted(() => {
      if (!userInfo.value) {
        router.push('/waiting')
      }

      httpClient.post('/api/team/list', {}).then(res => {
        store.commit('setTeamList', res.data.data)
      })

      httpClient.post('/api/question/current', {}).then(res => {
        store.commit('setCurrentQuestion', res.data.data)
      })

      httpClient.post('/api/question/list', {}).then(res => {
        questionList.value = res.data.data
      })


      socket.on(SOCKET_EVENT.START_QUIZ, (question) => {
        setTimeout(() => {
          store.commit('setCurrentQuestion', { questionId: question.id })
          httpClient.post('/api/question/list', {}).then(res => {
            questionList.value = res.data.data
          })
        }, 100)
      })

      socket.on(SOCKET_EVENT.SHOW_ANSWER, () => {
        setTimeout(() => {
          store.commit('setCurrentQuestion', null)
          httpClient.post('/api/question/list', {}).then(res => {
            questionList.value = res.data.data
          })
        }, 100)
      })

      // userInfo.value = getUserInfo()
      //
      // // 처음 페이지 진입 시 실행
      // socket.on('join-admin-quiz', (data) => {
      //   if (data.currentQuestion) {
      //     currentQuestion.value = data.currentQuestion
      //   }
      //   console.log(data, 'mounted')
      //   currentUser.value = data.currentUser
      //   totalUser.value = data.totalUser
      //   isLoading.value = false
      //   questionData.value = data.questionData
      //   currentQuestionData.value = data.questionData.filter((data) => data.number === currentQuestion.value)[0]
      //   userData.value = data.userData
      //   isAlive.value = data.userData.isAlive
      //   isData.value = true
      //   teamData.value = sortTeamMember(userData.value)
      // })
      //
      // // 부활 요청시 실행
      // socket.on('revive', async () => {
      //   updatePage()
      // })
      //
      // // 유저 로그인 시 실행
      // socket.on('login', async () => {
      //   updatePage()
      // })
      //
      // // 유저가 퀴즈에 접속했을 때
      // socket.on('join-quiz', () => {
      //   socket.emit('update-current-user', currentQuestion.value)
      // })
      //
      // // 유저가 보기 클릭했을 때
      // socket.on('select-answer', () => {
      //   socket.emit('update-current-user', currentQuestion.value)
      // })
      //
      // // 현재 문제 푼 유저 정보 업데이트
      // socket.on('update-current-user', (data) => {
      //   currentUser.value = data.currentUser
      //   totalUser.value = data.totalUser
      //   updatePage()
      // })
      //
      //
      //
      // // 새로고침 시 실행
      // setTimeout(async () => {
      //   if (!isData.value) {
      //     updatePage()
      //   }
      // }, 500)
    })

    onBeforeUnmount(() => {
      socket.off(SOCKET_EVENT.START_QUIZ)
      socket.off(SOCKET_EVENT.SHOW_ANSWER)

      // socket.off('join-admin-quiz')
      // socket.off('revive')
      // socket.off('login')
      // socket.off('select-answer')
      // socket.off('update-current-user')
      // socket.off('join-quiz')
    })

    /*
      함수 정의
     */

    const showAnswer = async () => {
      if(confirm(`정답을 공개하시겠습니까?`)) {
        socket.emit(SOCKET_EVENT.SHOW_ANSWER, { question: currentQuestionData.value })

        setTimeout(() => {
          store.commit('setCurrentQuestion', null)
          httpClient.post('/api/question/list', {}).then(res => {
            questionList.value = res.data.data
          })
        }, 100)
      }
    }

    const startQuiz = async (question) => {
      if(confirm(`Q${question.number} 시작하시겠습니까?`)) {
        socket.emit(SOCKET_EVENT.START_QUIZ, question)

        setTimeout(() => {
          store.commit('setCurrentQuestion', { questionId: question.id })
          httpClient.post('/api/question/list', {}).then(res => {
            questionList.value = res.data.data
          })
        }, 100)
      }
    }

    const revive = (data) => {
      if (!data.isAlive) {
        if(confirm('부활시키겠습니까?')) {
          socket.emit('revive', data)
        }
      }
    }

    return {
      teamList,
      currentQuestion,

      questionList,

      currentQuestionData,

      showAnswer,
      startQuiz,
      revive
    }
  }
}
</script>

<style lang="scss" scoped src="./AdminPage.scss"></style>