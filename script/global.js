$(function () {
	

	/*index*/
	$(".tabBtn").click(function () {
		var that = $(this);
		var i = that.index(".tabBtn");
		var oMain = $(".tabMain");
		// oMain.removeClass('active');
		// oMain.eq(i).addClass('active');
		$("#tabMainBox").animate({
			'top': -(i*275)
		}, 1000, 'easeOutElastic');
		$(".tabBtn").removeClass('active');
		that.addClass('active');
	});


	$("#searchText").focus(function () {
		$(this).addClass('active')
	}).blur(function () {
		$(this).removeClass('active')
	});


	/* tab */
	jQuery.jqtab = function(tabtit,tab_conbox,ev) {
		$(tab_conbox).find("li").hide();
		$(tabtit).find("li:first").addClass("thistab").show(); 
		$(tab_conbox).find("li:first").show();
	
		$(tabtit).find("li").bind(ev,function(){
			$(this).addClass("thistab").siblings("li").removeClass("thistab"); 
			var activeindex = $(tabtit).find("li").index(this);
			$(tab_conbox).children().eq(activeindex).show().siblings().hide();
			return false;
		});
	
	};

	$.jqtab("#tabs","#tab_conbox","click");
		

	$("#mdm li").click(function () {
		var that = $(this);
		if (that.hasClass('active')) {

		}else{
			$("#mdm li").removeClass('active');
			that.addClass('active');
		}
	});


	// myData
	try{
		$("#mdm li").eq(setMenu).click();
	}catch (e) {}


	// tab
	$(".myDataTabBtn a").click(function () {
		var that = $(this);
		var i = that.index();
		$(".myDataTabBtn a").removeClass('active');
		that.addClass('active');
		$(".myDataTabBox").removeClass('active');
		$(".myDataTabBox").eq(i).addClass('active');
	});


	//myDatas
	$(".myDatas").hover(function () {
		var obj = $(this).find(".myDatasBtn");
		obj.addClass('active');
	}, function () {
		var obj = $(this).find(".myDatasBtn");
		obj.removeClass('active');
	});

	//初始化数组
	var aDx = [];
	$(".a_dx").each(function () {
		aDx.push($(this).html());
	});

	$("#add_sjb").bind('input propertychange', function () {
		var v = $(this).val();
		if(aDx.indexOf(v) < 0){
			$("#add_sjb_id").val('');
		}
	});

	//a_dx
	$(".a_dx").click(function () {
		$("#add_sjb").val($(this).html());
		$("#add_sjb_id").val($(this).attr('data-id'));
	});

	// 初始化
	$("#del").click(function () {
		if($(".t_tbody").length > 1){
			$(this).parents('.t_tbody').remove();
			setOpt();
		}
	});

	$("#add_btn").click(function () {
		$("#add_table").append($(".t_tbody").eq(0).clone(true));
		setOpt();
	});

	setOpt();

	function setOpt() {
		$(".t_tbody").each(function (index) {
			setFn(index);
		});
	}

	function setFn (i) {
		$(".op_name").attr({
			'id': 'op_name_' + i,
			'name': 'op_name'
		});
		$(".op_type").attr({
			'id': 'op_requir_' + i,
			'name': 'op_requir'
		});
		$(".op_requir").attr({
			'id': 'op_requir_' + i,
			'name': 'op_requir'
		});
		$(".op_query").attr({
			'id': 'op_query_' + i,
			'name': 'op_query'
		});
		$(".op_info").attr({
			'id': 'op_info_' + i,
			'name': 'op_info'
		});
		$(".op_val").attr({
			'id': 'op_val_' + i,
			'name': 'op_val'
		});
	}

	$("#del2").click(function () {
		if($(".t_tbody2").length > 1){
			$(this).parents('.t_tbody2').remove();
			setOpt2();
		}
	});

	$("#add_btn2").click(function () {
		$("#add_table2").append($(".t_tbody2").eq(0).clone(true));
		setOpt2();
	});

	setOpt2();

	function setOpt2() {
		$(".t_tbody2").each(function (index) {
			setFn(index);
		});
	}

	function setFn2 (i) {
		$(".op2_name").attr({
			'id': 'op2_name_' + i,
			'name': 'op2_name'
		});
		$(".op2_type").attr({
			'id': 'op2_requir_' + i,
			'name': 'op2_requir'
		});
		$(".op2_info").attr({
			'id': 'op2_info_' + i,
			'name': 'op2_info'
		});
		$(".op2_val").attr({
			'id': 'op2_val_' + i,
			'name': 'op2_val'
		});
	}
});