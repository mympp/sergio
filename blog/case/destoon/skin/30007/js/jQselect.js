jQuery.fn.extend({
	selectbox: function(options) {
		return this.each(function() {
			new jQuery.SelectBox(this, options);
		});
	}
});


/* pawel maziarz: work around for ie logging */
if (!window.console) {
	var console = {
		log: function(msg) { 
	 }
	}
}
/* */

jQuery.SelectBox = function(selectobj, options) {
	
	var opt = options || {};
	opt.inputClass = opt.inputClass || "selectbox";
	opt.containerClass = opt.containerClass || "selectbox-wrapper";
	opt.hoverClass = opt.hoverClass || "current";
	opt.currentClass = opt.selectedClass || "selected"
	opt.debug = opt.debug || false;
	
	var elm_id = selectobj.id;
	var active = 0;
	var inFocus = false;
	var hasfocus = 0;
	//jquery object for select element
	var jQueryselect = jQuery(selectobj);
	// jquery container object
	var jQuerycontainer = setupContainer(opt);
	//jquery input object 
	var jQueryinput = setupInput(opt);
	// hide select and append newly created elements
	jQueryselect.hide().before(jQueryinput).before(jQuerycontainer);
	
	
	init();
	
	jQueryinput
	.click(function(){
  //  if (inFocus) {
		  jQuerycontainer.toggle();
		//}else{
              //    jQuerycontainer.hide();
              //  }
	})
	//.focus(function(){
	//   if (jQuerycontainer.not(':visible')) {
	//       inFocus = true;
	//       jQuerycontainer.show();
	//   }
	//})
	.keydown(function(event) {	   
		switch(event.keyCode) {
			case 38: // up
				event.preventDefault();
				moveSelect(-1);
				break;
			case 40: // down
				event.preventDefault();
				moveSelect(1);
				break;
			//case 9:  // tab 
			case 13: // return
				event.preventDefault(); // seems not working in mac !
				jQuery('li.'+opt.hoverClass).trigger('click');
				break;
			case 27: //escape
			  hideMe();
			  break;
		}
	})
	.blur(function() {
		if (jQuerycontainer.is(':visible') && hasfocus > 0 ) {
			if(opt.debug) console.log('container visible and has focus')
		} else {
		  // Workaround for ie scroll - thanks to Bernd Matzner
		  if(jQuery.browser.msie || jQuery.browser.safari){ // check for safari too - workaround for webkit
       // if(document.activeElement.getAttribute('id').indexOf('_container')==-1){
          hideMe();
       // } else {
       //   jQueryinput.focus();
       // }
      } else {
        hideMe();
      }
		}
	});


	function hideMe() { 
		hasfocus = 0;
		jQuerycontainer.hide(); 
	}
	
	function init() {
		jQuerycontainer.append(getSelectOptions(jQueryinput.attr('id'))).hide();
		var width = jQueryinput.css('width');

    }
	
	function setupContainer(options) {
		var container = document.createElement("div");
		jQuerycontainer = jQuery(container);
		jQuerycontainer.attr('id', elm_id+'_container');
		jQuerycontainer.addClass(options.containerClass);
		
		return jQuerycontainer;
	}
	
	function setupInput(options) {
		var input = document.createElement("input");
		var jQueryinput = jQuery(input);
		jQueryinput.attr("id", elm_id+"_input");
		jQueryinput.attr("type", "text");
		jQueryinput.addClass(options.inputClass);
		jQueryinput.attr("autocomplete", "off");
		jQueryinput.attr("readonly", "readonly");
		jQueryinput.attr("tabIndex", jQueryselect.attr("tabindex")); // "I" capital is important for ie
		
		return jQueryinput;	
	}
	
	function moveSelect(step) {
		var lis = jQuery("li", jQuerycontainer);
		if (!lis || lis.length == 0) return false;
		active += step;
    //loop through list
		if (active < 0) {
			active = lis.size();
		} else if (active > lis.size()) {
			active = 0;
		}
    scroll(lis, active);
		lis.removeClass(opt.hoverClass);

		jQuery(lis[active]).addClass(opt.hoverClass);
	}
	
	function scroll(list, active) {
      var el = jQuery(list[active]).get(0);
      var list = jQuerycontainer.get(0);
      
      if (el.offsetTop + el.offsetHeight > list.scrollTop + list.clientHeight) {
        list.scrollTop = el.offsetTop + el.offsetHeight - list.clientHeight;      
      } else if(el.offsetTop < list.scrollTop) {
        list.scrollTop = el.offsetTop;
      }
	}
	
	function setCurrent() {	
		var li = jQuery("li."+opt.currentClass, jQuerycontainer).get(0);
		var ar = (''+li.id).split('_');
		var el = ar[ar.length-1];
		jQueryselect.val(el);
		jQueryinput.val(jQuery(li).html());
		return true;
	}
	
	// select value
	function getCurrentSelected() {
		return jQueryselect.val();
	}
	
	// input value
	function getCurrentValue() {
		return jQueryinput.val();
	}
	
	function getSelectOptions(parentid) {
		var select_options = new Array();
		var ul = document.createElement('ul');
		jQueryselect.children('option').each(function() {
			var li = document.createElement('li');
			li.setAttribute('id', parentid + '_' + jQuery(this).val());
			li.innerHTML = jQuery(this).html();
			if (jQuery(this).is(':selected')) {
				jQueryinput.val(jQuery(this).html());
				jQuery(li).addClass(opt.currentClass);
			}
			ul.appendChild(li);
			jQuery(li)
			.mouseover(function(event) {
				hasfocus = 1;
				if (opt.debug) console.log('over on : '+this.id);
				jQuery(event.target, jQuerycontainer).addClass(opt.hoverClass);
			})
			.mouseout(function(event) {
				hasfocus = -1;
				if (opt.debug) console.log('out on : '+this.id);
				jQuery(event.target, jQuerycontainer).removeClass(opt.hoverClass);
			})
			.click(function(event) {
			  var fl = jQuery('li.'+opt.hoverClass, jQuerycontainer).get(0);
				if (opt.debug) console.log('click on :'+this.id);
				jQuery('#' + elm_id + '_container' + ' li.'+opt.currentClass).removeClass(opt.currentClass); 
				jQuery(this).addClass(opt.currentClass);
				setCurrent();
				//jQueryselect.change();
				jQueryselect.get(0).blur();
				hideMe();
			});
		});
		return ul;
	}
	
	
	
};

