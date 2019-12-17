import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable } from 'rxjs';
import { Consultation } from 'app/shared/model/consultation.model';
import { ConsultationService } from './consultation.service';
import { ConsultationComponent } from './consultation.component';
import { ConsultationDetailComponent } from './consultation-detail.component';
import { ConsultationUpdateComponent } from './consultation-update.component';
import { ConsultationDeletePopupComponent } from './consultation-delete-dialog.component';
import { IConsultation } from 'app/shared/model/consultation.model';

@Injectable({ providedIn: 'root' })
export class ConsultationResolve implements Resolve<IConsultation> {
    constructor(private service: ConsultationService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).map((consultation: HttpResponse<Consultation>) => consultation.body);
        }
        return Observable.of(new Consultation());
    }
}

export const consultationRoute: Routes = [
    {
        path: 'consultation',
        component: ConsultationComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hopitalApp.consultation.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'consultation/:id/view',
        component: ConsultationDetailComponent,
        resolve: {
            consultation: ConsultationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hopitalApp.consultation.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'consultation/new',
        component: ConsultationUpdateComponent,
        resolve: {
            consultation: ConsultationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hopitalApp.consultation.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'consultation/:id/edit',
        component: ConsultationUpdateComponent,
        resolve: {
            consultation: ConsultationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hopitalApp.consultation.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const consultationPopupRoute: Routes = [
    {
        path: 'consultation/:id/delete',
        component: ConsultationDeletePopupComponent,
        resolve: {
            consultation: ConsultationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hopitalApp.consultation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
