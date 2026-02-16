import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { TripForm } from './trip-form';

describe('TripForm', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripForm],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: convertToParamMap({}) },
            params: of({})
          }
        }
      ]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(TripForm);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
