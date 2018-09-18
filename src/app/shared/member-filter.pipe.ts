import { Pipe, PipeTransform } from '@angular/core';

import { Member } from './Member';

@Pipe({
    name: 'memberfilter',
    pure: false
})
export class MemberFilterPipe implements PipeTransform {
  transform(items: Member[], filter: Member): Member[] {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be kept, false will be filtered out
    return items.filter((item: Member) => this.applyFilter(item, filter));
  }

  /**
   * Perform the filtering.
   *
   * @param {Member} Member The Member to compare to the filter.
   * @param {Member} filter The filter to apply.
   * @return {boolean} True if Member satisfies filters, false if not.
   */
  applyFilter(Member: Member, filter: Member): boolean {
    for (let field in filter) {
      if (filter[field]) {
        if (typeof filter[field] === 'string') {
          if (Member[field].toLowerCase().indexOf(filter[field].toLowerCase()) === -1) {
            return false;
          }
        } else if (typeof filter[field] === 'number') {
          if (Member[field] !== filter[field]) {
            return false;
          }
        }
      }
    }
    return true;
  }
}
