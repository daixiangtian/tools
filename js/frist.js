var toolsShow = {
	data : [
		{
			name : "replace",
			code : '',
			method : function(item){
				$tools.openIframe({
					width : 500,
					height : 500,
					src : "./effect/replace.html",
					name : "my-tools.js",
				});
			}
		},{
			name : "confirm",
			code : "",
			method : function(){
				$tools.openIframe({
					width : 500,
					height : 500,
					src : "./effect/confirm.html",
					name : "my-tools.js",
				});
			}
		},{
			name : "alert",
			code : "",
			method : function(){
				$tools.alert("这个是 $tools.alert 函数方法");
			}
		},{
			name : "showKeyboard",
			code : "",
			method : function(item){
			$tools.openIframe({
					width : 500,
					height : 600,
					src : "./effect/showKeyboard.html",
					name : "my-tools.js",
				});
			}
		},{
			name : "StringJudge",
			code : "",
			method : function(){
				$tools.openIframe({
					width : 500,
					height : 300,
					src : "./effect/stringJudge.html",
					name : "my-tools.js",
				});
			}
		},{
			name : "toast",
			code : "",
			method : function(){
				$tools.toast("这是toast");
			}
		},{
			name : "timeStampConversion",
			code : "",
			method : function(){
				
				$tools.openIframe({
					width : 500,
					height : 300,
					src : "./effect/timeStampConversion.html",
					name : "my-tools.js",
				});
				
				//$tools.alert("当前时间戳："+new Date().getTime()+"======>"+$tools.timeStampConversion(new Date().getTime()));
			}
		},{
			name : "base64encode",
			code : "",
			method : function(){
				$tools.openIframe({
					width : 500,
					height : 300,
					src : "./effect/base64encode.html",
					name : "my-tools.js",
				});
			}
		},{
			name : "utf8to16",
			code : "",
			method : function(){
				
				$tools.openIframe({
					width : 500,
					height : 300,
					src : "./effect/utf8to16.html",
					name : "my-tools.js",
				});
			}
		},{
			name : "picLoadLayer",
			code : "",
			method : function(){
				
			}
		},{
			name : "specialEffect - rotateZ",
			code : "",
			method : function(){
				
				$tools.openIframe({
					width : 500,
					height : 500,
					src : "./effect/specialEffect-rotateZ.html",
					name : "my-tools.js",
				});
			}
		},{
			name : "specialEffect - threeDParticle",
			code : "",
			method : function(){
				$tools.openIframe({
					width : 800,
					height : 500,
					src : "./effect/specialEffect-threeDParticle.html",
					name : "my-tools.js",
				});
			}
		},{
			name : "openIframe",
			code : "",
			method : function(){
				
				$tools.openIframe({
					width : 800,
					height : 500,
					src : "https://www.52mihuan.com/tools",
					name : "my-tools.js",
				});
			}
		},{
			name : "banner",
			code : "",
			method : function(){
				
				$tools.openIframe({
					width : 800,
					height : 500,
					src : "./effect/banner.html",
					name : "my-tools.js",
				});
			}
		},{
			name : "isPhoneCode",
			code : "",
			method : function(){
				
				$tools.openIframe({
					width :500,
					height : 300,
					src : "./effect/isPhoneCode.html",
					name : "my-tools.js",
				});
			}
		}

	],
	codeChage : function( code ){
		code = code.split("<").join("&lt;");
		code = code.split(">").join("&gt;");
		code = code.split("\"").join("&quot;");
		console.log(code);
	}
}