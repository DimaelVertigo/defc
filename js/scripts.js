/*====================================
=            SVG injector            =
====================================*/
SVGInjector(document.getElementById('inject-me'));

/*=====================================
=            Tab-accordion            =
=====================================*/

/*----------  tabs  ----------*/
$('.spec-tabs__item').on('click', function() {
  var tabIndex = $(this).index();

  $('.spec-details').eq(tabIndex).siblings('.spec-details').hide();
  $('.spec-details').eq(tabIndex).fadeIn();

  $(this).addClass('spec-tabs__item--active');
  $(this).siblings('.selector').removeClass('spec-tabs__item--active');
});


/*===============================
=            GALLERY            =
===============================*/
new CBPGridGallery( document.getElementById( 'grid-gallery' ) );

/*=========================================
=            PLAY VIDEO BUTTON            =
=========================================*/

$('.about-column__play').on('click', function() {
	$("#about-video")[0].src += "&autoplay=1";
	$('.about-column__cover').fadeOut();
	$(this).fadeOut();
});

/*========================================
=            INTERACTIVE MENU            =
========================================*/
var tl = new TimelineLite(),
		tlFeatures = new TimelineLite(),
		tlAerodynamics = new TimelineLite();
		tlConstructions = new TimelineLite();

$('.ip__trigger').on('click', function() {
	var $target = $(this).closest('.ip'),
			ipIndex = $target.index();
			
	$target.find('.ip__icon--hidden').removeClass('ip__icon--hidden').addClass('ip__icon--active');
	$target.siblings('.ip').find('.ip__icon--active').removeClass('ip__icon--active').addClass('ip__icon--hidden');
	$('.src-top-slide').eq(ipIndex).fadeIn().siblings('.src-top-slide').fadeOut();

	if (ipIndex === 0) {
		scrTopLineAnimate();
		tl.restart();
	} else if (ipIndex === 2) {
		$('.src-top-slide-2').fadeIn();
	};
	
});

/*=============================
=            LINES            =
=============================*/
var topLine = $('.scr-top-line1__path'),
		consctructionsLine1 = $('.scr-consctructions-line1__path'),
		consctructionsLine2 = $('.scr-consctructions-line2__path'),
		consctructionsLine3 = $('.scr-consctructions-line3__path'),
		featuresLine1 = $('.scr-features-line1__path');
		featuresLine2 = $('.scr-features-line2__path');
		featuresLine3 = $('.scr-features-line3__path');
		featuresLine4 = $('.scr-features-line4__path');
		aerodynamicsLine1 = $('.scr-aerodynamics1__path');
		aerodynamicsLine2 = $('.scr-aerodynamics2__path');
		aerodynamicsLine3 = $('.scr-aerodynamics3__path');
		aerodynamicsLine4 = $('.scr-aerodynamics4__path');
		consctructionsMarker = true,
		featuresMarker = true,
		aeroMarker = true,
		mq = window.matchMedia('(min-width: 1200px)');

