const pushUtils = {

}
/**  
 *  
 * 推送的监听  
 */
pushUtils.pushListener = () => {
	var _this = this;
	// #ifdef APP-PLUS
	plus.push.addEventListener("click", function(msg) {


	}, false);
	plus.push.addEventListener("receive", function(msg) {
		var _this = this;
		if (plus.os.name == 'iOS') {
			console.log(JSON.stringify(msg))
			if (msg.aps) {
				plus.push.createMessage("云水利", "", {
					title: msg.aps.alert.title,
					subtitle: msg.aps.alert.body
				});
			}
		} else {

		}
	}, false);
	// #endif
}
/**  
 *清除ios小红点  
 */
pushUtils.cancelPushClear = () => {
	// #ifdef APP-PLUS
	plus.push.clear();
	// #endif
}

export default pushUtils
