import { Component, OnInit } from '@angular/core'
import { DemoService } from 'app/auth/service/demo.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private _demoService: DemoService) {}

  public contentHeader: object

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit() {
    this.contentHeader = {
      headerTitle: 'Home',
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
            name: 'Sample',
            isLink: false
          }
        ]
      }
    }
  }

  testRequest() {
    this._demoService.getVaccineCategories().toPromise().then(console.log);
  }
}
