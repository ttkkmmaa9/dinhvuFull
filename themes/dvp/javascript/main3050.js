/**
  * isMobile
  * responsiveMenu
  * headerFixed
  * onepage_nav
  * ajaxContactForm
  * alertBox
  * generalSlider
  * flatTestimonial
  * detectViewport
  * flatCounter
  * googleMap
  * swClick
  * popupGallery
  * flatAccordion
  * portfolioIsotope
  * flatTabs
  * goTop
  * progressBar
  * flatFilterPrice
  * retinaLogos
  * flatSearch
  * parallax
  * removePreloader
*/

;(function($) {

   'use strict'

    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

	var responsiveMenu = function() {
        var menuType = 'desktop';

        $(window).on('load resize', function() {
            var currMenuType = 'desktop';
            if ( matchMedia( 'only screen and (max-width: 991px)' ).matches ) {
                currMenuType = 'mobile';
            }

            if ( currMenuType !== menuType ) {
                menuType = currMenuType;

                if ( currMenuType === 'mobile' ) {
                    var $mobileMenu = $('#mainnav').attr('id', 'mainnav-mobi').hide();
                    var hasChildMenu = $('#mainnav-mobi').find('li:has(ul)');

                    $('.mega-menu .mega-menu-sub').hide();
                    $('.has-mega-menu .submenu.mega-menu').hide();

                    $('#header').after($mobileMenu);
                    hasChildMenu.children('ul').hide();
                    hasChildMenu.children('a:not(.has-mega)').after('<span class="btn-submenu"></span>');
                    $('.btn-menu').removeClass('active');
                } else {
                    var $desktopMenu = $('#mainnav-mobi').attr('id', 'mainnav').removeAttr('style');

                    $desktopMenu.find('.submenu').removeAttr('style');
                    $('#header').find('.nav-wrap').append($desktopMenu);
                    $('.btn-submenu').remove();
                }
            }
        });

        $('.btn-menu').on('click', function() {         
            $('#mainnav-mobi').slideToggle(300);
            $(this).toggleClass('active');
        });

        // Mega menu click
        if ( matchMedia( 'only screen and (max-width: 991px)' ).matches ) {
            $('.btn-mega').on('click', function() {      
                $(this).parent('.mega-title').siblings().slideToggle(300);   
                $(this).toggleClass('active');
            });

            $('.has-mega').on('click', function() {      
                $(this).siblings().slideToggle(300);  
                $(this).toggleClass('active');
            });
        }        

        $(document).on('click', '#mainnav-mobi li .btn-submenu', function(e) {
            $(this).toggleClass('active').next('ul').slideToggle(300);
            e.stopImmediatePropagation()
        });

    }

    var headerFixed = function() {        

        if ( $('body').hasClass('header-sticky') ) {
            var hd_height = $('#header').height();           
            $(window).on('load scroll', function(){                
                if ( $(window).scrollTop() > hd_height + 30 ) {
                    $('#header').addClass('downscrolled');                      
                } else {                    
                    $('#header').removeClass('downscrolled');                   
                }
                if( $(window).scrollTop() > 145 ) {
                    $('#header').addClass('upscrolled');                    
                } else {
                    $('#header').removeClass('upscrolled');                    
                }
            })            
        }   
    }

    var onepage_nav = function () {
        $('.page-template-front-page .mainnav > ul > li > a').on('click',function() {           
            var anchor = $(this).attr('href').split('#')[1];            
            var largeScreen = matchMedia('only screen and (min-width: 992px)').matches;
            var headerHeight = 0;
            headerHeight = $('.header').height();            
            if ( anchor ) {
                if ( $('#'+anchor).length > 0 ) {
                   if ( $('.header-sticky').length > 0 && largeScreen ) {
                        headerHeight = headerHeight;
                   } else {
                        headerHeight = 0;
                   }                   
                   var target = $('#'+anchor).offset().top - headerHeight;
                   $('html,body').animate({scrollTop: target}, 1000, 'easeInOutExpo');
                }
            }
            return false;
        })

        $('.mainnav ul > li > a').on( 'click', function() {
            $( this ).addClass('active').parent().siblings().children().removeClass('active');
        });
    }

    var ajaxContactForm = function() {  
        $('#contactform').each(function() {
            $(this).validate({
                submitHandler: function( form ) {
                    var $form = $(form),
                        str = $form.serialize(),
                        loading = $('<div />', { 'class': 'loading' });

                    $.ajax({
                        type: "POST",
                        url:  $form.attr('action'),
                        data: str,
                        beforeSend: function () {
                            $form.find('.submit-wrap').append(loading);
                        },
                        success: function( msg ) {
                            var result, cls;                            
                            if ( msg == 'Success' ) {                                
                                result = 'Message Sent Successfully To Email Administrator. ( You can change the email management a very easy way to get the message of customers in the user manual )';
                                cls = 'msg-success';
                            } else {
                                result = 'Error sending email.';
                                cls = 'msg-error';
                            }

                            $form.prepend(
                                $('<div />', {
                                    'class': 'flat-alert ' + cls,
                                    'text' : result
                                }).append(
                                    $('<a class="close" href="#"><i class="fa fa-close"></i></a>')
                                )
                            );

                            $form.find(':input').not('.submit').val('');
                        },
                        complete: function (xhr, status, error_thrown) {
                            $form.find('.loading').remove();
                        }
                    });
                }
            });
        }); // each contactform
    };   

    var alertBox = function() {
        $(document).on('click', '.close', function(e) {
            $(this).closest('.flat-alert').remove();
            e.preventDefault();
        })     
    } 

    var generalSlider = function() { 
        if ( $().flexslider ) {
            $('.general-slider').each(function() {
                var $this = $(this)
                $this.find('.flexslider').flexslider({
                    animation      :  "slide",
                    direction      :  "horizontal", // vertical
                    pauseOnHover   :  true,
                    useCSS         :  false,
                    easing         :  "swing",
                    animationSpeed :  500,
                    slideshowSpeed :  5000,
                    controlNav     :  false,
                    directionNav   :  true,
                    slideshow      :  true,
                    smoothHeight: true,
                    start: function (slider) {
                        slider.removeClass('loading');
                        var height = $(".flexslider a>img").first().height();
                        //$('.pre-flexslider-container').css("display", "none");
                        //$('.flexslider').css("display", "block");
                        slider.resize();
                        //console.log(height);
                    }
                }); // flexslider
            }); // blog-sider
        }
    };   

    var flatTestimonial = function() {
        $('.flat-row').each(function() {               
            if ( $().owlCarousel ) {
                $(this).find('.flat-testimonial-owl').owlCarousel({
                    loop: true,
                    margin: 30,
                    nav: true,
                    dots: false,                     
                    autoplay: true,                    
                    responsive:{
                        0:{
                            items: 1
                        },
                        767:{
                            items: 2
                        },
                        991:{
                            items: 2
                        },
                        1200: {
                            items: 4
                        }
                    }
                });
            }
        });
    };

    var detectViewport = function() {
        $('[data-waypoint-active="yes"]').waypoint(function() {
            $(this).trigger('on-appear');
        }, { offset: '90%', triggerOnce: true });

        $(window).on('load', function() {
            setTimeout(function() {
                $.waypoints('refresh');
            }, 100);
        });
    };

    var flatCounter = function() {
        $('.counter').on('on-appear', function() { 
            $(this).find('.numb-count').each(function() { 
                var to = parseInt( ($(this).attr('data-to')),10 ), speed = parseInt( ($(this).attr('data-speed')),10 );
                if ( $().countTo ) {
                    $(this).countTo({
                        to: to,
                        speed: speed
                    });
                }
            });
       });
    };
    markData = "Cảng Đình Vũ";
    var googleMap = function() {
        if ( $().gmap3 ) {
            $("#flat-map").gmap3({
                map:{
                    options:{
                        //zoom: 11,
                        mapTypeId: google.maps.MapTypeId.RoadMap,
                        center: [mapLat, mapLon],
                        zoom: 17,
                        //mapTypeId: 'dvp_style',
                        //mapTypeControlOptions: {
                        //    mapTypeIds: ['dvp_style', google.maps.MapTypeId.SATELLITE, google.maps.MapTypeId.HYBRID]
                        //},
                        styles: [{
                            featureType: "all",
                            elementType: "labels.icon",
                            stylers: [{
                                visibility: "on"
                            }]
                        }],
                        scrollwheel: false
                    }
                },
                marker: {
                    latLng: [markLat, markLon],
                    data: markData,
                    options: {
                        title: "Dinh Vu Port",
                        icon: "https://maps.google.com/mapfiles/marker_green.png"
                    },
                    events: {
                        click: function (marker, event, context) {
                            var map = $(this).gmap3("get"),
                              infowindow = $(this).gmap3({ get: { name: "infowindow" } });
                            if (infowindow) {
                                infowindow.open(map, marker);
                                infowindow.setContent(context.data);
                            } else {
                                $(this).gmap3({
                                    infowindow: {
                                        anchor: marker,
                                        options: { content: context.data }
                                    }
                                });
                            }
                        }//,
                        //mouseout: function () {
                        //    var infowindow = $(this).gmap3({ get: { name: "infowindow" } });
                        //    if (infowindow) {
                        //        infowindow.close();
                        //    }
                        //}
                    }
                },

              
             
            })
            ;
        }
    };           

    var swClick = function () {
        function activeLayout () {
            $(".switcher-container" ).on( "click", "a.sw-light", function() {
                $(this).toggleClass( "active" );
                $('body').addClass('home-boxed');  
                $('body').css({'background': '#f6f6f6' });                
                $('.sw-pattern.pattern').css ({ "top": "100%", "opacity": 1, "z-index": "10"});
            }).on( "click", "a.sw-dark", function() {
                $('.sw-pattern.pattern').css ({ "top": "98%", "opacity": 0, "z-index": "-1"});
                $(this).removeClass('active').addClass('active');
                $('body').removeClass('home-boxed');
                $('body').css({'background': '#fff' });
                return false;
            })       
        }
    

        function activePattern () {
            $('.sw-pattern').on('click', function () {
                $('.sw-pattern.pattern a').removeClass('current');
                $(this).addClass('current');
                $('body').css({'background': 'url("' + $(this).data('image') + '")', 'background-size' : '30px 30px', 'background-repeat': 'repeat' });
                return false
            })
        }

        activeLayout(); 
        activePattern();
    } 

    var popupGallery = function () {
        /* magnificPopup video view */
        $('.video-popup').magnificPopup({
            type: 'iframe',
            gallery: {
                enabled: true
            }
        });
        $('.flat-row').each(function() {
            if ( $('a').hasClass('popup-gallery') ) {                
                 $(".popup-gallery").magnificPopup({
                    type: "image",
                    tLoading: "Loading image #%curr%...",
                    removalDelay: 600,
                    mainClass: "my-mfp-slide-bottom",
                    gallery: {
                        enabled: true,
                        navigateByImgClick: true,
                        preload: [ 0, 1 ]
                    },
                    image: {
                        tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
                        titleSrc: function (item) {
                            return item.el.attr('title') + '<small>by Dinh Vu Port</small>';
                        }
                    }
                });
            }
        });       
    }

    var flatAccordion = function() {
        var args = {duration: 600};
        $('.flat-toggle .toggle-title.active').siblings('.toggle-content').show();

        $('.flat-toggle.enable .toggle-title').on('click', function() {
            $(this).closest('.flat-toggle').find('.toggle-content').slideToggle(args);
            $(this).toggleClass('active');
        }); // toggle 

        $('.flat-accordion .toggle-title').on('click', function () {
            if( !$(this).is('.active') ) {
                $(this).closest('.flat-accordion').find('.toggle-title.active').toggleClass('active').next().slideToggle(args);
                $(this).toggleClass('active');
                $(this).next().slideToggle(args);
            } else {
                $(this).toggleClass('active');
                $(this).next().slideToggle(args);
            }     
        }); // accordion
    }; 

    var portfolioIsotope = function() {         
        if ( $().isotope ) {           
            var $container = $('.portfolio');
            $container.imagesLoaded(function(){
                $container.isotope({
                    itemSelector: '.portfolio-item',
                    transitionDuration: '1s'
                });
            });

            //$('.portfolio-filter li').on('click',function() {                           
            //    var selector = $(this).find("a").attr('data-filter');
            //    $('.portfolio-filter li').removeClass('active');
            //    $(this).addClass('active');
            //    $container.isotope({ filter: selector });
            //    return false;
            //});            
        };
    };

    var flatTabs = function () {
        $('.flat-tabs').each(function() {

            $(this).children('.content-tab').children().hide();
            $(this).children('.content-tab').children().first().show();

            $(this).find('.menu-tabs').children('li').on('click', function(e) {
                var liActive = $(this).index(),
                    contentActive = $(this).siblings().removeClass('active').parents('.flat-tabs').children('.content-tab').children().eq(liActive);

                contentActive.addClass('active').fadeIn('slow');
                contentActive.siblings().removeClass('active');
                $(this).addClass('active').parents('.flat-tabs').children('.content-tab').children().eq(liActive).siblings().hide();
                e.preventDefault();
            });
        });
    };

    
    var goTop = function() {
        $(window).scroll(function() {
            if ( $(this).scrollTop() > 800 ) {
                $('.go-top').addClass('show');
            } else {
                $('.go-top').removeClass('show');
            }
        }); 

        $('.go-top').on('click', function() {            
            $("html, body").animate({ scrollTop: 0 }, 1000 , 'easeInOutExpo');
            return false;
        });
    };

    var progressBar = function() {
        $('.progress-bar').on('on-appear', function() {
            $(this).each(function() {
                var percent = $(this).data('percent');

                $(this).find('.progress-animate').animate({
                    "width": percent + '%'
                },3000);

                $(this).parent('.flat-progress').find('.perc').addClass('show').animate({
                    "width": percent + '%'
                },3000);
            });
        });
    };

    var flatFilterPrice = function() {
        if( $().slider ) {
            $( ".price_slider" ).slider({
                range: true,
                min: 25,
                max: 550,
                values: [ 25, 550 ],
                slide: function( event, ui ) {
                    $( ".price_label > input " ).val( "£" + ui.values[ 0 ] + "  - £" + ui.values[ 1 ] );
                    }
            });

            $( ".price_label > input " ).val( "£" + $( ".price_slider" ).slider( "values", 0 ) +
            "  -  £" + $( ".price_slider" ).slider( "values", 1 ) );
            $( ".ui-slider-handle").append("<span class='shadow'></span>");
        }
    };

    var retinaLogos = function() {
      var retina = window.devicePixelRatio > 1 ? true : false;
        if( retina ) {
            $('.header .logo').find('img').attr({ src: '/themes/dvp/images/dvplogo.png', width: '246', height: '60' });
        }
    };   

    var flatSearch = function () {
        $(document).on('click', function(e) {   
            var clickID = e.target.id;   
            if ( ( clickID != 's' ) ) {
                $('.top-search').removeClass('show');                
            } 
        });

        $('.search-box').on('click', function(event){
            event.stopPropagation();
        });

        $('.search-form').on('click', function(event){
            event.stopPropagation();
        });        

        $('.search-box').on('click', function () {
            if(!$('.top-search').hasClass( "show" ))
                $('.top-search').addClass('show');
            else
                $('.top-search').removeClass('show');
        });
    } 
    
    var parallax = function() {
        if ( $().parallax && isMobile.any() == null ) {
            $('.parallax1').parallax("50%", -0.7);
            $('.parallax2').parallax("50%", -0.8);  
            $('.parallax3').parallax("50%", -1.2);
            $('.parallax4').parallax("50%", -0.5);            
        }
    };

    var removePreloader = function() {        
        $('.loading-overlay').fadeOut('slow',function () {
            $(this).remove();
        });
    };   

    var Disclosure = function () {
        var d = "auto";
        if ($(window).width() <= 539) {
            d = 1;
        }
        
        var b = new Swiper(".swiper_news_timeline", {
            normalizeSlideIndex:true,
            slidesPerView: d,
            simulateTouch: false,
            spaceBetween: 24,
            prevButton: ".year-prev",
            nextButton: ".year-next",
            onSlideChangeEnd: function (e) {
                //if ($(window).width() <= 539) {
                //    console.log(e.activeIndex);
                //    $(".swiper-slide").eq(e.activeIndex).trigger("click")
                //}
            }
        });
       // var slideindex = 5;
        if (typeof slideindex !== 'undefined' && slideindex != null) {
           
            b.slideTo(slideindex);
            b.activeIndex = slideindex;
            b.update();         
            $(".swiper-slide.swiper-slide-active").addClass("active");
            
        }


    };
   
    var _CAT_LOADING_FLAG = true;
    var UpdateShipPlan = function () {
         
        var $updatetime = $('#updatetime');
        var $divShipPlanLoading = $('#divShipPlanLoading');
        var $divShipPlanLoading2 = $('#divShipPlanLoading2');
        var $divArrive = $('#divArrive');
        var $divLeave = $('#divLeave');
        
        
       
        if ($divShipPlanLoading.length)
        {
            var _CAT_LOAD_MORE_DATA = { Type: "3" };
            POSTAjax(
            '/aj/SyncShipPlan.ashx',
            _CAT_LOAD_MORE_DATA,
            function () {
                $divShipPlanLoading.html('Đang cập nhật thông tin...');
            },
            function (e) {
                //$('.pager').remove();
                //CAT_LOADING_FLAG = true;
                $divShipPlanLoading.html("");
                if (e == null || e == '') {
                    
                    //_CAT_LOADING_FLAG = false;
                }
                else {
                                                       
                        $divArrive.html(e);
                 }
                if ($divShipPlanLoading2.length) {
                    var _CAT_LOAD_MORE_DATA2 = { Type: "1" };
                    POSTAjax(
                    '/aj/SyncShipPlan.ashx',
                    _CAT_LOAD_MORE_DATA2,
                    function () {
                        $divShipPlanLoading2.html('Đang cập nhật thông tin...');
                    },
                    function (e1) {
                        //$('.pager').remove();
                        //CAT_LOADING_FLAG = true;
                        $divShipPlanLoading2.html("");
                        if (e1 == null || e1 == '') {

                            //_CAT_LOADING_FLAG = false;
                        }
                        else {

                            $divLeave.html(e1);


                            // _CAT_LOADING_FLAG = true;
                            var d = new Date($.now());
                            $updatetime.html(d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + "*");
                        }

                    },
                    ErrorAjax,
                    true
                    );

                }

            },
            ErrorAjax,
            true
            );
           
        }

       
      


    };
    var SyncWeatherExucute = function () {
        window.setInterval(SyncWeather, 300000);
    };
    var UpdateWeather = function () {

        //var $updatetime = $('#updatetime');
        var $divLoading = $('#divWeatherLoading');
       
        //var $divArrive = $('#divArrive');
        //var $divLeave = $('#divLeave');

        

        if ($divLoading.length) {
            //console.log("UpdateWeather");
            var _CAT_LOAD_MORE_DATA = { };
            POSTAjax(
            '/aj/SyncWeather.ashx',
            _CAT_LOAD_MORE_DATA,
            function () {
                $divLoading.html('Đang cập nhật thông tin...');
            },
            function (e) {
                //$('.pager').remove();
                //CAT_LOADING_FLAG = true;
                $divLoading.html("");
                if (e == null || e == '') {

                    //_CAT_LOADING_FLAG = false;
                }
                else {

                   // $divArrive.html(e);
                }
                

            },
            ErrorAjax,
            true
            );

        }





    };
    var SyncWeather = function () {

   
            console.log("SyncWeather");
            var _CAT_LOAD_MORE_DATA = {};
            POSTAjax(
            '/aj/SyncWeather.ashx',
            _CAT_LOAD_MORE_DATA,
            function () {
                //$divLoading.html('Đang cập nhật thông tin...');
            },
            function (e) {
                //$('.pager').remove();
                //CAT_LOADING_FLAG = true;
                //$divLoading.html("");
                if (e == null || e == '') {

                    //_CAT_LOADING_FLAG = false;
                }
                else {

                    // $divArrive.html(e);
                }


            },
            ErrorAjax,
            true
            );

    };


    var InsertCationImg = function () {


        var $divContent = $('.entry-content');
       
     

        if ($divContent.length) {
            $(".entry-content img").each(function () {
                var imageCaption = $(this).attr("alt");
                if (imageCaption != '') {
                    var imgWidth = $(this).width();
                    var imgHeight = $(this).height();
                    var position = $(this).position();
                    var positionTop = (position.top + imgHeight - 26)
                    $("<span class='img-caption'><em>" + imageCaption +
                        "</em></span>").css({
                            //"position": "absolute",
                            //"top": positionTop + "px",
                            "left": "0",
                            "width": imgWidth + "px"
                        }).insertAfter(this);
                }
            });
        }

    };


    function ErrorAjax() {
        // Not implemented yet
    }
    function POSTAjax(url, dat, befHandle, sucHandle, errHandle, asy) {
        $.ajax({
            async: asy,
            url: url,
            data: dat,
            type: 'POST',
            cache: false,
            beforeSend: function () {
                befHandle();
            },
            success: function (e) {
                sucHandle(e);
            },
            error: function () {
                errHandle();
            }
        });
    }
    
   	// Dom Ready
	$(function() { 
        if ( matchMedia( 'only screen and (min-width: 991px)' ).matches ) {
            headerFixed();
        } 
	    try {
	      
        flatSearch(); 
        //onepage_nav();     
        detectViewport();
        goTop();        
	    //swClick();
        popupGallery();
        //flatFilterPrice();
        generalSlider();
        portfolioIsotope();
        flatAccordion();
        //progressBar();
        flatTabs();
        //flatCounter();
        responsiveMenu();
        flatTestimonial();
        
        //ajaxContactForm();
        //alertBox();
        //retinaLogos(); 
        parallax();
        //googleMap();
        Disclosure();
        removePreloader();
        UpdateShipPlan();
        //UpdateWeather();     
       // setTimeout(SyncWeatherExucute, 5000);
       // InsertCationImg();
        $("#bn1").breakingNews({
            effect: "slide-v",
            autoplay: true,
            timer: 5000,
            color: "blue"
        });
        //window.setInterval(UpdateWeather, 300000);
        }catch (err)
        {
            alert(err);
            removePreloader();
        }
   	});

})(jQuery);



