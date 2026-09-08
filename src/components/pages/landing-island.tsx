import { LocaleProvider } from "@/hooks/use-locale";
import { LandingPage } from "./landing";

export default function PageIsland() {
  return (
    <LocaleProvider>
      <LandingPage />
    </LocaleProvider>
  );
}
