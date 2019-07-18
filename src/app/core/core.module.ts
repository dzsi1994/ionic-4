import { NgModule, Optional, SkipSelf } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { httpInterceptorProviders } from './interceptors';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule],
  providers: [httpInterceptorProviders],
  exports: [CommonModule],
  declarations: [],
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule,
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}
