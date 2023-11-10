import { snippetCode } from '@core/components/card-snippet/card-snippet.component';

export const snippetCodeSwiperDefault: snippetCode = {
  html: `
  <div class="swiper-default swiper-container" [swiper]>
    <div class="swiper-wrapper">
      <div class="swiper-slide"> <img class="img-fluid" src="assets/images/banner/banner-1.jpg" alt="banner">
      </div>
      <div class="swiper-slide"> <img class="img-fluid" src="assets/images/banner/banner-2.jpg" alt="banner">
      </div>
      <div class="swiper-slide"> <img class="img-fluid" src="assets/images/banner/banner-4.jpg" alt="banner">
      </div>
      <div class="swiper-slide"> <img class="img-fluid" src="assets/images/banner/banner-13.jpg" alt="banner">
      </div>
      <div class="swiper-slide"> <img class="img-fluid" src="assets/images/banner/banner-7.jpg" alt="banner">
      </div>
    </div>
  </div>
  `
};

export const snippetCodeSwiperNavigations: snippetCode = {
  html: `
  <div class="swiper-navigations swiper-container" [swiper]="swiperNavigations">
    <div class="swiper-wrapper">
      <div class="swiper-slide">
        <img class="img-fluid" src="assets/images/banner/banner-7.jpg" alt="banner">
      </div>
      <div class="swiper-slide">
        <img class="img-fluid" src="assets/images/banner/banner-4.jpg" alt="banner">
      </div>
      <div class="swiper-slide">
        <img class="img-fluid" src="assets/images/banner/banner-14.jpg" alt="banner">
      </div>
      <div class="swiper-slide">
        <img class="img-fluid" src="assets/images/banner/banner-3.jpg" alt="banner">
      </div>
      <div class="swiper-slide">
        <img class="img-fluid" src="assets/images/banner/banner-2.jpg" alt="banner">
      </div>
    </div>
    <!-- Add Arrows -->
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
  `,
  ts: `
  public swiperNavigations: SwiperConfigInterface = {
    navigation: true
  };
  `
};

export const snippetCodeSwiperPaginations: snippetCode = {
  html: `
  <swiper class="swiper-paginations swiper-container" [config]="swiperPaginations">
    <img class="img-fluid" src="assets/images/banner/banner-12.jpg" alt="banner">
    <img class="img-fluid" src="assets/images/banner/banner-9.jpg" alt="banner">
    <img class="img-fluid" src="assets/images/banner/banner-8.jpg" alt="banner">
    <img class="img-fluid" src="assets/images/banner/banner-7.jpg" alt="banner">
    <img class="img-fluid" src="assets/images/banner/banner-20.jpg" alt="banner">
  </swiper>
  `,
  ts: `
  public swiperPaginations: SwiperConfigInterface = {
    pagination: true
  };
  `
};

export const snippetCodeSwiperProgress: snippetCode = {
  html: `
  <swiper class="swiper-progress swiper-container" [config]="swiperProgress" [(index)]="index">
    <img class="img-fluid" src="assets/images/banner/banner-8.jpg" alt="banner">
    <img class="img-fluid" src="assets/images/banner/banner-7.jpg" alt="banner">
    <img class="img-fluid" src="assets/images/banner/banner-20.jpg" alt="banner">
    <img class="img-fluid" src="assets/images/banner/banner-5.jpg" alt="banner">
    <img class="img-fluid" src="assets/images/banner/banner-4.jpg" alt="banner">
  </swiper>
  `,
  ts: `
  public swiperProgress: SwiperConfigInterface = {
    pagination: {
      el: '.swiper-pagination',
      type: 'progressbar'
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  };
  `
};

export const snippetCodeSwiperMultiple: snippetCode = {
  html: `
    <swiper class="swiper-multiple swiper-container" [config]="swiperMultiple">
      <img class="img-fluid" src="assets/images/banner/banner-31.jpg" alt="banner">
      <img class="img-fluid" src="assets/images/banner/banner-32.jpg" alt="banner">
      <img class="img-fluid" src="assets/images/banner/banner-33.jpg" alt="banner">
      <img class="img-fluid" src="assets/images/banner/banner-34.jpg" alt="banner">
      <img class="img-fluid" src="assets/images/banner/banner-35.jpg" alt="banner">
    </swiper>
  `,
  ts: `
  public swiperMultiple: SwiperConfigInterface = {
    slidesPerView: 3,
    spaceBetween: 30,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    }
  };
  `
};

