import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';

export const toastrSlideY = trigger('flyInOut', [
  state(
    'inactive',
    style({
      opacity: 0
    })
  ),
  transition(
    'inactive => active',
    animate(
      '400ms ease-out',
      keyframes([
        style({
          transform: 'translateX(100%)',
          opacity: 0
        }),
        style({
          transform: 'translateX(0%)',
          opacity: 1
        })
      ])
    )
  ),
  transition(
    'active => removed',
    animate(
      '400ms ease-out',
      keyframes([
        style({
          transform: 'translateX(0%)',
          opacity: 1
        }),
        style({
          transform: 'translateX(100%)',
          opacity: 0
        })
      ])
    )
  )
]);
