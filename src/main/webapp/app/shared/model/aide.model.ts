import { IUser } from 'app/core/user/user.model';

export interface IAide {
    id?: number;
    description?: string;
    user?: IUser;
}

export class Aide implements IAide {
    constructor(public id?: number, public description?: string, public user?: IUser) {}
}
