import { IMessage } from '../interfaces';

export class Message implements IMessage {
  id: number;
  title: string;
  content: string;
  idUserTo: string;
  idUserFrom: string;
  messageType: string;
  hasRead: boolean;

  constructor() {
  }
}
