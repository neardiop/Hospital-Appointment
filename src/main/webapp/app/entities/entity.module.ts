import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { HopitalRendezvousModule } from './rendezvous/rendezvous.module';
import { HopitalConsultationModule } from './consultation/consultation.module';
import { HopitalFactureModule } from './facture/facture.module';
import { HopitalAideModule } from './aide/aide.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        HopitalRendezvousModule,
        HopitalConsultationModule,
        HopitalFactureModule,
        HopitalAideModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HopitalEntityModule {}
