import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelAmenityComponent } from './hotel-amenity.component';

describe('HotelAmenityComponent', () => {
  let component: HotelAmenityComponent;
  let fixture: ComponentFixture<HotelAmenityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelAmenityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelAmenityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
