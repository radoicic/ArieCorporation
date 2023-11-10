import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class SweetAlertModule {

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
 }
