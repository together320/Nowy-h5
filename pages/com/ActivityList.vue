<template>
  <div class="activityBox">
    <div v-for="(activity, index) in activities" style="width: 22%; height: 60%;" class="activityBoxContent"
         :class="{selectedActivity: selectedActivity===index, noSelectedActivity: selectedActivity!==index}"
         @click="onToggle(activity, index)"
    >
      <div class="activity-tag" v-if="activity.hasEnd===false && activity.onOff==='1'">
        进行中
      </div>
      <div
        :class="{ title: true, selectedTitle: activity.onOff==='1', noSelectedTitle: activity.onOff==='0' }">
        {{ activity.name }}
      </div>
      <div
        :class="{ desc: true, selectedTitle: activity.onOff==='1', noSelectedTitle: activity.onOff==='0' }">
        {{ activity.subTitle }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ActivityList",
  props: {
    activities: {
      type: Array,
      default: [],
    },
    selectedActivity: {
      type: Number,
      default: -1,
    }
  },
  methods: {
    onToggle(activity, idx) {
      this.$emit('toggleActivity', activity, idx);
    }
  }
}
</script>
