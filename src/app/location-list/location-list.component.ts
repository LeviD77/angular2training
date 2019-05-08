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

  getLocations(){
    this.locationService.getLocations()
      .subscribe(locations => this.locations = locations);
  }
  
  ngOnInit() {
   this.getLocations(); 
  }

  deleteLocation(location: Location){
    if(confirm('Are you sure you want to delete? ID: ' + location.id)){
      let index = this.locations.indexOf(location);

      this.locations.splice(index, 1);

      this.locationService.deleteLocation(location.id)
        .subscribe(() => this.getLocations());
    }
  }
}
