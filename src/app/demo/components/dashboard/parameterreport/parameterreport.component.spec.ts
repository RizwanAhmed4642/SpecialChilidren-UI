import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameterreportComponent } from './parameterreport.component';

describe('ParameterreportComponent', () => {
  let component: ParameterreportComponent;
  let fixture: ComponentFixture<ParameterreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParameterreportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParameterreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
