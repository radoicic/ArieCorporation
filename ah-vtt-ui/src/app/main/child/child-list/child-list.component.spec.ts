import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildListComponent } from './child-list.component';

describe('ChildListComponent', () => {
  let component: ChildListComponent;
  let fixture: ComponentFixture<ChildListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChildListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
