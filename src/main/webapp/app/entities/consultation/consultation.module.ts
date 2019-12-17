import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HopitalSharedModule } from 'app/shared';
import { HopitalAdminModule } from 'app/admin/admin.module';
import {
    ConsultationComponent,
    ConsultationDetailComponent,
    ConsultationUpdateComponent,
    ConsultationDeletePopupComponent,
    ConsultationDeleteDialogComponent,
    consultationRoute,
    consultationPopupRoute
} from './';

const ENTITY_STATES = [...consultationRoute, ...consultationPopupRoute];

@NgModule({
    imports: [HopitalSharedModule, HopitalAdminModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ConsultationComponent,
        ConsultationDetailComponent,
        ConsultationUpdateComponent,
        ConsultationDeleteDialogComponent,
        ConsultationDeletePopupComponent
    ],
    entryComponents: [
        ConsultationComponent,
        ConsultationUpdateComponent,
        ConsultationDeleteDialogComponent,
        ConsultationDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HopitalConsultationModule {}
