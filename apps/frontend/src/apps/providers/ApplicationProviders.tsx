import { QueryProvider } from "./components";

type Props = {
  children: React.ReactNode;
};

export const ApplicationProviders = ({ children }: Props) => {
  return <QueryProvider>{children}</QueryProvider>;
};
