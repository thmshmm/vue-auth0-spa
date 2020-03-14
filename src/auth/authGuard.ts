import { getInstance } from './index'
import { Route } from 'vue-router'

export const authGuard = (to: Route, from: Route, next: () => void) => {
  const authService = getInstance()

  const fn = () => {
    // If the user is authenticated, continue with the route
    if (authService.$data.isAuthenticated) {
      return next()
    }

    // Otherwise, log in
    authService.loginWithRedirect({ appState: { targetUrl: to.fullPath } })
  }

  // If loading has already finished, check our auth state using `fn()`
  if (!authService.$data.loading) {
    return fn()
  }

  // Watch for the loading property to change before we check isAuthenticated
  authService.$watch('loading', (loading: boolean) => {
    if (loading === false) {
      return fn()
    }
  })
}
