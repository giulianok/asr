$(function () {
    'use strict';


    var Core = {
        
        init: function () {
            fullPage.run();
            Slider.init();
        }

    };





    var fullPage = {
        run: function () {
            $('#fullpage').fullpage({
                //Navigation
//        menu: false,
                anchors: ['firstSlide', 'secondSlide'],
//        navigation: false,
//        navigationPosition: 'right',
//        navigationTooltips: ['firstSlide', 'secondSlide'],
//        slidesNavigation: true,
//        slidesNavPosition: 'bottom',

                //Scrolling
                css3: true,
                scrollingSpeed: 700,
//        autoScrolling: true,
//        scrollBar: false,
                easing: 'easeInQuart',
                easingcss3: 'ease',
//        loopBottom: false,
//        loopTop: false,
//        loopHorizontal: true,
//        continuousVertical: false,
//        normalScrollElements: '#element1, .element2',
//        scrollOverflow: false,
//        touchSensitivity: 15,
//        normalScrollElementTouchThreshold: 5,

                //Accessibility
//        keyboardScrolling: true,
//        animateAnchor: true,
//        recordHistory: true,

                //Design
//        controlArrows: true,
                verticalCentered: true,
                resize: false,
//        sectionsColor : ['#ccc', '#fff'],
//        paddingTop: '3em',
//        paddingBottom: '10px',
//        fixedElements: '#header, .footer',
//        responsive: 0,

                //Custom selectors
//        sectionSelector: '.section',
//        slideSelector: '.slide',

                //events
                onLeave: function (index, nextIndex, direction) {
                    var header = $('body > header');
                    if (nextIndex === 1) {
                        header.removeClass('top');
                    } else {
                        header.addClass('top');
                    }
                },
//        afterLoad: function(anchorLink, index){},
//        afterRender: function(){},
//        afterResize: function(){},
//        afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex){},
//        onSlideLeave: function(anchorLink, index, slideIndex, direction){}
            });
        }
    };

    var Slider = {
        
        interv: null,
        slider: null,
        slide: null,
        photo: null,
        navigator: null,
        
        init: function () {
            var _this = this;
            
            _this.slider = $('.slider');
            
            _this.slider.find('li').each(function () {
                var $this = $(this);
                var image = $this.data().imageBackground;
                $this.css('background-image', "url('"+image+"')");
            });
            
            setTimeout(function () {
                //_this.Acomodar();
                _this.run();
            }, 100);

            $(window).resize(function () {
                //_this.Acomodar();
            });
        },
        
        Acomodar: function () {
            
            var header = $('header');
            var news = $('#news');
            var headerPadding = header.css('padding-left').replace('px', '') * 2;
            var headerWidth = header.width() + headerPadding;
            var newsPadding = news.css('padding-left').replace('px', '') * 2;
            var newsWidth = news.width() + newsPadding;

            _this.slider.width($(window).width() - headerWidth - newsWidth).css('left', headerWidth);
        },
        
        run: function () {
            var _this = this;

            _this.slide = _this.slider.children('.slide');
            _this.photo = _this.slide.children('li');
            _this.navigator = _this.slider.find('.nav');

            _this.photo.filter(':first-child').addClass('active');

            _this.photo.each(function (index) {
                var active = (index === 0) ? 'class="active"' : '';
                _this.navigator.append('<li data-id="' + (index + 1) + '" ' + active + '></li>');
            });

            _this.reset();

            _this.navigator.children('li').on('click', function (event) {
                event.preventDefault();
                var $this = $(this);
                var data = $this.data();
                var id = data.id;

                _this.nextSlide(id);
                _this.reset();
            });

        },
        
        nextSlide: function (id) {
            var _this = this;
            var active = _this.photo.filter('.active');
            var next = (id === undefined) ? active.next() : _this.photo.filter(':nth-child(' + id + ')');
            if (!next.length) {
                next = _this.photo.filter(':first-child');
            }
            active.removeClass('active');
            next.addClass('active');
            _this.navigator.children('li').removeClass('active').filter(':nth-child(' + (next.index() + 1) + ')').addClass('active');
        },
        
        reset: function () {
            var _this = this;
            if (_this.interv !== null) {
                clearInterval(_this.interv);
            }
            _this.interv = setInterval(function () {
                _this.nextSlide();
            }, 5000);
        }

    };

    


    Core.init();

});