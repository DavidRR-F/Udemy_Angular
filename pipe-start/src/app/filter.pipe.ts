import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  // pipe get recalculated whenever datta changes
  // can cause performance issues (use only if necisary)
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filter: string): any {
    const results = [];
    if (value.length === 0 || filter === ''){
      return value;
    }
    for (const item of value) {
      if (item.status === filter){
        results.push(item);
      }
    }
    return results;
  }

}
