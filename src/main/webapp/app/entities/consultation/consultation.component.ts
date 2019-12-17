import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IConsultation } from 'app/shared/model/consultation.model';
import {Account, Principal} from 'app/core';
import { ConsultationService } from './consultation.service';

@Component({
    selector: 'jhi-consultation',
    templateUrl: './consultation.component.html'
})
export class ConsultationComponent implements OnInit, OnDestroy {
    consultations: IConsultation[];
    currentAccount: any;
    eventSubscriber: Subscription;
    account: Account;

    constructor(
        private consultationService: ConsultationService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.consultationService.query().subscribe(
            (res: HttpResponse<IConsultation[]>) => {
                this.consultations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.principal.identity().then(account => {
            this.account = account;
        });
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInConsultations();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IConsultation) {
        return item.id;
    }

    registerChangeInConsultations() {
        this.eventSubscriber = this.eventManager.subscribe('consultationListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    whoUser() {
        if (this.account.login === 'admin') {
            return true;
        } else {
            return false;
        }
    }
}
