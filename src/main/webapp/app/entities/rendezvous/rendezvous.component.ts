import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IRendezvous } from 'app/shared/model/rendezvous.model';
import { Principal } from 'app/core';
import { RendezvousService } from './rendezvous.service';

@Component({
    selector: 'jhi-rendezvous',
    templateUrl: './rendezvous.component.html'
})
export class RendezvousComponent implements OnInit, OnDestroy {
    rendezvous: IRendezvous[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private rendezvousService: RendezvousService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.rendezvousService.query().subscribe(
            (res: HttpResponse<IRendezvous[]>) => {
                this.rendezvous = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInRendezvous();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IRendezvous) {
        return item.id;
    }

    registerChangeInRendezvous() {
        this.eventSubscriber = this.eventManager.subscribe('rendezvousListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
