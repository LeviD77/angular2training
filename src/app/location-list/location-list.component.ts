import { Component, OnInit } from '@angular/core';

import { LocationService } from '../location.service';
import { Location } from '../location';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css']
})
export class LocationListComponent implements OnInit {

  locations: Location[] = [];

  constructor(
    private locationService: LocationService
  ) { }

  ngOnInit() {
    this.locationService.getLocations()
                        .subscribe(locations => this.locations = locations);
  }
}
