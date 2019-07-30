import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-new-code',
  templateUrl: './add-new-code.component.html',
  styleUrls: ['./add-new-code.component.scss'],
})
export class AddNewCodeComponent implements OnInit {
  detailsForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.detailsForm = this.buildForm();
  }
  buildForm(): FormGroup {
    return this.formBuilder.group({
      barcode: ['', Validators.required],
      sku: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }
  onSubmit() {
    console.log(this.detailsForm.value);
  }
}
