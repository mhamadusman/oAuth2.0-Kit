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
static async loginOrregisterUsingSocialProfile(
  socialProfile: any
): Promise<{ userId: number; created: boolean; accountCreated: boolean }> {
  const { email, providerId, name, profileImage, isEmailVerified, provider } =
    socialProfile;

  try {
    return await sequelize.transaction(async (t) => {
      const [user, created] = await User.findOrCreate({
        where: { email },
        defaults: {
          email,
          name: name ?? undefined,
          isEmailVerified,
          profileImage: profileImage ?? undefined,
        },
        transaction: t,
      });

      const [account, accountCreated] = await Account.findOrCreate({
        where: { providerId, provider },
        defaults: {
          userId: user.id,
          provider,
          providerId,
        },
        transaction: t,
      });

      return {
        userId: user.id,
        created,
        accountCreated,
      };
    });
  } catch (error: unknown) {
    throw error;
  }
}
}
