/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HopitalTestModule } from '../../../test.module';
import { RendezvousComponent } from 'app/entities/rendezvous/rendezvous.component';
import { RendezvousService } from 'app/entities/rendezvous/rendezvous.service';
import { Rendezvous } from 'app/shared/model/rendezvous.model';

describe('Component Tests', () => {
    describe('Rendezvous Management Component', () => {
        let comp: RendezvousComponent;
        let fixture: ComponentFixture<RendezvousComponent>;
        let service: RendezvousService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HopitalTestModule],
                declarations: [RendezvousComponent],
                providers: []
            })
                .overrideTemplate(RendezvousComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(RendezvousComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RendezvousService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Rendezvous(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.rendezvous[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
