import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stereoPan',
  standalone: true,
})
export class StereoPanPipe implements PipeTransform {
  transform(value: number): string {
    if (value && value == 0) {
      return 'Mid';
    } else if (value && value < 0) {
      return 'L' + Math.abs(value);
    } else if (value && value > 0) {
      return 'R' + value;
    } else {
      return '';
    }
  }
}
