import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import * as snippet from './noui-slider.snippetcode';

@Component({
  selector: 'app-noui-slider',
  templateUrl: './noui-slider.component.html',
  styleUrls: ['./noui-slider.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NouiSliderComponent implements OnInit {
  // public
  public contentHeader: object;

  // noUiSlider Single handle & Steps values
  public sliderSingleHandelValue: number[] = [20, 60];
  public sliderStepsValue: number[] = [10, 80];

  // noUiSlider Tap & Limit values
  public sliderTapValue: number[] = [15, 65];
  public sliderLimitValue: number[] = [10, 20];

  public sliderWithNgModel: number = 15;
  // noUiSlider Scale / Pipes
  public sliderScalePipesValue: number[] = [40, 60];
  public configSliderScalePipes: object = {
    behaviour: 'drag',
    connect: true,
    limit: 80,
    step: 5,
    range: {
      min: 20,
      max: 80
    },
    pips: {
      mode: 'steps',
      density: 5
    }
  };
  public configSliderDefault0: object = {
    behaviour: 'tap',
    connect: true,
    limit: 80,
    step: 5,
    range: {
      min: 20,
      max: 80
    },
    pips: {
      mode: 'steps',
      density: 5
    }
  };
  public configSliderSecondary0: object = {
    behaviour: 'tap',
    connect: true,
    limit: 80,
    step: 5,
    range: {
      min: 20,
      max: 80
    },
    pips: {
      mode: 'steps',
      density: 5
    }
  };
  public configSliderSuccess0: object = {
    behaviour: 'tap',
    connect: true,
    limit: 80,
    step: 5,
    range: {
      min: 20,
      max: 80
    },
    pips: {
      mode: 'steps',
      density: 5
    }
  };
  public configSliderWarning0: object = {
    behaviour: 'tap',
    connect: true,
    limit: 80,
    step: 5,
    range: {
      min: 20,
      max: 80
    },
    pips: {
      mode: 'steps',
      density: 5
    }
  };
  public configSliderDanger0: object = {
    behaviour: 'tap',
    connect: true,
    limit: 80,
    step: 5,
    range: {
      min: 20,
      max: 80
    },
    pips: {
      mode: 'steps',
      density: 5
    }
  };
  public configSliderInfo0: object = {
    behaviour: 'tap',
    connect: true,
    limit: 80,
    step: 5,
    range: {
      min: 20,
      max: 80
    },
    pips: {
      mode: 'steps',
      density: 5
    }
  };

  // noUiSlider tooltip value
  public sliderTooltipValue: number[] = [50, 70];

  // select values
  SelectValueInitial: number;
  SelectValueFinal: number;

  // disable
  public disabled: boolean = false;

  // slider input
  public sliderInputValue: number[] = [5, 15];
  public sliderSelectValues: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

  /**
   * Slider Input Change
   *
   * @param index
   * @param value
   */
  sliderInputChange(index: number, value: number) {
    let newRange = [this.sliderInputValue[0], this.sliderInputValue[1]];
    newRange[index] = newRange[index] + value;
    this.sliderInputValue = newRange;
  }

  /**
   * on Select Change
   */
  onSelectChange() {
    this.sliderInputValue = [this.SelectValueInitial, this.SelectValueFinal];
  }

  // noUiSlider Color / Default Handle / Circle Filled Handle / Square Handle
  public sliderDefault0 = [45, 55];
  public sliderSecondary0 = [40, 60];
  public sliderSuccess0 = [35, 65];

  public sliderInfo0 = [30, 70];

  public sliderWarning0 = [27, 75];

  public sliderDanger0 = [28, 72];

  // vertical Single Handle
  public verticalSingleHandleValue0: number = 40;

  public configVerticalSingleHandle: object = {
    orientation: 'vertical',
    range: {
      min: 0,
      max: 100
    }
  };

  // vertical upper
  public verticalUpperValue0: number = 60;

  public configVerticalUpper: object = {
    orientation: 'vertical',
    range: {
      min: 0,
      max: 100
    }
  };

  // vertical tooltip
  public verticalTooltipValue0 = [10, 70];

  public configVerticalTooltip: object = {
    orientation: 'vertical',
    range: {
      min: 0,
      max: 100
    }
  };

  // vertical limit
  public verticalLimitValue0 = [10, 70];

  public configVerticalLimit: object = {
    orientation: 'vertical',
    range: {
      min: 0,
      max: 100
    }
  };

  // snippet code variables
  public _snippetCodeBootstrapSlider = snippet.snippetCodeBootstrapSlider;
  public _snippetCodeSliderSliderValues = snippet.snippetCodeSliderSliderValues;
  public _snippetCodeSliderTap = snippet.snippetCodeSliderTap;
  public _snippetCodeSliderLimit = snippet.snippetCodeSliderLimit;
  public _snippetCodeSliderWithNgModel = snippet.snippetCodeSliderWithNgModel;
  public _snippetCodeSliderScalePipes = snippet.snippetCodeSliderScalePipes;
  public _snippetCodeSliderTooltip = snippet.snippetCodeSliderTooltip;
  public _snippetCodeSliderInput = snippet.snippetCodeSliderInput;
  public _snippetCodeSliderColors = snippet.snippetCodeSliderColors;
  public _snippetCodeVerticalSingleHandle = snippet.snippetCodeVerticalSingleHandle;
  public _snippetCodeVerticalUpper = snippet.snippetCodeVerticalUpper;
  public _snippetCodeVerticalTooltip = snippet.snippetCodeVerticalTooltip;
  public _snippetCodeVerticalLimit = snippet.snippetCodeVerticalLimit;

  constructor() {}

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // content header
    this.contentHeader = {
      headerTitle: 'noUiSlider',
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
            name: 'noUiSlider',
            isLink: false
          }
        ]
      }
    };
  }
}
