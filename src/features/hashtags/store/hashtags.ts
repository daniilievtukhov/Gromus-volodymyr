import { create, createStore } from "zustand";
import { ApiHashtagsAnalytics } from "../../../requests/hashtagsAnalytics";
  
export const useHashtags = create<ApiHashtagsAnalytics.IResponse>(() => ({
  topSoundHashtags: [],
  soundHashtagBalancedGroup: [],
  accountHashtagBalancedGroup: []
}));
  
export const clearHashtags = () =>
    useHashtags.setState(() => ({
      topSoundHashtags: [],
      soundHashtagBalancedGroup: [],
      accountHashtagBalancedGroup: []
    })
);
  
//   export const setAIAuthorAnalyticStore = (newData: IAiAccountData) => {
//     const authorAnalyticItem = newData.Data.find((item) => item.DataType === "AuthorData").Data;
//     const authorStatesAnalytic = newData.Data.find((item) => item.DataType === "AuthorStatesAnalytic").Data;
//     const songsUsedByAuthor = newData.Data.find((item) => item.DataType === "SongsUsedByAuthor").Data;
  
//     console.log(authorAnalyticItem);
//     const authorId = authorAnalyticItem?.author?.authorId || "";
//     console.log(authorId);
  
//     useAIAuthorAnalyticStore.setState(() => ({
//       chatId: newData.ConversationId,
//       authorId: authorId,
//       data: {
//         authorData: {...authorAnalyticItem},
//         authorStatesAnalytic: {...authorStatesAnalytic},
//         songsUsedByAuthor: {...songsUsedByAuthor}
//       } 
// //     }));
//   }