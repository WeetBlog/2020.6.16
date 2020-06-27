import { reqGetSweetInfo ,reqAddUserInfo} from '../../api'

export default {
    state: {
        userInfo: {}
    },
    mutations: {
        receive_userInfo(state, userInfo) {
            state.userInfo = userInfo
        }
    },
    actions: {
        async getUserInfo({ commit }) {
            // 向后台请求用户信息
            const result = await reqGetSweetInfo()
            if (result) {
                const userInfo = result
                commit('receive_userInfo', userInfo)
            }
        },
        async addUserInfo({ commit },{userInfo,fun}) {
            // 向后台提交用户信息
            let data = JSON.stringify(userInfo)
            const result = await reqAddUserInfo(data)
            if(result){
                commit('receive_userInfo', result)
                fun(true)
            }else{
                fun(false)
            }
        }
    }
}
