import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IConsultation } from 'app/shared/model/consultation.model';

type EntityResponseType = HttpResponse<IConsultation>;
type EntityArrayResponseType = HttpResponse<IConsultation[]>;

@Injectable({ providedIn: 'root' })
export class ConsultationService {
    private resourceUrl = SERVER_API_URL + 'api/consultations';

    constructor(private http: HttpClient) {}

    create(consultation: IConsultation): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(consultation);
        return this.http
            .post<IConsultation>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    update(consultation: IConsultation): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(consultation);
        return this.http
            .put<IConsultation>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IConsultation>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IConsultation[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(consultation: IConsultation): IConsultation {
        const copy: IConsultation = Object.assign({}, consultation, {
            date: consultation.date != null && consultation.date.isValid() ? consultation.date.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.date = res.body.date != null ? moment(res.body.date) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((consultation: IConsultation) => {
            consultation.date = consultation.date != null ? moment(consultation.date) : null;
        });
        return res;
    }
}
