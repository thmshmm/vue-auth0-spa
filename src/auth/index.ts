import _Vue from 'vue'
import createAuth0Client from '@auth0/auth0-spa-js'
import { Auth0 } from 'vue/types/vue'
import { Auth0Data } from './auth'

/** Define a default action to perform after authentication */
// eslint-disable-next-line
const DEFAULT_REDIRECT_CALLBACK = (appState: any): void => {
  window.history.replaceState({}, document.title, window.location.pathname)
}

let instance: Auth0

/** Returns the current instance of the SDK */
export const getInstance = () => instance

function useAuth0({
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  redirectUri = window.location.origin,
  ...options
}): Auth0 {
  if (instance) return instance

  const data: Auth0Data = {
    loading: true,
    isAuthenticated: false,
    user: {},
    auth0Client: undefined,
    popupOpen: false,
    error: undefined
  }

  instance = new _Vue({
    data() {
      return data
    },
    methods: {
      /** Authenticates the user using a popup window */
      async loginWithPopup(o: PopupLoginOptions) {
        this.popupOpen = true;

        try {
          await this.auth0Client.loginWithPopup(o);
        } catch (e) {
          // eslint-disable-next-line
          console.error(e);
        } finally {
          this.popupOpen = false;
        }

        this.user = await this.auth0Client.getUser();
        this.isAuthenticated = true;
      },
      /** Handles the callback when logging in using a redirect */
      async handleRedirectCallback() {
        this.loading = true;
        try {
          await this.auth0Client.handleRedirectCallback();
          this.user = await this.auth0Client.getUser();
          this.isAuthenticated = true;
        } catch (e) {
          this.error = e;
        } finally {
          this.loading = false;
        }
      },
      /** Authenticates the user using the redirect method */
      loginWithRedirect(o: RedirectLoginOptions): Promise<void> {
        return this.auth0Client.loginWithRedirect(o);
      },
      /** Returns all the claims present in the ID token */
      getIdTokenClaims(o: getIdTokenClaimsOptions) {
        return this.auth0Client.getIdTokenClaims(o);
      },
      /** Returns the access token. If the token is invalid or missing, a new one is retrieved */
      getTokenSilently(o: GetTokenSilentlyOptions) {
        return this.auth0Client.getTokenSilently(o);
      },
      /** Gets the access token using a popup window */
      getTokenWithPopup(o: GetTokenWithPopupOptions) {
        return this.auth0Client.getTokenWithPopup(o);
      },
      /** Logs the user out and removes their session on the authorization server */
      logout(o: LogoutOptions) {
        return this.auth0Client.logout(o);
      }
    },
    /** Use this lifecycle method to instantiate the SDK client */
    async created() {
      // Create a new instance of the SDK client using members of the given options object
      this.auth0Client = await createAuth0Client({
        domain: options.domain,
        // eslint-disable-next-line
        client_id: options.clientId,
        audience: options.audience,
        // eslint-disable-next-line
        redirect_uri: redirectUri
      })

      try {
        // If the user is returning to the app after authentication..
        if (
          window.location.search.includes("code=") &&
          window.location.search.includes("state=")
        ) {
          // handle the redirect and retrieve tokens
          const { appState } = await this.auth0Client.handleRedirectCallback();

          // Notify subscribers that the redirect callback has happened, passing the appState
          // (useful for retrieving any pre-authentication state)
          onRedirectCallback(appState);
        }
      } catch (e) {
        this.error = e;
      } finally {
        // Initialize our internal authentication state
        this.isAuthenticated = await this.auth0Client.isAuthenticated();
        this.user = await this.auth0Client.getUser();
        this.loading = false;
      }
    }
  })

  return instance
}

export const Auth0Plugin = {
  // eslint-disable-next-line
  install(Vue: typeof _Vue, options?: any) {
    console.log('Installing plugin: Auth0Plugin')
    Vue.prototype.$auth = useAuth0(options)
  }
}
