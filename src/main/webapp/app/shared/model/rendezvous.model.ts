import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';

export interface IRendezvous {
    id?: number;
    description?: string;
    date?: Moment;
    user?: IUser;
}

export class Rendezvous implements IRendezvous {
    constructor(public id?: number, public description?: string, public date?: Moment, public user?: IUser) {}
}
