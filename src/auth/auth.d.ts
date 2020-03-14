import Vue from 'vue'

interface Auth0Data {
  loading: boolean;
  isAuthenticated: boolean;
  user: any;
  auth0Client: any;
  popupOpen: boolean;
  error?: Error;
}

declare module 'vue/types/vue' {
  interface Auth0 extends Vue {
    $data: Auth0Data
    loginWithRedirect(o: RedirectLoginOptions): Promise<void>
  }
}
