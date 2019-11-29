/*
	scroll 瞄记链接
*/
$(function(){
	$('#navbar-nav').on('click','a:not([href=""])',function(){
		$('html,body').animate({
			scrollTop:$($(this).attr('href')).offset().top
		},600);
		return false;
	});
})

$(function(){
	var sec = $('.wrapped'),
		navitem = $('#navbar-nav li a');
	
	$('.navbar').on('click','#navToggle',function(){
		$(this).toggleClass('nav-change');
	});
	
	$(window).on('scroll',function(e){
		navToggle();
		setActive();
	});
	
	// 设置PC端导航是否显示
	function navToggle(){
		if($(window).scrollTop() > 260){
			$('.navigation').fadeIn();
		}else{
			$('.navigation').fadeOut()
		}
	}
	navToggle();
	
	// 选择当前导航
	function setActive(){
		for(var i = 0; i < sec.length; i++){
			if((sec.eq(i).offset().top - $(window).scrollTop()) < 100){
				navitem.eq(i).addClass('active-color').parent().siblings().children().removeClass('active-color')
			}
		}
	}
	setActive();
})
