import sha1 from "js-sha1";
import {Notify} from 'vant';
import {createRouter} from '@/plugins/router'
import CryptoJS from 'crypto-js'

export function scrollBehavior(to, from, savedPosition) {
  if (savedPosition) {
    return savedPosition
  }

  let position = {}

  if (to.matched.length < 2) {
    position = {x: 0, y: 0}
  } else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
    position = {x: 0, y: 0}
  }
  if (to.hash) {
    position = {selector: to.hash}
  }
  return position
}

/**
 * Group array with first letter
 * @param array 查询数组
 * @param key 字段key
 * @param firstLetter 是不是以首字母分组
 * @returns {{}}
 */
export function groupWithWord(array, key, firstLetter = true) {
  let resultObj = {};
  for (let i = 0; i < array.length; i++) {
    let currentWord = key ? array[i][key] : array[i];
    if (currentWord) {
      let firstChar = firstLetter ? currentWord[0].toUpperCase() : currentWord.toUpperCase();
      let innerArr = [];
      if (resultObj[firstChar] === undefined) {
        innerArr.push(array[i]);
        resultObj[firstChar] = innerArr
      } else {
        resultObj[firstChar].push(array[i])
      }
    }
  }
  return resultObj
}

/**
 * purl js get url param and value
 * @param key
 * @param url
 * @returns {*}
 */
export function getUrlSearchString(key, url) {
  let str = url.substring(url.indexOf('?'), url.length)
  str = str.substring(1, str.length)
  let arr = str.split('&')
  // eslint-disable-next-line no-new-object
  let obj = new Object()
  for (let i = 0; i < arr.length; i++) {
    let tmpArr = arr[i].split('=')
    obj[decodeURIComponent(tmpArr[0])] = decodeURIComponent(tmpArr[1])
  }
  return obj[key]
}

/**
 * 高亮
 * @param inputString
 * @param keys
 * @returns {*}
 */
export function highlightText(inputString, keys) {
  let placeholder = '!!';
  let s = inputString.replace(new RegExp(/strong>/gi), placeholder);
  for (let i = 0; i < keys.length; i++) {
    let t = keys[i];
    if (t) s = s.replace(new RegExp(t, 'gi'), '<' + placeholder + t + '</' + placeholder);
  }
  return s.replace(new RegExp(placeholder, 'g'), 'strong style=\'color:black\'>');
}

/**
 *
 * @param res
 * @param successMsg
 * @param needBack
 */
export function handleRes(res, successMsg = '成功', needBack = true) {
  let resCode = res.hasOwnProperty('code') ? res.code : res.data.code
  if (resCode === 0) {
    Notify({
      type: 'success', message: successMsg, duration: 1000, onClose: () => {
        if (needBack) {
          window.history.back()
        }
      }
    });
  } else {
    Notify({
      type: 'danger', message: res.data.msg, duration: 1000
    })
  }
}

/**
 *
 * @param res
 * @param errorMsg
 */
export function handleErrorRes(res, errorMsg = '失败') {
  let resCode = res.hasOwnProperty('code') ? res.code : res.data.code
  if (resCode === 1) {
    Notify({
      type: 'danger', message: res.data.msg, duration: 1000
    })
  }
}

/**
 * 注册吊起会话功能
 * @param ticket
 */
export function registerWXChat(ticket) {
  let jst = ticket
  let noncestr = Math.random().toString(36).substring(2, 15)
  let ct = new Date().getTime()
  let url = window.location.href
  let y = `jsapi_ticket=${jst}&noncestr=${noncestr}&timestamp=${ct}&url=${url}`
  let signature = sha1(y)
  wx.config({
    beta: true,// 必须这么写，否则wx.invoke调用形式的jsapi会有问题
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: 'wwe407a9efde1708d9', // 必填，企业微信的corpID
    timestamp: ct, // 必填，生成签名的时间戳
    nonceStr: noncestr, // 必填，生成签名的随机串
    signature: signature,// 必填，签名，见 附录-JS-SDK使用权限签名算法
    jsApiList: ['openEnterpriseChat'] // 必填，需要使用的JS接口列表，凡是要调用的接口都需要传进来
  });
  return {y, signature}
}

export function registerCorpWXChat(ticket) {
  try {
    let jst = 'Ajtqp5BeH+RRSskwMM+dPg=='
    let noncestr = Math.random().toString(36).substring(2, 15)
    let ct = new Date().getTime()
    let url = window.location.href
    let y = `jsapi_ticket=${jst}&noncestr=${noncestr}&timestamp=${ct}&url=${url}`
    let signature = sha1(y)
    wx.agentConfig({
      corpid: 'wwe407a9efde1708d9', // 必填，企业微信的corpid，必须与当前登录的企业一致
      agentid: 1000143, // 必填，企业微信的应用id （e.g. 1000247）
      timestamp: ct, // 必填，生成签名的时间戳
      nonceStr: noncestr, // 必填，生成签名的随机串
      signature: signature,// 必填，签名，见附录-JS-SDK使用权限签名算法
      jsApiList: ['createCorpGroupChat', 'selectCorpGroupContact'], //必填，传入需要使用的接口名称
      success: function (res) {
        alert(JSON.stringify(res))
      }, fail: function (res) {
        alert(JSON.stringify(res))
        if (res.errMsg.indexOf('function not exist') > -1) {
          alert('版本过低请升级')
        }
      }
    });
  } catch (e) {
    alert(JSON.stringify(e))
  }
}

