import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: any): any {
    if (value.length === 0 || value.length === 1){
      return value;
    }
    return value.sort((a, b) => (a.name > b.name) ? 1 : -1);
  }

}
