import { BrowserRouter, Route, Routes } from "react-router";

import {
  DockerPage,
  FilesPage,
  LoginPage,
  MainPage,
  NetworkPage,
  ServicesPage,
  SettingsPage,
  StoragePage,
  SystemPage,
  TerminalPage,
  UsersPage,
} from "@/pages";
import { ROUTE_PATHS } from "@/shared";
import { RootLayout } from "@/widgets";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path={ROUTE_PATHS.LOGIN} element={<LoginPage />} />

        {/* Protected (with Layout) */}
        <Route element={<RootLayout />}>
          <Route path={ROUTE_PATHS.MAIN} element={<MainPage />} />
          <Route path={ROUTE_PATHS.SYSTEM} element={<SystemPage />} />
          <Route path={ROUTE_PATHS.SERVICES} element={<ServicesPage />} />
          <Route path={ROUTE_PATHS.NETWORK} element={<NetworkPage />} />
          <Route path={ROUTE_PATHS.STORAGE} element={<StoragePage />} />
          <Route path={ROUTE_PATHS.FILES} element={<FilesPage />} />
          <Route path={ROUTE_PATHS.USERS} element={<UsersPage />} />
          <Route path={ROUTE_PATHS.TERMINAL} element={<TerminalPage />} />
          <Route path={ROUTE_PATHS.DOCKER} element={<DockerPage />} />
          <Route path={ROUTE_PATHS.SETTINGS} element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
