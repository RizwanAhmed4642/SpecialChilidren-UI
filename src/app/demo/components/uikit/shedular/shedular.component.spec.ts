import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShedularComponent } from './shedular.component';

describe('ShedularComponent', () => {
  let component: ShedularComponent;
  let fixture: ComponentFixture<ShedularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShedularComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShedularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
