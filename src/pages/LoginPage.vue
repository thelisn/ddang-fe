<template>
  <div id="main-page" class="main-container">
    <div class="logo-wrap">
      <img class="lisn" src="@/assets/images/lisn.svg" alt="LISN logo" aria-hidden="true" />
    </div>

    <div class="input-wrap">
      <input id="lisn-input" type="text" v-model="input" name="id" />
      <label for="lisn-input" class="input-label">사번 or 이름</label>
    </div>

    <button class="login-btn" @click="login">로그인</button>
  </div>
</template>

<script>
import { SOCKET_EVENT, socket } from '@/socket'
import { onMounted, ref, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'MainPage',
  setup() {
    const router = useRouter()
    const store = useStore()
    
    /*
      변수 정의
     */

    const input = ref('')

    /*
      Life Cycle
     */

    onMounted(() => {
      socket.on(SOCKET_EVENT.LOGIN, (res) => {
        if (res.error) {
          alert(res.msg)
          localStorage.removeItem('userInfo')
        } else {
          localStorage.setItem('userInfo', JSON.stringify(res.data))
          store.commit('setUserInfo', res.data)
          router.push('/waiting')
        }
      })

      let localData = localStorage.getItem('userInfo')

      if (localData) { // 정보가 있으면 해당 정보로 로그인
        let userInfo = JSON.parse(localData)

        socket.emit(SOCKET_EVENT.LOGIN, {
          id: userInfo.einumber
        })
      }
    })

    onBeforeUnmount(() => {
      socket.off(SOCKET_EVENT.LOGIN)
    })

    /*
      함수 정의
     */
    
    const login = () => {
      socket.emit(SOCKET_EVENT.LOGIN, {
        id: input.value.toUpperCase()
      })
    }

    return {
      login,
      input
    }
  },

  data() {
    return {
    }
  },

  computed: {
  }
}
</script>

<style lang='scss' scoped src='./LoginPage.scss'></style>
