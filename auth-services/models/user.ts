import { model, Schema } from "mongoose";

export interface IUser{
 email: string;
 name: string;
 password: string;
 refreshToken: string;
 role: string
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
  },
  role:{
    type: String,
    enum: ["0", "1"] // 0 - customer, 1 - admin
  }
});

schema.set("toJSON", {
  virtuals: true,
  versionKey: false,
});

const Users = model<IUser>("users", schema);
export default Users;