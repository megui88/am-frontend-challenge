import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelStarsIconsComponent } from './hotel-stars-icons.component';

describe('HotelStartsIconsComponent', () => {
  let component: HotelStarsIconsComponent;
  let fixture: ComponentFixture<HotelStarsIconsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelStarsIconsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelStarsIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
