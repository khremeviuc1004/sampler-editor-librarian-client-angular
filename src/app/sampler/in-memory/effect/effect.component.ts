import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ScreenTitleComponent } from '../../screen-title/screen-title.component';
import { ActivatedRoute, Router } from '@angular/router';
import { SamplerService } from '../../../services/sampler.service';
import {
  ChorusEffect,
  DelayEffect,
  EchoEffect,
  EffectType,
  PitchShiftEffect,
} from 'sampler-editor-librarian-dto';
import { effectType } from '../../../../util/util';
import { MenuComponent } from '../../menu/menu.component';

@Component({
  selector: 'app-effect',
  standalone: true,
  imports: [
    MatProgressSpinnerModule,
    MatGridListModule,
    MatCheckboxModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ScreenTitleComponent,
    MatMenuModule,
    MatSelectModule,
    MenuComponent,
  ],
  templateUrl: './effect.component.html',
  styleUrl: './effect.component.scss',
})
export class EffectComponent implements OnInit {
  route: ActivatedRoute | null = null;
  samplerService = inject(SamplerService);
  router = inject(Router);

  samplerEffectsDisplayedColumns: string[] = ['name'];

  samplerEffectNamesDataSource = new MatTableDataSource<string>(
    new Array<string>(),
  );
  @ViewChild('effectsPaginator')
  samplerEffectNamesPaginator!: MatPaginator;
  samplerEffectNamesLoading = true;

  effectNumberInMemory = 0;
  effectTypeInMemory = 0;
  effect: EchoEffect | DelayEffect | PitchShiftEffect | ChorusEffect | null =
    null;
  protected readonly name = signal('');
  effectsAndReverbFilename: string | null = null;
  protected readonly effectsFilenameSignal = signal('');

  effectTypes = effectType;
  effectTypeEnum = EffectType;

  constructor(route: ActivatedRoute) {
    this.route = route;
  }

  ngOnInit(): void {
    this.samplerEffectNamesDataSource.filterPredicate = (data, filter) => {
      return (
        data
          .toString()
          .toLowerCase()
          .indexOf(filter.toString().toLowerCase()) != -1
      );
    };
    this.loadEffects();
    this.loadEffectsAndReverbFilename();
  }

  loadEffects() {
    this.samplerEffectNamesLoading = true;
    this.samplerService.samplerEffects().subscribe((data) => {
      this.samplerEffectNamesDataSource.data = data;
      this.samplerEffectNamesDataSource.paginator =
        this.samplerEffectNamesPaginator;
      this.samplerEffectNamesLoading = false;
    });
  }

  loadEffectsAndReverbFilename() {
    this.samplerService
      .samplerEffectHeaderFilename()
      .subscribe((effectsAndRverHeader) => {
        console.log('FX filename: ', effectsAndRverHeader.filename);
        this.effectsAndReverbFilename = effectsAndRverHeader.filename;
      });
  }

  onEffectNameFilterInput(event: Event) {
    this.setEffectNameFilter((event.target as HTMLInputElement).value);
  }

  setEffectNameFilter(value: string) {
    this.samplerEffectNamesDataSource.filter = value;
  }

  onRowClick(value: string) {
    this.samplerService
      .samplerEffect(this.samplerEffectNamesDataSource.data.indexOf(value))
      .subscribe((effect) => {
        console.log('Effect', effect);
        this.effect = effect;
        this.effectNumberInMemory =
          this.samplerEffectNamesDataSource.data.indexOf(value);
        this.effectTypeInMemory = this.effect.type;
      });
  }

  protected onEffectNameInput(event: Event) {
    this.name.set((event.target as HTMLInputElement).value);
  }

  protected onEffectNameChange(event: Event) {
    this.samplerService.samplerEffectUpdateName(
      +this.effectNumberInMemory,
      (event.target as HTMLInputElement).value,
    );
  }

  protected onEffectsAndReverbFilenameInput(event: Event) {
    this.effectsFilenameSignal.set((event.target as HTMLInputElement).value);
  }

  protected onEffectsAndReverbFilenameChange(event: Event) {
    this.samplerService
      .samplerEffectHeaderFilenameUpdate(
        (event.target as HTMLInputElement).value,
      )
      .subscribe((success) =>
        console.log('Effects and reverb filename updated: ', success),
      );
  }

  getEchoEffect(): EchoEffect {
    return this.effect as EchoEffect;
  }

  getChorusEffect(): ChorusEffect {
    return this.effect as ChorusEffect;
  }

  getPitchShiftEffect(): PitchShiftEffect {
    return this.effect as PitchShiftEffect;
  }

  getDelayEffect(): DelayEffect {
    return this.effect as DelayEffect;
  }
}
