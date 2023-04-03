import {Notify} from "vant";
import {handleErrorRes} from "@/utils/utils";

export const state = () => ({
  userDetail: '',
  detailTags: [],
  detailLoading:true,
  scheduleLoading:true,
  userSchedules:[],
  scheduleHeader:'',
})

export const getters = {
  getUserDetail(state) {
    return state.userDetail
  },
  getDetailTags(state) {
    return state.detailTags
  },
  getDetailLoading(state) {
    return state.detailLoading
  },
  getScheduleLoading(state) {
    return state.scheduleLoading
  },
  getScheduleHeader(state) {
    return state.scheduleHeader
  },
  getUserSchedules(state){
    return state.userSchedules
  }
}

export const mutations = {
  addUserDetail(state, payload) {
    state.userDetail = payload
    state.detailLoading = false
  },
  addUserSchedules(state, payload) {
    state.userSchedules = payload.data.data
    state.scheduleHeader = payload.data.thumbAvatar
    state.scheduleLoading = false
  },
  addDetailTags(state, payload) {
    payload.map(p=>p.id=p.labelId)
    state.detailTags = payload
  },
  userAddToTag(state, payload) {
    const item = JSON.parse(localStorage.getItem('fpfp'));

    let tag = payload
    tag.labelId = payload.id
    tag.ewechatId = item.ewechatId
    tag.ewechatName = item.ewechatId
    state.detailTags = state.detailTags.concat(tag)
    state.detailTags.map((t, idx) => {
      t.labelOrder = idx
    })
  },
  tagRemove(state, payload) {
    state.detailTags = state.detailTags.filter(dt => dt.labelId !== payload.labelId)
  },
  detailDestroy(state) {
    state.detailLoading = true
  },
  scheduleDestroy(state) {
    state.scheduleHeader = ''
    state.userSchedules = []
    state.scheduleLoading = true
  },
}

export const actions = {
  //查询展业人员列表
  queryUserDetail({commit}, {id}) {
    this.$axios.get(`/person/info/${id}`).then(res=>{
      if (res.data.code === 0) {
        commit('addUserDetail', res.data.data)
      }else{
        commit('addUserDetail', {})
        handleErrorRes(res)
      }
    })
  },
  //快速查阅自己是不是研究员
  async queryIsTH({commit}, {id}) {
    let res = await this.$axios.get(`/person/info/${id}`)
    if (res.data.code === 0) {
      return res.data.data.th
    }else{
      handleErrorRes(res)
      return false
    }

  },//查询用户详情基本信息
  queryUserDetailBase({commit}, {id}) {
    this.$axios.get(`/person/infoBase/${id}`).then(res=>{
      if (res.data.code === 0) {
        commit('addUserDetail', res.data.data)
      }else {
        commit('addUserDetail', {})
        handleErrorRes(res)
      }
    })
  },
  //查询用户日程
  queryUserSchedule({commit}, {id}) {
    this.$axios.get(`/userSchedule/view/${id}`).then(res=>{
      if (res.data.code === 0) {
        commit('addUserSchedules', res)
      }else {
        commit('addUserSchedules', [])
        handleErrorRes(res)
      }
    })
  },
  //更改权限
  async changeAuth({commit}, {type,show}) {
    return await this.$axios.get(`/person/bizPatch/${type}/${show}`)
  },
  //更改权限
  async queryAuths({commit}, {type}) {
    return await this.$axios.get(`/person/bizShow/${type}`, {})
  },
  async getPhone({commit},{ewechatId,sign}) {
    return await this.$axios.get(`/person/infoTel/${ewechatId}/${sign}`)
  },
  //关注某人
  async focusHim({commit}, {ewechatId, name}) {
    const res = await this.$axios.post(`/follow/submit`, {
      "businessPersonId": ewechatId,
      "businessPersonName": name,
    })
    if (res.data.code === 0) {
      Notify({
        type: 'success', message: '关注成功',duration:1000
      })
      await this.dispatch('userDetail/queryUserDetail', {id: ewechatId})
    } else {
      Notify(res.data.msg);
    }
  },
  //取消关注某人
  async unFocusHim({commit}, {ewechatId, name}) {
    const res = await this.$axios.get(`/follow/cancel/${ewechatId}`)
    if (res.data.code === 0) {
      Notify({
        type: 'success', message: '取消关注成功',duration:1000
      })
      await this.dispatch('userDetail/queryUserDetail', {id: ewechatId})
    } else {
      Notify(res.data.msg);
    }
  },
  //标签更新
  async saveDetailTag({commit}, {tags,ewechatId,name}) {
    let body = {
      "ewechatId": ewechatId,
      "ewechatName": name,
      "fpBookLabelList": tags
    }
    const res = await this.$axios.post(`/book/submitBatch`,body)
    if (res.data.code === 0) {
      return res
    } else {
      Notify(res.data.msg);
    }
  },
  editTags({commit}, tags) {
    commit('addDetailTags', tags)
  },
  userAddToTag({commit}, {tag}) {
    commit('userAddToTag', tag)
  },
  tagRemove({commit}, {tag}) {
    commit('tagRemove', tag)
  },
  destroy({commit}) {
    commit('detailDestroy')
  },
  destroySchedule({commit}) {
    commit('scheduleDestroy')
  },
}
