import { Component, OnInit, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';

// Ng-Apexcharts
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexGrid,
  ApexLegend,
  ApexMarkers,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexResponsive,
  ApexStates,
  ApexStroke,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis
} from 'ng-apexcharts';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { colors } from 'app/colors.const';
import { CardAnalyticsService } from 'app/main/ui/card/card-analytics/card-analytics.service';
import { CoreConfigService } from '@core/services/config.service';

// Interface Chartoptions
export interface ChartOptions {
  // Apex-Non-Axis-Chart-Series
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  fill: ApexFill;
  colors: string[];
  legend: ApexLegend;
  labels: any;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  markers: ApexMarkers[];
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  states: ApexStates;
}

// Interface Chartoptions2
export interface ChartOptions2 {
  // Apex-Axis-Chart-Series
  series: ApexAxisChartSeries;
  chart: ApexChart;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  fill: ApexFill;
  colors: string[];
  legend: ApexLegend;
  labels: any;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  markers: ApexMarkers;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  grid: ApexGrid;
  states: ApexStates;
}

@Component({
  selector: 'app-card-analytics',
  templateUrl: './card-analytics.component.html',
  styleUrls: ['./card-analytics.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CardAnalyticsComponent implements OnInit, OnDestroy {
  // Decorator
  @ViewChild('supportChartoptionsRef') supportChartoptionsRef: any;
  @ViewChild('avgsessionChartoptionsRef') avgsessionChartoptionsRef: any;
  @ViewChild('revenueReportChartoptionsRef') revenueReportChartoptionsRef: any;
  @ViewChild('budgetChartoptionsRef') budgetChartoptionsRef: any;
  @ViewChild('goalChartoptionsRef') goalChartoptionsRef: any;
  @ViewChild('revenueChartoptionsRef') revenueChartoptionsRef: any;
  @ViewChild('salesChartoptionsRef') salesChartoptionsRef: any;
  @ViewChild('salesavgChartoptionsRef') salesavgChartoptionsRef: any;
  @ViewChild('sessionChartoptionsRef') sessionChartoptionsRef: any;
  @ViewChild('customerChartoptionsRef') customerChartoptionsRef: any;
  @ViewChild('orderChartoptionsRef') orderChartoptionsRef: any;
  @ViewChild('earningChartoptionsRef') earningChartoptionsRef: any;

  // Public
  public contentHeader: object;
  public data: any;

  // Charts Of Interface Chartoptions
  public sessionChartoptions: Partial<ChartOptions>;
  public orderChartoptions: Partial<ChartOptions>;
  public customerChartoptions: Partial<ChartOptions>;
  public supportChartoptions: Partial<ChartOptions>;
  public goalChartoptions: Partial<any>;
  public revenueReportChartoptions: Partial<ChartOptions2>;

  // Charts Of Interface Chartoptions2
  public budgetChartoptions: Partial<ChartOptions2>;
  public salesChartoptions: Partial<ChartOptions2>;
  public revenueChartoptions: Partial<ChartOptions2>;
  public avgsessionChartoptions: Partial<ChartOptions2>;
  public salesavgChartoptions: Partial<ChartOptions2>;
  public retentionChartoptions: Partial<ChartOptions2>;
  public earningChartoptions;
  public isMenuToggled = false;
  // Private
  private $primary = '#7367F0';
  private $danger = '#EA5455';
  private $warning = '#FF9F43';
  private $info = '#00cfe8';
  private $success = '#00db89';
  private $primary_light = '#9c8cfc';
  private $warning_light = '#FFC085';
  private $danger_light = '#f29292';
  private $info_light = '#1edec5';
  private $stroke_color = '#ebe9f1';
  private $label_color = '#e7eef7';
  private $purple = '#df87f2';
  private $white = '#fff';

  private $textHeadingColor = '#5e5873';
  private $strokeColor = '#ebe9f1';
  private $labelColor = '#e7eef7';
  private $avgSessionStrokeColor2 = '#ebf0f7';
  private $budgetStrokeColor2 = '#dcdae3';
  private $goalStrokeColor2 = '#51e5a8';
  private $revenueStrokeColor2 = '#d0ccff';
  private $textMutedColor = '#b9b9c3';
  private $salesStrokeColor2 = '#df87f2';
  private $earningsStrokeColor2 = '#28c76f66';
  private $earningsStrokeColor3 = '#28c76f33';

  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {CoreConfigService} _coreConfigService
   * @param {CardAnalyticsService} _cardAnalyticsService
   */
  constructor(private _cardAnalyticsService: CardAnalyticsService, private _coreConfigService: CoreConfigService) {
    this._unsubscribeAll = new Subject();

    // Revenue Report Chart
    this.revenueReportChartoptions = {
      chart: {
        height: 230,
        stacked: true,
        type: 'bar',
        toolbar: { show: false }
      },
      plotOptions: {
        bar: {
          columnWidth: '17%',
          endingShape: 'rounded'
        }
      },
      colors: [colors.solid.primary, colors.solid.warning],
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      grid: {
        padding: {
          top: -20,
          bottom: -10
        },
        yaxis: {
          lines: { show: false }
        }
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        labels: {
          style: {
            colors: this.$textMutedColor,
            fontSize: '0.86rem'
          }
        },
        axisTicks: {
          show: false
        },
        axisBorder: {
          show: false
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: this.$textMutedColor,
            fontSize: '0.86rem'
          }
        }
      }
    };
    // Budget Chart
    this.budgetChartoptions = {
      chart: {
        height: 80,
        toolbar: { show: false },
        zoom: { enabled: false },
        type: 'line',
        sparkline: { enabled: true }
      },
      stroke: {
        curve: 'smooth',
        dashArray: [0, 5],
        width: [2]
      },
      colors: [colors.solid.primary, this.$budgetStrokeColor2],
      tooltip: {
        enabled: false
      }
    };
    // Session Chart
    this.sessionChartoptions = {
      chart: {
        type: 'donut',
        height: 320,
        toolbar: {
          show: false
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: { show: false },
      labels: ['Desktop', 'Mobile', 'Tablet'],
      stroke: { width: 0 },
      colors: [colors.solid.primary, colors.solid.warning, colors.solid.danger]
    };

    // Product Order Chart
    this.orderChartoptions = {
      chart: {
        height: 345,
        type: 'radialBar'
      },
      colors: [this.$primary, this.$warning, this.$danger],
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: 'vertical',
          shadeIntensity: 0.5,
          gradientToColors: [this.$primary_light, this.$warning_light, this.$danger_light],
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100]
        }
      },
      stroke: {
        lineCap: 'round'
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: '20%'
          },
          track: {
            strokeWidth: '100%',
            margin: 15
          },
          dataLabels: {
            value: {
              fontSize: '1rem',
              color: this.$textHeadingColor,
              fontWeight: '500',
              offsetY: 5
            },
            total: {
              show: true,
              label: 'Total',
              fontSize: '1.286rem',
              color: this.$textHeadingColor,
              fontWeight: '500',

              formatter: function (w) {
                // By Default This Function Returns The Average Of All Series.
                // The Below Is Just An Example To Show The Use Of Custom Formatter Function
                return '42459';
              }
            }
          }
        }
      },
      labels: ['Finished', 'Pending', 'Rejected']
    };

    // Customer Chart
    this.customerChartoptions = {
      chart: {
        type: 'pie',
        height: 345,
        toolbar: {
          show: false
        }
      },
      labels: ['New', 'Returning', 'Referrals'],
      dataLabels: {
        enabled: false
      },
      legend: { show: false },
      stroke: {
        width: 4
      },
      colors: [colors.solid.primary, colors.solid.warning, colors.solid.danger]
    };

    // Sales Chart
    this.salesChartoptions = {
      chart: {
        height: 325,
        type: 'radar',
        dropShadow: {
          enabled: true,
          blur: 8,
          left: 1,
          top: 1,
          opacity: 0.2
        },
        toolbar: {
          show: false
        }
      },
      stroke: {
        width: 0
      },
      colors: [this.$primary, this.$info],
      plotOptions: {
        radar: {
          polygons: {
            connectorColors: 'transparent'
          }
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          gradientToColors: ['#9f8ed7', this.$info_light],
          shadeIntensity: 1,
          type: 'horizontal',
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100, 100, 100]
        }
      },
      markers: {
        size: 0
      },
      legend: {
        show: false
      },
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      dataLabels: {
        style: {
          colors: [
            this.$stroke_color,
            this.$stroke_color,
            this.$stroke_color,
            this.$stroke_color,
            this.$stroke_color,
            this.$stroke_color
          ]
        }
      },
      yaxis: {
        show: false
      }
    };

    // Support Tracker Chart
    this.supportChartoptions = {
      chart: {
        height: 290,
        type: 'radialBar',
        sparkline: {
          enabled: false
        }
      },
      plotOptions: {
        radialBar: {
          offsetY: 20,
          startAngle: -150,
          endAngle: 150,
          hollow: {
            size: '65%'
          },
          track: {
            background: this.$white,
            strokeWidth: '100%'
          },
          dataLabels: {
            name: {
              offsetY: -5,
              color: this.$textHeadingColor,
              fontSize: '1rem'
            },
            value: {
              offsetY: 15,
              color: this.$textHeadingColor,
              fontSize: '1.714rem'
            }
          }
        }
      },
      colors: [colors.solid.danger],
      fill: {
        type: 'gradient',
        gradient: {
          // Enabled: True,
          shade: 'dark',
          type: 'horizontal',
          shadeIntensity: 0.5,
          gradientToColors: [colors.solid.primary],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100]
        }
      },
      stroke: {
        dashArray: 8
      },
      labels: ['Completed Tickets']
    };

    // Revenue Chart
    this.revenueChartoptions = {
      chart: {
        height: 260,
        toolbar: { show: false },
        type: 'line'
      },
      stroke: {
        curve: 'smooth',
        dashArray: [0, 8],
        width: [4, 2]
      },
      grid: {
        borderColor: this.$label_color
      },
      legend: {
        show: false
      },
      colors: [this.$revenueStrokeColor2, this.$stroke_color],
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          inverseColors: false,
          gradientToColors: [this.$primary, this.$stroke_color],
          shadeIntensity: 1,
          type: 'horizontal',
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100, 100, 100]
        }
      },
      markers: {
        size: 0,
        hover: {
          size: 5
        }
      },
      xaxis: {
        labels: {
          style: {
            colors: this.$stroke_color
          }
        },
        axisTicks: {
          show: false
        },
        categories: ['01', '05', '09', '13', '17', '21', '26', '31'],
        axisBorder: {
          show: false
        },
        tickPlacement: 'on'
      },
      yaxis: {
        tickAmount: 5,
        labels: {
          formatter: function (val) {
            return <string>(val > 999 ? (val / 1000).toFixed(1) + 'k' : val);
          }
        }
      },
      tooltip: {
        x: { show: false }
      }
    };

    // Goal Overview  Chart
    this.goalChartoptions = {
      chart: {
        height: 245,
        type: 'radialBar',
        sparkline: {
          enabled: true
        },
        dropShadow: {
          enabled: true,
          blur: 3,
          left: 1,
          top: 1,
          opacity: 0.1
        }
      },
      colors: [this.$goalStrokeColor2],
      plotOptions: {
        radialBar: {
          offsetY: -10,
          startAngle: -150,
          endAngle: 150,
          hollow: {
            size: '77%'
          },
          track: {
            background: this.$strokeColor,
            strokeWidth: '50%'
          },
          dataLabels: {
            name: {
              show: false
            },
            value: {
              color: this.$textHeadingColor,
              fontSize: '2.86rem',
              fontWeight: '600'
            }
          }
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: 'horizontal',
          shadeIntensity: 0.5,
          gradientToColors: [colors.solid.success],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100]
        }
      },
      stroke: {
        lineCap: 'round'
      },
      grid: {
        padding: {
          bottom: 30
        }
      }
    };

    // Average Session Chart
    this.avgsessionChartoptions = {
      chart: {
        type: 'bar',
        height: 200,
        sparkline: { enabled: true },
        toolbar: { show: false }
      },
      colors: [
        this.$label_color,
        this.$label_color,
        this.$primary,
        this.$label_color,
        this.$label_color,
        this.$label_color
      ],
      grid: {
        show: false,
        padding: {
          left: 0,
          right: 0
        }
      },
      plotOptions: {
        bar: {
          columnWidth: '45%',
          distributed: true,
          endingShape: 'rounded'
        }
      },
      tooltip: {
        x: { show: false }
      }
    };

    // Sales  Chart
    this.salesavgChartoptions = {
      chart: {
        height: 270,
        toolbar: { show: false },
        type: 'line',
        dropShadow: {
          enabled: true,
          top: 20,
          left: 2,
          blur: 6,
          opacity: 0.2
        }
      },
      stroke: {
        curve: 'smooth',
        width: 4
      },
      grid: {
        borderColor: this.$label_color
      },
      legend: {
        show: false
      },
      colors: [this.$purple],
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          inverseColors: false,
          gradientToColors: [this.$primary],
          shadeIntensity: 1,
          type: 'horizontal',
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100, 100, 100]
        }
      },
      xaxis: {
        labels: {
          style: {
            colors: this.$stroke_color
          }
        },
        axisTicks: {
          show: false
        },
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        axisBorder: {
          show: false
        },
        tickPlacement: 'on'
      },
      yaxis: {
        tickAmount: 5,
        labels: {
          formatter: function (val) {
            return <string>(val > 999 ? (val / 1000).toFixed(1) + 'k' : val);
          }
        }
      },
      tooltip: {
        x: { show: false }
      }
    };

    // Client Retention Chart
    this.retentionChartoptions = {
      chart: {
        stacked: true,
        type: 'bar',
        toolbar: { show: false },
        height: 290
      },
      plotOptions: {
        bar: {
          columnWidth: '10%'
        }
      },
      colors: [this.$primary, this.$danger],
      grid: {
        borderColor: this.$label_color,
        padding: {
          left: 0,
          right: 0
        }
      },
      legend: {
        show: true,
        position: 'top',
        horizontalAlign: 'left',
        offsetX: 0,
        fontSize: '14px',
        markers: {
          radius: 50,
          width: 10,
          height: 10
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        labels: {
          style: {
            colors: this.$stroke_color
          }
        },
        axisTicks: {
          show: false
        },
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        axisBorder: {
          show: false
        }
      },
      yaxis: {
        tickAmount: 5
      },
      tooltip: {
        x: { show: false }
      }
    };

    // Earnings Chart
    this.earningChartoptions = {
      chart: {
        type: 'donut',
        height: 120,
        toolbar: {
          show: false
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: { show: false },
      comparedResult: [2, -3, 8],
      labels: ['App', 'Service', 'Product'],
      stroke: { width: 0 },
      colors: [this.$earningsStrokeColor2, this.$earningsStrokeColor3, colors.solid.success],
      grid: {
        padding: {
          right: -20,
          bottom: -8,
          left: -20
        }
      },
      plotOptions: {
        pie: {
          startAngle: -10,
          donut: {
            labels: {
              show: true,
              name: {
                offsetY: 15
              },
              value: {
                offsetY: -15,
                formatter: function (val) {
                  return parseInt(val) + '%';
                }
              },
              total: {
                show: true,
                offsetY: 15,
                label: 'App',
                formatter: function (w) {
                  return '53%';
                }
              }
            }
          }
        }
      },
      responsive: [
        {
          breakpoint: 1325,
          options: {
            chart: {
              height: 100
            }
          }
        },
        {
          breakpoint: 1200,
          options: {
            chart: {
              height: 120
            }
          }
        },
        {
          breakpoint: 1065,
          options: {
            chart: {
              height: 100
            }
          }
        },
        {
          breakpoint: 992,
          options: {
            chart: {
              height: 120
            }
          }
        }
      ]
    };
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit() {
    this._cardAnalyticsService.onCardAnalyticsChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
      this.data = response;
    });

    // Content Header
    this.contentHeader = {
      headerTitle: 'Analytics Cards',
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
            name: 'Cards',
            isLink: true,
            link: '/'
          },
          {
            name: 'Analytics Cards',
            isLink: false
          }
        ]
      }
    };
  }

  /**
   * After View Init
   */
  ngAfterViewInit() {
    // Subscribe to core config changes
    this._coreConfigService.getConfig().subscribe(config => {
      // If Menu Collapsed Changes
      if (
        (config.layout.menu.collapsed === true || config.layout.menu.collapsed === false) &&
        localStorage.getItem('currentUser')
      ) {
        setTimeout(() => {
          // Get Dynamic Width for Charts
          this.isMenuToggled = true;
          this.supportChartoptions.chart.width = this.supportChartoptionsRef?.nativeElement.offsetWidth;
          this.avgsessionChartoptions.chart.width = this.avgsessionChartoptionsRef?.nativeElement.offsetWidth;
          this.revenueReportChartoptions.chart.width = this.revenueReportChartoptionsRef?.nativeElement.offsetWidth;
          this.budgetChartoptions.chart.width = this.budgetChartoptionsRef?.nativeElement.offsetWidth;
          this.goalChartoptions.chart.width = this.goalChartoptionsRef?.nativeElement.offsetWidth;
          this.revenueChartoptions.chart.width = this.revenueChartoptionsRef?.nativeElement.offsetWidth;
          this.salesChartoptions.chart.width = this.salesChartoptionsRef?.nativeElement.offsetWidth;
          this.salesavgChartoptions.chart.width = this.salesavgChartoptionsRef?.nativeElement.offsetWidth;
          this.sessionChartoptions.chart.width = this.sessionChartoptionsRef?.nativeElement.offsetWidth;
          this.customerChartoptions.chart.width = this.customerChartoptionsRef?.nativeElement.offsetWidth;
          this.orderChartoptions.chart.width = this.orderChartoptionsRef?.nativeElement.offsetWidth;
          this.earningChartoptions.chart.width = this.earningChartoptionsRef?.nativeElement.offsetWidth;
        }, 500);
      }
    });
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
