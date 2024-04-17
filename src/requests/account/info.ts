import axios from "axios";

import { Links } from "../../core/links";

export namespace ApiUserInfo {
  const link = `${Links.api}/Account/GetUserInfo`;

  export interface IResponse {
    authorId: number | null;
    id: string;
    firstname: string;
    surname: string;
    avatarPath: null;
    email: string;
    userName: string;
    phone: string;
    organization: null;
    address: null;
    country: null;
    state: null;
    zipCode: null;
    language: null;
    timeZones: null;
    currency: null;
    privatePerson: boolean;
    aboutUser: null;
    platform: null;
    companyProfile: null;
    websiteSocailMedia: null;
    deactivated: boolean;
    trialUsed: boolean;
    inTrial: boolean;
    stripeSubscription: null;
    registrationDate: string;
    getReports: boolean;
    getNews: boolean;
    stripeCoupon: null;
    subscriptionPayer: null;
    getSodReport: boolean;
    getSowReport: boolean;
    getSomReport: boolean;
    getVodReport: boolean;
    getVowReport: boolean;
    getVomReport: boolean;
    getAodReport: boolean;
    getAowReport: boolean;
    getAomReport: boolean;
  }

  export const get = async () => {
    const res = await axios.get<IResponse>(link);

    return res.data;
  };
}
