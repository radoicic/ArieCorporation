import { snippetCode } from '@core/components/card-snippet/card-snippet.component';

export const snippetCodeBasic: snippetCode = {
  html: `
  <!-- Sweet Alert Basic -->
  <button class="btn btn-outline-primary mr-1 mb-1" [swal]="SweetAlertBasic" rippleEffect>Basic</button>
  <swal
    #SweetAlertBasic
    title="Any fool can use a computer"
    [swalOptions]="{ confirmButtonClass: 'btn btn-primary' }"
  >
  </swal>

  <!-- Sweet Alert With Title -->
  <button class="btn btn-outline-primary mr-1 mb-1" [swal]="SweetAlertWithTitle" rippleEffect>
    With Title
  </button>
  <swal
    #SweetAlertWithTitle
    title="The Internet?,"
    text="That thing is still around?"
    [swalOptions]="{ confirmButtonClass: 'btn btn-primary' }"
  >
  </swal>

  <!-- Sweet Alert With Footer -->
  <button class="btn btn-outline-primary mr-1 mb-1" [swal]="SweetAlertWithFooter" rippleEffect>
    With Footer
  </button>

  <!-- Swal of Sweet Alert With Footer -->
  <swal
    #SweetAlertWithFooter
    title="Oops..."
    text="Something went wrong!"
    icon="error"
    [focusCancel]="true"
    [swalOptions]="{ confirmButtonClass: 'btn btn-primary' }"
    [footer]="'<a href=\'javascript:void(0)\'>Why do I have this issue?</a>'"
  >
  </swal>
  <!--/ Swal of Sweet Alert With Footer -->

  <!-- Sweet Alert HTML -->
  <button class="btn btn-outline-primary mb-1" [swal]="SweetAlertHTML" rippleEffect>HTML</button>

  <!-- Swal of Sweet Alert HTML -->
  <swal
    #SweetAlertHTML
    title="<strong>HTML <u>example</u></strong>"
    text="Something went wrong!"
    html='You can use <b>bold text</b>, <a href="https://pixinvent.com/" target="_blank">links</a> and other HTML tags'
    icon="info"
    [focusCancel]="true"
    [showCloseButton]="true"
    [swalOptions]="{ cancelButtonClass: 'btn btn-danger ml-1', confirmButtonClass: 'btn btn-primary' }"
    [confirmButtonText]="'<i class=\'feather icon-thumbs-up\' mr-25></i> Great!'"
    [cancelButtonText]="'<i class=\'feather icon-thumbs-down\'></i>'"
    [showCancelButton]="true"
  >
  </swal>
  <!-- Swal of Sweet Alert HTML -->
  `
};

export const snippetCodePosition: snippetCode = {
  html: `
  <!-- Sweet Alert With Position top-start -->
  <button class="btn btn-outline-primary mr-1 mb-1" [swal]="SweetAlertTopStart" rippleEffect>
    Top Start
  </button>
  <!-- Swal of Sweet Alert With Position top-start -->
  <swal
    #SweetAlertTopStart
    title="Your work has been saved"
    icon="success"
    [showConfirmButton]="false"
    [timer]="1500"
    [position]="'top-start'"
  >
  </swal>
  <!--/ Swal of Sweet Alert With Position top-start -->

  <!-- Sweet Alert With Position top-end -->
  <button class="btn btn-outline-primary mr-1 mb-1" [swal]="SweetAlertTopEnd" rippleEffect>Top End</button>
  <!-- Swal of Sweet Alert With Position top-end -->
  <swal
    #SweetAlertTopEnd
    title="Your work has been saved"
    icon="success"
    [showConfirmButton]="false"
    [timer]="1500"
    [position]="'top-end'"
  >
  </swal>
  <!--/ Swal of Sweet Alert With Position top-end -->

  <!-- Sweet Alert With Position bottom-start -->
  <button class="btn btn-outline-primary mr-1 mb-1" [swal]="SweetAlertBottomStart" rippleEffect>
    Bottom Start
  </button>
  <!-- Swal of Sweet Alert With Position bottom-start -->
  <swal
    #SweetAlertBottomStart
    title="Your work has been saved"
    icon="success"
    [showConfirmButton]="false"
    [timer]="1500"
    [position]="'bottom-start'"
  >
  </swal>
  <!--/ Swal of Sweet Alert With Position bottom-start -->

  <!-- Sweet Alert With Position bottom-end -->
  <button class="btn btn-outline-primary mb-1" [swal]="SweetAlertBottomEnd" rippleEffect>Bottom End</button>
  <!-- Swal of Sweet Alert With Position bottom-end -->
  <swal
    #SweetAlertBottomEnd
    title="Your work has been saved"
    icon="success"
    [showConfirmButton]="false"
    [timer]="1500"
    [position]="'bottom-end'"
  >
  </swal>
  <!--/ Swal of Sweet Alert With Position bottom-end -->

`
};

