import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-order-details',
  templateUrl: 'order-details.html',
  styleUrls: ['order-details.scss'],
})
export class OrderDetailsPage implements OnInit {
  id: string;
  items: any[] = [
    {
      name: 'BROTHER TN2220 BLACK COMPATIBLE',
      ref: '8484888 Pixcolor',
      id: '158000141',
      quantity: 5,
    },
    {
      name: 'HP TN2220 COLOR COMPATIBLE',
      ref: '8484234 Pixcolor',
      id: '158000568',
      quantity: 3,
    },
  ];
  constructor(private route: ActivatedRoute, private location: Location) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('orderId');
  }
  navigateBack() {
    this.location.back();
  }
}
