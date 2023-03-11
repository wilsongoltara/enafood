export interface User {
  id: string;
  name: string;
  email: string;
  adress: string;
  bag: {
    items: Array<any>;
  }
}
