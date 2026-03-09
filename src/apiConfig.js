// API base URL - uses Vite proxy in development to avoid CORS issues
const API_BASE = import.meta.env.DEV ? '/api' : 'https://finapi.rrex.cc';

export default API_BASE;
