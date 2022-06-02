export default function ({$auth, redirect}) {
   if ($auth.user.isAdmin!=1) return redirect('/posts')
}