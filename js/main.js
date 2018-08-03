jQuery(document).ready(function ($) {


  pageInit();

  // custom code

});

function productsLoad(event, productsContents) {
  event.preventDefault();
  $("#main-app").css("display", "none");
  $("#product-wrapper").css("display", "block");
  var productkey = $(event.currentTarget).attr('data-productkey'),
    productData = {};

  $.each(productsContents.productsCategories, function (key, val) {
    if (productkey == val.productKey) {
      productData = val;
    }
  });
  $('.productPage-Head').html(productData.header);
  $('.productPage-Desc').html(productData.desc);
  var aboutItems = [];
  if (productData.productsList && productData.productsList.length) {
    $.each(productData.productsList, function (key, val) {
      aboutItems.push('<div class="col-sm-12 prod-list-wrap"><div class="col-sm-8 prod-list-content"><h4>' + val.header + '</h4><p>' + val.desc + '</p></div><div class="col-sm-4 prod-list-img-wrap"><img class="prod-list-img" src="' + val.productImgUrl + '" /></div></div>');

    });
  }

  $("<div/>", {
    "class": "col-sm-12",
    html: aboutItems.join("")
  }).appendTo(".productPage-List");

  window.scrollTo(0, 0);

}

function bactToHome(event) {
  event.preventDefault();
  $("#main-app").css("display", "block");
  $("#product-wrapper").css("display", "none");
  $('.productPage-Head').html('');
  $('.productPage-Desc').html('');
  $('.productPage-List').html('');

  //document.getElementById("products").scrollIntoView();
  $('html, body').animate({
    scrollTop: $("#products").offset().top
  }, 0);
}


function pageInit() {
  $.getJSON("./js/data/data.json")
    .done(function (json) {
      pageLoad(json);
    })
    .fail(function (jqxhr, textStatus, error) {
      var err = textStatus + ", " + error;
      console.log("Request Failed: " + err);
    });
}

function pageLoad(data) {
  console.log('data', data);
  commonContentsLoad(data.commonContents);
  headBannerLoad(data.headBanner);
  aboutContentLoad(data.aboutUs);
  productsContentLoad(data.productsContents);
  technologyContentLoad(data.technologyContents);
  clientsContentLoad(data.clientsContents);
  contactContentLoad(data.contactContents);

  $("#product-wrapper").css("display", "none");
  $(".product-choose").click(function (event) {
    productsLoad(event, data.productsContents);
  });

  $(".bactToHome").click(function (event) {
    bactToHome(event);
  });

  // Header fixed and Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
      $('#header').addClass('header-fixed');
    } else {
      $('.back-to-top').fadeOut('slow');
      $('#header').removeClass('header-fixed');
    }
  });
  $('.back-to-top').click(function () {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  // Initiate the wowjs
  new WOW().init();

  // Porfolio filter
  $("#portfolio-flters li").click(function () {
    $("#portfolio-flters li").removeClass('filter-active');
    $(this).addClass('filter-active');

    var selectedFilter = $(this).data("filter");
    $("#portfolio-wrapper").fadeTo(100, 0);

    $(".portfolio-item").fadeOut().css('transform', 'scale(0)');

    setTimeout(function () {
      $(selectedFilter).fadeIn(100).css('transform', 'scale(1)');
      $("#portfolio-wrapper").fadeTo(300, 1);
    }, 300);
  });

  // jQuery counterUp
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000
  });



  // Initiate superfish on nav menu
  $('.nav-menu').superfish({
    animation: {
      opacity: 'show'
    },
    speed: 400
  });

  // Smoth scroll on page hash links
  $('a[href*="#"]:not([href="#"])').on('click', function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {

      var target = $(this.hash);
      if (target.length) {
        var top_space = 0;

        if( $('#header').length ) {
          top_space = $('#header').outerHeight();

          if( ! $('#header').hasClass('header-fixed') ) {
            top_space = top_space - 20;
          }
        }

        $('html, body').animate({
          scrollTop: target.offset().top - top_space
        }, 1500, 'easeInOutExpo');

        if ( $(this).parents('.nav-menu').length ) {
          $('.nav-menu .menu-active').removeClass('menu-active');
          $(this).closest('li').addClass('menu-active');
        }

        if ( $('body').hasClass('mobile-nav-active') ) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
        return false;
      }
    }
  });

  
  
  $('#main-slider').flexslider({
    animation: "slide",
    animationLoop: true,
    itemWidth: 350,
    itemMargin: 2,
    pausePlay: true,
    start: function (slider) {
      //$('body').removeClass('loading');
      // alert('Rendered');
    },
    end: function (slider) {
      // alert('Ended');
    }
  });

  $('#main-slider1').flexslider({
    animation: "slide",
    animationLoop: true,
    itemWidth: 250,
    itemMargin: 2 ,
    pausePlay: true,
    start: function (slider) {
      //$('body').removeClass('loading');
    }
  });
  //flexslider carousel
  setTimeout(function(){ 
    $( "#main-slider" ).addClass( "flexslider carousel" );
    $('#main-slider1').addClass( "flexslider carousel" );
  }, 5000);
  

}

