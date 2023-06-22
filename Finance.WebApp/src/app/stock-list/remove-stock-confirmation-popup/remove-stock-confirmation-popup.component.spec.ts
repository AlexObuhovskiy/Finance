import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveStockConfirmationPopupComponent } from './remove-stock-confirmation-popup.component';

describe('RemoveStockConfirmationPopupComponent', () => {
  let component: RemoveStockConfirmationPopupComponent;
  let fixture: ComponentFixture<RemoveStockConfirmationPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RemoveStockConfirmationPopupComponent]
    });
    fixture = TestBed.createComponent(RemoveStockConfirmationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
