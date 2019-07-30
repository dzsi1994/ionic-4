import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  @Output() update = new EventEmitter<any>();
  @Input() item: any;
  barcode = '';
  detailsForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private alertCtrl: AlertController) {}

  ngOnInit() {
    this.detailsForm = this.buildForm();
    if (this.item) {
      this.detailsForm.patchValue({
        quantity: this.item.Quantity,
      });
    }
  }
  /* onUpdate() {
    const data = {
      quantity: this.quantity.quantity,
      barcode: this.barcode,
    };
    this.update.emit(data);
  } */
  onSubmit() {
    this.presentAlertConfirm();
  }
  buildForm(): FormGroup {
    return this.formBuilder.group({
      barcode: ['', Validators.required],
      quantity: ['', Validators.required],
    });
  }
  async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      header: 'Confirmation',
      message: 'Are you sure ?? ',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            return;
          },
        },
        {
          text: 'Okay',
          cssClass: 'primary',
          handler: () => {
            this.update.emit(this.detailsForm.value);
            this.detailsForm.reset();
          },
        },
      ],
    });

    await alert.present();
  }
}
