let burger = document.querySelector(".header__burger");
let menu = document.querySelector(".header__nav-cont");
let menuLinks = menu.querySelectorAll(".header__nav-link");
let menuEnter = menu.querySelectorAll(".header__enter-btn");

burger.addEventListener("click", function () {
  burger.classList.toggle("burger--active");
  menu.classList.toggle("nav-cont--active");
  document.body.classList.toggle("stop-scroll");
});

menuLinks.forEach(function (el) {
  el.addEventListener("click", function () {
    burger.classList.remove("burger--active");
    menu.classList.remove("nav-cont--active");
    document.body.classList.remove("stop-scroll");
  });
});

menuEnter.forEach(function (el) {
  el.addEventListener("click", function () {
    burger.classList.remove("burger--active");
    menu.classList.remove("nav-cont--active");
    document.body.classList.remove("stop-scroll");
  });
});

function setSearch(params) {
  const openBtn = document.querySelector(`.${params.openBtnClass}`);
  const search = document.querySelector(`.${params.searchClass}`);
  const closeBtn = search.querySelector(`.${params.closeBtnClass}`);

  search.addEventListener("animationend", function (evt) {
    if (this._isOpened) {
      this.classList.remove(params.activeClass);
      this.classList.remove(params.hiddenClass);
      this._isOpened = false;
    } else {
      this._isOpened = true;
    }
  });

  search.addEventListener("click", function (evt) {
    evt._isSearch = true;
  });

  openBtn.addEventListener("click", function (evt) {
    this.disabled = true;
    this.classList.add("invisible");

    if (
      !search.classList.contains(params.activeClass) &&
      !search.classList.contains(params.hiddenClass)
    ) {
      search.classList.add(params.activeClass);
    }
  });

  closeBtn.addEventListener("click", function () {
    openBtn.disabled = false;
    openBtn.classList.remove("invisible");
    search.classList.add(params.hiddenClass);
  });

  document.body.addEventListener("click", function (evt) {
    if (!evt._isSearch && search._isOpened) {
      openBtn.disabled = false;
      search.classList.add(params.hiddenClass);
    }
  });
}

setSearch({
  openBtnClass: "search--adaptive",
  closeBtnClass: "search__close",
  searchClass: "search__form",
  activeClass: "search--active",
  hiddenClass: "search--inactive",
});

const params = {
  btnClassName: "header__list-btn",
  dropClassName: "header__dropdown",
  activeClassName: "is-active",
  disabledClassName: "is-disabled",
};

function onDisable(evt) {
  if (evt.target.classList.contains(params.disabledClassName)) {
    evt.target.classList.remove(
      params.disabledClassName,
      params.activeClassName
    );
    evt.target.removeEventListener("animationend", onDisable);
  }
}

function setMenuListener() {
  document.body.addEventListener("click", (evt) => {
    const activeElements = document.querySelectorAll(
      `.${params.btnClassName}.${params.activeClassName}, .${params.dropClassName}.${params.activeClassName}`
    );

    if (
      activeElements.length &&
      !evt.target.closest(`.${params.activeClassName}`)
    ) {
      activeElements.forEach((current) => {
        if (current.classList.contains(params.btnClassName)) {
          current.classList.remove(params.activeClassName);
        } else {
          current.classList.add(params.disabledClassName);
        }
      });
    }

    if (evt.target.closest(`.${params.btnClassName}`)) {
      const btn = evt.target.closest(`.${params.btnClassName}`);
      const path = btn.dataset.path;
      const drop = document.querySelector(
        `.${params.dropClassName}[data-target="${path}"]`
      );

      btn.classList.toggle(params.activeClassName);

      if (!drop.classList.contains(params.activeClassName)) {
        drop.classList.add(params.activeClassName);
        drop.addEventListener("animationend", onDisable);
      } else {
        drop.classList.add(params.disabledClassName);
      }
    }
  });
}

setMenuListener();

