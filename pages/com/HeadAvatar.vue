<template>
    <img v-if="thumbAvatar"
         :class="headClass"
         referrerpolicy="no-referrer"
         :src="thumbAvatar"
    />
    <img v-else
         :class="headClass"
         referrerpolicy="no-referrer"
         src="@/static/img/default.png"
    />
</template>

<script>
export default {
  name: "HeadAvatar",
  props: {
    thumbAvatar: {
      type: String,
      default: '',
    },
    headClass:{
      type:String,
      default:'focus-head'
    }
  }
}
</script>

<style scoped>

</style>
