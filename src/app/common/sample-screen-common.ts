import { inject } from '@angular/core';
import { Sample as InMemorySample } from 'sampler-editor-librarian-dto'
import { SamplerService } from '../services/sampler.service';
import { ActivatedRoute } from '@angular/router';
import { ScreenCommon } from './screen-common';

export abstract class SampleScreenCommon extends ScreenCommon {

  sampleNumberInMemory = "0";
  sampleHeader: InMemorySample | null = null;
  samplerService = inject(SamplerService);

  constructor(route: ActivatedRoute){
    super(route);
  }

  sampleOnInit(): void {
    const sampleNumberInMemory = this.route?.snapshot.paramMap.get('sampleNumberInMemory');
    this.sampleNumberInMemory = sampleNumberInMemory ? sampleNumberInMemory : "0";

    this.samplerService.samplerRequestSampleHeader(+this.sampleNumberInMemory).subscribe(sample => {
      this.sampleHeader = sample;
      this.doExtraStuff();
    });
  }

  abstract doExtraStuff(): void ;

  sampleHeaderChanged(sampleHeaderIndex: number, event: Event): void {
    this.samplerService.samplerChangeValueInSampleHeader(+this.sampleNumberInMemory, sampleHeaderIndex, +(event.target as HTMLInputElement).value);
  }

  sampleHeaderNameChanged(sampleHeaderIndex: number, value: string): void {
    this.samplerService.samplerChangeSampleNameInSampleHeader(+this.sampleNumberInMemory, sampleHeaderIndex, value);
  }

  sampleEnumTypeChanged(sampleHeaderIndex: number, programEnumType: string) {
    this.samplerService.samplerChangeValueInSampleHeader(+this.sampleNumberInMemory, sampleHeaderIndex, +programEnumType);
  }

  sampleBooleanTypeChanged(sampleHeaderIndex: number, checked: boolean): void {
    this.samplerService.samplerChangeValueInSampleHeader(+this.sampleNumberInMemory, sampleHeaderIndex, checked);
  }
}