if(mq.matches) {

	lineLength(topLine);
	scrTopLine();
	scrTopLineAnimate();

  lineLength(consctructionsLine1);
  lineLength(consctructionsLine2);
  lineLength(consctructionsLine3);

  consctructionsLine(1, 30, 20, 0, 234);
  consctructionsLine(2, 8, 29, 43, 0);
  consctructionsLine(3, 21, 31, 629, 0);

  lineLength(featuresLine1);
  lineLength(featuresLine2);
  lineLength(featuresLine3);
  lineLength(featuresLine4);

  scrFeaturesLine(1, 101, -5, 14, 17);
  scrFeaturesLine(2, -2, -1, 21, 15);
  scrFeaturesLine(3, -3, 21, 17, 1);
  scrFeaturesLine(4, 101, 26, 13, -2);

  lineLength(aerodynamicsLine1);
  lineLength(aerodynamicsLine2);
  lineLength(aerodynamicsLine3);
  lineLength(aerodynamicsLine4);

  aerodynamicsLine(1, 1, 3, 17, -6, 3, 16);
  aerodynamicsLine(2, 1, 2, 13, 24, 1, -9);
  aerodynamicsLine(3, 2, 4, 13, -9, 7, 18);
  aerodynamicsLine(4, 2, 5, 22, 11, 0, 0);

  /*----------  resize  ----------*/
  $( window ).resize(function() {
    scrTopLine();

    consctructionsLine(1, 30, 20, 0, 234);
    consctructionsLine(2, 8, 29, 43, 0);
    consctructionsLine(3, 21, 31, 629, 64);

    scrFeaturesLine(1, 101, -5, 14, 17);
    scrFeaturesLine(2, -2, -1, 21, 15);
    scrFeaturesLine(3, -3, 21, 17, 1);
    scrFeaturesLine(4, 101, 26, 13, -2);

    aerodynamicsLine(1, 1, 3, 17, -6, 3, 16);
    aerodynamicsLine(2, 1, 2, 13, 24, 1, -9);
    aerodynamicsLine(3, 2, 4, 13, -9, 7, 18);
    aerodynamicsLine(4, 2, 5, 22, 11, 0, 0);
  });

  /*----------  on scroll  ----------*/
  $(window).on('scroll', function() {
  	var scrTop = $(window).scrollTop() + 500,
  			scrConsctructionsPosition = $('.scr-consctructions').offset().top;
  			scrFeaturesPosition = $('.scr-features').offset().top;
  			scrAerodynamicsPosition = $('.scr-aerodynamics').offset().top;

  	if (scrTop >= scrConsctructionsPosition && consctructionsMarker) {
  		scrConsctructionsAnimation();
  		consctructionsMarker = false;
  	};
  	if (scrTop >= scrFeaturesPosition && featuresMarker) {
  		scrFeaturesAnimation();
  		featuresMarker = false;
  	};
  	if (scrTop >= scrAerodynamicsPosition && aeroMarker) {
  		aerodynamicsAnimation();
  		aeroMarker = false;
  	};
  });
} else {
    // the width of browser is less then 700px
}

/*=========================================================
=            SCR TOP LINE AND POINTS ANIMATION            =
=========================================================*/
function lineLength(path) {
	var line = path.get(0);
	var len = dist(line.x1.baseVal.value, line.x2.baseVal.value,
	               line.y1.baseVal.value, line.y2.baseVal.value);
	path.attr('stroke-dashoffset', len);
	path.attr('stroke-dasharray', len);
};

function dist(x1, x2, y1, y2){
  return Math.sqrt( (x2-=x1)*x2 + (y2-=y1)*y2 );
};


/*----------  Line coordinates ----------*/
function scrTopLine () {
	var y1 = $('.interactive-menu').position().top + 6,
			x1 = $('.interactive-menu__point--1').offset().left + 33,
			y2 = $('.src-top-slide-1-popup').position().top + 32,
			x2 = $('.src-top-slide-1-popup__point-wrap').offset().left + 6,
			line = $('.scr-top-line1__path');
	line.attr('x1', x1);
	line.attr('y1', y1);
	line.attr('x2', x2);
	line.attr('y2', y2);
}

/*----------  Order of animation elements   ----------*/
function scrTopLineAnimate() {
 	tl
 	.to('.scr-top-line1__path', 1, {
 		attr:{'stroke-dashoffset': 0}, 
 		ease: Power0.easeIn
 	})
 	.to('.src-top-slide-1-popup', 0.5, {
 		autoAlpha: 1,
 		scale:1
 	}, '-=0.30');
};

/*===============================================
=            CONSTRUCTIONS ANIMATION            =
===============================================*/

