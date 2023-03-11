import { User } from "~/appplication/interfaces/user";

export interface UpdadeUserProps {
  name?: string;
  email?: string;
  adress?: string;
}

export interface IUpdateUserRepository {
  updateUser(id:string, props: UpdadeUserProps): Promise<User>;
}