import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

export enum Actions {
  add = 'add',
  edit = 'edit',
}

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  @Output() update = new EventEmitter<any>();
  @Input() item: any;
  @Input() errors: any[];
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
  onSubmit() {
    this.presentAlertConfirm(true);
  }
  buildForm(): FormGroup {
    return this.formBuilder.group({
      barcode: ['', Validators.required],
      quantity: ['', Validators.required],
    });
  }
  async presentAlertConfirm(edit?: boolean) {
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
            const data = {
              data: this.detailsForm.value,
              type: edit === true ? Actions.edit : Actions.add,
            };
            this.update.emit(data);
            this.detailsForm.reset();
          },
        },
      ],
    });

    await alert.present();
  }
}
