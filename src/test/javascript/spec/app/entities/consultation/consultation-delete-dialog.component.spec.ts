/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { HopitalTestModule } from '../../../test.module';
import { ConsultationDeleteDialogComponent } from 'app/entities/consultation/consultation-delete-dialog.component';
import { ConsultationService } from 'app/entities/consultation/consultation.service';

describe('Component Tests', () => {
    describe('Consultation Management Delete Component', () => {
        let comp: ConsultationDeleteDialogComponent;
        let fixture: ComponentFixture<ConsultationDeleteDialogComponent>;
        let service: ConsultationService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HopitalTestModule],
                declarations: [ConsultationDeleteDialogComponent]
            })
                .overrideTemplate(ConsultationDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ConsultationDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ConsultationService);
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
