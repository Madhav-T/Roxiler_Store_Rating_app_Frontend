import Cookies from 'js-cookie'
import { Route, Redirect } from 'react-router-dom'

const ProtectedRoute = ({ component: Component, path, ...rest }) => {
  const jwtToken = Cookies.get('jwt_token')
  const role = Cookies.get('role')

  if (!jwtToken || !role) {
    return <Redirect to="/login" />
  }

  
  const roleRouteMap = {
    Admin: ['/admin', '/admin/add-store', '/admin/add-user'],
    StoreOwner: ['/store-owner'],
    Normal: ['/user'],
  }

  
  const roleRedirectMap = {
    Admin: '/admin',
    StoreOwner: '/store-owner',
    Normal: '/user',
  }

  const allowedRoutes = roleRouteMap[role] || []
  const isAllowed = allowedRoutes.some(route => path.startsWith(route))

  if (!isAllowed) {
    return <Redirect to={roleRedirectMap[role] || '/login'} />
  }

  return <Route path={path} component={Component} {...rest} />
}

export default ProtectedRoute