export const snippetCodeAnimations: snippetCode = {
  html: `
  <!-- Sweet Alert With Bounce In -->
  <button class="btn btn-outline-primary mr-1 mb-1" [swal]="SweetAlertBounceIn" rippleEffect>
    Bounce In
  </button>
  <!-- Swal of Sweet Alert With Bounce In -->
  <swal
    #SweetAlertBounceIn
    title="BounceIn Animation"
    [animation]="true"
    [showClass]="{ popup: 'animate__animated animate__bounceIn' }"
    [swalOptions]="{ confirmButtonClass: 'btn btn-primary' }"
  >
  </swal>
  <!--/ Swal of Sweet Alert With Bounce In -->

  <!-- Sweet Alert With Fade In -->
  <button class="btn btn-outline-primary mr-1 mb-1" [swal]="SweetAlertFadeIn" rippleEffect>Fade In</button>
  <!-- Swal of Sweet Alert With Fade In -->
  <swal
    #SweetAlertFadeIn
    title="FadeIn Animation"
    [animation]="true"
    [showClass]="{ popup: 'animate__animated animate__fadeIn' }"
    [swalOptions]="{ confirmButtonClass: 'btn btn-primary' }"
  >
  </swal>
  <!--/ Swal of Sweet Alert With Fade In -->

  <!-- Sweet Alert With Flip In -->
  <button class="btn btn-outline-primary mr-1 mb-1" [swal]="SweetAlertFlipIn" rippleEffect>Flip In</button>
  <!-- Swal of Sweet Alert With Flip In -->
  <swal
    #SweetAlertFlipIn
    title="FlipIn Animation"
    [animation]="true"
    [showClass]="{ popup: 'animate__animated animate__flipInX' }"
    [swalOptions]="{ confirmButtonClass: 'btn btn-primary' }"
  >
  </swal>
  <!--/ Swal of Sweet Alert With Flip In -->

  <!-- Sweet Alert With Tada -->
  <button class="btn btn-outline-primary mr-1 mb-1" [swal]="SweetAlertTada" rippleEffect>Tada</button>
  <!-- Swal of Sweet Alert With Tada -->
  <swal
    #SweetAlertTada
    title="Tada Animation"
    [animation]="true"
    [showClass]="{ popup: 'animate__animated animate__tada' }"
    [swalOptions]="{ confirmButtonClass: 'btn btn-primary' }"
  >
  </swal>
  <!--/ Swal of Sweet Alert With Tada -->

  <!-- Sweet Alert With Shake -->
  <button class="btn btn-outline-primary mr-1 mb-1" [swal]="SweetAlertShake" rippleEffect>Shake</button>
  <!-- Swal of Sweet Alert With Shake -->
  <swal
    #SweetAlertShake
    title="Shake Animation"
    [animation]="true"
    [showClass]="{ popup: 'animate__animated animate__shakeX' }"
    [swalOptions]="{ confirmButtonClass: 'btn btn-primary' }"
  >
  </swal>
  <!--/ Swal of Sweet Alert With Shake -->
`
};

