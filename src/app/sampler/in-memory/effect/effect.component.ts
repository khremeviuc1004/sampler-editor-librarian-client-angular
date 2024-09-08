import { Component, inject, OnInit, ViewChild } from '@angular/core';
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
import { StereoPanPipe } from '../../../pipes/stereo-pan.pipe';
import { ToastrService } from 'ngx-toastr';
import { FixedLengthNameFieldComponent } from '../../fixed-length-name-field/fixed-length-name-field.component';

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
    StereoPanPipe,
    FixedLengthNameFieldComponent
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

  effectNumberInMemory = -1;
  effectTypeInMemory = 0;
  effect: EchoEffect | DelayEffect | PitchShiftEffect | ChorusEffect | null =
    null;
  effectsAndReverbFilename: string | null = null;

  effectTypes = effectType;
  effectTypeEnum = EffectType;

  constructor(route: ActivatedRoute, private toastr: ToastrService) {
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
        console.log('FX filename: ', effectsAndRverHeader);
        this.effectsAndReverbFilename = effectsAndRverHeader.filename;
      });
  }

  onEffectNameFilterInput(event: Event) {
    this.setEffectNameFilter((event.target as HTMLInputElement).value);
  }

  setEffectNameFilter(value: string) {
    this.samplerEffectNamesDataSource.filter = value;
  }

  onRowClick(value: number) {
    this.effectNumberInMemory = value;
    this.samplerService
      .samplerEffect(value)
      .subscribe((effect) => {
        console.log('Effect', effect);
        this.effect = effect;
        this.effectTypeInMemory = this.effect.type;
      });
  }

  effectUpdatePartAndRefreshLocalData(effectNumberInMemory: number, effectTypeInMemory: number, index: number, value: number) {
    this.samplerService.samplerEffectUpdatePart(effectNumberInMemory, effectTypeInMemory, index, value, (success) => {
      console.log('Effect updated', success);
      this.reloadEffect();
    });
  }

  reloadEffect() {
    this.samplerService
      .samplerEffect(this.effectNumberInMemory)
      .subscribe((effect) => {
        console.log('Effect', effect);
        this.effect = effect;
        this.effectTypeInMemory = this.effect.type;
      });
  }

  protected onEffectNameChange(value: string) {
    console.log('onEffectNameChange', value);
    this.samplerService.samplerEffectUpdateName(
      +this.effectNumberInMemory,
      value,
      (success: boolean) => {
        console.log('Effect updated', success);
        if (success) {
          this.toastr.success('Success', 'Updated the effect name');
          this.loadEffects();
        }
        else {
          this.toastr.error('Error', 'Could not update the effect name');
        }
      }
    );
  }

  protected onEffectsAndReverbFilenameChange(value: string) {
    this.samplerService
      .samplerEffectHeaderFilenameUpdate(
        value,
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
