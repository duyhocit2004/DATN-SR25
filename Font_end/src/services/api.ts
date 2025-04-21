import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Tạo instance của axios với config mặc định
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request queue để batch các requests
let requestQueue: Array<{
  url: string;
  method: string;
  data?: any;
  resolve: (value: any) => void;
  reject: (reason?: any) => void;
}> = [];

let batchTimeout: NodeJS.Timeout | null = null;

// Hàm để batch các requests
const batchRequests = () => {
  if (requestQueue.length === 0) return;

  const batch = requestQueue;
  requestQueue = [];

  // Group requests by URL
  const groupedRequests = batch.reduce((acc, req) => {
    if (!acc[req.url]) {
      acc[req.url] = [];
    }
    acc[req.url].push(req);
    return acc;
  }, {} as Record<string, typeof requestQueue>);

  // Process each group
  Object.entries(groupedRequests).forEach(([url, requests]) => {
    if (requests.length === 1) {
      // Single request
      const req = requests[0];
      api({
        url: req.url,
        method: req.method,
        data: req.data,
      })
        .then((response) => req.resolve(response.data))
        .catch((error) => req.reject(error));
    } else {
      // Batch requests
      const promises = requests.map((req) =>
        api({
          url: req.url,
          method: req.method,
          data: req.data,
        })
      );

      Promise.all(promises)
        .then((responses) => {
          responses.forEach((response, index) => {
            requests[index].resolve(response.data);
          });
        })
        .catch((error) => {
          requests.forEach((req) => req.reject(error));
        });
    }
  });
};

// Interceptor để batch các requests
api.interceptors.request.use((config) => {
  if (config.method === 'get') {
    return new Promise((resolve, reject) => {
      requestQueue.push({
        url: config.url!,
        method: config.method!,
        data: config.data,
        resolve: (value) => resolve({ ...config, data: value }),
        reject,
      });

      if (batchTimeout) {
        clearTimeout(batchTimeout);
      }

      batchTimeout = setTimeout(batchRequests, 50);
    });
  }
  return config;
});

// Cache responses
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Interceptor để cache responses
api.interceptors.response.use(
  (response) => {
    if (response.config.method === 'get') {
      const cacheKey = `${response.config.url}:${JSON.stringify(response.config.params)}`;
      cache.set(cacheKey, {
        data: response.data,
        timestamp: Date.now(),
      });
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Hàm để lấy dữ liệu từ cache
export const getCachedData = (url: string, params?: any) => {
  const cacheKey = `${url}:${JSON.stringify(params)}`;
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  return null;
};

export default api; 