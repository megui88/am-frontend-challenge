import {Component, OnInit, Output, EventEmitter} from '@angular/core';

import {Subject}    from 'rxjs/Subject';

import {HotelService} from "../hotel.service";
import {FormControl} from "@angular/forms";

@Component({
    selector: 'app-hotel-search',
    templateUrl: './hotel-search.component.html',
    styleUrls: ['./hotel-search.component.css']
})
export class HotelSearchComponent implements OnInit {
    @Output() onNewResult = new EventEmitter<string>();

    // Push a search term into the observable stream.
    search(term: string): void {
        this.onNewResult.emit(term);
    }

    ngOnInit(): void {
    }
}
