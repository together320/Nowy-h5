<template>
  <div class="indexContainer">
    <div class="indexList">
      <div @click.stop="jumpToDetail(obj.code)" v-for="(obj,idx) in currentIndexData"
           :class="{indexBox: true, votedIndex: obj.voted==1, unVotedIndex: obj.voted==0}"
           :key="obj.code+idx">
        <div class="indexName">{{ obj.name }}</div>
        <div class="indexCode">Wind代码:</div>
        <div class="indexCode">{{ obj.code }}</div>
        <div class="indexVotedStatus" v-show="obj.voted==1||(obj.voted==0&&forbiddenSelect===false)"
             :class="{ votedButton: obj.voted==1, unVotedButton: obj.voted==0}"
             @click.stop="toggleVotedIndex(obj)"
        ></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "IndexList",
  props: {
    currentIndexData: {
      type: Array,
      default: [],
    },
    forbiddenSelect: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    jumpToDetail(code) {
      this.$router.push({path: '/detail', query: {detailCode: code}})
    },
    toggleVotedIndex(index, no){
      if (!this.forbiddenSelect) {
        this.$emit('toggleVotedIndex', index, no)
      }
    }
  }
}
</script>
