import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SamplerComponent } from './sampler/sampler.component';
import { ConfigComponent } from './config/config.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: SamplerComponent,
        title: 'Sampler',
      },
      {
        path: 'config',
        component: ConfigComponent,
        title: 'Midi Configuration',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SamplerRoutingModule { }
