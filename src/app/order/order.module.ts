import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { OrderPage } from './order.page';
import { OrderRoutingModule } from './order-routing.module';
import { OrderDetailsPage } from './order-details/order-details';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, OrderRoutingModule, ReactiveFormsModule],
  declarations: [OrderPage, OrderDetailsPage],
})
export class OrderPageModule {}
