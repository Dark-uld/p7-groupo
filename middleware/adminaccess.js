export default function ({store, redirect}) {
   if (!store.state.userCon.isAdmin) return redirect('/posts')
}