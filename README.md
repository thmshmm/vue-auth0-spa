# vue-auth0-spa
Sample Vue.js SPA with Auth0 integration written in TypeScript.

The code is the result of the [Auth0 - Getting startet guide](https://auth0.com/docs/quickstart/spa/vuejs/01-login) with some modifications to work in TypeScript.

## Project setup
### Auth0 configuration
Create an Auth0 application via the dashboard and set the following Application URI's
* Allowed Callback URLs
* Allowed Logout URLs
* Allowed Web Origins

to 'https://localhost:8080'.

Create a file 'auth_config.json' within the root of the project.

```
{
  "domain": "<AUTH0_APPLICATION_DOMAIN>",
  "clientId": "<AUTH0_APPLICATION_CLIENT_ID>"
}
```

> **NOTE:** Using unconfigured social connections providers like Google or Facebook requires the user to login every time the page is reloaded. To mitigate this, either register a user with Auth0 or setup the respective provider to enable SSO.

### Installs dependencies
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Run your unit tests
```
yarn test:unit
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
