import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initials'
})
export class InitialsPipe implements PipeTransform {
  transform(fullName: string): any {
    return fullName
      ?.split(' ')
      .map(n => n[0])
      .join('');
  }
}
