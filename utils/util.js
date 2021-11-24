const util = {

}
util.getUserId = () => {
	var userInfo = uni.getStorageSync('userInfo');
	if (userInfo) {
		try {
			userInfo = JSON.parse(userInfo)
			return userInfo.ID + ""
		} catch (e) {}
	}
	return '-1';
}

util.showToast = (value) => {
	uni.showToast({
		title: value,
		icon: 'none'
	});
}
util.formatUrl = (context, url) => {
	var index = url.indexOf("http");
	if (index == 0) {
		return url;
	}

	return context.$store.state.baseUrl + url;
}
util.dateToWords = (data) => {
	let arr = data.toString().split('-');
	var date = ['年', '月', '日']
	var time = '';
	if (arr && arr.length > 0) {
		for (var i = 0; i < arr.length; i++) {
			time += arr[i];
			if (i < 3) {
				time += date[i];
			}
		}
		return time;
	}
	return data;
}
util.dateFormat = (date, format) => {
	if (!date) {
		return '';
	}
	return util.formatReture(date.toString().substring(date.indexOf("(") + 1, date.toString().indexOf(")")), format)
}
util.formatReture = (time, format) => {
	var t = new Date(parseInt(time));
	var tf = function(i) {
		return (i < 10 ? '0' : '') + i
	};
	return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a) {
		switch (a) {
			case 'yyyy':
				return tf(t.getFullYear());
				break;
			case 'MM':
				return tf(t.getMonth() + 1);
				break;
			case 'mm':
				return tf(t.getMinutes());
				break;
			case 'dd':
				return tf(t.getDate());
				break;
			case 'HH':
				return tf(t.getHours());
				break;
			case 'ss':
				return tf(t.getSeconds());
				break;
		}
	})
}

//时间戳转换方法    date:时间戳数字
util.dateToString = (date1) => {
	var date = new Date(date1);
	var YY = date.getFullYear() + '-';
	var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
	var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
	var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
	var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
	var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
	return YY + MM + DD;
}
util.formatSize = (context) => {
	let that = context;
	plus.cache.calculate(function(size) {
		let sizeCache = parseInt(size);
		if (sizeCache == 0) {
			that.fileSizeString = "0B";
		} else if (sizeCache < 1024) {
			that.fileSizeString = sizeCache + "B";
		} else if (sizeCache < 1048576) {
			that.fileSizeString = (sizeCache / 1024).toFixed(2) + "KB";
		} else if (sizeCache < 1073741824) {
			that.fileSizeString = (sizeCache / 1048576).toFixed(2) + "MB";
		} else {
			that.fileSizeString = (sizeCache / 1073741824).toFixed(2) + "GB";
		}
	});
}
util.formatFileSize = (sizeCache) => {
	if (sizeCache == 0) {
		return "0B";
	} else if (sizeCache < 1024) {
		return sizeCache + "B";
	} else if (sizeCache < 1048576) {
		return (sizeCache / 1024).toFixed(2) + "KB";
	} else if (sizeCache < 1073741824) {
		return (sizeCache / 1048576).toFixed(2) + "MB";
	} else {
		return (sizeCache / 1073741824).toFixed(2) + "GB";
	}
	return '0B';
}

util.getFileExt = (filename) => {
	let filearr = filename.split(".");
	return filearr[filearr.length - 1]
}
//生成从minNum到maxNum的随机数
util.randomNum = (minNum, maxNum) => {
	switch (arguments.length) {
		case 1:
			return parseInt(Math.random() * minNum + 1, 10);
			break;
		case 2:
			return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
			//或者 Math.floor(Math.random()*( maxNum - minNum + 1 ) + minNum );
			break;
		default:
			return 0;
			break;
	}
}

util.twoDigits = (val) => {
	if (val < 10) return "0" + val;
	return val;
}

