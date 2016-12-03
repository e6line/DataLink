// JavaScript Document

//设置url常量

/*
* name : jsonp_get_mobCode_url
* method: get
* value: key: '***',
		 code: '***'
* return（格式）: ([{"code":1}])
* succeed（验证码正确）: code = 1
* error（验证码错误）: code = 0
* fail（异常失败）: code = -2
*/

var jsonp_get_mobCode_url = domain + "/ajax/ajaxcommons.html";


/*
* name : jsonp_get_mailCode_url
* method: get
* value: key: '***',
		 code: '***'
* return（格式）: ([{"code":1}])
* succeed（验证码正确）: code = 1
* error（验证码错误）: code = 0
* fail（异常失败）: code = -2
*/

var jsonp_get_mailCode_url = domain + "/ajax/ajaxcommons.html";


/*
* name : jsonp_set_mobCode_url
* method: get
* value: mobile: '***'
* succeed（成功）: code = 1
* timeout（一分钟内请求）: code = -1
* overrun（超限）: code = 0
* fail（异常失败）: code = -2
*/

var jsonp_set_mobCode_url = domain + "/ajax/ajaxcommons.html";


/*
* name : jsonp_set_mailCode_url
* method: get
* value: email: '***'
* return（格式）: ([{"code":1}])
* succeed（成功）: code = 1
* timeout（一分钟内请求）: code = -1
* overrun（超限）: code = 0
* fail（异常失败）: code = -2
*/

var jsonp_set_mailCode_url = domain + "/ajax/ajaxcommons.html";


/*
* name : jsonp_set_imgCode_url
* method: get
* value: ""
* return（格式）: ([{"code":1,"img_url":"images\/test-img.png"}])
* succeed（成功）: code = 1
* fail（失败）: code != 1
*/
//var jsonp_set_imgCode_url = "http://localhost/test4.php";


var evUrl = domain+"/checkEmail.html";
var evUrl2 = domain+"/checkNoEmail.html";


