import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { OrderService } from './../order.service';

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
    this.detailsForm = this.buildForm();
    this.id = this.route.snapshot.paramMap.get('orderId');
    if (this.id) {
      this.detailsForm.patchValue({
        Barcode: this.id,
      });
    }
  }
  buildForm(): FormGroup {
    return this.formBuilder.group({
      Barcode: [{ value: '', disabled: true }, Validators.required],
      location: ['', Validators.required],
    });
  }
  onSubmit() {
    const data = this.detailsForm.getRawValue();
    const location = {
      location: this.detailsForm.value.location,
    };
    this.orderService.update(`location/${data.Barcode}`, location).subscribe(res => {
      console.log(res);
    });
  }
}
