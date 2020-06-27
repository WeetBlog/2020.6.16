import Vue from 'vue'
import Vuex from 'vuex'

import user from '@/store/modules/user'
import blog from '@/store/modules/blog'

Vue.use(Vuex)

const mutations = {}
const actions = {}
const getters = {}

export default new Vuex.Store({
    mutations,
    actions,
    getters,
    modules:{
        user,blog
    }
})