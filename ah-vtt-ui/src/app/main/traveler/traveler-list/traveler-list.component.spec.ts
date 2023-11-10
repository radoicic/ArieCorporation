import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelerListComponent } from './traveler-list.component';

describe('TravelerListComponent', () => {
  let component: TravelerListComponent;
  let fixture: ComponentFixture<TravelerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravelerListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravelerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
