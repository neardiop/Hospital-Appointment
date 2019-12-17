/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { HopitalTestModule } from '../../../test.module';
import { AideUpdateComponent } from 'app/entities/aide/aide-update.component';
import { AideService } from 'app/entities/aide/aide.service';
import { Aide } from 'app/shared/model/aide.model';

describe('Component Tests', () => {
    describe('Aide Management Update Component', () => {
        let comp: AideUpdateComponent;
        let fixture: ComponentFixture<AideUpdateComponent>;
        let service: AideService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HopitalTestModule],
                declarations: [AideUpdateComponent]
            })
                .overrideTemplate(AideUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AideUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AideService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Aide(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.aide = entity;
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
                    const entity = new Aide();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.aide = entity;
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
