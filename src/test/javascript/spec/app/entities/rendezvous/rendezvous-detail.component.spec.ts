/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HopitalTestModule } from '../../../test.module';
import { RendezvousDetailComponent } from 'app/entities/rendezvous/rendezvous-detail.component';
import { Rendezvous } from 'app/shared/model/rendezvous.model';

describe('Component Tests', () => {
    describe('Rendezvous Management Detail Component', () => {
        let comp: RendezvousDetailComponent;
        let fixture: ComponentFixture<RendezvousDetailComponent>;
        const route = ({ data: of({ rendezvous: new Rendezvous(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HopitalTestModule],
                declarations: [RendezvousDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(RendezvousDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(RendezvousDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.rendezvous).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
