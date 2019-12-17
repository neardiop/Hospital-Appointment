import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable } from 'rxjs';
import { Aide } from 'app/shared/model/aide.model';
import { AideService } from './aide.service';
import { AideComponent } from './aide.component';
import { AideDetailComponent } from './aide-detail.component';
import { AideUpdateComponent } from './aide-update.component';
import { AideDeletePopupComponent } from './aide-delete-dialog.component';
import { IAide } from 'app/shared/model/aide.model';

@Injectable({ providedIn: 'root' })
export class AideResolve implements Resolve<IAide> {
    constructor(private service: AideService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).map((aide: HttpResponse<Aide>) => aide.body);
        }
        return Observable.of(new Aide());
    }
}

export const aideRoute: Routes = [
    {
        path: 'aide',
        component: AideComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hopitalApp.aide.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'aide/:id/view',
        component: AideDetailComponent,
        resolve: {
            aide: AideResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hopitalApp.aide.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'aide/new',
        component: AideUpdateComponent,
        resolve: {
            aide: AideResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hopitalApp.aide.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'aide/:id/edit',
        component: AideUpdateComponent,
        resolve: {
            aide: AideResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hopitalApp.aide.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const aidePopupRoute: Routes = [
    {
        path: 'aide/:id/delete',
        component: AideDeletePopupComponent,
        resolve: {
            aide: AideResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hopitalApp.aide.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
