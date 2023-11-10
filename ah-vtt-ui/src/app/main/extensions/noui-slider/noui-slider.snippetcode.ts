import { snippetCode } from '@core/components/card-snippet/card-snippet.component';

export const snippetCodeBootstrapSlider: snippetCode = {
  html: `
  <div class="form-group">
    <label for="basic-range">Default</label>
    <input type="range" class="form-control-range" id="basic-range" />
  </div>
  <div class="form-group">
    <label for="disabled-range">Disabled</label>
    <input type="range" class="form-control-range" id="disabled-range" disabled />
  </div>
`
};
export const snippetCodeSliderSliderValues: snippetCode = {
  html: `
  <h5 class="mb-2">Handles</h5>
  <nouislider
    [min]="0"
    [max]="100"
    [step]="2"
    [connect]="false"
    [(ngModel)]="sliderSingleHandelValue"
  ></nouislider>

  <h5 class="my-2">Snapping between steps</h5>
  <nouislider
    [connect]="true"
    [min]="0"
    [max]="100"
    [step]="10"
    [(ngModel)]="sliderStepsValue"
  ></nouislider>
`,
  ts: `
  // noUiSlider Single handle & Steps values
  public sliderSingleHandelValue: number[] = [20, 60];
  public sliderStepsValue: number[] = [10, 80];
`
};

export const snippetCodeSliderTap: snippetCode = {
  html: `
<!-- noUiSlider Tap -->
<nouislider [min]="10" [connect]="'upper'" [behaviour]="'tap'" [max]="50" [step]="0.05"
[(ngModel)]="sliderTapValue"></nouislider>
`,
  ts: `
public sliderTapValue: number = 15;

`
};

export const snippetCodeSliderLimit: snippetCode = {
  html: `
<!-- noUiSlider Limit -->
<nouislider [connect]="true" [min]="0" [max]="100" [limit]="40" [step]="2" [(ngModel)]="sliderLimitValue">
</nouislider>
`,
  ts: `
public sliderLimitValue: number[] = [10, 20];
`
};

export const snippetCodeSliderWithNgModel: snippetCode = {
  html: `
  <nouislider
  [min]="10"
  [connect]="'upper'"
  [behaviour]="'tap'"
  [max]="50"
  [step]="0.05"
  [(ngModel)]="sliderWithNgModel"
></nouislider>
<p>Value : {{ sliderWithNgModel }}</p>
  `,
  ts: `
  public sliderWithNgModel: number = 15;
  `
};

export const snippetCodeSliderScalePipes: snippetCode = {
  html: `
<!-- noUiSlider Scale / Pipes -->
<nouislider [config]="configSliderScalePipes" [(ngModel)]="sliderScalePipesValue"></nouislider>
`,
  ts: `
public sliderScalePipesValue: number[] = [10, 18];
public configSliderScalePipes: object = {
behaviour: 'drag',
connect: true,
margin: 1,
limit: 8,
range: {
  min: 0,
  max: 20
},
pips: {
  mode: 'steps',
  density: 5
}
};
`
};

export const snippetCodeSliderTooltip: snippetCode = {
  html: `
<!-- noUiSlider tooltip -->
<nouislider [connect]="true" [ngClass]="'mt-5'" [behaviour]="'drag'" [tooltips]="true" [min]="0" [max]="100"
[limit]="40" [step]="2" [(ngModel)]="sliderTooltipValue"></nouislider>
`,
  ts: `
public sliderTooltipValue: number[] = [50, 70];
`
};

