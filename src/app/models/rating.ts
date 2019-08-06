import { IRating } from '../interfaces';

export class Rating implements IRating {
  id: number;
  rate: number;
  blogId: number;
  idUser: string;

  constructor(rate: number, blogId: number, username: string) {
    this.rate = rate;
    this.blogId = blogId;
    this.idUser = username;
  }
}
