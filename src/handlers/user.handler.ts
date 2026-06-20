import User from "../models/user.model";
import { creatUserDTO } from "../types/type.auth";

export class userHandler{
    static async creatUser(data: creatUserDTO){
      await User.create({
        email : data.email,
        password: data.password
      })
    }
    static async verifyEmailRecod(email: string): Promise<User | null> {
        const user = User.findOne({
            where: {email: email}
        })
        return user
    }
}