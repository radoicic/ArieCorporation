import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthRegisterComponent } from './auth-register.component';

describe('AuthRegisterComponent', () => {
  let component: AuthRegisterComponent;
  let fixture: ComponentFixture<AuthRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthRegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
