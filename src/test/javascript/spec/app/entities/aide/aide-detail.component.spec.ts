/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HopitalTestModule } from '../../../test.module';
import { AideDetailComponent } from 'app/entities/aide/aide-detail.component';
import { Aide } from 'app/shared/model/aide.model';

describe('Component Tests', () => {
    describe('Aide Management Detail Component', () => {
        let comp: AideDetailComponent;
        let fixture: ComponentFixture<AideDetailComponent>;
        const route = ({ data: of({ aide: new Aide(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HopitalTestModule],
                declarations: [AideDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(AideDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AideDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.aide).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