util.getNowDate = (type) => {
	var timezone = 8;
	var offset_GMT = new Date().getTimezoneOffset();
	var nowDate = new Date().getTime();
	var today = new Date(nowDate + offset_GMT * 60 * 1000 + timezone * 60 * 60 * 1000);
	var date = today.getFullYear() + "-" + util.twoDigits(today.getMonth() + 1) + "-" + util.twoDigits(today
		.getDate());
	var time = util.twoDigits(today.getHours()) + ":" + util.twoDigits(today.getMinutes()) + ":" + util.twoDigits(
		today.getSeconds());
	if (type == 0) {
		return date
	} else {
		return date + ' ' + time
	}
}
import md5 from '@/common/md5.min.js'
util.getMd5Token = (map) => {
	map = objKeySort(map);
	var listValye = '';
	//将所有字段 合并
	for (var key in map) {
		listValye += map[key];
	}
	//添加当前时间
	listValye += util.getNowDate(0);
	//md5加密
	listValye = md5(listValye);
	return listValye.toUpperCase();

}
util.getMd5TokenNSort = (map) => {
	// map = objKeySort(map);
	var listValye = '';
	//将所有字段 合并
	for (var key in map) {
		listValye += map[key];
	}
	//添加当前时间
	listValye += util.getNowDate(0);
	//md5加密
	listValye = md5(listValye);
	return listValye.toUpperCase();

}
//md5 加密
util.getMd5 = (value) => {
	return md5(value).toUpperCase();
}
util.getMd5_16 = (value) => {
	return md5(value).toUpperCase().substr(8, 16);;
}
util.getMd5OfLow = (value) => {
	return md5(value).toLowerCase();
}
util.getUserInfo = () => {
	var userInfo = uni.getStorageSync('userInfo');
	if (userInfo && userInfo.length > 0) {
		userInfo = JSON.parse(userInfo)
		return userInfo;
	}
	return null;

}

/**
 * 身份证号码校验
 */
util.idCard = (value) => {
	if (value && (/\d{17}[\d|x]|\d{15}/).test(value) && (value.length == 15 || value.length == 18)) {
		return true;
	} else {
		return false;
	}
}
/**
 * 邮箱校验
 */
util.isEmail = (value) => {
	var regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
	if (value && regEmail.test(value)) {
		return true;
	} else {
		return false;
	}
}
/**
 * 手机号校验
 */
util.isPhone = (value) => {
	var regPhone = /^1[0-9]{10}$/
	if (value.length <= 10 || !regPhone.test(value)) {
		return false;
	} else {
		return true;
	}
}

//排序的函数
function objKeySort(obj) {
	var newkey = Object.keys(obj).sort();

	var newObj = {};
	for (var i = 0; i < newkey.length; i++) {
		newObj[newkey[i]] = obj[newkey[i]];
	}
	return newObj;
}

util.sendSms = (phone, type, success, fail) => {
	var codeNumber = "";
	for (var i = 1; i <= 6; i++) {
		const num = Math.floor(Math.random() * 10);
		codeNumber += num;
	}
	var map = {
		'phone': phone,
		'code': codeNumber,
		'tp': type + ''
	}
	map['token'] = util.getMd5Token(map);
	api.sendSms(map).then(data => {
		if (data.data.code == 1) {
			success();
		} else {
			fail();
		}
	}).catch(data => {
		fail();
	});
	return codeNumber;
}
util.getKey00 = (funName) => {
	var code = "11";
	var pwd = "22";
	var value = code + ',' + pwd + ',' + funName;
	var key = uni.arrayBufferToBase64(util.str2ab(value))
	return key;
}

util.getKey21 = (funName) => {
	var code = '11';
	var pwd = '22';
	var value = code + ',' + pwd + ',' + funName;
	var key = uni.arrayBufferToBase64(util.str2ab(value))
	return key;
}

util.getKeyBookDow = (funName, id, bookType) => {
	var code = "11";
	var pwd = "22";
	var value = code + ',' + pwd + ',' + funName + ',' + id + ',' + bookType;
	var key = uni.arrayBufferToBase64(util.str2ab(value))
	return key;
}
util.getKeyBook = (funName, id, bookType, startPage, endPage) => {
	var code = "11";
	var pwd = "222";
	var value = code + ',' + pwd + ',' + funName + ',' + id + ',' + startPage + ',' + endPage + ',' + bookType;
	var key = uni.arrayBufferToBase64(util.str2ab(value))
	return key;
}

util.str2ab = (str) => {
	let val = ""
	for (let i = 0; i < str.length; i++) {
		if (val === '') {
			val = str.charCodeAt(i).toString(16)
		} else {
			val += ',' + str.charCodeAt(i).toString(16)
		}
	}
	return new Uint8Array(val.match(/[\da-f]{2}/gi).map(function(h) {
		return parseInt(h, 16)
	})).buffer
}

util.getBookLookSize = (max) => {
	var num = 1;
	if (max > 50) {
		num = 15;
	} else if (max > 30) {
		num = 10;
	} else if (max > 20) {
		num = 8;
	} else if (max > 10) {
		num = 5;
	} else {
		num = 3;
	}
	return num;
}

export default util
