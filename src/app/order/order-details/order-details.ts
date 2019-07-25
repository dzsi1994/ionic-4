import { OrderService } from './../order.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-order-details',
  templateUrl: 'order-details.html',
  styleUrls: ['order-details.scss'],
})
export class OrderDetailsPage implements OnInit, OnDestroy {
  id: string;
  items: any[] = [];
  loading = false;
  constructor(
    private route: ActivatedRoute,
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
    this.orderService
      .getAll()
      .pipe(untilDestroyed(this))
      .subscribe((res: any) => {
        this.loading = false;
        this.items = res;
      });
  }
  ngOnDestroy() {}
}
