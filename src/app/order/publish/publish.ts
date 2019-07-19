import { OrderService } from './../order.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-publish',
  templateUrl: 'publish.html',
  styleUrls: ['publish.scss'],
})
export class PublishPage implements OnInit {
  id: string;
  items: any[] = [];
  loading = false;
  detailsForm: FormGroup;
  constructor(private route: ActivatedRoute, private orderService: OrderService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.buildForm();
    this.id = this.route.snapshot.paramMap.get('orderId');
    if (this.id) {
      // this.getOrderDetails(this.id);
    }
  }
  buildForm() {
    this.detailsForm = this.formBuilder.group({
      first: ['', Validators.required],
      second: ['', Validators.required],
    });
  }
  onSubmit() {
    console.log(this.detailsForm.value);
  }
}
