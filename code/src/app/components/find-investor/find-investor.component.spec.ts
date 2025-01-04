import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindInvestorComponent } from './find-investor.component';

describe('FindInvestorComponent', () => {
  let component: FindInvestorComponent;
  let fixture: ComponentFixture<FindInvestorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FindInvestorComponent]
    });
    fixture = TestBed.createComponent(FindInvestorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
