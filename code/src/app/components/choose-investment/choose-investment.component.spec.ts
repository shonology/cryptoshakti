import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseInvestmentComponent } from './choose-investment.component';

describe('ChooseInvestmentComponent', () => {
  let component: ChooseInvestmentComponent;
  let fixture: ComponentFixture<ChooseInvestmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChooseInvestmentComponent]
    });
    fixture = TestBed.createComponent(ChooseInvestmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