function commonContentsLoad(commonContentsData) {
  $(document).attr("title", commonContentsData.title);
  $("#copyrightSiteName").html(commonContentsData.copyrightSiteName);
}

function headBannerLoad(headData) {
  //Initilize variables
  var navItems = [],
    bannerItems = [];

  //logo load
  $('#siteLogo').attr('src', (headData.logoURL || ''));

  //Nav List Load
  $.each(headData.navList, function (key, val) {
    if (key == 0) {

      navItems.push("<li class='menu-active' id='" + (val.name + "_" + key) + "'><a href=" + val.linkRef + ">" + val.name + "</a></li>");
    } else {
      navItems.push("<li id='" + (val.name + "_" + key) + "'><a href=" + val.linkRef + ">" + val.name + "</a></li>");
    }
  });

  $("<ul/>", {
    "class": "nav-menu",
    html: navItems.join("")
  }).appendTo("#nav-menu-container");

  //Bannner content Loads
  bannerItems.push('<h1>' + headData.BannerHeader + '</h1>');
  bannerItems.push('<h2>' + headData.BannerDesc + '</h2>');
  bannerItems.push('<a href=' + headData.BannerBtn.linkTo + ' class="btn-get-started">' + headData.BannerBtn.content + '</a>');

  $("<div/>", {
    "class": "home-container",
    html: bannerItems.join("")
  }).appendTo("#home");

  mobileViewLoad();

}

