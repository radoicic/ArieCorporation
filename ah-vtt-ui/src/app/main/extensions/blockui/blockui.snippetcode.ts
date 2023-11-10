import { snippetCode } from '@core/components/card-snippet/card-snippet.component';

export const snippetCodeSectionBlocking: snippetCode = {
  html: `
  <div class="border p-1" *blockUI="'section-block'">
  <p class="card-text mb-0">
    Lorem ipsum dolor sit amet, an vel affert soleat possim. Usu meis neglegentur ut, oporteat salutandi
    dignissim at mea. Pericula erroribus quaerendum ex duo, his autem accusamus ad, alienum detracto
    rationibus vis et. No est volumus ocurreret vituperata.
  </p>
</div>
<div class="demo-inline-spacing">
  <button class="btn btn-outline-primary btn-section-block" (click)="defaultSectionBlockUI()" rippleEffect>
    Default
  </button>
</div>
  `,
  ts: `
  @BlockUI('section-block') sectionBlockUI: NgBlockUI;
  `
};
export const snippetCodeCardBlocking: snippetCode = {
  html: `
  <div *blockUI="'card-section'">
  <core-card-snippet [snippetCode]="_snippetCodeCardBlocking">
    <h4 class="card-title">Card Blocking</h4>
    <div class="card-body">
      <p class="card-text">
        Lorem ipsum dolor sit amet, an vel affert soleat possim. Usu meis neglegentur ut, oporteat salutandi
        dignissim at mea. Pericula erroribus quaerendum ex duo, his autem accusamus ad, alienum detracto
        rationibus vis et. No est volumus ocurreret vituperata.
      </p>
      <p class="card-text mb-0">
        Lorem ipsum dolor sit amet, an vel affert soleat possim. Usu meis neglegentur ut, oporteat salutandi
        dignissim
      </p>
      <div class="demo-inline-spacing">
        <button class="btn btn-outline-primary btn-section-block" (click)="defaultCardBlockUI()" rippleEffect>
          Default
        </button>
      </div>
    </div>
  </core-card-snippet>
</div>
  `,
  ts: `
  @BlockUI('card-section') cardBlockUI: NgBlockUI;
  `
};
export const snippetCodePageBlocking: snippetCode = {
  html: `
  <p class="card-text">
    Lorem ipsum dolor sit amet, an vel affert soleat possim. Usu meis neglegentur ut, oporteat salutandi
    dignissim at mea. Pericula erroribus quaerendum ex duo, his autem accusamus ad, alienum detracto
    rationibus vis et. No est volumus ocurreret vituperata.
  </p>
  <p class="card-text mb-0">
    Lorem ipsum dolor sit amet, an vel affert soleat possim. Usu meis neglegentur ut, oporteat salutandi
    dignissim
  </p>
  <button class="btn btn-outline-primary" (click)="fullPageBlockUI()" rippleEffect>Default</button>
  <block-ui> </block-ui>
  `,
  ts: `
  @BlockUI() blockUI: NgBlockUI;
  `
};
export const snippetCodeFormBlocking: snippetCode = {
  html: `
<form class="form-block p-50" *blockUI="'form-section'">
  <div class="form-group">
    <label for="username">Username</label>
    <input class="form-control" type="text" id="username" placeholder="Username" />
  </div>
  <div class="form-group">
    <label for="email">Email</label>
    <input class="form-control" type="email" id="email" placeholder="Email" />
  </div>
  <div class="form-group">
    <label for="password">Password</label>
    <input class="form-control" type="password" id="password" placeholder="Password" />
  </div>
  <div class="form-group text-right mb-0">
    <button class="btn btn-primary disabled mr-75" rippleEffect>Submit</button>
    <button class="btn btn-outline-secondary disabled" rippleEffect>Reset</button>
  </div>
</form>
<button class="btn btn-outline-primary btn-section-block mt-1" (click)="defaultFormBlockUI()" rippleEffect>
  Default
</button>
  `,
  ts: `
  @BlockUI('form-section') formBlockUI: NgBlockUI;
  `
};
