import axios from "axios";
import queryString from "query-string";
import { ApiHashtagsAnalytics } from "../hashtagsAnalytics";

import { Links } from "../../core/links";

export namespace ApiSounds {
  const link = `${Links.api}/Statistics/SoundsFiltered`;
  const linkByAuthor = `${Links.api}/Statistics/SoundUsedByAuthor`;

  export type IRequest = Partial<{
    days: number;
    order: string;
    sorting: string;
    search: string;
    take: number;
    slip: number;
    authorId?: number | string;
  }>;

  export interface IResponse {
    music: Music[];
    accountHashtagBalancedGroup?: ApiHashtagsAnalytics.IHashtagBalance[];
    filters: Filters;
    rowsCount: number;
    totalRows: number;
    daysStats?: {
      dayOfWeek: number;
      dayName: string;
      hoursStats: { hour: number; percent: number }[];
    }[];
    Actions?: {
      link: string;
      label: string;
    }[];
  }

  export interface Filters {
    skip: number;
    take: number;
    soundType: string;
    recognize: string;
    location: string;
    artistLocation: string;
    videosLocation: string;
    riseFrom: number;
    riseTo: number;
    repostsFrom: number;
    repostsTo: number;
    rateFrom: number;
    rateTo: number;
    forecastingFrom: number;
    forecastingTo: number;
    durationFrom: number;
    durationTo: number;
    days: number;
    sorting: string;
    timeMachineDaysAgo?: string;
    search: string;
    category: number;
    isArtist: boolean;
    dateFrom: string;
    dateTo: string;
    favoriteForUser: string;
    order: string;
    country: string;
    followers: number;
  }

  export interface Music {
    playUrl: string;
    title: string;
    cover: string;
    creator: string;
    musicId: string;
    musicOriginal: boolean;
    duration: number;
    reposts: number;
    dailyRise: number;
    dailyRiseForecasting: number;
    album: string;
    updateDate: string;
    parseDate: string;
    artistRegion: null;
    authorIdLong: number;
    authorUniqueId: string | null;
    authorNickname: string | null;
    isArtist: boolean;
    topAudienceLocation: string;
    topCategories: string[];
    totalCountries: number;
    totalCategories: number;
    lastWeekViewStats: number[] | null;
    videoViews: number;
    tikTokLink: string;
    shazamLink: null | string;
    musicStatus: number;
    notAvailable: boolean;
    growth: number;
  }

  export const get = async (params: IRequest) => {
    const res = await axios.get<IResponse>(`${link}?${queryString.stringify(params)}`);

    return res.data;
  };

  export const getByAuthor = async (params: IRequest) => {
    const res = await axios.get<IResponse>(`${linkByAuthor}?${queryString.stringify(params)}`);

    return res.data;
  };
}
