import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';

export interface IConsultation {
    id?: number;
    prescription?: string;
    date?: Moment;
    user?: IUser;
}

export class Consultation implements IConsultation {
    constructor(public id?: number, public prescription?: string, public date?: Moment, public user?: IUser) {}
}
