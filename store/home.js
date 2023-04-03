import {groupWithWord, handleRes} from "@/utils/utils";
import {Notify} from 'vant';

export const state = () => ({
  businessTypes: [], bizSystems: [], bizArea: [], tags: [], focus: [],
  activeTab: 'a',
  mine: '',
  mineLoading: true,
  bizLoading: true,
  industries: [],
  groupedTypes:{},
  userDetail:''
})

export const getters = {
  getBusinessTypes(state) {
    return state.businessTypes
  }, getBizSystems(state) {
    return state.bizSystems
  }, getBizArea(state) {
    return state.bizArea
  }, getTags(state) {
    return state.tags
  }, getFocus(state) {
    return state.focus
  }, getActiveTab(state) {
    return state.activeTab
  }, getMine(state) {
    return state.mine
  }, getMineLoading(state) {
    return state.mineLoading
  }, getBizLoading(state) {
    return state.bizLoading
  }, getIndustries(state) {
    return state.industries
  },getUserDetail(state) {
    return state.userDetail
  },getGroupedTypes(state) {
    return state.groupedTypes
  },
}

export const mutations = {
  addBizTypes(state, payload) {
    if(state.userDetail!=='') {
      state.businessTypes = payload.map(by => {
        by.selected = false
        state.userDetail.types.map(dt=>{
          if(by.id===dt.id){
            by.selected = true
          }
        })
        return by
      })
    }else{
      state.businessTypes = payload
    }
  }, addBizSystems(state, payload) {
    state.bizSystems = payload
  }, addBizArea(state, payload) {
    if(state.userDetail!==''){
      state.bizArea = payload.map(by => {
        by.selected = false
        state.userDetail.areas.map(dt=>{
          if(by.id===dt.id){
            by.selected = true
          }
        })
        return by
      })
    }else{
      state.bizArea = payload
    }
  }, addTags(state, payload) {
    state.tags = payload
  }, addIndustries(state, payload) {
    if(state.userDetail!=='') {
      state.industries = payload.map(by => {
        by.selected = false
        state.userDetail.industries.map(dt=>{
          if(by.id===dt.id){
            by.selected = true
          }
        })
        return by
      })
    }else{
      state.industries = payload
    }

  }, addFocus(state, payload) {
    state.focus = payload
  }, filterTags(state, payload) {
    state.tags = state.tags.filter(t => t.labelName.indexOf(payload) !== -1)
  }, addActiveTab(state, payload) {
    state.activeTab = payload
  }, addMine(state, payload) {
    state.mine = payload
    sessionStorage.setItem('mine',payload.name)
  }, addMineLoading(state, payload) {
    state.mineLoading = payload
  }, addBizLoading(state, payload) {
    state.bizLoading = payload
  }, setTypeSelected(state, {item, flag}) {
    state.businessTypes = state.businessTypes.map(bt => {
      if (bt.id === item.id) {
        bt.selected = flag
      }
      return bt
    })
  }, setIndustrySelected(state, {item, flag}) {
    state.industries = state.industries.map(bt => {
      if (bt.id === item.id) {
        bt.selected = flag
      }
      return bt
    })
  },setAreaSelected(state, {item, flag}) {
    state.bizArea = state.bizArea.map(bt => {
      if (bt.id === item.id) {
        bt.selected = flag
      }
      return bt
    })
  },
  addUserDetail(state, payload) {
    state.userDetail = payload
  },
  setGroupedTypes(state, {groupedTypes}) {
    state.groupedTypes = groupedTypes
  },
  updateGroupedTypes(state, {idx,item}) {
    state.groupedTypes[idx].map(bt => {
      if (bt.id === item.id) {
        bt.selected = !item.selected
      }
      return bt
    })
  },
}

