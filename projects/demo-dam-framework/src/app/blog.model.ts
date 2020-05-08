import { IDamResource } from 'ngx-dam-framework';

export interface IBlog {
  name: string;
  posts: {
    id: string,
    dateCreated: Date,
  }[];
}

export interface IPost extends IDamResource {
  id: string;
  title: string;
  content: string;
  dateCreated: Date;
  dateUpdated: Date;
}
