import axios from 'axios'
import { Message } from 'element-ui'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let loading = null;
let requestCount = 0;
// 显示loading 
function showLoading() {
    if(requestCount == 0) {
        loading = Message({
            message: "加载中...",
            duration: 0
        })
    }
    requestCount++
}

// 影藏loading
function hideLoading() {
    if(requestCount > 0) {
        requestCount--;
    }
    if(loading && requestCount == 0){
        loading.close();
    }
}

const ENV = window.myGlod ? window.myGlod : process.env;
let config = {
    baseURL: ENV.BASE_API || "",
    timeout: 60 * 1000
}

const Axios = axios.create(config);

// 添加请求拦截器
Axios.interceptors.request.use((config) => {
    // 添加header token
    const token = "auth_123";
    config.headers.common['Authorization'] = token;
    // 显示loading
    showLoading();
    // 在发送请求之前做些什么
    return config;
}, (error) => {
    // 影藏loading
    hideLoading();
    // 对请求错误做些什么
    return Promise.reject(error);
})

// 添加响应拦截器
Axios.interceptors.response.use((response) => {
    hideLoading()

    if(response.status == 200 && response.data.code == 200) {
        return response.data;
    } else {
        Message.error(response.data.msg);
    }
    // 对响应数据做点什么
    return response
}, (err) => {
    const errStr = JSON.stringify(err.message);
    if(errStr.includes('timeout')) {
        Message.error('请求超时，刷新试试!');
    } else if(errStr.includes('404')) {
        Message.error('404,请求的资源不存在!')
    } else if(errStr.includes('Network Error')) {
        Message.error('网络错误!');
    } else {
        Message({
            message: err.message,
            type: 'error',
            duration: 5 * 1000
        })
    }

    // 影藏loading
    hideLoading();
    // 对响应错误做点什么
    return Promise.reject(err);
})

export default {
    post: function(url,data) {
        return Axios({
            method: 'post',
            url,
            data
        })
    },
    get: function(url,params) {
        return Axios({
            method: 'get',
            url,
            params
        })
    }
}