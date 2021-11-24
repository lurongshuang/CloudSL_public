import request from '@/common/request.js'

const api = {}


//用户名密码登录
api.appLogin = params => request.globalRequest('/login', 'POST', params)
 
export default api
