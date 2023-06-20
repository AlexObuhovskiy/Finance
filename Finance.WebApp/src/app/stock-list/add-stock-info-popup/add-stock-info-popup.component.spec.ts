import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStockInfoPopupComponent } from './add-stock-info-popup.component';

describe('AddStockInfoPopupComponent', () => {
  let component: AddStockInfoPopupComponent;
  let fixture: ComponentFixture<AddStockInfoPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddStockInfoPopupComponent]
    });
    fixture = TestBed.createComponent(AddStockInfoPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
