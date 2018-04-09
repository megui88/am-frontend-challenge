import {Component, OnInit} from '@angular/core';
import {Hotel} from '../hotel';
import {HotelService} from '../hotel.service';
import {Observable} from "rxjs/Observable";
import {SVGCacheService} from "ng-inline-svg";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-hotel-details',
    templateUrl: './hotel-details.component.html',
    styleUrls: ['./hotel-details.component.css']
})
export class HotelDetailsComponent implements OnInit {
    hotel: Hotel;

    constructor(private route: ActivatedRoute, private hotelService: HotelService, svgService: SVGCacheService) {
        svgService.setBaseUrl({baseUrl: 'http://localhost:4200/assets/'});
    }

    setHote(hotel: Hotel) {
        this.hotel = hotel;
    }

    ngOnInit() {
        const id = +this.route.snapshot.paramMap.get('id');
        this.hotelService.getHotel(id).subscribe((hotel) => this.setHote(hotel));
    }

}
