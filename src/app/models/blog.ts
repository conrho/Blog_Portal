import { IBlog } from '../interfaces';

export class Blog implements IBlog {
  id: number;
  idUser: string;
  title: string;
  content: string;
  category: string;
  state: string;

  constructor() {}
}

