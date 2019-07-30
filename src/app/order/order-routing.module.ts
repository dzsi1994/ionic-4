import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderPage } from './order.page';
import { OrderDetailsPage } from './order-details/order-details';
import { PublishPage } from './publish/publish';
import { EditComponent } from './edit/edit.component';
import { DeleteBarcodeComponent } from './delete-barcode/delete-barcode.component';
import { AddNewCodeComponent } from './add-new-code/add-new-code.component';

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
  {
    path: ':orderId/delete',
    component: DeleteBarcodeComponent,
  },
  {
    path: ':orderId/add-new',
    component: AddNewCodeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderRoutingModule {}