function smoothScroll() {
  document.querySelectorAll(".js-scroll-link").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const href = this.getAttribute("href").substring(1);
      const scrollTarget = document.getElementById(href);
      const elementPosition = scrollTarget.getBoundingClientRect().top;

      window.scrollBy({
        top: elementPosition,
        behavior: "smooth",
      });
    });
  });
}

const swiper__hero = new Swiper(".body__swiper", {
  direction: "horizontal",
  loop: true,
  effect: "fade",
  speed: 10000,
  autoplay: {
    delay: 10000,
  },
});

const element = document.querySelector("#selectCustom");
const choices = new Choices(element, {
  searchEnabled: false,
  itemSelectText: "",
});

const swiper = new Swiper(".gallery__swiper", {
  direction: "horizontal",
  loop: false,
  slidesPerGroup: 3,
  slidesPerView: 3,
  spaceBetween: 50,
  breakpoints: {
    0: {
      slidesPerGroup: 1,
      slidesPerView: 1,
      spaceBetween: 5,
    },

    321: {
      slidesPerGroup: 1,
      slidesPerView: 1,
      spaceBetween: 34,
    },

    686: {
      slidesPerGroup: 1,
      slidesPerView: 2,
      spaceBetween: 34,
    },

    769: {
      slidesPerGroup: 2,
      slidesPerView: 2,
      spaceBetween: 32,
    },

    1139: {
      slidesPerGroup: 2,
      slidesPerView: 2,
      spaceBetween: 38,
    },

    1626: {
      slidesPerGroup: 3,
      slidesPerView: 3,
      spaceBetween: 50,
    },
  },

  pagination: {
    el: ".gallery__swiper-pagination",
    type: "fraction",
  },

  navigation: {
    nextEl: ".gallery__swiper-button-next",
    prevEl: ".gallery__swiper-button-prev",
  },
});

const btn = document.querySelectorAll(".gallery__swiper-btn");
const modalOver = document.querySelector(".gallery__modal-overlay ");
const modal = document.querySelectorAll(".gallery__modal");
const modalClose = document.querySelectorAll(".gallery__modal-close");

btn.forEach((el) => {
  el.addEventListener("click", (e) => {
    let path = e.currentTarget.getAttribute("data-path");

    document
      .querySelector(`[data-target="${path}"]`)
      .classList.add("gallery__modal--visible");
    document.body.classList.toggle("stop-scroll");
    modalOver.classList.add("gallery__modal-overlay--visible");
  });
});

modalOver.addEventListener("click", (e) => {
  console.log(e.target);

  if (e.target == modalOver) {
    document.body.classList.remove("stop-scroll");
    modalOver.classList.remove("gallery__modal-overlay--visible");
    modal.forEach((el) => {
      el.classList.remove("gallery__modal--visible");
    });
  }
});
modalClose.forEach(function (el) {
  el.addEventListener("click", function () {
    modalOver.classList.remove("gallery__modal-overlay--visible");
    modal.forEach((el) => {
      el.classList.remove("gallery__modal--visible");
    });
    document.body.classList.remove("stop-scroll");
  });
});

(() => {
  new Accordion(".accordion__list", {
    openOnInit: [0],
  });
})();

document
  .querySelectorAll(".accordion__columns-btn")
  .forEach(function (tabsBtn) {
    tabsBtn.addEventListener("click", function (e) {
      const step = e.currentTarget.dataset.step;
      document
        .querySelectorAll(".accordion__columns-btn")
        .forEach(function (btn) {
          btn.classList.remove("button--active");
        });
      e.currentTarget.classList.add("button--active");
      document.querySelectorAll(".catalog__card").forEach(function (tabsBtn) {
        tabsBtn.classList.remove("card--active");
      });
      document
        .querySelector(`[data-target="${step}"]`)
        .classList.add("card--active");
    });
  });

