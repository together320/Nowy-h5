<template>
  <van-button :class="clazz" v-if="active" round type="primary" @click="handleClick">{{ title }}</van-button>
  <van-button :class="clazz" v-else round color="#F5F6F9" @click="handleClick"><span
    class="ep-button-span">{{ title }}</span>
  </van-button>
</template>

<script>
export default {
  name: "CustomButton",
  props: {
    title: {
      type: String,
      default: '',
    },
    active: {
      type: Boolean,
      default: true
    },
    clazz: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleClick() {
      this.$emit('customClick')
    }
  }
}
</script>

<style scoped>
.ep-button-span {
  color: #6D7278;
}
.ep-button-clazz{
  margin:0 10px 10px 0
}
</style>
