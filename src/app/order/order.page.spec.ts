import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NavController, IonicModule } from '@ionic/angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { OrderPage } from './order.page';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';

describe('OrderPage', () => {
  let de: DebugElement;
  let comp: OrderPage;
  let fixture: ComponentFixture<OrderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrderPage],
      imports: [IonicModule.forRoot(), ReactiveFormsModule, SharedModule, RouterTestingModule],
      providers: [NavController, Location],
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderPage);
    comp = fixture.componentInstance;
    // de = fixture.debugElement.query(By.css('h3'));
  });

  it('should create component', () => expect(comp).toBeDefined());
  it('should create reactive Form', () => {
    fixture.detectChanges();
    const barCode = comp.detailsForm.get('barCode').value;
    expect(barCode).toBe('');
  });
  it('should navigate method get Called', fakeAsync(() => {
    spyOn(comp, 'navigate');
    fixture.detectChanges();
    comp.detailsForm.patchValue({
      barCode: '',
    });
    tick(300);
    fixture.detectChanges();
    expect(comp.navigate).toHaveBeenCalled();
  }));
});
