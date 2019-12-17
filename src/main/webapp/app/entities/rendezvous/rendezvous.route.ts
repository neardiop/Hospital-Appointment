import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable } from 'rxjs';
import { Rendezvous } from 'app/shared/model/rendezvous.model';
import { RendezvousService } from './rendezvous.service';
import { RendezvousComponent } from './rendezvous.component';
import { RendezvousDetailComponent } from './rendezvous-detail.component';
import { RendezvousUpdateComponent } from './rendezvous-update.component';
import { RendezvousDeletePopupComponent } from './rendezvous-delete-dialog.component';
import { IRendezvous } from 'app/shared/model/rendezvous.model';

@Injectable({ providedIn: 'root' })
export class RendezvousResolve implements Resolve<IRendezvous> {
    constructor(private service: RendezvousService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).map((rendezvous: HttpResponse<Rendezvous>) => rendezvous.body);
        }
        return Observable.of(new Rendezvous());
    }
}

export const rendezvousRoute: Routes = [
    {
        path: 'rendezvous',
        component: RendezvousComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hopitalApp.rendezvous.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'rendezvous/:id/view',
        component: RendezvousDetailComponent,
        resolve: {
            rendezvous: RendezvousResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hopitalApp.rendezvous.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'rendezvous/new',
        component: RendezvousUpdateComponent,
        resolve: {
            rendezvous: RendezvousResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hopitalApp.rendezvous.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'rendezvous/:id/edit',
        component: RendezvousUpdateComponent,
        resolve: {
            rendezvous: RendezvousResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hopitalApp.rendezvous.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const rendezvousPopupRoute: Routes = [
    {
        path: 'rendezvous/:id/delete',
        component: RendezvousDeletePopupComponent,
        resolve: {
            rendezvous: RendezvousResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hopitalApp.rendezvous.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
