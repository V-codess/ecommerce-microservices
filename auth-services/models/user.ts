import { model, Schema } from "mongoose";

export interface IUser{
 email: string;
 name: string;
 password: string;
 refreshToken: string;
}
const schema = new Schema<IUser>({
  email:{
    type: String,
    required: true
  },
  name:{
    type: String
  },
  password:{
    type: String
  },
  refreshToken:{
    type: String
  }
});

schema.set("toJSON", {
  virtuals: true,
  versionKey: false,
});

const Users = model<IUser>("users", schema);
export default Users;