function mobileViewLoad() {
  // Mobile Navigation
  if ($('#nav-menu-container').length) {
    var $mobile_nav = $('#nav-menu-container').clone().prop({
      id: 'mobile-nav'
    });
    $mobile_nav.find('> ul').attr({
      'class': '',
      'id': ''
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>');
    $('body').append('<div id="mobile-body-overly"></div>');
    $('#mobile-nav').find('.menu-has-children').prepend('<i class="fa fa-chevron-down"></i>');

    $(document).on('click', '.menu-has-children i', function (e) {
      $(this).next().toggleClass('menu-item-active');
      $(this).nextAll('ul').eq(0).slideToggle();
      $(this).toggleClass("fa-chevron-up fa-chevron-down");
    });

    $(document).on('click', '#mobile-nav-toggle', function (e) {
      $('body').toggleClass('mobile-nav-active');
      $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
      $('#mobile-body-overly').toggle();
    });

    $(document).click(function (e) {
      var container = $("#mobile-nav, #mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
      }
    });
  } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
    $("#mobile-nav, #mobile-nav-toggle").hide();
  }
}

function aboutContentLoad(aboutUsData) {
  //Initilize variables
  var aboutItems = [],
    animationDelay = 0.1;

  //about content loads
  aboutItems.push('<h2 class="title">' + aboutUsData.aboutHead + '</h2>');
  aboutItems.push('<p>' + aboutUsData.aboutDesc + '</p>');

  $.each(aboutUsData.aboutCategories, function (key, val) {
    if (key == 0) {
      aboutItems.push('<div class="icon-box wow fadeInUp"><span class="about-us-desc-icon"><img src="' + val.aboutCatImg + '" alt="icon"/></span><div class="about-us-desc-list"><h4 class="title"><a href="">' + val.header + '</a></h4><p class="description">' + val.desc + '</p></div></div>');
    } else {
      animationDelay *= 2;
      aboutItems.push('<div class="icon-box wow fadeInUp" data-wow-delay=' + (animationDelay + 's') + '"><span class="about-us-desc-icon"><img src="' + val.aboutCatImg + '" alt="icon"/></span><div class="about-us-desc-list"><h4 class="title"><a href="">' + val.header + '</a></h4><p class="description">' + val.desc + '</p></div></div>');
    }
  });

  $("<div/>", {
    "class": "col-lg-6 content order-lg-1 order-2",
    html: aboutItems.join("")
  }).appendTo(".about-container");

  $("<div/>", {
    "class": "col-lg-6 background order-lg-2 order-1 wow fadeInRight"
  }).appendTo(".about-container");

}

function productsContentLoad(productsData) {
  //Initilize variables
  var serviceHeadItems = [],
    serviceItems = [],
    animationDelay = 0.2;

  //products content loads
  serviceHeadItems.push('<h3 class="section-title">' + productsData.productsHead + '</h3>');
  serviceHeadItems.push('<p class="section-description">' + productsData.productsDesc + '</p>');
  $("<div/>", {
    "class": "container wow fadeIn section-header",
    html: serviceHeadItems.join("")
  }).appendTo(".products-container");

  $.each(productsData.productsCategories, function (key, val) {
    if (key && key % 3 == 0) {
      animationDelay = 0.2;
    }
    serviceItems.push('<div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="' + (animationDelay.toFixed(1) + 's') + '"> <div class="box product-choose" data-productKey="' + val.productKey + '"><div class="icon-prod"><a href="#"><span class="product-desc-icon"><img src="' + val.productGrpImgUrl + '" alt="icon"/></span></a></div><h4 class="title"><a href="">' + val.header + '</a></h4><p class="description">' + val.desc + '</p></div></div>');
    //serviceItems.push('<div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="' + (animationDelay.toFixed(1) + 's') + '"><div class="box product-choose" data-productKey="' + val.productKey + '"><div class="icon"><a href="#"><i class="' + val.iconClass + '"></i></a><span class="about-us-desc-icon"><img src="./img/portfolio/app1.jpg" alt="icon"/></div><h4 class="title"><a href="">' + val.header + '</a></h4><p class="description">' + val.desc + '</p></div></div>');
    animationDelay += 0.2;
  });

  $("<div/>", {
    "class": "row",
    html: serviceItems.join("")
  }).appendTo(".products-container");

  var bannerSliderContainer=[
      '../img/hero-bg.jpg',
      '../img/First.jpg',
      '../img/Second.jpg',
      '../img/Third.jpg',
      '../img/Four.jpg',
      '../img/Fifth.jpg',
      '../img/technology/tech_1.jpg',
      '../img/technology/tech_2.jpg',
      '../img/technology/tech_3.jpg',
      '../img/technology/tech_4.jpg',
    ],
    bannerSliderCount=1, timeDuration=5000;

      
	setInterval(function(){ 
		if(bannerSliderCount == bannerSliderContainer.length){
			bannerSliderCount = 0;
		};
		$("#home").css({'background-image': 'url('+bannerSliderContainer[bannerSliderCount]+')'});
		bannerSliderCount++;
	}, timeDuration);

}

function clientsContentLoad(clientsData) {
  //Initilize variables
  var clientsContentHeadItems = [],
    clientsContentItems = [],
    animationDelay = 0.2;

  //clientsContents content loads
  clientsContentHeadItems.push('<h3 class="section-title">' + clientsData.clientsHead + '</h3>');
  clientsContentHeadItems.push('<p class="section-description">' + clientsData.clientsDesc + '</p>');
  $("<div/>", {
    "class": "section-header",
    html: clientsContentHeadItems.join("")
  }).appendTo(".clientsContents-container");

  var tempContent = '<div id="main-slider1"><ul class="slides">';
  clientsContentItems.push(tempContent);

  $.each(clientsData.clientsCategories, function (key, val) {

    //tempContent = '<div class="col-lg-3 col-md-6"><div class="member"><div class="pic"><img src="'+val.clientImgURL+'" alt=""></div><h4>'+val.clientsName+'</h4></div></div>';
    tempContent = '<li><img src="' + val.clientImgURL + '" /></li>';
    clientsContentItems.push(tempContent);

  });

  tempContent = '</ul></div>';
  clientsContentItems.push(tempContent);


  $( "<div/>", {
    "class": "row",
    html: clientsContentItems.join( "" )
  }).appendTo( ".clientsContents-container" );

}

function technologyContentLoad(technologyData) {
  console.log('technologyContentLoad');

  //Initilize variables
  var technologyContentHeadItems = [],
    technologyContentItems = [],
    animationDelay = 0.2;

  //technologyContents content loads
  technologyContentHeadItems.push('<h3 class="section-title">' + technologyData.technologyHead + '</h3>');
  technologyContentHeadItems.push('<p class="section-description">' + technologyData.technologyDesc + '</p>');
  //TODO Make Dynamic
   $( "<div/>", {
     "class": "section-header",
     html: technologyContentHeadItems.join( "" )
   }).appendTo( ".technologyContents-container" );

  var tempContents = '<div id="main-slider"><ul class="slides">';
  technologyContentItems.push(tempContents);

  $.each(technologyData.technologyCategories, function (key, val) {

    //tempContents = '<div class="col-lg-3 col-md-6"><div class="member"><div class="pic"><img src="'+val.technologyImgURL+'" alt=""></div><h4>'+val.technologyName+'</h4></div></div>';
    tempContents = '<li><img src="' + val.technologyImgURL + '" /></li>';
    technologyContentItems.push(tempContents);

  });

  tempContents = '</ul></div>';
  technologyContentItems.push(tempContents);


  $( "<div/>", {
    "class": "row",
    html: technologyContentItems.join( "" )
  }).appendTo( ".technologyContents-container" );
   
}

function contactContentLoad(contactContentsData) {
  //Initilize variables
  var contactContentHeadItems = [];
  //contactContents content loads
  contactContentHeadItems.push('<h3 class="section-title">' + contactContentsData.contactHead + '</h3>');
  contactContentHeadItems.push('<p class="section-description">' + contactContentsData.contactDesc + '</p>');
  $("<div/>", {
    "class": "section-header",
    html: contactContentHeadItems.join("")
  }).appendTo("#contact-header");

  console.log(contactContentsData);
  $("#contactAddress").html(contactContentsData.address);
  $("#contactMailId").html(contactContentsData.mailId);
  $("#contactNumber").html(contactContentsData.contactNumber);




  var socialLinksLists = [];

  $.each(contactContentsData.socialLinks, function (k, v) {
    socialLinksLists.push('<a href="' + v.linkTo + '" class="' + v.className + '"><i class="' + v.iconClass + '"></i></a>');
  });

  $("<div/>", {
    "class": "social-links",
    html: socialLinksLists.join("")
  }).appendTo("#contactAddressContainer");

  //map load
  $('#google-map').attr({
    'data-latitude': contactContentsData.mapLatitude || '',
    'data-longitude': contactContentsData.mapLongitude || '',
    'visibility': 'hidden'
  });

  //Google Map
  loadMap();
}

function loadMap() {
  //Google Map
  var get_latitude = $('#google-map').data('latitude');
  var get_longitude = $('#google-map').data('longitude');

  function initialize_google_map() {
    var myLatlng = new google.maps.LatLng(get_latitude, get_longitude);
    var mapOptions = {
      zoom: 14,
      scrollwheel: false,
      center: myLatlng
    };
    var map = new google.maps.Map(document.getElementById('google-map'), mapOptions);
    var marker = new google.maps.Marker({
      position: myLatlng,
      map: map
    });
    $("google-map").attr("visibility") = "hidden";
  }
  // google.maps.event.addDomListener(window, 'load', initialize_google_map);

}