import 'core-js/es6/promise';
import 'whatwg-fetch';
import 'url-search-params-polyfill';
/**
 * 将对象转成 a=1&b=2的形式
 * @param obj 对象
 */
// 兼容模式不支持
function obj2String(obj, arr = [], idx = 0) {
    for (let item in obj) {
        arr[idx++] = [item, obj[item]]
    }
    return new URLSearchParams(arr).toString()
}

// 处理浏览器兼容
function encodeSearchParams(obj) {
    const params = []
  
    Object.keys(obj).forEach((key) => {
      let value = obj[key]
      // 如果值为undefined我们将其置空
      if (typeof value === 'undefined') {
        value = ''
      }
      // 对于需要编码的文本（比如说中文）我们要进行编码
      params.push([key, encodeURIComponent(value)].join('='))
    })
  
    return params.join('&')
}

/**
 * 真正的请求
 * @param url 请求地址
 * @param options 请求参数
 * @param method 请求方式
 */
function commonFetcdh(url, options, method = 'GET', successFun, errorFun) {
    // {
    //     http_body:
    //     http_header:
    // }
    if (!options.http_body) {
        var searchStr = encodeSearchParams(options)
    } 
    var head = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "x-auth-token": getToken()
    }
    if(options.http_header){
        head['captcha-id'] = options.http_header.id;
        head['captcha-code'] = options.http_header.code;
    }
    let initObj = {
        method: method,
        headers: new Headers(head),
        mode: 'cors',
        cache: 'default'
    }
    
    if (method === 'GET') { // 如果是GET请求，拼接url
        url += '?' + searchStr
    } else {
        if (options.http_body) {
            initObj.body = options.http_body;
        } else {
            initObj.body = options
        }
    }
    fetch(url, initObj).then((res) => {
        if (res.ok) {
            res.json().then((data) => {
                if (data && data.success) {
                    if (typeof successFun === "function") {
                        successFun(data);
                    }
                } else {
                    if (typeof errorFun === "function") {
                        errorFun(data);
                    } else if (typeof errorFun === 'undefined') {
                        errorEvent(data);
                    }
                }
            })
        } 
    }).catch((res) => {
        res.json().then((data) => {
            if(typeof errorFun === "function"){
                errorFun(data);
            }
        })
    })
}

/**
 * GET请求
 * @param url 请求地址
 * @param options 请求参数
 */
function get(url, options, successFun, errorFun) {
    return commonFetcdh(url, options, 'GET', successFun, errorFun);
}

/**
 * POST请求
 * @param url 请求地址
 * @param options 请求参数
 */
function post(url, options, successFun, errorFun) {
    return commonFetcdh(url, options, 'POST', successFun, errorFun)
}

/**
 * DELETE请求
 * @param url 请求地址
 * @param options 请求参数
 */
function del(url, options, successFun, errorFun) {
    return commonFetcdh(url, options, 'DELETE', successFun, errorFun)
}

// 获取Token
function getToken() {
    var token = localStorage.getItem("authToken");
    var exp = localStorage.getItem("authExp");
    if (!token || !exp) {
        return "";
    }
    var expDate = new Date(parseInt(exp));
    if (expDate < new Date()) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("authExp");
        return "";
    }
    return token;
}
// 请求失败
function errorEvent(res) {
    
    layer.msg(res.error.message);
    
}

export {
    get,
    post,
    del
}


