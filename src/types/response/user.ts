import { Int32 } from "@airtasker/spot";
import { Snowflake } from "../common";

export interface PartialUserObjectBase {
    /**
     * The user ID
     */
    id: Snowflake;
    /**
     * The user name
     */
    name: string;
    /**
     * The user discriminator (the 4 digits after the "#" sign)
     */
    discriminator: string;
    /**
     * The avatar hash of the user
     */
    avatar?: string;
}

export interface PartialUserObject extends PartialUserObjectBase {
    /**
     * The public flags of the user.
     * Learn more about flags here: https://discord.com/developers/docs/resources/user#user-object-user-flags
     */
    public_flags: Int32;
}

export interface UserObject extends PartialUserObject {
    /**
     * The user banner hash if set
     */
    banner?: string;
    /**
     * Whether the user belongs to an OAuth2 application
     */
    bot?: boolean;
    /**
     * Whether the user is an Official Discord System use
     */
    system?: boolean;
    /**
     * Whether the user has two factor enabled on their account
     */
    mfa_enabled?: boolean;
    /**
     * The user's banner color encoded as an integer representation of hexadecimal color code
     */
    accent_color?: Int32;
    /**
     * The user's chosen language option
     */
    locale?: string;
    /**
     * Whether the email on this account has been verified
     */
    verified?: boolean;
    /**
     * The user email
     */
    email?: string;
    /**
     * The flags on the user's account
     * Learn more about flags here: https://discord.com/developers/docs/resources/user#user-object-user-flags
     */
    flags?: Int32;
    /**
     * The type of preium or Nitro subcription on the user's account
     * 0 means none, 1 means nitro classic, 2 means nitro
     */
    premium_type?: 0 | 1 | 2;
}