export const snippetCodeSliderInput: snippetCode = {
  html: `
  <div class="row">
  <div class="col-4 col-md-2">
    <p>Initial Value:</p>
    <div class="btn-group">
      <button
        class="btn btn-sm btn-primary font-weight-bold font-medium-1"
        (click)="sliderInputChange(0, -1)"
        rippleEffect
      >
        -1
      </button>
      <button
        class="btn btn-sm btn-primary font-weight-bold font-medium-1"
        (click)="sliderInputChange(0, 1)"
        rippleEffect
      >
        +1
      </button>      
    </div>
  </div>
  <div class="col-4 col-md-2">
    <p>Final Value:</p>
    <div class="btn-group">
      <button
        class="btn btn-sm btn-primary font-weight-bold font-medium-1"
        (click)="sliderInputChange(1, -1)"
        rippleEffect
      >
        -1
      </button>
      <button
        class="btn btn-sm btn-primary font-weight-bold font-medium-1"
        (click)="sliderInputChange(1, 1)"
        rippleEffect
      >
        +1
      </button>      
    </div>
  </div>
  <div class="col-4 col-md-2">
    <p>Disable:</p>
    <button
      class="btn btn-sm btn-danger font-medium-1"
      [ngClass]="disabled ? 'disabled' : null"
      (click)="disabled = !disabled"
      rippleEffect
    >
      Disable
    </button>
  </div>
  <div class="mt-2 mt-md-0 col-6 col-md-3">
    <p>Initial select:</p>
    <select
      [disabled]="disabled"
      class="form-control"
      [(ngModel)]="SelectValueInitial"
      (change)="onSelectChange()"
    >
      <option *ngFor="let sliderSelectValue of sliderSelectValues" [value]="sliderSelectValue">
        {{ sliderSelectValue }}
      </option>
    </select>
  </div>
  <div class="mt-2 mt-md-0 col-6 col-md-3">
    <p>Final Select:</p>
    <select
      [disabled]="disabled"
      class="form-control"
      [(ngModel)]="SelectValueFinal"
      (change)="onSelectChange()"
    >
      <option *ngFor="let sliderSelectValue of sliderSelectValues" [value]="sliderSelectValue">
        {{ sliderSelectValue }}
      </option>
    </select>
  </div>
</div>

<nouislider
  [connect]="true"
  [behaviour]="'drag'"
  [tooltips]="true"
  [min]="0"
  [max]="20"
  [step]="1"
  [(ngModel)]="sliderInputValue"
  [disabled]="disabled"
  [ngClass]="'mt-3'"
></nouislider>
`,
  ts: `
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
`
};

export const snippetCodeSliderColors: snippetCode = {
  html: `
  <!-- noUiSlider Default -->
  <h4>Default / Primary Color Slider</h4>
  <nouislider [connect]="true" [min]="0" [max]="100" [step]="2" [(ngModel)]="sliderDefault0"></nouislider>

  <!-- noUiSlider Secondary -->
  <h4>Secondary Color Slider</h4>
  <nouislider [connect]="true" [min]="0" [max]="100" [step]="2" [(ngModel)]="sliderSecondary0" [ngClass]="'circle-filled slider-secondary'"></nouislider>

  <!-- noUiSlider Success -->
  <h4>Success Color Slider</h4>
  <nouislider [connect]="true" [min]="0" [max]="100" [step]="2" [(ngModel)]="sliderSuccess0"
    [ngClass]="'circle-filled slider-success'"></nouislider>

  <!-- noUiSlider Warning -->
  <h4>Warning Color Slider</h4>
  <nouislider [connect]="true" [min]="0" [max]="100" [step]="2" [(ngModel)]="sliderWarning0"
    [ngClass]="'slider-warning'"></nouislider>

  <!-- noUiSlider Danger -->
  <h4>Danger Color Slider</h4>
  <nouislider [connect]="true" [min]="0" [max]="100" [step]="2" [(ngModel)]="sliderDanger0"
    [ngClass]="'circle-filled slider-danger'"></nouislider>

    <!-- noUiSlider Info -->
  <h4>Info Color Slider</h4>
  <nouislider [connect]="true" [min]="0" [max]="100" [step]="2" [(ngModel)]="sliderInfo0"
    [ngClass]="'square slider-info'"></nouislider>

  <!-- noUiSlider Dark -->
  <h4>Dark Color Slider</h4>
  <nouislider [connect]="true" [min]="0" [max]="100" [step]="2" [(ngModel)]="sliderDark0"
    [ngClass]="'square slider-dark'"></nouislider>
`,
  ts: `
// noUiSlider Color / Default Handle / Circle Filled Handle / Square Handle
public sliderDefault = [45, 55];
public sliderSuccess = [40, 60];
public sliderInfo = [30, 70];
public sliderWarning = [20, 80];
public sliderDanger = [10, 90];
public sliderSecondary0 = [40, 60];
public sliderDark0 = [5, 95];

`
};

