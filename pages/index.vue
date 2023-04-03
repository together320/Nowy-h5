<template>
  <div>
    <div v-show="$route.path==='/'" class="whole-page">
      <div style="width: 100%;max-width:414px;margin:auto;" v-watermark="watermarkConfig" ref="idxContainer">
        <div id="stars" style="position: fixed"></div>
        <div id="stars2" style="position: fixed"></div>
        <div id="stars3" style="position: fixed"></div>
        <div class="backTop-container">
          <div class="backTop" @click="backTop"></div>
        </div>
        <div class="container" v-if="isLoaded" ref="container">
          <div style="height:210px;" class="flex-row justify-between">
            <div style="padding:10px 0 0 20px; cursor: pointer">
              <div class="rule" @click="jumpToRules"/>
            </div>
            <div style="padding:0 0 0 20px; cursor: pointer">
              <div class="question" @click="jumpToQuestion"/>
            </div>
            <div style="padding:0 20px 0 0; cursor: pointer">
              <div class="person" @click="jumpToMyPicker">
              </div>
            </div>
          </div>
          <van-sticky>
            <activity-list :activities="this.activities" :selected-activity="selectedActivity"
                           @toggleActivity="toggleActivity"/>
          </van-sticky>
          <div v-if="this.activities[selectedActivity]?.showRank==='0'">
            <div class="middleTitle"></div>
            <div class="indexSearch">
              <van-search
                v-model="keywords"
                shape="round"
                background="rgba(65, 134, 255, 0)"
                placeholder="请输入名称或者代码查看指数"
                input-align="center"
                @input="searchListedIndexes"
                clearable
                @clear="onClear"
              />
            </div>
            <div class="index-tabs">
              <van-tabs v-model:active="active" color="#61D7FF" title-active-color="#61D7FF"
                        title-inactive-color="#8294CF" background="#041A63">
                <van-tab title="全部">
                  <index-list :forbidden-select="hasEnd" v-if="keywords===''"
                              :current-index-data="indexTabs[selectedActivity]"
                              @toggleVotedIndex="toggleVotedIndex"/>
                  <index-list :forbidden-select="hasEnd" v-else
                              :current-index-data="indexTabs[selectedActivity].filter(item=>item.name.indexOf(keywords) !== -1 || item.code.indexOf(keywords.toUpperCase()) !== -1)"
                              @toggleVotedIndex="toggleVotedIndex"/>
                </van-tab>
                <van-tab v-for="tag in tags" :title="tag.paramValue" :key="tag.id">
                  <index-list :forbidden-select="hasEnd" v-if="keywords===''"
                              :current-index-data="indexTabs[selectedActivity].filter(cid=>cid.indTag.trim().indexOf(tag.paramValue.trim())>-1)"
                              @toggleVotedIndex="toggleVotedIndex"/>
                  <index-list :forbidden-select="hasEnd" v-else
                              :current-index-data="indexTabs[selectedActivity].filter(cid=>cid.indTag.trim().indexOf(tag.paramValue.trim())>-1).filter(item=>item.name.indexOf(keywords) !== -1 || item.code.indexOf(keywords.toUpperCase()) !== -1)"
                              @toggleVotedIndex="toggleVotedIndex"/>
                </van-tab>
              </van-tabs>
            </div>
          </div>
          <div v-else>
            <rank :list="this.rankData?.data?.list||[]" :my-rank="this.rankData?.myRank||{}"
                  :in-come-time="this.activities[this.selectedActivity]?.incomeTime"/>
          </div>
          <div v-if="!hasEnd" class="voteBox" @click.stop="jumpToMyPicker">
            <div style="width: 80%;" class="subBox">
              <div style="font-size:14px; font-weight:400; color:#FFFFFF; padding-left: 20px;">已选择 <span
                style="font-weight:bold;font-size: 16px;">{{
                  indexTabs[this.selectedActivity].filter(d => d.voted === true).length
                }}/5 </span>个
              </div>
              <div style="font-size: 12px; font-weight:400; color:#FFFFFF;padding:5px 12px 0 20px;">投票截止日期: {{
                  currentEndDate
                }}
              </div>
            </div>
            <div style="width: 20%;" class="subBox">
              <div class="voteButton" @click.stop="beginVote">OK</div>
            </div>
          </div>
          <div v-else class="voteBox" @click.stop="jumpToMyPicker">
            <div style="width: 80%;" class="subBox">
              <div style="font-size:14px; font-weight:400; color:#FFFFFF; padding-left: 20px;">已选择 <span
                style="font-weight:bold;font-size: 16px;">{{
                  indexTabs[this.selectedActivity].filter(d => d.voted === true).length
                }}/5 </span>个
              </div>
              <div style="font-size: 12px; font-weight:400; color:#FFFFFF;padding:5px 12px 0 20px;" v-if="activities[this.selectedActivity]?.showRank==='0'">
                您{{
                  indexTabs[this.selectedActivity].filter(d => d.voted === true).length >= 3 ? '已完成本次提交, 一周后展示动态排名' : '尚未参赛'
                }}
              </div>
            </div>
            <div style="width: 20%;" class="subBox" v-if="activities[this.selectedActivity]?.showRank==='1'">
              <div class="voteButton" style="width:100px;font-size: 14px" @click.stop="checkIdxRank">查看指数榜单</div>
            </div>
          </div>
        </div>
        <div v-if="!isLoaded"
             style="position: fixed; z-index:2; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 1)">
          <div class="spinner">
            <van-loading color="#1989fa" type="spinner" size="36px"/>
          </div>
        </div>
      </div>
    </div>
    <nuxt keep-alive :key="$route.fullPath" :keep-alive-props="{include: ['question','detail','rules']}"/>
  </div>
