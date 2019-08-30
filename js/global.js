/*-------------------------------------------------------------------------------------------------------------------------------*/
/*This is main JS file that contains custom style rules used in this template*/
/*-------------------------------------------------------------------------------------------------------------------------------*/
/* Template Name: "Title"*/
/* Version: 1.0 Initial Release*/
/* Build Date: 02-11-2016*/
/* Author: Title*/
/* Copyright: (C) 2016 */
/*-------------------------------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------------*/
/* TABLE OF CONTENTS: */
/*--------------------------------------------------------*/
/* 01 - VARIABLES */
/* 02 - page calculations */
/* 03 - function on document ready */
/* 04 - function on page load */
/* 05 - function on page resize */
/* 06 - function on page scroll */
/* 07 - swiper sliders */
/* 08 - buttons, clicks, hovers */

var _functions = {};

$(function() {

	"use strict";

	/*================*/
	/* 01 - VARIABLES */
	/*================*/
	var swipers = [], winW, winH, headerH, winScr, footerTop, _isresponsive, _ismobile = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i);

	/*========================*/
	/* 02 - page calculations */
	/*========================*/
	_functions.pageCalculations = function(){
		winW = $(window).width();
		winH = $(window).height();
        revealInit();
	};

	/*=================================*/
	/* 03 - function on document ready */
	/*=================================*/
	if(_ismobile) $('body').addClass('mobile');
	_functions.pageCalculations();
    $('.SelectBox').SumoSelect();

	/*============================*/
	/* 04 - function on page load */
	/*============================*/
	$(window).load(function(){
		_functions.initSwiper();
        
		$('body').addClass('loaded');
		$('#loader-wrapper').css('display', 'none');
        
	});

	/*==============================*/
	/* 05 - function on page resize */
	/*==============================*/
	_functions.resizeCall = function(){
		_functions.pageCalculations();
	};
	if(!_ismobile){
		$(window).resize(function(){
			_functions.resizeCall();
		});
	} else{
		window.addEventListener("orientationchange", function() {
			_functions.resizeCall();
		}, false);
	}

	/*==============================*/
	/* 06 - function on page scroll */
	/*==============================*/
	$(window).scroll(function(){
		_functions.scrollCall();
	});

	_functions.scrollCall = function(){
		winScr = $(window).scrollTop();
        $('body.loaded .reveal-animate').each(function(){
			if($(this).data('top')<(winScr+winH)) $(this).addClass('visible');
		});
        
        if (!_ismobile) {
            if( winScr > 260 ) {
                $('.scrollMenuWrapper').addClass('activeScrollMenu')
            } else {
                $('.scrollMenuWrapper').removeClass('activeScrollMenu')
            }
        }
		
		if(winScr > 150) {
			$('.gift').addClass('giftScrolled');
		} else {
			$('.gift').removeClass('giftScrolled');
		}
	};

	/*=====================*/
	/* 07 - swiper sliders */
	/*=====================*/
	var initIterator = 0;
	_functions.initSwiper = function(){
		$('.swiper-container').not('.initialized').each(function(){								  
			var $t = $(this);								  

			var index = 'swiper-unique-id-'+initIterator;

			$t.addClass('swiper-'+index+' initialized').attr('id', index);
			$t.find('>.swiper-pagination').addClass('swiper-pagination-'+index);
			$t.parent().find('>.swiper-button-prev').addClass('swiper-button-prev-'+index);
			$t.parent().find('>.swiper-button-next').addClass('swiper-button-next-'+index);

			var slidesPerViewVar = ($t.data('slides-per-view'))?$t.data('slides-per-view'):1;
			if(slidesPerViewVar!='auto') slidesPerViewVar = parseInt(slidesPerViewVar, 10);

			swipers['swiper-'+index] = new Swiper('.swiper-'+index,{
				pagination: '.swiper-pagination-'+index,
		        paginationClickable: true,
		        nextButton: '.swiper-button-next-'+index,
		        prevButton: '.swiper-button-prev-'+index,
		        slidesPerView: slidesPerViewVar,
		        autoHeight:($t.is('[data-auto-height]'))?parseInt($t.data('auto-height'), 10):0,
		        loop: ($t.is('[data-loop]'))?parseInt($t.data('loop'), 10):0,
				autoplay: ($t.is('[data-autoplay]'))?parseInt($t.data('autoplay'), 10):0,
		        breakpoints: ($t.is('[data-breakpoints]'))? { 767: { slidesPerView: parseInt($t.attr('data-xs-slides'), 10) }, 991: { slidesPerView: parseInt($t.attr('data-sm-slides'), 10) }, 1199: { slidesPerView: parseInt($t.attr('data-md-slides'), 10) }, 1370: { slidesPerView: parseInt($t.attr('data-lt-slides'), 10) } } : {},
		        initialSlide: ($t.is('[data-ini]'))?parseInt($t.data('ini'), 10):0,
		        speed: ($t.is('[data-speed]'))?parseInt($t.data('speed'), 10):500,
		        keyboardControl: true,
		        mousewheelControl: ($t.is('[data-mousewheel]'))?parseInt($t.data('mousewheel'), 10):0,
		        mousewheelReleaseOnEdges: true,
		        direction: ($t.is('[data-direction]'))?$t.data('direction'):'horizontal',
                spaceBetween: ($t.is('[data-space]'))?parseInt($t.data('space'), 10):0,
                paginationType: ($t.is('[data-paginationtype]'))?($t.data('paginationtype')): 'bullets',
                parallax: ($t.is('[data-parallax]'))?parseInt($t.data('parallax'), 10):0,
                onTransitionEnd: function(swiper){
                   $t.find('.swiper-pager-current').text(swiper.activeIndex+1);
                  },
                paginationFractionRender: function (swiper, currentClassName, totalClassName) {
                  return '<span class="' + currentClassName + '"></span>' +
                         ' ' +
                         '<span class="' + totalClassName + '"></span>';
              }
			});
			swipers['swiper-'+index].update();
			initIterator++;
		});
		$('.swiper-container.swiper-control-top').each(function(){
			swipers['swiper-'+$(this).attr('id')].params.control = swipers['swiper-'+$(this).parent().find('.swiper-control-bottom').attr('id')];
		});
		$('.swiper-container.swiper-control-bottom').each(function(){
			swipers['swiper-'+$(this).attr('id')].params.control = swipers['swiper-'+$(this).parent().find('.swiper-control-top').attr('id')];
		});
	};

	/*==============================*/
	/* 08 - buttons, clicks, hovers */
	/*==============================*/

	//open and close popup
    //Open
    $(document).on('click', '.open-popup', function () {
        openPopup($(this).data('rel'));
        return false;
    });
    $(document).on('click', '.popup-wrapper .button-close, .popup-wrapper .layer-close', function () {
        closePopup();
		return false;
    });
    
    function openPopup(foo){
        $('.popup-content').removeClass('active');
		$('.popup-wrapper, .popup-content[data-rel="'+foo+'"]').addClass('active');
		$('html').addClass('overflow-hidden');
    }
    
    $('.openVideo').on('click', function(){
        openPopup($(this).data('rel'));
        $('.popup-content[data-rel="'+$(this).data('rel')+'"]').find('.embed-responsive').html('<iframe class="embed-responsive-item" src="'+$(this).data('src')+'?autoplay=1&amp;controls=1&amp;loop=1&amp;modestbranding=1&amp;rel=0&amp;showinfo=0&amp;autohide=0&amp;color=white&amp;iv_load_policy=3&amp;wmode=transparent"></iframe>');
    });
    
    function closePopup(){
        $('.popup-wrapper, .popup-content').removeClass('active').find('.embed-responsive').html('');
        $('.videoCaption').html('');
		$('html').removeClass('overflow-hidden');
    }
    
    //switch language
    $('.languageToggle').on('click', function() {
        $('.langDropDown').slideToggle(250); 
    });
    
    //hamburger menu
    $('.menuIcon').on('click', function() {
        $(this).toggleClass('menuIconActive');
       $('.mobileMenuWrapper').toggleClass('menuActive');
    });
    
    //responsive drop down menu
    $('.mobileDropDowm').on('click', function() {
       $('.dropDownWrapper').slideToggle(250);
    });
    $('.respSelectDish .button ').on('click', function() {
       $('.dishWrapper').slideToggle(250);
    });
    
    
    //product counter
	$('.more').on('click', function() {
		var productCounter = $(this).prev().val();
		++productCounter;
		$(this).prev().val(productCounter);
	});
	
	$('.less').on('click', function() {
		if ( $(this).next().val() <= 1 ) {
			return false
		} else {
			var productCounter = $(this).next().val();
			--productCounter;
			$(this).next().val(productCounter);
		}
	});
    
    
    //init reveal animate function
	function revealInit(){
		$('.reveal-animate').each(function(){
			$(this).addClass('no-transition');
			$(this).data('top', $(this).offset().top + $(this).outerHeight());
			$(this).removeClass('no-transition');
		});
	}
    revealInit();
    
    $('.openVideo').on('click', function(){
        openPopup($(this).data('rel'));
        $('.popup-content[data-rel="'+$(this).data('rel')+'"]').find('.embed-responsive').html('<iframe class="embed-responsive-item" src="'+$(this).data('src')+'?autoplay=1&amp;controls=1&amp;loop=1&amp;modestbranding=1&amp;rel=0&amp;showinfo=0&amp;autohide=0&amp;color=white&amp;iv_load_policy=3&amp;wmode=transparent"></iframe>');
    });
    
    //SmoothScroll
    if(!_ismobile) {
        SmoothScroll({ stepSize: 100 })
    };
	
	//Top banner Slides
	var TopBannerSlides = $('.top-baner').find('.swiper-wrapper .swiper-slide').length
    $('.swiper-pager-total').html(TopBannerSlides);

    if (_ismobile) {
		$('a').on('click touchend', function(e) {
		    var ThisEl = $(this);
		    var link = ThisEl.attr('href');
		    window.location = link;
		});	
    }
});