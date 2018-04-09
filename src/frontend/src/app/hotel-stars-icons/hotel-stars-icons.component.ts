import {Component, OnInit, Input} from '@angular/core';
import {SVGCacheService} from "ng-inline-svg";

@Component({
    selector: 'app-hotel-stars-icons',
    templateUrl: './hotel-stars-icons.component.html',
    styleUrls: ['./hotel-stars-icons.component.css']
})
export class HotelStarsIconsComponent implements OnInit {
    @Input() stars: number;
    starsIcons: number[];

    constructor(svgService: SVGCacheService) {
        svgService.setBaseUrl({ baseUrl: 'http://localhost:4200/assets/' });
    }

    ngOnInit(): void {
        this.starsIcons = Array(this.stars).fill('stars');
    }
}

