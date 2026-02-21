import { Outlet } from "react-router";

export default function RootLayout() {
  return (
    <div>
      root layout
      <Outlet />
    </div>
  );
}
