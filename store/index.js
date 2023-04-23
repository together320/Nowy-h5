import {handleErrorRes} from "@/utils/utils";
import * as VueGoogleMaps from "vue2-google-maps";

export const state = () => ({
  tags: [],
  index_tabs: {0: [], 1: [], 2: [], 3: []},
  picked_tabs: {0: [], 1: [], 2: [], 3: []},
  currentIndexData: [],
  activities: [],
  idxRankData: [],
  selectedActivity: 0,
  rankData: {},
  postDetail: {},
  postRoute: {},
  placeDetail: {},
  loaded:false,
  pArray:[],
  rArray:[]
})

export const getters = {
  getPostDetail(state) {
    return state.postDetail
  },
  getPArray(state) {
    return state.pArray
  },
  getRArray(state) {
    return state.rArray
  },
  getPostRoute(state) {
    return state.postRoute
  },
  getPlaceDetail(state) {
    return state.placeDetail
  },
  getLoaded(state) {
    return state.loaded
  },
  getActivities(state) {
    return state.activities
  },
  getPickedTabs(state){
    return state.picked_tabs
  },
  getSelectedActivity(state){
    return state.selectedActivity
  },
  getRankData(state){
    return state.rankData
  },
  getIdxRankData(state){
    return state.idxRankData
  }
}

export const mutations = {
  setPostDetail(state, payload) {
    state.postDetail = payload
    state.loaded = true
  },
  setRArray(state,payload){
    state.rArray = payload
  },
  setPostRoute(state, payload) {
    state.postRoute = payload
    let ps = payload.places
    let pArray = []
    for (const p of ps) {
      let o = {position: {lat: p.coordinate.latitude, lng:p.coordinate.longitude,icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
          label: { color: '#d21171', fontWeight: 'bold', fontSize: '14px', text: '2-1' }}}
      pArray.push(o)
    }
    let rs = payload.tripPlans
    let rArray = []
    for (const r of rs) {
      let text = r.route.toString();
      if (text) {
        let br = JSON.parse(text);
        rArray.push(br)
      }
    }
    console.log(rArray)
    state.rArray = rArray
    state.pArray = pArray
    state.loaded = true
  },
  setPlaceDetail(state, payload) {
    state.placeDetail = payload
    state.loaded = true
  },
  setLoaded(state, payload) {
    state.loaded = payload
  },
  setActivities(state, payload) {
    state.activities = payload
  },
  setSelectedActivity(state, payload) {
    state.selectedActivity = payload
  },
  setRankData(state, payload) {
    state.rankData = payload
  },
  setIndexesData(state, payload) {
    const {data, type} = payload
    state.index_tabs[type] = [].concat(data)
  },
  setPickedData(state, payload) {
    const {data, type} = payload
    state.picked_tabs[type] = [].concat(data)
  },
  setVote(state, payload) {
    const {obj, idx} = payload
    state.index_tabs[idx].map(cd => {
      if (cd.code === obj.code) {
        cd.voted = !cd.voted;
      }
    })
  },
  searchData(state, {keyWord, type}) {
    if (keyWord.trim() === '') {
      state.currentIndexData = state.index_tabs[type]
    } else {
      let tempList = [];
      for (let item of state.currentIndexData = state.index_tabs[type]) {
        if (item.name.indexOf(keyWord) !== -1 || item.code.indexOf(keyWord.toUpperCase()) !== -1) {
          tempList.push({...item});
        }
      }
      state.currentIndexData = tempList
    }
  },
}

export const actions = {
  async getPostDetail({commit},{postId}) {
    commit('setLoaded',false)
    return this.$axios.get(`/posts/getPostDetails`,{params: { postId } }).then(res => {
      if (res.data.code === 0 && res.data.data.length>0) {
        commit('setPostDetail', res.data.data[0])
        return res.data
      } else {
        commit('setPostDetail', {})
        handleErrorRes(res)
        return []
      }
    })
  },
  async getPostRoute({commit},{postId}) {
    commit('setLoaded',false)
    return this.$axios.get(`/posts/getPostRoute`,{params: { postId } }).then(res => {
      if (res.status === 200 && res.data.length>0) {
        commit('setPostRoute', res.data[0])
        return res.data
      } else {
        commit('setPostRoute', {})
        handleErrorRes(res)
        return []
      }
    })
  },
  async getPlaceDetail({commit},{placeId}) {
    commit('setLoaded',false)
    return this.$axios.get(`/posts/getPlaceDetails`,{params: { placeId } }).then(res => {
      if (res.status === 200 && res.data.length>0) {
        commit('setPlaceDetail', res.data[0])
        return res.data[0]
      } else {
        commit('setPlaceDetail', [])
        handleErrorRes(res)
        return []
      }
    })
  },
  //排行榜
  getRank({commit},{timeCode}) {
    this.$axios.post(`/ind/voteRank`, {timeCode,page:1,limit:200}).then(res => {
      if (res.data.code === 0) {
        commit('setRankData', res.data)
      } else {
        commit('setRankData', {})
        handleErrorRes(res)
      }
    })
  },
  //获取指数列表
  getIndexes({commit, state}, {timeCode, type, fresh = false}) {
    commit('setSelectedActivity',type)
    if (state.index_tabs[type].length === 0||fresh===true) {
      return this.$axios.get(`/ind/list/${timeCode}`).then(res => {
        if (res.data.code === 0) {
          commit('setIndexesData', {data: res.data.data, type})
          return res.data.data
        } else {
          commit('setIndexesData', {data: [], type})
          handleErrorRes(res)
        }
      })
    }
  },
  storeVote({commit, state}, payload) {
    commit('setVote', payload)
  },
  storeActivity({commit, state}, payload) {
    commit('setSelectedActivity', payload)
  },
  //指数投票request
  indexVote(context, indexInfos) {
    return this.$axios.post(`/ind/vote`, indexInfos);
  },
  //指数投票request
  indexVoteSingle(context, indexInfo) {
    return this.$axios.post(`/ind/voteInd`, indexInfo);
  },
  //获取我的指数列表
  getMyPicker({commit, state}, {timeCode, type}) {
    commit('setSelectedActivity',type)
    return this.$axios.get(`/ind/myVotes/${timeCode}`).then(res => {
      if (res.data.code === 0) {
        commit('setPickedData', {data: res.data.data, type})
        return res.data.data
      } else {
        commit('setPickedData', {data: [], type})
        handleErrorRes(res)
      }
    })
  },
  //删除指数
  deleteMyPickedIndex(context, id) {
    return this.$axios.post(`/ind/votePatch/${id}`);
  },
  // 指数详情
  getIndexDetail(context, code) {
    return this.$axios.get(`/ind/detail/${code}`);
  },
  // 指数评论列表
  getIndexMsgList(context, code) {
    return this.$axios.get(`/ind/msgList//${code}`);
  },
  //指数评论
  submitMsg(context, indexInfos) {
    return this.$axios.post(`/ind/submitMsg`, indexInfos);
  },
}
