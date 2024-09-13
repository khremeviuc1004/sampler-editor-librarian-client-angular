import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'config',
    loadComponent:  () => import('./config/config.component').then(m => m.ConfigComponent)
  },
  {
    path: 'sampler',
    loadComponent:  () => import('./sampler/sampler.component').then(m => m.SamplerComponent)
  },
  {
    path: 'in-memory-program/:programNumberInMemory',
    loadComponent:  () => import('./in-memory/program/in-memory-program/in-memory-program.component').then(m => m.InMemoryProgramComponent)
  },
  {
    path: 'in-memory-program/:programNumberInMemory/lfo1',
    loadComponent:  () => import('./in-memory/program/lfo1/lfo1.component').then(m => m.Lfo1Component)
  },
  {
    path: 'in-memory-program/:programNumberInMemory/lfo2',
    loadComponent:  () => import('./in-memory/program/lfo2/lfo2.component').then(m => m.Lfo2Component)
  },
  {
    path: 'in-memory-program/:programNumberInMemory/pitch-bend',
    loadComponent:  () => import('./in-memory/program/pitch-bend/pitch-bend.component').then(m => m.PitchBendComponent)
  },
  {
    path: 'in-memory-program/:programNumberInMemory/temper-tuning',
    loadComponent:  () => import('./in-memory/program/temper-tuning/temper-tuning.component').then(m => m.TemperTuningComponent)
  },
  {
    path: 'in-memory-program/:programNumberInMemory/master-tuning',
    loadComponent:  () => import('./in-memory/program/master-tuning/master-tuning.component').then(m => m.MasterTuningComponent)
  },
  {
    path: 'in-memory-program/:programNumberInMemory/soft-pedal',
    loadComponent:  () => import('./in-memory/program/soft-pedal/soft-pedal.component').then(m => m.SoftPedalComponent)
  },
  {
    path: 'in-memory-program/:programNumberInMemory/modes',
    loadComponent:  () => import('./in-memory/program/modes/modes.component').then(m => m.ModesComponent)
  },
  {
    path: 'in-memory-program/:programNumberInMemory/master-output',
    loadComponent:  () => import('./in-memory/program/master-output/master-output.component').then(m => m.MasterOutputComponent)
  },
  {
    path: 'in-memory-program/:programNumberInMemory/master-pan',
    loadComponent:  () => import('./in-memory/program/master-pan/master-pan.component').then(m => m.MasterPanComponent)
  },
  {
    path: 'in-memory-program/:programNumberInMemory/midi',
    loadComponent:  () => import('./in-memory/program/midi/midi.component').then(m => m.MidiComponent)
  },
  {
    path: 'in-memory-program/:programNumberInMemory/portamento',
    loadComponent:  () => import('./in-memory/program/portamento/portamento.component').then(m => m.PortamentoComponent)
  },
  {
    path: 'in-memory-program/:programNumberInMemory/keygroup-global',
    loadComponent:  () => import('./in-memory/program/keygroup-global/keygroup-global.component').then(m => m.KeygroupGlobalComponent)
  },
  {
    path: 'in-memory-program/:programNumberInMemory/in-memory-keygroup/:keygroupNumberInMemory',
    loadComponent:  () => import('./in-memory/keygroup/in-memory-keygroup/in-memory-keygroup.component').then(m => m.InMemoryKeygroupComponent)
  },
  {
    path: 'in-memory-program/:programNumberInMemory/in-memory-keygroup/:keygroupNumberInMemory/filter1',
    loadComponent:  () => import('./in-memory/keygroup/filter1/filter1.component').then(m => m.Filter1Component)
  },
  {
    path: 'in-memory-program/:programNumberInMemory/in-memory-keygroup/:keygroupNumberInMemory/filter2',
    loadComponent:  () => import('./in-memory/keygroup/filter2/filter2.component').then(m => m.Filter2Component)
  },
  {
    path: 'in-memory-program/:programNumberInMemory/in-memory-keygroup/:keygroupNumberInMemory/tone',
    loadComponent:  () => import('./in-memory/keygroup/tone/tone.component').then(m => m.ToneComponent)
  },
  {
    path: 'in-memory-program/:programNumberInMemory/in-memory-keygroup/:keygroupNumberInMemory/envelope1',
    loadComponent:  () => import('./in-memory/keygroup/envelope1/envelope1.component').then(m => m.Envelope1Component)
  },
  {
    path: 'in-memory-program/:programNumberInMemory/in-memory-keygroup/:keygroupNumberInMemory/envelope2',
    loadComponent:  () => import('./in-memory/keygroup/envelope2/envelope2.component').then(m => m.Envelope2Component)
  },
  {
    path: 'in-memory-program/:programNumberInMemory/in-memory-keygroup/:keygroupNumberInMemory/envelope3',
    loadComponent:  () => import('./in-memory/keygroup/envelope3/envelope3.component').then(m => m.Envelope3Component)
  },
  {
    path: 'in-memory-program/:programNumberInMemory/in-memory-keygroup/:keygroupNumberInMemory/zones',
    loadComponent:  () => import('./in-memory/keygroup/zone/zone.component').then(m => m.ZoneComponent)
  },
  {
    path: 'in-memory-program/:programNumberInMemory/in-memory-keygroup/:keygroupNumberInMemory/pitch',
    loadComponent:  () => import('./in-memory/keygroup/pitch/pitch.component').then(m => m.PitchComponent)
  },
  {
    path: 'in-memory-sample/:sampleNumberInMemory',
    loadComponent:  () => import('./in-memory/sample/in-memory-sample/in-memory-sample.component').then(m => m.InMemorySampleComponent)
  },
  {
    path: 'effect',
    loadComponent:  () => import('./in-memory/effect/effect.component').then(m => m.EffectComponent)
  },
  {
    path: 'reverb',
    loadComponent:  () => import('./in-memory/reverb/reverb.component').then(m => m.ReverbComponent)
  },
  {
    path: 'effect-assignment',
    loadComponent:  () => import('./in-memory/effect-assignment/effect-assignment.component').then(m => m.EffectAssignmentComponent)
  },
  {
    path: 'reverb-assignment',
    loadComponent:  () => import('./in-memory/reverb-assignment/reverb-assignment.component').then(m => m.ReverbAssignmentComponent)
  },
  {
    path: 'disk-open',
    loadComponent:  () => import('./disk/disk.component').then(m => m.DiskComponent)
  },
  {
    path: 'disk-save',
    loadComponent:  () => import('./disk/disk.component').then(m => m.DiskComponent)
  },
  {
    path: 'status-report',
    loadComponent:  () => import('./status-report/status-report.component').then(m => m.StatusReportComponent)
  },
  { path: '',   redirectTo: '/config', pathMatch: 'full' },
  { path: '**', loadComponent:  () => import('./error-page/error-page.component').then(m => m.ErrorPageComponent) },
];
