import User from "../models/user.model";
import Account from "../models/account.model";

export class AccountHandler {
  static async getUserWithProviders(email: string) {
    const userWithAccounts = await User.findOne({
      where: { email },
      include: [
        {
          model: Account,
          as: "accounts", 
          attributes: ["provider"],
        },
      ],
    });

    return userWithAccounts;
  }
}