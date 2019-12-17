import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HopitalSharedModule } from 'app/shared';
import { HopitalAdminModule } from 'app/admin/admin.module';
import {
    RendezvousComponent,
    RendezvousDetailComponent,
    RendezvousUpdateComponent,
    RendezvousDeletePopupComponent,
    RendezvousDeleteDialogComponent,
    rendezvousRoute,
    rendezvousPopupRoute
} from './';

const ENTITY_STATES = [...rendezvousRoute, ...rendezvousPopupRoute];

@NgModule({
    imports: [HopitalSharedModule, HopitalAdminModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        RendezvousComponent,
        RendezvousDetailComponent,
        RendezvousUpdateComponent,
        RendezvousDeleteDialogComponent,
        RendezvousDeletePopupComponent
    ],
    entryComponents: [RendezvousComponent, RendezvousUpdateComponent, RendezvousDeleteDialogComponent, RendezvousDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HopitalRendezvousModule {}
