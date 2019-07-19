import { OrderService } from './../order.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-publish',
  templateUrl: 'publish.html',
  styleUrls: ['publish.scss'],
})
export class PublishPage implements OnInit {
  id: string;
  items: any[] = [];
  loading = false;
  constructor(private route: ActivatedRoute, private location: Location, private orderService: OrderService) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('orderId');
    if (this.id) {
      // this.getOrderDetails(this.id);
    }
  }
  navigateBack() {
    this.location.back();
  }
}
