import { inject } from '@angular/core';
import { KeyGroup as InMemoryKeygroup, Program as InMemoryProgram } from 'sampler-editor-librarian-dto'
import { SamplerService } from '../services/sampler.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ScreenCommon } from './screen-common';

export class KeygroupScreenCommon extends ScreenCommon {

  programNumberInMemory = "0";
  programHeader: InMemoryProgram | null = null;
  keygroupNumberInMemory = "0";
  keygroupHeader: InMemoryKeygroup | null = null;
  samplerService = inject(SamplerService);
  router = inject(Router);


  constructor(route: ActivatedRoute){
    super(route);
  }

  keygroupOnInit(): void {
    const programNumberInMemory = this.route?.snapshot.paramMap.get('programNumberInMemory');
    this.programNumberInMemory = programNumberInMemory ? programNumberInMemory : "0";
    const keygroupNumberInMemory = this.route?.snapshot.paramMap.get('keygroupNumberInMemory');
    this.keygroupNumberInMemory = keygroupNumberInMemory ? keygroupNumberInMemory : "0";

    this.samplerService.samplerRequestProgramHeader(+this.programNumberInMemory).subscribe(program => {
      this.programHeader = program;

      this.samplerService.samplerRequestKeygroupHeader(+this.programNumberInMemory, +this.keygroupNumberInMemory).subscribe(keygroup => {
        this.keygroupHeader = keygroup;
        this.doExtraStuff();
      });
    });
  }

  doExtraStuff() {

  }

  programHeaderChanged(programHeaderIndex: number, event: Event): void {
    this.samplerService.samplerChangeValueInProgramHeader(+this.programNumberInMemory, programHeaderIndex, +(event.target as HTMLInputElement).value);
  }

  programEnumTypeChanged(programHeaderIndex: number, programEnumType: string) {
    this.samplerService.samplerChangeValueInProgramHeader(+this.programNumberInMemory, programHeaderIndex, +programEnumType);
  }

  programBooleanTypeChanged(programHeaderIndex: number, checked: boolean): void {
    this.samplerService.samplerChangeValueInProgramHeader(+this.programNumberInMemory, programHeaderIndex, checked);
  }

  keygroupHeaderChanged(keygroupHeaderIndex: number, event: Event): void {
    this.samplerService.samplerChangeValueInKeygroupHeader(+this.programNumberInMemory, +this.keygroupNumberInMemory, keygroupHeaderIndex, +(event.target as HTMLInputElement).value);
  }

  keygroupEnumTypeChanged(keygroupHeaderIndex: number, keygroupType: string) {
    this.samplerService.samplerChangeValueInKeygroupHeader(+this.programNumberInMemory, +this.keygroupNumberInMemory, keygroupHeaderIndex, +keygroupType);
  }

  keygroupBooleanTypeChanged(keygroupHeaderIndex: number, checked: boolean): void {
    this.samplerService.samplerChangeValueInKeygroupHeader(+this.programNumberInMemory, +this.keygroupNumberInMemory, keygroupHeaderIndex, checked);
  }

  zoneChangeSampleName(keygroupHeaderIndex: number, sampleName: string) {
    this.samplerService.samplerChangeZoneSampleNameInKeyGroupHeader(+this.programNumberInMemory, +this.keygroupNumberInMemory, keygroupHeaderIndex, sampleName);
  }
}
