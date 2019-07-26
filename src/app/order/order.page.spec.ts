import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { NavController, IonicModule } from '@ionic/angular';

import { OrderPage } from './order.page';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { reducers } from '../store';
import { By } from '@angular/platform-browser';

describe('OrderPage', () => {
  let comp: OrderPage;
  let fixture: ComponentFixture<OrderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrderPage],
      imports: [
        IonicModule.forRoot(),
        ReactiveFormsModule,
        SharedModule,
        RouterTestingModule,
        StoreModule.forRoot(reducers),
      ],
      providers: [NavController, Location],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderPage);
    comp = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  }));

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

  it('should show loading false', async () => {
    const d = spyOn(comp, 'setLoading');
    clickByCSS('.true');
    expect(d).toHaveBeenCalled();
    // expect(getLoadingText()).toBe('true');
  });

  function clickByCSS(selector: string) {
    const debugElement = fixture.debugElement.query(By.css(selector));
    const el: HTMLElement = debugElement.nativeElement;
    el.click();
    fixture.detectChanges();
  }

  function getLoadingText() {
    const compiled = fixture.debugElement.nativeElement;
    return compiled.querySelector('.loading').textContent;
  }
});
