import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildAddComponent } from './child-add.component';

describe('ChildAddComponent', () => {
  let component: ChildAddComponent;
  let fixture: ComponentFixture<ChildAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChildAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
