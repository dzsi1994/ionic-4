import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from './components/header/header.component';

const components = [HeaderComponent];
@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [components],
  exports: [CommonModule, FormsModule, components],
  entryComponents: [],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA],
})
export class SharedModule {}
