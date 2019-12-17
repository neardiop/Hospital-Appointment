import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IRendezvous } from 'app/shared/model/rendezvous.model';
import { RendezvousService } from './rendezvous.service';
import { IUser, UserService } from 'app/core';

@Component({
    selector: 'jhi-rendezvous-update',
    templateUrl: './rendezvous-update.component.html'
})
export class RendezvousUpdateComponent implements OnInit {
    private _rendezvous: IRendezvous;
    isSaving: boolean;

    users: IUser[];
    dateDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private rendezvousService: RendezvousService,
        private userService: UserService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ rendezvous }) => {
            this.rendezvous = rendezvous;
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
        if (this.rendezvous.id !== undefined) {
            this.subscribeToSaveResponse(this.rendezvousService.update(this.rendezvous));
        } else {
            this.subscribeToSaveResponse(this.rendezvousService.create(this.rendezvous));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IRendezvous>>) {
        result.subscribe((res: HttpResponse<IRendezvous>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
    get rendezvous() {
        return this._rendezvous;
    }

    set rendezvous(rendezvous: IRendezvous) {
        this._rendezvous = rendezvous;
    }
}