export const actions = {
  queryMyself({commit}) {
    commit('addMineLoading', true)
    const item = JSON.parse(localStorage.getItem('fpfp'));
    this.$axios.get(`/person/infoBase/${item.ewechatId}`).then(res => {
      if (res.data.code === 0) {
        if(res.data.data){
          commit('addMine', res.data.data)
        }
      }
      commit('addMineLoading', false)
    })
  },
  //查询业务所有
  queryBiz({commit}) {
    commit('addBizLoading', true)
    this.$axios.get('/person/index').then(res => {
      if (res.data.code === 0) {
        commit('addBizTypes', res.data.data.type)
        commit('addBizSystems', res.data.data.arch)
        commit('addBizArea', res.data.data.area)
        commit('addBizLoading', false)
      } else {
        Notify(res.data.msg);
      }
    })
  },
  //查询展业人员列表
  queryUserDetail({commit}, {id}) {
    this.$axios.get(`/person/info/${id}`).then(res=>{
      if (res.data.code === 0) {
        if(res.data.data) {
          commit('addUserDetail', res.data.data)
        }
      }
      return res
    })
  },
  //查询业务类型列表
  queryBizTypes({commit}) {
    return this.$axios.get('/biztype/list').then(res => {
      if (res.data.code === 0) {
        commit('addBizTypes', res.data.data)
        return res.data.data
      } else {
        Notify(res.data.msg);
      }
    })
  },
  queryOwnBizTypes({commit}) {
    return this.$axios.post('/biztype/listOwn', {}).then(res => {
      if (res.data.code === 0) {
        commit('addBizTypes', res.data.list)
        return res.data.list
      }
      else {
        Notify(res.data.msg);
      }
    })
  },
  //查询业务体系列表
  queryBizSystems({commit}) {
    this.$axios.get('/bizarch/list').then(res => {
      if (res.data.code === 0) {
        commit('addBizSystems', res.data.data)
      } else {
        Notify(res.data.msg);
      }
    })
  }, //查询展业列表
  queryBizArea({commit}) {
    this.$axios.get('/bizarea/list').then(res => {
      if (res.data.code === 0) {
        commit('addBizArea', res.data.data)
        return res.data.data
      } else {
        Notify(res.data.msg);
      }
    })
  }, //查询标签
  queryTags({commit}, payload) {
    return this.$axios.post('/book/page', {"page": 1, "limit": 100}).then(res => {
      if (res.data.code === 0) {
        commit('addTags', res.data.data.list)
        return res.data.data.list
      } else {
        Notify(res.data.msg);
      }
    })
  },
  queryIndustry({commit}, payload) {
    return this.$axios.get('/bizIndustry/list',).then(res => {
      if (res.data.code === 0) {
        let result = res.data.data
        commit('addIndustries', result)
        return result
      } else {
        Notify(res.data.msg);
      }
    })
  }, //查询关注
  queryFocus({commit}, payload) {
    return this.$axios.post('/follow/page', {"page": 1, "limit": 500}).then(res => {
      if (res.data.code === 0) {
        const topPerson = res.data.data.list.filter(obj => obj.isTop === 1)
        const normalPerson = groupWithWord(res.data.data.list.filter(obj => obj.isTop === 0), 'businessPersonId')
        commit('addFocus', [topPerson, normalPerson])
        return [topPerson, normalPerson]
      } else {
        Notify(res.data.msg);
      }
    })
  }, //删除关注
  async removeFocus({commit}, {busId}) {
    const res = await this.$axios.get(`/follow/cancel/${busId}`)
    if (res.data.code === 0) {
      await this.dispatch('home/queryFocus')
    } else {
      Notify(res.data.msg);
    }
  },//取消置顶
  async cancelTop({commit}, {busId}) {
    const res = await this.$axios.get(`/follow/topCancel/${busId}`)
    if (res.data.code === 0) {
      await this.dispatch('home/queryFocus')
    } else {
      Notify(res.data.msg);
    }
  },//置顶
  async addTop({commit}, {busId}) {
    const res = await this.$axios.get(`/follow/top/${busId}`)
    if (res.data.code === 0) {
      await this.dispatch('home/queryFocus')
    } else {
      Notify(res.data.msg);
    }
  },//删除标签组
  async removeTag({commit}, {id}) {
    const res = await this.$axios.get(`/book/delete/${id}`)
    if (res.data.code === 0) {
      await this.dispatch('home/queryTags')
    } else {
      Notify(res.data.msg);
    }
  },//Add tag
  async addTag({commit}, {tagName}) {
    const res = await this.$axios.post('/book/submit/', {"labelName": tagName})
    if (res.data.code === 0) {
      await this.dispatch('home/queryTags')
      return res.data.code
    } else {
      Notify(res.data.msg);
    }
  },
  async saveBizArea({commit}, {selectedAreas}) {
    return await this.$axios.post('/bizarea/patch', selectedAreas).then(res=>{
      handleRes(res)
    })
  },
  async saveBizType({commit}, {selectedTypes}) {
    return await this.$axios.post('/biztype/patch', selectedTypes).then(res=>{
      handleRes(res)
    })
  },
  async saveIndustry({commit}, {selectedIndustries}) {
    return await this.$axios.post('/bizIndustry/patch', selectedIndustries).then(res=>{
      handleRes(res)
    })
  },
  async filterTags({commit}, searchVal) {
    if (searchVal !== '') {
      commit('filterTags', searchVal)
    } else {
      await this.dispatch('home/queryTags')
    }
  },
  userLogin({commit}, {code}) {
    return this.$axios.post('/sys/wxLogin/', {code}).then(res => {
      return res
    })
  },
  addActiveTab({commit}, {activeTab}) {
    commit('addActiveTab', activeTab)
  },
  setTypeSelected({commit}, {item, flag}) {
    commit('setTypeSelected', {item, flag})
  },
  setIndustrySelected({commit}, {item, flag}) {
    commit('setIndustrySelected', {item, flag})
  },
  setAreaSelected({commit}, {item, flag}) {
    commit('setAreaSelected', {item, flag})
  },
  saveGroupedTypes({commit}, {groupedTypes}) {
    commit('setGroupedTypes', {groupedTypes})
  },
  updateGroupedTypes({commit}, {idx,item}) {
    commit('updateGroupedTypes', {idx,item})
  },

}
