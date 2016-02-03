/*====================================
=            SVG injector            =
====================================*/
SVGInjector(document.getElementById('inject-me'));

/*==================================
=            SPECS TABS            =
==================================*/
$('.spec-tabs__item').on('click', function() {
  var tabIndex = $(this).index();
  console.log(tabIndex);

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

/*==============================================
=            SVG ANIMATION ELEMENTS            =
==============================================*/
TweenLite.from('.interactive-menu', 1, {
	bottom: 0,
	delay: 0.3
});

$( window ).resize(function() {
  scrTopLine(70, 35);
});
function scrTopLine (i1, i2) {
	var a = $('.interactive-menu__point--1').offset(),
			b = $('.src-top-slide-1-popup__point-wrap').offset();
			ay = a.top,
			ax = a.left + 35,
			by = b.top,
			bx = b.left,
			line = $('.scr-top-line1__path'),
	line.attr('x1', ax);
	line.attr('y1', ay - i1);
	line.attr('x2', bx);
	line.attr('y2', by - i2);
}
scrTopLine(110, 35);



