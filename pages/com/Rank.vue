<template>
  <div>
    <div class="rank-container">
      <van-row>
        <van-col span="3"></van-col>
        <van-col span="18">
          <div class="rank-title-bar">
            <div class="rank-title-first">指数组合收益动态榜单</div>
            <div class="rank-title-desc">收益计算区间为{{ inComeTime }}</div>
          </div>
        </van-col>
        <van-col span="3"></van-col>
      </van-row>
    </div>
    <div class="rank-title">
      <van-row style="padding: 0 15px 10px 20px">
        <van-col span="4">排名</van-col>
        <van-col span="14">姓名/体系/部门</van-col>
        <van-col span="6">累计收益率</van-col>
      </van-row>
      <div class="rank-mine-container" v-if="myRank.yield!==undefined" >
        <van-row style="padding: 5px 8px;">
          <van-col class="rank-score rank-col" span="3">{{ myRank.rank }}</van-col>
          <van-col span="16">
            <div style="display: inline-flex">
              <div style="margin:auto">
                <head-avatar head-class="rank-head" :thumb-avatar="myRank.thumbAvatar"/>
              </div>
              <div style="padding-left:8px;">
                <div class="rank-name">{{ myRank.name }}</div>
                <div class="rank-dept">{{ myRank.dept }}</div>
              </div>
            </div>
          </van-col>
          <van-col class="rank-col" style="text-align:right" span="5"
                   :class="myRank.yield>0?'rank-pct-red':'rank-pct-green'">{{ parseFloat(myRank.yield).toFixed(2) }} %
          </van-col>
        </van-row>
      </div>
      <div style="margin: 0 15px;">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
            v-model:loading="loading"
            :finished="finished"
            finished-text="加载完成"
          >
            <van-row style="padding: 5px 8px; border-bottom: 1px solid rgba(255,255,255,0.1);" v-for="item in list"
                     :key="item.id">
              <van-col class="rank-score rank-col" span="3">{{ item.rank }}</van-col>
              <van-col span="16">
              <div style="display: inline-flex">
                <div style="margin:auto">
                  <head-avatar head-class="rank-head" :thumb-avatar="item.thumbAvatar"/>
                </div>
                <div style="padding-left:8px;">
                  <div class="rank-name">{{ item.name }}</div>
                  <div class="rank-dept">{{ item.dept }}</div>
                </div>
              </div>
              </van-col>
              <van-col class="rank-col" style="text-align:right" span="5"
                       :class="item.yield>0?'rank-pct-red':'rank-pct-green'">
                {{ item.yield > 0?'+':'-' }}{{ parseFloat(item.yield).toFixed(2) }} %
              </van-col>
            </van-row>
          </van-list>
        </van-pull-refresh>
      </div>
    </div>
  </div>
</template>
<script>
import HeadAvatar from "@/pages/com/HeadAvatar"

export default {
  name: "Rank",
  components: {HeadAvatar},
  props: {
    myRank: {
      type: Object,
      default: {},
    },
    list: {
      type: Array,
      default: [],
    },
    inComeTime: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loading: false,
      finished: false,
      refreshing: false
    };
  },
  methods: {
    onRefresh() {
      this.finished = false;
      this.loading = true;
    }
  }
}
</script>
