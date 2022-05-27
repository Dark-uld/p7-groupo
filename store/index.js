import axios from 'axios'


export const state = () => ({
    postLiked:[],
    userCon:[]
})

export const getters = () => ({
})

export const actions = {
  async fetchLikes ({ commit }) {
    const response = await axios.get('http://localhost:3000/api/likes')
    commit('setLikes', response.data)
  },
  async fetchUser ({commit, value}) {
    const response = await axios.get('http://localhost:3000/api/auth/user/'+ value)
    commit('setUser', response.data)
  }
}


export const mutations = {
    setLikes: (state, likes) => (state.postLiked = likes),
    setUser: (state, user) => (state.userCon = user)
}