export const snippetCodeDefaultHandle: snippetCode = {
  html: `

<!-- noUiSlider Extra Size -->
<h4>Extra Large Size</h4>
<nouislider [connect]="true" [min]="0" [max]="100" [step]="2" [(ngModel)]="sliderDefault"
  [ngClass]="'slider-primary slider-xl'"></nouislider>

<!-- noUiSlider Large Size -->
<h4>Large Size</h4>
<nouislider [connect]="true" [min]="0" [max]="100" [step]="2" [(ngModel)]="sliderSuccess"
  [ngClass]="'slider-success slider-lg'"></nouislider>

<!-- noUiSlider Default Size -->
<h4>Default</h4>
<nouislider [connect]="true" [min]="0" [max]="100" [step]="2" [(ngModel)]="sliderInfo"
  [ngClass]="'slider-info '"></nouislider>

<!-- noUiSlider Small Size -->
<h4>Small Size</h4>
<nouislider [connect]="true" [min]="0" [max]="100" [step]="2" [(ngModel)]="sliderWarning"
  [ngClass]="'slider-warning slider-sm'"></nouislider>

<!-- noUiSlider Extra Small Size -->
<h4>Extra Small</h4>
<nouislider [connect]="true" [min]="0" [max]="100" [step]="2" [(ngModel)]="sliderDanger"
  [ngClass]="'slider-danger slider-xs'"></nouislider>
`,
  ts: `
// noUiSlider Color / Default Handle / Circle Filled Handle / Square Handle
public sliderDefault = [45, 55];
public sliderSuccess = [40, 60];
public sliderInfo = [30, 70];
public sliderWarning = [20, 80];
public sliderDanger = [10, 90];
`
};

export const snippetCodeCircleFilledHandle: snippetCode = {
  html: `

<!-- noUiSlider Circle Filled Extra Size -->
<h4>Extra Large Size</h4>
<nouislider [connect]="true" [min]="0" [max]="100" [step]="2" [(ngModel)]="sliderDefault"
  [ngClass]="'circle-filled slider-primary slider-xl'"></nouislider>

<!-- noUiSlider Circle Filled Large Size -->
<h4>Large Size</h4>
<nouislider [connect]="true" [min]="0" [max]="100" [step]="2" [(ngModel)]="sliderSuccess"
  [ngClass]="'circle-filled slider-success slider-lg'"></nouislider>

<!-- noUiSlider Circle Filled Default Size -->
<h4>Default</h4>
<nouislider [connect]="true" [min]="0" [max]="100" [step]="2" [(ngModel)]="sliderInfo"
  [ngClass]="'circle-filled slider-info '"></nouislider>

<!-- noUiSlider Circle Filled Small Size -->
<h4>Small Size</h4>
<nouislider [connect]="true" [min]="0" [max]="100" [step]="2" [(ngModel)]="sliderWarning"
  [ngClass]="'circle-filled slider-warning slider-sm'"></nouislider>

<!-- noUiSlider Circle Filled Extra Small Size -->
<h4>Extra Small</h4>
<nouislider [connect]="true" [min]="0" [max]="100" [step]="2" [(ngModel)]="sliderDanger"
  [ngClass]="'circle-filled slider-danger slider-xs'"></nouislider>
`,
  ts: `
// noUiSlider Color / Default Handle / Circle Filled Handle / Square Handle
public sliderDefault = [45, 55];
public sliderSuccess = [40, 60];
public sliderInfo = [30, 70];
public sliderWarning = [20, 80];
public sliderDanger = [10, 90];
`
};

