import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() url: string;
  constructor(private location: Location, private navController: NavController) {}

  ngOnInit() {}
  back() {
    const url: string = this.url !== undefined ? this.url : 'order';
    this.navController.navigateRoot(`${url}`);
  }
}