function consctructionsLine(target, y1Skew, x1Skew, y2Skew, x2Skew) {
var y1 = $('.cons-sphere--start').position().top + y1Skew,
		x1 = $('.cons-sphere--start').offset().left + x1Skew,
		y2 = $('.cons-sphere--' + target).position().top + y2Skew,
		x2 = $('.cons-sphere--' + target).offset().left + x2Skew,
		line = $('.scr-consctructions-line' + target + '__path');
	line.attr('x1', x1);
	line.attr('y1', y1);
	line.attr('x2', x2);
	line.attr('y2', y2);
};

function scrConsctructionsAnimation() {
 	tlFeatures
 	.to('.scr-consctructions-line1__path', 1, {
 		attr:{'stroke-dashoffset': 0}, 
 		ease: Power0.easeIn
 	})
 	.to('.scr-consctructions-line2__path', 1, {
 		attr:{'stroke-dashoffset': 0}, 
 		ease: Power0.easeIn
 	})
 	.to('.scr-consctructions-line3__path', 1, {
 		attr:{'stroke-dashoffset': 0}, 
 		ease: Power0.easeIn
 	})
 };
/*==========================================
=            SCR FEATURES LINES            =
==========================================*/


function scrFeaturesLine(target, y1Skew, x1Skew, y2Skew, x2Skew) {
var y1 = $('.scr-features-points').position().top + y1Skew,
		x1 = $('.scr-features-points__point--' + target).offset().left + x1Skew,
		y2 = $('.scr-features-list').position().top + y2Skew,
		x2 = $('.scr-features-list__item--' + target).offset().left + x2Skew,
		line = $('.scr-features-line' + target + '__path');
	line.attr('x1', x1);
	line.attr('y1', y1);
	line.attr('x2', x2);
	line.attr('y2', y2);
};

function scrFeaturesAnimation() {
 	tlFeatures
 	.from('.scr-features-plane', 1, {
 		bottom: -100,
 		ease: Power0.easeIn
 	})

 	.to('.scr-features-line1__path', 2, {
 		attr:{'stroke-dashoffset': 0}, 
 		ease: Power0.easeIn
 	})
 	.to('.scr-features-list__info--1', 0.5, {
 		autoAlpha: 1
 	}, '-=1.5')

 	.to('.scr-features-line2__path', 2, {
 		attr:{'stroke-dashoffset': 0}, 
 		ease: Power0.easeIn
 	}, '-=1.1')
 	.to('.scr-features-list__info--2', 0.5, {
 		autoAlpha: 1
 	}, '-=1.8')

 	.to('.scr-features-line3__path', 2, {
 		attr:{'stroke-dashoffset': 0}, 
 		ease: Power0.easeIn
 	}, '-=1.5')
 	.to('.scr-features-list__info--3', 0.5, {
 		autoAlpha: 1
 	}, '-=1.8')

 	.to('.scr-features-line4__path', 2, {
 		attr:{'stroke-dashoffset': 0}, 
 		ease: Power0.easeIn
 	}, '-=1.5')
 	.to('.scr-features-list__info--4', 0.5, {
 		autoAlpha: 1
 	}, '-=1.5')
};

/*==============================================
=            AERODYNAMICS ANIMATION            =
==============================================*/
function aerodynamicsAnimation() {
 	tlAerodynamics
 	.to('.aerodynamics-point__info--1', 0.5, {
 		autoAlpha: 1,
 		ease: Power0.easeIn
 	})

 	.to('.scr-aerodynamics1__path', 1, {
 		attr:{'stroke-dashoffset': 0}, 
 		ease: Power0.easeIn
 	}, "step1")
 	.to('.aerodynamics-point__info--3', 0.5, {
 		autoAlpha: 1
 	}, '-=.3')
 	
 	.to('.scr-aerodynamics2__path', 2, {
 		attr:{'stroke-dashoffset': 0}, 
 		ease: Power0.easeIn
 	}, "step1")
 	.to('.aerodynamics-point__info--2', 0.5, {
 		autoAlpha: 1
 	}, '-=1.3')

 	.to('.scr-aerodynamics3__path', 2, {
 		attr:{'stroke-dashoffset': 0}, 
 		ease: Power0.easeIn
 	}, "step2-=1")
	.to('.aerodynamics-point__info--4', 0.5, {
	 		autoAlpha: 1
	 	}, '-=1.5')

 	.to('.scr-aerodynamics4__path', 2, {
 		attr:{'stroke-dashoffset': 0}, 
 		ease: Power0.easeIn
 	}, "step2-=1")
 	.to('.aerodynamics-point__info--5', 0.5, {
 	 		autoAlpha: 1
 	}, '-=1.5');
};

