import { inject } from '@angular/core';
import { Program as InMemoryProgram } from 'sampler-editor-librarian-dto'
import { SamplerService } from '../services/sampler.service';
import { ActivatedRoute } from '@angular/router';
import { ScreenCommon } from './screen-common';

export class ProgramScreenCommon extends ScreenCommon {

  programNumberInMemory = "0";
  programHeader: InMemoryProgram | null = null;
  samplerService = inject(SamplerService);

  constructor(route: ActivatedRoute){
    super(route);
  }

  programOnInit(): void {
    const programNumberInMemory = this.route?.snapshot.paramMap.get('programNumberInMemory');
    this.programNumberInMemory = programNumberInMemory ? programNumberInMemory : "0";

    this.samplerService.samplerRequestProgramHeader(+this.programNumberInMemory).subscribe(program => {
      this.programHeader = program;
    });
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
}