jQuery.extend({
	//添加验证身份证号方法
	//返回 boolean
	isIdCard: function(value){
		var idCard = removeAllSpace(value);
		
		if(idCard==""){  
			return false;   
		};
		
		if(validId15(idCard) || validId18(idCard)){
			return true; 
		}else{
			return false;
		}
		function removeAllSpace(str){
			var localString = '';
			for(var index = 0; index<str.length; index++)     
				if(str.charCodeAt(index)!= 32){     
					localString += str.charAt(index);     
				};     
			return localString;     
		};
		//18
		function validId18(str){
			if(str.length != 18) return false;
			iW = new Array(7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2,1);
			iSum = 0;
			for( i=0;i<17;i++){
				iC = str.charAt(i) ;
				iVal = parseInt(iC);
				iSum += iVal * iW[i];
			}
			iJYM = iSum % 11;
			var sJYM = '';
			if(iJYM == 0) sJYM = "1";
			else if(iJYM == 1 ) sJYM = "0";
			else if(iJYM == 2 ) sJYM = "x";
			else if(iJYM == 3 ) sJYM = "9";
			else if(iJYM == 4 ) sJYM = "8";
			else if(iJYM == 5 ) sJYM = "7";
			else if(iJYM == 6 ) sJYM = "6";
			else if(iJYM == 7 ) sJYM = "5";
			else if(iJYM == 8 ) sJYM = "4";
			else if(iJYM == 9) sJYM = "3";
			else if(iJYM == 10) sJYM = "2";
			var cCheck = str.charAt(17).toLowerCase();
			if( cCheck != sJYM ){
				return false; 
			}
			return true;
		}
		//15  
		function validId15(str){     
			if(str.length != 15) return false;
			str=str+"";     
			for(var i=0;i<str.length;i++){     
				if(str.charAt(i)<'0'||str.charAt(i)>'9'){     
					return false;     
					break;     
				}     
			}     
			var year=str.substr(6,2);     
			var month=str.substr(8,2);     
			var day=str.substr(10,2);     
			var sexBit=str.substr(14);     
		
			if(year<'01'||year >'90')return false;     
			if(month<'01'||month >'12')return false;     
			if(day<'01'||day >'31')return false;
			return true;     
		};
	},
	//添加检测密码方法
	//返回 boolean
	isPw: function(str){
		var a = /[a-z]/i,
			b = /[0-9]/;
		//if(a.test(str) && b.test(str) && str.length>=6 && str.length<=32){
		if(a.test(str) && b.test(str)){
			return true;
		}else{
			return false;
		};
	},
	isLoginPw: function(str){
		return /[0-9a-zA-Z\~\!\@\#\$\%\^\&\*\(\)\_\-\+\=\{\}\[\]\|\:\;\<\,\>\.\?]+/.test(str);
	},
	//添加检测手机号码方法
	//返回 boolean
	isMob: function(str){
		return /^1\d{10}$/.test(str)
	},
	//添加检测中文名字方法
	isCName: function(str){
		//return /^[\u4e00-\u9fa5]+[\u00b7\.]?[\u4e00-\u9fa5]+$/.test(str)	//这是原正确写法，匹配中文、中文.中文、中文·中文
		return /^[\u2E80-\u2EFF\u2F00-\u2FDF\u31C0-\u31EF\u3200-\u32FF\u3300-\u33FF\u3400-\u4DBF\u4DC0-\u4DFF\u4E00-\u9FBF\uF900-\uFAFF\uFE30-\uFE4F]+[\u00b7\.]?[\u2E80-\u2EFF\u2F00-\u2FDF\u31C0-\u31EF\u3200-\u32FF\u3300-\u33FF\u3400-\u4DBF\u4DC0-\u4DFF\u4E00-\u9FBF\uF900-\uFAFF\uFE30-\uFE4F]+$/.test(str)	//为匹配一些生僻字，扩充unicode码的范围
	},
	isEmail: function(str){
		//return /^([a-zA-Z0-9]*[-_]?[a-zA-Z0-9]+)*@([a-zA-Z0-9]*[-_]?[a-zA-Z0-9]+)+[\\.][A-Za-z]{2,3}([\\.][A-Za-z]{2})?$/.test(str)
		//return /^([a-zA-Z0-9]*[-_]?[a-zA-Z0-9]+)*@([a-zA-Z0-9]*[-_]?[a-zA-Z0-9]+)+[\\.][A-Za-z]{2,3}([\\.][A-Za-z]{3})?$/.test(str)
		return /^([a-zA-Z0-9]+[-_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/.test(str)
	},
	//添加检测公司名称
	isCompanyName: function (str) {
		return /^[\u4E00-\u9FA5(（）)\(\)]{5,}$/.test(str)
	},
	//添加检测公司地址
	isAddress: function (str) {
		return /^(?![a-zA-Z0-9])[A-Za-z0-9\u4e00-\u9fa5]+$/.test(str)
	},
	//添加检测专业	
	isSpecialty: function (str) {
		return /^[\u4E00-\u9FA5(（）)\(\)]+$/.test(str)
	},
	//添加字符串中不能出现空格
	isNoSpace: function (str) {
		return /^[^\s*]+$/.test(str)
	},
/* 纪成业 2015-8-17 (添加)*/	
	//添加字符必须为数字
	isDigit:function(str){
		return /^\d+$/.test(str);
	},
/* \OVER 纪成业 2015-8-17 (添加)*/
/* 纪成业 2015-5-17 （添加） */
	//验证长度16到19位
	BankNo16To19: function(bankno){
		if (bankno.length < 16 || bankno.length > 19) {
			//$("#banknoInfo").html("银行卡号长度必须在16到19之间");
			return false;
		}else{
			return true;
		}	
	},	
	//验证银行卡必须全为数字
	BankNoDigit: function(bankno){
		var num = /^\d*$/;  //全数字
		if (!num.exec(bankno)) {
			//$("#banknoInfo").html("银行卡号必须全为数字");
			return false;
		}else{
			return true;
		}		
	},
	//添加检测银行卡 是否符合Luhm校验规则 Luhm校验规则：16位银行卡号（19位通用）
	isBankNo: function (bankno){
		//alert(bankno);
		if(bankno.length == 16 || bankno.length == 19){
			//luhn规则校验 16位 和 19位的银行卡
			if( luhnValid(bankno) == false ){
				return false;
			}else{
				return true;
			}
		}else{
			return true;
		}
		function luhnValid(bankno){
			//开头6位
			var strBin="10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99";    
			if (strBin.indexOf(bankno.substring(0, 2))== -1) {
				return false;
			}
			var lastNum=bankno.substr(bankno.length-1,1);//取出最后一位（与luhn进行比较）

			var first15Num=bankno.substr(0,bankno.length-1);//前15或18位
			var newArr=new Array();
			for(var i=first15Num.length-1;i>-1;i--){    //前15或18位倒序存进数组
				newArr.push(first15Num.substr(i,1));
			}
			var arrJiShu=new Array();  //奇数位*2的积 <9
			var arrJiShu2=new Array(); //奇数位*2的积 >9
			
			var arrOuShu=new Array();  //偶数位数组
			for(var j=0;j<newArr.length;j++){
				if((j+1)%2==1){//奇数位
					if(parseInt(newArr[j])*2<9){
						arrJiShu.push(parseInt(newArr[j])*2);
					}
					else{
						arrJiShu2.push(parseInt(newArr[j])*2);
					}
				}
				else{ //偶数位
					arrOuShu.push(newArr[j]);
				}
			}
			
			var jishu_child1=new Array();//奇数位*2 >9 的分割之后的数组个位数
			var jishu_child2=new Array();//奇数位*2 >9 的分割之后的数组十位数
			for(var h=0;h<arrJiShu2.length;h++){
				jishu_child1.push(parseInt(arrJiShu2[h])%10);
				jishu_child2.push(parseInt(arrJiShu2[h])/10);
			}        
			
			var sumJiShu=0; //奇数位*2 < 9 的数组之和
			var sumOuShu=0; //偶数位数组之和
			var sumJiShuChild1=0; //奇数位*2 >9 的分割之后的数组个位数之和
			var sumJiShuChild2=0; //奇数位*2 >9 的分割之后的数组十位数之和
			var sumTotal=0;
			for(var m=0;m<arrJiShu.length;m++){
				sumJiShu=sumJiShu+parseInt(arrJiShu[m]);
			}
			
			for(var n=0;n<arrOuShu.length;n++){
				sumOuShu=sumOuShu+parseInt(arrOuShu[n]);
			}
			
			for(var p=0;p<jishu_child1.length;p++){
				sumJiShuChild1=sumJiShuChild1+parseInt(jishu_child1[p]);
				sumJiShuChild2=sumJiShuChild2+parseInt(jishu_child2[p]);
			}      
			//计算总和
			sumTotal=parseInt(sumJiShu)+parseInt(sumOuShu)+parseInt(sumJiShuChild1)+parseInt(sumJiShuChild2);
			
			//计算luhn值
			var k= parseInt(sumTotal)%10==0?10:parseInt(sumTotal)%10;    
			var luhn= 10-k;
			
			if(lastNum==luhn){
				return true;
			}
			else{
				return false;
			}			
		}
	},
/* \OVER 纪成业 2015-1-6-17 （添加）*/
/*  纪成业 2015-6-29 （添加） */
	//检测金额数保留2位小数
	isJE:function(str){
		return /^\d+[.]{1}[\d]{2}$/.test(str);
	},
/*  \OVER 纪成业 2015-6-29 （添加） */
/* 纪成业 2015-7-16 */
	//检测次数必须为正整数 最多10000次
	isCS:function(str){
		return /^\d+$/.test(str);
	},
/* \OVER 纪成业 2015-7-16 */
/* 纪成业 2015-8-21 */
	//检测银行的公司名称
	isBankCompanyName: function (str) {
		return /^[\u4E00-\u9FA5(（）)\(\)]{4,}$/.test(str)
	}
/* \OVER 纪成业 2015-8-21*/	
});



/* 纪成业 2015-8-21 */
/*对公账户检测 Vision2*/
jQuery.validator.addMethod("validBankCompanyName",function(value, element){
	var b = this.optional(element) || $.isBankCompanyName(value);
	return b;
},"银行名称为至少4位的汉字");
jQuery.validator.addMethod("validBankCompanyName2",function(value, element){
	var temp;
	var companyName = $("#openAccount_bankname").val();
	if(companyName.indexOf('银行') > 1 || companyName.indexOf('信用社') > 1){
		temp = true;
	}else{
		temp = false;
	}
	var b = this.optional(element) || temp;
	return b;
},"请输入正确的银行名称");
/* \OVER 纪成业 2015-8-21*/	

/* 纪成业 2015-8-24 （添加）*/
/*对公账户检测 Vision1	*/
jQuery.validator.addMethod("validAccountBank",function(value, element){
	var temp = false;
	var name = $("#openAccount_bankname");
	var code = $("#openAccount_bankname_code");
	if(name.val() !== '' && code.val() === ''){
		temp = false;
	}else{
		temp = true;
	}
	return temp;
},"请在提示中选择开户行 暂不支持其它");


/* 纪成业 2015-8-17 */
//添加字符必须为数字
jQuery.validator.addMethod("validDigit", function(value, element){
	var b = this.optional(element) || $.isDigit(value);
	return b;
},"所填内容必须为数字");
/* \OVER 纪成业 2015-8-17 */
//不能出现空格
jQuery.validator.addMethod("validNoSpace", function(value, element){
	var b =  this.optional(element) || $.isNoSpace(value);
    return b;
},"不能出现空格");

//专业名称
jQuery.validator.addMethod("validSpecialty", function(value, element){
	var b =  this.optional(element) || $.isSpecialty(value);
    return b;
},"专业名称有误！请您核对");

//公司名称
jQuery.validator.addMethod("validCompanyName", function(value, element){
	var b =  this.optional(element) || $.isCompanyName(value);
    return b;
},"公司名称有误！请您核对");

//公司地址
jQuery.validator.addMethod("validAddress", function(value, element){
	var b =  this.optional(element) || $.isAddress(value);
    return b;
},"公司名称有误！请您核对");

//检测Email
jQuery.validator.addMethod("validEmail", function(value, element){
	var b =  this.optional(element) || $.isEmail(value);
    return b;
},"身份证号码有误！请您核对");

//检测15-18位身份证号
jQuery.validator.addMethod("validId", function(value, element){
	var b =  this.optional(element) || $.isIdCard(value);
    return b;
},"身份证号码有误！请您核对");

//检测中文长度范围
jQuery.validator.addMethod("cn_rangelength",function(value,element,params){var var_len =  value.replace(/[^\x00-\xff]/g, "xx").length; return this.optional(element) || var_len >= params[0] && var_len <= params[1] ;});

//检测-实例化密码规则
jQuery.validator.addMethod("validPassword", function(value, element){
	var b =  this.optional(element) || $.isPw(value);
    return b;
},"密码有误！请您核对");

//检测-实例化登录密码规则
jQuery.validator.addMethod("validLoginPassword", function(value, element){
	var b =  this.optional(element) || $.isLoginPw(value);
    return b;
},"密码有误！请您核对");

//检测-实例化中文姓名
jQuery.validator.addMethod("validCName", function(value, element){
	var b =  this.optional(element) || $.isCName(value);
    return b;
},"输入内容必须为汉字");

//检测-实例化手机规则
jQuery.validator.addMethod("validMobile", function(value, element){
	var b =  this.optional(element) || $.isMob(value);
    return b;
},"密码有误！请您核对");

//检测-实例化新旧密码不能相同
jQuery.validator.addMethod("validUnequalTo", function(value, element, id){
	var c = false;
	if($(id).val() == value){
		c = false;
	}else{
		c = true;
	}
	var b =  this.optional(element) || c
    return b;
},"新旧密码不能相同");


//检测-手机验证码
jQuery.validator.addMethod("validJsonPMob", function(value, element){
	
	var iCode = 0;
	var temp = false;
	//JsonP
	if(value.length == 6) {
		$.ajaxSettings.async = false;
		$.getJSON(jsonp_get_mobCode_url+"?jsoncallback=?",
		{
			key: $("#user_mob").val(),
			code: $("#mob_cord").val(),
			m: 'vcode'
		},
		function(data) {
			iCode = data[0]["code"];
		});
		
		if(iCode == 1){
			temp = true;
		}else if(iCode == 0 && $("#mob_cord").val().length == 6){
			temp = false;
		}else if(iCode == -2 &&  $("#mob_cord").val().length == 6){
			temp = false;
			alert("异常失败！请重新点击获取验证码按钮！");
		}else{
			temp = false;
		}
	}
	
    return this.optional(element) || temp;
	
},"验证码有误");


//检测-手机验证码2
jQuery.validator.addMethod("validJsonPMob2", function(value, element){
	
	var iCode = 0;
	var temp = false;
	//JsonP
	if(value.length == 6) {
		$.ajaxSettings.async = false;
		$.getJSON(jsonp_get_mobCode_url+"?jsoncallback=?",
		{
			key: $("#user_mob").val(),
			code: $("#mob_cord").val(),
			m: 'vcode'
		},
		function(data) {
			iCode = data[0]["code"];
		});
		
		if(iCode == 1){
			temp = true;
			$(".new-form").first().removeClass("fomr-hover");
			$(".new-form").last().addClass("fomr-hover");
			$("#user_pwd").focus();
			$("#mob_cord").attr("readonly",true);
			$("#user_mob").attr("readonly",true);
		}else if(iCode == 0 && $("#mob_cord").val().length == 6){
			temp = false;
		}else if(iCode == -2 &&  $("#mob_cord").val().length == 6){
			temp = false;
			alert("异常失败！请重新点击获取验证码按钮！");
		}else{
			temp = false;
		}
	}
	
    return this.optional(element) || temp;
	
},"验证码有误");

//检测-邮箱验证码2
jQuery.validator.addMethod("validJsonPMail", function(value, element){
	
	var iCode = 0;
	var temp = false;
	if(value.length == 6) {
		//JsonP
		$.ajaxSettings.async = false;
		$.getJSON(jsonp_get_mailCode_url+"?jsoncallback=?",
		{
			key: $("#user_email").val(),
			code: $("#email_cord").val(),
			m: 'vcode'
		},
		function(data) {
			iCode = data[0]["code"];
		});
		
		if(iCode == 1){
			temp = true;
		}else if(iCode == 0 && $("#email_cord").val().length == 6){
			temp = false;
		}else if(iCode == -2 &&  $("#email_cord").val().length == 6){
			temp = false;
			alert("异常失败！请重新点击获取验证码按钮！");
		}else{
			temp = false;
		}
	}
	
    return this.optional(element) || temp;
	
},"验证码有误");

//检测-邮箱验证码2
jQuery.validator.addMethod("validJsonPMail2", function(value, element){
	
	var iCode = 0;
	var temp = false;
	if(value.length == 6) {
		//JsonP
		$.ajaxSettings.async = false;
		$.getJSON(jsonp_get_mailCode_url+"?jsoncallback=?",
		{
			key: $("#user_email").val(),
			code: $("#email_cord").val(),
			m: 'vcode'
		},
		function(data) {
			iCode = data[0]["code"];
		});
		
		if(iCode == 1){
			temp = true;
			$(".register-form-box").first().removeClass("register-form-box-hover");
			$(".register-form-box").last().addClass("register-form-box-hover");
			$("#user_pwd").focus();
			$("#user_email").attr("readonly",true);
			$("#email_cord").attr("readonly",true);
		}else if(iCode == 0 && $("#email_cord").val().length == 6){
			temp = false;
		}else if(iCode == -2 &&  $("#email_cord").val().length == 6){
			temp = false;
			alert("异常失败！请重新点击获取验证码按钮！");
		}else{
			temp = false;
		}
	}
	
    return this.optional(element) || temp;
	
},"验证码有误");

//Vip手机找回第二步
function phoneForgotVaidate(){
	var oForm = $("#phone_vip_forgot2"),
		oIdtagno = oForm.find("#idtagno"),
		oIdentity_card = oForm.find("#identity_card");
	
		
	$('<div id="tips1">test</div>').appendTo(oIdtagno.siblings(".tip-box"));
	$('<div id="tips2">test</div>').appendTo(oIdentity_card.siblings(".tip-box"));

	oIdtagno.keyup(oIdtagnoVaidate);
	oIdtagno.focus(oIdtagnoVaidate);
	oIdentity_card.keyup(oIdentity_cardVaidate);
	oIdentity_card.focus(oIdentity_cardVaidate);
		
	oForm.submit(function(){
		if( oIdtagnoVaidate() & oIdentity_cardVaidate()){
			return true;
		}
		else{
			return false;
		}
	});
	
	//处理身份通号
	function oIdtagnoVaidate(){
		oIdtagno.siblings(".tip-box").show();
		var a = /^\d+$/;
		if(a.test(oIdtagno.val())){
			$("#tips1").html("正确").addClass("right-box").removeClass("error-box");
			return true;
		}else if('' == oIdtagno.val() && '' != oIdentity_card.val()){
			oIdtagno.siblings(".tip-box").hide();
			return true;
		}else if('' == oIdtagno.val() && '' == oIdentity_card.val()){
			$("#tips1").html("至少填写一项").addClass("error-box").removeClass("right-box");
			return false;
		}else{
			$("#tips1").html("身份通号是由数字组成").addClass("error-box").removeClass("right-box");
			return false;
		}
	};
	//处理身份证号
	function oIdentity_cardVaidate(){
		oIdentity_card.siblings(".tip-box").show();
		if($.isIdCard(oIdentity_card.val())){
			$("#tips2").html("正确").addClass("right-box").removeClass("error-box");
			return true;
		}else if('' != oIdtagno.val() && '' == oIdentity_card.val()){
			oIdentity_card.siblings(".tip-box").hide();
			return true;
		}else if('' == oIdtagno.val() && '' == oIdentity_card.val()){
			$("#tips2").html("至少填写一项").addClass("error-box").removeClass("right-box");
			return false;
		}else{
			$("#tips2").html("身份证格式不对").addClass("error-box").removeClass("right-box");;
			return false
		}
	};
	
};

//学校-专业-二选一
jQuery.validator.addMethod("validSchool", function(value, element){
	
	var temp = false;

	if($("#specialty").val()=='' && $("#graduate").val()==''){
		temp =  false;
	}else{
		temp =  true;
	}
	
    return temp;
	
},"学校、专业至少填写一项");

/*多组数据里的单组检测*/
/*全为空不能提交*/
jQuery.validator.addMethod("validGroups",function(value, element){
		var temp = false;
		
		var realName_1 = $("#real_name_1").val();//获取 真实姓名 
		var identityCard_1 = $("#identity_card_1").val();//获取 获取身份证号
	
		var realName_2 = $("#real_name_2").val();//获取 真实姓名 
		var identityCard_2 = $("#identity_card_2").val();//获取 获取身份证号
	
		var realName_3 = $("#real_name_3").val();//获取 真实姓名 
		var identityCard_3 = $("#identity_card_3").val();//获取 获取身份证号
	
		var realName_4 = $("#real_name_4").val();//获取 真实姓名 
		var identityCard_4 = $("#identity_card_4").val();//获取 获取身份证号
	
		var realName_5 = $("#real_name_5").val();//获取 真实姓名 
		var identityCard_5 = $("#identity_card_5").val();//获取 获取身份证
		
		if(
				realName_1 === '' && identityCard_1 === ''
			&&	realName_2 === '' && identityCard_2 === ''
			&&	realName_3 === '' && identityCard_3 === ''
			&&	realName_4 === '' && identityCard_4 === ''
			&&	realName_5 === '' && identityCard_5 === ''
			){
			temp = false;
		}else{
			temp = true;	
		}
			
	return temp;
},"所填数据必须完整，且至少一组");
/*检测真实姓名*/
jQuery.validator.addMethod("validGroupName",function(value, element){
		var temp  = false;
		var n = element.id.split('_')[2];

		var name = $("#real_name_" + n);
		var idCard = $("#identity_card_" + n);
		
		if(idCard.val() !== '' && name.val() === ''){
			temp = false;	
		}else{
			temp = true;	
		}		

	return  temp;
},"请将身份证号填写完整");
/*检测省份证号*/
jQuery.validator.addMethod("validGroupId",function(value, element){
		var temp  = false;
		var n = element.id.split('_')[2];

		var name = $("#real_name_" + n);
		var idCard = $("#identity_card_" + n);
		
		if(  name.val() !== '' && idCard.val() === '' ){
			temp = false;
		}else{
			temp = true;	
		}

	return  temp;
},"请将身份证号填写完整");

/* 纪成业 2015-6-17 （添加）*/
/*检测银行卡号*/
jQuery.validator.addMethod("validBankNo1",function(value,element){
	var b = this.optional(element) || $.BankNoDigit(value);
	return b;
},"银行卡号必须全由数字组成");
jQuery.validator.addMethod("validBankNo2",function(value, element){
	var b =  this.optional(element) || $.BankNo16To19(value);
    return b;
},"请填写16到19位的银行卡号");
jQuery.validator.addMethod("validBankNo3",function(value, element){
	var b =  this.optional(element) || $.isBankNo(value);
    return b;
},"银行卡号不符合规则");
/* \OVER 纪成业 2015-6-17 （添加）*/

/*  纪成业 2015-6-29 （添加） */
	//检测金额数
jQuery.validator.addMethod("validJE",function(value, element){
	var b = this.optional(element) || $.isJE(value);
	return b;
},"金额必须为保留两位的小数");	
/*  \OVER 纪成业 2015-6-29 （添加） */
/*  纪成业 2015-7-16 （添加） */
	//检测次数
jQuery.validator.addMethod("validCS",function(value, element){
	var b =  this.optional(element) || $.isCS(value);
	return b;
},"其输入正确次数格式");
/*  \OVER 纪成业 2015-7-16 （添加） */










$(document).ready(function(){
	$('.dropdown').dropdown();
	$('.ui-btn-submit').btnHover();
	$('.ui-btn-inline').btnHover();
	
	//下发短信验证码
	$(".sms_code").click(function(){
		if($("#user_mob").valid()){
			$.ajaxSettings.async = false;
			$.getJSON(jsonp_set_mobCode_url+"?jsoncallback=?",
			{
				mobile: $("#user_mob").val(),
				m:'vsendbymob',
				imgcode: $("#img_cord").val()
			},
			function(data) {
				if(data[0]["code"] == 1){
					alert("下发成功,验证码已发送到："+ $("#user_mob").val() +"，请查收短信");
				}else if (data[0]["code"] == -1){
					alert("一分钟内只能下发一次！");
				}else if (data[0]["code"] == 0){
					alert("下发验证码超限，每天可获取验证码 5 次。");
				}else if (data[0]["code"] == -2){
					alert("异常失败，请重新点击获取验证码！");
				}else if (data[0]["code"] == -3){
					alert("请填写页面验证码，请重新点击获取验证码！");
				}
			});
		};
	});

	//邮件验证码重发
	$(".m_code").click(function(){
		if($("#user_email").valid()){
			$.ajaxSettings.async = false;
			$.getJSON(jsonp_set_mailCode_url+"?jsoncallback=?",
			{
				email: $("#user_email").val(),
				m: 'vsendbyem'
			},
			function(data) {
				if(data[0]["code"] == 1){
					alert("下发成功,验证码已发送到："+ $("#user_email").val() +"，请查收邮件");
				}else if (data[0]["code"] == -1){
					alert("一分钟内只能下发一次！");
				}else if (data[0]["code"] == 0){
					alert("下发验证码超限，每天可获取验证码 5 次。");
				}else if (data[0]["code"] == -2){
					alert("异常失败，请重新点击获取验证码！");
				}
			});
		};
	});

	
	//图片验证码重发
	$(".i_code").click(function(){
		$("#get_code_img").attr("src",domain+"/verifyCode.html?m="+Math.random());
		return false;
	});
	
	//首页登录验证
	$("#login").validate({
		debug: false
		,errorClass: "error-box"
		,validClass: "right-box"
		,errorLabelContainer: ".module-login .tip-box"
		,errorElement:"div"
		,rules:{
			username:{required:true}
			,password:{required:true,validLoginPassword:true,cn_rangelength:[6,20]}
		}
		,messages:{
			username:{required:"登录名不能为空"}
			,password:{required:"此项为必填项，不能为空",validLoginPassword:"密码格式有误，请重新输入",cn_rangelength:jQuery.format("密码至少由{0} 到{1} 位字母与数字组成")}
		}
	});
	
	
	//登录验证
	var v = $("#login_form").validate({
		debug: false
		,onfocusout:false
		,onkeyup:false
		,errorClass: "error"
		,validClass: "right"
		,rules:{
			username:{required:true}
			,password:{required:true}
			,img_cord:{required:true,remote: {
					url: domain+"/checkverifyCode.html",
					type: "post",
					async:　false,
					data:{
						img_cord:function(){
							return $("#img_cord").val();
						}
					} 
				}
			}
		}
		,messages:{
			username:{required:"此项为必填项，不能为空"}
			,password:{required:"此项为必填项，不能为空"}
			,img_cord:{required:"验证码不能为空",remote:"您输入的验证码有误"}
		}
		,groups: {
			name: "username password img_cord"
		}
		,errorPlacement: function(error,element){
			var $errorBox = $(".login-error");
			if(!!v.errorMap.username){
				$errorBox.html(v.errorMap.username).show();
				return false;
			}else if(!!v.errorMap.password){
				$errorBox.html(v.errorMap.password).show();
				return false;
			}else if(!!v.errorMap.img_cord){
				$errorBox.html(v.errorMap.img_cord).show();
				return false;
			}else{
				$errorBox.html('').hide();
				return true;
			}
		}
	});

	
	jQuery.validator.setDefaults({
		debug: false
		,errorClass: "error"
		,validClass: "right"
		,errorPlacement: function(error, element){
			var $parent = element.parent().parent(); 
			var error_div = $parent.find(".loginTip");
			var icon = $parent.find(".loginIcon");
			element.addClass("error");
			error_div.html(error);
			error.addClass("error");
			//icon.removeClass("righticon").show();
		}
		,success: function(label){
			label.text(label.parent().attr("data-text"));
			label.removeClass("error");
			//label.parent().siblings(".loginIcon").addClass("righticon");
		}
	});
	
	
	//vip注册1 验证
	$("#vip_reg1").validate({
		rules:{
			user_mob:{required:true,validMobile:true}
			,img_cord:{required:true,remote: {
				url: domain+"/checkverifyCode.html",
				type: "post",
				async:　false,
				data:{
					img_cord:function(){
						return $("#img_cord").val();
					}
				} 
				}
			}
			,mob_cord:{required:true,validJsonPMob:true}
			,real_name:{required:true,cn_rangelength:[2,50],validCName:true}
			,identity_card:{required:true,validId:true}
	
			,check_agree: {required:true}
		}
		,messages:{
			user_mob:{required:"此为必填项，请填写完善",validMobile:"输入的手机号错误，请核实后重新填写"}
		,img_cord:{required:"验证码不能为空",remote:"您输入的验证码有误"}
			,mob_cord:{required:"此为必填项，请填写完善",validJsonPMob:"短信验证码有误，请核实后重新填写"}
			,real_name:{required:"此为必填项，请填写完善",cn_rangelength:jQuery.format("请输入姓名长度{0} 和 {1} 位的中文"),validCName:"输入内容必须为汉字"}
			,identity_card:{required:"此为必填项，请填写完善",validId:"身份证格式不对"}
			
			,check_agree: {required:"请同意服务条款"}
		}
	});
	
	//vip注册2 验证
	$("#vip_reg2").validate({
		rules:{
			user_pwd:{required:true,cn_rangelength:[6,32],validPassword:true}
			,re_pwd:{required:true,cn_rangelength:[6,32],equalTo: "#user_pwd"}
		}
		,messages:{
			user_pwd:{required:"密码不能为空",cn_rangelength:jQuery.format("请输入密码长度{0} 和 {1} 位的字符串"),validPassword:"必须由字母和数字组成"}
			,re_pwd:{required:"密码不能为空",cn_rangelength:jQuery.format("请输入密码长度{0} 和 {1} 位的字符串"),equalTo:"2次输入密码不一致"}
		}
	});
	
	//phone注册 验证
	$("#phone_reg").validate({
		rules:{
			user_mob:{required:true,validMobile:true}
			,img_cord:{required:true,remote: {
					url: domain+"/checkverifyCode.html",
					type: "post",
					async:　false,
					data:{
						img_cord:function(){
							return $("#img_cord").val();
						}
					} 
				}
			}
			,mob_cord:{required:true,validJsonPMob2:true}
			,user_pwd:{required:true,cn_rangelength:[6,32],validPassword:true}
			,re_pwd:{required:true,cn_rangelength:[6,32],equalTo: "#user_pwd"}
			,check_agree: {required:true}
		}
		,messages:{
			user_mob:{required:"此为必填项，请填写完善",validMobile:"输入的手机号错误，请核实后重新填写"}
			,img_cord:{required:"验证码不能为空",remote:"您输入的验证码有误"}
			,mob_cord:{required:"此为必填项，请填写完善",validJsonPMob2:"短信验证码有误，请核实后重新填写"}
			,user_pwd:{required:"此为必填项，请填写完善",cn_rangelength:jQuery.format("请输入密码长度{0} 和 {1} 位的字符串"),validPassword:"必须由字母和数字组成"}
			,re_pwd:{required:"此为必填项，请填写完善",cn_rangelength:"请输入密码长度{0} 和 {1} 位的字符串",equalTo:"2次输入密码不一致"}
			,check_agree: {required:"请同意服务条款"}
		}
	});
	
	//email注册 验证
	$("#email_reg").validate({
		rules:{
			user_email:{required:true,validEmail:true,remote: {
								url: evUrl,
								type: "post",
								async:　false,
								data:{
									user_email:function(){
										return $("#user_email").val();
									}
								} 
							}
						}
			,user_pwd:{required:true,cn_rangelength:[6,32],validPassword:true}
			,re_pwd:{required:true,cn_rangelength:[6,32],equalTo: "#user_pwd"}
			,check_agree: {required:true}
		}
		,messages:{
			user_email:{required:"此为必填项，请填写完善",validEmail:"请检查您的邮箱格式",remote:"邮箱已占用"}
			,user_pwd:{required:"此为必填项，请填写完善",cn_rangelength:jQuery.format("请输入密码长度{0} 和 {1} 位的字符串"),validPassword:"必须由字母和数字组成"}
			,re_pwd:{required:"此为必填项，请填写完善",cn_rangelength:"请输入密码长度{0} 和 {1} 位的字符串",equalTo:"两次输入的密码不一致，请重新输入"}
			,check_agree: {required:"请同意服务条款"}
		}
	});
	
	//忘记身份通号
	$("#username_for").validate({
		rules:{
			real_name:{required:true,cn_rangelength:[2,50],validCName:true}
			,identity_card:{required:true,validId:true}
			,img_cord:{required:true,remote: {
					url: domain+"/checkverifyCode.html",
					type: "post",
					async:　false,
					data:{
						img_cord:function(){
							return $("#img_cord").val();
						}
					} 
				}
			}
		}
		,messages:{
			real_name:{required:"此为必填项，请填写完善",cn_rangelength:jQuery.format("请输入姓名长度{0} 和 {1} 位的中文"),validCName:"输入内容必须为汉字"}
			,identity_card:{required:"此为必填项，请填写完善",validId:"身份证格式不对"}
			,img_cord:{required:"此为必填项，请填写完善",remote:"您输入的验证码有误"}
		}
	});
	
	//忘记密码  手机找回
	$("#password_for_phone").validate({
		rules:{
			user_mob:{required:true,validMobile:true}
			,img_cord:{required:true,remote: {
					url: domain+"/checkverifyCode.html",
					type: "post",
					async:　false,
					data:{
						img_cord:function(){
							return $("#img_cord").val();
						}
					} 
				}
			}
			,mob_cord:{required:true,validJsonPMob2:true}
		
		}
		,messages:{
			user_mob:{required:"此为必填项，请填写完善",validMobile:"输入的手机号错误，请核实后重新填写"}
			,img_cord:{required:"验证码不能为空",remote:"您输入的验证码有误"}
			,mob_cord:{required:"此为必填项，请填写完善",validJsonPMob2:"短信验证码有误，请核实后重新填写"}
			
		}
	});
	
	$("#password_for_phone2").validate({
		rules:{
			user_pwd:{required:true,cn_rangelength:[6,32],validPassword:true}
			,re_pwd:{required:true,cn_rangelength:[6,32],equalTo: "#user_pwd"}
		}
		,messages:{
			user_pwd:{required:"密码不能为空",cn_rangelength:jQuery.format("请输入密码长度{0} 和 {1} 位的字符串"),validPassword:"必须由字母和数字组成"}
			,re_pwd:{required:"密码不能为空",cn_rangelength:jQuery.format("请输入密码长度{0} 和 {1} 位的字符串"),equalTo:"两次输入的密码不一致，请重新输入"}
		}
	});
	
	
	//忘记密码  邮箱找回
	$("#password_for_mail").validate({
		rules:{
			user_email:{required:true,validEmail:true,remote: {
								url: evUrl2,
								type: "post",
								async:　false,
								data:{
									user_email:function(){
										return $("#user_email").val();
									}
								} 
							}
						}
		}
		,messages:{
			user_email:{required:"此为必填项，请填写完善",validEmail:"请检查您的邮箱格式",remote:"邮箱不存在"}
		}
	});
	
	$("#password_for_mail4").validate({
		rules:{
			user_pwd:{required:true,cn_rangelength:[6,32],validPassword:true}
			,re_pwd:{required:true,cn_rangelength:[6,32],equalTo: "#user_pwd"}
		}
		,messages:{
			user_pwd:{required:"密码不能为空",cn_rangelength:jQuery.format("请输入密码长度{0} 和 {1} 位的字符串"),validPassword:"必须由字母和数字组成"}
			,re_pwd:{required:"密码不能为空",cn_rangelength:jQuery.format("请输入密码长度{0} 和 {1} 位的字符串"),equalTo:"两次输入的密码不一致，请重新输入"}
		}
	});
	
	
	//添加邮箱
	$("#add_mail").validate({
		rules:{
			user_email:{required:true,validEmail:true,remote: {
								url: evUrl,
								type: "post",
								async:　false,
								data:{
									user_email:function(){
										return $("#user_email").val();
									}
								} 
							}
						}
		}
		,messages:{
			user_email:{required:"此为必填项，请填写完善",validEmail:"请检查您的邮箱格式",remote:"邮箱已占用"}
		}
	});
	
	//添加手机
	$("#add_phone").validate({
		rules:{
			user_mob:{required:true,validMobile:true}
			,img_cord:{required:true,remote: {
				url: domain+"/checkverifyCode.html",
				type: "post",
				async:　false,
				data:{
					img_cord:function(){
						return $("#img_cord").val();
					}
				} 
			}
		}
			,mob_cord:{required:true,validJsonPMob2:true}
		}
		,messages:{
			user_mob:{required:"此为必填项，请填写完善",validMobile:"输入的手机号错误，请核实后重新填写"}
			,mob_cord:{required:"此为必填项，请填写完善",validJsonPMob2:"短信验证码有误，请核实后重新填写"}
		}
	});
	//身份信息认证
	$("#idauth_up").validate({
		rules:{
			real_name:{required:true,cn_rangelength:[2,50],validCName:true}
			,identity_card:{required:true,validId:true}
			,user_mob:{required:true,validMobile:true}
			,img_cord:{required:true,remote: {
				url: domain+"/checkverifyCode.html",
				type: "post",
				async:　false,
				data:{
					img_cord:function(){
						return $("#img_cord").val();
					}
				} 
			}
		}
			,mob_cord:{required:true,validJsonPMob:true}
			,check_agree: {required:true}
		}
		,messages:{
			real_name:{required:"此为必填项，请填写完善",cn_rangelength:jQuery.format("请输入姓名长度{0} 和 {1} 位的中文"),validCName:"输入内容必须为汉字"}
			,identity_card:{required:"此为必填项，请填写完善",validId:"身份证格式不对"}
			,user_mob:{required:"此为必填项，请填写完善",validMobile:"输入的手机号错误，请核实后重新填写"}
			,img_cord:{required:"验证码不能为空",remote:"您输入的验证码有误"}
			,mob_cord:{required:"此为必填项，请填写完善",validJsonPMob:"短信验证码有误，请核实后重新填写"}
			,check_agree: {required:"请同意服务条款"}
		}
	});
	
	//帐号合并--邮箱
	$("#merge_mail").validate({
		rules:{
			real_name:{required:true,cn_rangelength:[2,50],validCName:true}
			,identity_card:{required:true,validId:true}
			,user_email:{required:true,validEmail:true,remote: {
								url: evUrl2,
								type: "post",
								async:　false,
								data:{
									user_email:function(){
										return $("#user_email").val();
									}
								} 
							}
						}
			,user_pwd:{required:true,cn_rangelength:[6,32],validPassword:true}
		}
		,messages:{
			real_name:{required:"此为必填项，请填写完善",cn_rangelength:jQuery.format("请输入姓名长度{0} 和 {1} 位的中文"),validCName:"输入内容必须为汉字"}
			,identity_card:{required:"此为必填项，请填写完善",validId:"身份证格式不对"}
			,user_email:{required:"此为必填项，请填写完善",validEmail:"请检查您的邮箱格式",remote:"邮箱不存在"}
			,user_pwd:{required:"密码不能为空",cn_rangelength:jQuery.format("请输入密码长度{0} 和 {1} 位的字符串"),validPassword:"必须由字母和数字组成"}
		}
	});
	
	
	//帐号合并--手机
	$("#merge_phone").validate({
		rules:{
			real_name:{required:true,cn_rangelength:[2,50],validCName:true}
			,identity_card:{required:true,validId:true}
			,user_mob:{required:true,validMobile:true}
			,user_pwd:{required:true,cn_rangelength:[6,32],validPassword:true}
			,mob_cord:{required:true,validJsonPMob:true}
		}
		,messages:{
			real_name:{required:"此为必填项，请填写完善",cn_rangelength:jQuery.format("请输入姓名长度{0} 和 {1} 位的中文"),validCName:"输入内容必须为汉字"}
			,identity_card:{required:"此为必填项，请填写完善",validId:"身份证格式不对"}
			,user_mob:{required:"此为必填项，请填写完善",validMobile:"输入的手机号错误，请核实后重新填写"}
			,user_pwd:{required:"密码不能为空",cn_rangelength:jQuery.format("请输入密码长度{0} 和 {1} 位的字符串"),validPassword:"必须由字母和数字组成"}
			,mob_cord:{required:"此为必填项，请填写完善",validJsonPMob:"短信验证码有误，请核实后重新填写"}
		}
	});
	
	
	//密码修改
	$("#edit_pwd").validate({
		rules:{
			user_pwd:{required:true,cn_rangelength:[6,32],validPassword:true}
			,new_pwd:{required:true,cn_rangelength:[6,32],validPassword:true}
			,re_pwd:{required:true,cn_rangelength:[6,32],equalTo: "#new_pwd"}
		}
		,messages:{
			user_pwd:{required:"密码不能为空",cn_rangelength:jQuery.format("请输入密码长度{0} 和 {1} 位的字符串"),validPassword:"必须由字母和数字组成"}
			,new_pwd:{required:"新密码不能为空",cn_rangelength:jQuery.format("请输入密码长度{0} 和 {1} 位的字符串"),validPassword:"必须由字母和数字组成"}
			,re_pwd:{required:"请再输入一次新密码",cn_rangelength:jQuery.format("请输入密码长度{0} 和 {1} 位的字符串"),equalTo:"2次输入密码不一致"}
		}
	});
	
	
	
	
	
	//不是VIP用户 身份认证
	$("#alone_idauth_not_vip").validate({
		rules:{
			real_name:{required:true,cn_rangelength:[2,50],validCName:true}
			,identity_card:{required:true,validId:true}
			,img_cord:{required:true,remote: {
				url: domain+"/checkverifyCode.html",
					type: "post",
					async:　false,
					data:{
						img_cord:function(){
							return $("#img_cord").val();
						}
					} 
				}
			}
			,check_agree: {required:true}
		}
		,messages:{
			real_name:{required:"此为必填项，请填写完善",cn_rangelength:jQuery.format("请输入姓名长度{0} 和 {1} 位的中文"),validCName:"输入内容必须为汉字"}
			,identity_card:{required:"此为必填项，请填写完善",validId:"身份证格式不对"}
			,img_cord:{required:"验证码不能为空",remote:"您输入的验证码有误"}
			,check_agree: {required:"请同意服务条款"}
		}
	});

	//vip用户 单条身份认证
	$("#alone_idauth_vip").validate({
		rules:{
			real_name:{required:true,validNoSpace:true,cn_rangelength:[2,50],validCName:true}
			,identity_card:{required:true,validNoSpace:true,validId:true}

			/*  纪成业 2015-6-15 (删) 
			,img_cord:{required:true,remote: {
					url: domain+"/checkverifyCode.html",
					type: "post",
					async:　false,
					data:{
						img_cord:function(){
							return $("#img_cord").val();
						}
					} 
				}
			}
			*/
		
			,check_agree: {required:true}
		}
		,messages:{
			real_name:{required:"此为必填项，请填写完善",validNoSpace:"不能存在空格及*号,请检查",cn_rangelength:jQuery.format("请输入姓名长度{0} 和 {1} 位的中文"),validCName:"输入内容必须为两个以上汉字"}
			,identity_card:{required:"此为必填项，请填写完善",validNoSpace:"不能存在空格及*号,请检查",validId:"身份证格式不对"}
			/*  纪成业 2015-6-15 (删)
			,img_cord:{required:"验证码不能为空",remote:"您输入的验证码有误"}
			*/
			,check_agree: {required:"请同意服务条款"}
		}
	});
	
	//vip用户 5条身份认证 2015.3.11--纪成业
	$("#alone_idauth_vip_more").validate({
		rules:{
			real_name_1:{ validGroups:true,validNoSpace:true,cn_rangelength:[2,50],validCName:true,validGroupName:true}
			,identity_card_1:{ validGroups:true,validNoSpace:true,validId:true,validGroupId:true}
			
			,real_name_2:{ validGroups:true,validNoSpace:true,cn_rangelength:[2,50],validCName:true,validGroupName:true}
			,identity_card_2:{ validGroups:true,validNoSpace:true,validId:true,validGroupId:true}
			
			,real_name_3:{ validGroups:true,validNoSpace:true,cn_rangelength:[2,50],validCName:true,validGroupName:true}
			,identity_card_3:{ validGroups:true,validNoSpace:true,validId:true,validGroupId:true}
			
			,real_name_4:{ validGroups:true,validNoSpace:true,cn_rangelength:[2,50],validCName:true,validGroupName:true}
			,identity_card_4:{ validGroups:true,validNoSpace:true,validId:true,validGroupId:true}
			
			,real_name_5:{ validGroups:true,validNoSpace:true,validNoSpace:true,validCName:true,validGroupName:true}
			,identity_card_5:{ validGroups:true,validNoSpace:true,validId:true,validGroupId:true}
			
			/*  纪成业 2015-6-15 (删) 
			,img_cord:{required:true,remote: {
					url: domain+"/checkverifyCode.html",
					type: "post",
					async:　false,
					data:{
						img_cord:function(){
							return $("#img_cord").val();
						}
					} 
				}
			}
			*/
		
			,check_agree: {required:true}							
		}
		,messages:{
			real_name_1:{	validGroups:"",validNoSpace:"不能存在空格及*号,请检查",cn_rangelength:jQuery.format("请输入姓名长度{0} 和 {1} 位的中文"),validCName:"输入内容必须为两个以上汉字",validGroupName:"请将真实姓名填写完整"}
			,identity_card_1:{ validGroups:"",validNoSpace:"不能存在空格及*号,请检查",validId:"身份证格式不对",validGroupId:"请将身份证号填写完整"}
			
			,real_name_2:{  validGroups:"",validNoSpace:"不能存在空格及*号,请检查",cn_rangelength:jQuery.format("请输入姓名长度{0} 和 {1} 位的中文"),validCName:"输入内容必须为两个以上汉字",validGroupName:"请将真实姓名填写完整"}
			,identity_card_2:{ validGroups:"",validNoSpace:"不能存在空格及*号,请检查",validId:"身份证格式不对",validGroupId:"请将身份证号填写完整"}
			
			,real_name_3:{  validGroups:"",validNoSpace:"不能存在空格及*号,请检查",cn_rangelength:jQuery.format("请输入姓名长度{0} 和 {1} 位的中文"),validCName:"输入内容必须为两个以上汉字",validGroupName:"请将真实姓名填写完整"}
			,identity_card_3:{ validGroups:"",validNoSpace:"不能存在空格及*号,请检查",validId:"身份证格式不对",validGroupId:"请将身份证号填写完整"}
			
			,real_name_4:{  validGroups:"",validNoSpace:"不能存在空格及*号,请检查",cn_rangelength:jQuery.format("请输入姓名长度{0} 和 {1} 位的中文"),validCName:"输入内容必须为两个以上汉字",validGroupName:"请将真实姓名填写完整"}
			,identity_card_4:{ validGroups:"",validNoSpace:"不能存在空格及*号,请检查",validId:"身份证格式不对",validGroupId:"请将身份证号填写完整"}
			
			,real_name_5:{  validGroups:"",validNoSpace:"不能存在空格及*号,请检查",cn_rangelength:jQuery.format("请输入姓名长度{0} 和 {1} 位的中文"),validCName:"输入内容必须为两个以上汉字",validGroupName:"请将真实姓名填写完整"}
			,identity_card_5:{ validGroups:"",validNoSpace:"不能存在空格及*号,请检查",validId:"身份证格式不对",validGroupId:"请将身份证号填写完整"}	
			
			/*  纪成业 2015-6-15 (删)
			,img_cord:{required:"验证码不能为空",remote:"您输入的验证码有误"}
			*/
			,check_agree: {required:"请同意服务条款"}
		}
	});	


	
	//vip 最高学历对比验证 2015.3.11--纪成业
	$("#alone_idauth_vip_edu").validate({
		rules:{
			real_name:{required:true,validNoSpace:true,cn_rangelength:[2,50],validCName:true}
			,identity_card:{required:true,validNoSpace:true,validId:true}
			,specialty:{validSchool:true,validNoSpace:true,validSpecialty:true}
			,graduate:{validSchool:true,validNoSpace:true,validSpecialty:true}

			/*  纪成业 2015-6-15 (删) 
			,img_cord:{required:true,remote: {
					url: domain+"/checkverifyCode.html",
					type: "post",
					async:　false,
					data:{
						img_cord:function(){
							return $("#img_cord").val();
						}
					} 
				}
			}
			*/
		
			,check_agree: {required:true}
		}
		,messages:{
			real_name:{required:"此为必填项，请填写完善",validNoSpace:"不能存在空格及*号,请检查",cn_rangelength:jQuery.format("请输入姓名长度{0} 和 {1} 位的中文"),validCName:"输入内容必须为两个以上汉字"}
			,identity_card:{required:"此为必填项，请填写完善",validNoSpace:"不能存在空格及*号,请检查",validId:"身份证格式不对"}
			,specialty:{validSchool:"学校、专业至少填写一项",validNoSpace:"不能存在空格及*号,请检查",validSpecialty:"您输入有误，请重新输入"}
			,graduate:{validSchool:"学校、专业至少填写一项",validNoSpace:"不能存在空格及*号,请检查",validSpecialty:"您输入有误，请重新输入"}
			/*  纪成业 2015-6-15 (删)
			,img_cord:{required:"验证码不能为空",remote:"您输入的验证码有误"}
			*/
			,check_agree: {required:"请同意服务条款"}
		}
	});	

	
	/* 2015-6-15 纪成业 (加) */
	//vip 银行卡比对 
	$("#alone_idauth_vip_bankCard").validate({
		rules:{
			real_name:{required:true,validNoSpace:true,cn_rangelength:[2,50],validCName:true}
			,bank_card:{required:true,validNoSpace:true,validBankNo1:true,validBankNo2:true,validBankNo3:true}
			
			/*  纪成业 2015-6-15 (删) 
			,img_cord:{required:true,remote: {
					url: domain+"/checkverifyCode.html",
					type: "post",
					async:　false,
					data:{
						img_cord:function(){
							return $("#img_cord").val();
						}
					} 
				}
			}
			*/
		
			,check_agree: {required:true}
		}
		,messages:{
			real_name:{required:"此为必填项，请填写完善",validNoSpace:"不能存在空格及*号,请检查",cn_rangelength:jQuery.format("请输入姓名长度{0} 和 {1} 位的中文"),validCName:"输入内容必须为两个以上汉字"}
			,bank_card:{required:"此为必填项，请填写完善",validNoSpace:"不能存在空格及*号,请检查",validBankNo1:"银行卡号必须全由数字组成",validBankNo2:"请填写16到19位的银行卡号",validBankNo3:"银行卡号不符合规则"} 
			/*  纪成业 2015-6-15 (删)
			,img_cord:{required:"验证码不能为空",remote:"您输入的验证码有误"}
			*/
			,check_agree: {required:"请同意服务条款"}
		}
	});
	/* \OVER 2015-6-15 纪成业 (加) */

	/*
	//vip 企业对公账户验证 Version1
	$("#alone_idauth_vip_comAccount").validate({
		rules:{
			real_name:{required:true,validNoSpace:true,cn_rangelength:[5,50],validCompanyName:true}
			,company_account:{required:true,validNoSpace:true,cn_rangelength:[6,30],validDigit:true}
			,openAccount_bankname:{required:true,validNoSpace:true,cn_rangelength:[4,50],validBankCompanyName:true,validAccountBank:true}
			,check_agree: {required:true}
		}
		,messages:{
			real_name:{required:"此为必填项，请填写完善",validNoSpace:"不能存在空格及*号,请检查",cn_rangelength:jQuery.format("请输入长度{0} 到 {1} 位的中文"),validCompanyName:"企业名称为至少5位的汉字"}
			,company_account:{required:"此为必填项，请填写完善",validNoSpace:"不能存在空格及*号,请检查",cn_rangelength:"请输入长度{0} 到 {1} 位的数字",validDigit:"输入内容必须全为数字"}
			,openAccount_bankname:{required:"此为必填项，请填写完善",validNoSpace:"不能存在空格及*号,请检查",cn_rangelength:jQuery.format("请输入长度{0} 到 {1} 位的中文"),validBankCompanyName:"银行名称为至少4位的汉字",validAccountBank:"请选择或输入提示中的银行名称 暂不支持其它"}
			,check_agree: {required:"请同意服务条款"}
		}
	});
	*/
	//vip 企业对公账户验证	Version2
	$("#alone_idauth_vip_comAccount").validate({
		rules:{
			real_name:{required:true,validNoSpace:true,cn_rangelength:[5,50],validCompanyName:true}
			,company_account:{required:true,validNoSpace:true,cn_rangelength:[6,30],validDigit:true}
			//,openAccount_bankname:{required:true,validNoSpace:true,cn_rangelength:[4,50],validBankCompanyName:true,validAccountBank:true}
			,openAccount_bankname:{required:true,validNoSpace:true,cn_rangelength:[4,50],validBankCompanyName:true,validBankCompanyName2:true}
			,enterprise_mailbox:{required:true,validEmail:true}
			,check_agree: {required:true}
		}
		,messages:{
			real_name:{required:"此为必填项，请填写完善",validNoSpace:"不能存在空格及*号,请检查",cn_rangelength:jQuery.format("请输入长度{0} 到 {1} 位的中文"),validCompanyName:"企业名称为至少5位的汉字"}
			,company_account:{required:"此为必填项，请填写完善",validNoSpace:"不能存在空格及*号,请检查",cn_rangelength:"请输入长度{0} 到 {1} 位的数字",validDigit:"输入内容必须全为数字"}
			//,openAccount_bankname:{required:"此为必填项，请填写完善",validNoSpace:"不能存在空格及*号,请检查",cn_rangelength:jQuery.format("请输入长度{0} 到 {1} 位的中文"),validBankCompanyName:"银行名称为至少4位的汉字",validAccountBank:"请选择或输入提示中的银行名称 暂不支持其它"}
			,openAccount_bankname:{required:"此为必填项，请填写完善",validNoSpace:"不能存在空格及*号,请检查",cn_rangelength:jQuery.format("请输入长度{0} 到 {1} 位的中文"),validBankCompanyName:"银行名称为至少4位的汉字",validBankCompanyName2:"请输入正确的银行名称"}
			,enterprise_mailbox:{required:"此为必填项，请填写完善",validEmail:"请检查您的邮箱格式"}
			,check_agree: {required:"请同意服务条款"}
		}
	});

	//vip用户 身份信息核验回溯(免费)
	$("#alone_idauth_vip_trace").validate({
		rules:{
			//real_name:{required:true,validNoSpace:true,cn_rangelength:[2,50],validCName:true}
			identity_card:{required:true,validNoSpace:true,validId:true}
			,img_cord:{required:true,remote: {
					url: domain+"/checkverifyCode.html",
					type: "post",
					async:　false,
					data:{
						img_cord:function(){
							return $("#img_cord").val();
						}
					} 
				}
			}
			,check_agree: {required:true}
		}
		,messages:{
			//real_name:{required:"此为必填项，请填写完善",validNoSpace:"不能存在空格及*号,请检查",cn_rangelength:jQuery.format("请输入姓名长度{0} 和 {1} 位的中文"),validCName:"输入内容必须为两个以上汉字"}
			identity_card:{required:"此为必填项，请填写完善",validNoSpace:"不能存在空格及*号,请检查",validId:"身份证格式不对"}
			,img_cord:{required:"验证码不能为空",remote:"您输入的验证码有误"}
			,check_agree: {required:"请同意服务条款"}
		}
	});	
	//vip用户 身份信息核验回溯(收费)
	$("#alone_idauth_vip_traceFull").validate({
		rules:{
			real_name:{required:true,validNoSpace:true,cn_rangelength:[4,50],validCName:true}
			,identity_card:{required:true,validNoSpace:true,validId:true}
			,img_cord:{required:true,remote: {
					url: domain+"/checkverifyCode.html",
					type: "post",
					async:　false,
					data:{
						img_cord:function(){
							return $("#img_cord").val();
						}
					} 
				}
			}
			,check_agree: {required:true}
		}
		,messages:{
			real_name:{required:"此为必填项，请填写完善",validNoSpace:"不能存在空格及*号,请检查",cn_rangelength:jQuery.format("请输入姓名长度{0}和 {1} 位的中文"),validCName:"输入内容必须为两个以上汉字"}
			,identity_card:{required:"此为必填项，请填写完善",validNoSpace:"不能存在空格及*号,请检查",validId:"身份证格式不对"}
			,img_cord:{required:"验证码不能为空",remote:"您输入的验证码有误"}
			,check_agree: {required:"请同意服务条款"}
		}
	});

	//vip用户 人相比对
	$("#alone_idauth_vip_photo").validate({
		rules:{
			real_name:{required:true,validNoSpace:true,cn_rangelength:[2,50],validCName:true}
			,identity_card:{required:true,validNoSpace:true,validId:true}
			// ,file: {required:true}
			,check_agree: {required:true}
		}
		,messages:{
			real_name:{required:"此为必填项，请填写完善",validNoSpace:"不能存在空格及*号,请检查",cn_rangelength:jQuery.format("请输入姓名长度{0} 和 {1} 位的中文"),validCName:"输入内容必须为两个以上汉字"}
			,identity_card:{required:"此为必填项，请填写完善",validNoSpace:"不能存在空格及*号,请检查",validId:"身份证格式不对"}
			// ,file: {required:"此为必填项，请填写完善"}
			,check_agree: {required:"请同意服务条款"}
		}
	});


	
	/*  纪成业 2015-6-29 （添加） */
	//企业账户充值服务表单
	$("#czService_form").validate({
		rules:{
			czCS: {required:true, validCS:true}
		},
		messages:{
			czCS:{required:"内容为空，默认充值1次",validCS:"请输入正确次数格式"}
		}
	});

	//企业对公账户比对金额表单
	$("#remitMoney_form").validate({
		rules:{
			remit_money: {required:true,validJE:true}
		},
		messages:{
			remit_money:{required:"此为必填项，请填写完善",validJE:"金额必须为保留两位的小数"}
		}
	});
	/*  \OVER 纪成业 2015-6-29 （添加） */


	//身份认证 自我认证
	$("#alone_idauth_self").validate({
		rules:{
			real_name:{required:true,cn_rangelength:[2,50],validCName:true}
			,identity_card:{required:true,validId:true}
			,img_cord:{required:true,remote: {
					url: domain+"/checkverifyCode.html",
					type: "post",
					async:　false,
					data:{
						img_cord:function(){
							return $("#img_cord").val();
						}
					} 
				}
			}
			,check_agree: {required:true}
		}
		,messages:{
			real_name:{required:"此为必填项，请填写完善",cn_rangelength:jQuery.format("请输入姓名长度{0} 和 {1} 位的中文"),validCName:"输入内容必须为汉字"}
			,identity_card:{required:"此为必填项，请填写完善",validId:"身份证格式不对"}
			,img_cord:{required:"验证码不能为空",remote:"您输入的验证码有误"}
			,check_agree: {required:"请同意服务条款"}
		}
	});
	
	
	//争议申诉
	$("#alone_dispute").validate({
		rules:{
			question: {required:true}
			,file_idcar1: {required:true}
			,file_idcar2: {required:true}
			,file_idcar3: {required:true}
			,native: {required:true}
			,real_name:{required:true,cn_rangelength:[2,50],validCName:true}
			,identity_card:{required:true,validId:true}
			,user_mob:{required:true,validMobile:true}
			,mob_cord:{required:true,validJsonPMob:true}
			,user_email:{required:true,validEmail:true}
			
		}
		,messages:{
			question:{required:"此为必填项，请填写完善"}
			,file_idcar1: {required:"此为必填项，请填写完善"}
			,file_idcar2: {required:"此为必填项，请填写完善"}
			,file_idcar3: {required:"此为必填项，请填写完善"}
			,native: {required:"此为必填项，请填写完善"}
			,real_name:{required:"此为必填项，请填写完善",cn_rangelength:jQuery.format("请输入姓名长度{0} 和 {1} 位的中文"),validCName:"输入内容必须为汉字"}
			,identity_card:{required:"此为必填项，请填写完善",validId:"身份证格式不对"}
			,user_mob:{required:"此为必填项，请填写完善",validMobile:"输入的手机号错误，请核实后重新填写"}
			,mob_cord:{required:"此为必填项，请填写完善",validJsonPMob:"短信验证码有误，请核实后重新填写"}
			,user_email:{required:"此为必填项，请填写完善",validEmail:"请检查您的邮箱格式"}
		}
	});
	
	//手机解决争议
	$("#phone_dispute").validate({
		rules:{
			real_name:{required:true,cn_rangelength:[2,50],validCName:true}
			,identity_card:{required:true,validId:true}
			,user_mob:{required:true,validMobile:true}
			,mob_cord:{required:true,validJsonPMob:true}
		}
		,messages:{
			real_name:{required:"此为必填项，请填写完善",cn_rangelength:jQuery.format("请输入姓名长度{0} 和 {1} 位的中文"),validCName:"输入内容必须为汉字"}
			,identity_card:{required:"此为必填项，请填写完善",validId:"身份证格式不对"}
			,user_mob:{required:"此为必填项，请填写完善",validMobile:"输入的手机号错误，请核实后重新填写"}
			,mob_cord:{required:"此为必填项，请填写完善",validJsonPMob:"短信验证码有误，请核实后重新填写"}
		}	});
	
	$("#email_retry").validate({
		rules:{
			user_email:{required:true,validEmail:true,remote: {
				url: evUrl2,
				type: "post",
				async:　false,
				data:{
					user_email:function(){
						return $("#user_email").val();
					}
				} 
			}
		}
		}
		,messages:{
			user_email:{required:"此为必填项，请填写完善",validEmail:"请检查您的邮箱格式",remote:"邮箱不存在"}
		}
	});
	
	
	$("#alone_update_form").validate({
		rules:{
			update_cname:{required:true,validCompanyName:true}
			,update_add:{required:true,validAddress:true}
			,update_fr:{required:true,cn_rangelength:[2,50],validCName:true}
			,update_name:{required:true,cn_rangelength:[2,50],validCName:true}
			,update_mob:{required:true,validMobile:true}
			,check_agree: {required:true}
		}
		,messages:{
			update_cname:{required:"此为必填项，请填写完善",validCompanyName:"公司名称格式有误，请您核对！"}
			,update_add:{required:"此为必填项，请填写完善",validAddress:"公司地址格式有误，请您核对！"}
			,update_fr:{required:"此为必填项，请填写完善",cn_rangelength:jQuery.format("请输入姓名长度{0} 和 {1} 位的中文"),validCName:"输入内容必须为汉字"}
			,update_name:{required:"此为必填项，请填写完善",cn_rangelength:jQuery.format("请输入姓名长度{0} 和 {1} 位的中文"),validCName:"输入内容必须为汉字"}
			,update_mob:{required:"此为必填项，请填写完善",validMobile:"输入的手机号错误，请核实后重新填写"}
			,check_agree: {required:"请同意服务条款"}
		}
	});
	


});