export const state = () => ({
    like: 0,
    postLiked:[]
  })

export const mutations = {
    liking(state,value) {
      let alreadyLiked = false
      let postId=""
      for(let i=0; i < state.postLiked.length;i++){
        if(state.postLiked[i]==value){
          alreadyLiked=true
          postId=i
        }
      }
      if(!alreadyLiked){
        state.postLiked.push(value)
      } else {
        state.postLiked.splice(postId,1)
      }
    },
    ajoutLike(state, value){
      state.postLiked.push(value)
    },
    retireLike(state, value){
      for(let i=0; i < state.postLiked.length;i++){
        if (state.postLiked[i]==value){
          if(i==0){
            state.postLiked.splice(0,1)
          } else if ( i == state.postLiked.length-1){
            state.postLiked.splice(i,1)
          } else {
            state.postLiked.splice(i-1,1)
          }
        }
      }
    }
}
