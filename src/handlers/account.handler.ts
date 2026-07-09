import Account from "../models/account.model";
import sequelize from "../config/config.database";
import User from "../models/user.model";
export class AccountHandler {
  static async getSocialAccoutByProviderId(
    providerId: string,
  ): Promise<Account | null> {
    const account: Account | null = await Account.findOne({
      where: { providerId: providerId },
    });
    return account;
  }
  static async loginOrregisterUsingSocialProfile(socialProfile: any) {
    const email = socialProfile.emails?.[0].value;
    const providerId = socialProfile.id;
    try {
      const result = await sequelize.transaction(async (t) => {
        const [user, created] = await User.findOrCreate({
          where: { email },
          defaults: {
            email: email,
            isEmailVerified: true,
            profileImage: socialProfile.photos[0]?.value || null,
          },
          transaction: t,
        });

        const [account, accountCreated] = await Account.findOrCreate({
          where: { providerId },
          defaults: {
            userId: user.id,
            provider: socialProfile.provider,
            providerId: providerId
          },
          transaction: t
        });
        return { user, created, accountCreated };
      });
      return result
    } catch (error: unknown) {
        throw error
    }
  }
}