function aerodynamicsLine(target, a, b, y1Skew, x1Skew, y2Skew, x2Skew) {
var y1 = $('.aerodynamics-point--' + a).position().top + y1Skew,
		x1 = $('.aerodynamics-point--' + a).offset().left + x1Skew,
		y2 = $('.aerodynamics-point--' + b).position().top + y2Skew,
		x2 = $('.aerodynamics-point--' + b).offset().left + x2Skew,
		line = $('.scr-aerodynamics' + target + '__path');
	line.attr('x1', x1);
	line.attr('y1', y1);
	line.attr('x2', x2);
	line.attr('y2', y2);
};


/*====================================
=            FIXED SCROLL            =
====================================*/
var cbpFixedScrollLayout = (function() {
	// cache and initialize some values
	var config = {
		// the cbp-fbscroller´s sections
		$sections : $( '#cbp-fbscroller > section' ),
		// the navigation links
		$navlinks : $( '#cbp-fbscroller > nav:first > a' ),
		// index of current link / section
		currentLink : 0,
		// the body element
		$body : $( 'html, body' ),
		// the body animation speed
		animspeed : 650,
		// the body animation easing (jquery easing)
		animeasing : 'easeInOutExpo'
	};

	function init() {

		// click on a navigation link: the body is scrolled to the position of the respective section
		config.$navlinks.on( 'click', function() {
			scrollAnim( config.$sections.eq( $( this ).index() ).offset().top );
			$(this).find('.magnet-navigation__icon').addClass('magnet-navigation__icon-active');
			$(this).siblings().find('.magnet-navigation__icon').removeClass('magnet-navigation__icon-active')
			$(this).find('use').attr('xlink:href', '#scr-top--magnet-navigation--magnet-navigation-link--active');
			$(this).siblings().find('use').attr('xlink:href', '#scr-top--magnet-navigation--magnet-navigation-link');
			return false;
		} );

		// 2 waypoints defined:
		// First one when we scroll down: the current navigation link gets updated. 
		// A `new section´ is reached when it occupies more than 70% of the viewport
		// Second one when we scroll up: the current navigation link gets updated. 
		// A `new section´ is reached when it occupies more than 70% of the viewport
		config.$sections.waypoint( function( direction ) {
			if( direction === 'down' ) { changeNav( $( this ) ); }
		}, { offset: '30%' } ).waypoint( function( direction ) {
			if( direction === 'up' ) { changeNav( $( this ) ); }
		}, { offset: '-30%' } );

		// on window resize: the body is scrolled to the position of the current section
		$( window ).on( 'debouncedresize', function() {
			scrollAnim( config.$sections.eq( config.currentLink ).offset().top );
		} );
		
	}

	// update the current navigation link
	function changeNav( $section ) {
		config.$navlinks.eq( config.currentLink ).removeClass( 'cbp-fbcurrent' );
		config.currentLink = $section.index( 'section' );
		config.$navlinks.eq( config.currentLink ).addClass( 'cbp-fbcurrent' );
	}

	// function to scroll / animate the body
	function scrollAnim( top ) {
		config.$body.stop().animate( { scrollTop : top }, config.animspeed, config.animeasing );
	}

	return { init : init };

})();

$(function() {
	cbpFixedScrollLayout.init();
});




