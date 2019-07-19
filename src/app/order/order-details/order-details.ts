import { OrderService } from './../order.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-order-details',
  templateUrl: 'order-details.html',
  styleUrls: ['order-details.scss'],
})
export class OrderDetailsPage implements OnInit {
  id: string;
  items: any[] = [];
  loading = false;
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private orderService: OrderService,
    private navController: NavController,
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('orderId');
    if (this.id) {
      this.getOrderDetails(this.id);
    }
  }
  navigate() {
    this.navController.navigateForward(`order/${this.id}/publish`);
  }
  /* getOrderDetails(orderId: any) {
    this.orderService.get(orderId).subscribe((res: any) => {
      this.items = res.data.items;
    });
  } */
  getOrderDetails(orderId: any) {
    this.loading = true;
    this.orderService.getAll().subscribe((res: any) => {
      this.loading = false;
      this.items = res;
    });
  }
  navigateBack() {
    this.location.back();
  }
}
