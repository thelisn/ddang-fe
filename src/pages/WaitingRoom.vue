<template>
  <div id="waiting-room">
    <LisnHeader />

    <ul class="team-container">
      <li class="team-wrap" v-for="team in teamList" :key="`team${team.id}`">
        <p class="team-title">{{ team.name }}</p>
        <ul class="user-wrap">
          <span class="line" :style="{ backgroundColor: team.color }"></span>
          <li class="user-data" v-for="user in team.Users" :key="`user${user.id}`">
            <div class="user-status" :style="{ borderColor: team.color }"></div>
            <p class="user-name">{{ user.name }}</p>
          </li>
        </ul>
      </li>
    </ul>

    <template v-if="userInfo">
      <div class="btn-area" v-if="!userInfo.isAdmin">
        <UserButton v-if="currentQuestion" @click="joinQuiz">입장</UserButton>
        <UserButton v-else disabled="disabled">대기 중</UserButton>
      </div>

      <div class="btn-area" v-else>
        <UserButton @click="joinAdminQuiz">ADMIN</UserButton>
      </div>
    </template>

  </div>

</template>

<script>
import { SOCKET_EVENT, socket } from '@/socket'
import { computed, onMounted, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import httpClient from '@/utils/http-client'

import LisnHeader from '@/components/LisnHeader'
import UserButton from '@/components/UserButton'

export default {
  name: 'WaitingRoom',
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

    /*
      Life Cycle
     */
    
    onMounted(() => {
      socket.on(SOCKET_EVENT.LOGIN, (res) => {
        if (res.error) {
          alert(res.msg)
          localStorage.removeItem('userInfo')
          router.push('/')
        } else {
          localStorage.setItem('userInfo', JSON.stringify(res.data))
          store.commit('setUserInfo', res.data)
        }
      })

      socket.on(SOCKET_EVENT.START_QUIZ, (data) => {
        store.commit('setCurrentQuestion', data)
      })

      let localData = localStorage.getItem('userInfo')

      if (localData) {
        let userInfo = JSON.parse(localData)

        socket.emit(SOCKET_EVENT.LOGIN, {
          id: userInfo.einumber
        })
      }

      httpClient.post('/api/team/list', {}).then(res => {
        store.commit('setTeamList', res.data.data)
      })

      httpClient.post('/api/question/current', {}).then(res => {
        store.commit('setCurrentQuestion', res.data.data)
      })
    })

    onBeforeUnmount(() => {
      socket.off(SOCKET_EVENT.LOGIN)
      socket.off(SOCKET_EVENT.START_QUIZ)
    })
    
    /*
      함수 정의
     */
    
    const joinQuiz = () => {
      socket.emit(SOCKET_EVENT.JOIN_QUIZ, userInfo.value)
      router.push('/quiz')
    }

    const joinAdminQuiz = () => {
      router.push('/admin')
    }

    return {
      userInfo,
      teamList,
      currentQuestion,

      joinQuiz,
      joinAdminQuiz,
    }
  }
}
</script>

<style lang="scss" scoped src="./WaitingRoom.scss">
</style>