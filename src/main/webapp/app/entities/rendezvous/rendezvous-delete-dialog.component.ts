import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRendezvous } from 'app/shared/model/rendezvous.model';
import { RendezvousService } from './rendezvous.service';

@Component({
    selector: 'jhi-rendezvous-delete-dialog',
    templateUrl: './rendezvous-delete-dialog.component.html'
})
export class RendezvousDeleteDialogComponent {
    rendezvous: IRendezvous;

    constructor(private rendezvousService: RendezvousService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.rendezvousService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'rendezvousListModification',
                content: 'Deleted an rendezvous'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-rendezvous-delete-popup',
    template: ''
})
export class RendezvousDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ rendezvous }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(RendezvousDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.rendezvous = rendezvous;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
