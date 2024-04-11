import axios from "axios";
import qs from "qs";

import { Links } from "../core/links";

export namespace ApiSchedule {
  const link = `${Links.api}/Statistics/TimeToPost`;

  interface IRequest {
    country: string;
    category?: number;
    followers?: number;
  }

  export interface IResponse {
    categoryId: number;
    country: string;
    followers: number;
    daysStats: DaysStat[];
  }

  interface DaysStat {
    dayOfWeek: number;
    dayName: string;
    hoursStats: HoursStat[];
  }

  export interface HoursStat {
    hour: number;
    percent: number;
  }

  interface IFiltersResponse {
    country: string;
    category: number;
    followers: number;
    followersList: number[];
    categoriesList: CategoriesList[];
    countriesList: CountriesList[];
  }

  interface CategoriesList {
    id: number;
    categoryName: string;
    sounds: number;
    videos: number;
    authors: number;
  }

  interface CountriesList {
    countryCode: string;
    countryName: string;
    flagPath: string;
  }

  export const get = (params: IRequest) => {
    return axios.get<IResponse>(`${link}${qs.stringify(params, { addQueryPrefix: true })}`);
  };

  export const getFilters = () => {
    return axios.get<IFiltersResponse>(`${link}Filters`);
  };
}
