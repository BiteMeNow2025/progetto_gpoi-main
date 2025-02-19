// src/services/woocommerceService.js
import axios from 'axios';

const API_URL = 'https://your-wordpress-site.com/wp-json/wc/v3'; // Replace with your WordPress site URL
const CONSUMER_KEY = 'your_consumer_key'; // Replace with your Consumer Key
const CONSUMER_SECRET = 'your_consumer_secret'; // Replace with your Consumer Secret

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
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};
