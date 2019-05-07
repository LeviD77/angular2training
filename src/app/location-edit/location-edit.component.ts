import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

import { LocationService } from '../location.service';
import { Location } from '../location';

@Component({
  selector: 'app-location-edit',
  templateUrl: './location-edit.component.html',
  styleUrls: ['./location-edit.component.css']
})

export class LocationEditComponent implements OnInit {

  location: Location;

  id: number;

  locationForm = new FormGroup({
    name: new FormControl(''),
    lat: new FormControl(0),
    lon: new FormControl(0),
  });

  constructor(
    private locationService: LocationService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');

    this.locationService.getLocation(this.id)
                        .subscribe(location => {
                          this.location = location;
                          
                          this.locationForm.setValue({
                            name: this.location.name,
                            lat: this.location.lat,
                            lon: this.location.lon
                          });
                        });
  }

  onSubmit() {
    this.locationService.updateLocation(this.id, this.locationForm.value)
                        .subscribe(() => alert('Succesful save!'));
  }

}
