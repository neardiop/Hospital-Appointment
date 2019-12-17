/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HopitalTestModule } from '../../../test.module';
import { AideComponent } from 'app/entities/aide/aide.component';
import { AideService } from 'app/entities/aide/aide.service';
import { Aide } from 'app/shared/model/aide.model';

describe('Component Tests', () => {
    describe('Aide Management Component', () => {
        let comp: AideComponent;
        let fixture: ComponentFixture<AideComponent>;
        let service: AideService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HopitalTestModule],
                declarations: [AideComponent],
                providers: []
            })
                .overrideTemplate(AideComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AideComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AideService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Aide(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.aides[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
