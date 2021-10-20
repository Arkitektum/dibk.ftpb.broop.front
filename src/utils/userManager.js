// Dependencies
import { createUserManager } from 'redux-oidc';

// Helpers
import { getEnvironmentVariable } from 'helpers/environmentVariableHelpers.js';

const configIsLoaded = () => {
  return new Promise((resolve, reject) => {
    if (getEnvironmentVariable('oidc_client_id')) {
      const userManagerConfig = {
        client_id: getEnvironmentVariable('oidc_client_id'),
        authority: getEnvironmentVariable('oidc_authority'),
        redirect_uri: getEnvironmentVariable('oidc_redirect_uri'),
        post_logout_redirect_uri: getEnvironmentVariable('oidc_post_logout_redirect_uri'),
        response_type: "code",
        scope: "openid profile",
        acr_values: "Level4",
        ui_locales: "nb",
        resource: 'arkitektum:ansakointernalapi',
        loadUserInfo: false,
        revokeAccessTokenOnSignout: true
      }
      resolve(userManagerConfig);
    } else {
      window.setTimeout(() => {
        resolve(configIsLoaded());
      }, 100)
    }
  });
}
const getUserManagerConfigWhenReady = configIsLoaded().then((userManagerConfig) => {
  return createUserManager(userManagerConfig);
})

export default getUserManagerConfigWhenReady;
