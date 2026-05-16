/*Headwer*/

$(function () {
  let header = $("#header");
  let intro = $("#intro");
  let introHeight = intro.innerHeight();
  let scrollPos = $(window).scrollTop();
  checkscroll(scrollPos, introHeight);
  $(window).on("scroll resize", function () {
    introHeight = intro.innerHeight();
    scrollPos = $(this).scrollTop();
    checkscroll(scrollPos, introHeight);
  });

  function checkscroll(scrollPos, introHeight) {
    if (scrollPos > introHeight) {
      header.addClass("fixed");
    } else {
      header.removeClass("fixed");
    }
  }

  let nav = $("#nav");

  /*Smooth scroll*/
  $("[data-scroll]").on("click", function (event) {
    event.preventDefault();
    let elementId = $(this).data("scroll");
    let elementOffset = $(elementId).offset().top;
    let scrollGap = $(window).width() < 768 ? 56 : 70;
    nav.removeClass("show");
    $("html, body").animate(
      {
        scrollTop: elementOffset - scrollGap,
      },
      700
    );
  });

  /*Nav Toggle*/
  let navToggle = $("#navToggle");
  navToggle.on("click", function (event) {
    event.preventDefault();
    nav.toggleClass("show");
  });

  /* Btn scroll*/
  $(window).scroll(function () {
    if ($(this).scrollTop() > 150) $(".gotobtn").addClass("active");
    else $(".gotobtn").removeClass("active");
  });
  $(".gotobtn").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 800);
  });

  $(document).ready(function () {
    $(".box div").click(function () {
      if ($(this).hasClass("spin")) {
        $(".box div").removeClass("spin");
      } else {
        $(".box div").removeClass("spin");
        $(this).addClass("spin");
      }
    });
  });
});



/*Slider Card Flash*/

$(document).ready(function () {
  $(".card-wrapper .card").last().addClass("active");
  $(".card-wrapper .card").last().prev().addClass("next");
  // Autoplay interval
  var interval = 5000;
  var myInt = setInterval(function () {
    $(".card.active").trigger("click");
  }, interval);
  // Clickable toggle
  $(".card").on("click", function () {
    clearInterval(myInt);
    // Prevent multiple fast clicks to break the functioning
    $(".card").css({ "pointer-events": "none" });
    $(".card.active").addClass("animate-leave").removeClass("active");
    $(".card.next").addClass("active").removeClass("next");
    $(".card-wrapper .card").last().prev().prev().addClass("next");
    setTimeout(function () {
      $(".card.animate-leave")
        .addClass("animate-back")
        .removeClass("animate-leave");
      $(".card-wrapper").prepend($(".animate-back"));
    }, 300); // Wait for the animation to end
    setTimeout(function () {
      $(".card.animate-back").removeClass("animate-back");
      $(".card").css({ "pointer-events": "auto" });
      clearInterval(myInt);
      myInt = setInterval(function () {
        $(".card.active").trigger("click");
      }, interval);
    }, 700);
  });

  // Just for fun
  $(".polaroid-style").on("click", function () {
    $(".card").toggleClass("polaroid");
  });
});
