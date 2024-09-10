import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// components
import { PainelComponent } from './painel.component';

const routes: Routes = [
  {
    path: '',
    component: PainelComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PainelRoutingModule {}
