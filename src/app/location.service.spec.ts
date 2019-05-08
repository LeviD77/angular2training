import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { LocationService } from './location.service';

import { Location } from './location';

describe('LocationService', () => {
  let httpTestingController: HttpTestingController;
  let service: LocationService;

  beforeEach(
    () => {
      TestBed.configureTestingModule({
        providers: [LocationService],
        imports: [HttpClientTestingModule]
      });
      
      httpTestingController = TestBed.get(HttpTestingController);
      service = TestBed.get(LocationService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('returned Observable should match the right data', () => {
    const mockLocation = {
      name: 'Budapest',
      lat: 42.1184,
      lon: 9.1163
    };

    service.getLocation(1)
      .subscribe(location => {
        expect(location.name).toEqual(mockLocation.name);
      });

    const req = httpTestingController.expectOne('http://localhost:8080//api/locations/1');

    expect(req.request.method).toEqual('GET');

    req.flush(mockLocation);
  });
});
