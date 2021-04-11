import {AccessToken} from "./access-token";

export interface UserResponse {
  id: number,
  firstName: string,
  lastName: string,
  eMail: string,
  accessToken: AccessToken,
}
