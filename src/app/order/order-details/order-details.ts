import { OrderService } from './../order.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-order-details',
  templateUrl: 'order-details.html',
  styleUrls: ['order-details.scss'],
})
export class OrderDetailsPage implements OnInit, OnDestroy {
  id: string;
  items$: Observable<any>;
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
  getOrderDetails(orderId: string) {
    this.loading = true;
    console.log(orderId);
    this.items$ = this.orderService.getAll().pipe(
      tap(_ => {
        this.loading = false;
      }),
    );
  }

  ngOnDestroy() {}
}
