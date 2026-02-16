import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TripCard } from './trip-card';

describe('TripCard', () => {
  let component: TripCard;
  let fixture: ComponentFixture<TripCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripCard],
    }).compileComponents();

    fixture = TestBed.createComponent(TripCard);
    component = fixture.componentInstance;

    // provide required @Input
    component.trip = {
      _id: '1',
      code: 'TRIP001',
      name: 'Sample Trip',
      length: '7 days',
      start: '2026-06-01T00:00:00.000Z',
      resort: 'Sample Resort',
      perPerson: '$1,500',
      image: 'cove.jpg',
      description: 'Trip description',
      __v: 0
    } as any;

    fixture.detectChanges(); // ✅ now template can read trip.name
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
