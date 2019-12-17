import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRendezvous } from 'app/shared/model/rendezvous.model';

@Component({
    selector: 'jhi-rendezvous-detail',
    templateUrl: './rendezvous-detail.component.html'
})
export class RendezvousDetailComponent implements OnInit {
    rendezvous: IRendezvous;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ rendezvous }) => {
            this.rendezvous = rendezvous;
        });
    }

    previousState() {
        window.history.back();
    }
}
