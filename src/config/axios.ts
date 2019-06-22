import axios from 'axios';
import history from './history'

const appID = 'Q3YNS4UQ9MVuWQkHxhGCTf6m'  // "Q3YNS4UQ9MVuWQkHxhGCTf6m"
const appSecret = 'rMKsoz8d3b46FzKZsbpaWcmG' // "rMKsoz8d3b46FzKZsbpaWcmG"

/* tslint:disable:no-string-literal */
const instance = axios.create({
    baseURL: 'https://gp-server.hunger-valley.com/',
    headers: {
        't-app-id': appID,
        't-app-secret': appSecret
    }
});

// 拦截器
// Add a request interceptor
instance.interceptors.request.use((config)=> {
    // 在request发送之前做一些东西
    const xToken = localStorage.getItem('x-token')
    if(xToken){
        config.headers['Authorization'] = `Bearer ${xToken}`
        // 请求中 token 以 Authorization 的形式提交，token 前面需加上 Bearer
    }
    return config;
}, (error)=> {
    console.error(error)
    return Promise.reject(error);
});

// x-token 是登陆之后，服务器返回用户的信息，用户将x-token存储在localStorage中
// 用户要修改什么、发送请求时，会带上x-token，服务器就知道是哪个用户了
// 服务器处理完之后，会在返回数据的同时返回一个更新的 x-token，依此类推
// x-token 有过期时间

// Add a response interceptor
instance.interceptors.response.use((response)=> {
    // Do something with response data
    if(response.headers['x-token']){
        localStorage.setItem('x-token',response.headers['x-token'])
    }
    return response;
}, (error)=> {
	if(error.response.status === 401){
		console.log("重定向");
		history.push('/login')
    }
    //仅用 history.push 会刷新页面，因此还需结合 react router

    // Do something with response error
    return Promise.reject(error);
});

/* tslint:enable:no-string-literal */
export default instance