const config = {

}
//host
config.url_config = "http://xxxxxx"
config.url2_config = "http://xxxxx.com"

config.url3_config = "http://211.142.16.41"


//登录成功
config.loginSuccess = 'loginSuccess';
config.outLogin = 'outLogin';
//标准购买更新
config.standardSuccess='standardSuccess'

config.downOption = {
	use: true,
	auto: false,
	bgColor: '#F6F6F6',
	textColor: '#2C2C2C',
	autoShowLoading: false,
	isLock: false
}
config.upOption = {
	use: true,
	auto: false,
	isBounce: false,
	textNoMore: '没有更多数据',
	bgColor: '#F6F6F6',
	textColor: '#2C2C2C'
}
config.upOptionNo = {
	use: false,
	auto: true,
	isBounce: false,
	isLock:true,
	textNoMore: '没有更多数据',
	bgColor: '#F6F6F6',
	textColor: '#2C2C2C'
}


export default config
