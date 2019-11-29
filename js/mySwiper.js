/*
	ele 		DOM元素
	
	options: {
		autoplay	是否自动播放		boolean
		duration	切换时间			number
		loop 		是否循环播放		boolean
		spacing		拖动距离			number
	}
*/

function mySwiper(ele,options){
	this.swiper = document.querySelector(ele);
	this.containerEl = document.querySelector('.swiper-container');
	this.itemEls = document.querySelectorAll('.swiper-item');
	
	var itemWidth = this.itemEls[0].offsetWidth,
		that = this,
		len = this.itemEls.length
		html = '';
	
	function setSize(){
		for(var i = 0; i < len; i++){
			this.itemEls[i].style.width = this.swiper.offsetWidth + 'px';
		}
	}
	setSize.call(this);
	
	options = options || {};
	this.autoplay = options.autoplay || false;
	this.duration = options.duration || 3500;
	this.loop = options.loop || false;
	this.index = options.index || 0;
	this.spacing = options.spacing || 100;
	this.prev = this.swiper.querySelector(options.prevEl);
	this.next = this.swiper.querySelector(options.nextEl);
	this.pagination = this.swiper.querySelector(options.pagination);
	
	if(this.pagination){
		for(var j = 0;j < len;j ++){
			html += '<span></span>'
		}
		this.pagination.innerHTML = html;
		this.pagination.children[this.index].classList.add('active');
	}
	
	
	var state = {
		sign: 0,
		startEvent: null,
		oldEvent: null,
		left: 0 - itemWidth * this.index,
		timer: 0
	}
	
	function isLoop(){
		if(that.loop){
			if(that.index > that.itemEls.length - 1){
				that.index = 0;
			}else if(that.index < 0){
				that.index = that.itemEls.length - 1
			}
		}else{
			if(that.index > (that.itemEls.length -1)){
				that.index = (that.itemEls.length -1)
			}else if(that.index < 0){
				that.index = 0;
			}
		}
	}
	
	function isAutoplay(boo){
		if(!boo) return;
		state.timer = setInterval(function(){
			that.index ++;
			isLoop();
			change(that.index);
		},that.duration);
	}
	isAutoplay(that.autoplay);
	
	that.containerEl.addEventListener('mouseenter',function(){
		clearInterval(state.timer);
	},false);
	
	that.containerEl.addEventListener('mouseleave',function(){
		isAutoplay(that.autoplay);
	},false);
	
	function change(n){
		state.left = 0 - itemWidth * n;
		that.containerEl.style.left = state.left + 'px';
		
		that.containerEl.className += ' move';
		that.containerEl.addEventListener('transitionend', () => {
			that.containerEl.className = that.containerEl.className.replace(/\s+move/, '');
		});
		if(that.pagination){
			for(var j = 0;j < len;j ++){
				that.pagination.children[j].classList.remove('active');
			}
			that.pagination.children[that.index].classList.add('active');
		}
	}
	
	that.containerEl.addEventListener('mousedown',function(event) {
		event.preventDefault();
		state.sign = 1;
		state.startEvent = state.oldEvent = event;
	},false);
	
	document.addEventListener('mousemove',function(event){
		if(state.sign !== 1) return;
		event.preventDefault();
		
		if(event.pageX < state.oldEvent.pageX){
			state.left -= state.oldEvent.pageX - event.pageX;
		}else{
			state.left += event.pageX - state.oldEvent.pageX;
		}
		
		state.oldEvent = event;
		
		that.containerEl.style.left = state.left + 'px';
	},false)
	
	document.addEventListener('mouseup',function(event){
		state.sign = 0;
		
		if(event.pageX < state.startEvent.pageX){
			if((state.startEvent.pageX - event.pageX) < 100) {
				change(that.index);
				return
			}
			
			that.index ++;
		}else{
			if((event.pageX - state.startEvent.pageX) < 100){
				change(that.index);
				return
			}
			
			that.index --;
		}
		
		isLoop();
		change(that.index);
	},false);
	
	window.addEventListener('resize',function(){
		setSize.call(that);
	},false);
}
