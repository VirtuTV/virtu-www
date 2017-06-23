(function($){

	$.fn.extend({
		createCalendar : function(options){
			var self = $(this),
				mY = self.prev('.calendar_nav').find('.month_and_year'),
				monthArray = ['January','February','March','April','May','June','Jully','August','September','October','November','December'],
				current = new Date(),
				nav = self.prev('.calendar_nav').children('[data-calendar-nav]'),
				m = current.getMonth(),
				y = current.getFullYear();

			nav.on('click',function(){
				var direction = $(this).data('calendar-nav');
				if(direction == 'prev'){
					m--;
					if(m < 0){
						y--;
						m = 11;
					}
					createC(self,y,m);
				}else{
					m++;
					if(m > 11){
						y++;
						m = 0;
					}
					createC(self,y,m);
				}
			});

			createC(self,y,m);
				
			function createC(elem,year,month){
				var table = '<table class="calendar w_full t_align_c"><tr class="bg_light_2 color_grey"><th>M</th><th>T</th><th>W</th><th>T</th><th>F</th><th>S</th><th>S</th></tr><tr>',
				mon = month,
				d = new Date(year,month),
				mn = current.getMonth() == month,
				day = current.getDate();

				mY.text(monthArray[mon] + ' ' + year);
				  for (var i=0; i<getDay(d); i++) {
				    table += '<td></td>';
				  }
				  while(d.getMonth() == mon) {
				  	if(mn && day == d.getDate()) table += '<td class="active"><span class="d_inline_m color_pink r_corners border_color_pink">'+d.getDate()+'</span></td>';
				    else table += '<td class="color_grey">'+d.getDate()+'</td>';
				    if (getDay(d) % 7 == 6) {
				      table += '</tr><tr>';
				    }
				    d.setDate(d.getDate()+1);
				  }
				  if (getDay(d) != 0) {
				    for (var i=getDay(d); i<7; i++) {
				      table += '<td></td>';
				    }
				  }
				table += '</tr></table>';  
				elem.html(table);
				function getDay(date) { 
				  var day = date.getDay();
				  if (day == 0) day = 7;
				  return day - 1;
				}
			}
			return self;
		},

		accordion : function(){
			var accordion = $(this),
				item = accordion.children('.accordion_item');

			item.not('.active').children('dd').hide();
			item.filter('.active').children('dt').removeClass('color_dark').addClass('color_scheme');

			item.on('click','.accordion_link',function(){
				var self = $(this);

				if(self.closest(accordion).hasClass('toggle')){
						self.toggleClass('color_dark color_scheme')
						.next().stop()
						.slideToggle()
						.parent()
						.toggleClass('active');
				}else{
					self
						.removeClass('color_dark').addClass('color_scheme')
						.next().stop()
						.slideDown()
						.parent()
						.addClass('active')
						.siblings()
						.removeClass('active')
						.children('dt').removeClass('color_scheme').addClass('color_dark')
						.next().stop()
						.slideUp();
				}
			});

			return accordion;
		},

		formSelect : function(){
	      	return $(this).each(function(){

	      		var title = $(this).find('.select_title'),
	      			select = $(this).find('select'),
	      			len = select.children('option').length,
	      			list = $(this).find('.select_list');

	      		for(var i = 0; i < len; i++){
	      			list.append('<li class="tr_delay fs_medium color_grey">'+select.children('option').eq(i).val()+'</li>');
	      		}

	      		title.on('click',function(){
	      			$(this).toggleClass('active');
	      			list.toggleClass('vertical_animate_finished');
	      		});

	      		list.on('click','li',function(){
	      			var val = $(this).text();
	      			select.val(val);
	      			title.text(val).removeClass('active');
	      			list.removeClass('vertical_animate_finished');
	      		});

	      	});
		},

		scrollSidebar : function(){

			var self = $(this),
				aHeight = self.outerHeight(),
				sticky = $('.sticky_menu').find('.header_bottom_part');

			var core = new Object();

			core.init = function(){

				core.checkScrollPage();
				$(window).on('scroll',core.checkScrollPage);
				// $(window).afterResize(core.getAsideInfo);

			}

			// core.getAsideInfo = function(){

			// 	pos = self.parent().offset().top;
			// 	aHeight = self.outerHeight();

			// }

			core.checkScrollPage = function(){
				var windowPos = $(window).scrollTop(),
					stickyHeight = sticky.outerHeight(),
					containerPos = self.parent().offset().top + self.parent().outerHeight() - aHeight - stickyHeight,
					pos = self.parent().offset().top - stickyHeight;
				if(windowPos >= containerPos) return false;
				if(windowPos >= pos){
					self.css({'position':'absolute',right:0});
					self.stop().animate({
						top : (windowPos-pos + 20) + 'px'
					});
				}
				else if(windowPos < pos) {
					self.stop().animate({
						top : 0 
					},function(){
						$(this).removeAttr('style');
					});
				}
			}

			core.init();

			return self;
			
		}
	});
	
	$.extend({

		stickyMenu : function(){

   if(!($('body').hasClass('sticky_menu'))) return false;
   
   var sticky = new Object(),
    nextSibling = $('[role="banner"]').next(),
    hSticky = $('.sticky_part').length ? $('.sticky_part') : $('.header_bottom_part'),
    hHeight = hSticky.height();
    offset = hSticky.offset().top,
    menuItems = hSticky.find('.main_menu').children('li').children('a'),
    pTop = menuItems.css('paddingTop'),
    pBottom = menuItems.css('paddingBottom'),
    body = $('body'),
    flag = false;

   $(window).resize( function() {
    hSticky.add(menuItems).removeAttr('style');
    hHeight = hSticky.height();
    offset = hSticky.offset().top;
    pTop = menuItems.css('paddingTop');
    pBottom = menuItems.css('paddingBottom');
   });

   sticky.init = function(){
    $(window).on('scroll',sticky.checkSticky);
    this.checkSticky();
   }
   sticky.checkSticky = function(){

    if(!($('body').hasClass('sticky_menu'))) return false;

    if($(window).width() < 768){
     sticky.stickyDeactivate();
     hSticky.removeClass('fixed');
     return false;
    }

    if($(window).scrollTop() > offset){
     sticky.stickyActivate();
    }
    else{
     sticky.stickyDeactivate();
    }
   }
   sticky.stickyActivate = function(){
    if(hSticky.hasClass('fixed')) return;

    hSticky.addClass('fixed');
    var needHeight;
    menuItems.stop().animate({
     'paddingTop' : '14px',
     'paddingBottom' : '14px'
    },function(){
     needHeight = hSticky.height();
    });
    nextSibling.css('marginTop',hSticky.height());
    var getNeedOffset = setInterval(function(){
     if(hSticky.height() == 0) return;
     nextSibling.css('marginTop',hSticky.height());
     if(+nextSibling.css('marginTop').slice(0,-2) == needHeight){
      clearInterval(getNeedOffset); 
     }
    },4);

    if(flag){
     clearInterval(getNeedOffset);
     nextSibling.animate({'marginTop': 0});
     flag = false;
    }
    
   }
   sticky.stickyDeactivate = function(){
    if(!hSticky.hasClass('fixed')) return;
    hSticky.removeClass('fixed');
    menuItems.stop().animate({
     'paddingTop' : pTop,
     'paddingBottom' : pBottom
    });
    nextSibling.css('marginTop', 0);
    flag = true;
   }
   sticky.init();
  },

		megaMenu : function(){
			var mMenu = $('.mega_menu_container');
			if(!(mMenu.length)) return false;

			posLeft = mMenu.closest('li').offset().left - mMenu.closest('.container').offset().left,
			width = mMenu.closest('.container').width();

			mMenu.css({
				'left': $(window).width() > 1200 ? -posLeft - 20 : -posLeft,
				'width': $(window).width() > 1200 ? width + 40 : width
			});
		},

		sideMenu : function(){

			if($('body').hasClass('sticky_menu')) return false;

			var sideMenu = new Object(),
				sMenu = $('.side_main_menu'),
				oButton = $('#open_side_menu'),
				cButton = $('#close_side_menu'),
				sideContainer = $('#side_menu'),
				offset = $('[role="banner"]').outerHeight() + 100;

			sideMenu.init = function(){
				sideMenu.checkSideMenu();
				sideMenu.clickEvents();
				$(window).on('scroll',sideMenu.checkSideMenu);
			}
			sideMenu.checkSideMenu = function(){

				if($('body').hasClass('sticky_menu')) return false;

				if($(window).scrollTop() > offset){
					sideMenu.Activate();
				}
				else{
					sideMenu.Deactivate();
				}
			}
			sideMenu.Activate = function(){
				if(oButton.hasClass('active')) return false;
				oButton.addClass('active').stop().animate({
					'right':'30px',
					'opacity':'0.2'
				});
			}
			sideMenu.Deactivate = function(){
				if(!(oButton.hasClass('active'))) return false;
				if(sideContainer.hasClass('active')) sideContainer.stop().animate({'right':-280});
				oButton.removeClass('active').stop().animate({
					'right':'-40px',
					'opacity':'0'
				});
			}
			sideMenu.clickEvents = function(){

				// menu

				sMenu.on('click','.has_sub_menu a',function(e){
					var self = $(this);
					if(self.next('ul').length || self.next('.mega_menu_container').length){
						self.parent().siblings('.has_sub_menu').removeClass('active').children('ul').slideUp();
						self.parent().toggleClass('active').end().next().slideToggle();
						self.parent().siblings().children('a').removeClass('prevented');
						if(!(self.hasClass('prevented'))){
							e.preventDefault();
							self.addClass('prevented');
						}else{
							self.removeClass('prevented');
						}
					}
				});

				// buttons

				oButton.on('click',function(){
					sideContainer.addClass('active').stop().animate({'right':0});
				}).add(cButton).on('mouseenter',function(){
					$(this).stop().animate({'opacity':1},400);
				}).on('mouseleave',function(){
					$(this).stop().animate({'opacity':'.2'},400);
				});

				cButton.on('click',function(){
					sideContainer.removeClass('active').stop().animate({'right':-280});
				});

			}
			sideMenu.init();
		},

		responsiveMenu : function(){

			var	nav = $('nav[role="navigation"]'),
				header = $('[role="banner"]');

			var rMenu = new Object();

			rMenu.init = function(){
				rMenu.checkWindowSize();
				$(window).on('resize',rMenu.checkWindowSize);
				$(document).click(function(event){
					if(!($(event.target).closest(nav).length)){
						nav.find('.touch_open_sub').removeClass('touch_open_sub').children('a').removeClass('prevented');
					}
				});
				
			}

			rMenu.checkWindowSize = function(){

				if($(window).width() < 768){
					rMenu.Activate();
				}
				else{
					rMenu.Deactivate();
				}

			}
			// add click events
			rMenu.Activate = function(){
				if($('html').hasClass('md_touch')) header.off('.touch');
				header.off('click').on('click.responsivemenu','#menu_button',rMenu.openClose);
				header.on('click.responsivemenu','.main_menu li a',rMenu.openCloseSubMenu);
				nav.find('.touch_open_sub').removeClass('touch_open_sub').children('a').removeClass('prevented');
			}
			// remove click events
			rMenu.Deactivate = function(){
				header.off('.responsivemenu');
				nav.removeAttr('style').find('li').removeClass('current_click')
					.end().find('ul').removeAttr('style').end().find('.prevented').removeClass('prevented');
				$('#menu_button').removeClass('color_grey_light_2').addClass('color_blue');
				if($('html').hasClass('md_touch')) header.off('click').on('click.touch','.main_menu li a',rMenu.touchOpenSubMenu);
			}

			rMenu.openClose = function(){

				$(this).toggleClass('color_grey_light_2 color_blue');
				nav.stop().slideToggle();

			}

			rMenu.openCloseSubMenu = function(e){

				var self = $(this);

				if(self.next('ul').length || self.next('.mega_menu_container').length){
					self.parent()
						.addClass('current_click')
						.siblings()
						.removeClass('current_click')
						.children(':not(a)')
						.slideUp();
					self.next().stop().slideToggle();
					self.parent().siblings().children('a').removeClass('prevented');

					if(!(self.hasClass('prevented'))){
						e.preventDefault();
						self.addClass('prevented');
					}else{
						self.removeClass('prevented');
					}
				}

			}

			rMenu.touchOpenSubMenu = function(event){
				var self = $(this);

				if(self.next('ul').length || self.next('.mega_menu_container').length){
					if(!(self.hasClass('prevented'))){
						event.preventDefault();
						self.addClass('prevented');
					}else{
						self.removeClass('prevented');
					}
					$(this).parent().toggleClass('touch_open_sub').siblings().removeClass('touch_open_sub').children('a').removeClass('prevented')
					.parent().find('.touch_open_sub').removeClass('touch_open_sub').children('a').removeClass('prevented');
				}
			}

			rMenu.init();
		},

		backToTop : function(offset){

			var button = $('#back_to_top'),
				backToTop = new Object();

			backToTop.init = function(){
				backToTop.positionButton();
				$(window).on('scroll',backToTop.checkOffset);
				button.on('click',backToTop.clickEvent);
			}

			backToTop.positionButton = function(){
				var offset = $('.container').offset().left + $('.container').outerWidth() + 10;
				button.css('left',offset);
			}

			backToTop.checkOffset = function(){

				if($(window).scrollTop() > offset){
					button.addClass('horizontal_animate_finished');
				}
				else{
					button.removeClass('horizontal_animate_finished');	
				}
			}
			backToTop.clickEvent = function(){
				$('html,body').animate({
					scrollTop : 0
				},1000,'easeInOutCirc');
			}

			backToTop.init();
		},

		showSearchForm : function(){
			var header = $('[role="banner"]');

			header.off('.search').on('click.search','.search_buttons button',function(){
				var searchform = header.find('[role="search"]'),
					self = $(this);

					console.log(searchform);

				self.removeClass('active').siblings().addClass('active');
				searchform.toggleClass('horizontal_animate_finished');
			});
		},

		correctImagesPosition : function(){

			var container = $('.popup_wrap');

			container.add(container.children('img')).removeAttr('style');
			container.each(function(){
				var self = $(this),
					img = self.children('img');
				if(img.width() < self.width()){
					self.css('width',img.width());		
				}
				else{
					self.css('width','auto');	
				}
			});

		},

		ellipsis : function(){
			var el = $('.ellipsis');
			el.each(function(){
				var self = $(this).removeAttr('style'),
					width = self.parent().outerWidth();
					self.css({'width':width,'white-space':'nowrap'});
			});
		},

		comingSoonFullScreen : function(){
			var body = $('body');
			if(!(body.hasClass('sticky_footer'))) return false;
			var dh = $(window).height(),
				bh = body.height(),
				cs = $('.coming_soon'),
				pt = +cs.css('paddingTop').slice(0,-2),
				pb = +cs.css('paddingBottom').slice(0,-2);

			if(dh > bh){
				body.css('padding-right','0');
				cs.css({
					'paddingTop' : pt + ((dh-bh)/2),
					'paddingBottom' : pb + ((dh-bh)/2)
				});
			}else{
				body.css('padding-right',10);
			}
		},
 
		processResponsive : function(){
			var container = $('.step:odd');
			if(!container.length) return false;

			if($(window).width() < 768 || $(window).width() > 992){
				$('.changed').each(function(){
					$(this).removeClass('changed').children().eq(1).insertBefore($(this).children().eq(0));
				});
				return false;
			}
			
			container.each(function(){
				$(this).addClass('changed').children().eq(1).insertBefore($(this).children().eq(0));
			});

		},

		shareButtonsResponsive : function(){
			var container = $('.addthis_toolbox').addClass('clearfix'),
				post = $('.blog_post'),
				sideContainer = post.children('.blog_side_container');

			if(!container.length) return false;

			if($(window).width() > 768){
				sideContainer.append(container);
				container.removeClass('changed');
				return false;
			}
			
			container.addClass('changed').insertAfter(post);

		},

		swapContainers : function(){
			var container = $('.mobile_friendly'),
				container1 = container.find('.col-lg-3'),
				container2 = container.find('.col-lg-7');

			if(!container.length) return false;

			if($(window).width() > 992){
				container.children('.row').prepend(container1);
				container1.removeClass('changed');
				return false;
			}
			
			container1.addClass('changed').insertAfter(container2);

		}

	});
	
})(jQuery);