export const snippetCodeSwiperCenteredSlides1: snippetCode = {
  html: `
  <swiper class="swiper-centered-slides swiper-container p-1" [config]="swiperswiperCenteredSlides">
    <div class="swiper-slide rounded swiper-shadow"> <i class="feather icon-gitlab font-large-1"></i>
      <div class="swiper-text pt-md-1 pt-sm-50">Getting Started</div>
    </div>
    <div class="swiper-slide rounded swiper-shadow"> <i class="feather icon-facebook font-large-1"></i>
      <div class="swiper-text pt-md-1 pt-sm-50">Pricing & Plans</div>
    </div>
    <div class="swiper-slide rounded swiper-shadow"> <i class="feather icon-twitter font-large-1"></i>
      <div class="swiper-text pt-md-1 pt-sm-50">Sales Question</div>
    </div>
    <div class="swiper-slide rounded swiper-shadow"> <i class="feather icon-instagram font-large-1"></i>
      <div class="swiper-text pt-md-1 pt-sm-50">Usage Guides</div>
    </div>
    <div class="swiper-slide rounded swiper-shadow"> <i class="feather icon-github font-large-1"></i>
      <div class="swiper-text pt-md-1 pt-sm-50">General Guide</div>
    </div>
  </swiper>
  `,
  ts: `
  public swiperswiperCenteredSlides: SwiperConfigInterface = {
    slidesPerView: 5,
    centeredSlides: true,
    spaceBetween: 30,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  };
  `
};

export const snippetCodeSwiperCenteredSlides2: snippetCode = {
  html: `
  <swiper class="swiper-centered-slides-2 swiper-container" [config]="swiperCenteredSlides2">
    <div class="swiper-slide rounded swiper-shadow py-1 px-3 d-flex">
      <i class="feather icon-twitter mr-50 font-medium-3"></i>
      <div class="swiper-text">Getting Started</div>
    </div>
    <div class="swiper-slide rounded swiper-shadow py-1 px-3 d-flex">
      <i class="feather icon-facebook mr-50 font-medium-3"></i>
      <div class="swiper-text">Pricing & Plans</div>
    </div>
    <div class="swiper-slide rounded swiper-shadow py-1 px-3 d-flex">
      <i class="feather icon-gitlab mr-50 font-medium-3"></i>
      <div class="swiper-text">Sales Question</div>
    </div>
    <div class="swiper-slide rounded swiper-shadow py-1 px-3 d-flex">
      <i class="feather icon-instagram mr-50 font-medium-3"></i>
      <div class="swiper-text">Usage Guides</div>
    </div>
    <div class="swiper-slide rounded swiper-shadow py-1 px-3 d-flex">
      <i class="feather icon-github mr-50 font-medium-3"></i>
      <div class="swiper-text">General Guide</div>
    </div>
  </swiper>
  `,
  ts: `
  public swiperCenteredSlides2: SwiperConfigInterface = {
    slidesPerView: 5,
    centeredSlides: true,
    spaceBetween: 30,
    slideToClickedSlide: true
  };
  `
};

export const snippetCodeSwiperFadeEffect: snippetCode = {
  html: `
  <swiper class="swiper-fade-effect swiper-container" [config]="swiperFadeEffect">
    <img class="img-fluid" src="assets/images/banner/banner-20.jpg" alt="banner">
    <img class="img-fluid" src="assets/images/banner/banner-19.jpg" alt="banner">
    <img class="img-fluid" src="assets/images/banner/banner-18.jpg" alt="banner">
    <img class="img-fluid" src="assets/images/banner/banner-17.jpg" alt="banner">
    <img class="img-fluid" src="assets/images/banner/banner-16.jpg" alt="banner">
  </swiper>
  `,
  ts: `
  public swiperFadeEffect: SwiperConfigInterface = {
    spaceBetween: 30,
    effect: 'fade',
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  };
  `
};

export const snippetCodeSwiperCubeEffect: snippetCode = {
  html: `
  <swiper class="swiper-cube-effect swiper-container" [config]="swiperCubeEffect">
    <img class="img-fluid" src="assets/images/banner/banner-21.jpg" alt="banner">
    <img class="img-fluid" src="assets/images/banner/banner-22.jpg" alt="banner">
    <img class="img-fluid" src="assets/images/banner/banner-23.jpg" alt="banner">
    <img class="img-fluid" src="assets/images/banner/banner-24.jpg" alt="banner">
  </swiper>
  `,
  ts: `
  public swiperCubeEffect: SwiperConfigInterface = {
    effect: 'cube',
    grabCursor: true,
    cubeEffect: {
      shadow: true,
      slideShadows: true,
      shadowOffset: 20,
      shadowScale: 0.94
    },
    pagination: {
      el: '.swiper-pagination'
    }
  };
  `
};

