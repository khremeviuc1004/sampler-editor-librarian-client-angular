import { Component, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ToastrService } from 'ngx-toastr';
import { SamplerService } from '../services/sampler.service';

@Component({
  selector: 'app-fixed-length-name-field',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './fixed-length-name-field.component.html',
  styleUrl: './fixed-length-name-field.component.scss'
})
export class FixedLengthNameFieldComponent {
  @Input()
  nameFieldTitle = '';
  @Input()
  nameFieldValue = '';
  @Input()
  maxChars = '20';
  @Input()
  minChars = '5';
  @Input()
  parentComponent!: object;

  @Output()
  doChange = new EventEmitter();

  protected readonly name = signal('');
  samplerService = inject(SamplerService);

  constructor(private toastr: ToastrService) {}

  onNameInput(event: Event) {
    this.name.set((event.target as HTMLInputElement).value);
  }

  onNameChange(event: Event): void {
    this.doChange.emit((event.target as HTMLInputElement).value);
  }
}
