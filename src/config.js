const DEV_CONFIG = {
    apiUrl: 'http://localhost:3000'
}

const PROD_CONFIG = {
    apiUrl: 'http://localhost:3000'
}

const isProd = process.env.NODE_ENV === 'production';

let config = isProd ? PROD_CONFIG : DEV_CONFIG;

export default config;