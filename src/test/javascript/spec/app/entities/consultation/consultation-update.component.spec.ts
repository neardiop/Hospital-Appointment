/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { HopitalTestModule } from '../../../test.module';
import { ConsultationUpdateComponent } from 'app/entities/consultation/consultation-update.component';
import { ConsultationService } from 'app/entities/consultation/consultation.service';
import { Consultation } from 'app/shared/model/consultation.model';

describe('Component Tests', () => {
    describe('Consultation Management Update Component', () => {
        let comp: ConsultationUpdateComponent;
        let fixture: ComponentFixture<ConsultationUpdateComponent>;
        let service: ConsultationService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HopitalTestModule],
                declarations: [ConsultationUpdateComponent]
            })
                .overrideTemplate(ConsultationUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ConsultationUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ConsultationService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Consultation(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.consultation = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Consultation();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.consultation = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
