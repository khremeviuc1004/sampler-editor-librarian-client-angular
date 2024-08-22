import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-screen-program-name',
  standalone: true,
  imports: [],
  templateUrl: './screen-program-name.component.html',
  styleUrl: './screen-program-name.component.scss'
})
export class ScreenProgramNameComponent {
  @Input() programName = '';
}
