import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-screen-keygroup-name',
  standalone: true,
  imports: [],
  templateUrl: './screen-keygroup-name.component.html',
  styleUrl: './screen-keygroup-name.component.scss'
})
export class ScreenKeygroupNameComponent {
  @Input() keygroupName = '';
}