export const snippetCodeSquareHandle: snippetCode = {
  html: `

<!-- noUislider Square Extra Size -->
<h4>Extra Large Size</h4>
<nouislider [connect]="true" [min]="0" [max]="100" [step]="2" [(ngModel)]="sliderDefault"
  [ngClass]="'square slider-primary slider-xl'"></nouislider>

<!-- noUislider Square Large Size -->
<h4>Large Size</h4>
<nouislider [connect]="true" [min]="0" [max]="100" [step]="2" [(ngModel)]="sliderSuccess"
  [ngClass]="'square slider-success slider-lg'"></nouislider>

<!-- noUislider Square Default Size -->
<h4>Default</h4>
<nouislider [connect]="true" [min]="0" [max]="100" [step]="2" [(ngModel)]="sliderInfo"
  [ngClass]="'square slider-info '"></nouislider>

<!-- noUislider Square Small Size -->
<h4>Small Size</h4>
<nouislider [connect]="true" [min]="0" [max]="100" [step]="2" [(ngModel)]="sliderWarning"
  [ngClass]="'square slider-warning slider-sm'"></nouislider>

<!-- noUislider Square Extra Small Size -->
<h4>Extra Small</h4>
<nouislider [connect]="true" [min]="0" [max]="100" [step]="2" [(ngModel)]="sliderDanger"
  [ngClass]="'square slider-danger slider-xs'"></nouislider>
`,
  ts: `
// noUiSlider Color / Default Handle / Circle Filled Handle / Square Handle
public sliderDefault = [45, 55];
public sliderSuccess = [40, 60];
public sliderInfo = [30, 70];
public sliderWarning = [20, 80];
public sliderDanger = [10, 90];
`
};

export const snippetCodeVerticalSingleHandle: snippetCode = {
  html: `

<!-- noUiSlider vertical single handle default -->
<nouislider [min]="0" [max]="100" [step]="5" [config]="configVerticalSingleHandle"
[ngClass]="'noUi-vertical'" [(ngModel)]="verticalSingleHandleValue"></nouislider>

<!-- noUiSlider vertical single handle success -->
<nouislider [min]="0" [max]="100" [step]="5" [config]="configVerticalSingleHandle"
[ngClass]="'noUi-vertical ml-2 slider-success'" [(ngModel)]="verticalSingleHandleValue"></nouislider>

<!-- noUiSlider vertical single handle info -->
<nouislider [min]="0" [max]="100" [step]="5" [config]="configVerticalSingleHandle"
[ngClass]="'noUi-vertical ml-2 slider-info'" [(ngModel)]="verticalSingleHandleValue"></nouislider>

<!-- noUiSlider vertical single handle warning -->
<nouislider [min]="0" [max]="100" [step]="5" [config]="configVerticalSingleHandle"
[ngClass]="'noUi-vertical ml-2 slider-warning'" [(ngModel)]="verticalSingleHandleValue"></nouislider>

<!-- noUiSlider vertical single handle danger -->
<nouislider [min]="0" [max]="100" [step]="5" [config]="configVerticalSingleHandle"
[ngClass]="'noUi-vertical ml-2 slider-danger'" [(ngModel)]="verticalSingleHandleValue"></nouislider>
`,
  ts: `
// vertical Single Handle
public verticalSingleHandleValue: number = 40;
public configVerticalSingleHandle: object = {
orientation: 'vertical',
range: {
  min: 0,
  max: 100
}
};
`
};

