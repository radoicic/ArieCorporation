import { snippetCode } from '@core/components/card-snippet/card-snippet.component';

export const snippetCodeTour: snippetCode = {
  html: `
  <div class="btn btn-outline-primary" (click)="startTour()">Start Tour</div>
  `,
  ts: `
  import { ShepherdService } from 'angular-shepherd';

  /**
   * Constructor
   *
   * @param {ShepherdService} shepherdService
   */
  constructor(private shepherdService: ShepherdService) {}

  // start tour
  startTour() {
    this.shepherdService.start();
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * After View Init
   */
  ngAfterViewInit() {
    // tour steps
    this.shepherdService.defaultStepOptions = {
      cancelIcon: {
        enabled: true
      }
    };
    this.shepherdService.modal = true;

    this.shepherdService.addSteps([
      {
        title: 'Navbar',
        text: 'This is your navbar',
        attachTo: {
          element: '.navbar',
          on: 'bottom'
        },
        buttons: [
          {
            text: 'Skip',
            type: 'cancel',
            classes: this.backBtnClass
          },
          {
            text: 'Next',
            type: 'next',
            classes: this.nextBtnClass
          }
        ],
        useModalOverlay: true
      },
      {
        title: 'Card',
        text: 'This is a card.',
        attachTo: {
          element: '.card',
          on: 'top'
        },
        buttons: [
          {
            text: 'Skip',
            type: 'cancel',
            classes: this.backBtnClass
          },

          {
            text: 'Back',
            type: 'back',
            classes: this.backBtnClass
          },
          {
            text: 'Next',
            type: 'next',
            classes: this.nextBtnClass
          }
        ]
      },
      {
        title: 'Footer',
        text: 'This is the footer.',
        attachTo: {
          element: '.footer',
          on: 'top'
        },
        buttons: [
          {
            text: 'Back',
            type: 'back',
            classes: this.backBtnClass
          },
          {
            text: 'Finish',
            type: 'next',
            classes: this.nextBtnClass
          }
        ]
      }
    ]);
  }
  `
};
