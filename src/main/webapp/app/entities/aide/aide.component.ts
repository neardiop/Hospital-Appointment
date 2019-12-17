import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAide } from 'app/shared/model/aide.model';
import { Principal } from 'app/core';
import { AideService } from './aide.service';

@Component({
    selector: 'jhi-aide',
    templateUrl: './aide.component.html'
})
export class AideComponent implements OnInit, OnDestroy {
    aides: IAide[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private aideService: AideService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.aideService.query().subscribe(
            (res: HttpResponse<IAide[]>) => {
                this.aides = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInAides();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IAide) {
        return item.id;
    }

    registerChangeInAides() {
        this.eventSubscriber = this.eventManager.subscribe('aideListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
