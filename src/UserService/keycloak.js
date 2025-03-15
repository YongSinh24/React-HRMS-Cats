import Keycloak from 'keycloak-js';
import { config } from '../share/helper';
const keycloakConfig = {
    url: config.base_keyclock,
    realm: 'cats',
    clientId: 'hrms-react',
};

const keycloak = new Keycloak(keycloakConfig);

export default keycloak;