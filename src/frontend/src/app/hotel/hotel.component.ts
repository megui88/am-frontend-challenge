import {Component, OnInit} from '@angular/core';
import {Hotel} from '../hotel';
import {HotelService} from '../hotel.service';
import {Observable} from "rxjs/Observable";
import {SVGCacheService} from "ng-inline-svg";

@Component({
    selector: 'app-hotel',
    templateUrl: './hotel.component.html',
    styleUrls: ['./hotel.component.css']
})
export class HotelComponent implements OnInit {
    hotels: Observable<Hotel[]>;
    name: string = '';
    stars: string = '';

    constructor(private hotelService: HotelService, svgService: SVGCacheService) {
        svgService.setBaseUrl({ baseUrl: '/assets/' });
    }

    ngOnInit() {
        this.hotels = this.hotelService.getHotels();
    }

    onNewResult(term) {
        this.name = 'filters[name]=' + term;
        let query = this.getQuery();
        this.hotels = this.hotelService.searchHotels(query);
    };

    onFilterStarts(stars) {
        this.stars = (stars == 0) ? '' : 'filters[stars]=' + stars;
        let query = this.getQuery();
        this.hotels = this.hotelService.searchHotels(query);
    };

    getQuery(): string {
        let query = this.name;
        if (this.name.trim() !== '' && this.stars.trim() !== '') {
            query = query + '&';
        }
        return query + this.stars;
    }

}