</template>

<script>
import {debounce} from "@/utils/utils";
import IndexList from "@/pages/com/IndexList"
import ActivityList from "@/pages/com/ActivityList"
import Rank from "@/pages/com/Rank"

export default {
  head: {
    title: '首页'
  },
  components: {
    IndexList, ActivityList, Rank
  },
  name: 'home',
  data() {
    return {
      isLoaded: false,
      currentTimeCode: "",
      currentEndDate: "",
      hasEnd: false,
      keywords: "",
      active: 0,
      showList: [],
      firstTimeLoad: 0,
    };
  },
  computed: {
    userName() {
      const name = '国金证券股份有限公司'
      try {
        const item = JSON.parse(localStorage.getItem('fpfp'))
        return item.name || name
      } catch (error) {
        return name
      }
    },
    watermarkConfig() {
      return {
        zIndex: 1000,
        font: '16px microsoft yahei',
        color: 'rgba(255,255,255,0.1)',
        content: this.userName,
        rotate: -20,
        width: 180,
        height: 120,
        repeat: true,
        keyWord: ''
      }
    },
    tags() {
      return this.$store.getters["getTags"]
    },
    indexTabs() {
      return this.$store.getters["getIndexTabs"]
    },
    rankData() {
      return this.$store.getters["getRankData"]
    },
    activities() {
      const rst = this.$store.getters["getActivities"] || []
      if (this.firstTimeLoad === 0) {
        this.toggleActivity(rst[this.selectedActivity], this.selectedActivity)
      }
      return rst
    },
    selectedActivity: {
      get() {
        return this.$store.getters['getSelectedActivity']
      },
      set(value) {
        this.$store.dispatch('storeActivity', {selectedActivity: value})
      }
    }
  },
  mounted() {
    this.$store.dispatch('getActivities')
    this.$store.dispatch('getTags')
    this.isLoaded = true
  },
  methods: {
    backTop() {
      this.$refs['idxContainer'].scrollIntoView({behavior: "smooth"})
    },
    toggleActivity(activity, index) {
      if (activity && activity?.onOff === "1") {
        this.currentTimeCode = activity.code;
        this.currentEndDate = activity.endDateStr;
        this.selectedActivity = index;
        this.hasEnd = activity.hasEnd;
        this.firstTimeLoad += 1;
        this.$store.dispatch('getIndexes', {timeCode: this.currentTimeCode, type: index})
        if (activity.showRank === '1') {
          this.$store.dispatch('getRank', {timeCode: this.currentTimeCode});
        }
      }
    },
    jumpToMyPicker() {
      this.$router.push("myPicker");
    },
    jumpToDetail(code) {
      this.$router.push({path: '/detail', query: {detailCode: code}})
    },
    jumpToRules() {
      this.$router.push("rules");
    },
    jumpToQuestion() {
      this.$router.push("question");
    },
    beginVote() {
      let pickedIndexes = [];
      let votedList = this.indexTabs[this.selectedActivity].filter(d => d.voted === true);
      if (votedList.length === 0) {
        this.$notify({type: 'warning', message: "至少选一只"});
        return;
      }
      //打开loading
      this.isLoaded = false;
      for (let item of votedList) {
        pickedIndexes.push({
          indCode: item.code,
          indName: item.name,
          timeCode: this.currentTimeCode
        });
      }
      this.$store.dispatch('indexVote', pickedIndexes).then(
        this.votedIndexesSuccessHandler,
        this.votedIndexesErrorHandler
      );
    },
    checkIdxRank(){
      this.$router.push("idxRank");
    },
    votedIndexesSuccessHandler(rsp) {
      //关闭loading
      this.isLoaded = true;
      if (rsp.data.code !== 0) {
        this.$notify({type: 'danger', message: rsp.data.msg, duration: 1000});
        return;
      }
      let count = this.indexTabs[this.selectedActivity].filter(d => d.voted === true).length
      this.$store.dispatch('getIndexes', {timeCode: this.currentTimeCode, type: this.selectedActivity})
      this.$notify({type: 'primary', message: `请在个人中心查看提交的${count}只指数,截止日期前可重新提交`, background: 'rgba(0,0,0,0.6)'});
    },
    votedIndexesErrorHandler() {
      //关闭loading
      this.isLoaded = true;
      this.$notify({type: 'danger', message: "服务异常，请重试或者联系管理人员"});
    },
    onClear() {
      this.searchListedIndexes('')
    },
    toggleVotedIndex(index) {
      if (index.voted === false && this.indexTabs[this.selectedActivity].filter(d => d.voted === true).length > 4) {
        this.$notify({type: 'danger', message: "最多只能选五只", duration: 1000});
      } else {
        this.$store.dispatch('storeVote', {obj: index, idx: this.selectedActivity})
      }
    },
    searchListedIndexes: debounce(function (value) {
      this.keywords = value
    }, 300),
  },
}
</script>
<style src="./css/star.css"/>
<style src="./css/index.css"/>

<style scoped>

.indexSearch {
  margin: 10px auto 0 auto;
  width: 92%;
  height: 38px;
  max-width: 374px;
  -webkit-backdrop-filter: blur(5px);
}

.indexSearch >>> .van-search__content {
  border: solid 1px rgba(92, 128, 255, 0.8);
  background-color: rgba(65, 134, 255, 0.3);
}

.indexSearch >>> .van-search {
  padding-top: 0;
  padding-bottom: 0;
}

.indexSearch >>> .van-field__control {
  color: #FFFFFF;
}

.indexSearch >>> .van-search .van-cell .van-field__left-icon {
  color: rgba(255, 255, 255, 0.8);
}

.indexSearch >>> input::placeholder {
  color: rgba(255, 255, 255, 0.8);
}

.indexSearch >>> input:focus::placeholder {
  color: rgba(255, 255, 255, 0.5);
}
</style>
