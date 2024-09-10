import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-screen-title',
  standalone: true,
  imports: [],
  templateUrl: './screen-title.component.html',
  styleUrl: './screen-title.component.scss'
})
export class ScreenTitleComponent {
  @Input() screenTitle = '';
}
