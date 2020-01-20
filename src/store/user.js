export default {
  namespaced: true,

  state: {
    data: {}
  },

  mutations: {
    set (state, payload){
      state.data = { ...state.data, ...payload }
    },
  },

  getters: {
    // 获取用户当前应显示的头像：有头像显示，没有根据设置的性别显示默认头像，性别也为设置默认显示男头像
    // avatar (state){
    //   var man = require('@img/sub/avatar_man.png')
    //   var woman = require('@img/sub/me_img_HeadPortrait@2x.png')
    //   if(state.data){
    //     return state.data.avatar || (() =>{
    //       var {gender = null} = state.data
    //       if(gender) return gender === 1 ? man : woman
    //       else return man
    //     })()
    //   }else return man
    // }
  },

  actions: {
    // 载入用户数据
    load (store){
      return new Promise((resolve, reject) => {
        if(Object.keys(store.state.data).length){
          resolve(store.state.data)
        }else{
          var userId = localStorage.getItem('user_id')
          return _api('user/getById', { id: userId })
          .then(data => {
            resolve(data)
            store.commit('set', data)
          }).catch(reject)
        }
      })
    }
  }
}