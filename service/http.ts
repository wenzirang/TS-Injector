import axios from 'axios';
import { Injectable } from '../Injector/injectable';
@Injectable()
export class HttpService {
    constructor() {
        // 请求超时时间
        axios.defaults.timeout = 10000;
        // post请求头
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
        this.render();
    }

    /**
     * 获取数据请求
     * @param {String} url 请求地址
     * @param {Object} params 请求所需要带的参数
     */
    public getData(url, params, header?) {
        const option = this.getOption({ params: params }, header)
        return new Promise(function (resolve, reject) {
            axios.get(url, option)
                .then(function (res) {
                    resolve(res.data);
                })
                .catch(function (err) {
                    reject(err.data);
                });
        });
    }

    /**
     * post 请求
     * @param {string} url 
     * @param {object} item 
     */
    public post(url, item, header?) {
        const option = this.getOption({}, header)
        return new Promise(function (resolve, reject) {
            axios.post(url, item, option)
                .then(function (res) {
                    resolve(res.data);
                })
                .catch(function (err) {
                    reject(err.data);
                });
        });
    }

    /**
     * 新增请求
     * @param {string} url 请求地址
     * @param {object} item 数据对象
     */
    public addData(url, item, header?) {
        const option = this.getOption({}, header)
        return new Promise(function (resolve, reject) {
            axios.post(url, item, option)
                .then(function (res) {
                    resolve(res.data);
                })
                .catch(function (err) {
                    reject(err.data);
                });
        });
    }

    /**
     * 修改请求
     * @param {string} url 请求地址
     * @param {string} id 数据的id
     * @param {object} item 修改的数据
     */
    public updateData(url, item, header?) {
        const option = this.getOption({}, header)
        return new Promise(function (resolve, reject) {
            axios.post(url, item, option)
                .then(function (res) {
                    resolve(res.data);
                })
                .catch(function (err) {
                    reject(err.data);
                });
        });
    }

    /**
     * 删除请求
     * @param {string} url 请求地址
     * @param {string} id 数据id
     */
    public deleteData(url, id, header?) {
        const option = this.getOption({}, header)
        return new Promise(function (resolve, reject) {
            axios.post(url, { Id: id }, option)
                .then(function (res) {
                    resolve(res.data);
                })
                .catch(function (err) {
                    reject(err.data);
                });
        });
    }

    getOption(object, header) {
        if (header) {
            return object.headers = header;
        } else {
            return object
        }
    }

    private render() {
        // 请求拦截器
        axios.interceptors.request.use(function (config) {
            //添加token
            var token = localStorage.getItem('token');
            token && (config.headers.Authorization = token);
            return config;
        }, function (error) {
            console.log(error);
            return;
        });

        //响应拦截器
        axios.interceptors.response.use(function (response) {
            // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据     
            // 否则的话抛出错误
            if (response.status === 200) {
                return Promise.resolve(response);
            }
            else {
                return Promise.reject(response);
            }
        }, function (error) {
            if (error.response.status) {
                switch (error.response.status) {
                    case 401:
                        // 401: 未登录
                        // 未登录则跳转登录页面，并携带当前页面的路径
                        // 在登录成功后返回当前页面，这一步需要在登录页操作。 
                        break;
                    case 403:
                        // 403 token过期
                        // 登录过期对用户进行提示
                        // 跳转登录页面    
                        // 清除token
                        localStorage.removeItem('token');
                        break;
                    case 404:
                        // 404请求不存在
                        break;
                    // 其他错误，直接抛出错误提示
                    default:
                    //错误
                }
                return Promise.reject(error.response);
            }
        });
    }
}