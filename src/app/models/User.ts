export interface User {
  username: string;
    token: string;
    country?: string;
    city?: string;
    photoUrl?: string;
    roles?: string[];// if user has two roles it's an array if one role it's a string !!
}
