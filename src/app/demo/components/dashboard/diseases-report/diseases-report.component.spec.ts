import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiseasesReportComponent } from './diseases-report.component';

describe('DiseasesReportComponent', () => {
  let component: DiseasesReportComponent;
  let fixture: ComponentFixture<DiseasesReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiseasesReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiseasesReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
