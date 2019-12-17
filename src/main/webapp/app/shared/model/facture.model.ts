import { IUser } from 'app/core/user/user.model';

export interface IFacture {
    id?: number;
    description?: string;
    montant?: number;
    user?: IUser;
}

export class Facture implements IFacture {
    constructor(public id?: number, public description?: string, public montant?: number, public user?: IUser) {}
}
