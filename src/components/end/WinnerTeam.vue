<template>
  <div class="winner-wrap">
    <div v-for="teamData in filteredTeamList" :key="teamData.teamName" class="winner-team-box">
      <span class="winner-team">{{ teamData.teamName }}</span>
      <div :class="`winner ${getClass(teamData.teamName)}`">
        <span class="winners" v-for="(item, idx) in teamData.members" :key="idx">{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from "vue";
import { getClass } from "@/utils";

const props = defineProps(["winnerData"]);

const teamList = ["양재", "스포크", "디채", "모니모"];

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
.winner-wrap {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 40px;
  padding-left: 20px;

  .winner-team-box {
    display: flex;
    align-items: flex-start;
    gap: 20px;

    .winner-team {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      margin-top: 16px;
      line-height: 29px;
      font-size: 18px;
      color: #fff;
    }

    .winner {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      flex: 1;
      text-align: left;
      padding: 12px 0px 13px 20px;
      border-radius: 20px 0 0 20px;

      .winners {
        line-height: 35px;
        font-size: 22px;
        color: #fff;
      }
    }
  }
}
</style>
