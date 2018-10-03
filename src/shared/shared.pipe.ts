import { Pipe, PipeTransform } from '@angular/core';
import { data } from '../services/data.service';

const tens: number = 10;

@Pipe({name: 'hasValue'})
export class HasValuePipe implements PipeTransform {
  transform(value: data): boolean {
    return Array.isArray(value) ?
      value.length !== 0 :
      value !== null && value !== undefined;
  }
}

@Pipe({name: 'format'})
export class FormatPipe implements PipeTransform {
  transform(value: data): string | number {
    if (Array.isArray(value)) {
      return value.join(', ');
    } else if (typeof value === 'number') {
      return Math.round(value * tens) / tens;
    }
    return value;
  }
}
