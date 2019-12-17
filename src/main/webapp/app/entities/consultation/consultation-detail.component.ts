import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IConsultation } from 'app/shared/model/consultation.model';

@Component({
    selector: 'jhi-consultation-detail',
    templateUrl: './consultation-detail.component.html'
})
export class ConsultationDetailComponent implements OnInit {
    consultation: IConsultation;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ consultation }) => {
            this.consultation = consultation;
        });
    }

    previousState() {
        window.history.back();
    }
}
