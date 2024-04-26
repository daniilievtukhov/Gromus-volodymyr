// import { Skeleton, Stack } from "@mantine/core";
// import { useEffect, useMemo, useState } from "react";

// import { RisingSoundsTitle } from "../../components/RisingSoundsTitle";
// import { RisingDaily, RisingTable } from "../../features/risingSounds";
// import { RisingSoundsPagination } from "../../features/risingSounds/RisingSoundsPagination";
// import { ISoundData, useRisingSoundsStore } from "../../features/risingSounds/store";
// import { useSoundsData } from "./hooks/useSoundsData";


// export const RisingSoundsPage = () => {
//   const [data, setData ]= useState<{music: any[]}>({
//     music: []
//   });
  
//   const {
//     query: { data: dataSounds, isSuccess, isLoading },
//     page,
//     setPage,
//   } = useSoundsData();

//   const store = useRisingSoundsStore();

//   // console.log(data);

//   useEffect(() => {
//     console.log(data);

//     setData(store.tableData);

//     () => store.clearTableData()
//   },[store])

//   useEffect(() => {
//     if(dataSounds && dataSounds.music && dataSounds.music.length) {
//       console.log("Super!")
//       console.log(dataSounds)
//       setData(dataSounds)
//     }
//   }, [dataSounds])

//   const tableData = useMemo<ISoundData[]>(() => {
//     return (
//       data?.music.map((el) => ({
//         ...el,
//         id: el.musicId,
//         author: el.authorNickname || el.authorUniqueId || el.creator || "",
//         authorId: el.authorIdLong,
//       })) ?? []
//     );
//   }, [data?.music])

//   return (
//     <Stack p={32} gap={32} bg="#0D0D0E" mih="100vh">
//       <RisingDaily />
//       <Stack gap={16}>
//         <RisingSoundsTitle />
//         {isLoading && (
//           <Stack gap={8}>
//             {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
//               <Skeleton key={i} h={60} />
//             ))}
//           </Stack>
//         )}
//         {isSuccess && (
//           <Stack gap={8}>
//             <RisingTable tableData={tableData} />
//             <RisingSoundsPagination page={page} setPage={setPage} total={data.totalRows} />
//           </Stack>
//         )}
//       </Stack>
//     </Stack>
//   );
// };



import { Skeleton, Stack } from "@mantine/core";
import { useMemo } from "react";

import { RisingSoundsTitle } from "../../components/RisingSoundsTitle";
import { RisingDaily, RisingTable } from "../../features/risingSounds";
import { RisingSoundsPagination } from "../../features/risingSounds/RisingSoundsPagination";
import { ISoundData } from "../../features/risingSounds/store";
import { useSoundsData } from "./hooks/useSoundsData";

export const RisingSoundsPage = () => {
  const {
    query: { data, isSuccess, isLoading },
    page,
    setPage,
  } = useSoundsData();

  const tableData = useMemo<ISoundData[]>(() => {
    return (
      data?.music.map((el) => ({
        ...el,
        id: el.musicId,
        author: el.authorNickname || el.authorUniqueId || el.creator || "",
        authorId: el.authorIdLong,
      })) ?? []
    );
  }, [data?.music]);

  return (
    <Stack p={32} gap={32} bg="#0D0D0E" mih="100vh">
      <RisingDaily />
      <Stack gap={16}>
        <RisingSoundsTitle />
        {isLoading && (
          <Stack gap={8}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <Skeleton key={i} h={60} />
            ))}
          </Stack>
        )}
        {isSuccess && (
          <Stack gap={8}>
            <RisingTable tableData={tableData} />
            <RisingSoundsPagination page={page} setPage={setPage} total={data.totalRows} />
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};