export function openWXChat(persons) {
  wx.openEnterpriseChat({
    // 注意：userIds和externalUserIds至少选填一个。内部群最多2000人；外部群最多500人；如果有微信联系人，最多40人
    userIds: persons,    //参与会话的企业成员列表，格式为userid1;userid2;...，用分号隔开。
    externalUserIds: '', // 参与会话的外部联系人列表，格式为userId1;userId2;…，用分号隔开。
    groupName: '',  // 会话名称。单聊时该参数传入空字符串""即可。
    chatId: "", // 若要打开已有会话，需指定此参数。如果是新建会话，chatId必须为空串
    success: function (res) {
      var chatId = res.chatId; //返回当前群聊ID，仅当使用agentConfig注入该接口权限时才返回chatId
      // 回调
    }, fail: function (res) {
      if (res.errMsg.indexOf('function not exist') > -1) {
        alert('版本过低请升级')
      }
    }
  });
}

export function enc(val) {
  let key = CryptoJS.enc.Hex.parse('476a3640232425397a71414232394132476a3640232425397a71414232394132')
  let iv = CryptoJS.enc.Hex.parse('476a3630303130397a71414243444544')
  let enc = CryptoJS.AES.encrypt(val, key, {
    iv: iv, mode: CryptoJS.mode.CBC, ding: CryptoJS.pad.Pkcs7
  })
  let enced = enc.ciphertext.toString()
  return enced
}

export function openCorpWXChat(person) {
  try {
    wx.invoke("createCorpGroupChat", {
      groupName: "",  // 必填，会话名称。单聊时该参数传入空字符串""即可。
      userIds: [person],    //参与会话的企业成员列表，仅自建应用使用，第三方应用会忽略该字段
      openUserIds: [person],// 参与会话的企业成员列表，仅第三方应用使用，自建应用会忽略该字段
      externalUserIds: [person], // 外部联系人id
      corpGroupUserIds: [ // 非必填， 参与会话的互联企业/上下游成员列表
        {
          corpId: 'wx3c53004c9f012989',				 // 企业CORPID
          userId: person,				 // 成员ID，仅自建应用使用
          openUserId: person			 // 成员OPEN_USERID，仅第三方应用使用
        },]
    }, function (res) {
      alert(JSON.stringify(res))
      if (res.err_msg == "createCorpGroupChat:ok") {
        var chatId = res.chatId;
      }
    });
  } catch (e) {
    alert(JSON.stringify(e))
  }
}

export function selectCorpWXUser(person) {
  try {
    wx.invoke("selectCorpGroupContact", {
      fromDepartmentId: 0,// 必填，表示打开的通讯录从指定的部门开始展示，-1表示打开的通讯录从自己所在部门开始展示, 0表示从最上层开始。移动端，当需要展开的部门不在应用可见范围内，则从应用的可见范围开始展开。
      mode: "single",// 必填，选择模式，single表示单选，multi表示多选
      type: ["department", "user"],// 必填，选择限制类型，指定department、user中的一个或者多个
      selectedDepartmentIds: [],// 非必填，已选部门ID列表。用于多次选人时可重入
      selectedUserIds: [],// 非必填，仅自建应用使用，第三方应用会忽略该字段，已选用户ID列表。用于多次选人时可重入
      selectedOpenUserIds: [],// 非必填，仅第三方应用使用，自建应用会忽略该字段，已选用户ID列表。用于多次选人时可重入
      selectedChainDepartmentIds: [		// 非必填，已选上下游部门ID列表。用于多次选人时可重入

      ], selectedChainUserIds: [ // 非必填，已选上下游用户ID列表。用于多次选人时可重入
        {
          corpId: "wx3c53004c9f012989",				 // 企业CORPID
          userId: person,				 // 成员ID，仅自建应用返回
          openUserId: person				 // 成员OPEN_USERID，仅第三方应用返回
        },

      ], selectedCorpGroupDepartmentIds: [		// 非必填，已选企业互联部门ID列表。用于多次选人时可重入

      ], selectedCorpGroupUserIds: [ // 非必填，已选企业互联用户ID列表。用于多次选人时可重入

      ]
    }, function (res) {
      alert(JSON.stringify(res))
    });
  } catch (e) {
    alert(JSON.stringify(e))
  }
}

export function forbiddenCharRegex() {
  return new RegExp(/[!@#\$%\^\&*\)\(+=.]/g)
}

export const customerConfig = {
  '上市企业': 'success', '非上市企业': 'warning', '金融机构': 'primary', '其他': 'danger'
}

export const provices = ['北京市', '天津市', '河北省', '山西省', '内蒙古自治区', '辽宁省', '吉林省', '黑龙江省', '上海市', '江苏省', '浙江省', '安徽省', '福建省', '江西省', '山东省', '河南省', '湖北省', '湖南省', '广东省', '广西壮族自治区', '海南省', '重庆市', '四川省', '贵州省', '云南省', '西藏自治区', '陕西省', '甘肃省', '青海省', '宁夏回族自治区', '新疆维吾尔自治区']

export function debounce(fn, delay) {
  let timeoutID = null
  return function () {
    clearTimeout(timeoutID)
    let args = arguments
    let that = this
    timeoutID = setTimeout(function () {
      fn.apply(that, args)
    }, delay)
  }
}
