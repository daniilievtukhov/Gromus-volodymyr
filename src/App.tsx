import "@mantine/charts/styles.css";
import "@mantine/core/styles.css";
import "mantine-flagpack/styles.css";

import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, Navigate, redirect, RouterProvider } from "react-router-dom";

import { getToken } from "./core/helpers/getToken";
import { ErrorBoundary } from "./features/errorBoundary";
import { MainStart } from "./features/mainStart";
import { NotifyContainer } from "./features/notification/components/NotifyContainer";
import { useGlobalStore } from "./globalStore";
import {
  AccountAnalyticsPage,
  MyAccountAnalyticsPage,
} from "./pages/accountAnalytics/AccountAnalyticsPage";
import { AuthPage } from "./pages/AuthPage";
import { ChatDataPage } from "./pages/ChatDataPage";
import { MainPage } from "./pages/MainPage";
import { SchedulePage } from "./pages/SchedulePage";
import { PersonalizedHashtagsPage } from "./pages/personalizedHashtags/PersonalizedHashtagsPage";
import { RisingSoundsPage } from "./pages/sounds/RisingSoundsPage";
import { PricingPage } from "./pages/pricing/PricingPage";
import { ApiUserInfo } from "./requests/account/info";
import { ApiMessage } from "./requests/conversation/message";
import { mantineTheme } from "./theme/mantine-theme";

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: 0,
    },
    queries: {
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: false,
      retry: 0,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    loader: async () => {
      const token = getToken();

      if (!token) throw redirect("/auth");

      const res = await ApiUserInfo.get().catch((e) => {
        if (e.response.status === 401) {
          localStorage.removeItem("BEARER_TOKEN");

          throw redirect("/auth");
        }
      });

      const limit = await ApiMessage.getLimit();

      if (!res) return null;

      useGlobalStore.setState({
        userInfo: res,
        limit,
      });

      return null;
    },
    element: <MainPage />,
    children: [
      {
        path: "/",
        element: <MainStart />,
      },
      {
        path: "/rising-sounds",
        element: <RisingSoundsPage />,
      },
      {
        path: "/my-account-analytics",
        element: <MyAccountAnalyticsPage />,
      },
      {
        path: "/account-analytics/:authorId",
        element: <AccountAnalyticsPage />,
      },
      {
        path: "/ai-data",
        element: <ChatDataPage />,
      },
      {
        path: "/ai-data-my-account-analytics",
        element: <MyAccountAnalyticsPage />,
      },
      {
        path: "/time-to-post",
        element: <SchedulePage />,
      },
      {
        path: "/hashtags",
        element: <PersonalizedHashtagsPage />,
      },
      {
        path: "/ai-calendar",
        element: <SchedulePage />,
      },
    ],
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
  {
    path: "/pricing",
    element: <PricingPage />,
  },
]);
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider forceColorScheme="dark" theme={mantineTheme}>
        <RouterProvider router={router} />

        <NotifyContainer />
      </MantineProvider>
    </QueryClientProvider>
  );
}
