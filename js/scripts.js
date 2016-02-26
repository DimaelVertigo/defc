$(document).ready(function() {

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
		mq = window.matchMedia('(min-width: 767px)');
		
	/*==========================================
	=            HEADER NAV ANCHORS            =
	==========================================*/
	$("a.header-navigation__link").click(function(e) { 
		var elementClick = $(this).attr("href");
		var destination = $(elementClick).offset().top;
		$('html, body').animate({
			scrollTop: destination 
		}, 1100);
		e.preventDefault();
	});

	/*====================================
	=            SVG injector            =
	====================================*/
	SVGInjector(document.getElementById('inject-me'));

	/*=====================================
	=            Tab-accordion            =
	=====================================*/

	/*----------  tabs  ----------*/
	if (mq.matches) {

	} else {

		$('.spec-tabs__item').each(function(index, el) {
			$(el).append($('.spec-details').eq(index));
		});
	}

	$('.spec-tabs__item').on('click', function() {
		var tabIndex = $(this).index();

		$('.spec-details').eq(tabIndex).siblings('.spec-details').hide();
		$('.spec-details').eq(tabIndex).fadeIn();

		if (mq.matches) {
			$(this).addClass('spec-tabs__item--active').siblings('.spec-tabs__item').removeClass('spec-tabs__item--active');
		} else {
			/*----------  accordeon  ----------*/

			if ($(this).hasClass('spec-tabs__item--active')) {
				$(this).toggleClass('spec-tabs__item--active');
				$(this).find('.spec-details').hide();
				$(this).siblings('.spec-tabs__item').find('.spec-details').hide();
			} else {
				// $(this).append($('.spec-details').eq(tabIndex));
				$(this).toggleClass('spec-tabs__item--active');
				
			}
		};

	});

	/*==============================
	=            BURGER            =
	==============================*/
	$('.burger').on('click', function() {
		$(this).toggleClass('active');
		$('.header-navigation-mobile__list').toggleClass('active');
	});


	/*===============================
	=            GALLERY            =
	===============================*/
	if (mq.matches) {
		new CBPGridGallery(document.getElementById('grid-gallery'));
		
	} else {
		$('.owl-carousel-gallery').owlCarousel({
		    loop:true,
		    margin:0,
		    nav:false,
		    dots:true,
		    responsive:{
		        320:{
		            items:1
		        },
		        600:{
		            items:1
		        },
		        1000:{
		            items:1
		        }
		    }
		})
	};

	
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
			tlAerodynamics = new TimelineLite(),
			tlConstructions = new TimelineLite(),
			tlBurger = new TimelineLite();

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

	/*=====================================
	=            SPHERE CENTER            =
	=====================================*/
	// $('.cons-sphere--start').
	
	

	if (mq.matches) {

		/*=======================================
		=            SCROLL SECTIONS            =
		=======================================*/
		$('#fullpage').fullpage({
			anchors: ['top', 'consctructions', 'features', 'aerodynamics', 'transporting', 'specs', 'gallery', 'aboutus'],
			scrollOverflow: true,

			'afterLoad': function(anchorLink, index){
				lineLength(topLine);
				scrTopLine();
				scrTopLineAnimate();
			},

			'onLeave': function(index, nextIndex, direction) {
				if (index == 1 && direction == 'down') {

					lineLength(consctructionsLine1);
					lineLength(consctructionsLine2);
					lineLength(consctructionsLine3);

					consctructionsLine(1, 0, 0, 0, 0);
					consctructionsLine(2, 0, 0, 0, 0);
					consctructionsLine(3, 0, 0, 0, 0);

					scrConsctructionsAnimation();

				} else if (index == 2 && direction == 'down') {

					lineLength(featuresLine1);
					lineLength(featuresLine2);
					lineLength(featuresLine3);
					lineLength(featuresLine4);

					scrFeaturesLine(1, 101, -5, 14, 17);
					scrFeaturesLine(2, -2, -1, 21, 15);
					scrFeaturesLine(3, -3, 21, 17, 1);
					scrFeaturesLine(4, 101, 26, 13, -2);

					scrFeaturesAnimation();

				} else if (index == 3 && direction == 'down') {

					lineLength(aerodynamicsLine1);
					lineLength(aerodynamicsLine2);
					lineLength(aerodynamicsLine3);
					lineLength(aerodynamicsLine4);

					aerodynamicsLine(1, 1, 3, 17, -6, 3, 16);
					aerodynamicsLine(2, 1, 2, 13, 24, 1, -9);
					aerodynamicsLine(3, 2, 4, 13, -9, 7, 18);
					aerodynamicsLine(4, 2, 5, 22, 11, 0, 0);

					aerodynamicsAnimation();
					aeroBurger();
				}
			}
		});

		/*----------  resize  ----------*/
		$(window).resize(function() {
			scrTopLine();

			consctructionsLine(1, 30, 20, 0, 234);
			consctructionsLine(2, 8, 29, 43, 0);
			consctructionsLine(3, 21, 31, 710, 40);

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
			var scrTop = $(window).scrollTop() + 200,
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
				aeroBurger();
			};
		});
		  
	} else {
		scrFeaturesAnimation();
		
		lineLength(featuresLine1);
		lineLength(featuresLine2);
		lineLength(featuresLine3);
		lineLength(featuresLine4);

		scrFeaturesMobileLine(1, 0, 9, 8, 2);
		scrFeaturesMobileLine(2, 4, 12, 4, -1);
		scrFeaturesMobileLine(3, 5, 12, 2, -1);
		scrFeaturesMobileLine(4, 10, 11, 0, -1);

		aerodynamicsAnimation();

		lineLength(aerodynamicsLine1);
		lineLength(aerodynamicsLine2);
		lineLength(aerodynamicsLine3);
		lineLength(aerodynamicsLine4);

		aerodynamicsLine(1, 1, 3, 17, 0, 3, 9);
		aerodynamicsLine(2, 1, 2, 17, 16, -1, 0);
		aerodynamicsLine(3, 2, 4, 52, -44, 6, 15);
		aerodynamicsLine(4, 2, 5, 52, 0, -1, 5);
	};

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

	function dist(x1, x2, y1, y2) {
		return Math.sqrt((x2 -= x1) * x2 + (y2 -= y1) * y2);
	};


	/*----------  Line coordinates ----------*/
	function scrTopLine() {
		var y1 = $('.interactive-menu').position().top + 36,
			x1 = $('.interactive-menu__point--1').offset().left - 4,
			y2 = $('.src-top-slide-1-popup').position().top + 4,
			x2 = $('.src-top-slide-1-popup__point-wrap').offset().left + 47,
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
				attr: {
					'stroke-dashoffset': 0
				},
				ease: Power0.easeIn
			})
			.to('.src-top-slide-1-popup', 0.5, {
				autoAlpha: 1,
				scale: 1
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
		// console.log('x1=' + x1,'y1=' + y1,'x2=' + x2,'y2=' + y2);
	};

	function scrConsctructionsAnimation() {
		tlFeatures
			.to('.scr-consctructions-line1__path', 1, {
				attr: {
					'stroke-dashoffset': 0
				},
				ease: Power0.easeIn
			})
			.to('.scr-consctructions-line2__path', 1, {
				attr: {
					'stroke-dashoffset': 0
				},
				ease: Power0.easeIn
			})
			.to('.scr-consctructions-line3__path', 1, {
				attr: {
					'stroke-dashoffset': 0
				},
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
	function scrFeaturesMobileLine(target, y1Skew, x1Skew, y2Skew, x2Skew) {
		var y1 = $('.scr-features-points__point--' + target).position().top + y1Skew,
			x1 = $('.scr-features-points__point--' + target).offset().left + x1Skew,
			y2 = $('.scr-features-list__item--' + target).position().top + y2Skew,
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
				attr: {
					'stroke-dashoffset': 0
				},
				ease: Power0.easeIn
			})
			.to('.scr-features-list__info--1', 0.5, {
				autoAlpha: 1
			}, '-=1.5')

		.to('.scr-features-line2__path', 2, {
				attr: {
					'stroke-dashoffset': 0
				},
				ease: Power0.easeIn
			}, '-=1.1')
			.to('.scr-features-list__info--2', 0.5, {
				autoAlpha: 1
			}, '-=1.8')

		.to('.scr-features-line3__path', 2, {
				attr: {
					'stroke-dashoffset': 0
				},
				ease: Power0.easeIn
			}, '-=1.5')
			.to('.scr-features-list__info--3', 0.5, {
				autoAlpha: 1
			}, '-=1.8')

		.to('.scr-features-line4__path', 2, {
				attr: {
					'stroke-dashoffset': 0
				},
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
				attr: {
					'stroke-dashoffset': 0
				},
				ease: Power0.easeIn
			}, "step1")
			.to('.aerodynamics-point__info--3', 0.5, {
				autoAlpha: 1
			}, '-=.3')

		.to('.scr-aerodynamics2__path', 2, {
				attr: {
					'stroke-dashoffset': 0
				},
				ease: Power0.easeIn
			}, "step1")
			.to('.aerodynamics-point__info--2', 0.5, {
				autoAlpha: 1
			}, '-=1.3')

		.to('.scr-aerodynamics3__path', 2, {
				attr: {
					'stroke-dashoffset': 0
				},
				ease: Power0.easeIn
			}, "step2-=1")
			.to('.aerodynamics-point__info--4', 0.5, {
				autoAlpha: 1
			}, '-=1.5')

		.to('.scr-aerodynamics4__path', 2, {
				attr: {
					'stroke-dashoffset': 0
				},
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


	

	
	/*=======================================
	=            ABOUT ACCORDION            =
	=======================================*/
	$('.about-column__arrow').on('click', function() {
		$(this).siblings('.about-column__text--hidden').toggleClass('active');
	});
	
	

	/*==========================================
	=            CONTACTS ACCORDION            =
	==========================================*/
	$('.contacts__head').on('click', function() {
		$('.contacts__list').toggleClass('active');
		$('.contacts__arrow').toggleClass('active');
	});


	/*===========================
	=            MAP            =
	===========================*/
	$('.scr-map iframe').css("pointer-events", "none");

	$('.scr-map').click(function() {
		$('.scr-map iframe').css("pointer-events", "auto");
	});
	
	$(".scr-map").mouseleave(function() {
		$('.scr-map iframe').css("pointer-events", "none");
	});


	/*===================================
	=            AERO BURGER            =
	===================================*/
	function aeroBurger() {
		 tlBurger
		 	.to('.aerodynamics-plane', 2, {
		 		bottom: 80,
		 		ease: Power0.easeIn
		 	}, "up")
		 	.to('.aerodynamics-shadow', 2, {
		 		autoAlpha: 0.3
		 	}, 'up')
		 	.to('.aerodynamics-waves', 2, {
		 		bottom: 155
		 	}, 'up')
		 	.to('.aerodynamics-waves', 2, {
		 		bottom: 85
		 	}, 'down')
		 	.to('.aerodynamics-plane', 2, {
		 		bottom: 63
		 	}, 'down')
		 	.to('.aerodynamics-shadow', 2, {
		 		autoAlpha: 1
		 	}, 'down')
	};
	



});

