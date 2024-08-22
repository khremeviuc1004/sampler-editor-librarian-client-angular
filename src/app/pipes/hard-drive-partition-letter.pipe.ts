import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hardDrivePartitionLetter',
  standalone: true
})
export class HardDrivePartitionLetterPipe implements PipeTransform {

  partitionLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"]; // only need 10

  transform(partitionNumber: number): string {
    return String(this.partitionLetters[partitionNumber]);
  }
}
