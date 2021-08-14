import {router} from "umi";

export default ({children, match, route}) => {
  if (!localStorage.username && match.path !== '/login') {
    router.push('/login')
  }

  if (localStorage.username && match.path === '/login') {
    router.push('/')
  }

  if (route.authority && !route.authority.includes(localStorage.authority)) {
    router.push('/')
  }

  return children
}
