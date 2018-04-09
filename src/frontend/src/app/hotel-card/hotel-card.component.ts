import {Component, OnInit, Input} from '@angular/core';

import {Hotel} from "../hotel";
import {Observable} from "rxjs/Observable";

@Component({
    selector: 'app-hotel-card',
    templateUrl: './hotel-card.component.html',
    styleUrls: ['./hotel-card.component.css']
})
export class HotelCardComponent implements OnInit {
    @Input() hotel: Observable<Hotel>;
    @Input() buttonDetails: boolean = true;


    ngOnInit(): void {
    }
}
