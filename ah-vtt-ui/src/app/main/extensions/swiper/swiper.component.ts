import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

import * as snippet from 'app/main/extensions/swiper/swiper.snippetcode';

@Component({
  selector: 'app-swiper',
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SwiperComponent implements OnInit {
  // public
  public contentHeader: object;
  public centeredSlideIndex = 2;
  public centeredSlide2Index = 2;

  // snippet code variables
  public _snippetCodeSwiperDefault = snippet.snippetCodeSwiperDefault;
  public _snippetCodeSwiperNavigations = snippet.snippetCodeSwiperNavigations;
  public _snippetCodeSwiperPaginations = snippet.snippetCodeSwiperPaginations;
  public _snippetCodeSwiperProgress = snippet.snippetCodeSwiperProgress;
  public _snippetCodeSwiperMultiple = snippet.snippetCodeSwiperMultiple;
  public _snippetCodeSwiperCenteredSlides1 = snippet.snippetCodeSwiperCenteredSlides1;
  public _snippetCodeSwiperCenteredSlides2 = snippet.snippetCodeSwiperCenteredSlides2;
  public _snippetCodeSwiperFadeEffect = snippet.snippetCodeSwiperFadeEffect;
  public _snippetCodeSwiperCubeEffect = snippet.snippetCodeSwiperCubeEffect;
  public _snippetCodeSwiperCoverflow = snippet.snippetCodeSwiperCoverflow;
  public _snippetCodeSwiperAutoplay = snippet.snippetCodeSwiperAutoplay;
  public _snippetCodeSwiperLazy = snippet.snippetCodeSwiperLazy;
  public _snippetCodeSwiperResponsive = snippet.snippetCodeSwiperResponsive;

  // swiper
  public swiperNavigations: SwiperConfigInterface = {
    navigation: true
  };

  public swiperPaginations: SwiperConfigInterface = {
    pagination: true
  };

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

  public swiperMultiple: SwiperConfigInterface = {
    slidesPerView: 3,
    spaceBetween: 30,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    }
  };

  public swiperswiperCenteredSlides: SwiperConfigInterface = {
    slidesPerView: 5,
    centeredSlides: true,
    spaceBetween: 30,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  };

  public swiperCenteredSlides2: SwiperConfigInterface = {
    slidesPerView: 5,
    centeredSlides: true,
    spaceBetween: 30,
    slideToClickedSlide: true
  };

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

  constructor() {}

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit() {
    // content header
    this.contentHeader = {
      headerTitle: 'Swiper',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Home',
            isLink: true,
            link: '/'
          },
          {
            name: 'Extensions',
            isLink: true,
            link: '/'
          },
          {
            name: 'Swiper',
            isLink: false
          }
        ]
      }
    };
  }
}
