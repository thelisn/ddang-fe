<template>
  <button class="user-button"
          :style="{ backgroundColor: color, color: color ? '#FFFFFF' : null }">
    <slot></slot>
  </button>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'UserButton',
  props: [],

  setup() {
    const store = useStore()

    const userInfo = computed(() => store.state.userInfo)
    const teamInfo = (TeamId) => store.getters.teamInfo(TeamId)

    const color = userInfo.value ? (userInfo.value.isAdmin ? '#EB1C1C' : teamInfo(userInfo.value.team).color) : null

    return {
      color
    }
  }
}
</script>

<style lang="scss" scoped src="./UserButton.scss">
</style>