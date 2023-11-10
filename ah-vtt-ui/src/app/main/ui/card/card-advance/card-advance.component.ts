import { Component, ElementRef, OnInit, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { colors } from 'app/colors.const';
import { CardAdvanceService } from 'app/main/ui/card/card-advance/card-advance.service';

@Component({
  selector: 'app-card-advance',
  templateUrl: './card-advance.component.html',
  styleUrls: ['./card-advance.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CardAdvanceComponent implements OnInit, OnDestroy {
  // Decorator
  @ViewChild('scrollMe') scrollMe: ElementRef;
  scrolltop: number = null;

  // public
  public contentHeader: object;
  public employeeDangerChartoptions;
  public employeePrimaryChartoptions;
  public employeeSuccessChartoptions;
  public employeeSecondaryChartoptions;
  public employeeWarningChartoptions;
  public employeePrimaryTwoChartoptions;
  public statePrimaryChartoptions;
  public stateWarningChartoptions;
  public stateSecondaryChartoptions;
  public stateInfoChartoptions;
  public stateDangerChartoptions;

  // Chat Widget
  public userProfile;
  public chatUser;
  public chats;
  public newChat;
  public chatMessage = '';

  // private
  private $trackBgColor = '#e9ecef';

  private _unsubscribeAll: Subject<any>;

  /**
   *
   * @param {CardAdvanceService} _cardAdvanceService
   */
  constructor(private _cardAdvanceService: CardAdvanceService) {
    this._unsubscribeAll = new Subject();
    this.employeeDangerChartoptions = {
      chart: {
        height: 32,
        width: 32,
        type: 'radialBar'
      },
      grid: {
        show: false,
        padding: {
          left: -15,
          right: -15,
          top: -12,
          bottom: -15
        }
      },
      colors: [colors.solid.danger],
      series: [65],
      plotOptions: {
        radialBar: {
          hollow: {
            size: '22%'
          },
          track: {
            background: this.$trackBgColor
          },
          dataLabels: {
            showOn: 'always',
            name: {
              show: false
            },
            value: {
              show: false
            }
          }
        }
      },
      stroke: {
        lineCap: 'round'
      }
    };
    this.employeePrimaryChartoptions = {
      chart: {
        height: 32,
        width: 32,
        type: 'radialBar'
      },
      grid: {
        show: false,
        padding: {
          left: -15,
          right: -15,
          top: -12,
          bottom: -15
        }
      },
      colors: [colors.solid.primary],
      series: [45],
      plotOptions: {
        radialBar: {
          hollow: {
            size: '22%'
          },
          track: {
            background: this.$trackBgColor
          },
          dataLabels: {
            showOn: 'always',
            name: {
              show: false
            },
            value: {
              show: false
            }
          }
        }
      },
      stroke: {
        lineCap: 'round'
      }
    };
    this.employeeSuccessChartoptions = {
      chart: {
        height: 32,
        width: 32,
        type: 'radialBar'
      },
      grid: {
        show: false,
        padding: {
          left: -15,
          right: -15,
          top: -12,
          bottom: -15
        }
      },
      colors: [colors.solid.success],
      series: [60],
      plotOptions: {
        radialBar: {
          hollow: {
            size: '22%'
          },
          track: {
            background: this.$trackBgColor
          },
          dataLabels: {
            showOn: 'always',
            name: {
              show: false
            },
            value: {
              show: false
            }
          }
        }
      },
      stroke: {
        lineCap: 'round'
      }
    };
    this.employeeSecondaryChartoptions = {
      chart: {
        height: 32,
        width: 32,
        type: 'radialBar'
      },
      grid: {
        show: false,
        padding: {
          left: -15,
          right: -15,
          top: -12,
          bottom: -15
        }
      },
      colors: [colors.solid.secondary],
      series: [35],
      plotOptions: {
        radialBar: {
          hollow: {
            size: '22%'
          },
          track: {
            background: this.$trackBgColor
          },
          dataLabels: {
            showOn: 'always',
            name: {
              show: false
            },
            value: {
              show: false
            }
          }
        }
      },
      stroke: {
        lineCap: 'round'
      }
    };
    this.employeeWarningChartoptions = {
      chart: {
        height: 32,
        width: 32,
        type: 'radialBar'
      },
      grid: {
        show: false,
        padding: {
          left: -15,
          right: -15,
          top: -12,
          bottom: -15
        }
      },
      colors: [colors.solid.warning],
      series: [65],
      plotOptions: {
        radialBar: {
          hollow: {
            size: '22%'
          },
          track: {
            background: this.$trackBgColor
          },
          dataLabels: {
            showOn: 'always',
            name: {
              show: false
            },
            value: {
              show: false
            }
          }
        }
      },
      stroke: {
        lineCap: 'round'
      }
    };
    this.employeePrimaryTwoChartoptions = {
      chart: {
        height: 32,
        width: 32,
        type: 'radialBar'
      },
      grid: {
        show: false,
        padding: {
          left: -15,
          right: -15,
          top: -12,
          bottom: -15
        }
      },
      colors: [colors.solid.primary],
      series: [80],
      plotOptions: {
        radialBar: {
          hollow: {
            size: '22%'
          },
          track: {
            background: this.$trackBgColor
          },
          dataLabels: {
            showOn: 'always',
            name: {
              show: false
            },
            value: {
              show: false
            }
          }
        }
      },
      stroke: {
        lineCap: 'round'
      }
    };
    this.statePrimaryChartoptions = {
      chart: {
        height: 32,
        width: 32,
        type: 'radialBar'
      },
      grid: {
        show: false,
        padding: {
          left: -15,
          right: -15,
          top: -12,
          bottom: -15
        }
      },
      colors: [colors.solid.primary],
      series: [54.4],
      plotOptions: {
        radialBar: {
          hollow: {
            size: '22%'
          },
          track: {
            background: this.$trackBgColor
          },
          dataLabels: {
            showOn: 'always',
            name: {
              show: false
            },
            value: {
              show: false
            }
          }
        }
      },
      stroke: {
        lineCap: 'round'
      }
    };
    this.stateWarningChartoptions = {
      chart: {
        height: 32,
        width: 32,
        type: 'radialBar'
      },
      grid: {
        show: false,
        padding: {
          left: -15,
          right: -15,
          top: -12,
          bottom: -15
        }
      },
      colors: [colors.solid.warning],
      series: [6.1],
      plotOptions: {
        radialBar: {
          hollow: {
            size: '22%'
          },
          track: {
            background: this.$trackBgColor
          },
          dataLabels: {
            showOn: 'always',
            name: {
              show: false
            },
            value: {
              show: false
            }
          }
        }
      },
      stroke: {
        lineCap: 'round'
      }
    };
    this.stateSecondaryChartoptions = {
      chart: {
        height: 32,
        width: 32,
        type: 'radialBar'
      },
      grid: {
        show: false,
        padding: {
          left: -15,
          right: -15,
          top: -12,
          bottom: -15
        }
      },
      colors: [colors.solid.secondary],
      series: [14.6],
      plotOptions: {
        radialBar: {
          hollow: {
            size: '22%'
          },
          track: {
            background: this.$trackBgColor
          },
          dataLabels: {
            showOn: 'always',
            name: {
              show: false
            },
            value: {
              show: false
            }
          }
        }
      },
      stroke: {
        lineCap: 'round'
      }
    };
    this.stateInfoChartoptions = {
      chart: {
        height: 32,
        width: 32,
        type: 'radialBar'
      },
      grid: {
        show: false,
        padding: {
          left: -15,
          right: -15,
          top: -12,
          bottom: -15
        }
      },
      colors: [colors.solid.info],
      series: [4.2],
      plotOptions: {
        radialBar: {
          hollow: {
            size: '22%'
          },
          track: {
            background: this.$trackBgColor
          },
          dataLabels: {
            showOn: 'always',
            name: {
              show: false
            },
            value: {
              show: false
            }
          }
        }
      },
      stroke: {
        lineCap: 'round'
      }
    };
    this.stateDangerChartoptions = {
      chart: {
        height: 32,
        width: 32,
        type: 'radialBar'
      },
      grid: {
        show: false,
        padding: {
          left: -15,
          right: -15,
          top: -12,
          bottom: -15
        }
      },
      colors: [colors.solid.danger],
      series: [8.4],
      plotOptions: {
        radialBar: {
          hollow: {
            size: '22%'
          },
          track: {
            background: this.$trackBgColor
          },
          dataLabels: {
            showOn: 'always',
            name: {
              show: false
            },
            value: {
              show: false
            }
          }
        }
      },
      stroke: {
        lineCap: 'round'
      }
    };
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  updateChat() {
    this.newChat = {
      message: this.chatMessage,
      time: 'Mon Dec 10 2018 07:46:43 GMT+0000 (GMT)',
      senderId: this.userProfile.id
    };
    if (this.chatMessage !== '') {
      this.chats.chat.push(this.newChat);
    }
    this.chatMessage = '';
    setTimeout(() => {
      this.scrolltop = this.scrollMe?.nativeElement.scrollHeight;
    }, 0);
  }

  /**
   * On init
   */
  ngOnInit() {
    this._cardAdvanceService.onCardAdvChanged.subscribe(res => {
      this.userProfile = res.userProfile;
      this.chatUser = res.chatUser;
      this.chats = res.chats;
      setTimeout(() => {
        this.scrolltop = this.scrollMe?.nativeElement.scrollHeight;
      }, 0);
    });
    // content header data
    this.contentHeader = {
      headerTitle: 'Advance Card',
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
            name: 'Card',
            isLink: true,
            link: '/'
          },
          {
            name: 'Advance Card',
            isLink: false
          }
        ]
      }
    };
  }
  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
