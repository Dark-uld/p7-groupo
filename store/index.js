import axios from 'axios'


export const state = () => ({
    postLiked:[],
})

export const getters = () => ({
})

export const actions = {
  async fetchLikes ({ commit }) {
    const response = await axios.get('http://localhost:3000/api/likes')
    commit('setLikes', response.data)
  },
}


export const mutations = {
    setLikes: (state, likes) => (state.postLiked = likes),
}




