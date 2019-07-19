import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderPage } from './order.page';
import { OrderDetailsPage } from './order-details/order-details';
import { PublishPage } from './publish/publish';

const routes: Routes = [
  {
    path: '',
    component: OrderPage,
  },
  {
    path: ':orderId',
    component: OrderDetailsPage,
  },
  {
    path: ':orderId/publish',
    component: PublishPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderRoutingModule {}
