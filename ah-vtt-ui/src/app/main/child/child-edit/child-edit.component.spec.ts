import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildEditComponent } from './child-edit.component';

describe('ChildEditComponent', () => {
  let component: ChildEditComponent;
  let fixture: ComponentFixture<ChildEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChildEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
