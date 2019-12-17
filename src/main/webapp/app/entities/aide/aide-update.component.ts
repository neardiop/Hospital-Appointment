import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IAide } from 'app/shared/model/aide.model';
import { AideService } from './aide.service';
import { IUser, UserService } from 'app/core';

@Component({
    selector: 'jhi-aide-update',
    templateUrl: './aide-update.component.html'
})
export class AideUpdateComponent implements OnInit {
    private _aide: IAide;
    isSaving: boolean;

    users: IUser[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private aideService: AideService,
        private userService: UserService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ aide }) => {
            this.aide = aide;
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
        if (this.aide.id !== undefined) {
            this.subscribeToSaveResponse(this.aideService.update(this.aide));
        } else {
            this.subscribeToSaveResponse(this.aideService.create(this.aide));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IAide>>) {
        result.subscribe((res: HttpResponse<IAide>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
    get aide() {
        return this._aide;
    }

    set aide(aide: IAide) {
        this._aide = aide;
    }
}
