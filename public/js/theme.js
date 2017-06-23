(function($){
	"use strict";

	$(function(){

		var Core = {

			initialized : false,

			initialize : function(){

				if(this.initialized) return;
				this.initialized = true;

				this.build();

			},

			build : function(){

				this.events.dropdownsOnTouch();
				this.sliders();
				this.plugins();
				this.events.newsLetter();
				this.events.contactForm();
				this.events.shoppingCart();
				this.events.selectButtons();
				this.events.ratingList();
				this.events.alertBoxes();
				this.events.categories();
				this.events.layoutChangeIsotope();
				this.events.quantity();
				this.events.firstLetter();
				this.events.ie9placeholder();

				if($('.item_statistic').length) this.events.statisticCounters();
				if($('.progress_indicator').length) this.events.progressBars();
				if($('.steps_nav').length) this.events.steps();
				if($('.sticky_footer').length) $.comingSoonFullScreen();

				this.animations();

				$.processResponsive();
				$.ellipsis();
				$.shareButtonsResponsive();

				if($('#scroll_sidebar').length) $('#scroll_sidebar').scrollSidebar();
				
			},

			sliders : function(){

				// collection of the slider elements

				var sliderCollection = ['.r_slider','#layerslider','#layerslider_video','.flexslider','.iosslider'],
					haveSlider = false;
				
				for(var i = 0; i < sliderCollection.length;i++){
					if($(sliderCollection[i]).length) haveSlider = true;
				}
				if(!haveSlider) return false;

				// revolution

				if($(sliderCollection[0]).length){
			    	var api = $(sliderCollection[0]).revolution({
				        delay:5000,
						startwidth:1170,
						startheight:500,
						hideThumbs:0,
						fullWidth:"on",
			     		hideTimerBar:"on",
			     		soloArrowRightHOffset:30,
			     		soloArrowLeftHOffset:30,
			     		shadow:0
			      	});

			      	api.bind('revolution.slide.onloaded',function(){
		      		$(sliderCollection[0]).parent().find('.tp-leftarrow,.tp-rightarrow')
		      			.addClass('color_light icon icon_wrap_size_3 circle tr_all');
		      		});
		      		$(sliderCollection[0]).parent().find('.tp-bullets').remove();
			     }

			     // layer slider

				if($(sliderCollection[1]).length){
					$(sliderCollection[1]).layerSlider({
						responsiveUnder : 1170,
	            		layersContainer : 1170,
	 					skinsPath : 'plugins/layerslider/skins/',
	 					showCircleTimer : false,
	 					hoverPrevNext : false,
	 					navPrevNext : true,
	 					navButtons : false,
	 					navStartStop : false,
	 					touchNav : true,
	 					globalBGImage : 'images/royal_slides_bg.jpg',
	 					cbInit : function(){
	 						$(sliderCollection[1]).find('.ls-nav-next,.ls-nav-prev')
	 						.addClass('color_light icon_wrap_size_3 circle tr_all d_md_none');
	 					}
			        });
				}

				// video slider (layer)

				if($(sliderCollection[2]).length){
					$(sliderCollection[2]).layerSlider({
						autoStart: false,
						firstSlide: 1,
						pauseOnHover:false,
						responsive:true,
						autoplay: false,
						responsiveUnder:1170,
						layersContainer : 1170,
						animateFirstSlide:false,
						sliderFadeInDuration: 0,
						twoWaySlideshow:false,
						skinsPath:'plugins/layerslider/skins/',
						skin:'borderlessdark',
						globalBGColor:'transparent',
						navPrevNext : true,
						navStartStop:false,
						navButtons:false,
						showCircleTimer:false,
						thumbnailNavigation:'disabled',
						lazyLoad:false,
						cbInit : function(){
	 						$(sliderCollection[2]).find('.ls-nav-next,.ls-nav-prev')
	 						.addClass('color_light icon_wrap_size_3 circle tr_all');
	 					}
					});
				}
		      	
				// flexslider
			
				if($(sliderCollection[3]).length){
					$(sliderCollection[3]).flexslider({
						controlNav:false,
						smoothHeight:true,
						animationSpeed:1000,
						slideshow:false,
						prevText:'',
						keyboard : false,
						nextText:'',
						start:function(){
							var slshow = $(sliderCollection[3]),
								thumbnails = $('.thumbnails_container').children('ul');
							slshow.find('.flex-direction-nav a').addClass('color_light icon icon_wrap_size_3 circle tr_all');
							var currIndex = slshow.data('flexslider').currentSlide;
							thumbnails.children('li').eq(currIndex).addClass('active');
							thumbnails.children('li').on('click',function(){
								var self = $(this),
									index = self.index();
								self.addClass('active').siblings().removeClass('active');
								slshow.data('flexslider').flexAnimate(index);
							});
							slshow.find('.flex-prev,.flex-next').on('click',function(){
								var ci = slshow.children('.slides').children('.flex-active-slide').index();
								thumbnails.children('li').eq(ci).addClass('active').siblings().removeClass('active');
							});
							Core.helpers.getHeightForVideo('.slider_video_wrap');
							$(window).on('resize',function(){
								Core.helpers.getHeightForVideo('.slider_video_wrap');
							});
						}
					});
				}

				// iosSlider slider

				if($(sliderCollection[4]).length){
					var iosOptions = {
						snapToChildren: true,
						desktopClickDrag: true,
						keyboardControls: true,
						infiniteSlider:true,
						autoSlideTransTimer: 700,
						autoSlide: true,
						autoSlideTimer: 4000,
						navNextSelector: $('.ios_nav_next'),
						navPrevSelector: $('.ios_nav_prev'),
						onSlideComplete: function(args) {
							if(!args.slideChanged) return false;
							$(args.sliderObject).find('[class^="item"]').removeClass('horizontal_animate_finished');
							$(args.currentSlideObject).find('[class^="item"]').each(function(i){
								var self = $(this);
								setTimeout(function(){
									self.addClass('horizontal_animate_finished');
								},i * 200);
							});
						},
						onSlideChange: function(args) {
							$('.selectors .item').removeClass('selected');
							$('.selectors .item:eq(' + (args.currentSlideNumber - 1) + ')').addClass('selected');
						},
						onSliderLoaded : function(args) {
							var slider = $('.iosslider');
							slider.find('[class*="ios_nav_"]').addClass('color_light icon icon_wrap_size_3 circle tr_all');
							$(args.sliderObject).find('[class^="item"]').removeClass('horizontal_animate_finished');
							$(args.currentSlideObject).find('[class^="item"]').each(function(i){
								var self = $(this);
								setTimeout(function(){
									self.addClass('horizontal_animate_finished');
								},i * 2);
							});
							this.onSlideChange(args);
						}

					}
				 	setTimeout(function(){$(sliderCollection[4]).iosSlider(iosOptions)},100);

				 }

			},

			plugins : function(){

				// plugins collection

				var pluginsCollection = ['.tabs','.accordion','#calendar','.jackbox[data-group]','.tweets','#countdown','#dribbble_feed','#price','.thumbnails_carousel','#img_zoom'],
					havePlugin = false;
				
				for(var i = 0; i < pluginsCollection.length;i++){
					if($(pluginsCollection[i]).length) havePlugin = true;
				}

				this.requiredPlugins();
				this.owlCarousel();
				this.simpleSlideshow();
				this.flickr();
				this.isotope();

				if(!havePlugin) return false;

				//tabs
				if($(pluginsCollection[0]).length) $(pluginsCollection[0]).easytabs({tabActiveClass: "active", updateHash : false});
				//accordion
				if($(pluginsCollection[1]).length) $(pluginsCollection[1]).accordion();
				// calendar
				if($(pluginsCollection[2]).length) $(pluginsCollection[2]).createCalendar();
				//jackbox
				if($(pluginsCollection[3]).length){
					$(pluginsCollection[3]).jackBox("init",{
						    showInfoByDefault: false,
						    preloadGraphics: true, 
						    fullscreenScalesContent: true,
						    autoPlayVideo: true,
						    flashVideoFirst: false,
						    defaultVideoWidth: 960,
						    defaultVideoHeight: 540,
						    baseName: "plugins/jackbox",
						    className: ".jackbox",
						    useThumbs: true,
						    thumbsStartHidden: false,
						    thumbnailWidth: 75,
						    thumbnailHeight: 50,
						    useThumbTooltips: true,
						    showPageScrollbar: false,
						    useKeyboardControls: true 
					});
				}

				// twitter feed

				if($(pluginsCollection[4]).length){

					var follow = $(pluginsCollection[4]).next('.tw_follow'),
						config = {
							username : 'fanfbmltemplate',
							modpath: 'plugins/twitter/',
							loading_text : '<img src="images/loader2.gif" alt="">',
							template : '<li class="fw_light relative m_bottom_25 w_break"><div class="icon_wrap_size_1 color_blue circle"><i class="icon-twitter fs_small"></i></div><p>{text}</p><p class="fs_medium color_grey"><i>{time}</i></p></li>'
						}

					$(pluginsCollection[4]).each(function(){

						var self = $(this);

						if(self.hasClass('single')){
							config.template = '<li class="m_bottom_25 relative w_break"><p class="fs_large">{text}</p><p class="color_grey"><i>{time}</i></p></li>';
						}
						self.tweet(config);
						if(self.hasClass('single')){
							var owl = self.data('owlCarousel');

							$('.twc_prev').on('click',function(){owl.trigger('owl.prev');});
							$('.twc_next').on('click',function(){owl.trigger('owl.next');});
						}

						var owlConfig = {
							autoPlay : true,
							autoHeight : true,
							pagination : false,
							singleItem : true,
							beforeInit : function(){
								self.find('.owl-item:even').remove();
								self.find('.tweet_odd').remove();
								self.find('.tweet_text').find('a').addClass('tr_all color_black_hover');
							}
						}

						self.children('.tweet_list').owlCarousel(owlConfig);

					});
					follow.attr('href','https://twitter.com/'+config.username);
				}

				// countdown

				if($(pluginsCollection[5]).length){
					var newYear = new Date(); 
					newYear = new Date(newYear.getFullYear() + 2, -7, 1); 
					$(pluginsCollection[5]).countdown({
						until: newYear,
						layout:'<div class="row"><div class="col-lg-3 col-md-3 col-sm-3 col-xs-6 m_xs_bottom_30">'+
						'<dl class="border_light r_corners_2"><dt class="m_bottom_23">{d<}{dn}<hr class="divider_type_5"></dt><dd class="tt_uppercase color_grey_light_3">{dl}</dd></dl></div> {d>}'+ 
	    					'<div class="col-lg-3 col-md-3 col-sm-3 col-xs-6 m_xs_bottom_30">'+
						'<dl class="border_light r_corners_2"><dt class="m_bottom_23">{hn}<hr class="divider_type_5"></dt><dd class="tt_uppercase color_grey_light_3">{hl}</dd></dl></div>'+
						' <div class="col-lg-3 col-md-3 col-sm-3 col-xs-6"><dl class="border_light r_corners_2"><dt class="m_bottom_23">{mn}<hr class="divider_type_5"></dt><dd class="tt_uppercase color_grey_light_3">{ml}</dd></dl></div>'+
						' <div class="col-lg-3 col-md-3 col-sm-3 col-xs-6"><dl class="border_light r_corners_2"><dt class="m_bottom_23">{sn}<hr class="divider_type_5"></dt><dd class="tt_uppercase color_grey_light_3">{sl}</dd></dl></div></div>'
					}); 
				}

				// dribbble

				if($(pluginsCollection[6]).length){

					var callback = function (playerShots) {
			            var html = '';

			            $.each(playerShots.shots, function (i, shot) {
			                html += '<li class="wrapper r_corners tr_all f_left">';
			                html += '<a class="jackbox" data-group="dribbble" href="' + shot.image_url + '">';
			                html += '<img style="width:75px;height:75px;" src="' + shot.image_url + '" ';
			                html += 'alt="' + shot.title + '"></a></li>';
			            });

			            $(pluginsCollection[6]).html(html).find('.jackbox[data-group]').jackBox("newItem", {
					        group: "dribbble"
					    });
			        };
				        
				    $.jribbble.getShotsByPlayerId('mikesmith187', callback, {page: 1, per_page: 6});
			    }

			    // range slider 
		
				if($(pluginsCollection[7]).length){
					$(pluginsCollection[7]).slider({ 
					 	orientation: "horizontal",
						range: true,
						values: [ 120, 850 ],
						min: 0,
						max: 1000,
						slide : function(event ,ui){
							$(this).next().find('.first_limit').val('$' + ui.values[0]);
							$(this).next().find('.last_limit').val('$' + ui.values[1]);
						}
					});
					$(".first_limit").val( "$" + $(pluginsCollection[7]).slider( "values", 0 ));
					$(".last_limit").val( "$" + $(pluginsCollection[7]).slider( "values", 1 ));

					$('#reset_filter_form').on('click',function(){
						$('.c_select').find('.select_title').text('All Categories');
						$(pluginsCollection[7]).slider( "option", "values", [ 120, 850 ] );
					});
				}

				// 	// thumbnails product

				if($(pluginsCollection[8]).length){
					var carousel = $(pluginsCollection[8]),
						thumbnails = carousel.find('#thumbnails'),
						hItems = $('.helper-list');

					
						carousel.flexslider({
							selector:"#thumbnails > li",
							controlNav:false,
							direction: "vertical",
							animation:"slide",
							slideshow:false,
							smoothHeight:true,
							animationSpeed:700,
							prevText:'',
							nextText:'',
							start: function(){
								var button = carousel.find('.flex-direction-nav').css('marginTop',carousel.hasClass('type_2') ? '20px' : '45px').addClass('clearfix d_inline_b').find('a');
								button.addClass('d_block icon_wrap_size_5 circle color_grey_light tr_all color_blue_hover');
								button.eq(0).html('<i class="icon-angle-up"></i>').parent().addClass('f_left m_right_5')
								button.eq(1).html('<i class="icon-angle-down"></i>').parent().addClass('f_left');
							}
						});

						thumbnails.find('li:not(.clone) a[data-zoom-image]').each(function(i){
							var self = $(this),
								href = self.data('zoom-image');
							self.attr('data-index',i);
							hItems.append('<a data-group="product" class="jackbox" href='+href+'></a>');
						});

						hItems.find('a[data-group="product"]').jackBox("init",{baseName: "plugins/jackbox"});
			
						$('.open_product').on('click',function(e){
							e.preventDefault();
							var index = +thumbnails.find('.active').data("index");
							hItems.find('a').eq(index).trigger("click"); 
						});
				}

				// elevate zoom

				if($(pluginsCollection[9]).length){
					$(pluginsCollection[9]).elevateZoom({
						zoomType: "inner",
						gallery:'thumbnails',
						galleryActiveClass: 'active',
						cursor: "crosshair",
						responsive:true,
						easing:true,
						zoomWindowFadeIn: 500,
						zoomWindowFadeOut: 500,
						lensFadeIn: 500,
						lensFadeOut: 500
					});
				}
			
		
			},

			animations : function(){
				// appear animatuion
				$("[data-appear-animation]").each(function() {

					var self = $(this);

					self.addClass("appear-animation");

					if($(window).width() > 767) {
						self.appear(function() {

							var delay = (self.attr("data-appear-animation-delay") ? self.attr("data-appear-animation-delay") : 1);

							if(delay > 1) self.css("animation-delay", delay + "ms");
							self.addClass(self.attr("data-appear-animation"));

							setTimeout(function() {
								self.addClass("appear-animation-visible");
							}, delay);

						}, {accX: 0, accY: -150});
					} else {
						self.addClass("appear-animation-visible");
					}
				});
			},

			owlCarousel: function(options) {

				var total = $("div.owl-carousel").length;

				$("div.owl-carousel").each(function() {

					var slider = $(this),
						buttonClass = slider.data('nav');

					var defaults = {
						 // Most important owl features
						items : 5,
						itemsCustom : false,
						itemsDesktop : [1199,4],
						itemsDesktopSmall : [980,3],
						itemsTablet: [768,2],
						itemsTabletSmall: false,
						itemsMobile : [479,1],
						singleItem : true,
						itemsScaleUp : false,

						//Basic Speeds
						slideSpeed : 500,
						paginationSpeed : 800,
						rewindSpeed : 1000,

						//Autoplay
						autoPlay : false,
						stopOnHover : false,

						// Navigation
						navigation : false,
						navigationText : ["<i class=\"icon icon-chevron-left\"></i>","<i class=\"icon icon-chevron-right\"></i>"],
						rewindNav : true,
						scrollPerPage : false,

						//Pagination
						pagination : false,
						paginationNumbers: false,

						// Responsive
						responsive: true,
						responsiveRefreshRate : 200,
						responsiveBaseWidth: window,

						// CSS Styles
						baseClass : "owl-carousel",
						theme : "owl-theme",

						//Lazy load
						lazyLoad : false,
						lazyFollow : true,
						lazyEffect : "fade",

						//Auto height
						autoHeight : false,

						//JSON
						jsonPath : false,
						jsonSuccess : false,

						//Mouse Events
						dragBeforeAnimFinish : true,
						mouseDrag : true,
						touchDrag : true,

						//Transitions
						transitionStyle : false,

						// Other
						addClassActive : false,

						//Callbacks
						beforeUpdate : false,
						afterUpdate : false,
						beforeInit: false,
						afterInit: false,
						beforeMove: false,
						afterMove: false,
						afterAction: false,
						startDragging : false,
						afterLazyLoad : false
					}	
					var config = $.extend({}, defaults, options, slider.data("plugin-options"));
					// Initialize Slider
					slider.owlCarousel(config).addClass("owl-carousel-init");

					// subscribe filter event
					if(slider.hasClass('wfilter_carousel')) Core.events.filterCarousel(slider,$('[data-carousel-filter]'));

					$('.'+buttonClass+'next').on('click',function(){
						slider.trigger('owl.next');
					});

					$('.'+buttonClass+'prev').on('click',function(){
						slider.trigger('owl.prev');
					});

					if(slider.data('plugin-options') != undefined && slider.data('plugin-options').pagination){
						if(slider.hasClass('brands')){
							slider.find('.owl-controls').addClass('d_inline_b');
							return;
						}
						slider.find('.owl-controls')
							.appendTo(slider.next().find('.clients_pags_container'));
					}
					if(slider.hasClass('banners_carousel')) slider.find('.owl-controls').addClass('wrapper d_inline_b m_top_10');


				});

			},

			simpleSlideshow : function(){

				var slideshow = $('.simple_slideshow');

					slideshow.each(function(){
						var self = $(this),
							options = self.data('simple-slideshow-options'),
							defaults,config;

						defaults = {
							namespace: "flex-",             //{NEW} String: Prefix string attached to the class of every element generated by the plugin
							selector: ".slides > li",       //{NEW} Selector: Must match a simple pattern. '{container} > {slide}' -- Ignore pattern at your own peril
							animation: "fade",              //String: Select your animation type, "fade" or "slide"
							easing: "swing",               //{NEW} String: Determines the easing method used in jQuery transitions. jQuery easing plugin is supported!
							direction: "horizontal",        //String: Select the sliding direction, "horizontal" or "vertical"
							reverse: false,                 //{NEW} Boolean: Reverse the animation direction
							animationLoop: true,             //Boolean: Should the animation loop? If false, directionNav will received "disable" classes at either end
							smoothHeight: true,            //{NEW} Boolean: Allow height of the slider to animate smoothly in horizontal mode  
							startAt: 0,                     //Integer: The slide that the slider should start on. Array notation (0 = first slide)
							slideshow: true,                //Boolean: Animate slider automatically
							slideshowSpeed: 7000,           //Integer: Set the speed of the slideshow cycling, in milliseconds
							animationSpeed: 700,            //Integer: Set the speed of animations, in milliseconds
							initDelay: 0,                   //{NEW} Integer: Set an initialization delay, in milliseconds
							randomize: false,               //Boolean: Randomize slide order
							 
							// Usability features
							pauseOnAction: true,            //Boolean: Pause the slideshow when interacting with control elements, highly recommended.
							pauseOnHover: false,            //Boolean: Pause the slideshow when hovering over slider, then resume when no longer hovering
							useCSS: true,                   //{NEW} Boolean: Slider will use CSS3 transitions if available
							touch: true,                    //{NEW} Boolean: Allow touch swipe navigation of the slider on touch-enabled devices
							video: false,                   //{NEW} Boolean: If using video in the slider, will prevent CSS3 3D Transforms to avoid graphical glitches
							 
							// Primary Controls
							controlNav: false,               //Boolean: Create navigation for paging control of each clide? Note: Leave true for manualControls usage
							directionNav: true,             //Boolean: Create navigation for previous/next navigation? (true/false)
							prevText: "",           //String: Set the text for the "previous" directionNav item
							nextText: "",               //String: Set the text for the "next" directionNav item
							 
							// Secondary Navigation
							keyboard: true,                 //Boolean: Allow slider navigating via keyboard left/right keys
							multipleKeyboard: false,        //{NEW} Boolean: Allow keyboard navigation to affect multiple sliders. Default behavior cuts out keyboard navigation with more than one slider present.
							mousewheel: false,              //{UPDATED} Boolean: Requires jquery.mousewheel.js (https://github.com/brandonaaron/jquery-mousewheel) - Allows slider navigating via mousewheel
							pausePlay: false,               //Boolean: Create pause/play dynamic element
							pauseText: 'Pause',             //String: Set the text for the "pause" pausePlay item
							playText: 'Play',               //String: Set the text for the "play" pausePlay item
							 
							// Special properties
							controlsContainer: "",          //{UPDATED} Selector: USE CLASS SELECTOR. Declare which container the navigation elements should be appended too. Default container is the FlexSlider element. Example use would be ".flexslider-container". Property is ignored if given element is not found.
							manualControls: "",             //Selector: Declare custom control navigation. Examples would be ".flex-control-nav li" or "#tabs-nav li img", etc. The number of elements in your controlNav should match the number of slides/tabs.
							sync: "",                       //{NEW} Selector: Mirror the actions performed on this slider with another slider. Use with care.
							asNavFor: "",                   //{NEW} Selector: Internal property exposed for turning the slider into a thumbnail navigation for another slider
							 
							// Carousel Options
							itemWidth: 0,                   //{NEW} Integer: Box-model width of individual carousel items, including horizontal borders and padding.
							itemMargin: 0,                  //{NEW} Integer: Margin between carousel items.
							minItems: 0,                    //{NEW} Integer: Minimum number of carousel items that should be visible. Items will resize fluidly when below this.
							maxItems: 0,                    //{NEW} Integer: Maxmimum number of carousel items that should be visible. Items will resize fluidly when above this limit.
							move: 0,                        //{NEW} Integer: Number of carousel items that should move on animation. If 0, slider will move all visible items.
							                                
							// Callback API
							start:function(){				//Callback: function(slider) - Fires when the slider loads the first slide
								self.find('.flex-direction-nav a').addClass('color_light icon icon_wrap_size_3 circle tr_all');
							},            
							before: function(){},           //Callback: function(slider) - Fires asynchronously with each slider animation
							after: function(){},            //Callback: function(slider) - Fires after each slider animation completes
							end: function(){},              //Callback: function(slider) - Fires when the slider reaches the last slide (asynchronous)
							added: function(){},            //{NEW} Callback: function(slider) - Fires after a slide is added
							removed: function(){}           //{NEW} Callback: function(slider) - Fires after a slide is removed
						}

						config = $.extend({}, defaults, options);
						self.flexslider(config);
					});

			},

			isotope : function(){
				var cthis = this;
				$('[data-isotope-options]').each(function(){

					var self = $(this),
						options = self.data('isotope-options');

					self.isotope(options);

					cthis.events.sortIsotope(self);
					cthis.events.loadMoreIsotope(self,options.itemSelector);

				});
			},

			flickr : function(){

				// flickr 
		
				var flickr = $('.flickr_list');

				flickr.each(function(){

					var self = $(this),
						options = self.data('flickr-options'),config,defaults,
						group = self.data('flickr-group');
					

					defaults = {
						flickrbase:'http://api.flickr.com/services/feeds/',
						feedapi:'photos_public.gne',
						limit: self.hasClass('nine_items') ? 9 : 6,
						qstrings:{lang:'en-us',format:'json',jsoncallback:'?'},
						cleanDescription:true,
						useTemplate:true,
						itemTemplate: '<li class="f_left r_corners wrapper tr_all"><a data-group="'+group+'" data-title="{{title}}" href="{{image}}" class="jackbox d_block"><img alt="" src="{{image_s}}"/></a></li>',
						itemCallback:function(){}
					}

					config = $.extend({}, defaults, options);

					self.jflickrfeed(config,function(data){
						self.find('.jackbox[data-group]').jackBox("newItem", {
					        group: group
					    });
					});

				});

			},

			helpers : {
				getHeightForVideo : function(item){
					$(item).height($(item).siblings().outerHeight());
				},
				isMobile : function(){
					return $(window).width() < 758;
				},
				getNewRandomElement : function (filterClasses,container,classN){

					var element = $('<figure class="'+classN+'"></figure>'),
						otherElem = container.find('.'+classN);

					element.addClass(filterClasses[Core.helpers.getRandom(0,filterClasses.length)])
							.html(otherElem.eq(Core.helpers.getRandom(0,otherElem.length)).html());


					return element;
				},

				getRandom : function(start,end){
					return Math.floor(Math.random() * (start - end + 1)) + end;
				}
			},

			requiredPlugins : function(){
				$('.custom_select').formSelect();
			},

			events : {
				filterCarousel : function(carousel, filterUL){

					var elements = [],
					item = carousel.find('.wfcarousel_item'),
					len = item.length,
					counter = 0;

					for(var i = 0; i < len; i++){
			 			elements.push(item.eq(i)[0].outerHTML);
			 		}

				 	filterUL.on('click','a',function(e){

				 		e.preventDefault();
				 		counter++;

				 		var	self = $(this),
			 			activeElem = self.data('filter-c-item');

				 		carousel.addClass('changed').find('.owl-wrapper').animate({
				 			opacity : 0
				 		},function(){

				 			var s = $(this);
				 			carousel.children().remove();

				 			if(activeElem == "*"){
				 				$.each(elements,function(i,v){
				 					carousel.append(v);
					 			});
				 			}else{
					 			$.each(elements,function(i,v){
					 				if(v.indexOf(activeElem) !== -1){
					 					carousel.append(v);
					 				}
					 			});
				 			}

				 			carousel.data('owlCarousel').destroy();
				 			carousel.owlCarousel({
				 				itemsCustom: [[992,4],[768,3],[450,2],[10,1]],
								pagination:false,
								slideSpeed:500,
						 		afterInit: function(){
						 			carousel.addClass('no_children_animate');
						 		}
				 			});
				 			carousel.find("[data-group]").attr("data-group","filter_group" + counter).jackBox("newItem");
				 		});

			 			self.closest('li').addClass('active').siblings().removeClass('active');

					});
				},
				newsLetter : function(){

					var subscribe = $('.subscribe_send_form');
					subscribe.append('<div class="message_container d_none m_top_10"></div>');

					subscribe.on('submit',function(e){
						var self = $(this),
							message = self.find('.message_container'),
							text;
						e.preventDefault();
						if(message.hasClass('opened')) return;
						
						if(self.find('input[type="email"]').val() == ''){
							text = "Please enter your e-mail!";
							message.html('<div class="alert_box error r_corners relative fs_medium"><p>'+text+'</p></div>')
								.addClass('opened')
								.slideDown()
								.delay(4000)
								.slideUp(function(){
									$(this).html("").removeClass('opened');
								});

						}else{
							self.find('span.error').hide();
							$.ajax({
								type: "POST",
								url: "php/newsletter.php",
								data: self.serialize(), 
								success: function(data){
									if(data == '1'){
										text = "Your email has been sent successfully!";
										message.html('<div class="alert_box success r_corners relative fs_medium"><p>'+text+'</p></div>')
											.addClass('opened')
											.slideDown()
											.delay(4000)
											.slideUp(function(){
												$(this).html("").removeClass('opened');
											})
											.closest('form').find('input[type="email"]').val("");
									}else{
										text = "Invalid email address!";
										message.html('<div class="alert_box error r_corners relative fs_medium"><p>'+text+'</p></div>')
											.addClass('opened')
											.slideDown()
											.delay(4000)
											.slideUp(function(){
												$(this).html("").removeClass('opened');
											});
									}
								}
							});
						}
					});

				},

				shoppingCart : function(){
					$('[role="banner"],aside').on('click','.added_items_list li > [class|="icon"]',function(){
						$(this).parent().animate({
							'opacity':'0'
						},function(){
							$(this).slideUp();
						});
					});
				},

				sortIsotope : function(container){
					$('.sort').on('click','[data-filter]',function(e){
						var self = $(this),
						selector = self.attr('data-filter');
					  	self.closest('li').addClass('active').siblings().removeClass('active');
					  	container.isotope({ filter: selector });
					  	e.preventDefault();
					});
				},

				loadMoreIsotope : function(container,item){
					var loadMore = $('#load_more'),
						// filter classes array
						sortItem = $('.sort').find('[data-filter]'),
						sortClasses = [];

					for(var i = 1; i < sortItem.length;i++){
						sortClasses.push(sortItem.eq(i).data('filter').slice(1));
					}

					loadMore.on('click',function(e){
						
						var elems = [];
					
						for(var i = 0,l = Core.helpers.getRandom(2,5);i < l;i++){
							elems.push(Core.helpers.getNewRandomElement(sortClasses,container,item.slice(1)));
						}

						container.append(elems).isotope('appended', container.find(item+':not([style])').addClass( container.hasClass('home') ? 'added type_2' : 'added'));
						setTimeout(function(){
							container.isotope('layout');
							Core.simpleSlideshow();
						},100);

						jQuery.jackBox.available(function() {
		     
						    jQuery(".added").find("[data-group]").jackBox("newItem");
						     
						});

						e.preventDefault();
					});
				},

				contactForm : function(){

					var cf = $('#contactform'),
						miniCaptcha = cf.find('input[name="cf_anti_spam"]');
					cf.append('<div class="message_container d_none m_top_10"></div>');
					var mcontainer = $('.message_container');

					cf.on("submit",function(event){
						event.preventDefault();
						if(mcontainer.hasClass('opened')) return;

						var self = $(this),text;

						var request = $.ajax({
							url:"php/mail.php",
							type : "post",
							data : self.hasClass('no_captcha') ? self.serialize() + '&captcha=false' : self.serialize() + '&captcha=true'
						});

						request.then(function(data){

							if(data == "1"){

								text = "Your message has been sent successfully!";

								cf.find('input:not([type="submit"]),textarea').val('');

								mcontainer.html('<div class="alert_box success r_corners relative fs_medium"><p>'+text+'</p></div>')
									.addClass('opened')
									.slideDown()
									.delay(4000)
									.slideUp(function(){
										$(this).html("").removeClass('opened');
									});
								
							}
							else{
								if(cf.find('input').val() == ""){
									text = "All required fields must be filled!";
								}
								else if(cf.find('textarea').val().length < 20){
									text = "Message must contain at least 20 characters!"
								}
								else if(miniCaptcha.length && +miniCaptcha.val() != 8){
									text = "Incorrect capcha!";
								}
								$('.message_container').html('<div class="alert_box error r_corners relative fs_medium"><p>'+text+'</p></div>')
									.addClass('opened')
									.slideDown()
									.delay(4000)
									.slideUp(function(){
										$(this).html("").removeClass('opened');
									});
							}
						},function(){
							$('.message_container').html('<div class="alert_box error r_corners relative fs_medium"><p>Connection to server failed!</p></div>')
									.addClass('opened')
									.slideDown()
									.delay(4000)
									.slideUp(function(){
										$(this).html("").removeClass('opened');
									});
						});
					});

				},

				selectButtons : function(){

					var sButton = $('[class*="select_button"]');

					sButton.on('click',function(e){
						e.preventDefault();

						var self = $(this),
							container = self.attr('href'),
							offset = $(container).offset().top;

						$('html,body').animate({
							scrollTop : offset - 58
						},1000,'easeInOutCirc');

					});

				},

				ratingList : function(){
					var fp = $('.rating_list');
					fp.on('click','li',function(){
						var self = $(this);
						self.siblings().removeClass('active');
						self.addClass('active').prevAll().addClass('active');
					});
				},

				statisticCounters : function(){
					var container = $('.item_statistic');

					function scrollPage(){
						container.each(function(){
				    		var self = $(this),
				    			counter = self.find('[data-value]'),
				    			value = +counter.data('value'),
				    			offset = self.offset().top;

				    		if(counter.hasClass('counting')) return;

			    			if($(window).scrollTop() > (offset - 700) && !(counter.hasClass('counting'))){
			    				counter.addClass('counting');
				    			var start = 0,
					    			timer = setInterval(function(){
					    				counter.text(++start + "+");
					    				if(start == value) clearInterval(timer);
					    			},10);
				    		}
				    	});
					};
					scrollPage();
					$(window).on('scroll',scrollPage);
				},

				progressBars : function(){

			    	var item = $('.progress_indicator'),
			    		container = item.closest('ul');
			    	if(!item.length) return;

			    	function scrollPage(){
			    		var offset = container.offset().top;
			    		if($(window).scrollTop() > (offset - 700) && !(container.hasClass('counted'))){
				    		item.each(function(i){
				    			container.addClass('counted');

				    			var self = $(this),
				    				value = +self.data('value'),
				    				indicator = self.children('div');

				    			setTimeout(function(){
				    				indicator.animate({
					    				'width': value + '%'
					    			},1000,'easeInCubic');
				    			},i * 100);

				    		});
			    		}
			    	}
			    	scrollPage();

			    	$(window).on('scroll',scrollPage);
				},

				steps : function(){
					var item = $('.steps_nav').children('li'),
						active = item.filter('.active').index(),
						info = $('.steps_info').children('div');

					info.hide().eq(active).show();

					item.on('mouseenter',function(){
						var self = $(this),
							index = self.index();

						self.addClass('active').siblings().removeClass('active');
						info.eq(index).siblings().hide()
						info.eq(index).stop().fadeIn();

					});
				},

				alertBoxes : function(){

					$('body').on('click','.close_alert_box',function(){
						$(this).parent().animate({
							'opacity':'0'
						},function(){
							$(this).slideUp();
						});
					});
	
				},

				categories : function(){
					var ct = $('.categories_list');
					if(!ct.length) return false;

					ct.on('mouseenter','li',function(){
						var self = $(this);
						self.children('ul').stop().slideDown(500).end().siblings().children('ul').stop().slideUp(500);
					});
				},

				layoutChangeIsotope : function(){

					var shopContainer = $('.shop_isotope_container');

					$('[data-shop-layout]').on('click',function(e){
						var self = $(this),
						item = shopContainer.children('.shop_isotope_item');
						self.parent().addClass('active').siblings().removeClass('active');
						if(self.data('shop-layout') == "grid"){ 
							item.removeClass('list_view')
								.find('.fp_item').removeClass('t_align_l')
								.children('.relative').removeClass('f_left m_right_20 f_xs_none');
							item.find('.fp_item').find('.fp_price').addClass('t_align_c animate_fctl half_column')
								.removeClass('f_left f_xs_none d_xs_block w_xs_full').next().removeClass('f_right t_sm_align_l f_xs_none d_xs_block w_xs_full').addClass('half_column animate_fctr t_sm_align_c')
								.parent().removeClass('wrapper m_bottom_15').addClass('m_bottom_10');
								item.each(function(){
									$(this).find('figcaption').children('.fp_buttons').children(":first").addClass('half_column animate_fctl')
									.removeClass('f_xs_left w_xs_auto').next().addClass('animate_fctr half_column').removeClass('f_xs_left w_xs_auto').children('a:not(.tooltip_container)').removeClass('m_xs_right_8');;
								});
							item.find('.reviews').removeClass('d_inline_b').addClass('d_none');
							item.find('.product_description').addClass('d_none').removeClass('d_block');
						}
						else{
							item.addClass('list_view').find('.fp_item')
								.addClass('t_align_l').children('.relative')
								.addClass('f_left m_right_20 f_xs_none');
							item.find('.fp_item').find('.fp_price').removeClass('t_align_c animate_fctl half_column')
								.addClass('f_left f_xs_none d_xs_block w_xs_full').next().addClass('f_right t_sm_align_l f_xs_none d_xs_block w_xs_full').removeClass('half_column animate_fctr t_sm_align_c')
								.parent().addClass('wrapper m_bottom_15').removeClass('m_bottom_10');
							item.find('figcaption').children('.fp_buttons').children('.half_column').addClass('f_xs_left w_xs_auto')
								.removeClass('half_column animate_fctr animate_fctl').children('a:not(.tooltip_container)').addClass('m_xs_right_8');
							item.find('.reviews').removeClass('d_none').addClass('d_inline_b');
							item.find('.product_description').removeClass('d_none').addClass('d_block');
						}
						shopContainer.isotope('layout');
						e.preventDefault();
					});

				},

				quantity : function(){

					var q = $('.quantity');
					q.on('click','button',function(){
						var self = $(this),
							data = self.data('count'),
							i = self.parent().children('input'),
							val = +i.val();
						if(data === "plus"){
							i.val(++val);
						}
						else{
							if(val == 1) return false;
							i.val(--val);	
						}
					});

				},

				firstLetter : function(){

					var dp = $('[class*="first_letter"]');
					dp.each(function(){
						var self = $(this),
						fl = self.text().charAt(0);
						self.text(self.text().substr(1)).prepend('<span class="fl color_pink circle t_align_c f_left d_block">'+fl+'</span>');
					});

				},

				ie9placeholder : function(){

					$('.ie9 [placeholder]').each(function(){

						var self = $(this),
							ph = self.attr('placeholder');

						self.val(ph);

						self.on('focus',function(){
							if($(this).val() == ph){
								$(this).val("");
							}
						}).on('blur',function(){
							if($(this).val() == ""){
								$(this).val(ph);
							}
						});

					});
				},
				dropdownsOnTouch : function(){

 				$('.md_touch .dropdown').on('click', function(event){
				  event.preventDefault();

				  $(this).toggleClass('active');

				 });

				}
			}
		}

		Core.initialize();
	});

		$(window).load(function(){
			if($('.simple_slideshow').length){
$(window).trigger('resize');
}
			$.stickyMenu();
			$.sideMenu();
			$.responsiveMenu();
			$.backToTop(1000);
			$.correctImagesPosition();
			$.swapContainers();
			$.showSearchForm();

			if($(window).width() > 767){
				$.megaMenu();
			}
			if($('[class*="isotope_container"]').length) $('[class*="isotope_container"]').isotope('layout');

			// window resize event
			$(window).on('resize',function() {
				if($(window).width() > 767){
					$.megaMenu();
					$.backToTop(1000);
				}
				
			});
			$(window).afterResize(function(){
				$.correctImagesPosition();
				$.ellipsis();
				$.processResponsive();
				$.shareButtonsResponsive();
				$.swapContainers();
				if($('.sticky_footer').length) $.comingSoonFullScreen();
				if($('[class*="isotope_container"]').length){
					setTimeout(function(){
						$('[class*="isotope_container"]').isotope('layout');
					},600);
				}
				$.showSearchForm();
			});
		});

})(jQuery);