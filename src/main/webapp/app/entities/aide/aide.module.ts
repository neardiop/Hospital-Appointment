import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HopitalSharedModule } from 'app/shared';
import { HopitalAdminModule } from 'app/admin/admin.module';
import {
    AideComponent,
    AideDetailComponent,
    AideUpdateComponent,
    AideDeletePopupComponent,
    AideDeleteDialogComponent,
    aideRoute,
    aidePopupRoute
} from './';

const ENTITY_STATES = [...aideRoute, ...aidePopupRoute];

@NgModule({
    imports: [HopitalSharedModule, HopitalAdminModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [AideComponent, AideDetailComponent, AideUpdateComponent, AideDeleteDialogComponent, AideDeletePopupComponent],
    entryComponents: [AideComponent, AideUpdateComponent, AideDeleteDialogComponent, AideDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HopitalAideModule {}
