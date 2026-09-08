import { LocaleProvider } from "@/hooks/use-locale";
import { TeamsGettingStarted } from "./teams-getting-started";

export default function PageIsland() {
  return (
    <LocaleProvider>
      <TeamsGettingStarted />
    </LocaleProvider>
  );
}
