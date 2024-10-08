import Keycloak from 'keycloak-js';

const keycloakConfig = {
    url: 'http://localhost:8080/',
    realm: 'development',
    clientId: 'hrms-react',
};

const keycloak = new Keycloak(keycloakConfig);

export default keycloak;