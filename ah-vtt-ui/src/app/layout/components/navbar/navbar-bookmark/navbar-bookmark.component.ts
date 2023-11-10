import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, HostListener, Inject, OnInit, ViewChild } from '@angular/core';

import { SearchService } from 'app/layout/components/navbar/navbar-search/search.service';

@Component({
  selector: 'app-navbar-bookmark',
  templateUrl: './navbar-bookmark.component.html'
})
export class NavbarBookmarkComponent implements OnInit {
  // Public
  public bookmarkText = '';
  public openBookmarkRef = false;
  public activeIndex = 0;
  public apiData;
  public pages = [];
  public bookmarkSearchLimit;
  public bookmarkedItems;

  // Decorator
  @ViewChild('openBookmark') private _bookmarkElement: ElementRef;
  @HostListener('keydown.escape') fn() {
    this.removeOverlay();
    this.openBookmarkRef = false;
    this.bookmarkText = '';
  }
  @HostListener('document:click', ['$event']) clickout(event) {
    // Close Bookmark if Clicked on Overlay
    if (event.target.className === 'content-overlay') {
      this.removeOverlay();
      this.openBookmarkRef = false;
      this.bookmarkText = '';
    }

    // Close Bookmark if clicked Outside of Container
    if (!(event.target.nodeName === 'INPUT') && this.openBookmarkRef === true) {
      this.removeOverlay();
      this.openBookmarkRef = false;
      this.bookmarkText = '';
    }
  }

  /**
   *
   * @param document
   * @param _searchService
   */
  constructor(@Inject(DOCUMENT) private document, public _searchService: SearchService) {}

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Add Bookmark
   *
   * @param id
   */
  addBookmark(id) {
    const index = this.pages.findIndex(object => {
      return object.id === id;
    });
    this.pages[index].isBookmarked = true;

    this.bookmarkedItems.push(this.pages[index]);
  }

  /**
   * Remove Bookmark
   *
   * @param id
   */
  removeBookmark(id) {
    const index = this.bookmarkedItems.findIndex(object => {
      return object.id === id;
    });
    this.bookmarkedItems[index].isBookmarked = false;
    this.bookmarkedItems.splice(index, 1);
  }

  /**
   * Open Bookmark
   */
  openBookmark() {
    this.openBookmarkRef = true;
    this._searchService.onIsBookmarkOpenChange.next(this.openBookmarkRef);
  }

  /**
   * Close Bookmark
   */
  closeBookmark() {
    this.openBookmarkRef = false;
    this._searchService.onIsBookmarkOpenChange.next(this.openBookmarkRef);
  }

  /**
   * Remove Overlay
   */
  removeOverlay() {
    this.document.querySelector('.app-content').classList.remove('show-overlay');
  }

  /**
   * Next Active Match
   */
  nextActiveMatch() {
    this.activeIndex = this.activeIndex < this.bookmarkSearchLimit - 1 ? ++this.activeIndex : this.activeIndex;
  }

  /**
   * Previous Active Match
   */
  prevActiveMatch() {
    this.activeIndex = this.activeIndex > 0 ? --this.activeIndex : 0;
  }

  /**
   * Auto Suggestion
   *
   * @param event
   */
  autoSuggestion(event) {
    if (38 === event.keyCode) {
      return this.prevActiveMatch();
    }
    if (40 === event.keyCode) {
      return this.nextActiveMatch();
    }
  }

  /**
   * Toggle Bookmark
   *
   * @param id
   */
  toggleBookmark(id) {
    const index = this.pages.findIndex(object => {
      return object.id === id;
    });
    if (this.pages[index].isBookmarked === true) {
      this.removeBookmark(id);
    } else {
      this.addBookmark(id);
    }
  }

  /**
   * Toggle Bookmark Popup
   */
  toggleBookmarkPopup() {
    setTimeout(() => {
      if (this.openBookmarkRef === false) {
        this.openBookmark();
      } else {
        this.closeBookmark();
      }
      setTimeout(() => {
        this._bookmarkElement.nativeElement.focus();
      }, 0);
    }, 0);
  }

  /**
   * Update Bookmark
   *
   * @param event
   */
  bookmarkUpdate(event) {
    const val = event.target.value.toLowerCase();
    if (val !== '') {
      this.document.querySelector('.app-content').classList.add('show-overlay');
    } else {
      this.document.querySelector('.app-content').classList.remove('show-overlay');
    }
    this.autoSuggestion(event);
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this._searchService.onApiDataChange.subscribe(res => {
      this.apiData = res;
      this.pages = this.apiData[0].data;
      this.bookmarkedItems = this.pages.filter(page => page.isBookmarked === true);
      this.bookmarkSearchLimit = this.apiData[0].bookmarkLimit;
    });
    this._searchService.onIsBookmarkOpenChange.subscribe(res => {
      this.openBookmarkRef = res;
    });
  }
}
