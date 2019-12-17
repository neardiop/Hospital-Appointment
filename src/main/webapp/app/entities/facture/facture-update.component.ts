import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IFacture } from 'app/shared/model/facture.model';
import { FactureService } from './facture.service';
import { IUser, UserService } from 'app/core';

@Component({
    selector: 'jhi-facture-update',
    templateUrl: './facture-update.component.html'
})
export class FactureUpdateComponent implements OnInit {
    private _facture: IFacture;
    isSaving: boolean;

    users: IUser[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private factureService: FactureService,
        private userService: UserService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ facture }) => {
            this.facture = facture;
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
        if (this.facture.id !== undefined) {
            this.subscribeToSaveResponse(this.factureService.update(this.facture));
        } else {
            this.subscribeToSaveResponse(this.factureService.create(this.facture));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IFacture>>) {
        result.subscribe((res: HttpResponse<IFacture>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
    get facture() {
        return this._facture;
    }

    set facture(facture: IFacture) {
        this._facture = facture;
    }
}
