export default function ({ route, redirect }) {
  if (route.fullPath === '/') { // /search is index page
    redirect('/search')
  }
  if (!localStorage.getItem('token')) { // if not authorized => /login
    redirect('/login')
  }
}
