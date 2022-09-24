$(function(){

	var scrollerElem = $("#Scroller");

	setInterval(function(){
		var scrollTop = $(window).scrollTop();
		var height = scrollerElem.height();
		if (scrollTop > height - 2000){
			scrollerElem.height(height + 5000);
		}
	}, 300);
});