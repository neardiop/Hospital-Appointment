/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { HopitalTestModule } from '../../../test.module';
import { RendezvousDeleteDialogComponent } from 'app/entities/rendezvous/rendezvous-delete-dialog.component';
import { RendezvousService } from 'app/entities/rendezvous/rendezvous.service';

describe('Component Tests', () => {
    describe('Rendezvous Management Delete Component', () => {
        let comp: RendezvousDeleteDialogComponent;
        let fixture: ComponentFixture<RendezvousDeleteDialogComponent>;
        let service: RendezvousService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HopitalTestModule],
                declarations: [RendezvousDeleteDialogComponent]
            })
                .overrideTemplate(RendezvousDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(RendezvousDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RendezvousService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it(
                'Should call delete service on confirmDelete',
                inject(
                    [],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });
});
