import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { OrderService } from '../order.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-new-code',
  templateUrl: './add-new-code.component.html',
  styleUrls: ['./add-new-code.component.scss'],
})
export class AddNewCodeComponent implements OnInit {
  detailsForm: FormGroup;
  packageId: string;
  constructor(private formBuilder: FormBuilder, private orderService: OrderService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.packageId = this.route.snapshot.paramMap.get('orderId');
    this.detailsForm = this.buildForm();
  }
  buildForm(): FormGroup {
    return this.formBuilder.group({
      barcode: ['', Validators.required],
      sku: ['', Validators.required],
      description: ['', Validators.required],
    });
  }
  onSubmit() {
    const data = {
      description: this.detailsForm.value.description,
    };
    this.orderService
      .save(`product/${this.detailsForm.value.sku}/${this.detailsForm.value.barcode}`, data)
      .subscribe(res => {
        alert('Barcode is created');
      });
  }
}
