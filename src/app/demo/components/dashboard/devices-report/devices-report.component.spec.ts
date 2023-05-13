import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicesReportComponent } from './devices-report.component';

describe('DevicesReportComponent', () => {
  let component: DevicesReportComponent;
  let fixture: ComponentFixture<DevicesReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevicesReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevicesReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