const swiper_2 = new Swiper(".events__swiper", {
  direction: "horizontal",
  loop: false,
  slidesPerGroup: 1,
  slidesPerView: 3,
  spaceBetween: 50,
  breakpoints: {
    0: {
      slidesPerGroup: 1,
      slidesPerView: 1,
      spaceBetween: 23,
    },

    321: {
      slidesPerGroup: 1,
      slidesPerView: 1,
      spaceBetween: 50,
    },
    581: {
      slidesPerGroup: 2,
      slidesPerView: 2,
      spaceBetween: 34,
    },
    769: {
      slidesPerGroup: 2,
      slidesPerView: 3,
      spaceBetween: 27,
    },
    1025: {
      slidesPerView: 3,
      slidesPerGroup: 1,
      spaceBetween: 45,
    },
  },

  pagination: {
    el: ".events__swiper-pagination",
    type: "bullets",
  },

  navigation: {
    nextEl: ".events__swiper-button-next",
    prevEl: ".events__swiper-button-prev",
  },
});

tippy(".projects__tooltip", {
  theme: "purple",
  maxWidth: 264,
});

const swiper_3 = new Swiper(".projects__swiper", {
  direction: "horizontal",
  loop: false,
  slidesPerGroup: 1,
  slidesPerView: 3,
  spaceBetween: 50,

  navigation: {
    nextEl: ".projects__swiper-button-next",
    prevEl: ".projects__swiper-button-prev",
  },
  breakpoints: {
    0: {
      slidesPerGroup: 1,
      slidesPerView: 1,
      spaceBetween: 10,
    },
    321: {
      slidesPerGroup: 1,
      slidesPerView: 1,
      spaceBetween: 34,
    },
    687: {
      slidesPerGroup: 1,
      slidesPerView: 2,
      spaceBetween: 34,
    },
    769: {
      slidesPerGroup: 1,
      slidesPerView: 2,
      spaceBetween: 48,
    },
    1025: {
      slidesPerGroup: 1,
      slidesPerView: 3,
      spaceBetween: 50,
    },
    1600: {
      slidesPerGroup: 1,
      slidesPerView: 3,
      spaceBetween: 50,
    },
  },
});

var telSelector = document.querySelector("input[type='tel']");
var im = new Inputmask("+7 (999) 999-99-99");
im.mask(telSelector);

const validation = new JustValidate(".contacts__form", {
  errorFieldCssClass: "is-invalid",
  errorLabelStyle: {
    color: "#D11616",
  },
});

validation
  .addField("#name", [
    {
      rule: "minLength",
      value: 3,
      errorMessage: "Недопустимый формат",
    },
    {
      rule: "maxLength",
      value: 30,
      errorMessage: "Недопустимый формат",
    },
    {
      rule: "required",
      errorMessage: "Вы не ввели имя",
    },
  ])

  .addField("#tel", [
    {
      rule: "required",
      errorMessage: "Вы не ввели телефон",
    },
    {
      rule: "function",
      validator: function () {
        const phone = telSelector.inputmask.unmaskedvalue();
        return phone.length === 10;
      },
      errorMessage: "Недопустимый формат",
    },
  ])

  .onSuccess((event) => {
    let formData = new FormData(event.target);

    console.log(...formData);

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          console.log("Отправлено");
        }
      }
    };

    xhr.open("POST", "mail.php", true);
    xhr.send(formData);

    event.target.reset();
  });

ymaps.ready(init);

function init() {
  var myMap = new ymaps.Map(
    "YandexMap",
    {
      center: [55.758468, 37.601088],
      zoom: 14,
      controls: ["geolocationControl", "zoomControl"],
    },
    {
      suppressMapOpenBlock: true,
      geolocationControlSize: "large",
      geolocationControlPosition: { top: "200px", right: "20px" },
      geolocationControlFloat: "none",
      zoomControlSize: "small",
      zoomControlFloat: "none",
      zoomControlPosition: { top: "120px", right: "20px" },
    }
  );

  myMap.behaviors.disable("scrollZoom");

  var myPlacemark = new ymaps.Placemark(
    [55.758468, 37.601088],
    {},
    {
      iconLayout: "default#image",
      iconImageHref: "/img/contacts/map-marker.svg",
      iconImageSize: [20, 20],
    }
  );

  myMap.geoObjects.add(myPlacemark);
  myMap.container.fitToViewport();
}
