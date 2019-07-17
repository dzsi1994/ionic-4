import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderPage } from './order.page';
import { OrderDetailsPage } from './order-details/order-details';

const routes: Routes = [
  {
    path: '',
    component: OrderPage,
  },
  {
    path: ':orderId',
    component: OrderDetailsPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderRoutingModule {}
