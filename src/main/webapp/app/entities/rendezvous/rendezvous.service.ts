import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IRendezvous } from 'app/shared/model/rendezvous.model';

type EntityResponseType = HttpResponse<IRendezvous>;
type EntityArrayResponseType = HttpResponse<IRendezvous[]>;

@Injectable({ providedIn: 'root' })
export class RendezvousService {
    private resourceUrl = SERVER_API_URL + 'api/rendezvous';

    constructor(private http: HttpClient) {}

    create(rendezvous: IRendezvous): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(rendezvous);
        return this.http
            .post<IRendezvous>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    update(rendezvous: IRendezvous): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(rendezvous);
        return this.http
            .put<IRendezvous>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IRendezvous>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IRendezvous[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(rendezvous: IRendezvous): IRendezvous {
        const copy: IRendezvous = Object.assign({}, rendezvous, {
            date: rendezvous.date != null && rendezvous.date.isValid() ? rendezvous.date.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.date = res.body.date != null ? moment(res.body.date) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((rendezvous: IRendezvous) => {
            rendezvous.date = rendezvous.date != null ? moment(rendezvous.date) : null;
        });
        return res;
    }
}
