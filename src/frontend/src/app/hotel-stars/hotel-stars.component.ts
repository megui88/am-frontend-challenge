import {Component, OnInit, Output, EventEmitter} from '@angular/core';

import {Subject}    from 'rxjs/Subject';

import {HotelService} from "../hotel.service";
import {FormControl} from "@angular/forms";
import {SVGCacheService} from "ng-inline-svg";

@Component({
    selector: 'app-hotel-stars',
    templateUrl: './hotel-stars.component.html',
    styleUrls: ['./hotel-stars.component.css']
})
export class HotelStarsComponent implements OnInit {
    @Output() onSetStart = new EventEmitter<number>();
    private starsField: FormControl;

    setStars(stars: number) {
        this.onSetStart.emit(stars);
        return stars;
    }

    private searchTerms = new Subject<string>();

    constructor(svgService: SVGCacheService) {
        svgService.setBaseUrl({ baseUrl: 'http://localhost:4200/assets/' });
    }

    ngOnInit(): void {
        this.starsField = new FormControl();
        this.starsField.valueChanges.subscribe((stars: number) => this.setStars(stars));
    }
}
