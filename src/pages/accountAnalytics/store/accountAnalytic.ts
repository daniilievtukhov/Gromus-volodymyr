import { create, createStore } from "zustand";
import { ApiAuthorAnalytics } from "../../../requests/authorAnalytics";

  
  interface IAIAnalyticData {
    authorData: ApiAuthorAnalytics.IResponse;
    authorStatesAnalytic: object;
    songsUsedByAuthor: object;
  }
  
  interface AIAuthorAnalyticStore {
    chatId: string | number | undefined;
    authorId: number | string | undefined;
    data: IAIAnalyticData | object;
  }
  
  export const useAIAuthorAnalyticStore = create<AIAuthorAnalyticStore>(() => ({
    chatId: "",
    authorId: "",
    data: {},
  }));
  
  export const clearAIAuthorAnalyticStore = () =>
    useAIAuthorAnalyticStore.setState(() => ({
      chatId: "",
      authorId: "",
      data: {},
    }));
  
  interface IAiAccountData {
    Context: string,
    ConversationId: string,
    ConversationName: string,
    Data: any[],
    DataType: string,
    Date: Date | null,
    Text: string,
    UniqueId: string
  }
  
  export const setAIAuthorAnalyticStore = (newData: IAiAccountData) => {
    const authorAnalyticItem = newData.Data.find((item) => item.DataType === "AuthorData").Data;
    const authorStatesAnalytic = newData.Data.find((item) => item.DataType === "AuthorStatesAnalytic").Data;
    const songsUsedByAuthor = newData.Data.find((item) => item.DataType === "SongsUsedByAuthor").Data;
  
    console.log(authorAnalyticItem);
    const authorId = authorAnalyticItem?.author?.authorId || "";
    console.log(authorId);
  
    useAIAuthorAnalyticStore.setState(() => ({
      chatId: newData.ConversationId,
      authorId: authorId,
      data: {
        authorData: {...authorAnalyticItem},
        authorStatesAnalytic: {...authorStatesAnalytic},
        songsUsedByAuthor: {...songsUsedByAuthor}
      } 
    }));
  }