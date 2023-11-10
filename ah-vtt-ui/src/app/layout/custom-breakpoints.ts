import { BREAKPOINT } from '@angular/flex-layout';

const BS_BREAKPOINTS = [
  { alias: 'bs-xs', overlapping: false, mediaQuery: '(max-width: 575.98px)', suffix: 'BsXs' },
  { alias: 'bs-sm', overlapping: false, mediaQuery: '(min-width: 576px) and (max-width: 767.98px)', suffix: 'BsSm' },
  { alias: 'bs-md', overlapping: false, mediaQuery: '(min-width: 768px) and (max-width: 991.98px)', suffix: 'BsMd' },
  { alias: 'bs-lg', overlapping: false, mediaQuery: '(min-width: 992px) and (max-width: 1199.98px)', suffix: 'BsLg' },
  { alias: 'bs-xl', overlapping: false, mediaQuery: '(min-width: 1200px)', suffix: 'BsXl' },

  { alias: 'bs-gt-sm', overlapping: false, mediaQuery: '(min-width: 576px)', suffix: 'BsGtSm' },
  { alias: 'bs-gt-md', overlapping: false, mediaQuery: '(min-width: 768px)', suffix: 'BsGtMd' },
  { alias: 'bs-gt-lg', overlapping: false, mediaQuery: '(min-width: 992px)', suffix: 'BsGtLg' },
  { alias: 'bs-gt-xl', overlapping: false, mediaQuery: '(min-width: 1200px)', suffix: 'BsGtXl' },

  { alias: 'bs-lt-sm', overlapping: false, mediaQuery: '(max-width: 575.98px)', suffix: 'BsLtSm' },
  { alias: 'bs-lt-md', overlapping: false, mediaQuery: '(max-width: 767.98px)', suffix: 'BsLtMd' },
  { alias: 'bs-lt-lg', overlapping: false, mediaQuery: '(max-width: 991.98px)', suffix: 'BsLtLg' },
  { alias: 'bs-lt-xl', overlapping: false, mediaQuery: '(max-width: 1199.98px)', suffix: 'BsLtXl' }
];

export const CustomBreakPointsProvider = {
  provide: BREAKPOINT,
  useValue: BS_BREAKPOINTS,
  multi: true
};
