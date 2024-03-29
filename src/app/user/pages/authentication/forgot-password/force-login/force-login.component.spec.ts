import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ForceLoginComponent } from './force-login.component';

describe('ForceLoginComponent', () => {
  let component: ForceLoginComponent;
  let fixture: ComponentFixture<ForceLoginComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ForceLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForceLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
