import axios from "axios";
import queryString from "query-string";

import { Links } from "../../core/links";

export namespace ApiSounds {
  const link = `${Links.api}/Statistics/SoundsFiltered`;
  const linkByAuthor = `${Links.api}/Statistics/SoundUsedByAuthor`;

  export type IRequest = Partial<{
    days: number;
    order: string;
    sorting: string;
    take: number;
    slip: number;
    authorId?: number | string;
  }>;

  export interface IResponse {
    music: Music[];
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
    soundType: null;
    recognize: null;
    location: null;
    artistLocation: null;
    videosLocation: null;
    riseFrom: null;
    riseTo: null;
    repostsFrom: null;
    repostsTo: null;
    rateFrom: null;
    rateTo: null;
    forecastingFrom: null;
    forecastingTo: null;
    durationFrom: null;
    durationTo: null;
    days: number;
    sorting: null;
    timeMachineDaysAgo: null;
    search: null;
    category: null;
    isArtist: null;
    dateFrom: null;
    dateTo: null;
    favoriteForUser: null;
    order: string;
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
