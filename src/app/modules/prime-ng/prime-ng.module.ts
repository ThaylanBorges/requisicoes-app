// modulos
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// modulos do PrimeNg
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { CheckboxModule } from 'primeng/checkbox';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CalendarModule } from 'primeng/calendar';
import { TabViewModule } from 'primeng/tabview';
import { ToggleButtonModule } from 'primeng/togglebutton';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    MessagesModule,
    CheckboxModule,
    TableModule,
    DialogModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    ConfirmDialogModule,
    CalendarModule,
    TabViewModule,
    ToggleButtonModule,
  ],
  exports: [
    ButtonModule,
    MessagesModule,
    CheckboxModule,
    TableModule,
    DialogModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    ConfirmDialogModule,
    CalendarModule,
    TabViewModule,
    ToggleButtonModule,
  ],
})
export class PrimeNGModule {}
