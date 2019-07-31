import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { OrderPage } from './order.page';
import { OrderRoutingModule } from './order-routing.module';
import { OrderDetailsPage } from './order-details/order-details';
import { OrderService } from './order.service';
import { SharedModule } from '../shared/shared.module';
import { PublishPage } from './publish/publish';
import { EditComponent } from './edit/edit.component';
import { ItemComponent } from './edit/item/item.component';
import { DeleteItemComponent, DeleteBarcodeComponent } from './delete-barcode';
import { AddNewCodeComponent } from './add-new-code/add-new-code.component';

const components = [
  OrderPage,
  OrderDetailsPage,
  PublishPage,
  EditComponent,
  ItemComponent,
  DeleteBarcodeComponent,
  AddNewCodeComponent,
  DeleteItemComponent,
];

@NgModule({
  imports: [CommonModule, SharedModule, FormsModule, IonicModule, OrderRoutingModule, ReactiveFormsModule],
  providers: [OrderService],
  declarations: [components],
})
export class OrderPageModule {}
