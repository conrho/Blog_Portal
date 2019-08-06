import { IComment } from '../interfaces';

export class Comment implements IComment {
  id: number;
  content: string;
  blogId: number;
  idUser: string;
  createdDate: Date;

  constructor() {
  }
}
