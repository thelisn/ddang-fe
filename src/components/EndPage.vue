<template>
  <div id="end-page">
    <LisnHeader />
    <section class="end-container">
      
      




    </section>
  </div>
</template>

<script>
// import { state, socket } from "@/socket";
import router from "@/router";
import { onBeforeUnmount, onMounted, ref } from "vue";
import { getUserInfo, getClass } from "@/utils";
import LisnHeader from "@/components/LisnHeader.vue"

export default {
  name: 'QuizPage',
  components: {
    LisnHeader
  },
  setup() {
    // 변수

        
    // 함수


    // Life Cycle
    onMounted(() => {
    
    
    });

    onBeforeUnmount(() => {

    });

    return {
      getClass,
    }
  }
}
</script>
<style scoped lang="scss" src="@/assets/scss/component/pages/EndPage.scss"></style>