/*   toast 
*    author: crerich
*    data: 16/5 17
*/



;(function($) {
	var default_options = {
		duration: 3000,  //3s
		content: '',
		html: false,
		type: 'info'     // info warning
	}

	// 创建Toast容器
	function createToastWrap() {
		var id = 'toast-' + $.expando,
			wrapUl = $("div id='"+ id +"' class='pvp-toast-wrap'></div>");
		$('body').append(wrapUl)
		return wrapUl
	}
	
	// 移除Toast容器
	function removeToastWrap() {
		if (this.$wrap.children().length == 0) {
			this.$wrap.remove()
			this.$wrap = null
		}
	}

	$.toast = function(options) {
		this.options = $.extend({}, default_options, options)
		this.$wrap = null
	}
	$.toast.prototype = {
		constructor: $.toast,
		add: function(content, type, html) {
			type = type || this.options.type
			html  = html !== undefined ? html : this.options.html
			var new_toast = $("<div class='pvp-toast " + type + ">")
			html ? new_toast.html(content) : new_toast.text(content)
			this.$wrap = this.$wrap || createToastWrap()
			this.$wrap.prepend(new_toast)
			this.remove(new_toast)
		},
		remove: function(toast, immediate) {
			var that = this;
			if (immediate) {
				toast.remove()
			} else {
				setTimeout(function() {
					$.support.transition ?
						toast.removeClass('in').one('bsTranstionEnd', function() {
							toast.remove()
							removeToastWrap.call(that)
						}) : toast.remove(), removeToastWrap.call(that)
				}, parseInt(that.options.duration))
			}
		}
	}
}(jQuery));