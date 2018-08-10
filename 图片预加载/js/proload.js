//图片预加载
(function($){

	function PreLoad(imgs,options){
		this.imgs = (typeof imgs === 'string')?[imgs]:imgs;
		this.opts = $.extend({},PreLoad.DEFAULTS,options);
		if(this.opts.order == 'ordered'){
			this._oredered();
		}else{
			this._unoredered();	
		}
		
	}
	PreLoad.DEFAULTS = {
		order:'unoredered', //无须预加载
		each:null, // 每一张图片加载完之后执行
		all:null //全部 图片加载完之后执行
	};

	PreLoad.prototype._oredered = function(){ //有序预加载
		var opts = this.opts,
		imgs=this.imgs,
		len=imgs.length,
		count=0;

		load();
		//有序预加载
		function load(){
			var imgObj = new Image();
			$(imgObj).on('load error',function(){
				opts.each && opts.each();
				if(count>=len){
					//所有图片都已经加载完成
					opts.all && opts.all();
				}else{
					load();	
				}
				
				
				count++;
			});

			imgObj.src = imgs[count];

		}



	},
	PreLoad.prototype._unoredered = function(){ //无序加载
		var imgs = this.imgs,
		opts = this.opts,
		count = 0,
		len = 0;
		$.each(imgs,function(i,src){
			//判断src是不是字符串
			if(typeof src != 'string') return;

			var imgObj = new Image();
			$(imgObj).on('load error',function(){
				opts.each && opts.each(count); // 如果 opts.each 存在在执行 opts.each()
				// $progress.html(Math.round((count + 1)/len * 100)+"%");
				if(count >= len-1){
					opts.all && opts.all();
					// $('.loading').hide();
					// document.title = '1/' + len;
				}
				count++;
			});

			imgObj.src = src;

		});
	}






	// $.fn.extend -> $("#img").preload();
	// $.extend -> $.preload(); 
	$.extend({
		PreLoad:function(imgs,opts){
			new PreLoad(imgs,opts);
		}
	});

})(jQuery);