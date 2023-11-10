import { Component, OnInit, Input, ViewChild, ElementRef, HostListener, EventEmitter, Output } from '@angular/core';

import { BlockUIService } from 'ng-block-ui';

import { CoreBlockUiComponent } from '@core/components/core-card/core-block-ui/core-block-ui.component';

@Component({
  selector: 'core-card',
  templateUrl: './core-card.component.html'
})
export class CoreCardComponent implements OnInit {
  // public
  // Generate random string  assign to specific core-card to only block that specific card
  public coreCardId: string = Math.random().toString(36).substring(2);

  // To pass core-block-ui component values to _CoreBlockUiComponent variable
  public _CoreBlockUiComponent = CoreBlockUiComponent;

  // default status before click event
  public onclickEvent = {
    collapseStatus: false,
    expandStatus: false,
    reloadStatus: false,
    closeStatus: false
  };

  // default action-views
  public actionsView = {
    collapse: false,
    expand: false,
    reload: false,
    close: false
  };

  @Input() actions: string[];
  @Input() isReload = false;
  @Input() reloadTime: number = 2500;
  @Output() events: EventEmitter<any>;
  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    // on press of esc card will return to normal from full screen
    if (this.onclickEvent.expandStatus) {
      this.onclickEvent.expandStatus = false;
    }
  }

  // private
  @ViewChild('coreCard') private coreCard: ElementRef;
  @ViewChild('cardHeader') private cardHeader: ElementRef;

  /**
   * Constructor
   *
   * @param {BlockUIService} blockUIService
   */
  constructor(private blockUIService: BlockUIService) {
    this.events = new EventEmitter<any>();
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * ng On Init
   */
  ngOnInit() {
    // show collapse icon if actions includes 'collapse'
    if (this.actions.includes('collapse')) {
      this.actionsView.collapse = true;
    }

    // show expand icon if actions includes 'expand'
    if (this.actions.includes('expand')) {
      this.actionsView.expand = true;
    }

    // show reload icon if actions includes 'reload'
    if (this.actions.includes('reload')) {
      this.actionsView.reload = true;
    }

    // show close icon if actions includes 'close'
    if (this.actions.includes('close')) {
      this.actionsView.close = true;
    }
  }

  /**
   *
   * @param changes
   *
   * ng On Changes
   */
  ngOnChanges(changes: any) {
    if (changes.isReload?.currentValue === true) {
      this.events.emit('reload');
      this.blockUIService.start(this.coreCardId);
    } else if (changes.isReload?.currentValue === false) {
      this.blockUIService.stop(this.coreCardId);
    }
  }

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Collapse
   */
  collapse() {
    this.events.emit('collapse');
    const cardHeaderEl = this.cardHeader.nativeElement;
    this.onclickEvent.collapseStatus = !this.onclickEvent.collapseStatus;
    if (this.onclickEvent.collapseStatus) {
      setTimeout(() => {
        cardHeaderEl.classList.add('pb-2');
      }, 350);
    } else {
      cardHeaderEl.classList.remove('pb-2');
    }
  }

  /**
   * Expand
   */
  expand() {
    this.events.emit('expand');
    this.onclickEvent.expandStatus = !this.onclickEvent.expandStatus;
  }

  /**
   * Close
   */
  close() {
    this.events.emit('close');
    this.coreCard.nativeElement.remove();
  }

  /**
   * Reload
   */
  reload() {
    this.isReload = true;
    this.events.emit('reload');
    this.blockUIService.start(this.coreCardId);

    // block-ui timeout
    setTimeout(() => {
      this.blockUIService.stop(this.coreCardId);
      this.isReload = false;
    }, this.reloadTime);
  }
}
