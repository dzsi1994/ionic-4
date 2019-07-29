import { OrderService } from './../order.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, AlertController, ToastController } from '@ionic/angular';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-order-details',
  templateUrl: 'order-details.html',
  styleUrls: ['order-details.scss'],
})
export class OrderDetailsPage implements OnInit, OnDestroy {
  id: string;
  items: any;
  loading = false;
  errors: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private navController: NavController,
    private alertCtrl: AlertController,
    public toastController: ToastController,
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('orderId');
    if (this.id) {
      this.getOrderDetails();
    }
  }
  navigate() {
    this.navController.navigateForward(`order/${this.id}/publish`);
  }
  navigateToEdit() {
    this.navController.navigateForward(`order/${this.id}/edit`);
  }
  getOrderDetails() {
    this.loading = true;
    this.orderService
      .get(this.id)
      .pipe(
        untilDestroyed(this),
        tap(_ => {
          this.loading = false;
          this.errors = _.Errores;
          console.log(this.errors);
        }),
        map((res: any) => res.Data),
      )
      .subscribe(res => (this.items = res));
  }
  delete() {
    this.orderService.delete(this.id).subscribe(res => {
      if (res.Correcto) {
        this.presentToast('Bulto has been deleted');
      } else {
        this.presentToast('Something went wrong later try it again!');
      }
    });
  }
  async presentToast(text: string) {
    const toast = await this.toastController.create({
      message: text,
      duration: 2000,
    });
    toast.present();
    this.navController.navigateForward(`order`);
  }
  async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      header: 'Confirmation',
      message: 'Do you want to delete the bulto?? ',
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
            this.delete();
          },
        },
      ],
    });

    await alert.present();
  }
  ngOnDestroy() {}
}
