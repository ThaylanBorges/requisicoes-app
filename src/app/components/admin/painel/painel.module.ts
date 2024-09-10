// modulos
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PainelRoutingModule } from './painel-routing.module';

// components
import { PainelComponent } from './painel.component';

@NgModule({
  declarations: [PainelComponent],
  imports: [CommonModule, PainelRoutingModule],
})
export class PainelModule {}
