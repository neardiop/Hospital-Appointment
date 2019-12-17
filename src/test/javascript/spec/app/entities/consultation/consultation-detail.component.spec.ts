/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HopitalTestModule } from '../../../test.module';
import { ConsultationDetailComponent } from 'app/entities/consultation/consultation-detail.component';
import { Consultation } from 'app/shared/model/consultation.model';

describe('Component Tests', () => {
    describe('Consultation Management Detail Component', () => {
        let comp: ConsultationDetailComponent;
        let fixture: ComponentFixture<ConsultationDetailComponent>;
        const route = ({ data: of({ consultation: new Consultation(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HopitalTestModule],
                declarations: [ConsultationDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ConsultationDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ConsultationDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.consultation).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
