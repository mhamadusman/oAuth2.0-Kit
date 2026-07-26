import { AccountHandler } from "../handlers/account.handler";
import { INormalizedSocialProfile } from "../types/type.auth";
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
  static extractSocialProfileData(
    socialProfile: any,
  ): INormalizedSocialProfile {
    const primaryEmailObj =
      socialProfile.emails && socialProfile.emails.length > 0
        ? socialProfile.emails[0]
        : null;
    const email = primaryEmailObj?.value;

    if (!email) {
      throw new Error(
        `Authentication failed: No email address was provided by ${socialProfile.provider || "the social provider"}.`,
      );
    }

    return {
      email,
      providerId: socialProfile.id,
      name:
        socialProfile.displayName ||
        socialProfile._json?.name ||
        socialProfile.username ||
        null,
      profileImage:
        socialProfile.photos?.[0]?.value ||
        socialProfile._json?.avatar_url ||
        null,
      isEmailVerified:
        primaryEmailObj?.verified !== undefined
          ? primaryEmailObj.verified
          : true,
      provider: socialProfile.provider,
    };
  }
}
