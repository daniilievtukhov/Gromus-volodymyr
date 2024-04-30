import axios from "axios";

import { Links } from "../core/links";

export namespace ApiHashtagFilters {
  const link = `${Links.api}/Statistics/HashtagFilters`;


  export interface IResponse {
    country: string,
    category: number,
    ignored: any[],
    categoriesList: Category[],
    countriesList: Country[]
  }

  export interface Category {
    id: number,
    categoryName: string,
    sounds: number,
    videos: number,
    authors: number
  }

  export interface Country {
    countryCode: string,
    countryName: string,
    flagPath: string
  }

  export const get = async () => {
    return (await axios.get<IResponse>(link)).data;
  };
}
