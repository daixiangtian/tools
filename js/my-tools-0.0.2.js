(function(window){
	var tools = {
		//公共配置
		publicConfig : {
			//弹窗 页面的pop只能运行一个，不可有多个 所以放置在公共配置里面
			pop : {					
				//弹窗的配置信息
				config : {					
					//弹窗的层级(默认9个9)
					zIndex : 999999999,			
					//初始样式
					css : "opacity: 0;position: fixed;top: 0px;z-index:999999999;width: 100%;height: 100%;display: flex;align-items: center;background: rgba(0, 0, 0, 0.5);left: 0;margin:0;padding:0;",
					//js在加载的时候就行创建
					pop : document.createElement('pop'),
					//页面是否已有pop
					isExist : false,
					
				},
				judge : function(){			//判断页面没有pop就进行添加 否则 直接替换类容
					tools.publicConfig.pop.config.pop.innerHTML = null;
					if(!tools.publicConfig.pop.config.isExist){
						document.body.appendChild(tools.publicConfig.pop.config.pop);
						tools.publicConfig.pop.config.pop.style.cssText = tools.publicConfig.pop.config.css;
						tools.publicConfig.pop.config.isExist = !tools.publicConfig.pop.config.isExist
					}else{
						tools.publicConfig.pop.config.pop.style.display = "flex";
					}
				}
			},
			iframe : {
				//窗口的层级(默认8个9)
				index : 99999999,	
				length : 0,
				objs : [],
				leftIndex : 0
			}
		},
		alert : function( txt ){
			
			tools.publicConfig.pop.judge();
			var popAlertConfig = {
					style : {
						box : "background: #fff;margin: 0 auto;padding:0;border: 1px solid #ddd;max-width: 300px;line-height: 20px;",
						content : "min-height: 110px;font-size: 14px;display: flex;align-items: center;border-bottom: 1px solid #ddd;min-width: 220px;  max-width: 500px;max-height: 250px;overflow: auto;margin: 0 auto;padding:0;",
						contentP : "margin: 0 auto;color: #000;font-size: 12px;padding: 10px;",
						btn : "background: #3e89fa;height: 30px;line-height: 30px;font-size: 12px;width: 100px;text-align: center;color: #fff;border-radius: 3px;cursor: pointer;display: block;margin: 10px auto;"
					}
				}
			//创建alert元素
			var popAlertBox = document.createElement('pop-alert'),
				popAlertContent = document.createElement('pop-alert-content'),
				popAlertContentP = document.createElement('pop-alert-content-p'),
				popAlertBtn = document.createElement('pop-alert-btn');
				
				//样式填充
				popAlertBox.style.cssText = popAlertConfig.style.box;
				popAlertContent.style.cssText = popAlertConfig.style.content;
				popAlertContentP.style.cssText = popAlertConfig.style.contentP;
				popAlertBtn.style.cssText = popAlertConfig.style.btn;
				
				//填充内容
				popAlertContentP.innerHTML = tools.showCode(txt) || "";
				popAlertBtn.innerHTML = "确定";
				
				//添加事件
				popAlertBtn.onclick = function(){
					tools.fade.out(tools.publicConfig.pop.config.pop,function(){
						tools.publicConfig.pop.config.pop.parentNode.removeChild(tools.publicConfig.pop.config.pop);
						tools.publicConfig.pop.config.isExist = !tools.publicConfig.pop.config.isExist
					});
				}
				
				//组装元素
				popAlertContent.appendChild(popAlertContentP);
				popAlertBox.appendChild(popAlertContent);
				popAlertBox.appendChild(popAlertBtn);
				tools.publicConfig.pop.config.pop.appendChild(popAlertBox);
				
				tools.fade.in(tools.publicConfig.pop.config.pop);
		},
		showCode : function( txt ){
			txt = txt || "";
			txt = txt.split("<").join("&lt;");
			txt = txt.split(">").join("&gt;");
			txt = txt.split("\"").join("&quot;");
			return txt;
		},
		toast : function( txt ){
			if(!tools.publicConfig.pop.config.isToast){
				txt = tools.showCode(txt);
				
				tools.publicConfig.pop.judge();
				tools.publicConfig.pop.config.pop.style.background = "rgba(0,0,0,0)"
				var popToast = document.createElement('pop-toast');
					popToast.innerHTML = txt;
					popToast.style.cssText="background: rgba(0, 0, 0, 0.5);color: #fff;padding: 5px 10px;border-radius: 5px;margin: 0 auto;"
				
				tools.publicConfig.pop.config.pop.appendChild(popToast);
				
				tools.fade.in(tools.publicConfig.pop.config.pop);
				
				popToast.style.marginTop = -(window.innerHeight / 2) + "px"
				var startTop = -(window.innerHeight / 2),
					startOpacity = 99;
			
				tools.publicConfig.pop.config.isToast = true;
					var toastInterval =  setInterval(function(){
					var toastTop = parseFloat(popToast.style.marginTop) - 1;
					popToast.style.marginTop = toastTop +"px";
					startOpacity--;
					popToast.style.opacity = startOpacity / 100 ;
					if(startTop - toastTop >= 100 ){
						clearInterval(toastInterval);
						tools.publicConfig.pop.config.pop.parentNode.removeChild(tools.publicConfig.pop.config.pop);
						tools.publicConfig.pop.config.isExist = !tools.publicConfig.pop.config.isExist
						tools.publicConfig.pop.config.isToast = false;
					}
				},10);
			}
			
		},
		confirm : function( param ){
			tools.publicConfig.pop.judge();
			var popConfirmConfig = {
					style : {
						box : "border: 1px solid #ddd;background: #fff;padding: 10px;margin: 0 auto;min-width: 200px;max-width: 300px;",
						title : "font-size: 14px;line-height: 24px;border-bottom: 1px solid #eee;text-align: center;padding-bottom: 5px;display: block;",
						content : "font-size: 12px;margin-top: 10px;min-height: 50px;line-height: 20px;display: block;display: block;",
						btnBox : "overflow: hidden;border-top: 1px solid #eee;margin-top: 10px;width: 100%;display: block;",
						btn : [
							"float: right;background: #3e89fa;height: 25px;line-height: 25px;margin: 10px 5px 0;font-size: 12px;width: 50px;text-align: center;color: #fff;border-radius: 3px;cursor: pointer;",
							"float: right;margin: 0 10px;background: #eee;height: 25px;line-height: 25px;margin: 10px 15px 0;font-size: 12px;width: 50px;text-align: center;border-radius: 3px;cursor: pointer;"
						]
					}
				}
			//创建confirm元素
			var popConfirmBox = document.createElement('pop-confirm'),
				popConfirmTitle = document.createElement('pop-confirm-title'),
				popConfirmContent = document.createElement('pop-confirm-content'),
				popConfirmBtnBox = document.createElement('pop-confirm-btn-box'),
				popConfirmBtnSure = document.createElement('pop-confirm-btn'),
				popConfirmBtnCancel = document.createElement('pop-confirm-btn');
				
			//填充confirm样式
			popConfirmBox.style.cssText = popConfirmConfig.style.box;
			popConfirmTitle.style.cssText = popConfirmConfig.style.title;
			popConfirmContent.style.cssText = popConfirmConfig.style.content;
			popConfirmBtnBox.style.cssText = popConfirmConfig.style.btnBox;
			popConfirmBtnSure.style.cssText = popConfirmConfig.style.btn[0];
			popConfirmBtnCancel.style.cssText = popConfirmConfig.style.btn[1];
			
			//组装元素
			popConfirmBox.appendChild(popConfirmTitle);
			popConfirmBox.appendChild(popConfirmContent);
			popConfirmBox.appendChild(popConfirmBtnBox);
			popConfirmBtnBox.appendChild(popConfirmBtnSure);
			popConfirmBtnBox.appendChild(popConfirmBtnCancel);
			
			//内容填充
			popConfirmTitle.innerHTML =  tools.showCode(param.title) || "提示";
			popConfirmContent.innerHTML =  tools.showCode(param.txt) || "";
			popConfirmBtnSure.innerHTML =  tools.showCode((param.btn && param.btn[0])) || "确定";
			popConfirmBtnCancel.innerHTML = tools.showCode((param.btn && param.btn[1])) || "取消";
			
			//添加事件
			popConfirmBtnSure.onclick = function(){
				param.callback&&param.callback(true);
				tools.fade.out(tools.publicConfig.pop.config.pop,function(){
					tools.publicConfig.pop.config.isExist = !tools.publicConfig.pop.config.isExist;
					tools.publicConfig.pop.config.pop.parentNode.removeChild(tools.publicConfig.pop.config.pop);
				});
			}
			popConfirmBtnCancel.onclick = function(){
				param.callback&&param.callback(false);
				tools.fade.out(tools.publicConfig.pop.config.pop,function(){
					tools.publicConfig.pop.config.isExist = !tools.publicConfig.pop.config.isExist;
					tools.publicConfig.pop.config.pop.parentNode.removeChild(tools.publicConfig.pop.config.pop);
				});
			}
			tools.publicConfig.pop.config.pop.appendChild(popConfirmBox);
			tools.fade.in(tools.publicConfig.pop.config.pop);
		},
		fade : {
			in : function( item ){
				var opacity = 0;
				var fadeIn = setInterval(function(){
					opacity = opacity + 0.01
					item.style.opacity = opacity;
					if(opacity >= 1){
						clearInterval(fadeIn);
					}
				},1)
			},
			out : function( item,fn ){
				var opacity = 1;
				var fadeOut = setInterval(function(){
					opacity = opacity - 0.01
					item.style.opacity = opacity;
					if(opacity <= 0){
						clearInterval(fadeOut);
						fn&&fn();
					}
				},1)
			}
			
		},
		replace : function( param ){
			param = param || {};
			if(param.show){
				tools.publicConfig.pop.judge();
				var popReplaceConfig = {
						style : {
							box : "border: 1px solid #ddd;background: #fff;padding: 10px;margin: 0 auto;min-width: 200px;max-width: 300px;",
							title : "font-size: 14px;line-height: 24px;border-bottom: 1px solid #eee;text-align: center;padding-bottom: 5px;display: block;",
							content : "font-size: 12px;line-height: 20px;padding: 10px 0;border-bottom: 1px solid #eee;max-height: 300px;overflow: auto;display: block;",
							inputTips : "float: left; font-size: 12px;line-height: 40px;height:30px;width: 70px;text-align: right;overflow:hidden;",
							btnBox : "overflow: hidden;border-top: 1px solid #eee;margin-top: 10px;width: 100%;display: block;",
							inputBox : "padding: 0 5px 3px;border: 1px solid darkgrey;margin: 10px 0;float: left;",
							input : "border:none;outline:none;color:#000;margin:0;padding:0;width: 100%;",
							btn : [
								"float: right;background: #3e89fa;height: 25px;line-height: 25px;margin: 10px 5px 0;font-size: 12px;width: 50px;text-align: center;color: #fff;border-radius: 3px;cursor: pointer;",
								"float: right;margin: 0 10px;background: #eee;height: 25px;line-height: 25px;margin: 10px 15px 0;font-size: 12px;width: 50px;text-align: center;border-radius: 3px;cursor: pointer;"
							]
						}
					}
				//创建replace元素
				var popReplaceBox = document.createElement('pop-replace'),
					popReplaceTitle = document.createElement('pop-replace-title'),
					popReplaceContent = document.createElement('pop-replace-content'),
					popReplaceInputBox1 = document.createElement('pop-replace-input-box'),
					popReplaceInputBox2 = document.createElement('pop-replace-input-box'),
					popReplacePointInput = document.createElement('input'),
					popReplaceReplaceInput = document.createElement('input'),
					popReplaceInputTips1 = document.createElement('pop-replace-input-tips'),
					popReplaceInputTips2 = document.createElement('pop-replace-input-tips');
					popReplaceBtnBox = document.createElement('pop-replace-btn-box');
					popReplaceBtnSure = document.createElement('pop-replace-btn-sure');
					popReplaceBtnCancle = document.createElement('pop-replace-btn-cancel'),
					br = document.createElement('br');
				
				//样式填充
				popReplaceBox.style.cssText = popReplaceConfig.style.box;
				popReplaceTitle.style.cssText = popReplaceConfig.style.title;
				popReplaceContent.style.cssText = popReplaceConfig.style.content;
				popReplaceInputTips1.style.cssText = popReplaceConfig.style.inputTips;
				popReplaceInputBox1.style.cssText = popReplaceConfig.style.inputBox;
				popReplaceInputTips2.style.cssText = popReplaceConfig.style.inputTips;
				popReplaceInputBox2.style.cssText = popReplaceConfig.style.inputBox;
				popReplacePointInput.style.cssText = popReplaceConfig.style.input;
				popReplaceReplaceInput.style.cssText = popReplaceConfig.style.input;
				popReplaceBtnBox.style.cssText = popReplaceConfig.style.btnBox;
				popReplaceBtnSure.style.cssText = popReplaceConfig.style.btn[0];
				popReplaceBtnCancle.style.cssText = popReplaceConfig.style.btn[1];
				
				
				//组装元素
				popReplaceBox.appendChild(popReplaceTitle)
				popReplaceBox.appendChild(popReplaceContent)
				popReplaceBox.appendChild(popReplaceInputTips1)
				popReplaceBox.appendChild(popReplaceInputBox1)
				popReplaceBox.appendChild(br)
				popReplaceBox.appendChild(popReplaceInputTips2)
				popReplaceBox.appendChild(popReplaceInputBox2)
				popReplaceBox.appendChild(popReplaceBtnBox);
				popReplaceInputBox1.appendChild(popReplacePointInput)
				popReplaceInputBox2.appendChild(popReplaceReplaceInput)
				
				
				popReplaceBtnBox.appendChild(popReplaceBtnSure);
				popReplaceBtnBox.appendChild(popReplaceBtnCancle);
				
				//填充内容
				popReplaceTitle.innerHTML = tools.showCode(param.title) || "替换字符";
				popReplaceContent.innerHTML = "内容："+ tools.showCode(param.content) || "内容：";
				popReplaceInputTips1.innerHTML = "查找目标：";
				popReplaceInputTips2.innerHTML = "替换为：";
				popReplaceBtnSure.innerHTML = "确定";
				popReplaceBtnCancle.innerHTML = "取消";
				popReplacePointInput.placeholder = "请输入您的查找目标";
				popReplaceReplaceInput.placeholder = "请输入您的替换内容";
				popReplacePointInput.value = tools.showCode(param.point) || null;
				popReplaceReplaceInput.value = tools.showCode(param.fill) || null;
				
				//添加事件
				popReplaceBtnSure.onclick = function(){
					
					param.callback&&param.callback(tools.showCode(param.content.split(popReplacePointInput.value).join(popReplaceReplaceInput.value)));
					tools.fade.out(tools.publicConfig.pop.config.pop,function(){
						tools.publicConfig.pop.config.isExist = !tools.publicConfig.pop.config.isExist;
						tools.publicConfig.pop.config.pop.parentNode.removeChild(tools.publicConfig.pop.config.pop);
					});
				}
				popReplaceBtnCancle.onclick = function(){
					param.callback(null);
					tools.fade.out(tools.publicConfig.pop.config.pop,function(){
						tools.publicConfig.pop.config.isExist = !tools.publicConfig.pop.config.isExist;
						tools.publicConfig.pop.config.pop.parentNode.removeChild(tools.publicConfig.pop.config.pop);
					});
				}
				tools.publicConfig.pop.config.pop.appendChild(popReplaceBox);
				tools.fade.in(tools.publicConfig.pop.config.pop);
			}else{
				param.callback( param.content.split(param.point).join(param.fill));
			}
		},
		isPhoneCode : function(phoneNumber){
			 var myreg=/^[1][3,4,5,7,8][0-9]{9}$/; 
			return (myreg.test(phoneNumber));
		},
		/**显示数字键盘
		*/
		showKeyboard : function( item ){
			var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
			var keyboardBox = document.querySelector('.tools-popup'),
				key = null,
				css = "-moz-user-select: none; -khtml-user-select: none; user-select: none;";
			if(keyboardBox)keyboardBox.parentNode.removeChild(keyboardBox);
			keyboardBox = document.createElement('keyboard-box');
			keyboardBox.setAttribute('class','tools-popup')
			keyboardBox.style.cssText = "margin: 0;padding: 0;position: fixed; width: 270px;z-index: 999999999;"+css;
			keyboardBox.style.top = item.offsetTop + item.clientHeight + 15 - scrollTop + "px";
			keyboardBox.style.left = item.offsetLeft + item.clientHeight - 15 + "px";
			for(var i=0;i<12;i++){
				key = document.createElement('keyboard-box-key');
				key.innerHTML = i+1;
				key.index = i;
				key.style.cssText = "width: 79px; float: left;background:#fff;text-align: center;line-height: 50px;font-size: 18px;border: 1px solid #eee;cursor: pointer;margin-left:-1px;margin-top:-1px;"+css;
				if(i==9){key.innerHTML = ".";}
				if(i==11){
					key.innerHTML = "回删";
					key.onclick = function(){
						if(!(item.tagName.toLocaleLowerCase()=='input')){
							item.innerHTML = item.innerHTML.substr(0,item.innerHTML.length - 1);
						}else{
							item.value = (item.value+"").substr(0,item.value.length - 1);
						}
					}
				}else {
					key.onclick = function(){
						if(this.index == 9){
							if(!(item.tagName.toLocaleLowerCase()=='input')){
								if(item.innerHTML.indexOf(this.innerHTML) >=0)return false;
							}else{
								if(item.value.indexOf(this.innerHTML) >=0)return false;
							}
						}
						if(!(item.tagName.toLocaleLowerCase()=='input')){
							item.innerHTML = item.innerHTML + this.innerHTML;
						}else{
							item.value = item.value + this.innerHTML;
						}
					}
				}
				if(i==10)key.innerHTML = 0;
				
				
				key.onmousemove = function(){
					this.style.background="#eee";
					this.style.color = "#fff";
				}
				key.onmouseout = function(){
					this.style.background="#fff";
					this.style.color = "#000";
				}
				keyboardBox.appendChild(key);
			}
			var closeBtn = document.createElement('close-btn');
			closeBtn.innerHTML = "X";
			closeBtn.style.cssText ="width: 20px;height: 20px;position: absolute;right: 21px;top: -11px;background: #fff;text-align: center;font-size: 12px;line-height: 20px;border-radius: 50%;color: #eee;border: 1px solid #eee;cursor: pointer;"+css
			closeBtn.onmousemove = function(){
				this.style.background = "red";
				this.style.color = "#fff";
				this.style.border = "1px solid red";
			}
			closeBtn.onmouseout = function(){
				this.style.background = "#fff";
				this.style.color = "#eee";
				this.style.border = "1px solid #eee";
			}
			closeBtn.onclick = function(){
				keyboardBox.parentNode.removeChild(keyboardBox);
			}
			keyboardBox.onfocus = function(){
				
			};
			keyboardBox.appendChild(closeBtn);
			document.body.appendChild(keyboardBox);
			
		},
		/**微信时间戳转换
		*/
		timeStampConversion : function(time){
			var nowTime = new Date().getTime();
				var now = new Date(nowTime);
				var nowYear = now.getFullYear();
				var nowMonth = now.getMonth() + 1;
				var nowday = now.getDate();
				var nowHour = now.getHours();
				var nowMinutes = now.getMinutes();
				var nowSecond = now.getSeconds();
				
				if (nowMonth >= 1 && nowMonth <= 9) nowMonth = "0" + nowMonth;
				if (nowday >= 0 && nowday <= 9) nowday = "0" + nowday;
				if (nowHour >= 0 && nowHour <= 9) nowHour = "0" + nowHour;
				if (nowMinutes >= 0 && nowMinutes <= 9) nowMinutes = "0" + nowMinutes;
				if (nowSecond >= 0 && nowSecond <= 9) nowSecond = "0" + nowSecond;
			
			//获取时间差 
				var timeDifference = nowTime - time;
				if(timeDifference<0)timeDifference= nowTime;
				
			if( timeDifference >=0 ){	//当前时间大于传等进来的时间
				var second = Math.floor(timeDifference / 1000);	//秒数
				var minute = Math.floor(timeDifference / 1000 / 60);	//分钟
				var hour = Math.floor(timeDifference / 1000 / 60 / 60);	//小时
				var day = Math.floor(timeDifference / 1000 / 60 / 60 / 24);	//天
				if( second < 60 ){
					
					if(second <= 9){
						return "刚刚";
					}
					
					return second + "秒前";
				}else if( second >= 60 && minute < 60 ){
					return minute +"分钟前";
				}else if( minute >= 60 && hour < 24 ){
					return hour + "小时前";
				}else if( hour >= 24 && day < 30 ){
				
					if(day == 1){
						return "昨天"
					}
					return day +"天前";
				}else{
					var date = new Date( time );
					var year = date.getFullYear();
					var month = date.getMonth() + 1;
					var day = date.getDate();
					var hour = date.getHours();
					var minutes = date.getMinutes();
					var second = date.getSeconds();
					
					if (month >= 1 && month <= 9) month = "0" + month;
					if (day >= 0 && day <= 9) day = "0" + day;
					if (hour >= 0 && hour <= 9) hour = "0" + hour;
					if (minutes >= 0 && minutes <= 9) minutes = "0" + minutes;
					if (second >= 0 && second <= 9) second = "0" + second;
					
					
					if(nowYear - year > 0){
						return  year + '-' + month + '-' + day + "  " + hour + ":" + minutes + ":" + second;
					
					}else if(Number(nowMonth) - Number(month) > 0 ){
					
						return month + '-' + day + "  " + hour + ":" + minutes
					
					}
				}
				
			}
		},
		/** 字符串条件筛选
		*/
		strJudge: function(param) { //字符串判断
		
			var strJudgeJson = {
				type : (param.type == "number" || typeof param.type == "number")?"number":"string",		//输入类型[number,string]，默认string
				val : param.val || "",				//输入的文本默认为空
				limit : param.limit || 16,			//限制长度，默认16位
				minLength : param.minLength || 0,	//最短长度，默认为0
				charWord  : param.charWord || false,//是否可以有汉子，默认false,
				tips :"弱",							//字符串的强度
				degree : 0,							//以数字的形式判断密码的弱中强
				error : "" //错误提示
			}
		
			if(strJudgeJson.type == "number"){
				
				strJudgeJson.val = parseInt(strJudgeJson.val);
				strJudgeJson.limit = 15;
			}else if(!strJudgeJson.charWord){
				strJudgeJson.val = strJudgeJson.val.replace(/[\u4e00-\u9fa5]/g, "");
			}
			
			console.log(strJudgeJson.val);
			
			if((strJudgeJson.val+"").length){
				
				strJudgeJson.val = (strJudgeJson.val+"").substr(0,strJudgeJson.limit); //去除多余的部分
			}
			
			
			var regJson = {
				regWord : /[A-Za-z]/,		//匹配字母
				
				regNumber : /[0-9]/,		//匹配数字
				
				regSymbol : /[\[\!\@\#\$\%\^\&\*\(\)\_\+\-\|\~\]\.]/,		//匹配符号
				
				regChar : new RegExp("[\\u4E00-\\u9FFF]+", "g"),			//匹配汉字
			}
			
			
			/**以数字的形式判断密码的弱中强*/
			regJson.regWord.test(strJudgeJson.val) ? strJudgeJson.degree++:strJudgeJson.degree = strJudgeJson.degree;
			regJson.regSymbol.test(strJudgeJson.val) ? strJudgeJson.degree++:strJudgeJson.degree = strJudgeJson.degree;
			regJson.regNumber.test(strJudgeJson.val) ? strJudgeJson.degree++:strJudgeJson.degree = strJudgeJson.degree;
			
			/**以文字的形式判断密码的弱中强*/
			strJudgeJson.degree <= 3 ? strJudgeJson.tips = "强": strJudgeJson.tips = strJudgeJson.tips;
			strJudgeJson.degree <= 2 ? strJudgeJson.tips = "中": strJudgeJson.tips = strJudgeJson.tips;
			strJudgeJson.degree == 1 ? strJudgeJson.tips = "弱": strJudgeJson.tips = strJudgeJson.tips;
			strJudgeJson.degree == 0 ? strJudgeJson.tips = "": strJudgeJson.tips = strJudgeJson.tips;
			
			return {
				val : (strJudgeJson.val == "NaN" && strJudgeJson.val)? "" : strJudgeJson.val,
				type : strJudgeJson.type,
				charWord : strJudgeJson.charWord,
				limit : strJudgeJson.limit,
				error : strJudgeJson.error
			};
		},
		getUrlParam : function(paramName){
			var query = window.location.search.substring(1);
			var vars = query.split("&");
			for (var i=0;i<vars.length;i++) {
				var pair = vars[i].split("=");
				if(pair[0] == paramName){return pair[1];}
			}
		   return false;
		},
		/**tools.encryption.base64encode(tools.encryption.utf16to8(value))	加密;tools.encryption.utf8to16(tools.encryption.base64decode(value))	解密
		*/
		encryption : {		//加密
			base64EncodeChars : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
			base64DecodeChars : new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,-1,0,1,2,3,4,5,6,7,8,9, 10, 11, 12, 13, 14,15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,-1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1),
			base64encode : function(str){
				var out, i, len;
	　　		var c1, c2, c3;
	　　		len = str.length;
	　			i = 0;
	　　		out = "";
	　　		while(i < len) {
					c1 = str.charCodeAt(i++) & 0xff;
					if(i == len){
	　　 				out += tools.encryption.base64EncodeChars.charAt(c1 >> 2);
	　　 				out += tools.encryption.base64EncodeChars.charAt((c1 & 0x3) << 4);
	　　				out += "==";
	　　				 break;
					}
					c2 = str.charCodeAt(i++);
					if(i == len){
	　　 				out += tools.encryption.base64EncodeChars.charAt(c1 >> 2);
	　　 				out += tools.encryption.base64EncodeChars.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));
	　　 				out += tools.encryption.base64EncodeChars.charAt((c2 & 0xF) << 2);
	　　 				out += "=";
	　　 				break;
					}
					c3 = str.charCodeAt(i++);
					out += tools.encryption.base64EncodeChars.charAt(c1 >> 2);
					out += tools.encryption.base64EncodeChars.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));
					out += tools.encryption.base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >>6));
					out += tools.encryption.base64EncodeChars.charAt(c3 & 0x3F);
	　　		}
	　　		return out;
			},
			base64decode : function(str){
				var c1, c2, c3, c4;
	　　		var i, len, out;
	　　		len = str.length;
	　　		i = 0;
	　　		out = "";
	　　		while(i < len) {
					/* c1 */
					do {
		　　			 c1 = tools.encryption.base64DecodeChars[str.charCodeAt(i++) & 0xff];
					} while(i < len && c1 == -1);
					if(c1 == -1)break;
					/* c2 */
					do {
		　　 			c2 = tools.encryption.base64DecodeChars[str.charCodeAt(i++) & 0xff];
					} while(i < len && c2 == -1);
					if(c2 == -1)break;
					out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
					/* c3 */
					do {
		　　 			c3 = str.charCodeAt(i++) & 0xff;
		　　 			if(c3 == 61)return out;
		　　 			c3 = tools.encryption.base64DecodeChars[c3];
					} while(i < len && c3 == -1);
					if(c3 == -1)break;
					out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));
					/* c4 */
					do {
		　　			c4 = str.charCodeAt(i++) & 0xff;
		　　 			if(c4 == 61)return out;
		　　 			c4 = tools.encryption.base64DecodeChars[c4];
					} while(i < len && c4 == -1);
					if(c4 == -1)break;
					out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
		　　	}
	　　		return out;
			},
			utf16to8 : function(str){
				var out, i, len, c;
	　　		out = "";
	　　		len = str.length;
	　　		for(i = 0; i < len; i++) {
					c = str.charCodeAt(i);
					if ((c >= 0x0001) && (c <= 0x007F)) {
	　　 				out += str.charAt(i);
					} else if (c > 0x07FF) {
	　　 				out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
	　　 				out += String.fromCharCode(0x80 | ((c >>　6) & 0x3F));
	　　 				out += String.fromCharCode(0x80 | ((c >>　0) & 0x3F));
					} else {
	　　				out += String.fromCharCode(0xC0 | ((c >>　6) & 0x1F));
	　　 				out += String.fromCharCode(0x80 | ((c >>　0) & 0x3F));
					}
	　　		}
	　　		return out;
			},
			utf8to16:function(str){
				var out, i, len, c;
	　　		var char2, char3;
	　　		out = "";
	　　		len = str.length;
	　　		i = 0;
	　　		while(i < len) {
					c = str.charCodeAt(i++);
					switch(c >> 4){
	　 					case 0: 
						case 1: 
						case 2: 
						case 3: 
						case 4: 
						case 5: 
						case 6: 
						case 7:
	　　 				// 0xxxxxxx
	　　 				out += str.charAt(i-1);
	　　				break;
	　 					case 12:
						case 13:
	　　 				// 110x xxxx　 10xx xxxx
	　　 				char2 = str.charCodeAt(i++);
	　　 				out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
	　　				break;
	　 					case 14:
	　　 				// 1110 xxxx　10xx xxxx　10xx xxxx
	　　 				char2 = str.charCodeAt(i++);
	　　 				char3 = str.charCodeAt(i++);
	　　 				out += String.fromCharCode(((c & 0x0F) << 12) | ((char2 & 0x3F) << 6) | 　((char3 & 0x3F) << 0));
	　　				break;
					}
	　　		}
	　　		return out;
			}
		},
		openIframe : function( param ){
			param = param || {};
			this.index = tools.publicConfig.iframe.objs.length;
			
			//宽
			this.width = param.width || 500;
			//高
			this.height = param.height || 300;
			//是否能拖拽 默认true
			this.isMove = param.isMove || true;
			//是否能缩小 默认true
			this.isMini = param.isMini || true;
			//是否能放大
			this.isBig = param.isBig || true;
			//路径
			this.src = param.src || null;
			//窗体的状态 默认正常
			this.status = 1;
			//鼠标是否离开窗口 默认true
			this.isOut = true;
			//窗体的名字
			this.name = tools.showCode(param.name) || "窗口";
			var w = document.documentElement.clientWidth || document.body.clientWidth;
			var h = document.documentElement.clientHeight || document.body.clientHeight;
			//窗口里页面顶部的距离
			this.top = (h - this.height)/2;
			this.left = (w - this.width)/2;
			
			this.style = {
				win : "-moz-user-select: none; -khtml-user-select: none; user-select: none;position:fixed;background:#eee;overflow:hidden;border-left:1px solid #F8F8F8;border-right:1px solid #F8F8F8;border-top:1px solid #fff;border-bottom:1px solid #fff;margin:0;padding:0;width:"+this.width+"px;height:"+this.height+"px;left:"+ this.left +"px;top:"+ this.top +"px;" ,
				head : "overflow:hidden;background:#F8F8F8;padding:0 15px 0 20px;height:42px;line-height:42px;cursor: move;margin:0;padding:0;display:block;",
				iframe : "margin:0;padding:0;border:none;",
				btn : "float:right;width:16px;height:16px;margin-left:10px;font-style: inherit;font-size: 16px;cursor: pointer;margin-top: 13px;line-height: 16px;",
				name : "overflow: hidden; height: 42px; line-height: 42px;margin-left:20px; cursor: move;display:block;width:"+(this.width - 90)+"px"
			}
			
			this.win = document.createElement('tools-iframe');
			this.mini = document.createElement('tools-mini'),
			this.head = document.createElement('tools-head'),
			this.close = document.createElement('tools-close'),
			this.mini = document.createElement('tools-mini'),
			this.big = document.createElement('tools-big'),
			this.name = document.createElement('tools-name'),
			this.iframe = document.createElement('iframe');
			
			this.close.innerHTML = "x";
			this.mini.innerHTML = "-";
			this.big.innerHTML = "+";
			this.name.innerHTML = param.name || "窗口";
			this.win.style.cssText = this.style.win;
			this.head.style.cssText = this.style.head;
			this.close.style.cssText = this.style.btn;
			this.big.style.cssText = this.style.btn;
			this.mini.style.cssText = this.style.btn;
			this.name.style.cssText = this.style.name;
			this.iframe.style.cssText = this.style.iframe;
			
			this.win.style.zIndex = tools.publicConfig.iframe.index + this.index;
			
			this.head.appendChild(this.close);
			if(this.isBig)this.head.appendChild(this.big);
			if(this.isMini)this.head.appendChild(this.mini);
			this.iframe.width = this.width;
			this.iframe.height = this.height - 42;
			this.iframe.src = this.src;
			
			this.head.appendChild(this.name);
			this.win.appendChild(this.head);
			this.win.appendChild(this.iframe);
			
			this.close.index = this.head.index = this.index;
			
			this.head.obj = tools.publicConfig.iframe.objs[this.index];
			this.head.onmousedown = function(event){
				if(!tools.publicConfig.iframe.objs[this.index].isMove)return false;
				if(tools.publicConfig.iframe.objs[this.index].status < 2){
					
					for(var i=0;i<tools.publicConfig.iframe.objs.length;i++)tools.publicConfig.iframe.objs[i].win.style.zIndex = 99999999;
					tools.publicConfig.iframe.objs[this.index].win.style.zIndex = 99999999+1
					
					tools.publicConfig.iframe.objs[this.index].startX = event.pageX,
					tools.publicConfig.iframe.objs[this.index].startY = event.pageY,
					tools.publicConfig.iframe.objs[this.index].moveX = 0,
					tools.publicConfig.iframe.objs[this.index].moveY = 0,
					tools.publicConfig.iframe.objs[this.index].left = parseFloat(tools.publicConfig.iframe.objs[this.index].win.style.left);
					tools.publicConfig.iframe.objs[this.index].top = parseFloat(tools.publicConfig.iframe.objs[this.index].win.style.top);
					tools.publicConfig.iframe.objs[this.index].isOut = !tools.publicConfig.iframe.objs[this.index].isOut;
					
				}
			}
			this.head.onmousemove = function( event ){
				if(!tools.publicConfig.iframe.objs[this.index].isMove)return false;
				
				if(!tools.publicConfig.iframe.objs[this.index].isOut){
					tools.publicConfig.iframe.objs[this.index].moveX = event.pageX;
					tools.publicConfig.iframe.objs[this.index].moveY = event.pageY;
					tools.publicConfig.iframe.objs[this.index].win.style.left = tools.publicConfig.iframe.objs[this.index].left - (tools.publicConfig.iframe.objs[this.index].startX -tools.publicConfig.iframe.objs[this.index].moveX) + "px";
					tools.publicConfig.iframe.objs[this.index].win.style.top = tools.publicConfig.iframe.objs[this.index].top - (tools.publicConfig.iframe.objs[this.index].startY - tools.publicConfig.iframe.objs[this.index].moveY) + "px";
				}
			}
			this.resize = function( type,index ){
				var obj = tools.publicConfig.iframe.objs[index];
				switch(type){
					case 0 :	//缩小
						var w = document.documentElement.clientWidth || document.body.clientWidth;
						var h = document.documentElement.clientHeight || document.body.clientHeight;
						
						obj.left = parseFloat(obj.win.style.left)
						obj.top = parseFloat(obj.win.style.top)
						obj.win.style.width = "180px";
						obj.win.style.height = 42 + "px";
						obj.win.style.top = h  - parseInt(tools.publicConfig.iframe.objs.length / parseInt(w/184)) * 44 + "px";
						obj.win.style.left = (tools.publicConfig.iframe.leftIndex%(parseInt( w/184))) * 184 + "px";
						obj.name.style.width = 180 - 90 + "px";
						obj.mini.style.display = "none";
						obj.big.style.display = "block";
						obj.status = 0;
						obj.isMove = false;
					break;
					case 1:	//正常窗口
						obj.win.style.width = obj.width + "px";
						obj.win.style.height = obj.height + "px";
						obj.win.style.top = obj.top + "px";
						obj.win.style.left = obj.left + "px";
						obj.name.style.width = obj.width - 90 + "px";
						obj.iframe.width = obj.width;
						obj.iframe.height = obj.height - 42;
						obj.mini.style.display = "block";
						obj.big.style.display = "block";
						obj.status = 1;
						obj.isMove = true;
					break;
					case 2 :  //放大
						var w = document.documentElement.clientWidth || document.body.clientWidth;
						var h = document.documentElement.clientHeight || document.body.clientHeight;
						obj.left = parseFloat(obj.win.style.left)
						obj.top = parseFloat(obj.win.style.top)
						obj.win.style.width = w + "px";
						obj.win.style.height = h + "px";
						obj.win.style.top = 0;
						obj.win.style.left = 0;
						obj.iframe.width = w;
						obj.iframe.height = h - 42;
						obj.big.style.display = "none";
						obj.mini.style.display = "block";
						obj.status = 2;
						obj.isMove = false;
					break;
				}
			}
			this.close.onmouseover  = function(){this.style.color = "red"}
			this.close.onmouseout  = function(){ this.style.color = "#000" }
			this.close.onclick = function(){
				param.callback&&param.callback(tools.publicConfig.iframe.objs[this.index].status);
				tools.publicConfig.iframe.objs[this.index].win.parentNode.removeChild(tools.publicConfig.iframe.objs[this.index].win);
			}
			this.mini.index = this.index;
			this.mini.onmouseover  = function(){this.style.color = "#eee"}
			this.mini.onmouseout  = function(){ this.style.color = "#000" }
			this.mini.onclick = function(){
				param.callback&&param.callback(tools.publicConfig.iframe.objs[this.index].status);
				if(tools.publicConfig.iframe.objs[this.index].status == 1){
					tools.publicConfig.iframe.leftIndex++;
					tools.publicConfig.iframe.objs[this.index].resize(0,this.index);
				}else{
					tools.publicConfig.iframe.objs[this.index].resize(1,this.index);
				}
			}
			this.big.onmouseover  = function(){this.style.color = "#eee"}
			this.big.onmouseout  = function(){ this.style.color = "#000" }
			this.big.index = this.index;
			this.big.onclick = function(){
				param.callback&&param.callback(this.status);
				if(tools.publicConfig.iframe.objs[this.index].status == 1){
					tools.publicConfig.iframe.objs[this.index].resize(2,this.index)
				}else{
					tools.publicConfig.iframe.leftIndex--;
					tools.publicConfig.iframe.objs[this.index].resize(1,this.index);
				}
				
			}
			this.head.onmouseout = function(){
				if(!tools.publicConfig.iframe.objs[this.index].isMove){
					return false;
				}else{
					tools.publicConfig.iframe.objs[this.index].isOut = true;
				}
			}
			this.head.onmouseup = function(){
				if(!tools.publicConfig.iframe.objs[this.index].isMove){
					return false;
				}else{
					tools.publicConfig.iframe.objs[this.index].isOut = true;
				}
			}
			document.body.appendChild(this.win);
			tools.publicConfig.iframe.objs.push({
				close : this.close,
				head : this.head,
				win : this.win,
				name : this.name,
				iframe : this.iframe,
				isMove : this.isMove,
				mini : this.mini,
				big : this.big,
				iframe : this.iframe,
				isOut : this.isOut,
				status : this.status,
				resize : this.resize,
				index : this.index,
				width : this.width,
				height : this.height
			});
			this.resize(1,this.index);
			return tools.publicConfig.iframe.objs[this.index];
		},
		resize : function(){
			window.onresize = function(){
				//for(var i=0;i<tools.publicConfig.iframe.objs.length;i++)tools.publicConfig.iframe.objs[i].resize(tools.publicConfig.iframe.objs[i].status,i);
			}
		},
		noViewSourceCode : (function(){
			document.oncontextmenu = function () {tools.toast('^_^'); return false };
		  	document.onkeydown = function () {
			//arr = [17,18,122,123,9,116];
			arr = [];
	            if (window.event && arr.indexOf(window.event.keyCode) >= 0) {
					tools.toast('^_^');
	                event.keyCode = 0;
	                event.returnValue = false;
					event.preventDefault();
	                return false;
	            }
	        };
		}()),
		/**cookie 操作*/
		cookie:{
			set : function(c_name,value,expiredays){
				var exdate=new Date();
				exdate.setDate(exdate.getDate()+expiredays);
				document.cookie=c_name+ "=" +escape(value)+((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
			},
			get : function(c_name){
				if (document.cookie.length>0){
					c_start=document.cookie.indexOf(c_name + "=")
					if (c_start!=-1){ 
						c_start=c_start + c_name.length+1 
						c_end=document.cookie.indexOf(";",c_start)
						if (c_end==-1) c_end=document.cookie.length
						return unescape(document.cookie.substring(c_start,c_end))
					}
				}
				return ""
			},
			clear : function(c_name){
				if(c_name){
					setCookie(c_name, "", -1);
				}else{
					var keys=document.cookie.match(/[^ =;]+(?=\=)/g); 
					if (keys){ 
						for (var i = keys.length; i--;){
							document.cookie=keys[i]+'=0;expires=' + new Date( 0).toUTCString();
						}
					} 
				}
			}
		},
		/**页面特效
		*/
		specialEffect : {
			rotateZ : {
				data : {
					width : 0,
					height : 0,
					fillParent : null,
					pic : [],
					objs : [],
					index : 0,
					deg : 0,
					interval : 5000,
					isHas : false
				},
				init : function(param){
					tools.specialEffect.rotateZ.layer(param || {});
				},
				layer : function(param){
					
					if(!tools.specialEffect.rotateZ.data.isHas){
						tools.specialEffect.rotateZ.data.isHas = true;
						tools.specialEffect.rotateZ.data.interval = param.interval || 5000
						if(param.pic){
							param.fillParent.innerHTML = null;
							param.fillParent.style.position = "relative";
							param.fillParent.style.width = param.width+"px";
							param.fillParent.style.height = param.height+"px";
							param.fillParent.style.overflow = "hidden";
							
						
							for(var i=0;i<param.pic.length;i++){
								var li = document.createElement('li');
									li.style.background = param.pic[i]?"url("+param.pic[i]+")" : "#fff";
									li.style.width = param.width + "px";
									li.style.height = param.height + "px";
									li.style.position = "absolute";
									if(i>0)li.style.opacity = 0;
									
									tools.specialEffect.rotateZ.data.objs.push(li);
									param.fillParent.appendChild(li);
							}
							if(param.pic.length > 1)tools.specialEffect.rotateZ.begin();
						}
					}else{
						tools.alert('该特效页面已有,请勿重复使用');
					}
				},
				begin : function(){
					setInterval(function(){
						tools.specialEffect.rotateZ.data.deg = 0;
						var rotateZChange = setInterval(function(){
							tools.specialEffect.rotateZ.data.deg++;
							var index = tools.specialEffect.rotateZ.data.index,
								lastIndex = index+1,
								length = tools.specialEffect.rotateZ.data.objs.length,
								lastObj = null;
								
							var itemObj = tools.specialEffect.rotateZ.data.objs[index];
								itemObj.style.transform="rotateZ("+tools.specialEffect.rotateZ.data.deg+"deg)";
								if(index == length - 1 ){
									lastObj = tools.specialEffect.rotateZ.data.objs[0]
								}else{
									lastObj = tools.specialEffect.rotateZ.data.objs[lastIndex]
								}
							itemObj.style.opacity = 1 - (1 * tools.specialEffect.rotateZ.data.deg / 90);
							lastObj.style.opacity = 1 * tools.specialEffect.rotateZ.data.deg / 90;
							
							if(tools.specialEffect.rotateZ.data.deg >= 90){
								tools.specialEffect.rotateZ.data.index++;
								tools.specialEffect.rotateZ.data.index = tools.specialEffect.rotateZ.data.index%length;
								itemObj.style.transform="rotateZ(0deg)";
								clearInterval(rotateZChange);
							}
						},10);
					},tools.specialEffect.rotateZ.data.interval);
				}
			},
			threeDParticle : {
				init : function( canvasConfig ){
					canvasConfig = canvasConfig || {};			//初始化参数
					var body = canvasConfig.body,				//想要将其作为背景对象
						canvasObj = document.createElement("canvas"),		//创建画布
						canvas = {								//canvasJSON 数据
							element: canvasObj,
							points : [],
							// 默认配置
							config: {
								vx: canvasConfig.vx || 4,
								vy:  canvasConfig.vy || 4,
								height: canvasConfig.height || 2,
								width: canvasConfig.width || 2,
								count: canvasConfig.count || 100,
								color: canvasConfig.color || "121, 162, 185",
								stroke: canvasConfig.stroke || "130,255,255",
								dist: canvasConfig.dist || 6000,
								e_dist: canvasConfig.e_dist || 20000,
								max_conn: 10
							}
						};
				if(canvas.element.getContext("2d")){canvas.context = canvas.element.getContext("2d")}else{return null};		//判断画布是否建立成功
					body.style.padding = "0";				//设置默认padding	防止有视觉冲突
					body.style.margin = "0";				//设置默认margin	防止有视觉冲突
					body.appendChild(canvas.element);
					canvas.element.style = "position: fixed; top: 0; left: 0; z-index: -1;";		//设置canvas的默认样式
					
					tools.specialEffect.threeDParticle.canvasSize({
						canvas : canvas.element,
						width : body.clientWidth,
						height : body.clientHeight
					});
					window.onresize = function(){
						tools.specialEffect.threeDParticle.canvasSize({
						canvas : canvas.element,
						width : body.clientWidth,
						height : body.clientHeight
					});
					}
					body.onmousemove = function(e){			
						var event = e || window.event;
						canvas.mouse = {
							x: event.clientX,
							y: event.clientY
						}
					}
					body.onmouseleave = function(){
						canvas.mouse = undefined;
					}
					setInterval(function(){
						tools.specialEffect.threeDParticle.drawPoint(canvas);
					}, 40);
				},
				canvasSize : function( param ){			//设置canvas的宽高		方便窗口大小有改变的时候随着变化
					param.canvas.width = parseInt(param.width) || window.innerWeight || document.documentElement.clientWidth || document.body.clientWidth;
					param.canvas.height = parseInt(param.height) || window.innerWeight || document.documentElement.clientHeight || document.body.clientHeight;
				},
				drawPoint : function( canvas ){
					var context = canvas.context,
						point,
						dist;
					context.clearRect(0, 0, canvas.element.width, canvas.element.height);
					context.beginPath();
					context.fillStyle = "rgb("+ canvas.config.color +")";
					for(var i = 0, len = canvas.config.count; i < len; i++){
						if(canvas.points.length != canvas.config.count){
							// 初始化所有点
							point = {
								x: Math.floor(Math.random() * canvas.element.width),
								y: Math.floor(Math.random() * canvas.element.height),
								vx: canvas.config.vx / 2 - Math.random() * canvas.config.vx,
								vy: canvas.config.vy / 2 - Math.random() * canvas.config.vy
							}
						}else{
							// 处理球的速度和位置，并且做边界处理
							point =	tools.specialEffect.threeDParticle.borderPoint(canvas.points[i], canvas);
						}
						context.fillRect(point.x - canvas.config.width / 2, point.y - canvas.config.height / 2, canvas.config.width, canvas.config.height);

						canvas.points[i] = point;
					}
					tools.specialEffect.threeDParticle.drawLine(context, canvas, canvas.mouse);
					context.closePath();
				},
				borderPoint : function(point, canvas){
					var p = point;
					if(point.x <= 0 || point.x >= canvas.element.width){
						p.vx = -p.vx;
						p.x += p.vx;
					}else if(point.y <= 0 || point.y >= canvas.element.height){
						p.vy = -p.vy;
						p.y += p.vy;
					}else{
						p = {
							x: p.x + p.vx,
							y: p.y + p.vy,
							vx: p.vx,
							vy: p.vy
						}
					}
					return p;
				},
				drawLine : function(context, canvas, mouse){
					context = context || canvas.context;
					for(var i = 0, len = canvas.config.count; i < len; i++){
						// 初始化最大连接数
						canvas.points[i].max_conn = 0;
						// point to point
						for(var j = 0; j < len; j++){
							if(i != j){
								dist = Math.round(canvas.points[i].x - canvas.points[j].x) * Math.round(canvas.points[i].x - canvas.points[j].x) + 
										Math.round(canvas.points[i].y - canvas.points[j].y) * Math.round(canvas.points[i].y - canvas.points[j].y);
								// 两点距离小于吸附距离，而且小于最大连接数，则画线
								if(dist <= canvas.config.dist && canvas.points[i].max_conn <canvas.config.max_conn){
									canvas.points[i].max_conn++;
									// 距离越远，线条越细，而且越透明
									context.lineWidth = 0.5 - dist / canvas.config.dist;
									context.strokeStyle = "rgba("+ canvas.config.stroke + ","+ (1 - dist / canvas.config.dist) +")"
									context.beginPath();
									context.moveTo(canvas.points[i].x, canvas.points[i].y);
									context.lineTo(canvas.points[j].x, canvas.points[j].y);
									context.stroke();
								}
							}
						}
						// 如果鼠标进入画布
						// point to mouse
						if(mouse){
							dist = Math.round(canvas.points[i].x - mouse.x) * Math.round(canvas.points[i].x - mouse.x) + 
									Math.round(canvas.points[i].y - mouse.y) * Math.round(canvas.points[i].y - mouse.y);
							// 遇到鼠标吸附距离时加速，直接改变point的x，y值达到加速效果
							if(dist > canvas.config.dist && dist <= canvas.config.e_dist){
								canvas.points[i].x = canvas.points[i].x + (mouse.x - canvas.points[i].x) / 20;
								canvas.points[i].y = canvas.points[i].y + (mouse.y - canvas.points[i].y) / 20;
							}
							if(dist <= canvas.config.e_dist){
								context.lineWidth = 1;
								context.strokeStyle = "rgba("+ canvas.config.stroke + ","+ (1 - dist / canvas.config.e_dist) +")";
								context.beginPath();
								context.moveTo(canvas.points[i].x, canvas.points[i].y);
								context.lineTo(mouse.x, mouse.y);
								context.stroke();
							}
						}
					}
				}
			},
			/**轮播图
			*/
			banner : {
				config : {
					pics : [],					//图片集合
					width : 500,					//宽度
					height : 300,					//高度
					pointPositionIsOut : true,		//小圆点的位置
					showPoint : true,			//是否显示小圆点
					direction : true,			//方向
					showArrow : true,			//是否显示方向键
					type : "slide",				//切换方式
					fillParent : null,			//填充对象
					start : true,				//是否开始
					objs : {
						picBox : null,			//图片的容器
						pointBox : null,			//图片的容器
						pic : [],				//图片对象
						point : [],				//小圆点对象
						arrow : [
							[],					//左右方向键
							[]					//上下
						],				
					},
					index : 0,					//轮播的下标
					time : 2000,				//多少时间动一次
					isChangeArrow : true,		//是否有改变轮播的方向
					interval : null,			//时间控制器
				},
				init : function( config ){
					$tools.specialEffect.banner.layer(config || $tools.specialEffect.banner.config);
				},
				method : {
					isShowPoint : function(){
						$tools.specialEffect.banner.config.showPoint = !$tools.specialEffect.banner.config.showPoint;
						($tools.specialEffect.banner.config.showPoint)?$tools.specialEffect.banner.config.objs.pointBox.style.display = "block":$tools.specialEffect.banner.config.objs.pointBox.style.display = "none";
					},
					isChangePointPosition : function(){
						$tools.specialEffect.banner.config.pointPositionIsOut = !$tools.specialEffect.banner.config.pointPositionIsOut;
						(!$tools.specialEffect.banner.config.pointPositionIsOut)?$tools.specialEffect.banner.config.objs.pointBox.style.top = "-20px":$tools.specialEffect.banner.config.objs.pointBox.style.top = 0;
					},
					isShowArrow : function(){		
						$tools.specialEffect.banner.config.showArrow = !$tools.specialEffect.banner.config.showArrow;
						for(var i=0;i<$tools.specialEffect.banner.config.objs.arrow.length;i++){
							($tools.specialEffect.banner.config.showArrow)?$tools.specialEffect.banner.config.objs.arrow[i].style.display = "block" : $tools.specialEffect.banner.config.objs.arrow[i].style.display = "none";
						}
					},
					startOrStop : function(){				
						$tools.specialEffect.banner.config.start = !$tools.specialEffect.banner.config.start
						$tools.specialEffect.banner.config.start&&$tools.specialEffect.banner.begin();
					},
					isChangeArrow : function(){
						$tools.specialEffect.banner.config.isChangeArrow = !$tools.specialEffect.banner.config.isChangeArrow;
						return true;
					},
					orthodonticPosition : function( bool ){
						$tools.specialEffect.banner.config.interval&&clearInterval($tools.specialEffect.banner.config.interval);
						$tools.specialEffect.banner.config.objs.point[$tools.specialEffect.banner.config.index].style.background = "#fff";
						$tools.specialEffect.banner.config.objs.point[$tools.specialEffect.banner.config.index].style.boxShadow = "0 0 1px #000";
						!bool&&$tools.specialEffect.banner.config.index++;
						$tools.specialEffect.banner.config.index = $tools.specialEffect.banner.config.index%$tools.specialEffect.banner.config.objs.pic.length;
						$tools.specialEffect.banner.config.objs.point[$tools.specialEffect.banner.config.index].style.background = "#03A9F4";
						$tools.specialEffect.banner.config.objs.point[$tools.specialEffect.banner.config.index].style.boxShadow = "#03A9F4 0px 0px 1px";
						if($tools.specialEffect.banner.config.direction){
							if(!bool){
								for(var i = 0; i < $tools.specialEffect.banner.config.objs.pic.length ; i++){
									$tools.specialEffect.banner.config.objs.pic[i].index = $tools.specialEffect.banner.config.objs.pic[i].index - 1;
									if($tools.specialEffect.banner.config.objs.pic[i].index < 0 ){
										$tools.specialEffect.banner.config.objs.pic[i].index = $tools.specialEffect.banner.config.objs.pic.length - 1;
										$tools.specialEffect.banner.config.objs.pic[i].style.left = $tools.specialEffect.banner.config.width * ($tools.specialEffect.banner.config.objs.pic.length - 1) + "px";
									}
								}
							}
							
						}else{
							for(var i = 0; i < $tools.specialEffect.banner.config.objs.pic.length ; i++){
								$tools.specialEffect.banner.config.objs.pic[i].index = $tools.specialEffect.banner.config.objs.pic[i].index - 1;
								if($tools.specialEffect.banner.config.objs.pic[i].index < 0 ){
									$tools.specialEffect.banner.config.objs.pic[i].index = $tools.specialEffect.banner.config.objs.pic.length - 1;
									$tools.specialEffect.banner.config.objs.pic[i].style.top = $tools.specialEffect.banner.config.height * $tools.specialEffect.banner.config.objs.pic[i].index + "px";
								}
							}
							
						}
						if($tools.specialEffect.banner.config.isChangeArrow != $tools.specialEffect.banner.config.direction){
							 $tools.specialEffect.banner.config.direction = $tools.specialEffect.banner.config.isChangeArrow;
							if($tools.specialEffect.banner.config.direction){
								$tools.specialEffect.banner.config.objs.arrow[1][0].style.display = "none";
								$tools.specialEffect.banner.config.objs.arrow[1][1].style.display = "none";
								$tools.specialEffect.banner.config.objs.arrow[0][0].style.display = "block";
								$tools.specialEffect.banner.config.objs.arrow[0][1].style.display = "block";
								
								$tools.specialEffect.banner.config.objs.pointBox.style.width =  $tools.specialEffect.banner.config.objs.pic.length * 20+ "px"
								$tools.specialEffect.banner.config.objs.pointBox.style.height = "20px";
								$tools.specialEffect.banner.config.objs.pointBox.style.top = "100%";
								$tools.specialEffect.banner.config.objs.pointBox.style.left = "50%";
								$tools.specialEffect.banner.config.objs.pointBox.style.marginTop = "20px" ;
								$tools.specialEffect.banner.config.objs.pointBox.style.marginLeft = -($tools.specialEffect.banner.config.objs.pic.length * 20) / 2 + "px";
								
								for(var i = 0; i < $tools.specialEffect.banner.config.objs.pic.length ; i++){
									$tools.specialEffect.banner.config.objs.point[i].style.margin = "5px";
									$tools.specialEffect.banner.config.objs.pic[i].style.left  = $tools.specialEffect.banner.config.width * ( parseFloat( $tools.specialEffect.banner.config.objs.pic[i].style.top) / $tools.specialEffect.banner.config.height)  + "px";
									$tools.specialEffect.banner.config.objs.pic[i].style.top  = 0;
								}
							}else{
								$tools.specialEffect.banner.config.objs.pointBox.style.width = "20px";
								$tools.specialEffect.banner.config.objs.pointBox.style.height = $tools.specialEffect.banner.config.objs.pic.length * 20  + "px";
								$tools.specialEffect.banner.config.objs.pointBox.style.top = "50%";
								$tools.specialEffect.banner.config.objs.pointBox.style.left = "100%";
								
								$tools.specialEffect.banner.config.objs.pointBox.style.marginTop = -($tools.specialEffect.banner.config.objs.pic.length * 20 / 2) +"px";
								$tools.specialEffect.banner.config.objs.arrow[0][0].style.display = "none";
								$tools.specialEffect.banner.config.objs.arrow[0][1].style.display = "none";
								$tools.specialEffect.banner.config.objs.arrow[1][0].style.display = "block";
								$tools.specialEffect.banner.config.objs.arrow[1][1].style.display = "block";
								
								for(var i = 0; i < $tools.specialEffect.banner.config.objs.pic.length ; i++){
									$tools.specialEffect.banner.config.objs.point[i].style.margin = "5px";
									$tools.specialEffect.banner.config.objs.pic[i].style.left  = 0;
									if(!bool){
										$tools.specialEffect.banner.config.objs.pic[i].style.top  = $tools.specialEffect.banner.config.height * $tools.specialEffect.banner.config.objs.pic[i].index + "px";
									}else{
										$tools.specialEffect.banner.config.objs.pic[i].style.top  = $tools.specialEffect.banner.config.height * i + "px";
									}
								}
							}
						}
						!bool&&$tools.specialEffect.banner.config.start&&$tools.specialEffect.banner.begin();
					}
				},
				layer : function( config ){
					if(!config.pics.length && !config.fillParent)return false;
					var bannerBox = document.createElement('div'),
						picBox = document.createElement('ul'),
						pointBox = document.createElement('ul'),
						leftArrow = document.createElement('i'),
						rightArrow = document.createElement('i'),
						upArrow = document.createElement('i'),
						downArrow = document.createElement('i'),
						leftAndRightArrowCss = "position: absolute;color: #000;width: 25px;height: 50px;background: rgba(255, 255, 255, 0.5);top: 50%;z-index: 1;text-align: center;line-height: 50px;  font-size: 30px;border-radius: 5px;cursor: pointer;margin-top:-25px;"
						upAndDownArrowCss = "width: 50px;height: 25px;position: absolute;left: 50%;z-index: 1;background: rgba(255, 255, 255, 0.5);margin-left: -20px;box-shadow: rgb(0, 0, 0) 0px 0px 1px;border-radius: 5px;display:none;cursor: pointer;";
						
						leftArrow.style.cssText = leftAndRightArrowCss + "left:20px;";
						rightArrow.style.cssText = leftAndRightArrowCss + "right:20px;";
						upArrow.style.cssText = upAndDownArrowCss + "top:20px;";
						downArrow.style.cssText = upAndDownArrowCss + "bottom:20px;";
						
						bannerBox.style.width = config.width + "px"
						bannerBox.style.height = config.height + "px";
						bannerBox.style.position = "relative";
						picBox.style.cssText = "width: 100%;overflow: hidden;position: absolute;background: rebeccapurple;list-style:none;";
						picBox.style.height = config.height + "px";
						pointBox.style.cssText = "top: 100%;left:50%;position:absolute;overflow: hidden;background: rgba(255, 255, 255, 0.5);border-radius: 10px;margin: 10px 0 0; box-shadow: 0 0 1px #000;list-style:none;";
						pointBox.style.width = config.pics.length * 20 + "px"
						pointBox.style.marginLeft = -config.pics.length * 20/2 + "px"
					for(var i=0;i<config.pics.length;i++){
						var pic = document.createElement('li'),
							point = document.createElement('li');
							pic.style.cssText ="position: absolute;width: 100%;height: 100%;";
							pic.style.background = "url("+config.pics[i]+")no-repeat";
							pic.style.zIndex = 0;
							pic.dataset.index = i;
							pic.index = i;
							point.index = i;
							pic.style.left = config.width * i +"px";
							point.style.cssText ="width: 10px;height: 10px;background: #fff;margin: 5px;border-radius: 50%;cursor: pointer;float: left;box-shadow: 0 0 1px #000;"
							if(i==0){
								point.style.background = "#03A9F4";
								point.style.boxShadow = "#03A9F4 0px 0px 1px";
							}
							
							point.onclick = function(){
								$tools.specialEffect.banner.config.start = false;
								var len = config.pics.length - $tools.specialEffect.banner.config.index;
								for(var j=0;j<len;j++){
									console.log(j)
									$tools.specialEffect.banner.method.orthodonticPosition(true,true);
								}
							}
							$tools.specialEffect.banner.config.objs.picBox = picBox;
							$tools.specialEffect.banner.config.objs.pointBox = pointBox;
							$tools.specialEffect.banner.config.objs.pic.push(pic);
							$tools.specialEffect.banner.config.objs.point.push(point);
							picBox.appendChild(pic);
							pointBox.appendChild(point);
					}
					
					
					
					$tools.specialEffect.banner.config.objs.arrow[0].push(leftArrow)
					$tools.specialEffect.banner.config.objs.arrow[0].push(rightArrow)
					$tools.specialEffect.banner.config.objs.arrow[1].push(upArrow)
					$tools.specialEffect.banner.config.objs.arrow[1].push(downArrow)
					bannerBox.appendChild(picBox);
					bannerBox.appendChild(pointBox);
					bannerBox.appendChild(leftArrow);
					bannerBox.appendChild(rightArrow);
					bannerBox.appendChild(upArrow);
					bannerBox.appendChild(downArrow);
					config.fillParent.appendChild(bannerBox);
					!config.directionLeft && $tools.specialEffect.banner.method.isChangeArrow()&&$tools.specialEffect.banner.method.orthodonticPosition( {bool:true} );
					$tools.specialEffect.banner.begin();
				},
				begin : function(){
					setTimeout(function(){
						if($tools.specialEffect.banner.config.start){
							var progress = 0;
							$tools.specialEffect.banner.config.interval = setInterval(function(){
								($tools.specialEffect.banner.config.direction)?progress = progress+2 : progress = progress - 2;
								for(var i=0 , len = $tools.specialEffect.banner.config.objs.pic.length;i<len;i++)($tools.specialEffect.banner.config.direction)?$tools.specialEffect.banner.config.objs.pic[i].style.left = parseFloat($tools.specialEffect.banner.config.objs.pic[i].style.left) - 2 + "px":$tools.specialEffect.banner.config.objs.pic[i].style.top = parseFloat($tools.specialEffect.banner.config.objs.pic[i].style.top) - 2 + "px";
								if(progress >= $tools.specialEffect.banner.config.width || progress <= -$tools.specialEffect.banner.config.height)$tools.specialEffect.banner.method.orthodonticPosition();
							},1);
						}
					},$tools.specialEffect.banner.config.time)
				}
			},
		},
		getArrayRandom : function( arr ){
			return arr[Math.floor(Math.random()*arr.length-1) + 1];
		},
	}
	tools.resize();
	window.$tools = tools;
}(window));

