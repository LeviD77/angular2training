import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { LocationService } from '../location.service';
import { Location } from '../location';

@Component({
  selector: 'app-location-show',
  templateUrl: './location-show.component.html',
  styleUrls: ['./location-show.component.css']
})
export class LocationShowComponent implements OnInit {

  location: Location;

  constructor(
    private locationService: LocationService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');

    this.locationService.getLocation(id)
                        .subscribe(location => this.location = location);
  }

}
