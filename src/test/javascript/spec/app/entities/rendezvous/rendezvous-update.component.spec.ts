/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { HopitalTestModule } from '../../../test.module';
import { RendezvousUpdateComponent } from 'app/entities/rendezvous/rendezvous-update.component';
import { RendezvousService } from 'app/entities/rendezvous/rendezvous.service';
import { Rendezvous } from 'app/shared/model/rendezvous.model';

describe('Component Tests', () => {
    describe('Rendezvous Management Update Component', () => {
        let comp: RendezvousUpdateComponent;
        let fixture: ComponentFixture<RendezvousUpdateComponent>;
        let service: RendezvousService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HopitalTestModule],
                declarations: [RendezvousUpdateComponent]
            })
                .overrideTemplate(RendezvousUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(RendezvousUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RendezvousService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Rendezvous(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.rendezvous = entity;
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
                    const entity = new Rendezvous();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.rendezvous = entity;
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
