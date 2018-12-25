

// true===>pc false===>mobile
var platform = (navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i));


Array.prototype.in_array = function (element) { 
 
　　for (var i = 0; i < this.length; i++) { 
 
　　if (this[i] == element) { 
 
　　return true; 
 
    } 
 
  } return false; 
 
} 	

	function hasClass(obj, cls) {  
		return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));  
	}  
	  
	function addClass(obj, cls) {  
		if (!this.hasClass(obj, cls)) obj.className += " " + cls;  
	}  

	function ReplaceClassThree(obj,index){
		var num = 28;
		var num2 = 8
		for(var i=0; i<obj.length;i++){
			if(index%4 == 0){
				num2++;
				if(i%3 == 0){
					obj[i].ClassName = "L"+num2;
				}else if(i%3 == 1){
					obj[i].ClassName = "L"+(num2+10);
				}else if(i%3 == 2){
					obj[i].ClassName = "L"+(num2-10);
				}
			}else if(index%4 == 1){
				num -= 3;
				obj[i].ClassName = "L"+ num;
			}else if(index%4 == 2){
				num--;
				if(i%3 == 0){
					obj[i].ClassName = "L"+(num-20);
				}else if(i%3 == 1){
					obj[i].ClassName = "L"+(num-10);
				}else if(i%3 == 2){
					obj[i].ClassName = "L"+(num);
				}
				
			}else if(index%4 == 3){
				obj[i].ClassName = "L"+(i*3+1);
			}
		}
	}

	let cube = {
		transform : "",
		touchstartX:0,
		touchstartY : 0,
		touchendX:0,
		touchendY:0,
		DifferenceY:0,
		DifferenceX:0,
		intLayer : function(colorStyleArray){
			/* 初始化布局 S */
			var html = document.getElementsByTagName("html")[0];
			var documentHeight =  document.documentElement.clientHeight;
			html.innerHTML = html.innerHTML;
			var body = document.getElementsByTagName("body")[0];
			body.innerHTML = "<div><span></span></div><div><span></span></div><ul></ul><audio id='audio' src='./radio/stop.mp3'></audio>";
			var ul = document.getElementsByTagName("ul")[0];
			var div1 = document.getElementsByTagName("div")[0];
			var div2 = document.getElementsByTagName("div")[1];
			var span1 = document.getElementsByTagName("span")[0];
			var span2 = document.getElementsByTagName("span")[1];
			
			if(cube.transform){
				ul.style.transform = cube.transform
			}
			var translateZ = 1;
			var arrayX=[],arrayY=[],arrayZ = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27];			//创建三个27长的空数组，用来装每一个li标签的旋转度数
			var OriginX = [];

			//arrayZ.splice(5,1,"A"); //删除一项，插入两项	第一个参数是起始下标值，第二个是个数，第三个是替换的值

			var str='';
			var choiceColor = 0;
			for(var i=0; i<27;i++){
				if(colorStyleArray){
					let ahtm = "";
					for(let j=0;j<6;j++){
						ahtm += '<a index='+i+' style="background:'+colorStyleArray[choiceColor].split(";")[j]+'"></a>';
					}
					str += '<li  class="L'+(i+1)+'">'+ahtm+'</li>';
					choiceColor++;
				}else{
					str += '<li  class="L'+(i+1)+'"><a index='+i+'></a><a index='+i+'></a><a index='+i+'></a><a index='+i+'></a><a index='+i+'></a><a index='+i+'></a></li>';
				}
				ul.innerHTML = str;
			}
			var li = document.getElementsByTagName("li");
			var a = document.getElementsByTagName("a");
			let colorArray = ["blue","pink","red","green","yellow","#fcf"];
			
			var colorStyle = "";
			for(let i = 0; i < colorArray.length ; i++)colorStyle +=colorArray[i]+";";
			choiceColor = 0;
			for(var i=0;i<li.length;i++){
				var layered = i%9;
				var Left = layered % 3;
				var Top = parseInt(layered/3);
				i%9==0?translateZ--:translateZ=translateZ;
				li[i].style.left = Left * 50 + "px";
				li[i].style.top = Top * 50 + "px";
				li[i].style.transform = "translateZ("+translateZ*50+"px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)";
				
				if(colorStyleArray){
					li[i].setAttribute("colorStyle",colorStyleArray[choiceColor]);
					choiceColor++;
				}else{
					li[i].setAttribute("colorStyle",colorStyle);
				}
			}
			
			var ulrotateY = ulrotateX = 0									//上下左右的参数值
			
			
			if(platform){
				
			}else{
				span1.addEventListener('touchmove', function(event) {			//左右滑块
					// 如果这个元素的位置内只有一个手指的话
					if (event.targetTouches.length == 1) {
				　　　　 event.preventDefault();// 阻止浏览器默认事件，重要 
						var touch = event.targetTouches[0];
						var left = div1.offsetLeft;
						// 把元素放在手指所在的位置
						span1.style.left = touch.pageX - left  + 'px';
						if(span1.offsetLeft >= div1.clientWidth - span1.clientWidth){
							span1.style.left = div1.clientWidth - span1.clientWidth + 'px';
						}else if(span1.offsetLeft <= 0){
							span1.style.left = '0px';
						}
						ul.style.transform = "rotateX("+ ulrotateX +"deg)  rotateY("+ span1.offsetLeft +"deg)";
						ulrotateY = span1.offsetLeft;
						cube.transform = "rotateX("+ ulrotateX +"deg)  rotateY("+ span1.offsetLeft +"deg)";
						}
				}, false);

				span2.addEventListener('touchmove', function(event) {			//上下滑块
					// 如果这个元素的位置内只有一个手指的话
					event.preventDefault();// 阻止浏览器默认事件，重要 
					var touch = event.targetTouches[0];
					var Top = div2.offsetTop;
					// 把元素放在手指所在的位置
					span2.style.top = touch.pageY - Top  + 'px';
					if(span2.offsetTop >= div2.clientHeight - span2.clientHeight){
						span2.style.top = div2.clientHeight - span2.clientHeight + 'px';
					}else if(span2.offsetTop <= 0){
						span2.style.top = '0px';
					}
					ul.style.transform = "rotateX("+ span2.offsetTop +"deg) rotateY("+ ulrotateY +"deg)";
					cube.transform = "rotateX("+ ulrotateX +"deg)  rotateY("+ span1.offsetLeft +"deg)";
					ulrotateX = span2.offsetTop;
				}, false);
				
				/* 初始化布局 E */
				
				/*事件绑定S*/
				for(let i=0;i<li.length;i++){
					let childNodes = li[i].childNodes;
					childNodes[0].addEventListener('touchstart',cube.oneTouch.start,false);
					childNodes[0].addEventListener('touchmove',cube.oneTouch.move,false);
					childNodes[0].addEventListener('touchend',cube.oneTouch.end,false);
					
					
					childNodes[1].addEventListener('touchstart',cube.twoTouch.start,false);
					childNodes[1].addEventListener('touchmove',cube.twoTouch.move,false);
					childNodes[1].addEventListener('touchend',cube.twoTouch.end,false);
					
					
					childNodes[2].addEventListener('touchstart',cube.threeTouch.start,false);
					childNodes[2].addEventListener('touchmove',cube.threeTouch.move,false);
					childNodes[2].addEventListener('touchend',cube.threeTouch.end,false);
					
					
					childNodes[3].addEventListener('touchstart',cube.fourTouch.start,false);
					childNodes[3].addEventListener('touchmove',cube.fourTouch.move,false);
					childNodes[3].addEventListener('touchend',cube.fourTouch.end,false);
					
					
					childNodes[4].addEventListener('touchstart',cube.fiveTouch.start,false);
					childNodes[4].addEventListener('touchmove',cube.fiveTouch.move,false);
					childNodes[4].addEventListener('touchend',cube.fiveTouch.end,false);
					
					
					childNodes[5].addEventListener('touchstart',cube.sixTouch.start,false);
					childNodes[5].addEventListener('touchmove',cube.sixTouch.move,false);
					childNodes[5].addEventListener('touchend',cube.sixTouch.end,false);
				}
				
				/*事件绑定E*/
			}
		},
		beforeAndAfterRotate:function(column,direction){		//前后旋转
			column?column=column:column=0			//第几列
			for( var i = 0; i < 27; i++){		//获取到该旋转的方块
				if(	i % 3 === column ){
					var minLi = document.getElementsByTagName("li")[i]		//通过Class来进行获取
					addClass(minLi,"rotate");
				}
			}
			let rotates = document.getElementsByClassName('rotate');
			
			for( let i = 0 ; i < rotates.length ; i++ ){			//设置旋转基点
				switch( i ){
					case 0:
						rotates[i].style.transformOrigin =	"25px 75px -75px";		//每一个A的旋转基点
					break;
					case 1:
						rotates[i].style.transformOrigin =	"25px 25px -75px";		//每一个A的旋转基点
					break;
					case 2:
						rotates[i].style.transformOrigin =	"25px -25px -75px";		//每一个A的旋转基点
					break;
					case 3:
						rotates[i].style.transformOrigin =	"25px 75px -25px";		//每一个A的旋转基点
					break;
					case 4:
						rotates[i].style.transformOrigin =	"25px 25px -25px";		//每一个A的旋转基点
					break;
					case 5:
						rotates[i].style.transformOrigin =	"25px -25px -25px";		//每一个A的旋转基点
					break;
					case 6:
						rotates[i].style.transformOrigin =	"25px 75px 25px";		//每一个A的旋转基点
					break;
					case 7:
						rotates[i].style.transformOrigin =	"25px 25px 25px";		//每一个A的旋转基点
					break;
					case 8:
						rotates[i].style.transformOrigin =	"25px -25px 25px";		//每一个A的旋转基点
					break;
				}
			}
			var rotateXDeg = 0;
			let rotateInterval = setInterval(function(){	//用时间控制器来进行旋转
				!direction?rotateXDeg++:rotateXDeg--;
				for( let i = 0 ; i < rotates.length ; i++ ){
					let translateZ = (i >= 3 && i < 6)?"translateZ(-50px) ":( i >= 6 && i < 9 )?"translateZ(-100px) ":"translateZ(0px) ";
					let transformStyle = "rotateX("+rotateXDeg+"deg)  rotateY(0deg) rotateZ(0deg)";
					rotates[i].style.transform = translateZ+transformStyle;
				}
				if(rotateXDeg % 90 === 0){
					clearInterval(rotateInterval);
					cube.colorChange("上下",direction);
				}
			},5)
			
		},
		planeRotate:function(temp,direction){					//平面旋转
			for( var i = 0; i < 27; i++){		//获取到该旋转的方块
				if(i<9 && !temp){					
					var minLi = document.getElementsByTagName("li")[i]
					addClass(minLi,"rotate");
				}else if(i >=9 && i<18 && temp === 1){
					var minLi = document.getElementsByTagName("li")[i]
					addClass(minLi,"rotate");
				}else if(i >=18 && i<27 && temp === 2){
					var minLi = document.getElementsByTagName("li")[i]
					addClass(minLi,"rotate");
				}
			}
			let rotates = document.getElementsByClassName('rotate');
			
			for( let i = 0 ; i < rotates.length ; i++ ){			//设置旋转基点
				switch( i ){
					case 0:
						rotates[i].style.transformOrigin =	"75px 75px -75px";		//每一个A的旋转基点
					break;
					case 1:
						rotates[i].style.transformOrigin =	"25px 75px -75px";		//每一个A的旋转基点
					break;
					case 2:
						rotates[i].style.transformOrigin =	"-25px 75px -75px";		//每一个A的旋转基点
					break;
					case 3:
						rotates[i].style.transformOrigin =	"75px 25px -75px";		//每一个A的旋转基点
					break;
					case 4:
						rotates[i].style.transformOrigin =	"25px 25px -75px";		//每一个A的旋转基点
					break;
					case 5:
						rotates[i].style.transformOrigin =	"-25px 25px -75px";		//每一个A的旋转基点
					break;
					case 6:
						rotates[i].style.transformOrigin =	"75px -25px -75px";		//每一个A的旋转基点
					break;
					case 7:
						rotates[i].style.transformOrigin =	"25px -25px -75px";		//每一个A的旋转基点
					break;
					case 8:
						rotates[i].style.transformOrigin =	"-25px -25px -75px";		//每一个A的旋转基点
					break;
				}
			}
			var rotateZDeg = 0;
			let rotateInterval = setInterval(function(){	//用时间控制器来进行旋转
				!direction?rotateZDeg++:rotateZDeg--;
				for( let i = 0 ; i < rotates.length ; i++ ){
					let translateZ = (temp === 1)?"translateZ(-50px) ":( temp === 2 )?"translateZ(-100px) ":"translateZ(0px) ";
					let transformStyle = "rotateX(0deg)  rotateY(0deg) rotateZ("+rotateZDeg+"deg)";
					rotates[i].style.transform = translateZ+transformStyle;
				}
				if(rotateZDeg % 90 === 0){
					clearInterval(rotateInterval);
					cube.colorChange("平面",direction);
				}
			},5)
		},
		leftAndRightRotate:function(line,direction){					//左右选择
			for( var i = 0; i < 27; i++){		//获取到该旋转的方块
				if(line === 1 ){
					if((i >= 3 && i < 6 )|| (i >= 12 && i< 15) || (i >=21 && i< 24)){
						var minLi = document.getElementsByTagName("li")[i]		//通过Class来进行获取
						addClass(minLi,"rotate");
					}
				}else if(line === 2){
					if((i >= 6 && i < 9 )|| (i >= 15 && i< 18) || (i >=24 && i< 27)){
						var minLi = document.getElementsByTagName("li")[i]		//通过Class来进行获取
						addClass(minLi,"rotate");
					}
				}else{
					if(	i < 3 || (i >= 9 && i< 12) || (i >=18 && i< 21)){
						var minLi = document.getElementsByTagName("li")[i]		//通过Class来进行获取
						addClass(minLi,"rotate");
					}
				}
			}
			
			let rotates = document.getElementsByClassName('rotate');
			
			for( let i = 0 ; i < rotates.length ; i++ ){			//设置旋转基点
				switch( i ){
					case 0:
						rotates[i].style.transformOrigin =	"75px 25px -75px";		//每一个A的旋转基点
					break;
					case 1:
						rotates[i].style.transformOrigin =	"25px 25px -75px";		//每一个A的旋转基点
					break;
					case 2:
						rotates[i].style.transformOrigin =	"-25px 25px -75px";		//每一个A的旋转基点
					break;
					case 3:
						rotates[i].style.transformOrigin =	"75px 25px -25px";		//每一个A的旋转基点
					break;
					case 4:
						rotates[i].style.transformOrigin =	"25px 25px -25px";		//每一个A的旋转基点
					break;
					case 5:
						rotates[i].style.transformOrigin =	"-25px 25px -25px";		//每一个A的旋转基点
					break;
					case 6:
						rotates[i].style.transformOrigin =	"75px 25px 25px";		//每一个A的旋转基点
					break;
					case 7:
						rotates[i].style.transformOrigin =	"25px 25px 25px";		//每一个A的旋转基点
					break;
					case 8:
						rotates[i].style.transformOrigin =	"-25px 25px 25px";		//每一个A的旋转基点
					break;
				}
			}
			var rotateYDeg = 0;
			let rotateInterval = setInterval(function(){	//用时间控制器来进行旋转
				!direction?rotateYDeg++:rotateYDeg--;
				for( let i = 0 ; i < rotates.length ; i++ ){
					let translateZ = (i >= 3 && i < 6)?"translateZ(-50px) ":( i >= 6 && i < 9 )?"translateZ(-100px) ":"translateZ(0px) ";
					let transformStyle = "rotateX(0deg)  rotateY("+rotateYDeg+"deg) rotateZ(0deg)";
					rotates[i].style.transform = translateZ+transformStyle;
				}
				if(rotateYDeg % 90 === 0){
					clearInterval(rotateInterval);
					cube.colorChange("左右",direction);
				}
			},5)
		},
		colorChange :function(directionType,param){		
			var rotates = document.getElementsByClassName("rotate");		//通过Class来进行获取
			var lis = document.getElementsByTagName("li");
			var colorStyleArray = [];
			
			var rotatesColor = [];
			for(let i = 0;i<rotates.length;i++){
				rotatesColor.push(rotates[i].getAttribute("colorstyle"));
			}
			
			
			if(param && directionType != "上下"){		//往左边转
				rotates[0].setAttribute("colorstyle",rotatesColor[2]);
				rotates[1].setAttribute("colorstyle",rotatesColor[5]);
				rotates[2].setAttribute("colorstyle",rotatesColor[8]);
				rotates[3].setAttribute("colorstyle",rotatesColor[1]);
				rotates[4].setAttribute("colorstyle",rotatesColor[4]);
				rotates[5].setAttribute("colorstyle",rotatesColor[7]);
				rotates[6].setAttribute("colorstyle",rotatesColor[0]);
				rotates[7].setAttribute("colorstyle",rotatesColor[3]);
				rotates[8].setAttribute("colorstyle",rotatesColor[6]);
			}else if(directionType != "上下"){		//往右边转
				rotates[0].setAttribute("colorstyle",rotatesColor[6]);
				rotates[1].setAttribute("colorstyle",rotatesColor[3]);
				rotates[2].setAttribute("colorstyle",rotatesColor[0]);
				rotates[3].setAttribute("colorstyle",rotatesColor[7]);
				rotates[4].setAttribute("colorstyle",rotatesColor[4]);
				rotates[5].setAttribute("colorstyle",rotatesColor[1]);
				rotates[6].setAttribute("colorstyle",rotatesColor[8]);
				rotates[7].setAttribute("colorstyle",rotatesColor[5]);
				rotates[8].setAttribute("colorstyle",rotatesColor[2]);
			}else if(param){
				rotates[0].setAttribute("colorstyle",rotatesColor[6]);
				rotates[1].setAttribute("colorstyle",rotatesColor[3]);
				rotates[2].setAttribute("colorstyle",rotatesColor[0]);
				rotates[3].setAttribute("colorstyle",rotatesColor[7]);
				rotates[4].setAttribute("colorstyle",rotatesColor[4]);
				rotates[5].setAttribute("colorstyle",rotatesColor[1]);
				rotates[6].setAttribute("colorstyle",rotatesColor[8]);
				rotates[7].setAttribute("colorstyle",rotatesColor[5]);
				rotates[8].setAttribute("colorstyle",rotatesColor[2]);
			}else{
				rotates[0].setAttribute("colorstyle",rotatesColor[2]);
				rotates[1].setAttribute("colorstyle",rotatesColor[5]);
				rotates[2].setAttribute("colorstyle",rotatesColor[8]);
				rotates[3].setAttribute("colorstyle",rotatesColor[1]);
				rotates[4].setAttribute("colorstyle",rotatesColor[4]);
				rotates[5].setAttribute("colorstyle",rotatesColor[7]);
				rotates[6].setAttribute("colorstyle",rotatesColor[0]);
				rotates[7].setAttribute("colorstyle",rotatesColor[3]);
				rotates[8].setAttribute("colorstyle",rotatesColor[6]);
			}
			for(let i = 0 ; i < lis.length;i++){
				if(hasClass(lis[i],"rotate")){
					let style = "";
					colorStyleArray.push(cube.changeFN(directionType,param,lis[i].getAttribute('colorstyle')));
				}else{
					colorStyleArray.push(lis[i].getAttribute('colorstyle'));
				}
			}
			cube.intLayer(colorStyleArray);
		},
		changeFN : function(directionType,param,colorStyle){		//返回改变后的色值
			let oldColorArray = colorStyle.substring(0,colorStyle.length - 1).split(";");
			oldColorArrayCopy = colorStyle.substring(0,colorStyle.length - 1).split(";");
			
			if(directionType === "上下"){
				if(param){					//向下
					oldColorArray[0] = oldColorArrayCopy[5];
					oldColorArray[1] = oldColorArrayCopy[4];
					oldColorArray[2] = oldColorArrayCopy[2];
					oldColorArray[3] = oldColorArrayCopy[3];
					oldColorArray[4] = oldColorArrayCopy[0];
					oldColorArray[5] = oldColorArrayCopy[1];
				}else{						//向上
					oldColorArray[0] = oldColorArrayCopy[4];
					oldColorArray[1] = oldColorArrayCopy[5];
					oldColorArray[2] = oldColorArrayCopy[2];
					oldColorArray[3] = oldColorArrayCopy[3];
					oldColorArray[4] = oldColorArrayCopy[1];
					oldColorArray[5] = oldColorArrayCopy[0];
				}
			}else if(directionType === "左右"){
				if(param){						//向左
					oldColorArray[0] = oldColorArrayCopy[0];
					oldColorArray[1] = oldColorArrayCopy[1];
					oldColorArray[2] = oldColorArrayCopy[4];
					oldColorArray[3] = oldColorArrayCopy[5];
					oldColorArray[4] = oldColorArrayCopy[3];
					oldColorArray[5] = oldColorArrayCopy[2];
					
				}else{							//向右
					oldColorArray[0] = oldColorArrayCopy[0];
					oldColorArray[1] = oldColorArrayCopy[1];
					oldColorArray[2] = oldColorArrayCopy[5];
					oldColorArray[3] = oldColorArrayCopy[4];
					oldColorArray[4] = oldColorArrayCopy[2];
					oldColorArray[5] = oldColorArrayCopy[3];
				}
			}else if(directionType === "平面"){
				if(param){						//向右平面
					oldColorArray[0] = oldColorArrayCopy[3];
					oldColorArray[1] = oldColorArrayCopy[2];
					oldColorArray[2] = oldColorArrayCopy[0];
					oldColorArray[3] = oldColorArrayCopy[1];
					oldColorArray[4] = oldColorArrayCopy[4];
					oldColorArray[5] = oldColorArrayCopy[5];
					
				}else{							//向左平面
					oldColorArray[0] = oldColorArrayCopy[2];
					oldColorArray[1] = oldColorArrayCopy[3];
					oldColorArray[2] = oldColorArrayCopy[1];
					oldColorArray[3] = oldColorArrayCopy[0];
					oldColorArray[4] = oldColorArrayCopy[4];
					oldColorArray[5] = oldColorArrayCopy[5];
				}
			}
			colorStyle = "";
			for(let i = 0; i < oldColorArray.length ; i++){
				colorStyle +=oldColorArray[i]+";";
			}
			
			return colorStyle;
		},
		oneTouch :{
			start:function(event){
				// 如果这个元素的位置内只有一个手指的话
				event.preventDefault();// 阻止浏览器默认事件，重要 
				var touch = event.targetTouches[0];
				cube.touchstartX = touch.pageX;
				cube.touchstartY = touch.pageY;
				cube.touchIndex = this.getAttribute('index');
			},
			move:function(event){
				event.preventDefault();// 阻止浏览器默认事件，重要 
				var touch = event.targetTouches[0];
				cube.touchendX = touch.pageX;
				cube.touchendY = touch.pageY;
				cube.DifferenceY =(cube.touchendY- cube.touchstartY);
				cube.DifferenceX = (cube.touchendX- cube.touchstartX);
			},
			end:function(event){
				event.preventDefault();// 阻止浏览器默认事件，重要 
				audio = document.getElementById('audio');
				audio.play();
				if(Math.abs(cube.DifferenceY) > Math.abs(cube.DifferenceX)){
					if(cube.DifferenceY>0){		//向下
						if(cube.touchIndex % 3 === 0 ){
							cube.beforeAndAfterRotate(0,true);
						}else if(cube.touchIndex % 3 === 1 ){
							cube.beforeAndAfterRotate(1,true);
						}else if(cube.touchIndex % 3 === 2 ){
							cube.beforeAndAfterRotate(2,true);
						}
					}else{
						if(cube.touchIndex % 3 === 0 ){
							cube.beforeAndAfterRotate(0);
						}else if(cube.touchIndex % 3 === 1 ){
							cube.beforeAndAfterRotate(1);
						}else if(cube.touchIndex % 3 === 2 ){
							cube.beforeAndAfterRotate(2);
						}
					}
				}else{
					if(cube.DifferenceY>0){		//向右
						if(cube.touchIndex < 3){
							cube.planeRotate(0);
						}else if(cube.touchIndex >=9 && cube.touchIndex < 12){
							cube.planeRotate(1);
						}else if(cube.touchIndex >= 18 && cube.touchIndex < 21){
							cube.planeRotate(2);
						}
					}else{						//向左
						if(cube.touchIndex < 3){
							cube.planeRotate(0,true);
						}else if(cube.touchIndex >=9 && cube.touchIndex < 12){
							cube.planeRotate(1,true);
						}else if(cube.touchIndex >= 18 && cube.touchIndex < 21){
							cube.planeRotate(2,true);
						}
					}
				}
			}
		},
		twoTouch : {
			start:function(event){
				// 如果这个元素的位置内只有一个手指的话
				event.preventDefault();// 阻止浏览器默认事件，重要 
				var touch = event.targetTouches[0];
				cube.touchstartX = touch.pageX;
				cube.touchstartY = touch.pageY;
				cube.touchIndex = this.getAttribute('index');
			},
			move:function(event){
				event.preventDefault();// 阻止浏览器默认事件，重要 
				var touch = event.targetTouches[0];
				cube.touchendX = touch.pageX;
				cube.touchendY = touch.pageY;
				cube.DifferenceY =(cube.touchendY- cube.touchstartY);
				cube.DifferenceX = (cube.touchendX- cube.touchstartX);
			},
			end:function(event){
				event.preventDefault();// 阻止浏览器默认事件，重要 
				audio = document.getElementById('audio');
				audio.play();
				if(Math.abs(cube.DifferenceY) > Math.abs(cube.DifferenceX)){
					if(cube.DifferenceY>0){		//向下
						if(cube.touchIndex % 3 === 0 ){
							cube.beforeAndAfterRotate(0,true);
						}else if(cube.touchIndex % 3 === 1 ){
							cube.beforeAndAfterRotate(1,true);
						}else if(cube.touchIndex % 3 === 2 ){
							cube.beforeAndAfterRotate(2,true);
						}
					}else{
						if(cube.touchIndex % 3 === 0 ){
							cube.beforeAndAfterRotate(0);
						}else if(cube.touchIndex % 3 === 1 ){
							cube.beforeAndAfterRotate(1);
						}else if(cube.touchIndex % 3 === 2 ){
							cube.beforeAndAfterRotate(2);
						}
					}
				}else{
					if(cube.DifferenceY>0){		//向右
						if(cube.touchIndex >= 6 && cube.touchIndex < 9){
							cube.planeRotate(0,true);
						}else if(cube.touchIndex >=15 && cube.touchIndex < 18){
							cube.planeRotate(1,true);
						}else if(cube.touchIndex >= 24 && cube.touchIndex < 27){
							cube.planeRotate(2,true);
						}
					}else{						//向左
						if(cube.touchIndex >= 6 && cube.touchIndex < 9){
							cube.planeRotate(0);
						}else if(cube.touchIndex >=15 && cube.touchIndex < 18){
							cube.planeRotate(1);
						}else if(cube.touchIndex >= 24 && cube.touchIndex < 27){
							cube.planeRotate(2);
						}
						
					}
				}
			}
		},
		threeTouch:{
			start:function(event){
				// 如果这个元素的位置内只有一个手指的话
				event.preventDefault();// 阻止浏览器默认事件，重要 
				var touch = event.targetTouches[0];
				cube.touchstartX = touch.pageX;
				cube.touchstartY = touch.pageY;
				cube.touchIndex = this.getAttribute('index');
			},
			move:function(event){
				event.preventDefault();// 阻止浏览器默认事件，重要 
				var touch = event.targetTouches[0];
				cube.touchendX = touch.pageX;
				cube.touchendY = touch.pageY;
				cube.DifferenceY =(cube.touchendY- cube.touchstartY);
				cube.DifferenceX = (cube.touchendX- cube.touchstartX);
			},
			end:function(event){
				event.preventDefault();// 阻止浏览器默认事件，重要 
				audio = document.getElementById('audio');
				audio.play();
				if(Math.abs(cube.DifferenceY) > Math.abs(cube.DifferenceX)){
					if(cube.DifferenceY>0){		//向下滑
						if(cube.touchIndex <= 6 ){
							cube.planeRotate(0,true);
						}else if(cube.touchIndex >= 9 && cube.touchIndex <= 15){
							cube.planeRotate(1,true);
						}else if(cube.touchIndex >=18 && cube.touchIndex <= 24){
							cube.planeRotate(2,true);
						}
					}else{						//向上
						if(cube.touchIndex <= 6 ){
							cube.planeRotate(0);
						}else if(cube.touchIndex >= 9 && cube.touchIndex <= 15){
							cube.planeRotate(1);
						}else if(cube.touchIndex >=18 && cube.touchIndex <= 24){
							cube.planeRotate(2);
						}
					}
				}else{
					if(cube.DifferenceX > 0){		//向右
						if(cube.touchIndex == 0 || cube.touchIndex == 9 || cube.touchIndex == 18 ){
							cube.leftAndRightRotate(0)
						}else if(cube.touchIndex == 3 || cube.touchIndex == 12 || cube.touchIndex == 21 ){
							cube.leftAndRightRotate(1)
						}else if(cube.touchIndex == 6 || cube.touchIndex == 15 || cube.touchIndex == 24 ){
							cube.leftAndRightRotate(2)
						}
							
					}else{						//向左
						if(cube.touchIndex == 0 || cube.touchIndex == 9 || cube.touchIndex == 15 ){
							cube.leftAndRightRotate(0,true);
						}else if(cube.touchIndex == 3 || cube.touchIndex == 12 || cube.touchIndex == 21 ){
							cube.leftAndRightRotate(1,true);
						}else if(cube.touchIndex == 6 || cube.touchIndex == 15 || cube.touchIndex == 24 ){
							cube.leftAndRightRotate(2,true);
						}
					}
				}
			}
		},
		fourTouch:{
			start:function(event){
				// 如果这个元素的位置内只有一个手指的话
				event.preventDefault();// 阻止浏览器默认事件，重要 
				var touch = event.targetTouches[0];
				cube.touchstartX = touch.pageX;
				cube.touchstartY = touch.pageY;
				cube.touchIndex = this.getAttribute('index');
			},
			move:function(event){
				event.preventDefault();// 阻止浏览器默认事件，重要 
				var touch = event.targetTouches[0];
				cube.touchendX = touch.pageX;
				cube.touchendY = touch.pageY;
				cube.DifferenceY =(cube.touchendY- cube.touchstartY);
				cube.DifferenceX = (cube.touchendX- cube.touchstartX);
			},
			end:function(event){
				event.preventDefault();// 阻止浏览器默认事件，重要 
				audio = document.getElementById('audio');
				audio.play();
				if(Math.abs(cube.DifferenceY) > Math.abs(cube.DifferenceX)){
					if(cube.DifferenceY>0){		//向下滑
						if(cube.touchIndex == 2 || cube.touchIndex == 5 || cube.touchIndex == 8 ){
							cube.planeRotate(0);
						}else if(cube.touchIndex == 11 || cube.touchIndex == 14 || cube.touchIndex == 17 ){
							cube.planeRotate(1);
						}if(cube.touchIndex == 20 || cube.touchIndex == 23 || cube.touchIndex == 26 ){
							cube.planeRotate(2);
						}
					}else{						//向上
						if(cube.touchIndex == 2 || cube.touchIndex == 5 || cube.touchIndex == 8 ){
							cube.planeRotate(0,true);
						}else if(cube.touchIndex == 11 || cube.touchIndex == 14 || cube.touchIndex == 17 ){
							cube.planeRotate(1,true);
						}if(cube.touchIndex == 20 || cube.touchIndex == 23 || cube.touchIndex == 26 ){
							cube.planeRotate(2,true);
						}
					}
				}else{
					if(cube.DifferenceX > 0){		//向右
						if(cube.touchIndex == 2 || cube.touchIndex == 11 || cube.touchIndex == 20){
							cube.leftAndRightRotate(0);
						}else if(cube.touchIndex == 5 || cube.touchIndex == 14 || cube.touchIndex == 23){
							cube.leftAndRightRotate(1);
						}if(cube.touchIndex == 8 || cube.touchIndex == 17 || cube.touchIndex == 26){
							cube.leftAndRightRotate(2);
						}
					}else{						//向左
						if(cube.touchIndex == 2 || cube.touchIndex == 11 || cube.touchIndex == 20){
							cube.leftAndRightRotate(0,true);
						}else if(cube.touchIndex == 5 || cube.touchIndex == 14 || cube.touchIndex == 23){
							cube.leftAndRightRotate(1,true);
						}if(cube.touchIndex == 8 || cube.touchIndex == 17 || cube.touchIndex == 26){
							cube.leftAndRightRotate(2,true);
						}
					}
				}
			}
		},
		fiveTouch:{
			start:function(e){
				// 如果这个元素的位置内只有一个手指的话
				e.preventDefault();// 阻止浏览器默认事件，重要 
				var touch = e.targetTouches[0];
				cube.touchstartX = touch.pageX;
				cube.touchstartY = touch.pageY;
				cube.touchIndex = this.getAttribute('index');
			},
			move:function(event){
				event.preventDefault();// 阻止浏览器默认事件，重要 
				var touch = event.targetTouches[0];
				cube.touchendX = touch.pageX;
				cube.touchendY = touch.pageY;
				cube.DifferenceY =(cube.touchendY- cube.touchstartY);
				cube.DifferenceX = (cube.touchendX- cube.touchstartX);
			},
			end:function(event){
				event.preventDefault();// 阻止浏览器默认事件，重要 
				audio = document.getElementById('audio');
				audio.play();
				if(Math.abs(cube.DifferenceY) > Math.abs(cube.DifferenceX)){
					if(cube.DifferenceY>0){		//向下
						if(cube.touchIndex % 3 === 0){
							cube.beforeAndAfterRotate(0,1)
						}else if(cube.touchIndex % 3 === 1){
							cube.beforeAndAfterRotate(1,1)
						}else if(cube.touchIndex % 3 === 2){
							cube.beforeAndAfterRotate(2,1)
						}
					}else{						//向上
						if(cube.touchIndex % 3 === 0){
							cube.beforeAndAfterRotate(0)
						}else if(cube.touchIndex % 3 === 1){
							cube.beforeAndAfterRotate(1)
						}else if(cube.touchIndex % 3 === 2){
							cube.beforeAndAfterRotate(2)
						}
					}
				}else{
					if(cube.DifferenceX > 0){		//向右
						if(cube.touchIndex<3){
							cube.leftAndRightRotate(0);
						}else if(cube.touchIndex >= 3 && cube.touchIndex<6){
							cube.leftAndRightRotate(1);
						}else if(cube.touchIndex >= 6 && cube.touchIndex < 9){
							cube.leftAndRightRotate(2);
						}
					}else{						//向左
						if(cube.touchIndex<3){
							cube.leftAndRightRotate(0,1)
						}else if(cube.touchIndex >= 3 && cube.touchIndex<6){
							cube.leftAndRightRotate(1,1)
						}else if(cube.touchIndex >= 6 && cube.touchIndex < 9){
							cube.leftAndRightRotate(2,1)
						}
					}
				}
			}
		},
		sixTouch:{
			start:function(e){
				// 如果这个元素的位置内只有一个手指的话
				e.preventDefault();// 阻止浏览器默认事件，重要 
				var touch = e.targetTouches[0];
				cube.touchstartX = touch.pageX;
				cube.touchstartY = touch.pageY;
				cube.touchIndex = this.getAttribute('index');
			},
			move:function(event){
				event.preventDefault();// 阻止浏览器默认事件，重要 
				var touch = event.targetTouches[0];
				cube.touchendX = touch.pageX;
				cube.touchendY = touch.pageY;
				cube.DifferenceY =(cube.touchendY- cube.touchstartY);
				cube.DifferenceX = (cube.touchendX- cube.touchstartX);
			},
			end:function(event){
				event.preventDefault();// 阻止浏览器默认事件，重要 
				audio = document.getElementById('audio');
				audio.play();
				if(Math.abs(cube.DifferenceY) > Math.abs(cube.DifferenceX)){
					if(cube.DifferenceY>0){		//向下
						if(cube.touchIndex == 18 || cube.touchIndex == 21 || cube.touchIndex == 24){
							cube.beforeAndAfterRotate(0);
						}else if(cube.touchIndex == 19 || cube.touchIndex == 22 || cube.touchIndex == 25){
							cube.beforeAndAfterRotate(1);
						}else if(cube.touchIndex == 20 || cube.touchIndex == 23 || cube.touchIndex == 26){
							cube.beforeAndAfterRotate(2);
						}
						
					}else{						//向上
						if(cube.touchIndex == 18 || cube.touchIndex == 21 || cube.touchIndex == 24){
							cube.beforeAndAfterRotate(0,true);
						}else if(cube.touchIndex == 19 || cube.touchIndex == 22 || cube.touchIndex == 25){
							cube.beforeAndAfterRotate(1,true);
						}else if(cube.touchIndex == 20 || cube.touchIndex == 23 || cube.touchIndex == 26){
							cube.beforeAndAfterRotate(2,true);
						}
					}
				}else{
					if(cube.DifferenceX > 0){		//向右
						if(cube.touchIndex >= 18 && cube.touchIndex < 21){
							cube.leftAndRightRotate(0);
						}else if(cube.touchIndex >=21 && cube.touchIndex < 24){
							cube.leftAndRightRotate(1);
						}else if(cube.touchIndex >= 24 && cube.touchIndex < 27){
							cube.leftAndRightRotate(2);
						}
						
					}else{						//向左
						if(cube.touchIndex >= 18 && cube.touchIndex < 21){
							cube.leftAndRightRotate(0,true);
						}else if(cube.touchIndex >=21 && cube.touchIndex < 24){
							cube.leftAndRightRotate(1,true);
						}else if(cube.touchIndex >= 24 && cube.touchIndex < 27){
							cube.leftAndRightRotate(2,true);
						}
					}
				}
			}
		}
	}
	cube.intLayer();
	//cube.planeRotate(1);
	
	
	
	