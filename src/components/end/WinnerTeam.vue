<template>
  <div>
    <div
      v-for="teamData in filteredTeamList"
      :key="teamData.teamName"
      class="winner-team-box"
    >
      <span class="winner-team">{{ teamData.teamName }}</span>
      <button :class="`winner ${teamData.teamName}`">
        <span
          class="winners"
          v-for="(item, idx) in teamData.members"
          :key="idx"
          >{{ item.name }}</span
        >
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
  winnerData: Array,
});

const teamList = ['양재', '스포크', '디채', '모니모'];

const filteredTeamList = computed(() => {
  if (!props.winnerData) return [];

  return teamList
    .map((teamName) => ({
      teamName,
      members: props.winnerData.filter((item) => item.teamName === teamName),
    }))
    .filter((teamData) => teamData.members.length > 0);
});
</script>

<style scoped lang="scss">
.winner-team-box {
  margin-bottom: 40px;
  padding: 10px 10px 10px 0;

  .winner-team {
    color: #fff;
    font-size: 18px;
    margin-right: 35px;
  }

  .winner {
    color: #fff;
    font-size: 22px;
    text-align: left;
    padding: 12px 0px 13px 20px;
    border-radius: 20px 0 0 20px;

    .winners {
      margin-right: 10px;
    }
  }
}
</style>