export const snippetCodeSwiperCoverflow: snippetCode = {
  html: `
  <swiper class="swiper-coverflow swiper-container" [config]="swiperCoverflow">

    <img class="img-fluid" src="assets/images/banner/banner-35.jpg" alt="banner">
    <img class="img-fluid" src="assets/images/banner/banner-39.jpg" alt="banner">
    <img class="img-fluid" src="assets/images/banner/banner-38.jpg" alt="banner">
    <img class="img-fluid" src="assets/images/banner/banner-37.jpg" alt="banner">
    <img class="img-fluid" src="assets/images/banner/banner-36.jpg" alt="banner">
    <img class="img-fluid" src="assets/images/banner/banner-34.jpg" alt="banner">
    <img class="img-fluid" src="assets/images/banner/banner-33.jpg" alt="banner">
    <img class="img-fluid" src="assets/images/banner/banner-32.jpg" alt="banner">
    <img class="img-fluid" src="assets/images/banner/banner-31.jpg" alt="banner">
  </swiper>
  `,
  ts: `
  public swiperCoverflow: SwiperConfigInterface = {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true
    },
    pagination: {
      el: '.swiper-pagination'
    }
  };
  `
};

export const snippetCodeSwiperAutoplay: snippetCode = {
  html: `
  <swiper class="swiper-autoplay swiper-container" [config]="swiperAutoplay">
    <img class="img-fluid" src="assets/images/banner/banner-20.jpg" alt="banner">
    <img class="img-fluid" src="assets/images/banner/banner-7.jpg" alt="banner">
    <img class="img-fluid" src="assets/images/banner/banner-8.jpg" alt="banner">
    <img class="img-fluid" src="assets/images/banner/banner-9.jpg" alt="banner">
    <img class="img-fluid" src="assets/images/banner/banner-10.jpg" alt="banner">
    <img class="img-fluid" src="assets/images/banner/banner-11.jpg" alt="banner">
  </swiper>
  `,
  ts: `
  public swiperAutoplay: SwiperConfigInterface = {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  };
  `
};

export const snippetCodeSwiperLazy: snippetCode = {
  html: `
  <div class="swiper-lazy-loading swiper-container" [swiper]="swiperLazy">
    <div class="swiper-wrapper">
      <div class="swiper-slide">
        <!-- Required swiper-lazy class and image source specified in data-src attribute -->
        <img src="assets/images/banner/banner-9.jpg" class="swiper-lazy img-fluid" alt="banner">
        <!-- Preloader image -->
        <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
      </div>
      <div class="swiper-slide">
        <img src="assets/images/banner/banner-8.jpg" class="swiper-lazy img-fluid" alt="banner">
        <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
      </div>
      <div class="swiper-slide">
        <img src="assets/images/banner/banner-7.jpg" class="swiper-lazy img-fluid" alt="banner">
        <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
      </div>
      <div class="swiper-slide">
        <img src="assets/images/banner/banner-20.jpg" class="swiper-lazy img-fluid" alt="banner">
        <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
      </div>
      <div class="swiper-slide">
        <img src="assets/images/banner/banner-5.jpg" class="swiper-lazy img-fluid" alt="banner">
        <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
      </div>
      <div class="swiper-slide">
        <img src="assets/images/banner/banner-4.jpg" class="swiper-lazy img-fluid" alt="banner">
        <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
      </div>
    </div>

    <!-- Add Pagination -->
    <div class="swiper-pagination swiper-pagination-white"></div>
    <!-- Navigation -->
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
  `,
  ts: `
  public swiperLazy: SwiperConfigInterface = {
    lazy: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  };
  `
};

export const snippetCodeSwiperResponsive: snippetCode = {
  html: `
  <div class="swiper-responsive-breakpoints swiper-container" [swiper]="swiperResponsive">
    <div class="swiper-wrapper">
      <div class="swiper-slide"><img class="img-fluid" src="assets/images/banner/banner-30.jpg" alt="banner">
      </div>
      <div class="swiper-slide"><img class="img-fluid" src="assets/images/banner/banner-31.jpg" alt="banner">
      </div>
      <div class="swiper-slide"><img class="img-fluid" src="assets/images/banner/banner-32.jpg" alt="banner">
      </div>
      <div class="swiper-slide"><img class="img-fluid" src="assets/images/banner/banner-33.jpg" alt="banner">
      </div>
      <div class="swiper-slide"><img class="img-fluid" src="assets/images/banner/banner-34.jpg" alt="banner">
      </div>
      <div class="swiper-slide"><img class="img-fluid" src="assets/images/banner/banner-35.jpg" alt="banner">
      </div>
      <div class="swiper-slide"><img class="img-fluid" src="assets/images/banner/banner-36.jpg" alt="banner">
      </div>
      <div class="swiper-slide"><img class="img-fluid" src="assets/images/banner/banner-37.jpg" alt="banner">
      </div>
      <div class="swiper-slide"><img class="img-fluid" src="assets/images/banner/banner-38.jpg" alt="banner">
      </div>
    </div>
    <!-- Add Pagination -->
    <div class="swiper-pagination"></div>
  </div>
  `,
  ts: `
  public swiperResponsive: SwiperConfigInterface = {
    slidesPerView: 5,
    spaceBetween: 50,
    // init: false,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    breakpoints: {
      1024: {
        slidesPerView: 4,
        spaceBetween: 40
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 30
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      320: {
        slidesPerView: 1,
        spaceBetween: 10
      }
    }
  };
  `
};
