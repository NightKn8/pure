let $scrollPrev = 0;
const $navHeight = () => $("nav .container-fluid").outerHeight(true),
  $viewBottom = () => $(window).scrollTop() + $(window).height(),
  $parallaxIllusion = () => {
    const $pxTop = $(".parallaxTop"),
      $pxMid = $(".parallaxMiddle"),
      $pxBottom = $(".parallaxBottom"),
      $scrollCurr = $viewBottom(),
      $carouselTop = $("#Beerousel").offset().top,
      $carouselBottom = $carouselTop + $("#Beerousel").outerHeight(true) + $navHeight(),
      $pxspeed = $scrollCurr - $carouselTop;
    if ($carouselTop > 0 && $viewBottom() > $carouselTop && $(window).scrollTop() <= $carouselBottom) {
      $pxTop.css({
        "top": 40 + -$pxspeed / 10
      });
     $pxMid.css({
        "top": $pxspeed / 4
      });
      $pxBottom.css({
        "top": ($pxspeed / 8)
      });
      $scrollPrev = $scrollCurr;
    };
  };
  $dynamicLoad = () => {
    $(".loadable").each((i, el) => {
      const $elBottom = $(el).offset().top + $(el).outerHeight(true);
      ($viewBottom() >= $elBottom) ? $(el).addClass("fadeIn"): false;
    });
  },
  $calcScrollSpy = () => {
    $("body").scrollspy({
      "target": ".navbar"
    });
    $("body").data()["bs.scrollspy"].options.offset = $navHeight();
    $("body").data()["bs.scrollspy"].process();
    $("body").scrollspy("refresh");
  },
  $navContainer = (add, remove) => $(".navbar ~ .container-fluid").removeClass(remove).addClass(add);

$(document).ready(() => {

  $(window).focus(() => $("link[rel*='icon']").attr("href", "../img/demo1/logosmallactive.png"));
  
  $(window).blur(() => $("link[rel*='icon']").attr("href", "../img/demo1/logosmall.png"));

  let inc = 0;
  $("#Beerousel").on("slid.bs.carousel", () => {
    if ($(".active").hasClass("chart")) {
      const $chartIncrement = setInterval(() => {
        const $circle = $(".circleChart");
        $circle.attr("data-value", inc + "%");
        switch (inc) {
          case 95:
            $circle.removeClass("moveChart");
            clearInterval($chartIncrement);
            break;
          default:
            $circle.addClass("gradientChart");
            $circle.addClass("moveChart");
            ++inc;
        }
      }, 32);
    }
  });
  $dynamicLoad();
  $("#top3").removeClass("fadeIn");
  if ($(window).scrollTop() <= 350 && ($navHeight() <= 300)) {
    $navContainer("affixShrink");
  }
  $("nav ul li a[href^='#']").bind("click", (event) => {
    event.preventDefault();
    const hash = event.currentTarget.hash,
      def = $.Deferred(),
      $goToElement = () => {
        $("html, body").animate({
          "scrollTop": $(hash).offset().top - $navHeight() + 1
        }, 300, () => {
          window.location.hash = hash;
        });
      };
    if ($(hash).hasClass("fadeIn")) {
      $goToElement();
    } else {
      const loadOnDemand = () => {
        const $index = $(hash).index(".loadable") + 1;
        if ($index) {
          $(".loadable:lt(" + $index + ")").addClass("fadeIn");
          def.resolve();
        } else {
          def.reject();
        }
        return def.promise();
      };
      $.when(loadOnDemand()).then(setTimeout(() => $goToElement(), 300), () => false);
    }
  });

  $("footer .dark, nav header a").bind("click", (event) => {
    event.preventDefault();
    $("html, body").animate({
        "scrollTop": 0
      }, 300,
      () => {
        window.location.hash = "#";
      }
    );
  });
  $(".collapse").on("show.bs.collapse", () => {
    $navContainer("affixExpand", "affixShrink");
    $(".brandLogo").addClass("brandLogoSmall");
  });
  $(".collapse").on("hide.bs.collapse", () => {
    $navContainer("affixShrink", "affixExpand");
    $(".brandLogo").removeClass("brandLogoSmall");
  });

  $(window).scroll(() => {
    $dynamicLoad();
    $calcScrollSpy();
    $parallaxIllusion();
  });

  $(window).resize(() => {
    if ($(window).width() > 767) {
      $navContainer("affixShrink", "affixExpand");
      $(".brandLogo").removeClass("brandLogoSmall");
    } else if ($(window).width() <= 767 && ($navHeight() >= 300)) {
      $navContainer("affixExpand", "affixShrink");
      $(".brandLogo").addClass("brandLogoSmall");
    }
    $calcScrollSpy();
  });
});