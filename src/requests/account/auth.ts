import axios from "axios";
import qs from "qs";

import { Links } from "../../core/links";

export namespace ApiAuth {
  const link = `${Links.api}/Account`;

  interface ISignUpRequest {
    email: string;
    password: string;
    passwordConfirm: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    returnUrl: string;
    promocode?: string;
    sharedSubscriptionKey?: string;
  }

  interface ISignInRequest {
    email: string;
    password: string;
    rememberMe: boolean;
  }

  interface IConfirmRequest {
    userName: string;
    returnUrl: string;
  }

  interface ILogoutRequest {
    userName: string;
  }

  export const signUp = async (params: ISignUpRequest) => {
    const res = await axios.post<string>(`${link}/SignUp`, params);

    return res.data;
  };

  export const signIn = async (params: ISignInRequest) => {
    const res = await axios.post(`${link}/SignIn`, params);

    return res.data;
  };

  export const resendConfirm = async (params: IConfirmRequest) => {
    const res = await axios.get(
      `${link}/ResendConfirmEmail${qs.stringify(params, { addQueryPrefix: true })}`,
    );

    return res.data;
  };

  export const logout = async (params: ILogoutRequest) => {
    const res = await axios.get(`${link}/Logout${qs.stringify(params, { addQueryPrefix: true })}`);

    return res.data;
  };
}
