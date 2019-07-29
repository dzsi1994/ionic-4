import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderPage } from './order.page';
import { OrderDetailsPage } from './order-details/order-details';
import { PublishPage } from './publish/publish';
import { EditComponent } from './edit/edit.component';

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
  {
    path: ':orderId/edit',
    component: EditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderRoutingModule {}
