import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAide } from 'app/shared/model/aide.model';

@Component({
    selector: 'jhi-aide-detail',
    templateUrl: './aide-detail.component.html'
})
export class AideDetailComponent implements OnInit {
    aide: IAide;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ aide }) => {
            this.aide = aide;
        });
    }

    previousState() {
        window.history.back();
    }
}
