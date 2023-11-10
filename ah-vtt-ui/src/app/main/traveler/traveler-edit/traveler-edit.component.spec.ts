import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelerEditComponent } from './traveler-edit.component';

describe('TravelerEditComponent', () => {
  let component: TravelerEditComponent;
  let fixture: ComponentFixture<TravelerEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravelerEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravelerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
