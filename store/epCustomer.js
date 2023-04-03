import {handleErrorRes} from "@/utils/utils";

export const state = () => ({
  epCustomerLoading: true,
  epCustomers: [],
  zjhIndustries: [],
  zjhIndustries2: [],
  windIndustries: [],
  windIndustries2: [],
  ipoNames: [],
  epCustomerDetail: {}
})
export const getters = {
  getEpCustomerLoading(state) {
    return state.epCustomerLoading
  },
  getEpCustomers(state) {
    return state.epCustomers
  },
  getZjhIndustries(state) {
    return state.zjhIndustries
  },
  getZjhIndustries2(state) {
    return state.zjhIndustries2
  },
  getWindIndustries(state) {
    return state.windIndustries
  },
  getWindIndustries2(state) {
    return state.windIndustries2
  },
  getIpoNames(state) {
    return state.ipoNames
  },
  getEpCustomerDetail(state) {
    return state.epCustomerDetail
  }
}
export const mutations = {
  setEpCustomerLoading(state, payload) {
    state.epCustomerLoading = payload
  },
  setEpCustomers(state, payload) {
    state.epCustomers = payload
  },
  setZjhIndustries(state, payload) {
    payload.map(p => p.selected = false)
    state.zjhIndustries = payload
  },
  setWindIndustries(state, payload) {
    payload.map(p => p.selected = false)
    state.windIndustries = payload
  },
  setIpoNames(state, payload) {
    state.ipoNames = payload
  },
  setEpCustomerDetail(state, payload) {
    state.epCustomerDetail = payload
  },
  updateWindIndustries(state, payload) {
    state.windIndustries.map(w => {
      if (w.industriesalias === payload.industriesalias) {
        w.selected = !w.selected
        let l3List = JSON.parse(JSON.stringify(w.l3List))
        l3List.map(l3 => l3.selected = false)
        state.windIndustries2 = l3List
      } else {
        w.selected = false
      }
    })
  },
  setWindIndustries2(state, payload) {
    state.windIndustries2.map(w => {
      if (w.industriesalias === payload.industriesalias) {
        w.selected = !w.selected
      }
    })
  },
  updateZjhIndustries(state, payload) {
    state.zjhIndustries.map(w => {
      if (w.industriesalias === payload.industriesalias) {
        w.selected = !w.selected
        let l3List = JSON.parse(JSON.stringify(w.l3List))
        l3List.map(l3 => l3.selected = false)
        state.zjhIndustries2 = l3List
      } else {
        w.selected = false
      }
    })
  },
  setZjhIndustries2(state, payload) {
    state.zjhIndustries2.map(w => {
      if (w.industriesalias === payload.industriesalias) {
        w.selected = !w.selected
      }
    })
  },
  resetAll(state,payload){
    state.windIndustries.map(w => w.selected = false);
    state.windIndustries2 = []
    state.zjhIndustries.map(w => w.selected = false);
    state.zjhIndustries2 = []
  }
}
export const actions = {
  queryEpCustomer({commit}, {query}) {
    commit('setEpCustomerLoading', true)
    let data = {
      "page": 1,
      "limit": 500,
    };
    if (query.hasOwnProperty('name')) {
      data = {name: query.name, ...data}
    }
    if (query.hasOwnProperty('ipoLuName')) {
      data = {ipoLuName: query.ipoLuName, ...data}
    }
    if (query.hasOwnProperty('province')) {
      data = {province: query.province, ...data}
    }
    if (query.hasOwnProperty('ipoListboard')) {
      data = {ipoListboard: query.ipoListboard, ...data}
    }
    if (query.hasOwnProperty('windCompindName1')) {
      data = {windCompindName1: query.windCompindName1, ...data}
    }
    if (query.hasOwnProperty('windCompindName2')) {
      data = {windCompindName2: JSON.stringify(query.windCompindName2), ...data}
    }
    if (query.hasOwnProperty('zjhCompindName1')) {
      data = {csrcCompindName1: query.zjhCompindName1, ...data}
    }
    if (query.hasOwnProperty('zjhCompindName2')) {
      data = {csrcCompindName2: JSON.stringify(query.zjhCompindName2), ...data}
    }
    this.$axios.post('/com/fpcompany/list', data).then(res => {
      if (res.data.code === 0) {
        commit('setEpCustomers', res.data.page.list)
      } else {
        commit('setEpCustomers', [])
        handleErrorRes(res)
      }
      commit('setEpCustomerLoading', false)
    })
  },

  queryIndustries({commit}) {
    this.$axios.get('/com/fpcompany/ashareCode').then(res => {
      if (res.data.code === 0) {
        commit('setZjhIndustries', res.data.data['zjh'])
        commit('setWindIndustries', res.data.data['wind'])
      } else {
        commit('setZjhIndustries', [])
        commit('setWindIndustries', [])
        handleErrorRes(res)
      }
    })
  },
  queryIpoNames({commit}) {
    this.$axios.get(`/com/fpcompany/matchComName`).then(res => {
      if (res.data.code === 0) {
        commit('setIpoNames', res.data.data)
      } else {
        commit('setIpoNames', [])
        handleErrorRes(res)
      }
    })
  },

  queryEpCustomerDetail({commit}, {creditCode}) {
    commit('setEpCustomerLoading', true)
    this.$axios.get(`/com/fpcompany/info/${creditCode}`).then(res => {
      if (res.data.code === 0) {
        commit('setEpCustomerDetail', res.data.data)
      } else {
        commit('setEpCustomerDetail', [])
        handleErrorRes(res)
      }
      commit('setEpCustomerLoading', false)
    })
  },

  updateStatus({commit}, {flag, item}) {
    if (flag === 0) {
      commit('updateWindIndustries', item)
    } else if (flag === 1) {
      commit('updateZjhIndustries', item)
    } else if (flag === 2) {
      commit('setWindIndustries2', item)
    } else if (flag === 3) {
      commit('setZjhIndustries2', item)
    }
  },

  resetFilter({commit}){
    commit('resetAll')
  }
}
