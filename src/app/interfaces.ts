

export interface IBlog {
    id: number;
    idUser: string;
    title: string;
    content: string;
    category: string;
    state: string;
}

export interface IUser {
    id: number;
    userId: string; // the identifaction (username) chosen by the user
    password: string;
    firstName: string;
    lastName: string;
    mobile: string;
    email: string;
    userType: string; // either NORMAL, ADMIN or SUPERADMIN
    token: string; // unique token which allows the user to remain logged in

  }

export interface IRating {
  id: number;
  rate: number; // between 0 & 5
  blogId: number; // the blog being rated
  idUser: string; // username of rate author not blog author
}

export interface IComment {
  id: number;
  content: string; // characters which make up the comment
  blogId: number; // id of the blog being commented on
  idUser: string; // id of the user authoring the comment
  createdDate: Date;
}

export interface IMessage {
  id: number; // primary key of message table
  title: string;  //title of the message
  content: string;  //content of the message
  idUserTo: string; //the user's id who is receiving the message
  idUserFrom: string; //the user's id who is sending the message
  messageType: string; //
  hasRead: boolean;
}

export interface IHash {
  [details: string]: string;
}
