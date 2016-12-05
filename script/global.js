$(function () {
	

	/*index*/
	$(".tabBtn").click(function () {
		var that = $(this);
		var i = that.index(".tabBtn");
		var oMain = $(".tabMain");
		// oMain.removeClass('active');
		// oMain.eq(i).addClass('active');
		$("#tabMainBox").animate({
			'top': -(i*270)
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
	
	// $.jqtab("#tabs2","#tab_conbox2","mouseenter");
	


	$("#mdm li").click(function () {
		var that = $(this);
		if (that.hasClass('active')) {

		}else{
			$("#mdm li").removeClass('active');
			that.addClass('active');
		}
	});


	// 
	try{
		$("#mdm li").eq(setMenu).click();
	}catch (e) {}

});