import axios from 'axios';

const API_URL = 'http://172.20.28.102/wp-json/wc/v1/';
const CONSUMER_KEY = 'ck_136c17cfa88da5e422e238bb1a7acf77fc66fcd6';
const CONSUMER_SECRET = 'cs_073f41922106c51b6f8e9cebfff83ead24c7b7ba';

const woocommerceApi = axios.create({
    baseURL: API_URL,
    auth: {
        username: CONSUMER_KEY,
        password: CONSUMER_SECRET,
    },
});

export const fetchProducts = async () => {
    try {
        const response = await woocommerceApi.get('/products');
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};
