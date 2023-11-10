import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  /**
   * Transform
   *
   * @param {any[]} items
   * @param {string} searchText
   * @param {string} key
   *
   * @returns {any}
   */
  transform(items: any[], searchText: string, key: string): any[] {
    if (!items) return [];
    if (!searchText) return items;

    searchText = searchText.toLowerCase();
    return items.filter(it => {
      return it[key].toLowerCase().includes(searchText);
    });
  }
}
