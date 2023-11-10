import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { BeforeOpenEvent } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';

import * as snippet from 'app/main/extensions/sweet-alerts/sweet-alerts.snippetcode';

@Component({
  selector: 'app-sweet-alerts',
  templateUrl: './sweet-alerts.component.html',
  styleUrls: ['./sweet-alerts.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SweetAlertsComponent implements OnInit {
  // public
  public contentHeader: object;

  // snippet code variables
  public _snippetCodeBasic = snippet.snippetCodeBasic;
  public _snippetCodePosition = snippet.snippetCodePosition;
  public _snippetCodeAnimations = snippet.snippetCodeAnimations;
  public _snippetCodeTypes = snippet.snippetCodeTypes;
  public _snippetCodeCustomImage = snippet.snippetCodeCustomImage;
  public _snippetCodeAutoClose = snippet.snippetCodeAutoClose;
  public _snippetCodeQuestion = snippet.snippetCodeQuestion;
  public _snippetCodeAjax = snippet.snippetCodeAjax;
  public _snippetCodeConfirmText = snippet.snippetCodeConfirmText;
  public _snippetCodeConfirmColor = snippet.snippetCodeConfirmColor;

  // private
  private timerInterval: any;

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Auto Close Before Open
   *
   * @param event
   */
  autoCloseBeforeOpen(event: BeforeOpenEvent) {
    Swal.showLoading();

    this.timerInterval = setInterval(function () {
      let timeLeft: HTMLElement = event.modalElement.querySelector('strong');
      timeLeft.textContent = <any>Swal.getTimerLeft();
    }, 100);
  }

  /**
   * On Auto Close
   */
  onAutoClose() {
    clearInterval(this.timerInterval);
  }

  /**
   * Question Before Open
   */
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
        if ((<HTMLInputElement>result).value) {
          Swal.fire({
            title: 'All done!',
            html: 'Your answers: <code>' + JSON.stringify((<HTMLInputElement>result).value) + '</code>',

            confirmButtonText: 'Lovely!',
            customClass: { confirmButton: 'btn btn-primary' }
          });
        }
      });
  }

  /**
   * Ajax Open
   */
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

  /**
   * Confirm Text Open
   */
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

  /**
   * Confirm Color Open
   */
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

  constructor() {}

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // content header
    this.contentHeader = {
      headerTitle: 'Sweet Alerts',
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
            name: 'Sweet Alerts',
            isLink: false
          }
        ]
      }
    };
  }
}
