import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthLoginFormComponent } from './auth-login-form.component';

describe('AuthLoginFormComponent', () => {
  let component: AuthLoginFormComponent;
  let fixture: ComponentFixture<AuthLoginFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthLoginFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthLoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