export const snippetCodeTypes: snippetCode = {
  html: `
  <!-- Sweet Alert success -->
  <button class="btn btn-outline-success mr-1 mb-1" [swal]="SweetAlertSuccess" rippleEffect>Success</button>
  <swal
    #SweetAlertSuccess
    title="Good job!"
    text="You clicked the button!"
    [swalOptions]="{ confirmButtonClass: 'btn btn-primary' }"
    icon="success"
  >
  </swal>

  <!-- Sweet Alert Info -->
  <button class="btn btn-outline-info mr-1 mb-1" [swal]="SweetAlertInfo" rippleEffect>Info</button>
  <swal
    #SweetAlertInfo
    title="Good job!"
    text="You clicked the button!"
    [swalOptions]="{ confirmButtonClass: 'btn btn-primary' }"
    icon="info"
  >
  </swal>

  <!-- Sweet Alert Warning -->
  <button class="btn btn-outline-warning mr-1 mb-1" [swal]="SweetAlertWarning" rippleEffect>Warning</button>
  <swal
    #SweetAlertWarning
    title="Good job!"
    text="You clicked the button!"
    [swalOptions]="{ confirmButtonClass: 'btn btn-primary' }"
    icon="warning"
  >
  </swal>

  <!-- Sweet Alert Error -->
  <button class="btn btn-outline-danger mr-1 mb-1" [swal]="SweetAlertError" rippleEffect>Error</button>
  <swal
    #SweetAlertError
    title="Good job!"
    text="You clicked the button!"
    [swalOptions]="{ confirmButtonClass: 'btn btn-primary' }"
    icon="error"
  >
  </swal>
`
};

export const snippetCodeCustomImage: snippetCode = {
  html: `
  <!-- Sweet Alert Custom Image -->
  <button class="btn btn-outline-primary mr-1" [swal]="SweetAlertCustomImage" rippleEffect>
    Custom Image
  </button>
  <!-- Swal of Sweet Alert Custom Image -->
  <swal
    #SweetAlertCustomImage
    title="Sweet!"
    text="Modal with a custom image."
    [swalOptions]="{
      imageUrl: 'assets/images/slider/04.jpg',
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'Custom image',
      confirmButtonClass: 'btn btn-primary'
    }"
  >
  </swal>
  <!-- Swal of Sweet Alert Custom Image -->
`
};

export const snippetCodeAutoClose: snippetCode = {
  html: `
  <button class="btn btn-outline-primary mr-1" [swal]="SweetAlertAutoClose" rippleEffect>Auto Close</button>
  <!-- Swal of Sweet Alert Auto Close -->
  <swal
    #SweetAlertAutoClose
    title="Auto close alert!"
    html="I will close in <strong></strong> seconds."
    [swalOptions]="{ confirmButtonClass: 'btn btn-primary', buttonsStyling: false }"
    [timer]="2000"
    (beforeOpen)="autoCloseBeforeOpen($event)"
    (close)="onAutoClose()"
  >
  </swal>
  <!-- Swal of Sweet Alert Auto Close -->
`,
  ts: `
private timerInterval: any;

autoCloseBeforeOpen(event: BeforeOpenEvent) {
  Swal.showLoading();

  this.timerInterval = setInterval(function () {
    let timeLeft: HTMLElement = event.modalElement.querySelector('strong');
    timeLeft.textContent = <any>Swal.getTimerLeft();
  }, 100);
}
onAutoClose() {
  clearInterval(this.timerInterval);
}
`
};

