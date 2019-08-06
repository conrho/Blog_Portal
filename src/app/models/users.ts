import {IUser} from '../interfaces';

export class Users implements IUser {
    id: number;
    userId: string;
    password: string;
    firstName: string;
    lastName: string;
    mobile: string;
    email: string;
    userType: string;
    token: string;

    // tslint:disable-next-line:max-line-length
    constructor() {
    }

    toString(){
        return "userId: " + this.userId + " / Password: " + this.password + " / firstName: " + this.firstName + " / lastName: " + this.lastName + " / Mobile: " + this.mobile + " / Email: " + this.email + " / userType: " + this.userType;
    }
}
