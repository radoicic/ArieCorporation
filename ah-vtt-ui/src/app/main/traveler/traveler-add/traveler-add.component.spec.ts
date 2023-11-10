import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelerAddComponent } from './traveler-add.component';

describe('TravelerAddComponent', () => {
  let component: TravelerAddComponent;
  let fixture: ComponentFixture<TravelerAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravelerAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravelerAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