export const snippetCodeVerticalUpper: snippetCode = {
  html: `

<!-- noUiSlider vertical connect upper default -->
<nouislider [min]="0" [max]="100" [step]="5" [config]="configVerticalUpper" [connect]="'upper'"
[ngClass]="'noUi-vertical'" [(ngModel)]="verticalUpperValue"></nouislider>

<!-- noUiSlider vertical connect upper success -->
<nouislider [min]="0" [max]="100" [step]="5" [config]="configVerticalUpper" [connect]="'upper'"
[ngClass]="'noUi-vertical ml-2 slider-success'" [(ngModel)]="verticalUpperValue"></nouislider>

<!-- noUiSlider vertical connect upper info -->
<nouislider [min]="0" [max]="100" [step]="5" [config]="configVerticalUpper" [connect]="'upper'"
[ngClass]="'noUi-vertical ml-2 slider-info'" [(ngModel)]="verticalUpperValue"></nouislider>

<!-- noUiSlider vertical connect upper warning -->
<nouislider [min]="0" [max]="100" [step]="5" [config]="configVerticalUpper" [connect]="'upper'"
[ngClass]="'noUi-vertical ml-2 slider-warning'" [(ngModel)]="verticalUpperValue"></nouislider>

<!-- noUiSlider vertical connect upper danger -->
<nouislider [min]="0" [max]="100" [step]="5" [config]="configVerticalUpper" [connect]="'upper'"
[ngClass]="'noUi-vertical ml-2 slider-danger'" [(ngModel)]="verticalUpperValue"></nouislider>
`,
  ts: `
// vertical upper
public verticalUpperValue: number = 60;
public configVerticalUpper: object = {
orientation: 'vertical',
range: {
  min: 0,
  max: 100
}
};
`
};

export const snippetCodeVerticalTooltip: snippetCode = {
  html: `

<!-- noUiSlider vertical tooltip default -->
<nouislider [min]="0" [max]="100" [step]="0.05" [config]="configVerticalTooltip" [tooltips]="[false, true]"
  [connect]="false" [ngClass]="'noUi-vertical'" [(ngModel)]="verticalTooltipValue"></nouislider>

<!-- noUiSlider vertical tooltip success -->
<nouislider [min]="0" [max]="100" [step]="0.05" [config]="configVerticalTooltip" [tooltips]="[false, true]"
  [connect]="false" [ngClass]="'noUi-vertical ml-5 slider-success'" [(ngModel)]="verticalTooltipValue">
</nouislider>

<!-- noUiSlider vertical tooltip info -->
<nouislider [min]="0" [max]="100" [step]="0.05" [config]="configVerticalTooltip" [tooltips]="[false, true]"
  [connect]="false" [ngClass]="'noUi-vertical ml-5 slider-info'" [(ngModel)]="verticalTooltipValue">
</nouislider>
`,
  ts: `
// vertical tooltip
public verticalTooltipValue = [10, 70];
public configVerticalTooltip: object = {
  orientation: 'vertical',
  range: {
    min: 0,
    max: 100
  }
};
`
};

export const snippetCodeVerticalLimit: snippetCode = {
  html: `

<!-- noUiSlider vertical Limit default -->
<nouislider [min]="0" [max]="100" [step]="5" [limit]="40" [config]="configVerticalLimit" [connect]="true"
  [ngClass]="'noUi-vertical'" [(ngModel)]="verticalLimitValue"></nouislider>

<!-- noUiSlider vertical Limit success -->
<nouislider [min]="0" [max]="100" [step]="5" [limit]="40" [config]="configVerticalLimit" [connect]="true"
  [ngClass]="'noUi-vertical ml-5 slider-success'" [(ngModel)]="verticalLimitValue"></nouislider>

<!-- noUiSlider vertical Limit info -->
<nouislider [min]="0" [max]="100" [step]="5" [limit]="40" [config]="configVerticalLimit" [connect]="true"
  [ngClass]="'noUi-vertical ml-5 slider-info'" [(ngModel)]="verticalLimitValue"></nouislider>
`,
  ts: `
// vertical limit
public verticalLimitValue = [10, 70];
public configVerticalLimit: object = {
  orientation: 'vertical',
  range: {
    min: 0,
    max: 100
  }
};
`
};
