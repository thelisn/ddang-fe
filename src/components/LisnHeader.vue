<template>
  <div class="header">
    <h1 class="quiz-header">
      <img class="lisn-header" src="@/assets/images/lisn.svg" alt="LISN logo" aria-hidden="true" />
    </h1>
    <div class="user-area" v-if="userInfo">
      <div v-if="userInfo.isAdmin" class="admin-status">ADMIN</div>
      <div v-else class="user-status" :style="{ borderColor: teamInfo(userInfo.TeamId).color }"></div>
      <p class="user-name">{{ userInfo.name }}</p>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'LisnHeader',

  setup() {
    const store = useStore()

    const userInfo = computed(() => store.state.userInfo)

    onMounted(() => {
      if (!userInfo.value) {
        let localData = localStorage.getItem('userInfo')
        if (localData) {
          store.commit('setUserInfo', JSON.parse(localData))
        }
      }
    })

    const teamInfo = (TeamId) => store.getters.teamInfo(TeamId)

    return {
      userInfo,
      teamInfo
    }
  }
}
</script>

<style lang="scss" scoped src="@/assets/scss/component/LisnHeader.scss">
</style>