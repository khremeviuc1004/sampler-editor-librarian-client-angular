import { Routes } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ConfigComponent } from './sampler/config/config.component';
import { SamplerComponent } from './sampler/sampler/sampler.component';
import { InMemoryProgramComponent } from './sampler/in-memory/program/in-memory-program/in-memory-program.component';
import { InMemoryKeygroupComponent } from './sampler/in-memory/keygroup/in-memory-keygroup/in-memory-keygroup.component';
import { Lfo1Component } from './sampler/in-memory/program/lfo1/lfo1.component';
import { Lfo2Component } from './sampler/in-memory/program/lfo2/lfo2.component';
import { PitchBendComponent } from './sampler/in-memory/program/pitch-bend/pitch-bend.component';
import { TemperTuningComponent } from './sampler/in-memory/program/temper-tuning/temper-tuning.component';
import { MasterTuningComponent } from './sampler/in-memory/program/master-tuning/master-tuning.component';
import { SoftPedalComponent } from './sampler/in-memory/program/soft-pedal/soft-pedal.component';
import { ModesComponent } from './sampler/in-memory/program/modes/modes.component';
import { MasterOutputComponent } from './sampler/in-memory/program/master-output/master-output.component';
import { MasterPanComponent } from './sampler/in-memory/program/master-pan/master-pan.component';
import { MidiComponent } from './sampler/in-memory/program/midi/midi.component';
import { PortamentoComponent } from './sampler/in-memory/program/portamento/portamento.component';
import { KeygroupGlobalComponent } from './sampler/in-memory/program/keygroup-global/keygroup-global.component';
import { InMemorySampleComponent } from './sampler/in-memory/sample/in-memory-sample/in-memory-sample.component';
import { SampleLoopComponent } from './sampler/in-memory/sample/sample-loop/sample-loop.component';
import { Filter1Component } from './sampler/in-memory/keygroup/filter1/filter1.component';
import { Filter2Component } from './sampler/in-memory/keygroup/filter2/filter2.component';
import { ToneComponent } from './sampler/in-memory/keygroup/tone/tone.component';
import { Envelope1Component } from './sampler/in-memory/keygroup/envelope1/envelope1.component';
import { Envelope2Component } from './sampler/in-memory/keygroup/envelope2/envelope2.component';
import { Envelope3Component } from './sampler/in-memory/keygroup/envelope3/envelope3.component';
import { ZoneComponent } from './sampler/in-memory/keygroup/zone/zone.component';
import { PitchComponent } from './sampler/in-memory/keygroup/pitch/pitch.component';

export const routes: Routes = [
  {
    path: 'config',
    component: ConfigComponent,
  },
  {
    path: 'sampler',
    component: SamplerComponent,
  },
  {
    path: 'in-memory-program/:programNumberInMemory',
    component: InMemoryProgramComponent,
  },
  {
    path: 'in-memory-program/:programNumberInMemory/lfo1',
    component: Lfo1Component,
  },
  {
    path: 'in-memory-program/:programNumberInMemory/lfo2',
    component: Lfo2Component,
  },
  {
    path: 'in-memory-program/:programNumberInMemory/pitch-bend',
    component: PitchBendComponent,
  },
  {
    path: 'in-memory-program/:programNumberInMemory/temper-tuning',
    component: TemperTuningComponent,
  },
  {
    path: 'in-memory-program/:programNumberInMemory/master-tuning',
    component: MasterTuningComponent,
  },
  {
    path: 'in-memory-program/:programNumberInMemory/soft-pedal',
    component: SoftPedalComponent,
  },
  {
    path: 'in-memory-program/:programNumberInMemory/modes',
    component: ModesComponent,
  },
  {
    path: 'in-memory-program/:programNumberInMemory/master-output',
    component: MasterOutputComponent,
  },
  {
    path: 'in-memory-program/:programNumberInMemory/master-pan',
    component: MasterPanComponent,
  },
  {
    path: 'in-memory-program/:programNumberInMemory/midi',
    component: MidiComponent,
  },
  {
    path: 'in-memory-program/:programNumberInMemory/portamento',
    component: PortamentoComponent,
  },
  {
    path: 'in-memory-program/:programNumberInMemory/keygroup-global',
    component: KeygroupGlobalComponent,
  },
  {
    path: 'in-memory-program/:programNumberInMemory/in-memory-keygroup/:keygroupNumberInMemory',
    component: InMemoryKeygroupComponent,
  },
  {
    path: 'in-memory-program/:programNumberInMemory/in-memory-keygroup/:keygroupNumberInMemory/filter1',
    component: Filter1Component,
  },
  {
    path: 'in-memory-program/:programNumberInMemory/in-memory-keygroup/:keygroupNumberInMemory/filter2',
    component: Filter2Component,
  },
  {
    path: 'in-memory-program/:programNumberInMemory/in-memory-keygroup/:keygroupNumberInMemory/tone',
    component: ToneComponent,
  },
  {
    path: 'in-memory-program/:programNumberInMemory/in-memory-keygroup/:keygroupNumberInMemory/envelope1',
    component: Envelope1Component,
  },
  {
    path: 'in-memory-program/:programNumberInMemory/in-memory-keygroup/:keygroupNumberInMemory/envelope2',
    component: Envelope2Component,
  },
  {
    path: 'in-memory-program/:programNumberInMemory/in-memory-keygroup/:keygroupNumberInMemory/envelope3',
    component: Envelope3Component,
  },
  {
    path: 'in-memory-program/:programNumberInMemory/in-memory-keygroup/:keygroupNumberInMemory/zones',
    component: ZoneComponent,
  },
  {
    path: 'in-memory-program/:programNumberInMemory/in-memory-keygroup/:keygroupNumberInMemory/pitch',
    component: PitchComponent,
  },
  {
    path: 'in-memory-sample/:sampleNumberInMemory',
    component: InMemorySampleComponent,
  },
  {
    path: 'in-memory-sample/:sampleNumberInMemory/loop/:loopNumber',
    component: SampleLoopComponent,
  },
  { path: '',   redirectTo: '/config', pathMatch: 'full' },
  { path: '**', component: ErrorPageComponent },
];
