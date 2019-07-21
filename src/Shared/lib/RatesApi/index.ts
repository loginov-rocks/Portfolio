import RatesApi from './RatesApi';

// TODO: Extract URL to the env variables.
const singleton = new RatesApi('https://api.ratesapi.io/api');

export default singleton;
