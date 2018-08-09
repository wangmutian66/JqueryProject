//图片预加载
(function($){

	function PreLoad(imgs,options){
		this.imgs = (typeof imgs === 'string')?[imgs]:imgs;
		this.opts = $.extend({},PreLoad.DEFAULTS,options);
		this._unoredered();
	}
	PreLoad.DEFAULTS = {
		each:null, // 每一张图片加载完之后执行
		all:null //全部 图片加载完之后执行
	};

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