import { trigger, transition, style, query, group, animateChild, animate, keyframes } from '@angular/animations';

// Animation: FadeInLeft
export const fadeInLeft = trigger('fadeInLeft', [
  transition('* => *', [
    query(
      ':enter, :leave',
      style({ position: 'absolute', left: 0, width: '100%', paddingRight: '2rem', paddingLeft: '2rem', opacity: 0 }),
      {
        optional: true
      }
    ),
    query(':enter', style({ transform: 'translateX(-100%)', opacity: 0 }), { optional: true }),

    group([
      query(
        ':leave',
        [
          style({ transform: 'translateX(0%)' }),
          animate('600ms ease', style({ opacity: 1, transform: 'translateX(100%)' }))
        ],
        { optional: true }
      ),
      query(':enter', [animate('800ms ease', style({ opacity: 1, transform: 'translateX(0%)' })), animateChild()], {
        optional: true
      })
    ])
  ])
]);

// Animation: ZoomIn
export const zoomIn = trigger('zoomIn', [
  transition('* <=> *', [
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          left: 0,
          width: '100%',
          paddingRight: '2rem',
          paddingLeft: '2rem',
          opacity: 0,
          transform: 'scale(0.5) translateY(-20%)'
        })
      ],
      { optional: true }
    ),
    query(
      ':enter',
      [
        animate(
          '400ms ease',
          style({ opacity: 1, paddingRight: '2rem', paddingLeft: '2rem', transform: 'scale(1) translateY(0)' })
        )
      ],
      {
        optional: true
      }
    )
  ])
]);

// Animation: FadeIn
export const fadeIn = trigger('fadeIn', [
  transition('* <=> *', [
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          left: 0,
          width: '100%',
          paddingRight: '2rem',
          paddingLeft: '2rem',
          opacity: 0
        })
      ],
      { optional: true }
    ),
    query(':enter', [animate('500ms ease', style({ opacity: 1, paddingRight: '2rem', paddingLeft: '2rem' }))], {
      optional: true
    })
  ])
]);