export const snippetCodeQuestion: snippetCode = {
  html: `
  <!-- Sweet Alert Question -->
  <button class="btn btn-outline-primary mr-1" [swal]="SweetAlertQuestion" rippleEffect>Question</button>
  <!-- Swal of Sweet Alert Question -->
  <swal #SweetAlertQuestion (beforeOpen)="questionBeforeOpen()"> </swal>
  <!-- Swal of Sweet Alert Question -->
`,
  ts: `
  questionBeforeOpen() {
    Swal.mixin({
      input: 'text',
      confirmButtonText: 'Next &rarr;',
      showCancelButton: true,
      progressSteps: ['1', '2', '3'],
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-danger ml-1'
      }
    })
      .queue([
        {
          title: 'Question 1',
          text: 'Chaining swal2 modals is easy'
        },
        'Question 2',
        'Question 3'
      ])
      .then(function (result) {
        if (result.value) {
          Swal.fire({
            title: 'All done!',
            html: 'Your answers: <code>' + JSON.stringify(result.value) + '</code>',

            confirmButtonText: 'Lovely!',
            customClass: { confirmButton: 'btn btn-primary' }
          });
        }
      });
  }
`
};

export const snippetCodeAjax: snippetCode = {
  html: `
  <!-- Sweet Alert Ajax -->
  <button class="btn btn-outline-primary mr-1" [swal]="SweetAlertAjax" rippleEffect>Ajax</button>
  <!-- Swal of Sweet Alert Ajax -->
  <swal #SweetAlertAjax (open)="ajaxOpen()"></swal>
  <!-- Swal of Sweet Alert Ajax -->
`,
  ts: `
  ajaxOpen() {
    Swal.fire({
      title: 'Search for a user',
      input: 'text',
      showCancelButton: true,
      confirmButtonText: 'Look up',
      showLoaderOnConfirm: true,

      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-danger ml-1'
      },
      preConfirm: function (login) {
        return fetch('//api.github.com/users/' + login + '')
          .then(function (response) {
            if (!response.ok) {
              console.log(response);
              throw new Error(response.statusText);
            }
            return response.json();
          })
          .catch(function (error) {
            Swal.showValidationMessage('Request failed:  ' + error + '');
          });
      },
      allowOutsideClick: function () {
        return !Swal.isLoading();
      }
    }).then(function (result) {
      if (result.value) {
        Swal.fire({
          title: '' + result.value.login + "'s avatar",
          imageUrl: result.value.avatar_url,
          customClass: { confirmButton: 'btn btn-primary' }
        });
      }
    });
  }
`
};

export const snippetCodeConfirmText: snippetCode = {
  html: `
  <!-- Sweet Alert ConfirmText -->
  <button class="btn btn-outline-primary mr-1" [swal]="SweetAlertConfirmText" rippleEffect>
    Confirm Text
  </button>
  <!-- Swal of Sweet Alert ConfirmText -->
  <swal #SweetAlertConfirmText (open)="ConfirmTextOpen()"></swal>
  <!-- Swal of Sweet Alert ConfirmText -->
`,
  ts: `
  ConfirmTextOpen() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#7367F0',
      cancelButtonColor: '#E42728',
      confirmButtonText: 'Yes, delete it!',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-danger ml-1'
      }
    }).then(function (result) {
      if (result.value) {
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Record deleted successfully.',
          customClass: {
            confirmButton: 'btn btn-success'
          }
        });
      }
    });
  }
`
};

export const snippetCodeConfirmColor: snippetCode = {
  html: `
  <!-- Sweet Alert ConfirmColor -->
  <button class="btn btn-outline-primary mr-1" [swal]="SweetAlertConfirmColor" rippleEffect>
    Confirm Button Color
  </button>
  <!-- Swal of Sweet Alert ConfirmColor -->
  <swal #SweetAlertConfirmColor (open)="ConfirmColorOpen()"></swal>
  <!-- Swal of Sweet Alert ConfirmColor -->
`,
  ts: `
  ConfirmColorOpen() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-danger ml-1'
      }
    }).then(function (result) {
      if (result.value) {
        Swal.fire({
          title: 'Deleted!',
          text: 'Record deleted successfully.',
          icon: 'success',
          customClass: {
            confirmButton: 'btn btn-success'
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: 'Cancelled',
          text: 'Your imaginary file is safe :)',
          icon: 'error',
          customClass: {
            confirmButton: 'btn btn-success'
          }
        });
      }
    });
  }
`
};
