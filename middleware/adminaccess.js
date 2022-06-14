export default function ({$auth, redirect}) {
   if ($auth.user.isAdmin!=1 && $auth.user.isAdmin!=2 ) {
      return redirect('/');
   } 
}