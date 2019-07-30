import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-delete-item',
  templateUrl: './delete-item.component.html',
  styleUrls: ['./delete-item.component.scss'],
})
export class DeleteItemComponent implements OnInit {
  detailsForm: FormGroup;
  @Output() update = new EventEmitter<any>();
  @Input() item: any;
  @Input() errors: any[];
  constructor(private formBuilder: FormBuilder, private alertCtrl: AlertController) {}

  ngOnInit() {
    this.detailsForm = this.buildForm();
  }
  buildForm(): FormGroup {
    return this.formBuilder.group({
      barcode: ['', Validators.required],
      quantity: ['', Validators.required],
    });
  }
  onSubmit() {
    this.presentAlertConfirm(true);
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
            this.update.emit(this.detailsForm.value);
            this.detailsForm.reset();
          },
        },
      ],
    });

    await alert.present();
  }
}
