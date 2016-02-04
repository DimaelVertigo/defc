/*====================================
=            SVG injector            =
====================================*/
SVGInjector(document.getElementById('inject-me'));

/*==================================
=            SPECS TABS            =
==================================*/
$('.spec-tabs__item').on('click', function() {
  var tabIndex = $(this).index();

  $('.spec-details').eq(tabIndex).fadeIn(2000).siblings('.spec-details').fadeOut();

});

/*===============================
=            GALLERY            =
===============================*/
new CBPGridGallery( document.getElementById( 'grid-gallery' ) );

// $("#grid-gallery").swiperight(function() {
//   $(".nav-prev").click();
// });
// $("#grid-gallery").swipeleft(function() {
//   $(".nav-next").click();
// });

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
var tl = new TimelineLite();

$('.ip__trigger').on('click', function() {
	var $target = $(this).closest('.ip'),
			ipIndex = $target.index();
			
	$target.find('.ip__icon--hidden').removeClass('ip__icon--hidden').addClass('ip__icon--active');
	$target.siblings('.ip').find('.ip__icon--active').removeClass('ip__icon--active').addClass('ip__icon--hidden');
	$('.src-top-slide').eq(ipIndex).fadeIn().siblings('.src-top-slide').fadeOut();

	if (ipIndex === 0) {
		lineDraw();
		tl.restart();
	} else if (ipIndex === 2) {
		$('.src-top-slide-2').fadeIn();
	};
	
});


/*=========================================================
=            SCR TOP LINE AND POINTS ANIMATION            =
=========================================================*/
var line = $(".scr-top-line1__path").get(0);
var len = dist(line.x1.baseVal.value, line.x2.baseVal.value,
               line.y1.baseVal.value, line.y2.baseVal.value);

$( window ).resize(function() {
  scrTopLine();
});
$('.scr-top-line1__path').attr('stroke-dashoffset', len);
$('.scr-top-line1__path').attr('stroke-dasharray', len);

/*----------  Calculate line length  ----------*/
function dist(x1, x2, y1, y2){
  return Math.sqrt( (x2-=x1)*x2 + (y2-=y1)*y2 );
}

/*----------  Line coordinates ----------*/
// function scrTopLine (i1, i2) {
// 	var a = $('.interactive-menu__point--1').offset(),
// 			b = $('.src-top-slide-1-popup__point-wrap').offset();
// 			ay = a.top,
// 			ax = a.left + 35,
// 			by = b.top,
// 			bx = b.left,
// 			line = $('.scr-top-line1__path');
// 	line.attr('x1', ax);
// 	line.attr('y1', ay - i1);
// 	line.attr('x2', bx);
// 	line.attr('y2', by - i2);
// }
function scrTopLine () {
	var a = $('.interactive-menu').position(),
			b = $('.src-top-slide-1-popup__point-wrap').position();
			ay = a.top,
			ax = a.left,
			by = b.top,
			bx = b.left,
			line = $('.scr-top-line1__path');
	line.attr('x1', ax);
	line.attr('y1', ay);
	line.attr('x2', bx);
	line.attr('y2', by);
}
scrTopLine();

/*----------  Order of animation elements   ----------*/
lineDraw();

function lineDraw() {
 	tl
 	// .from('.interactive-menu', 1, {
 	// 	bottom: 0,
 	// 	delay: 0.3
 	// })
 	.to('.scr-top-line1__path', 1, {
 		attr:{'stroke-dashoffset': 0}, 
 		ease: Power0.easeIn
 	})
 	.to('.src-top-slide-1-popup', 0.5, {
 		autoAlpha: 1,
 		scale:1
 	}, '-=0.30');
};

/*==========================================
=            SCR FEATURES LINES            =
==========================================*/
// var a1 = $('.scr-features-list__item--1').eq(0).position(),
// 		b1 = $('.scr-features-points__point--1').position();
// console.log(a1);
// scrFeaturesLine(a1, b1);
// function scrFeaturesLine (a, b) {
// 			y1 = a.top,
// 			x1 = a.left,
// 			y2 = b.top,
// 			x2 = b.left,
// 			line = $('.scr-features-line1__path');
// 	line.attr('x1', x1);
// 	line.attr('y1', y1);
// 	line.attr('x2', x2);
// 	line.attr('y2', y2);
// }




