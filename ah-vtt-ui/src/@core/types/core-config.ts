// prettier-ignore
export interface CoreConfig {

  app             : {
    appName     : string;
    appTitle    : string;
    appLogoImage: string;
    appLanguage :'en' | 'fr' | 'de' | 'pt';
  };
  layout: {
    skin : 'default' | 'bordered' | 'dark' | 'semi-dark';
    type : 'vertical' | 'horizontal';
    animation: 'fadeInLeft'| 'zoomIn' | 'fadeIn'| 'none';
    menu : {
      hidden               : boolean;
      collapsed            : boolean;
    };
    navbar: {
      hidden               : boolean;
      type                 : 'navbar-static-top' | 'fixed-top' | 'floating-nav' | 'd-none';
      background           : 'navbar-dark' | 'navbar-light';
      customBackgroundColor: boolean;
      backgroundColor      : string;
    };
    footer: {
      hidden               : boolean;
      type                 : 'footer-static' | 'footer-sticky' | 'd-none';
      background           : 'footer-dark' | 'footer-light';
      customBackgroundColor: boolean;
      backgroundColor      : string;
    };
    enableLocalStorage: boolean;
    customizer: boolean;
    scrollTop: boolean;
    buyNow: boolean;
  };
}
