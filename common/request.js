import config from './config.js'

const request = {}
const headers = {}

request.globalRequest = (url, method, data) => {
	return uni.request({
		url: config.url_config + url,
		method,
		dataType: 'json',
		data: data,
		header:{
			'Content-Type':'application/x-www-form-urlencoded'
		}
	}).then(res => {
		return res[1];
	}).catch(parmas => {
		return parmas;
	})
}

request.globalRequest2 = (url, method, data) => {
	return uni.request({
		url: config.url2_config + url,
		method,
		dataType: 'json',
		data: data,
		header:{
			'Content-Type':'application/x-www-form-urlencoded'
		}
	}).then(res => {
		return res[1];
	}).catch(parmas => {
		return parmas;
	})
}


request.globalRequest3 = (url, method, data) => {
	return uni.request({
		url: config.url3_config + url,
		method,
		dataType: 'json',
		data: data,
		header:{
			'Content-Type':'application/x-www-form-urlencoded'
		}
	}).then(res => {
		return res[1];
	}).catch(parmas => {
		return parmas;
	})
}
export default request
