import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { LocationService } from '../location.service';
import { Location } from '../location';

@Component({
  selector: 'app-location-create',
  templateUrl: './location-create.component.html',
  styleUrls: ['./location-create.component.css']
})
export class LocationCreateComponent implements OnInit {

  locationForm = new FormGroup({
    name: new FormControl(''),
    lat: new FormControl(0),
    lon: new FormControl(0),
  });

  constructor(
    private locationService: LocationService
  ) { }

  onSubmit() {
    this.locationService.createLocation(this.locationForm.value)
      .subscribe(() => alert('Succesful save!'));
  }

}
