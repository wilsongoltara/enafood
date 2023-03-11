export interface User {
  name: string;
  email: string;
  adress: string;
  bag: {
    items: Array<any>;
  }
}
