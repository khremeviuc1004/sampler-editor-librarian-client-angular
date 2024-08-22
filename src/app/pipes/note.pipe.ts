import { Pipe, PipeTransform } from '@angular/core';
import { ShowOnDirtyErrorStateMatcher } from '@angular/material/core';

@Pipe({
  name: 'notePipe',
  standalone: true
})
export class NotePipe implements PipeTransform {

  notes = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];

  transform(value: number, showNote: boolean = true): string | number {

    let octave = Math.trunc((value - (21 - 10)) / 12) - 1;
    let noteIndex = (value - 21) % 12;

    if (showNote) {
      return String(this.notes[noteIndex]).concat(String(octave));
    }
    else {
      return value;
    }
  }
}
