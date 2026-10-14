(function ($) {
  "use strict";

  // ==========================================
  //      Start Document Ready function
  // ==========================================
  $(document).ready(function () {
    // ============== Mobile Nav Menu Dropdown Js Start =======================
    function toggleSubMenu() {
      if ($(window).width() <= 991) {
        $(".has-submenu")
          .off("click")
          .on("click", function () {
            $(this)
              .toggleClass("active")
              .siblings(".has-submenu")
              .removeClass("active")
              .find(".nav-submenu")
              .slideUp(300);
            $(this).find(".nav-submenu").stop(true, true).slideToggle(300);
          });
      } else {
        $(".has-submenu").off("click");
      }
    }

    toggleSubMenu();
    $(window).resize(toggleSubMenu);
    // ============== Mobile Nav Menu Dropdown Js End =======================

    // ===================== Scroll Back to Top Js Start ======================
    var progressPath = document.querySelector(".progress-wrap path");
    var pathLength = progressPath.getTotalLength();
    progressPath.style.transition = progressPath.style.WebkitTransition =
      "none";
    progressPath.style.strokeDasharray = pathLength + " " + pathLength;
    progressPath.style.strokeDashoffset = pathLength;
    progressPath.getBoundingClientRect();
    progressPath.style.transition = progressPath.style.WebkitTransition =
      "stroke-dashoffset 10ms linear";
    var updateProgress = function () {
      var scroll = $(window).scrollTop();
      var height = $(document).height() - $(window).height();
      var progress = pathLength - (scroll * pathLength) / height;
      progressPath.style.strokeDashoffset = progress;
    };
    updateProgress();
    $(window).scroll(updateProgress);
    var offset = 50;
    var duration = 550;
    jQuery(window).on("scroll", function () {
      if (jQuery(this).scrollTop() > offset) {
        jQuery(".progress-wrap").addClass("active-progress");
      } else {
        jQuery(".progress-wrap").removeClass("active-progress");
      }
    });
    jQuery(".progress-wrap").on("click", function (event) {
      event.preventDefault();
      jQuery("html, body").animate({ scrollTop: 0 }, duration);
      return false;
    });
    // ===================== Scroll Back to Top Js End ======================

    // ========================== add active class to navbar menu current page Js Start =====================
    function dynamicActiveMenuClass(selector) {
      let FileName = window.location.pathname.split("/").reverse()[0];

      // If we are at the root path ("/" or no file name), keep the activePage class on the Home item
      if (FileName === "" || FileName === "index.html") {
        // Keep the activePage class on the Home link
        selector
          .find("li.nav-menu__item.has-submenu")
          .eq(0)
          .addClass("activePage");
      } else {
        // Remove activePage class from all items first
        selector.find("li").removeClass("activePage");

        // Add activePage class to the correct li based on the current URL
        selector.find("li").each(function () {
          let anchor = $(this).find("a");
          if ($(anchor).attr("href") == FileName) {
            $(this).addClass("activePage");
          }
        });

        // If any li has activePage element, add class to its parent li
        selector.children("li").each(function () {
          if ($(this).find(".activePage").length) {
            $(this).addClass("activePage");
          }
        });
      }
    }

    if ($("ul").length) {
      dynamicActiveMenuClass($("ul"));
    }
    // ========================== add active class to navbar menu current page Js End =====================

    // ========================== Settings Panel Js Start =====================
    $(".settings-button").on("click", function () {
      $(".settings-panel").toggleClass("active");
      $(this).toggleClass("active");
    });

    $(document).on(
      "click",
      ".settings-panel__buttons .settings-panel__button",
      function () {
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
      },
    );

    // Direction start
    $(".direction-ltr").on("click", function () {
      $("html").attr("dir", "ltr");
    });

    $(".direction-rtl").on("click", function () {
      $("html").attr("dir", "rtl");
    });
    // Direction end
    // ========================== Settings Panel Js End =====================

    // ********************* Toast Notification Js start *********************
    function toastMessage(messageType, messageTitle, messageText, messageIcon) {
      let $toastContainer = $("#toast-container");

      let $toast = $("<div>", {
        class: `toast-message ${messageType}`,
        html: `
      <div class="toast-message__content">
        <span class="toast-message__icon">
          <i class="${messageIcon}"></i>
        </span>
        <div class="flex-grow-1">
          <div class="d-flex align-items-start justify-content-between mb-1">
            <h6 class="toast-message__title">${messageTitle}</h6>
            <button type="button" class="toast-message__close">
              <i class="ph-bold ph-x"></i>
            </button>
          </div>
          <span class="toast-message__text">${messageText}</span>
        </div>
      </div>
      <div class="progress__bar"></div>
    `,
      });

      $toastContainer.append($toast);

      setTimeout(() => {
        $toast.addClass("active");
      }, 50);

      let totalDuration = 3500;
      let startTime = Date.now();
      let remainingTime = totalDuration;
      let toastTimeout = setTimeout(hideToast, remainingTime);

      function hideToast() {
        $toast.removeClass("active");
        setTimeout(() => {
          $toast.remove();
        }, 500);
      }

      // Remove Toast on Close Button Click
      $toast.find(".toast-message__close").on("click", function () {
        $toast.removeClass("active");
        setTimeout(() => {
          $toast.remove();
        }, 500);
      });

      // Pause Timeout on Hover
      $toast.on("mouseenter", function () {
        remainingTime -= Date.now() - startTime;
        clearTimeout(toastTimeout);
      });

      // Resume Timeout on Mouse Leave
      $toast.on("mouseleave", function () {
        startTime = Date.now();
        toastTimeout = setTimeout(hideToast, remainingTime);
      });
    }
    // ********************* Toast Notification Js End *********************

    // ========================= Delete Item Js start ===================
    $(document).on("click", ".delete-button", function () {
      $(this).closest(".delete-item").addClass("d-none");

      toastMessage(
        "danger",
        "Deleted",
        "You deleted successfully!",
        "ph-bold ph-trash",
      );
    });
    // ========================= Delete Item Js End ===================

    // ========================= Form Submit Js Start ===================
    $(document).on("submit", ".form-submit", function (e) {
      e.preventDefault();

      $("input").val("");

      $("textarea").val("");

      toastMessage(
        "success",
        "Success",
        "Form submitted successfully!",
        "ph-fill ph-check-circle",
      );
    });
    // ========================= Form Submit Js End ===================

    // ================== Password Show Hide Js Start ==========
    $(".toggle-password").on("click", function () {
      $(this).toggleClass("active");
      var input = $($(this).attr("id"));
      if (input.attr("type") == "password") {
        input.attr("type", "text");
        $(this).removeClass("ph-bold ph-eye-closed");
        $(this).addClass("ph-bold ph-eye");
      } else {
        input.attr("type", "password");
        $(this).addClass("ph-bold ph-eye-closed");
      }
    });
    // ========================= Password Show Hide Js End ===========================

    // ========================= Range Slider Js Start =====================
    $(document).ready(function () {
      var $rangeInput = $(".range-input input"),
        $priceInput = $(".price-input input"),
        $range = $(".slider .progress"),
        priceGap = 1000;

      // Update the range and price inputs when the price input fields change
      $priceInput.on("input", function () {
        var minPrice = parseInt($priceInput.eq(0).val(), 10),
          maxPrice = parseInt($priceInput.eq(1).val(), 10);

        if (
          maxPrice - minPrice >= priceGap &&
          maxPrice <= parseInt($rangeInput.eq(1).attr("max"), 10)
        ) {
          if ($(this).hasClass("input-min")) {
            $rangeInput.eq(0).val(minPrice);
            $range.css(
              "inset-inline-start",
              (minPrice / parseInt($rangeInput.eq(0).attr("max"), 10)) * 100 +
                "%",
            );
          } else {
            $rangeInput.eq(1).val(maxPrice);
            $range.css(
              "inset-inline-end",
              100 -
                (maxPrice / parseInt($rangeInput.eq(1).attr("max"), 10)) * 100 +
                "%",
            );
          }
        }
      });

      // Update the price input fields and range visual when the range slider is dragged
      $rangeInput.on("input", function () {
        var minVal = parseInt($rangeInput.eq(0).val(), 10),
          maxVal = parseInt($rangeInput.eq(1).val(), 10);

        if (maxVal - minVal < priceGap) {
          if ($(this).hasClass("range-min")) {
            $rangeInput.eq(0).val(maxVal - priceGap);
          } else {
            $rangeInput.eq(1).val(minVal + priceGap);
          }
        } else {
          $priceInput.eq(0).val(minVal);
          $priceInput.eq(1).val(maxVal);
          $range.css(
            "inset-inline-start",
            (minVal / parseInt($rangeInput.eq(0).attr("max"), 10)) * 100 + "%",
          );
          $range.css(
            "inset-inline-end",
            100 -
              (maxVal / parseInt($rangeInput.eq(1).attr("max"), 10)) * 100 +
              "%",
          );
        }
      });
    });
    // ========================= Range Slider Js End =====================

    // ================================= Banner slider Start =========================
    var bannerOne = new Swiper(".banner-slider", {
      slidesPerView: 1,
      grabCursor: true,
      loop: true,
      speed: 1000,
      effect: "fade",
      autoplay: {
        delay: 6000,
        disableOnInteraction: false,
      },
      autoplay: false,
      pagination: {
        el: ".banner-slider-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".banner-print-btn-next",
        prevEl: ".banner-print-btn-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
    // ================================= Banner slider Start =========================

    // ================================= Brand slider Start =========================
    var brandSlider = new Swiper(".brand-slider", {
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },
      autoplay: true,
      speed: 1500,
      grabCursor: true,
      loop: true,
      slidesPerView: 6,
      breakpoints: {
        300: {
          slidesPerView: 2,
        },
        575: {
          slidesPerView: 3,
        },
        768: {
          slidesPerView: 4,
        },
        992: {
          slidesPerView: 5,
        },
        1200: {
          slidesPerView: 6,
        },
      },
    });
    // ================================= Brand slider End =========================

    // ================================= Product Shop slider End =========================
    var productSlider = new Swiper(".product-slider", {
      slidesPerView: 1,
      spaceBetween: 10,
      // centeredSlides: true,
      grabCursor: true,
      loop: true,
      autoplay: true,
      speed: 1000,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        425: {
          slidesPerView: 2,
        },
        576: {
          slidesPerView: 3,
        },
        768: {
          slidesPerView: 4,
        },
        992: {
          slidesPerView: 5,
        },
        1200: {
          slidesPerView: 6,
        },
      },
    });
    // ================================= Product Shop slider End =========================

    // ================================= Product Shop slider End =========================
    var productCategorySlider = new Swiper(".product-category-slider", {
      slidesPerView: 1,
      spaceBetween: 10,
      grabCursor: true,
      loop: true,
      autoplay: true,
      speed: 1000,
      pagination: {
        el: ".product-slider-pagination",
        clickable: true,
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        425: {
          slidesPerView: 1,
        },
        576: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        992: {
          slidesPerView: 3,
        },
        1200: {
          slidesPerView: 4,
        },
        1400: {
          slidesPerView: 5,
        },
        1600: {
          slidesPerView: 6,
        },
      },
    });
    // ================================= Product Shop slider End =========================

    // ================================= testimonials slider End =========================
    var testimonialsSlider = new Swiper(".testimonials-slider", {
      slidesPerView: 1,
      spaceBetween: 0,
      centeredSlides: true, // ✅ active slide centered
      grabCursor: true,
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      autoplay: true,
      speed: 1000,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      effect: "creative",
      creativeEffect: {
        limitProgress: 5,
        prev: {
          translate: ["-90%", "5%", -50], // X, Y, Z
          rotate: [2, -0, -10], // rotation
          origin: "bottom center",
        },
        next: {
          translate: ["90%", "5%", -50],
          rotate: [2, 0, 10],
          origin: "bottom center",
        },
      },
      breakpoints: {
        0: { slidesPerView: 1 },
        576: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        992: { slidesPerView: 4 },
        1300: { slidesPerView: 5 },
      },
    });
    // ================================= testimonials slider End =========================

    // ================================= service new slider Start =========================
    var serviceNewSmallSlider = new Swiper(".service-new-small-slider", {
      loop: true,
      spaceBetween: 0,
      slidesPerView: 5,
      freeMode: true,
      watchSlidesProgress: true,
      grabCursor: true,
      direction: "vertical",
    });

    var serviceNewSlider = new Swiper(".service-new-slider", {
      slidesPerView: 1,
      spaceBetween: 0,
      grabCursor: true,
      loop: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      autoplay: true,
      speed: 1000,
      effect: "fade",
      navigation: {
        prevEl: ".service-new-btn-prev",
        nextEl: ".service-new-btn-next",
      },
      thumbs: {
        swiper: serviceNewSmallSlider,
      },
    });
    // ================================= service new slider End =========================

    // ================================= testimonials slider End =========================
    var testimonialsNewSlider = new Swiper(".testimonials-new-slider", {
      slidesPerView: 1,
      spaceBetween: 0,
      centeredSlides: false, // ✅ active slide centered
      grabCursor: true,
      loop: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      autoplay: false,
      speed: 1000,
      effect: "fade",
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        prevEl: ".testimonials-new-btn-prev",
        nextEl: ".testimonials-new-btn-next",
      },
    });
    // ================================= testimonials slider End =========================

    // ================================= Testimonials Demand slider End =========================
    var testimonialsDemandSlider = new Swiper(".testimonials-demand-slider", {
      slidesPerView: 6,
      spaceBetween: 24,
      grabCursor: true,
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      autoplay: true,
      speed: 6000,
      autoplay: {
        delay: 0,
        enabled: true,
        reverseDirection: false,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        425: {
          slidesPerView: 1,
        },
        576: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 2,
        },
        992: {
          slidesPerView: 3,
        },
        1200: {
          slidesPerView: 4,
        },
        1500: {
          slidesPerView: 5,
        },
        1700: {
          slidesPerView: 6,
        },
      },
    });

    var testimonialsDemandSliderTwo = new Swiper(
      ".testimonials-demand-slider-two",
      {
        slidesPerView: 6,
        spaceBetween: 24,
        grabCursor: true,
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        autoplay: true,
        speed: 6000,
        autoplay: {
          delay: 0,
          enabled: true,
          reverseDirection: true,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        breakpoints: {
          0: {
            slidesPerView: 1,
          },
          425: {
            slidesPerView: 1,
          },
          576: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 2,
          },
          992: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 4,
          },
          1500: {
            slidesPerView: 5,
          },
          1700: {
            slidesPerView: 6,
          },
        },
      },
    );
    // ================================= Testimonials Demand slider End =========================

    // ================================= Testimonials Services slider End =========================
    var testimonialsHomeServiceSlider = new Swiper(
      ".testimonials-home-service-slider",
      {
        slidesPerView: 6,
        spaceBetween: 24,
        grabCursor: true,
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        autoplay: true,
        speed: 2000,
        pagination: {
          el: ".testimonials-home-service-slider-pagination",
          clickable: true,
        },
        breakpoints: {
          0: {
            slidesPerView: 1,
          },
          425: {
            slidesPerView: 1,
          },
          576: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 2,
          },
          992: {
            slidesPerView: 2,
          },
          1200: {
            slidesPerView: 3,
          },
        },
      },
    );
    // ================================= Testimonials Services slider End =========================

    // ====================== Blog Sidebar subscribe slider start ======================
    var subscribeSliderOne = new Swiper(".subscribe-slider-one", {
      slidesPerView: 3,
      grabCursor: true,
      loop: true,
      centeredSlides: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      speed: 6000,
      autoplay: {
        delay: 0,
        enabled: true,
        reverseDirection: false,
        disableOnInteraction: false,
      },
    });

    var subscribeSliderTwo = new Swiper(".subscribe-slider-two", {
      slidesPerView: 3,
      grabCursor: true,
      loop: true,
      centeredSlides: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      speed: 6000,
      autoplay: {
        delay: 0,
        enabled: true,
        reverseDirection: true,
        disableOnInteraction: false,
      },
    });
    // ====================== Blog Sidebar subscribe slider start ======================

    // ========================= Shop Details Slider Js Start =====================
    var shopSmallThumbs = new Swiper(".shop-small-thumbs", {
      loop: true,
      spaceBetween: 0,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesProgress: true,
    });
    var shopThumbs = new Swiper(".shop-thumbs", {
      loop: true,
      spaceBetween: 0,
      effect: "fade",
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      thumbs: {
        swiper: shopSmallThumbs,
      },
    });
    // ========================= Shop Details Slider Js End =====================

    // ================================= Testimonials Services slider End =========================
    var getStartedProductSliderOne = new Swiper(
      ".get-started-product-slider-one",
      {
        slidesPerView: 2,
        spaceBetween: 14,
        grabCursor: true,
        centeredSlides: true,
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        autoplay: true,
        speed: 6000,
        autoplay: {
          delay: 0,
          enabled: true,
          reverseDirection: false,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".testimonials-home-service-slider-pagination",
          clickable: true,
        },
        breakpoints: {
          0: {
            slidesPerView: 1,
          },
          425: {
            slidesPerView: 1,
          },
          576: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 2,
          },
          992: {
            slidesPerView: 2,
          },
          1200: {
            slidesPerView: 2,
          },
        },
      },
    );
    var getStartedProductSliderTwo = new Swiper(
      ".get-started-product-slider-two",
      {
        slidesPerView: 2,
        spaceBetween: 14,
        grabCursor: true,
        centeredSlides: true,
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        autoplay: true,
        speed: 6000,
        autoplay: {
          delay: 0,
          enabled: true,
          reverseDirection: true,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".testimonials-home-service-slider-pagination",
          clickable: true,
        },
        breakpoints: {
          0: {
            slidesPerView: 1,
          },
          425: {
            slidesPerView: 1,
          },
          576: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 2,
          },
          992: {
            slidesPerView: 2,
          },
          1200: {
            slidesPerView: 2,
          },
        },
      },
    );
    var getStartedProductSliderThree = new Swiper(
      ".get-started-product-slider-three",
      {
        slidesPerView: 2,
        spaceBetween: 14,
        grabCursor: true,
        centeredSlides: true,
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        autoplay: true,
        speed: 6000,
        autoplay: {
          delay: 0,
          enabled: true,
          reverseDirection: false,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".testimonials-home-service-slider-pagination",
          clickable: true,
        },
        breakpoints: {
          0: {
            slidesPerView: 1,
          },
          425: {
            slidesPerView: 1,
          },
          576: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 2,
          },
          992: {
            slidesPerView: 2,
          },
          1200: {
            slidesPerView: 2,
          },
        },
      },
    );
    var getStartedProductSliderFour = new Swiper(
      ".get-started-product-slider-four",
      {
        slidesPerView: 2,
        spaceBetween: 14,
        grabCursor: true,
        centeredSlides: true,
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        autoplay: true,
        speed: 6000,
        autoplay: {
          delay: 0,
          enabled: true,
          reverseDirection: true,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".testimonials-home-service-slider-pagination",
          clickable: true,
        },
        breakpoints: {
          0: {
            slidesPerView: 1,
          },
          425: {
            slidesPerView: 1,
          },
          576: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 2,
          },
          992: {
            slidesPerView: 2,
          },
          1200: {
            slidesPerView: 2,
          },
        },
      },
    );
    var getStartedProductSliderFive = new Swiper(
      ".get-started-product-slider-five",
      {
        slidesPerView: 2,
        spaceBetween: 14,
        grabCursor: true,
        centeredSlides: true,
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        autoplay: true,
        speed: 6000,
        autoplay: {
          delay: 0,
          enabled: true,
          reverseDirection: false,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".testimonials-home-service-slider-pagination",
          clickable: true,
        },
        breakpoints: {
          0: {
            slidesPerView: 1,
          },
          425: {
            slidesPerView: 1,
          },
          576: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 2,
          },
          992: {
            slidesPerView: 2,
          },
          1200: {
            slidesPerView: 2,
          },
        },
      },
    );
    // ================================= Testimonials Services slider End =========================

    // ================================= Blog New slider End =========================
    var blogNewSlider = new Swiper(".blog-new-slider", {
      slidesPerView: 1,
      spaceBetween: 10,
      grabCursor: true,
      loop: true,
      autoplay: false,
      speed: 1000,
      pagination: {
        el: ".blog-new-slider-pagination",
        clickable: true,
      },
      navigation: {
        prevEl: ".blog-new-btn-prev",
        nextEl: ".blog-new-btn-next",
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 1,
        },
        992: {
          slidesPerView: 2,
        },
        1200: {
          slidesPerView: 3,
        },
      },
    });
    // ================================= Blog New slider End =========================

    // ========================= Category sidebar show hide Js Start =====================
    $(".category-btn").on("click", function () {
      $(".banner-inner__sidebar").toggleClass("active");
      $(".side-overlay").toggleClass("show");
    });

    $(".side-overlay").on("click", function () {
      $(".banner-inner__sidebar").removeClass("active");
      closeMobileMenu();
    });
    // ========================= Category sidebar show hide Js End =====================

    // ========================= Category Dropdown on mobile device Js Start =====================
    $(".sidebar-list-item").on("click", function () {
      $(this).children(".sidebar-dropdown-menu").toggleClass("active");
    });
    // ========================= Category Dropdown on mobile device Js End =====================

    // ========================= Color Picker Js Start =====================
    $(document).on("click", ".color-picker", function () {
      $(".color-picker__color").css("transform", "scale(1)");

      $(this).find(".color-picker__color").css("transform", "scale(1.5)");
    });
    // ========================= Color Picker Js End =====================

    // ========================= Toggle class Js Start =====================
    $(document).on("click", ".toggle-btn", function () {
      // $(".color-picker__color").css("transform", "scale(1)");

      $(this).toggleClass('active');
    });
    // ========================= Toggle class Js End =====================

    // ========================= Mobile Menu Drawer Js Start =====================
    // Replaces the GSAP timeline that used to drive the mobile sidebar.
    // CSS does the rest: .mobile-menu.active -> translateX(0), .side-overlay.show -> visible
    function openMobileMenu() {
      $(".mobile-menu").addClass("active");
      $(".side-overlay").addClass("show");
      document.body.style.overflow = "hidden";
    }

    function closeMobileMenu() {
      $(".mobile-menu").removeClass("active");
      $(".side-overlay").removeClass("show");
      document.body.style.overflow = "";
    }

    $(document).on("click", ".toggle-mobileMenu", function (e) {
      e.preventDefault();
      openMobileMenu();
    });

    $(document).on("click", ".close-button", function (e) {
      e.preventDefault();
      closeMobileMenu();
    });

    // close when tapping a link inside the drawer
    $(document).on("click", ".mobile-menu a", function () {
      closeMobileMenu();
    });
    // ========================= Mobile Menu Drawer Js End =====================

    // ========================= Increment & Decrement Js Start =====================
    $(document).on("click", ".increment-btn", function () {
      const $input = $(this).siblings(".input-value");
      let count = parseInt($input.val(), 10);
      $input.val(count + 1);
    });

    $(document).on("click", ".decrement-btn", function () {
      const $input = $(this).siblings(".input-value");
      let count = parseInt($input.val(), 10);
      if (count > 0) {
        $input.val(count - 1);
      }
    });
    // ========================= Increment & Decrement Js End =====================

    // ========================= Custom accordion Js start =====================
    $(".custom-accordion-item__button").on("click", function () {
      let $parent = $(this).closest(".custom-accordion-item");

      // Remove active from all
      $(".custom-accordion-item").removeClass("active");

      // Add active to current
      $parent.addClass("active");

      // Optional: check the radio input
      $parent.find("input[type='radio']").prop("checked", true);
    });
    // ========================= Custom accordion Js End =====================

    // ====================== Marquee Js Start ========================
    if ($(".marquee_left").length) {
      $(".marquee_left").marquee({
        speed: 200,
        gap: 0,
        delayBeforeStart: 0,
        direction: $("html").attr("dir") === "rtl" ? "right" : "left",
        duplicated: true,
        pauseOnHover: true,
        startVisible: true,
        direction: "left",
      });
    }

    if ($(".marquee_right").length) {
      $(".marquee_right").marquee({
        speed: 200,
        gap: 0,
        delayBeforeStart: 0,
        direction: $("html").attr("dir") === "rtl" ? "right" : "left",
        duplicated: true,
        pauseOnHover: true,
        startVisible: true,
        direction: "right",
      });
    }
    // ====================== Marquee Js End ========================

    // ========================== Add Attribute For Bg Image Js Start ====================
    $(".background-img").css("background", function () {
      var bg = "url(" + $(this).data("background-image") + ")";
      return bg;
    });
    // ========================== Add Attribute For Bg Image Js End =====================

    // ========================= Category Js Start ===================
    let categoryButton = document.querySelector(".category-button");
    let categoryDropdown = document.querySelector(".category-dropdown");

    if (categoryButton && categoryDropdown) {
      categoryButton.addEventListener("click", function (event) {
        event.stopPropagation();
        this.classList.toggle("active");
        categoryDropdown.classList.toggle("active");
      });

      categoryDropdown.addEventListener("click", function (event) {
        event.stopPropagation();
        categoryButton.classList.add("active");
        categoryDropdown.classList.add("active");
      });

      document.querySelector("body").addEventListener("click", function () {
        categoryButton.classList.remove("active");
        categoryDropdown.classList.remove("active");
      });
    }
    // ========================= Category Js End ===================

    // ========================= typed js text Js Start ===================
    if ($(".typed-text").length) {
      var typing = new Typed(".typed-text", {
        strings: ["Creative", "Trending", "Modern"],
        typeSpeed: 60, // slower = smoother typing
        backSpeed: 40, // smooth deleting
        backDelay: 1500, // pause before deleting
        startDelay: 500, // delay before start
        loop: true,
        showCursor: false, // hide cursor
      });
    }
    // ========================= typed js text Js End ===================

    // ========================= magnific Popup Js Start =====================
    $(".play-button").magnificPopup({
      type: "iframe",
      removalDelay: 300,
      mainClass: "mfp-fade",
    });
    // ========================= magnific Popup Js End =====================

    // ========================= Counter Up Js End ===================
    const counterUp = window.counterUp.default;

    const callback = (entries) => {
      entries.forEach((entry) => {
        const el = entry.target;
        if (entry.isIntersecting && !el.classList.contains("is-visible")) {
          counterUp(el, {
            duration: 1500,
            delay: 16,
          });
          el.classList.add("is-visible");
        }
      });
    };
    const IO = new IntersectionObserver(callback, { threshold: 1 });

    // Banner statistics Counter
    const statisticsCounter = document.querySelectorAll(".counter");
    if (statisticsCounter.length > 0) {
      statisticsCounter.forEach((counterNumber) => {
        IO.observe(counterNumber);
      });
    }

    // performance Count
    const performanceCount = document.querySelectorAll(".counter");
    if (performanceCount.length > 0) {
      performanceCount.forEach((counterNumber) => {
        IO.observe(counterNumber);
      });
    }
    // ========================= Counter Up Js End ===================
  });
  // ==========================================
  //      End Document Ready function
  // ==========================================

  // ========================= Header Sticky Js Start ==============
  $(window).on("scroll", function () {
    if ($(window).scrollTop() >= 260) {
      $(".header").addClass("fixed-header");
    } else {
      $(".header").removeClass("fixed-header");
    }
  });
  // ========================= Header Sticky Js End===================

  //  ==================== bottom blur shadow js start ====================
  $(window).on("scroll", function () {
    if (
      $(window).scrollTop() + $(window).height() >=
      $(document).height() - 5
    ) {
      $(".blur-bottom-shadow").css({
        opacity: "0",
        visibility: "hidden",
      });
    } else {
      $(".blur-bottom-shadow").css({
        opacity: "1",
        visibility: "visible",
      });
    }
  });
  //  ==================== bottom blur shadow js end ====================
})(jQuery);
