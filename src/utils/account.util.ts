import { AccountHandler } from "../handlers/account.handler";

export class AccountUtil {
  static async getSocialAccoutByProviderId(
    providerId: string,
  ): Promise<boolean> {
    const account =
      await AccountHandler.getSocialAccoutByProviderId(providerId);
    if (account) {
      return true;
    }
    return false;
  }
}
