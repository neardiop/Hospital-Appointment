import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IConsultation } from 'app/shared/model/consultation.model';
import { ConsultationService } from './consultation.service';
import { IUser, UserService } from 'app/core';

@Component({
    selector: 'jhi-consultation-update',
    templateUrl: './consultation-update.component.html'
})
export class ConsultationUpdateComponent implements OnInit {
    private _consultation: IConsultation;
    isSaving: boolean;

    users: IUser[];
    dateDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private consultationService: ConsultationService,
        private userService: UserService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ consultation }) => {
            this.consultation = consultation;
        });
        this.userService.query().subscribe(
            (res: HttpResponse<IUser[]>) => {
                this.users = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.consultation.id !== undefined) {
            this.subscribeToSaveResponse(this.consultationService.update(this.consultation));
        } else {
            this.subscribeToSaveResponse(this.consultationService.create(this.consultation));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IConsultation>>) {
        result.subscribe((res: HttpResponse<IConsultation>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackUserById(index: number, item: IUser) {
        return item.id;
    }
    get consultation() {
        return this._consultation;
    }

    set consultation(consultation: IConsultation) {
        this._consultation = consultation;
    }
}
