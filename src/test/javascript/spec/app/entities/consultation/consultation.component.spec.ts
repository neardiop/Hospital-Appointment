/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HopitalTestModule } from '../../../test.module';
import { ConsultationComponent } from 'app/entities/consultation/consultation.component';
import { ConsultationService } from 'app/entities/consultation/consultation.service';
import { Consultation } from 'app/shared/model/consultation.model';

describe('Component Tests', () => {
    describe('Consultation Management Component', () => {
        let comp: ConsultationComponent;
        let fixture: ComponentFixture<ConsultationComponent>;
        let service: ConsultationService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HopitalTestModule],
                declarations: [ConsultationComponent],
                providers: []
            })
                .overrideTemplate(ConsultationComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ConsultationComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ConsultationService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Consultation(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.consultations[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
